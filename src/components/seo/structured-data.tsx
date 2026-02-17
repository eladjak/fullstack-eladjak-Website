import Script from 'next/script';

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

type StructuredDataType = Person | Article | WebSite | ProfilePage | object;

interface StructuredDataProps {
  data: StructuredDataType;
}

export function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    ...data,
  };

  // Generate unique ID from the @type field or use a fallback
  const dataObj = data as unknown as Record<string, unknown>;
  const typeId = (dataObj['@type'] ? String(dataObj['@type']) : 'generic').toLowerCase();

  return (
    <Script
      id={`structured-data-${typeId}`}
      type="application/ld+json"
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
    jobTitle: jobTitle || 'Full-Stack Developer',
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
      name: 'Elad Ya\'akobovitch',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fullstack-eladjak.co.il/logo.png',
      },
    },
  }),

  website: (): WebSite => ({
    '@type': 'WebSite',
    name: 'Elad Ya\'akobovitch - Full-Stack Developer',
    url: 'https://fullstack-eladjak.co.il',
    description: 'Full-Stack Developer portfolio showcasing projects in Next.js, React, TypeScript, and more.',
    inLanguage: 'he-IL',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://fullstack-eladjak.co.il/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }),

  profilePage: (): ProfilePage => ({
    '@type': 'ProfilePage',
    name: 'Elad Ya\'akobovitch - Professional Profile',
    url: 'https://fullstack-eladjak.co.il/about',
    mainEntity: structuredDataGenerators.person(
      'Elad Ya\'akobovitch',
      'https://fullstack-eladjak.co.il',
      'Full-Stack Developer & Software Engineer'
    ),
  }),
};
