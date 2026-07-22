import React from 'react';

interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> | Record<string, any>[];
}

/**
 * Renders a JSON-LD structured data script tag.
 * Accepts a single schema object or an array of schema objects.
 */
export function JsonLd({ data }: JsonLdProps) {
  const schema = Array.isArray(data)
    ? { '@context': 'https://schema.org', '@graph': data }
    : data;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
