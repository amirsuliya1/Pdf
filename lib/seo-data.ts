export interface ToolSEO {
  slug: string;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  icon: string;
  badgeColor: string;
  steps: { step: number; title: string; desc: string }[];
  supportedFormats: string[];
  limitations: string[];
  faqs: { question: string; answer: string }[];
  relatedTools: { slug: string; name: string; path: string }[];
}

export const TOOLS_CONFIG: Record<string, ToolSEO> = {
  'merge-pdf': {
    slug: 'merge-pdf',
    path: '/merge-pdf/',
    title: 'Merge PDF Files Online',
    metaTitle: 'Merge PDF Files Online | PDFLove',
    metaDescription: 'Combine multiple PDF files into a single document in seconds. 100% free, browser-side processing, no file upload to servers, and no watermark.',
    h1: 'Merge PDF Files Online',
    subtitle: 'Combine multiple PDF files into one clean document. Upload your files, arrange the order, and download your merged PDF instantly.',
    primaryKeyword: 'merge PDF files online',
    secondaryKeywords: ['combine PDF documents', 'join PDF files', 'merge PDF free', 'PDF merger'],
    icon: 'merge',
    badgeColor: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-800',
    steps: [
      { step: 1, title: 'Upload your PDF files', desc: 'Drag and drop your PDF documents or click "Choose Files" to select them from your device.' },
      { step: 2, title: 'Arrange the file order', desc: 'Reorder your documents into the exact sequence you want them to appear in the merged output.' },
      { step: 3, title: 'Click Merge PDF', desc: 'Hit the Merge PDF button to join all pages into a single document using your browser\'s local engine.' },
      { step: 4, title: 'Download your file', desc: 'Download your merged PDF immediately without waiting for slow server uploads.' }
    ],
    supportedFormats: ['PDF (.pdf)'],
    limitations: [
      'Maximum file size: 50MB per file',
      'Up to 20 files per merge session',
      'Password-protected files must be unlocked prior to merging'
    ],
    faqs: [
      {
        question: 'Can I merge different file types together?',
        answer: 'The Merge PDF tool specializes in joining PDF files together. If you have images (JPG/PNG), you can first convert them to PDF using our JPG to PDF tool, and then merge them together.'
      },
      {
        question: 'Is there a limit to the number of files I can combine?',
        answer: 'You can combine up to 20 files per operation. For maximum stability and speed on mobile devices, keeping total file size under 100MB provides the best experience.'
      },
      {
        question: 'Will my original files be altered or deleted?',
        answer: 'No. PDFLove creates a brand new merged document. Your original source files remain completely untouched on your device.'
      },
      {
        question: 'Are my confidential documents uploaded to any server?',
        answer: 'No! All merging is performed locally inside your web browser using WebAssembly and client-side JavaScript. Your documents never touch our servers.'
      }
    ],
    relatedTools: [
      { slug: 'split-pdf', name: 'Split PDF', path: '/split-pdf/' },
      { slug: 'compress-pdf', name: 'Compress PDF', path: '/compress-pdf/' },
      { slug: 'pdf-to-word', name: 'PDF to Word', path: '/pdf-to-word/' }
    ]
  },
  'split-pdf': {
    slug: 'split-pdf',
    path: '/split-pdf/',
    title: 'Split PDF Files Online',
    metaTitle: 'Split PDF Files Online | PDFLove',
    metaDescription: 'Extract specific pages or separate all pages from your PDF file. Free online PDF splitter running directly in your browser with no file uploads.',
    h1: 'Split PDF Files Online',
    subtitle: 'Extract selected pages or split a PDF document into separate individual files with precision control.',
    primaryKeyword: 'split PDF online',
    secondaryKeywords: ['extract PDF pages', 'separate PDF pages', 'cut PDF online', 'PDF page extractor'],
    icon: 'split',
    badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    steps: [
      { step: 1, title: 'Upload your PDF', desc: 'Select the PDF document you want to split or extract pages from.' },
      { step: 2, title: 'Choose split option', desc: 'Select "All pages (separate files)" or "Extract specific pages" with custom ranges (e.g., 1, 3, 5-8).' },
      { step: 3, title: 'Click Split PDF', desc: 'Our in-browser engine will extract the exact pages in a fraction of a second.' },
      { step: 4, title: 'Download your files', desc: 'Download your extracted PDF or an organized ZIP archive containing all separated pages.' }
    ],
    supportedFormats: ['PDF (.pdf)'],
    limitations: [
      'Maximum file size: 50MB',
      'Corrupted or password-locked PDFs must be unlocked first'
    ],
    faqs: [
      {
        question: 'Can I extract specific non-consecutive pages?',
        answer: 'Yes! Select "Extract specific pages" and input the page numbers separated by commas and dashes, such as "1, 3, 5-7, 10".'
      },
      {
        question: 'Will the original file be altered?',
        answer: 'Never. The original PDF file remains intact on your device. The split tool generates separate new documents.'
      },
      {
        question: 'How do I download multiple split pages at once?',
        answer: 'When splitting into separate individual pages, PDFLove packages all generated page files into a single, clean ZIP download.'
      }
    ],
    relatedTools: [
      { slug: 'merge-pdf', name: 'Merge PDF', path: '/merge-pdf/' },
      { slug: 'compress-pdf', name: 'Compress PDF', path: '/compress-pdf/' },
      { slug: 'rotate-pdf', name: 'Rotate PDF', path: '/rotate-pdf/' }
    ]
  },
  'compress-pdf': {
    slug: 'compress-pdf',
    path: '/compress-pdf/',
    title: 'Compress PDF Online',
    metaTitle: 'Compress PDF Online | PDFLove',
    metaDescription: 'Reduce PDF file size while maintaining document quality. Free client-side PDF compressor for email sharing and web uploads without server uploads.',
    h1: 'Compress PDF Files Online',
    subtitle: 'Reduce the file size of your PDF documents quickly for easier email attachments and web upload limits.',
    primaryKeyword: 'compress PDF',
    secondaryKeywords: ['reduce PDF file size', 'shrink PDF', 'PDF compressor online', 'optimize PDF'],
    icon: 'compress',
    badgeColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    steps: [
      { step: 1, title: 'Upload your PDF file', desc: 'Select or drag your PDF document into the compression dropzone.' },
      { step: 2, title: 'Select compression level', desc: 'Choose between Recommended (balanced quality/size), Extreme (smallest size), or Light compression.' },
      { step: 3, title: 'Click Compress PDF', desc: 'Our engine cleans redundant metadata, deduplicates objects, and compresses streams.' },
      { step: 4, title: 'Download your compressed PDF', desc: 'See your exact file size savings and download your lightweight PDF file.' }
    ],
    supportedFormats: ['PDF (.pdf)'],
    limitations: [
      'Maximum file size: 50MB',
      'Already highly compressed vector-only PDFs may yield modest reductions'
    ],
    faqs: [
      {
        question: 'Will compressing my PDF reduce text readability?',
        answer: 'No. Vector text, fonts, and hyperlinks remain sharp and fully readable. Compression focuses on stripping duplicate metadata and optimizing embedded stream dictionaries.'
      },
      {
        question: 'How much file size reduction can I expect?',
        answer: 'Reductions generally range from 20% to 70% depending on embedded images, uncompressed font subsets, and historical document revisions.'
      },
      {
        question: 'Is there a limit on how many times I can compress?',
        answer: 'You can use PDFLove as many times as you need without daily quotas or hidden charges.'
      }
    ],
    relatedTools: [
      { slug: 'merge-pdf', name: 'Merge PDF', path: '/merge-pdf/' },
      { slug: 'pdf-to-jpg', name: 'PDF to JPG', path: '/pdf-to-jpg/' },
      { slug: 'split-pdf', name: 'Split PDF', path: '/split-pdf/' }
    ]
  },
  'pdf-to-jpg': {
    slug: 'pdf-to-jpg',
    path: '/pdf-to-jpg/',
    title: 'Convert PDF to JPG Online',
    metaTitle: 'Convert PDF to JPG Online | PDFLove',
    metaDescription: 'Convert PDF pages into high quality JPG or PNG images online. Free, fast browser-side PDF to image converter with instant zip download.',
    h1: 'Convert PDF to JPG Online',
    subtitle: 'Extract high-resolution JPG images from every page of your PDF document in seconds.',
    primaryKeyword: 'convert PDF to JPG',
    secondaryKeywords: ['PDF pages to images', 'save PDF as JPG', 'PDF to image converter', 'extract images from PDF'],
    icon: 'image',
    badgeColor: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    steps: [
      { step: 1, title: 'Upload your PDF file', desc: 'Choose the PDF you want to turn into image files.' },
      { step: 2, title: 'Choose image quality', desc: 'Select High Quality (crisp, high DPI), Medium, or Standard web resolution.' },
      { step: 3, title: 'Click Convert to JPG', desc: 'Each page will be rendered onto high-precision canvas elements directly in your browser.' },
      { step: 4, title: 'Download your images', desc: 'Download individual JPG pictures or an organized ZIP bundle containing every page.' }
    ],
    supportedFormats: ['PDF (.pdf)'],
    limitations: [
      'Maximum file size: 50MB',
      'Output format: JPEG / PNG',
      'Protected PDFs must be unlocked prior to rendering'
    ],
    faqs: [
      {
        question: 'Will each page become a separate image?',
        answer: 'Yes! Every page in your PDF document is converted into an individual, crisp JPG image named sequentially.'
      },
      {
        question: 'Can I choose the output image quality?',
        answer: 'Yes, you can toggle between High Quality (optimal for printing and presentations) and Standard (great for quick email attachments).'
      },
      {
        question: 'Is there a limit on how many pages can be converted?',
        answer: 'You can convert documents up to 50 pages in a single click. For larger books, splitting them first gives the smoothest mobile performance.'
      }
    ],
    relatedTools: [
      { slug: 'jpg-to-pdf', name: 'JPG to PDF', path: '/jpg-to-pdf/' },
      { slug: 'compress-pdf', name: 'Compress PDF', path: '/compress-pdf/' },
      { slug: 'merge-pdf', name: 'Merge PDF', path: '/merge-pdf/' }
    ]
  },
  'jpg-to-pdf': {
    slug: 'jpg-to-pdf',
    path: '/jpg-to-pdf/',
    title: 'Convert JPG to PDF Online',
    metaTitle: 'Convert JPG to PDF Online | PDFLove',
    metaDescription: 'Convert JPG, JPEG, and PNG images into a professional PDF document. Adjust page orientation, margin, and order with 100% private browser processing.',
    h1: 'Convert JPG to PDF Online',
    subtitle: 'Combine JPG images into a clean, professional PDF document. Arrange image order and download your new PDF.',
    primaryKeyword: 'convert JPG to PDF',
    secondaryKeywords: ['images to PDF', 'JPG to PDF converter', 'photos to PDF', 'make PDF from images'],
    icon: 'images',
    badgeColor: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
    steps: [
      { step: 1, title: 'Upload your images', desc: 'Select multiple JPG, PNG, or WebP photos from your computer or phone.' },
      { step: 2, title: 'Arrange order & layout', desc: 'Drag images or use arrows to set page order, and pick Portrait or Landscape orientation.' },
      { step: 3, title: 'Click Convert to PDF', desc: 'Our client-side engine embeds images into a clean standardized PDF container.' },
      { step: 4, title: 'Download your PDF', desc: 'Save your combined PDF document ready for printing, emailing, or sharing.' }
    ],
    supportedFormats: ['JPG (.jpg, .jpeg)', 'PNG (.png)', 'WebP (.webp)'],
    limitations: [
      'Maximum 20 images per document',
      'Maximum file size: 50MB total'
    ],
    faqs: [
      {
        question: 'Can I add more images after uploading the first batch?',
        answer: 'Yes! You can continue adding images, rearrange them, or remove individual pictures before generating the PDF.'
      },
      {
        question: 'Will image quality be preserved?',
        answer: 'Yes, your images are embedded into the PDF using original resolution without destructive re-compression.'
      },
      {
        question: 'Can I combine both JPG and PNG files?',
        answer: 'Absolutely. You can mix and match JPG, JPEG, and PNG files in any order.'
      }
    ],
    relatedTools: [
      { slug: 'pdf-to-jpg', name: 'PDF to JPG', path: '/pdf-to-jpg/' },
      { slug: 'compress-pdf', name: 'Compress PDF', path: '/compress-pdf/' },
      { slug: 'rotate-pdf', name: 'Rotate PDF', path: '/rotate-pdf/' }
    ]
  },
  'pdf-to-word': {
    slug: 'pdf-to-word',
    path: '/pdf-to-word/',
    title: 'Convert PDF to Word Online',
    metaTitle: 'Convert PDF to Word Online | PDFLove',
    metaDescription: 'Convert PDF documents to editable Microsoft Word (.docx / .doc) files online. Extract text, tables, and paragraphs with browser-side privacy.',
    h1: 'Convert PDF to Word Online',
    subtitle: 'Convert PDF documents into editable Word documents without installing heavy desktop software.',
    primaryKeyword: 'convert PDF to Word',
    secondaryKeywords: ['PDF to DOCX', 'PDF to Word converter', 'edit PDF in Word', 'free PDF to Word'],
    icon: 'file-text',
    badgeColor: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
    steps: [
      { step: 1, title: 'Upload your PDF file', desc: 'Select your PDF document from your device.' },
      { step: 2, title: 'Choose conversion option', desc: 'Standard extraction (preserves text, headings, and formatting) or plain text layout.' },
      { step: 3, title: 'Click Convert to Word', desc: 'Our engine parses document streams, text positioning, and layout metadata.' },
      { step: 4, title: 'Download your Word file', desc: 'Open and edit your converted file directly in Microsoft Word, Google Docs, or LibreOffice.' }
    ],
    supportedFormats: ['PDF (.pdf)'],
    limitations: [
      'Text-based PDFs yield the highest formatting fidelity',
      'Scanned image-only PDFs without OCR text layers require OCR preprocessing',
      'Maximum file size: 50MB'
    ],
    faqs: [
      {
        question: 'Will my formatting and fonts be preserved?',
        answer: 'Text paragraphs, alignment, line breaks, and tables are preserved for standard digital PDFs. Complex graphics may be placed as inline elements.'
      },
      {
        question: 'Does this work with scanned PDFs?',
        answer: 'Scanned PDFs that consist only of raster photocopies contain no digital text stream. For scanned documents, an OCR tool is recommended first.'
      },
      {
        question: 'What Word applications can open the output file?',
        answer: 'The output is fully compatible with Microsoft Word (2007 through Microsoft 365), Google Docs, Apple Pages, and LibreOffice Writer.'
      }
    ],
    relatedTools: [
      { slug: 'word-to-pdf', name: 'Word to PDF', path: '/word-to-pdf/' },
      { slug: 'compress-pdf', name: 'Compress PDF', path: '/compress-pdf/' },
      { slug: 'split-pdf', name: 'Split PDF', path: '/split-pdf/' }
    ]
  },
  'word-to-pdf': {
    slug: 'word-to-pdf',
    path: '/word-to-pdf/',
    title: 'Convert Word to PDF Online',
    metaTitle: 'Convert Word to PDF Online | PDFLove',
    metaDescription: 'Convert DOC and DOCX Word documents into standardized PDF files. Fast, secure, and private browser-side conversion preserving formatting.',
    h1: 'Convert Word to PDF Online',
    subtitle: 'Turn Word documents into universal PDF files that look identical on any phone, tablet, or computer.',
    primaryKeyword: 'convert Word to PDF',
    secondaryKeywords: ['DOCX to PDF', 'Word to PDF converter', 'save Word as PDF', 'make DOCX PDF'],
    icon: 'file-type-2',
    badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    steps: [
      { step: 1, title: 'Upload your Word document', desc: 'Select your .docx or .doc file from your computer or phone.' },
      { step: 2, title: 'Review file details', desc: 'Verify document name and page count readiness.' },
      { step: 3, title: 'Click Convert to PDF', desc: 'Our engine translates paragraphs, styling, and structural elements into standardized vector PDF pages.' },
      { step: 4, title: 'Download your PDF', desc: 'Save your read-only, universally compatible PDF file.' }
    ],
    supportedFormats: ['DOCX (.docx)', 'Text (.txt)'],
    limitations: [
      'Maximum file size: 50MB',
      'Advanced proprietary macros (.docm) are converted in static text view'
    ],
    faqs: [
      {
        question: 'Will the PDF look identical on mobile and desktop?',
        answer: 'Yes! That is the core benefit of converting to PDF: fonts, margins, and page breaks are locked in place across all platforms.'
      },
      {
        question: 'Can anyone edit the resulting PDF?',
        answer: 'By default, the PDF is a standardized document. You can also add password security via our Protect PDF tool to restrict modifications.'
      }
    ],
    relatedTools: [
      { slug: 'pdf-to-word', name: 'PDF to Word', path: '/pdf-to-word/' },
      { slug: 'protect-pdf', name: 'Protect PDF', path: '/protect-pdf/' },
      { slug: 'merge-pdf', name: 'Merge PDF', path: '/merge-pdf/' }
    ]
  },
  'rotate-pdf': {
    slug: 'rotate-pdf',
    path: '/rotate-pdf/',
    title: 'Rotate PDF Pages Online',
    metaTitle: 'Rotate PDF Pages Online | PDFLove',
    metaDescription: 'Rotate upside-down or sideways PDF pages by 90, 180, or 270 degrees. Permanently fix PDF page orientation online for free in your browser.',
    h1: 'Rotate PDF Pages Online',
    subtitle: 'Rotate PDF pages to the correct orientation. Rotate all pages or specific pages and download the updated PDF.',
    primaryKeyword: 'rotate PDF pages online',
    secondaryKeywords: ['turn PDF pages', 'fix upside down PDF', 'rotate PDF 90 degrees', 'PDF page rotator'],
    icon: 'rotate-cw',
    badgeColor: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    steps: [
      { step: 1, title: 'Upload your PDF', desc: 'Select the PDF document that contains misoriented pages.' },
      { step: 2, title: 'Select rotation angle', desc: 'Choose 90° Clockwise, 180° (flip), or 270° (90° Counter-clockwise).' },
      { step: 3, title: 'Click Rotate PDF', desc: 'The rotation metadata is updated across target pages in milliseconds.' },
      { step: 4, title: 'Download your corrected PDF', desc: 'Save the permanently corrected PDF document.' }
    ],
    supportedFormats: ['PDF (.pdf)'],
    limitations: [
      'Maximum file size: 50MB',
      'Password-protected files must be unlocked first'
    ],
    faqs: [
      {
        question: 'Is the page rotation permanent?',
        answer: 'Yes! The page rotation metadata is baked permanently into the PDF document so it displays correctly in every viewer, browser, and printer.'
      },
      {
        question: 'Can all pages be rotated at once?',
        answer: 'Yes, you can rotate all pages simultaneously or choose a specific page range.'
      },
      {
        question: 'Does rotating degrade document quality?',
        answer: 'Not at all. Rotating simply updates the viewport orientation angle; vector text and high-res imagery remain 100% loss-free.'
      }
    ],
    relatedTools: [
      { slug: 'merge-pdf', name: 'Merge PDF', path: '/merge-pdf/' },
      { slug: 'split-pdf', name: 'Split PDF', path: '/split-pdf/' },
      { slug: 'compress-pdf', name: 'Compress PDF', path: '/compress-pdf/' }
    ]
  },
  'unlock-pdf': {
    slug: 'unlock-pdf',
    path: '/unlock-pdf/',
    title: 'Unlock PDF Files Online',
    metaTitle: 'Unlock PDF Files Online | PDFLove',
    metaDescription: 'Remove PDF password restrictions when authorized. Unlock owner password restrictions for printing, copying, and editing free in your browser.',
    h1: 'Unlock PDF Files Online',
    subtitle: 'Remove supported PDF restrictions when you are authorized to do so. Enter password if required to remove locks permanently.',
    primaryKeyword: 'unlock PDF',
    secondaryKeywords: ['remove PDF password', 'decrypt PDF online', 'remove PDF restrictions', 'PDF password remover'],
    icon: 'unlock',
    badgeColor: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    steps: [
      { step: 1, title: 'Upload your PDF file', desc: 'Select your locked or restricted PDF document.' },
      { step: 2, title: 'Enter password (if prompted)', desc: 'For open-encrypted PDFs, enter the valid authorization password.' },
      { step: 3, title: 'Click Unlock PDF', desc: 'Our engine strips the security wrapper and clears permission flags.' },
      { step: 4, title: 'Download your unlocked PDF', desc: 'Save an unencumbered version of your document ready for normal printing and copying.' }
    ],
    supportedFormats: ['PDF (.pdf)'],
    limitations: [
      'Only works with legal authorization for owned or permitted PDFs',
      'Strong 256-bit AES open passwords require entering the legitimate key',
      'Maximum file size: 50MB'
    ],
    faqs: [
      {
        question: 'What if I don\'t have the password for an encrypted file?',
        answer: 'Strong modern encryption cannot be brute-forced safely in a browser without knowing the owner or user password. If an open password was set, you must supply it.'
      },
      {
        question: 'Can all restrictions (print, copy, edit) be removed?',
        answer: 'Yes! Once unlocked, all permissions restrictions (preventing printing or text copying) are permanently cleared.'
      },
      {
        question: 'Is my password sent to your servers?',
        answer: 'Never. Passwords and files are decrypted strictly inside your local web browser session. We have zero knowledge of your credentials.'
      }
    ],
    relatedTools: [
      { slug: 'protect-pdf', name: 'Protect PDF', path: '/protect-pdf/' },
      { slug: 'merge-pdf', name: 'Merge PDF', path: '/merge-pdf/' },
      { slug: 'split-pdf', name: 'Split PDF', path: '/split-pdf/' }
    ]
  },
  'protect-pdf': {
    slug: 'protect-pdf',
    path: '/protect-pdf/',
    title: 'Protect PDF with a Password',
    metaTitle: 'Protect PDF with a Password | PDFLove',
    metaDescription: 'Encrypt and protect your confidential PDF files with a secure password. Prevent unauthorized opening, copying, and printing with client-side security.',
    h1: 'Protect PDF with a Password',
    subtitle: 'Add strong password protection to support confidential PDF documents. Choose security preferences before downloading.',
    primaryKeyword: 'protect PDF',
    secondaryKeywords: ['password protect PDF', 'encrypt PDF online', 'secure PDF file', 'add password to PDF'],
    icon: 'lock',
    badgeColor: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    steps: [
      { step: 1, title: 'Upload your PDF document', desc: 'Select the file you want to secure.' },
      { step: 2, title: 'Choose protection settings', desc: 'Select "Open password" (required to view) or "Permissions password" (restricts editing/printing).' },
      { step: 3, title: 'Enter a strong password', desc: 'Type your chosen password and confirm it carefully.' },
      { step: 4, title: 'Download your protected PDF', desc: 'Save your newly encrypted document.' }
    ],
    supportedFormats: ['PDF (.pdf)'],
    limitations: [
      'Maximum file size: 50MB',
      'Please remember your password; without it, recovering locked content is extremely difficult'
    ],
    faqs: [
      {
        question: 'What type of password protection is applied?',
        answer: 'You can choose between an Open Password (demanded each time someone tries to view the file) and a Permissions Password (which restricts editing, copying text, or printing).'
      },
      {
        question: 'Can PDFLove recover my password if I forget it?',
        answer: 'No. Because encryption occurs client-side and we store zero copies or master keys, only you hold the password. Please store it safely.'
      },
      {
        question: 'Does the recipient need special software to open it?',
        answer: 'No! Standard viewers like Adobe Acrobat, Google Chrome, Safari, Microsoft Edge, iOS Files, and Android PDF reader will automatically prompt for the password.'
      }
    ],
    relatedTools: [
      { slug: 'unlock-pdf', name: 'Unlock PDF', path: '/unlock-pdf/' },
      { slug: 'compress-pdf', name: 'Compress PDF', path: '/compress-pdf/' },
      { slug: 'merge-pdf', name: 'Merge PDF', path: '/merge-pdf/' }
    ]
  }
};

export const SITE_METADATA = {
  name: 'PDFLove',
  domain: 'https://www.pdflove.store',
  canonicalHome: 'https://www.pdflove.store/',
  tagline: 'All Your PDF Tools in One Place',
  subtagline: 'Simple. Fast. Secure. PDF processing made easy.',
  publisherId: 'ca-pub-3119328825793675',
  contactEmail: 'support@pdflove.store',
  addressCountry: 'US',
  socialLinks: {
    twitter: 'https://twitter.com/PDFLoveStore',
    github: 'https://github.com/pdflove',
    facebook: 'https://facebook.com/PDFLoveStore'
  }
};
