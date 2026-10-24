'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Layers, 
  Scissors, 
  Minimize2, 
  Image as ImageIcon, 
  FileImage, 
  FileText, 
  FileType, 
  RotateCw, 
  Unlock, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { ToolSEO } from '@/lib/seo-data';

const ICONS: Record<string, React.ReactNode> = {
  merge: <Layers className="w-6 h-6 text-rose-500" />,
  split: <Scissors className="w-6 h-6 text-blue-500" />,
  compress: <Minimize2 className="w-6 h-6 text-emerald-500" />,
  image: <ImageIcon className="w-6 h-6 text-amber-500" />,
  images: <FileImage className="w-6 h-6 text-cyan-500" />,
  'file-text': <FileText className="w-6 h-6 text-indigo-500" />,
  'file-type-2': <FileType className="w-6 h-6 text-blue-600" />,
  'rotate-cw': <RotateCw className="w-6 h-6 text-purple-500" />,
  unlock: <Unlock className="w-6 h-6 text-amber-600" />,
  lock: <Lock className="w-6 h-6 text-purple-600" />
};

export default function ToolCard({ tool }: { tool: ToolSEO }) {
  return (
    <Link
      href={tool.path}
      className="group relative flex flex-col justify-between p-6 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-sm hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500 hover:-translate-y-1 transition-all duration-200"
    >
      <div>
        {/* Tool Icon badge */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border ${tool.badgeColor} group-hover:scale-105 transition-transform shadow-sm`}>
          {ICONS[tool.icon] || <Layers className="w-6 h-6 text-indigo-500" />}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
          {tool.title.replace(' Online', '').replace(' with a Password', '')}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
          {tool.subtitle}
        </p>
      </div>

      {/* Action link */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
        <span>Use Tool</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
