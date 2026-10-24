'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Heart, 
  ChevronDown, 
  Menu, 
  X, 
  Layers, 
  Scissors, 
  Minimize2, 
  Image as ImageIcon, 
  FileImage, 
  FileText, 
  FileType, 
  RotateCw, 
  Unlock, 
  Lock 
} from 'lucide-react';
import { TOOLS_CONFIG } from '@/lib/seo-data';

const TOOL_ICONS: Record<string, React.ReactNode> = {
  'merge-pdf': <Layers className="w-4 h-4 text-rose-500" />,
  'split-pdf': <Scissors className="w-4 h-4 text-blue-500" />,
  'compress-pdf': <Minimize2 className="w-4 h-4 text-emerald-500" />,
  'pdf-to-jpg': <ImageIcon className="w-4 h-4 text-amber-500" />,
  'jpg-to-pdf': <FileImage className="w-4 h-4 text-cyan-500" />,
  'pdf-to-word': <FileText className="w-4 h-4 text-indigo-500" />,
  'word-to-pdf': <FileType className="w-4 h-4 text-blue-600" />,
  'rotate-pdf': <RotateCw className="w-4 h-4 text-purple-500" />,
  'unlock-pdf': <Unlock className="w-4 h-4 text-amber-600" />,
  'protect-pdf': <Lock className="w-4 h-4 text-purple-600" />
};

export default function Navbar() {
  const pathname = usePathname();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenus = () => {
    setToolsOpen(false);
    setMobileMenuOpen(false);
  };

  const toolsList = Object.values(TOOLS_CONFIG);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            onClick={closeMenus}
            className="flex items-center gap-2 group text-decoration-none focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-600 flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
              PDF<span className="text-indigo-600 dark:text-indigo-400">Love</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              onClick={closeMenus}
              className={`text-sm font-semibold transition-colors ${
                pathname === '/' 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              Home
            </Link>

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setToolsOpen(!toolsOpen)}
                onMouseEnter={() => setToolsOpen(true)}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors py-2 focus:outline-none"
                aria-expanded={toolsOpen}
              >
                <span>Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsOpen && (
                <div 
                  onMouseLeave={() => setToolsOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  {toolsList.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={tool.path}
                      onClick={closeMenus}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                        {TOOL_ICONS[tool.slug] || <Layers className="w-4 h-4 text-indigo-500" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {tool.title.replace(' Online', '').replace(' with a Password', '')}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[170px]">
                          {tool.primaryKeyword}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about/"
              onClick={closeMenus}
              className={`text-sm font-semibold transition-colors ${
                pathname === '/about/' || pathname === '/about'
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              About
            </Link>

            <Link
              href="/contact/"
              onClick={closeMenus}
              className={`text-sm font-semibold transition-colors ${
                pathname === '/contact/' || pathname === '/contact' || pathname === '/contact-pdf/'
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Controls: Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* Mobile menu hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2.5 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={closeMenus}
              className="px-3 py-2 rounded-lg font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Home
            </Link>
            <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              PDF Tools
            </div>
            <div className="grid grid-cols-2 gap-1.5 pl-2">
              {toolsList.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.path}
                  onClick={closeMenus}
                  className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {TOOL_ICONS[tool.slug]}
                  <span className="truncate">{tool.title.replace(' Online', '').replace(' with a Password', '')}</span>
                </Link>
              ))}
            </div>
            <Link
              href="/about/"
              onClick={closeMenus}
              className="px-3 py-2 rounded-lg font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              About
            </Link>
            <Link
              href="/contact/"
              onClick={closeMenus}
              className="px-3 py-2 rounded-lg font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
