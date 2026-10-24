import { MetadataRoute } from 'next';
import { TOOLS_CONFIG, SITE_METADATA } from '@/lib/seo-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_METADATA.domain;
  const currentDate = new Date().toISOString().split('T')[0];

  const toolRoutes = Object.values(TOOLS_CONFIG).map((tool) => ({
    url: `${baseUrl}${tool.path}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }));

  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/privacy/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5
    },
    {
      url: `${baseUrl}/privacy-policy/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5
    }
  ];

  return [...staticRoutes, ...toolRoutes];
}
