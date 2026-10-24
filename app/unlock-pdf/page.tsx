import type { Metadata } from 'next';
import { TOOLS_CONFIG, SITE_METADATA } from '@/lib/seo-data';
import ToolInterface from '@/components/ToolInterface';
import ToolJsonLd from '@/components/JsonLd';

const tool = TOOLS_CONFIG['unlock-pdf'];

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: {
    canonical: `${SITE_METADATA.domain}${tool.path}`
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `${SITE_METADATA.domain}${tool.path}`,
    siteName: SITE_METADATA.name,
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: tool.metaTitle,
    description: tool.metaDescription
  }
};

export default function UnlockPdfPage() {
  return (
    <>
      <ToolJsonLd tool={tool} />
      <ToolInterface tool={tool} />
    </>
  );
}
