'use client';

import { useEffect } from 'react';

interface MetaTagsConfig {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  url?: string;
}

export function useMetaTags(config: MetaTagsConfig) {
  useEffect(() => {
    // Set default meta tags
    document.title = config.title || 'Portfolio';
    
    // Update meta description
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', config.description || '');

    // Update Open Graph tags
    const metaTags = {
      'og:title': config.title,
      'og:description': config.description,
      'og:image': config.image,
      'og:type': config.type || 'website',
      'og:url': config.url || window.location.href,
      'twitter:card': 'summary_large_image',
      'twitter:title': config.title,
      'twitter:description': config.description,
      'twitter:image': config.image,
    };

    Object.entries(metaTags).forEach(([property, content]) => {
      if (!content) return;
      
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });
  }, [config]);
}
