import { MetadataRoute } from 'next';
import { SITE_METADATA } from '@/lib/seo-data';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/']
    },
    sitemap: `${SITE_METADATA.domain}/sitemap.xml`
  };
}
