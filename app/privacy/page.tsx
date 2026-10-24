import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, ServerOff } from 'lucide-react';
import { SITE_METADATA } from '@/lib/seo-data';

export const metadata: Metadata = {
  title: 'Privacy Policy — PDFLove Online Tools',
  description: 'Understand how PDFLove protects your privacy with 100% in-browser processing, zero server file uploads, and no document storage.',
  alternates: {
    canonical: `${SITE_METADATA.domain}/privacy/`
  }
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
          Home
        </Link>
        <span>&gt;</span>
        <span className="text-slate-900 dark:text-white font-medium">Privacy Policy</span>
      </nav>

      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Privacy Policy
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          Your privacy is paramount. This policy explains how PDFLove handles your documents, data, and security.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <ServerOff className="w-5 h-5 text-indigo-500" />
            <h2>Zero Document Uploads — 100% Browser Processing</h2>
          </div>
          <p>
            PDFLove operates fundamentally differently from traditional PDF web services. All operations — including merging, splitting, compressing, rotating, converting, and protecting files — are executed strictly within your web browser using client-side WebAssembly and modern JavaScript APIs.
          </p>
          <p>
            Your confidential files, tax forms, contracts, and private photos <strong>never leave your device</strong>. We do not transmit document binaries over the internet to remote servers, and we never save, index, or inspect your documents.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <Lock className="w-5 h-5 text-indigo-500" />
            <h2>Information We Collect</h2>
          </div>
          <p>
            Because we do not require account registration or user sign-ups, we do not collect your name, physical address, or password. We do not maintain user profile databases.
          </p>
          <p>
            If you voluntarily submit our Contact form, your name, email address, and message content are sent to our support inbox solely to reply to your inquiry.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <EyeOff className="w-5 h-5 text-indigo-500" />
            <h2>Cookies &amp; Google AdSense</h2>
          </div>
          <p>
            We may display advertisements served by Google AdSense to support the maintenance of this free service. Google and its partners may use cookies to serve ads based on prior visits to our website or other sites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting Google&apos;s Ads Settings (<a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 underline">https://adssettings.google.com/</a>).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Document Memory &amp; Security
          </h2>
          <p>
            Temporary blob URLs generated for downloading processed files are automatically revoked and released from memory as soon as you download the file or refresh the page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Contact Regarding Privacy
          </h2>
          <p>
            For any questions or privacy inquiries, contact our data protection team at{' '}
            <a href={`mailto:${SITE_METADATA.contactEmail}`} className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
              {SITE_METADATA.contactEmail}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
