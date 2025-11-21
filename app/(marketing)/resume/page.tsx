import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionIntro } from "@/components/layout/Section";
import { siteMetadata } from "@/lib/siteMetadata";

const resumeCanonicalUrl = new URL("/resume", siteMetadata.url).toString();
const portraitUrl = new URL("/images/hero/coat%20suit%20-%20small.jpg", siteMetadata.url).toString();
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteMetadata.name,
  alternateName: siteMetadata.legalName,
  url: siteMetadata.url,
  image: portraitUrl,
  jobTitle: siteMetadata.jobTitle,
  email: `mailto:${siteMetadata.email}`,
  sameAs: siteMetadata.sameAs,
};

export const metadata: Metadata = {
  title: "Resume | Los Angeles based Data Scientist",
  description:
    "Download the resume of Nivesh Elangovanraaj, a Los Angeles–based data scientist with experience across finance, healthcare, and e-commerce, specializing in machine learning, real-world analytics, and end-to-end data systems.",
  alternates: { canonical: resumeCanonicalUrl },
  keywords: [
    "Nivesh Elangovanraaj resume",
    "Los Angeles data scientist resume",
    "US data science professional CV",
    "Data scientist in Los Angeles",
    "AI leader resume United States",
  ],
  openGraph: {
    type: "article",
    url: resumeCanonicalUrl,
    title: "Nivesh Elangovanraaj — Resume",
    description:
      "Resume for Nivesh Elangovanraaj, Los Angeles–based data scientist with experience across finance, healthcare, and e-commerce.",
    images: [
      {
        url: portraitUrl,
        width: 1200,
        height: 1200,
        alt: "Portrait of Nivesh Elangovanraaj",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nivesh Elangovanraaj — Resume",
    description:
      "Resume for Nivesh Elangovanraaj, Los Angeles–based data scientist with experience across finance, healthcare, and e-commerce.",
    images: [portraitUrl],
  },
};

export default function ResumePage() {
  return (
    <>
      <Section>
      <SectionIntro
        label="Resume"
        title="Resume — HTML preview + PDF download"
        lead="Overview of my experience as a data scientist, open to onsite roles and remote opportunities across the United States."
      />
      <div className="glass rounded-xl p-6 grid gap-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-2xl font-semibold">
            Nivesh Kannan Elangovanraaj
          </h1>
          <div className="text-sm text-text-1">
            <span>(682) 403-0035 · </span>
            <a
              className="underline"
              href="mailto:nivesh@ucla.edu"
              data-email-context="resume-page"
            >
              nivesh@ucla.edu
            </a>
            <span> · Los Angeles, CA (open to relocation across the US)</span>
          </div>
        </div>
        <div className="text-sm">
          <p>
            Data Scientist with 7 years of experience delivering $30M+
            measurable impact across banking, e-commerce, and healthcare.
            Skilled in AI & ML workflows from data engineering and model
            development to deployment, monitoring, and business integration.
            Proficient in Python, SQL, R, Spark, and CI/CD tools. Experienced
            with LLMs, NLP, forecasting, and predictive modeling. Co-author of 6
            published peer-reviewed papers. Recognized for cross-functional
            collaboration and building scalable, deployable, production-grade
            solutions.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Professional Experience
          </h2>
          <div className="grid gap-5">
            <div>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="font-medium">
                    Société Générale · Lead Data Scientist
                  </p>
                  <p className="text-xs text-text-1">Bangalore, India</p>
                </div>
                <div className="text-xs text-text-1">2023–2025</div>
              </div>
              <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                <li>
                  Designed and deployed liquidity monitoring + forecasting
                  pipelines (ARDL & ARIMA) with CI/CD and drift monitoring;
                  contributed ~$27M NBI over 2 years.
                </li>
                <li>
                  Automated RFP responses with ML-based question similarity and
                  LLM-assisted answer generation; delivered $500K NBI uplift and
                  $250K cost savings.
                </li>
                <li>
                  Deployed ML-powered text parser converting trading jargon to
                  structured data with 95% precision; generated $750K business
                  value.
                </li>
                <li>
                  Led a team of 3 data scientists, partnering across domains to
                  reduce tech debt and improve consistency through internal
                  tooling.
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="font-medium">
                    Flipkart · Senior Business Analyst
                  </p>
                  <p className="text-xs text-text-1">Bangalore, India</p>
                </div>
                <div className="text-xs text-text-1">2021–2022</div>
              </div>
              <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                <li>
                  Built gradient-boosting driver models and sensitivity analysis
                  to link CX with operations metrics; improved NPS by 800 bps
                  and generated ~$5M value.
                </li>
                <li>
                  Enabled same-day installations for large appliances by
                  optimizing process analytics; improved courier experience and
                  saved $500K annually.
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="font-medium">Mu Sigma · Decision Scientist</p>
                  <p className="text-xs text-text-1">Bangalore, India</p>
                </div>
                <div className="text-xs text-text-1">2018–2021</div>
              </div>
              <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                <li>
                  Conducted HEOR-focused epidemiological studies on real-world
                  medical data using statistical and causal inference methods.
                </li>
                <li>
                  Published peer-reviewed articles and presented posters at
                  industry conferences (ISPOR, ICPE).
                </li>
                <li>
                  Assisted COVID-19 vaccine trial analytics by estimating
                  optimal participant sample sizes.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Skills</h2>
          <div className="text-sm grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Programming & MLOps</p>
              <p className="text-text-1">
                Python, R, SQL, PySpark, CI/CD, GitHub Actions, Jenkins, Kedro
              </p>
            </div>
            <div>
              <p className="font-medium">ML & AI</p>
              <p className="text-text-1">
                Classification, NLP, Forecasting, Gradient Boosting
                (XGBoost/CatBoost), Deep Learning (CNN/RNN), LLMs
              </p>
            </div>
            <div>
              <p className="font-medium">Statistics</p>
              <p className="text-text-1">
                Hypothesis testing, A/B testing, regression, time series, causal
                inference
              </p>
            </div>
            <div>
              <p className="font-medium">BI & Viz</p>
              <p className="text-text-1">
                Tableau, Power BI, Plotly, Matplotlib, Seaborn
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Education</h2>
          <ul className="text-sm space-y-2">
            <li>
              <span className="font-medium">
                UCLA Anderson School of Management
              </span>{" "}
              — M.S. in Business Analytics (MSBA), expected 2026
            </li>
            <li>
              <span className="font-medium">Anna University</span> — B.E.
              Electrical & Electronics Engineering, 2018
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Awards & Recognition</h2>
          <ul className="text-sm space-y-1 text-text-1">
            <li>
              Société Générale: Employee of the Year Nominee (2024), Team of the
              Year (2024), Star of the Quarter (2023)
            </li>
            <li>
              Flipkart: Titan Award for analytical excellence during Big Billion
              Day Sale
            </li>
            <li>
              Mu Sigma: Spot Awards (2019–2021) and client kudos for COVID-19
              research collaboration
            </li>
          </ul>
        </section>

        <div className="pt-2 text-sm">
          PDF download:{" "}
          <Link
            href="/api/download/Nivesh_Resume_MSBA2026.pdf"
            className="underline"
            data-resume-source="resume-page"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nivesh - Resume (PDF)
          </Link>
        </div>
      </div>
    </Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
