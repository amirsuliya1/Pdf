import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, ShieldCheck, Zap, Smartphone, CheckCircle, ArrowRight } from 'lucide-react';
import { SITE_METADATA } from '@/lib/seo-data';

export const metadata: Metadata = {
  title: 'About PDFLove — Simple, Fast & Secure Online PDF Tools',
  description: 'Learn about PDFLove mission to provide free, private, client-side PDF processing tools with zero document storage or server uploads.',
  alternates: {
    canonical: `${SITE_METADATA.domain}/about/`
  }
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
          Home
        </Link>
        <span>&gt;</span>
        <span className="text-slate-900 dark:text-white font-medium">About Us</span>
      </nav>

      <div className="text-center mb-12">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Heart className="w-7 h-7 fill-indigo-600 dark:fill-indigo-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          About PDFLove
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          PDFLove is a simple and easy-to-use online platform for working with PDF files. We provide free tools to merge, split, compress, convert, rotate, and protect PDF documents. Our goal is to make PDF processing accessible, ultra-fast, and completely private for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">Simple</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Easy-to-use interface with zero complicated menus or bloat.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">Secure</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Your privacy matters. All computations run in your local browser.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
            <Smartphone className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">Reliable</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Works seamlessly across phone, tablet, laptop, and desktop.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          We aim to provide high-quality, easy-to-use tools that help you get things done without expensive software licenses or invasive document tracking. Traditional PDF utilities require installing heavy desktop software or uploading sensitive tax, financial, or personal records to unknown third-party cloud servers.
        </p>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          PDFLove was engineered from the ground up on modern WebAssembly and JavaScript standards, enabling your device to perform PDF merges, splits, compressions, rotations, and conversions locally in your browser memory.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all"
          >
            <span>Explore PDF Tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
