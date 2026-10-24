import PrivacyPage from '../privacy/page';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/lib/seo-data';

export const metadata: Metadata = {
  title: 'Privacy Policy — PDFLove Online Tools',
  description: 'Understand how PDFLove protects your privacy with 100% in-browser processing, zero server file uploads, and no document storage.',
  alternates: {
    canonical: `${SITE_METADATA.domain}/privacy-policy/`
  }
};

export default PrivacyPage;
