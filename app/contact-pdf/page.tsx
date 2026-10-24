import ContactPage from '../contact/page';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/lib/seo-data';

export const metadata: Metadata = {
  title: 'Contact PDFLove Support — Help & Inquiries',
  description: 'Reach out to the PDFLove team for assistance, feature suggestions, or feedback regarding our online PDF tools.',
  alternates: {
    canonical: `${SITE_METADATA.domain}/contact/`
  }
};

export default ContactPage;
