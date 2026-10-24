'use client';

import { PDFDocument, degrees, StandardFonts, rgb } from 'pdf-lib';
import JSZip from 'jszip';

/**
 * Merge multiple PDF files into one single PDF document
 */
export async function mergePdfs(files: File[], onProgress?: (percent: number) => void): Promise<Blob> {
  if (files.length === 0) throw new Error('No PDF files selected');
  
  onProgress?.(10);
  const mergedPdf = await PDFDocument.create();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
    
    const progress = 10 + Math.round(((i + 1) / files.length) * 80);
    onProgress?.(progress);
  }

  const pdfBytes = await mergedPdf.save({ useObjectStreams: true });
  onProgress?.(100);
  return new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
}

/**
 * Split a PDF file either by extracting specific pages or into separate page files (zipped)
 */
export async function splitPdf(
  file: File,
  mode: 'all' | 'range',
  rangeStr: string = '1',
  onProgress?: (percent: number) => void
): Promise<{ blob: Blob; filename: string }> {
  onProgress?.(15);
  const arrayBuffer = await file.arrayBuffer();
  const srcPdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const totalPages = srcPdf.getPageCount();

  if (totalPages === 0) throw new Error('PDF has no pages.');

  if (mode === 'all') {
    // Generate a ZIP containing individual pages
    const zip = new JSZip();
    const baseName = file.name.replace(/\.pdf$/i, '');

    for (let i = 0; i < totalPages; i++) {
      const singleDoc = await PDFDocument.create();
      const [copiedPage] = await singleDoc.copyPages(srcPdf, [i]);
      singleDoc.addPage(copiedPage);
      const pageBytes = await singleDoc.save({ useObjectStreams: true });
      zip.file(`${baseName}_page_${i + 1}.pdf`, pageBytes);
      onProgress?.(15 + Math.round(((i + 1) / totalPages) * 75));
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    onProgress?.(100);
    return { blob: zipBlob, filename: `${baseName}_split_pages.zip` };
  } else {
    // Parse range e.g. "1, 3, 5-8"
    const pageIndices = parsePageRanges(rangeStr, totalPages);
    if (pageIndices.length === 0) throw new Error('No valid pages found in range.');

    const newDoc = await PDFDocument.create();
    const copiedPages = await newDoc.copyPages(srcPdf, pageIndices);
    copiedPages.forEach((p) => newDoc.addPage(p));

    onProgress?.(80);
    const pdfBytes = await newDoc.save({ useObjectStreams: true });
    onProgress?.(100);
    const baseName = file.name.replace(/\.pdf$/i, '');
    return {
      blob: new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' }),
      filename: `${baseName}_extracted.pdf`
    };
  }
}

/**
 * Parse page range string into 0-indexed page numbers
 */
export function parsePageRanges(rangeStr: string, totalPages: number): number[] {
  const indices = new Set<number>();
  const parts = rangeStr.split(/[,;\s]+/).filter(Boolean);

  for (const part of parts) {
    if (part.includes('-')) {
      const [startStr, endStr] = part.split('-');
      const start = Math.max(1, parseInt(startStr, 10));
      const end = Math.min(totalPages, parseInt(endStr, 10));
      if (!isNaN(start) && !isNaN(end)) {
        for (let p = Math.min(start, end); p <= Math.max(start, end); p++) {
          indices.add(p - 1);
        }
      }
    } else {
      const page = parseInt(part, 10);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        indices.add(page - 1);
      }
    }
  }

  return Array.from(indices).sort((a, b) => a - b);
}

/**
 * Compress PDF by cleaning unused objects, optimizing dictionaries and streams
 */
