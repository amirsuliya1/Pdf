import type { Metadata } from 'next';
import Link from 'next/link';
import { FileCheck, ShieldAlert, Award } from 'lucide-react';
import { SITE_METADATA } from '@/lib/seo-data';

export const metadata: Metadata = {
  title: 'Terms of Service — PDFLove Online Tools',
  description: 'Read the terms of service governing use of PDFLove free online PDF utilities, client-side processing, and acceptable use policies.',
  alternates: {
    canonical: `${SITE_METADATA.domain}/terms/`
  }
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
          Home
        </Link>
        <span>&gt;</span>
        <span className="text-slate-900 dark:text-white font-medium">Terms of Service</span>
      </nav>

      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
          <FileCheck className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Terms of Service
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          By using PDFLove, you agree to these clear and fair terms. Please review them before using our tools.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-500" />
            1. Ownership of Your Documents
          </h2>
          <p>
            You retain 100% ownership and copyright of all documents, images, and content you process with PDFLove. Because all file processing takes place entirely on your device, PDFLove never claims, gains, or seeks any license or rights to your intellectual property.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            2. Permitted Use of Services
          </h2>
          <p>
            PDFLove provides free tools for personal, educational, and commercial purposes. You agree to use the services only for lawful activities and in compliance with all applicable local, national, and international laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            3. Prohibited Activities
          </h2>
          <p>When using PDFLove, you agree not to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Attempt to decrypt or unlock PDF files for which you do not possess legal authorization or ownership.</li>
            <li>Use automated scrapers, bots, or DDoS tools that impair the availability of the web application for other users.</li>
            <li>Misrepresent the identity of PDFLove or frame our tools within deceptive phishing environments.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            4. Disclaimer of Warranties
          </h2>
          <p>
            PDFLove is provided &ldquo;as is&rdquo; without warranties of any kind, whether express or implied. While we strive for the highest degree of reliability, precision, and fidelity in browser-side document handling, you are advised to retain backup copies of all original documents.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            5. Modifications to Terms
          </h2>
          <p>
            We reserve the right to revise or update these terms at any time. Continued use of the website following published updates signifies your acceptance of the revised terms.
          </p>
        </section>
      </div>
    </div>
  );
}
