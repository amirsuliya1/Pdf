import React from 'react';
import Link from 'next/link';
import { Heart, Github, Twitter, Facebook } from 'lucide-react';
import { SITE_METADATA } from '@/lib/seo-data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-600 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                PDF<span className="text-indigo-400">Love</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Simple PDF tools for everyday needs. Fast, private, and secure browser-side processing with zero file uploads.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/merge-pdf/" className="hover:text-white transition-colors">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link href="/split-pdf/" className="hover:text-white transition-colors">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link href="/compress-pdf/" className="hover:text-white transition-colors">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link href="/about/" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy/" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms/" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                  XML Sitemap
                </Link>
              </li>
              <li>
                <Link href="/robots.txt" className="hover:text-white transition-colors">
                  Robots.txt
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Follow Us
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Stay connected with updates, new tools, and browser productivity features.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SITE_METADATA.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PDFLove on Twitter"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={SITE_METADATA.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PDFLove on Facebook"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={SITE_METADATA.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PDFLove on GitHub"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {currentYear} PDFLove.store. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Browser-Side Privacy</span>
            <span>Zero Server Uploads</span>
            <span>Free &amp; Open Web</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