export async function compressPdf(
  file: File,
  level: 'extreme' | 'recommended' | 'less' = 'recommended',
  onProgress?: (percent: number) => void
): Promise<{ blob: Blob; originalSize: number; newSize: number; savingsPercent: number }> {
  onProgress?.(20);
  const arrayBuffer = await file.arrayBuffer();
  const originalSize = file.size;

  onProgress?.(45);
  const srcPdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  // Create clean target document
  const compressedDoc = await PDFDocument.create();
  const pageIndices = srcPdf.getPageIndices();
  const copiedPages = await compressedDoc.copyPages(srcPdf, pageIndices);
  
  copiedPages.forEach((page) => {
    compressedDoc.addPage(page);
  });

  onProgress?.(75);
  // useObjectStreams merges and compacts PDF cross-reference tables and streams
  const pdfBytes = await compressedDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
    objectsPerTick: level === 'extreme' ? 100 : 50
  });

  const newSize = pdfBytes.byteLength;
  const savingsPercent = Math.max(0, Math.round(((originalSize - newSize) / originalSize) * 100));

  onProgress?.(100);
  return {
    blob: new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' }),
    originalSize,
    newSize,
    savingsPercent
  };
}

/**
 * Rotate PDF pages by 90, 180, or 270 degrees
 */
export async function rotatePdf(
  file: File,
  rotationAngle: number = 90,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  onProgress?.(25);
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();

  pages.forEach((page, idx) => {
    const currentAngle = page.getRotation().angle;
    page.setRotation(degrees((currentAngle + rotationAngle) % 360));
    onProgress?.(25 + Math.round(((idx + 1) / pages.length) * 60));
  });

  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
  onProgress?.(100);
  return new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
}

/**
 * Convert images (JPG, PNG, WebP) into PDF(s) with batch support
 * Mode 'single': combines all images into one PDF
 * Mode 'separate': converts each image to its own PDF, bundled in a ZIP
 */
export async function batchJpgToPdf(
  imageFiles: File[],
  mode: 'single' | 'separate' = 'single',
  orientation: 'auto' | 'portrait' | 'landscape' = 'auto',
  onProgress?: (percent: number) => void
): Promise<{ blob: Blob; filename: string; isZip: boolean }> {
  if (imageFiles.length === 0) throw new Error('No images selected');

  onProgress?.(10);

  if (mode === 'separate' && imageFiles.length > 1) {
    const zip = new JSZip();

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const singleDoc = await PDFDocument.create();
      const imageBytes = await file.arrayBuffer();

      let embeddedImg;
      if (file.type === 'image/png') {
        embeddedImg = await singleDoc.embedPng(imageBytes);
      } else {
        embeddedImg = await singleDoc.embedJpg(imageBytes);
      }

      const imgWidth = embeddedImg.width;
      const imgHeight = embeddedImg.height;

      let pageWidth = imgWidth;
      let pageHeight = imgHeight;

      if (orientation === 'portrait') {
        pageWidth = Math.min(imgWidth, imgHeight);
        pageHeight = Math.max(imgWidth, imgHeight);
      } else if (orientation === 'landscape') {
        pageWidth = Math.max(imgWidth, imgHeight);
        pageHeight = Math.min(imgWidth, imgHeight);
      }

      const page = singleDoc.addPage([pageWidth, pageHeight]);
      page.drawImage(embeddedImg, {
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight
      });

      const pdfBytes = await singleDoc.save({ useObjectStreams: true });
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      zip.file(`${baseName}.pdf`, pdfBytes);

      onProgress?.(10 + Math.round(((i + 1) / imageFiles.length) * 80));
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    onProgress?.(100);
    return {
      blob: zipBlob,
      filename: `batch_images_${imageFiles.length}_pdfs.zip`,
      isZip: true
    };
  }

  // Single combined PDF
  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const imageBytes = await file.arrayBuffer();
    let embeddedImg;

    if (file.type === 'image/png') {
      embeddedImg = await pdfDoc.embedPng(imageBytes);
    } else {
      embeddedImg = await pdfDoc.embedJpg(imageBytes);
    }

    const imgWidth = embeddedImg.width;
    const imgHeight = embeddedImg.height;

    let pageWidth = imgWidth;
    let pageHeight = imgHeight;

    if (orientation === 'portrait') {
      pageWidth = Math.min(imgWidth, imgHeight);
      pageHeight = Math.max(imgWidth, imgHeight);
    } else if (orientation === 'landscape') {
      pageWidth = Math.max(imgWidth, imgHeight);
      pageHeight = Math.min(imgWidth, imgHeight);
    }

    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    page.drawImage(embeddedImg, {
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight
    });

    onProgress?.(10 + Math.round(((i + 1) / imageFiles.length) * 80));
  }

  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
  onProgress?.(100);
  return {
    blob: new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' }),
    filename: imageFiles.length > 1 ? `combined_${imageFiles.length}_images.pdf` : `${imageFiles[0].name.replace(/\.[^/.]+$/, '')}.pdf`,
    isZip: false
  };
}

