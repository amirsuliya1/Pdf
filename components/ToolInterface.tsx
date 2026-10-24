'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  UploadCloud, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp,
  FileCheck,
  FileText
} from 'lucide-react';
import { ToolSEO } from '@/lib/seo-data';
import { 
  mergePdfs, 
  splitPdf, 
  compressPdf, 
  rotatePdf, 
  jpgToPdf, 
  pdfToJpg, 
  batchJpgToPdf,
  batchPdfToJpg,
  protectPdf, 
  unlockPdf, 
  pdfToWord, 
  wordToPdf 
} from '@/lib/pdf-engine';

export default function ToolInterface({ tool }: { tool: ToolSEO }) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadResult, setDownloadResult] = useState<{
    url: string;
    filename: string;
    metaInfo?: string;
  } | null>(null);

  // Tool Specific Options
  const [splitMode, setSplitMode] = useState<'all' | 'range'>('all');
  const [splitRange, setSplitRange] = useState('1');
  const [compressLevel, setCompressLevel] = useState<'extreme' | 'recommended' | 'less'>('recommended');
  const [imageQuality, setImageQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [jpgOrientation, setJpgOrientation] = useState<'auto' | 'portrait' | 'landscape'>('auto');
  const [jpgMode, setJpgMode] = useState<'single' | 'separate'>('single');
  const [rotateAngle, setRotateAngle] = useState<number>(90);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [protectType, setProtectType] = useState<'open' | 'permissions'>('open');

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Determine accepted file types
  const acceptTypes = tool.slug === 'jpg-to-pdf'
    ? 'image/jpeg,image/png,image/webp'
    : tool.slug === 'word-to-pdf'
    ? '.docx,.doc,.txt,text/plain'
    : 'application/pdf,.pdf';

  const isMultiple = tool.slug === 'merge-pdf' || tool.slug === 'jpg-to-pdf' || tool.slug === 'pdf-to-jpg';

  const handleFilesAdded = (newFileList: FileList | null) => {
    if (!newFileList || newFileList.length === 0) return;
    setErrorMsg(null);
    setDownloadResult(null);

    const added = Array.from(newFileList);

    // Validate size (50MB per file)
    for (const f of added) {
      if (f.size > 50 * 1024 * 1024) {
        setErrorMsg(`File "${f.name}" exceeds the 50MB size limit.`);
        return;
      }
    }

    if (isMultiple) {
      setFiles((prev) => [...prev, ...added].slice(0, 20));
    } else {
      setFiles([added[0]]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setDownloadResult(null);
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    setFiles((prev) => {
      const copy = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= copy.length) return prev;
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      setErrorMsg('Please select at least one file first.');
      return;
    }

    if (tool.slug === 'merge-pdf' && files.length < 2) {
      setErrorMsg('Please select at least 2 PDF files to merge.');
      return;
    }

    if (tool.slug === 'protect-pdf') {
      if (!password) {
        setErrorMsg('Please enter a password to protect your PDF.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please verify your password.');
        return;
      }
    }

    setErrorMsg(null);
    setProcessing(true);
    setProgress(5);

    try {
      let resultBlob: Blob;
      let filename = 'processed_pdflove.pdf';
      let metaInfo = '';

      switch (tool.slug) {
        case 'merge-pdf': {
          resultBlob = await mergePdfs(files, (p) => setProgress(p));
          filename = 'merged_pdflove.pdf';
          metaInfo = `Merged ${files.length} documents successfully.`;
          break;
        }
        case 'split-pdf': {
          const splitRes = await splitPdf(files[0], splitMode, splitRange, (p) => setProgress(p));
          resultBlob = splitRes.blob;
          filename = splitRes.filename;
          metaInfo = splitMode === 'all' ? 'All pages separated into ZIP' : `Extracted pages (${splitRange})`;
          break;
        }
        case 'compress-pdf': {
          const compRes = await compressPdf(files[0], compressLevel, (p) => setProgress(p));
          resultBlob = compRes.blob;
          filename = `compressed_${files[0].name}`;
          const origMb = (compRes.originalSize / (1024 * 1024)).toFixed(2);
          const newMb = (compRes.newSize / (1024 * 1024)).toFixed(2);
          metaInfo = `Reduced from ${origMb}MB to ${newMb}MB (${compRes.savingsPercent}% saved)`;
          break;
        }
        case 'pdf-to-jpg': {
          const jpgRes = await batchPdfToJpg(files, imageQuality, (p) => setProgress(p));
          resultBlob = jpgRes.zipBlob;
          filename = files.length > 1
            ? `batch_${files.length}_pdfs_images.zip`
            : `${files[0].name.replace(/\.pdf$/i, '')}_images.zip`;
          metaInfo = files.length > 1
            ? `Batch converted ${jpgRes.totalFiles} PDFs (${jpgRes.images.length} total pages) to high quality JPGs`
            : `Converted ${jpgRes.images.length} pages to high quality JPGs`;
          break;
        }
        case 'jpg-to-pdf': {
          const res = await batchJpgToPdf(files, jpgMode, jpgOrientation, (p) => setProgress(p));
          resultBlob = res.blob;
          filename = res.filename;
          metaInfo = res.isZip
            ? `Batch converted ${files.length} images into separate PDF documents (ZIP archive)`
            : `Combined ${files.length} image(s) into a single PDF document`;
          break;
        }
        case 'pdf-to-word': {
          const docRes = await pdfToWord(files[0], (p) => setProgress(p));
          resultBlob = docRes.blob;
          filename = docRes.filename;
          metaInfo = 'Editable Word document (.docx) ready';
          break;
        }
        case 'word-to-pdf': {
          resultBlob = await wordToPdf(files[0], (p) => setProgress(p));
          filename = `${files[0].name.replace(/\.[^/.]+$/, '')}.pdf`;
          metaInfo = 'Converted to universal PDF format';
          break;
        }
        case 'rotate-pdf': {
          resultBlob = await rotatePdf(files[0], rotateAngle, (p) => setProgress(p));
          filename = `rotated_${files[0].name}`;
          metaInfo = `Rotated ${rotateAngle}° clockwise`;
          break;
        }
        case 'unlock-pdf': {
          resultBlob = await unlockPdf(files[0], password, (p) => setProgress(p));
          filename = `unlocked_${files[0].name}`;
          metaInfo = 'Restrictions removed successfully';
          break;
        }
        case 'protect-pdf': {
          resultBlob = await protectPdf(files[0], password, (p) => setProgress(p));
          filename = `protected_${files[0].name}`;
          metaInfo = `Encrypted with ${protectType === 'open' ? 'Open' : 'Permissions'} password`;
          break;
        }
        default:
          throw new Error('Unsupported tool action');
      }

      const downloadUrl = URL.createObjectURL(resultBlob);
      setDownloadResult({
        url: downloadUrl,
        filename,
        metaInfo
      });
      setProgress(100);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Processing failed. Please check your file.';
      setErrorMsg(msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setDownloadResult(null);
    setErrorMsg(null);
    setProgress(0);
    setPassword('');
    setConfirmPassword('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Home
        </Link>
        <span>&gt;</span>
        <span className="text-slate-900 dark:text-white font-medium">{tool.title}</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {tool.h1}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {tool.subtitle}
        </p>
      </div>

      {/* Main Interactive Tool Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-10 mb-12">
        {/* Upload Zone */}
        {!downloadResult && (
          <div>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFilesAdded(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 scale-[0.99]'
                  : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50/50 dark:bg-slate-800/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptTypes}
                multiple={isMultiple}
                onChange={(e) => handleFilesAdded(e.target.files)}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <UploadCloud className="w-8 h-8" />
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                Drag &amp; drop your {tool.slug === 'jpg-to-pdf' ? 'image(s)' : tool.slug === 'word-to-pdf' ? 'Word document' : 'PDF file(s)'} here
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                or click to browse from your device
              </p>
              <button
                type="button"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all pointer-events-none"
              >
                {isMultiple ? 'Choose Files' : 'Choose File'}
              </button>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-4">
                Supported: {tool.supportedFormats.join(', ')} (max 50MB per file)
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mt-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-center gap-3 text-sm text-rose-700 dark:text-rose-300">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <span>Selected Files ({files.length})</span>
                  {isMultiple && files.length > 1 && <span>Order matters</span>}
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-800/60">
                  {files.map((file, idx) => (
                    <div key={`${file.name}-${idx}`} className="flex items-center justify-between p-3.5 gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500 w-5">
                          {idx + 1}.
                        </span>
                        <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isMultiple && files.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={() => moveFile(idx, 'up')}
                              disabled={idx === 0}
                              aria-label="Move file up"
                              className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-30"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveFile(idx, 'down')}
                              disabled={idx === files.length - 1}
                              aria-label="Move file down"
                              className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-30"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          aria-label="Remove file"
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tool Specific Options Section */}
            {files.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                {tool.slug === 'split-pdf' && (
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Split Options
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                        <input
                          type="radio"
                          name="splitMode"
                          checked={splitMode === 'all'}
                          onChange={() => setSplitMode('all')}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>All pages (separate files in a ZIP archive)</span>
                      </label>
                      <label className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                        <input
                          type="radio"
                          name="splitMode"
                          checked={splitMode === 'range'}
                          onChange={() => setSplitMode('range')}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Extract specific pages</span>
                      </label>
                      {splitMode === 'range' && (
                        <div className="pl-6 pt-1">
                          <input
                            type="text"
                            value={splitRange}
                            onChange={(e) => setSplitRange(e.target.value)}
                            placeholder="e.g. 1, 3, 5-7"
                            className="w-full max-w-xs px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <p className="text-[11px] text-slate-500 mt-1">Specify comma separated page numbers or ranges (e.g. 1, 3-5)</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {tool.slug === 'compress-pdf' && (
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Compression Level
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'recommended', title: 'Recommended', desc: 'Balanced quality & size' },
                        { id: 'extreme', title: 'Extreme', desc: 'Smallest file size' },
                        { id: 'less', title: 'Light', desc: 'Highest visual quality' }
                      ].map((lvl) => (
                        <button
                          key={lvl.id}
                          type="button"
                          onClick={() => setCompressLevel(lvl.id as 'extreme' | 'recommended' | 'less')}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            compressLevel === lvl.id
                              ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20'
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="text-sm font-bold">{lvl.title}</div>
                          <div className="text-xs opacity-70">{lvl.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {tool.slug === 'pdf-to-jpg' && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Image Quality
                      </label>
                      <select
                        value={imageQuality}
                        onChange={(e) => setImageQuality(e.target.value as 'high' | 'medium' | 'low')}
                        className="w-full max-w-xs px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="high">High Quality (300 DPI equivalent)</option>
                        <option value="medium">Medium Quality (150 DPI equivalent)</option>
                        <option value="low">Standard Web (72 DPI equivalent)</option>
                      </select>
                    </div>
                    {files.length > 1 && (
                      <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 text-xs text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                        <FileCheck className="w-4 h-4 shrink-0" />
                        <span><strong>Batch Mode Active:</strong> All {files.length} PDF files will be converted into JPG images and bundled into a single ZIP download.</span>
                      </div>
                    )}
                  </div>
                )}

                {tool.slug === 'jpg-to-pdf' && (
                  <div className="space-y-5">
                    {files.length > 1 && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                          Batch Output Mode
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setJpgMode('single')}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              jpgMode === 'single'
                                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20'
                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="text-sm font-bold">Combined PDF</div>
                            <div className="text-xs opacity-70">Merge all {files.length} images into 1 PDF document</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setJpgMode('separate')}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              jpgMode === 'separate'
                                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20'
                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="text-sm font-bold">Separate PDFs (ZIP)</div>
                            <div className="text-xs opacity-70">Convert each image to individual PDF in a single ZIP</div>
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                        Page Orientation
                      </label>
                      <div className="flex gap-4">
                        {['auto', 'portrait', 'landscape'].map((orient) => (
                          <label key={orient} className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer capitalize">
                            <input
                              type="radio"
                              name="jpgOrientation"
                              checked={jpgOrientation === orient}
                              onChange={() => setJpgOrientation(orient as 'auto' | 'portrait' | 'landscape')}
                              className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>{orient}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {tool.slug === 'rotate-pdf' && (
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Rotation Angle
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { angle: 90, label: '90° Clockwise' },
                        { angle: 180, label: '180° Flip' },
                        { angle: 270, label: '270° (90° Left)' }
                      ].map((item) => (
                        <button
                          key={item.angle}
                          type="button"
                          onClick={() => setRotateAngle(item.angle)}
                          className={`p-3 rounded-xl border text-center text-sm font-bold transition-all ${
                            rotateAngle === item.angle
                              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/20'
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {tool.slug === 'protect-pdf' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                        Protection Type
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                          <input
                            type="radio"
                            name="protectType"
                            checked={protectType === 'open'}
                            onChange={() => setProtectType('open')}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>Open Password (required to view)</span>
                        </label>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                          <input
                            type="radio"
                            name="protectType"
                            checked={protectType === 'permissions'}
                            onChange={() => setProtectType('permissions')}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>Permissions Password (restrict editing)</span>
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter secure password"
                          className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Repeat password"
                          className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {tool.slug === 'unlock-pdf' && (
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Password (Optional for Permission Restrictions)
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter document password (if required)"
                      className="w-full max-w-sm px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <p className="text-[11px] text-slate-500">
                      Note: You must have legal authority to unlock this document.
                    </p>
                  </div>
                )}

                {/* Progress bar */}
                {processing && (
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                      <span>Processing in browser...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={handleProcess}
                    disabled={processing}
                    className="w-full sm:w-auto min-w-[240px] px-8 py-3.5 rounded-xl font-bold text-base text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {processing ? (
                      <span className="flex items-center justify-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span>{tool.title.replace(' with a Password', '')}</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Success / Download State */}
        {downloadResult && (
          <div className="text-center py-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Your file is ready!
              </h2>
              {downloadResult.metaInfo && (
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {downloadResult.metaInfo}
                </p>
              )}
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Processed privately in your browser with zero server uploads.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={downloadResult.url}
                download={downloadResult.filename}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 transition-transform active:scale-95"
              >
                <Download className="w-5 h-5" />
                <span>Download {downloadResult.filename.endsWith('.zip') ? 'ZIP Archive' : 'File'}</span>
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Convert Another File</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SEO & GEO Content: How To, Specs, FAQs, Related Tools */}
      <div className="space-y-12">
        {/* How to section */}
        <section aria-labelledby="how-to-heading" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <h2 id="how-to-heading" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
            How to {tool.title.replace(' with a Password', '')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tool.steps.map((st) => (
              <div key={st.step} className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-extrabold text-sm">
                  {st.step}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Formats & Limitations side-by-side */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-indigo-500" />
              Supported Formats
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {tool.supportedFormats.map((fmt, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>{fmt}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Technical Limitations
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {tool.limitations.map((lim, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section aria-labelledby="faq-heading" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {tool.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 shrink-0 text-slate-400" /> : <ChevronDown className="w-5 h-5 shrink-0 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in duration-150">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Related Tools */}
        <section aria-labelledby="related-heading" className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-center">
          <h2 id="related-heading" className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Related PDF Tools
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {tool.relatedTools.map((rel) => (
              <Link
                key={rel.slug}
                href={rel.path}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:shadow-sm transition-all"
              >
                {rel.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
