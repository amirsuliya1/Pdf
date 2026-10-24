'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Upload, 
  Cpu, 
  Download, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  Smile, 
  ChevronDown, 
  ChevronUp, 
  FileText,
  Lock,
  Layers,
  ArrowRight
} from 'lucide-react';
import { TOOLS_CONFIG } from '@/lib/seo-data';
import ToolCard from '@/components/ToolCard';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const allTools = Object.values(TOOLS_CONFIG);
  const filteredTools = allTools.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.secondaryKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const homeFaqs = [
    {
      q: 'Is PDFLove free to use?',
      a: 'Yes, PDFLove is 100% free to use. There are no subscriptions, hidden fees, paywalls, or limits on standard document processing.'
    },
    {
      q: 'What file formats are supported?',
      a: 'PDFLove supports standard PDF documents (.pdf), popular image formats (JPG, JPEG, PNG, WebP), and Word documents (.docx, .doc, .txt).'
    },
    {
      q: 'Is my data safe and private?',
      a: 'Completely safe. Unlike legacy PDF sites that upload your sensitive documents to remote servers, PDFLove executes all operations right inside your local web browser. Your confidential files never leave your device.'
    },
    {
      q: 'Do I need to create an account or install software?',
      a: 'No account, login, or software installation is required. Simply open the website on your phone, tablet, or computer and begin processing immediately.'
    }
  ];

  const homeFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      {/* Hero Section */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% In-Browser Privacy &bull; Zero Server Uploads</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          All Your PDF Tools <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            in One Place.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 font-normal">
          Simple. Fast. Secure. PDF processing made easy.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative mb-6">
          <div className="relative flex items-center shadow-lg shadow-indigo-500/5 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-indigo-500">
            <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to do with your PDF?"
              className="w-full px-4 py-4 text-sm sm:text-base text-slate-900 dark:text-white bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mr-3 px-2 py-1 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              className="mr-2 p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              aria-label="Search tools"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
          {searchQuery && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-left pl-2">
              Showing {filteredTools.length} matching tool{filteredTools.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </section>

      {/* Our PDF Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Our PDF Tools
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Choose a tool below to get started
          </p>
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-2">
              No matching tools found for &quot;{searchQuery}&quot;
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Show all tools
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}
      </section>

      {/* How PDFLove Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            How PDFLove Works
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Three simple steps to process any PDF file effortlessly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative bg-white dark:bg-slate-800/60 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 font-black text-xl">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Upload
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Select your PDF file or drag and drop it into the tool area from your phone or PC.
            </p>
          </div>

          <div className="relative bg-white dark:bg-slate-800/60 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 font-black text-xl">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Process
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Files are processed instantly in your browser session with zero server delay.
            </p>
          </div>

          <div className="relative bg-white dark:bg-slate-800/60 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 font-black text-xl">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Download
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Download your output document directly to your device ready to share or print.
            </p>
          </div>
        </div>
      </section>

      {/* Your Privacy Matters Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Your Privacy Matters
          </h2>
          <p className="text-sm sm:text-base text-indigo-100 max-w-2xl mx-auto mb-6 leading-relaxed">
            Your files are processed securely in your browser with strict privacy measures. We never share, sell, or store your private documents.
          </p>
          <Link
            href="/privacy/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-white text-indigo-900 hover:bg-indigo-50 transition-colors shadow-md"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Why Choose PDFLove? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Why Choose PDFLove?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Engineered for speed, privacy, and modern browser standards
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-4">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Easy to Use
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Simple and clean interface designed for immediate productivity with zero learning curve.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Fast Processing
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Get instant results without waiting in long server upload queues or bandwidth throttling.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Secure &amp; Private
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Files remain on your device. We store zero document copies or metadata logs.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Works on Any Device
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Desktop, iPhone, Android, iPad, or Chromebook — responsive on every screen size.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Common questions about PDFLove tools and browser-side file processing
            </p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {homeFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span className="text-base">{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 shrink-0 text-slate-400" /> : <ChevronDown className="w-5 h-5 shrink-0 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in duration-150">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Tools & Resources */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Related Tools &amp; Resources
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {allTools.map((t) => (
            <Link
              key={t.slug}
              href={t.path}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:shadow-sm transition-all"
            >
              {t.title.replace(' Online', '').replace(' with a Password', '')}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