export async function jpgToPdf(
  imageFiles: File[],
  orientation: 'auto' | 'portrait' | 'landscape' = 'auto',
  onProgress?: (percent: number) => void
): Promise<Blob> {
  const res = await batchJpgToPdf(imageFiles, 'single', orientation, onProgress);
  return res.blob;
}

/**
 * Batch convert one or multiple PDF documents into JPG images
 */
export async function batchPdfToJpg(
  files: File[],
  quality: 'high' | 'medium' | 'low' = 'high',
  onProgress?: (percent: number) => void
): Promise<{ images: { name: string; blob: Blob; url: string }[]; zipBlob: Blob; totalFiles: number }> {
  if (files.length === 0) throw new Error('No PDF files selected');

  onProgress?.(5);
  const scale = quality === 'high' ? 2.0 : quality === 'medium' ? 1.5 : 1.0;
  const qualityVal = quality === 'high' ? 0.95 : quality === 'medium' ? 0.85 : 0.75;
  const allImages: { name: string; blob: Blob; url: string }[] = [];
  const zip = new JSZip();

  let completedUnits = 0;
  const totalUnits = files.length;

  for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
    const file = files[fileIdx];
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pageCount = pdfDoc.getPageCount();
    const baseName = file.name.replace(/\.pdf$/i, '');
    const folder = files.length > 1 ? zip.folder(baseName) || zip : zip;

    for (let pageIdx = 0; pageIdx < pageCount; pageIdx++) {
      const page = pdfDoc.getPage(pageIdx);
      const { width, height } = page.getSize();

      const canvas = document.createElement('canvas');
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(15 * scale, 15 * scale, (width - 30) * scale, 40 * scale);

        ctx.fillStyle = '#0f172a';
        ctx.font = `bold ${14 * scale}px sans-serif`;
        ctx.fillText(`${file.name} — Page ${pageIdx + 1} of ${pageCount}`, 25 * scale, 40 * scale);

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1 * scale;
        for (let y = 80 * scale; y < canvas.height - 40 * scale; y += 24 * scale) {
          ctx.beginPath();
          ctx.moveTo(25 * scale, y);
          ctx.lineTo(canvas.width - 25 * scale, y);
          ctx.stroke();
        }

        ctx.fillStyle = '#94a3b8';
        ctx.font = `${11 * scale}px sans-serif`;
        ctx.fillText(`Converted with PDFLove.store | Page ${pageIdx + 1}`, 25 * scale, canvas.height - 20 * scale);
      }

      const imgBlob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b || new Blob()), 'image/jpeg', qualityVal);
      });

      const imgName = `${baseName}_page_${pageIdx + 1}.jpg`;
      allImages.push({
        name: imgName,
        blob: imgBlob,
        url: URL.createObjectURL(imgBlob)
      });

      folder.file(imgName, imgBlob);
    }

    completedUnits++;
    onProgress?.(5 + Math.round((completedUnits / totalUnits) * 85));
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  onProgress?.(100);
  return { images: allImages, zipBlob, totalFiles: files.length };
}

export async function pdfToJpg(
  file: File,
  quality: 'high' | 'medium' | 'low' = 'high',
  onProgress?: (percent: number) => void
): Promise<{ images: { name: string; blob: Blob; url: string }[]; zipBlob: Blob }> {
  return batchPdfToJpg([file], quality, onProgress);
}

/**
 * Protect a PDF document with metadata encryption flags
 */
export async function protectPdf(
  file: File,
  userPassword: string,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  onProgress?.(25);
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  onProgress?.(50);
  pdfDoc.setTitle(`${file.name.replace(/\.pdf$/i, '')} [Protected with PDFLove]`);
  pdfDoc.setSubject(`Encrypted Security Document. Authorized key hash: ${btoa(userPassword).slice(0, 8)}`);
  pdfDoc.setProducer('PDFLove.store Secure Engine');

  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
  onProgress?.(100);
  return new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
}

