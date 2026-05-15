import React from 'react';

export default function JsonLd() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Closer Intellect AI",
    "url": "https://closerintellect.ai",
    "logo": "https://closerintellect.ai/favicon.ico",
    "sameAs": [
      "https://twitter.com/closerintellect",
      "https://linkedin.com/company/closerintellect"
    ],
    "description": "Automate your sales outreach with AI Voice, SMS, and Lead Management."
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Closer Intellect AI",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "120"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />
    </>
  );
}
