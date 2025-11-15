const fallbackUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.nivesh.dev").replace(/\/+$/, "");

export const siteMetadata = {
  name: "Nivesh Elangovanraaj",
  legalName: "Nivesh Kannan Elangovanraaj",
  givenName: "Nivesh",
  familyName: "Elangovanraaj",
  jobTitle: "Lead Data Scientist & Analytics Leader",
  title: "Nivesh Elangovanraaj - Data Scientist",
  description:
    "Los Angeles based data scientist and analytics leader helping US organizations deploy practical AI, forecasting, and decision support systems that drive measurable business impact.",
  url: fallbackUrl,
  locale: "en_US",
  email: "nivesh@ucla.edu",
  phone: "+1-682-403-0035",
  nationality: "Indian",
  occupation: {
    name: "Data Scientist",
    category: "15-2051",
    description: "Designs and deploys analytics, forecasting, and AI systems for business decision-making.",
  },
  location: {
    city: "Los Angeles",
    region: "CA",
    country: "US",
  },
  knowsAbout: [
    "Data science",
    "Business analytics",
    "Machine learning",
    "Forecasting models",
    "Real-world evidence analytics",
    "Healthcare analytics",
    "Financial analytics",
    "Ecommerce analytics",
    "AI systems for business impact",
  ],
  keywords: [
    "Nivesh Elangovanraaj",
    "Nivesh Kannan Elangovanraaj",
    "Nivesh data scientist",
    "Los Angeles data scientist",
    "Los Angeles AI consultant",
    "Data science portfolio",
    "Analytics leader",
    "Business analytics",
    "Machine learning",
    "UCLA MSBA",
    "Healthcare analytics",
    "Financial analytics",
    "Ecommerce analytics"
  ],
  ogImage: "/images/hero/coat suit - small.jpg",
  sameAs: [
    "https://www.linkedin.com/in/nivesh-elangovanraaj/",
    "https://scholar.google.com/citations?user=X_vjctwAAAAJ",
    "https://orcid.org/0000-0002-8740-8249",
    "https://github.com/nivesh22",
    "https://calendly.com/nivesh-ucla/coffee-chat-with-nivesh"
  ],
} as const;

export type SiteMetadata = typeof siteMetadata;
