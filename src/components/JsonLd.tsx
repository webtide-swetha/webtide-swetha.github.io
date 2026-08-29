import { brand } from "../data/brand";
import { services } from "../data/services";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: brand.fullName,
    description: brand.description,
    url: brand.liveUrl,
    email: brand.email,
    telephone: brand.phoneE164,
    founder: {
      "@type": "Person",
      name: brand.founder,
      jobTitle: brand.role,
    },
    areaServed: "Tamil Nadu, India",
    sameAs: [brand.instagramUrl, brand.linkedinUrl],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
