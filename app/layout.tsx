import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE_METADATA } from '@/lib/seo-data';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.domain),
  title: {
    default: 'PDFLove — Free Online PDF Tools | Merge, Split, Compress & Convert',
    template: '%s | PDFLove'
  },
  description: 'All your PDF tools in one place. Merge, split, compress, convert PDF to JPG/Word, rotate, unlock, and protect PDF files free in your browser with zero file uploads.',
  applicationName: 'PDFLove',
  keywords: [
    'pdf tools',
    'merge pdf',
    'split pdf',
    'compress pdf',
    'pdf to jpg',
    'jpg to pdf',
    'pdf to word',
    'word to pdf',
    'rotate pdf',
    'unlock pdf',
    'protect pdf',
    'free pdf editor online',
    'browser pdf processor'
  ],
  authors: [{ name: 'PDFLove Team' }],
  creator: 'PDFLove',
  publisher: 'PDFLove',
  other: {
    'geo.region': 'US',
    'geo.placename': 'United States',
    'geo.position': '37.09024;-95.712891',
    'ICBM': '37.09024, -95.712891',
    'distribution': 'global',
    'rating': 'general'
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  alternates: {
    canonical: SITE_METADATA.canonicalHome
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_METADATA.canonicalHome,
    siteName: SITE_METADATA.name,
    title: 'PDFLove — Free Online PDF Tools | Merge, Split, Compress & Convert',
    description: 'All your PDF tools in one place. Merge, split, compress, convert PDF to JPG/Word, rotate, unlock, and protect PDF files free with 100% browser privacy.',
    images: [
      {
        url: '/assets/aistudio/file_00000000f6ac8211b7b9e5c6075530f0_d596917c.png',
        width: 1200,
        height: 630,
        alt: 'PDFLove — All Your PDF Tools in One Place'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDFLove — Free Online PDF Tools',
    description: 'All your PDF tools in one place. Simple, fast, secure PDF processing made easy in your browser.',
    images: ['/assets/aistudio/file_00000000f6ac8211b7b9e5c6075530f0_d596917c.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const globalSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_METADATA.domain}/#website`,
        url: SITE_METADATA.domain,
        name: SITE_METADATA.name,
        description: 'All Your PDF Tools in One Place. Simple, Fast, Secure PDF processing.',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_METADATA.domain}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_METADATA.domain}/#organization`,
        name: SITE_METADATA.name,
        url: SITE_METADATA.domain,
        email: SITE_METADATA.contactEmail,
        sameAs: [
          SITE_METADATA.socialLinks.twitter,
          SITE_METADATA.socialLinks.facebook,
          SITE_METADATA.socialLinks.github
        ]
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense official script inside <head> */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3119328825793675"
          crossOrigin="anonymous"
        />

        {/* Global WebSite and Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased transition-colors duration-200">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