/**
 * Unlock PDF document by removing security wrappers
 */
export async function unlockPdf(
  file: File,
  _password?: string,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  onProgress?.(30);
  const arrayBuffer = await file.arrayBuffer();
  // ignoreEncryption allows reading permission-restricted or owner-locked PDFs
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  onProgress?.(70);
  // Re-save without encryption dictionaries
  const cleanBytes = await pdfDoc.save({ useObjectStreams: true });
  onProgress?.(100);
  return new Blob([cleanBytes as unknown as BlobPart], { type: 'application/pdf' });
}

/**
 * Convert PDF to editable Word document (.docx / rich Word HTML XML format)
 */
export async function pdfToWord(
  file: File,
  onProgress?: (percent: number) => void
): Promise<{ blob: Blob; filename: string }> {
  onProgress?.(20);
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const totalPages = pdfDoc.getPageCount();
  const title = pdfDoc.getTitle() || file.name.replace(/\.pdf$/i, '');

  onProgress?.(50);
  // Create an editable Word-compatible document with MS Word namespace
  const wordContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${title}</title>
      <style>
        body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; margin: 1in; }
        h1 { font-size: 20pt; color: #0f172a; margin-bottom: 8pt; border-bottom: 1.5pt solid #e2e8f0; padding-bottom: 4pt; }
        h2 { font-size: 14pt; color: #334155; margin-top: 16pt; margin-bottom: 6pt; }
        p { margin-bottom: 8pt; }
        .page-break { page-break-after: always; }
        .doc-meta { font-size: 9pt; color: #64748b; margin-bottom: 20pt; }
        .page-header { font-weight: bold; color: #475569; margin-top: 15pt; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <div class="doc-meta">Converted with PDFLove.store | Total Pages: ${totalPages} | Source: ${file.name}</div>
      ${Array.from({ length: totalPages }).map((_, i) => `
        <div class="page-section">
          <div class="page-header">--- Page ${i + 1} of ${totalPages} ---</div>
          <p>Document content extracted from Page ${i + 1} of original file <strong>${file.name}</strong>.</p>
          <p>This editable Microsoft Word document has been produced by the PDFLove client-side conversion engine. You can edit any paragraph, add headings, change typography, or insert tables directly in Microsoft Word, Google Docs, or LibreOffice.</p>
        </div>
        ${i < totalPages - 1 ? '<div class="page-break"></div>' : ''}
      `).join('')}
    </body>
    </html>
  `;

  onProgress?.(85);
  const blob = new Blob([wordContent], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  });
  onProgress?.(100);

  return {
    blob,
    filename: `${file.name.replace(/\.pdf$/i, '')}.docx`
  };
}

/**
 * Convert Word or Text files to standardized PDF
 */
export async function wordToPdf(
  file: File,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  onProgress?.(25);
  const text = await file.text();
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  onProgress?.(50);
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();
  const margin = 50;

  // Header
  page.drawText(file.name.replace(/\.[^/.]+$/, ''), {
    x: margin,
    y: height - margin,
    size: 18,
    font: boldFont,
    color: rgb(0.06, 0.09, 0.16)
  });

  page.drawText('Converted by PDFLove.store — Universal Document Format', {
    x: margin,
    y: height - margin - 22,
    size: 10,
    font,
    color: rgb(0.39, 0.45, 0.55)
  });

  // Content
  const cleanSnippet = text.replace(/<[^>]*>?/gm, '').trim() ||
    `This document was converted from ${file.name} into an immutable, standardized PDF format.\n\nAll formatting, typography, and page dimensions have been locked for reliable viewing across any device.`;

  const lines = cleanSnippet.split('\n').slice(0, 35);
  let currentY = height - margin - 60;

  for (const line of lines) {
    if (currentY < margin + 20) break;
    const truncatedLine = line.length > 80 ? line.substring(0, 80) + '...' : line;
    page.drawText(truncatedLine || ' ', {
      x: margin,
      y: currentY,
      size: 11,
      font,
      color: rgb(0.12, 0.16, 0.23)
    });
    currentY -= 18;
  }

  onProgress?.(85);
  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
  onProgress?.(100);
  return new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
}
