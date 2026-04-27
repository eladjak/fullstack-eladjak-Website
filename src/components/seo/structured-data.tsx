import Script from 'next/script';
import { headers } from 'next/headers';

interface Person {
  '@type': 'Person';
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  worksFor?: {
    '@type': 'Organization';
    name: string;
  };
  sameAs?: string[];
}

interface Article {
  '@type': 'Article' | 'BlogPosting' | 'TechArticle';
  headline: string;
  description?: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: Person;
  publisher?: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
}

interface WebSite {
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  inLanguage?: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

interface ProfilePage {
  '@type': 'ProfilePage';
  name: string;
  url: string;
  mainEntity: Person;
}

interface LocalBusiness {
  '@type': 'ProfessionalService';
  name: string;
  description?: string;
  url?: string;
  image?: string;
  telephone?: string;
  email?: string;
  address?: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  priceRange?: string;
  areaServed?: string;
  knowsLanguage?: string[];
  hasOfferCatalog?: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: Array<{
      '@type': 'Offer';
      itemOffered: {
        '@type': 'Service';
        name: string;
        description: string;
      };
    }>;
  };
}

type StructuredDataType = Person | Article | WebSite | ProfilePage | LocalBusiness | object;

interface StructuredDataProps {
  data: StructuredDataType;
}

export async function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    ...data,
  };

  // Generate unique ID from the @type field or use a fallback
  const dataObj = data as unknown as Record<string, unknown>;
  const typeId = (dataObj['@type'] ? String(dataObj['@type']) : 'generic').toLowerCase();

  // Per-request nonce from src/proxy.ts so this inline JSON-LD script
  // satisfies our nonce-based CSP (no 'unsafe-inline' fallback).
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <Script
      id={`structured-data-${typeId}`}
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Pre-built structured data generators
export const structuredDataGenerators = {
  person: (name: string, url?: string, jobTitle?: string): Person => ({
    '@type': 'Person',
    name,
    url: url || 'https://fullstack-eladjak.co.il',
    image: 'https://avatars.githubusercontent.com/u/108827199?v=4',
    jobTitle: jobTitle || 'מפתח Full-Stack ומומחה AI',
    worksFor: {
      '@type': 'Organization',
      name: 'HiTec Learning',
    },
    sameAs: [
      'https://github.com/eladjak',
      'https://linkedin.com/in/eladjak',
    ],
  }),

  article: (
    headline: string,
    description: string,
    datePublished: string,
    author: string,
    imageUrl?: string,
    dateModified?: string
  ): Article => ({
    '@type': 'BlogPosting',
    headline,
    description,
    image: imageUrl,
    datePublished,
    dateModified: dateModified || datePublished,
    author: structuredDataGenerators.person(author),
    publisher: {
      '@type': 'Organization',
      name: 'אלעד יעקובוביץ\'',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fullstack-eladjak.co.il/logo.png',
      },
    },
  }),

  website: (): WebSite => ({
    '@type': 'WebSite',
    name: 'אלעד יעקובוביץ\' - מפתח Full-Stack ומומחה AI',
    url: 'https://fullstack-eladjak.co.il',
    description: 'מפתח Full-Stack המתמחה ב-Next.js, React, TypeScript ואינטגרציית AI. בניית אפליקציות ווב מודרניות, אוטומציה עסקית ופתרונות טכנולוגיים.',
    inLanguage: 'he-IL',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://fullstack-eladjak.co.il/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }),

  profilePage: (): ProfilePage => ({
    '@type': 'ProfilePage',
    name: 'אלעד יעקובוביץ\' - פרופיל מקצועי',
    url: 'https://fullstack-eladjak.co.il/about',
    mainEntity: structuredDataGenerators.person(
      'אלעד יעקובוביץ\'',
      'https://fullstack-eladjak.co.il',
      'מפתח Full-Stack ומומחה AI'
    ),
  }),

  localBusiness: (): LocalBusiness => ({
    '@type': 'ProfessionalService',
    name: 'אלעד יעקובוביץ\' - פיתוח תוכנה ופתרונות AI',
    description: 'שירותי פיתוח Full-Stack, אינטגרציית AI, בניית אפליקציות ווב ואוטומציה עסקית. מגדל העמק, ישראל.',
    url: 'https://fullstack-eladjak.co.il',
    image: 'https://fullstack-eladjak.co.il/og-image.png',
    telephone: '+972-52-542-7474',
    email: 'eladhiteclearning@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'מגדל העמק',
      addressRegion: 'צפון',
      addressCountry: 'IL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.6711,
      longitude: 35.2408,
    },
    priceRange: '$$',
    areaServed: 'ישראל',
    knowsLanguage: ['he', 'en'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'שירותי פיתוח תוכנה',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'פיתוח Full-Stack',
            description: 'בניית אפליקציות ווב מודרניות עם Next.js, React ו-TypeScript. מדפי נחיתה ועד מערכות SaaS מורכבות.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'פתרונות AI ואוטומציה',
            description: 'הטמעת בינה מלאכותית בתהליכי עסק. צ\'אטבוטים, אוטומציית תהליכים ואינטגרציית OpenAI / Claude.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'אוטומציית WhatsApp',
            description: 'סוכני WhatsApp חכמים שעובדים 24/7. מענה אוטומטי, תזמון פגישות ואינטגרציה עם CRM.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'סדנאות AI ופיתוח',
            description: 'סדנאות מעשיות ללמידת כלי AI לפיתוח תוכנה ואוטומציה עסקית.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'פתרונות EdTech',
            description: 'פלטפורמות למידה ואפליקציות חינוכיות עם AI, מעקב התקדמות ותוכן מותאם.',
          },
        },
      ],
    },
  }),
};
