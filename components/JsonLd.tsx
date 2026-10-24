import React from 'react';
import { ToolSEO, SITE_METADATA } from '@/lib/seo-data';

export default function ToolJsonLd({ tool }: { tool: ToolSEO }) {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_METADATA.canonicalHome
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: tool.title,
          item: `${SITE_METADATA.domain}${tool.path}`
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: `${tool.title} — PDFLove`,
      operatingSystem: 'All (Web Browser, iOS, Android, macOS, Windows, Linux)',
      applicationCategory: 'UtilitiesApplication',
      description: tool.metaDescription,
      url: `${SITE_METADATA.domain}${tool.path}`,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      browserRequirements: 'Requires JavaScript. Requires HTML5.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to ${tool.title.replace(' Online', '').replace(' with a Password', '')}`,
      description: tool.subtitle,
      step: tool.steps.map((st, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        name: st.title,
        text: st.desc
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tool.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }
      }))
    }
  ];

  return (
    <>
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
