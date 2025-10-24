import Link from "next/link";
import { Section, SectionIntro } from "@/components/layout/Section";

export default function ResumePage() {
  return (
    <Section>
      <SectionIntro label="Resume" title="Resume — HTML preview + PDF download" />
      <div className="glass rounded-xl p-6 grid gap-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-2xl font-semibold">Nivesh Kannan Elangovanraaj</h1>
          <div className="text-sm text-text-1">
            <span>(682) 403‑0035 · </span>
            <a className="underline" href="mailto:Nkvesh@ucla.edu">Nkvesh@ucla.edu</a> ·
            <span> Los Angeles (open to relocation)</span>
          </div>
        </div>
        <div className="text-sm">
          <p>
            Data Scientist with 7 years of experience delivering $30M+ measurable impact across banking, tech, and healthcare. Skilled in AI & ML workflows from data engineering and model development to deployment, monitoring, and business integration. Proficient in Python, SQL, R, PySpark, and CI/CD tools. Experienced with LLMs, NLP, forecasting, and predictive modeling. Co‑author of 6 peer‑reviewed papers.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-3">Professional Experience</h2>
          <div className="grid gap-5">
            <div>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="font-medium">Société Générale · Lead Data Scientist</p>
                  <p className="text-xs text-text-1">Bangalore, India</p>
                </div>
                <div className="text-xs text-text-1">2023–2025</div>
              </div>
              <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                <li>Designed and deployed liquidity monitoring and forecasting pipelines using ARDL & ARIMA with CI/CD and drift monitoring; contributed ~$27M NBI over 2 years.</li>
                <li>Automated RFP responses with ML‑based question similarity and LLM‑assisted answer generation; delivered $500K NBI uplift and $250K cost savings.</li>
                <li>Deployed ML‑powered text parser converting trading jargon to structured data with 95% precision; generated $750K business value.</li>
                <li>Led a team of 3 data scientists and partnered across domains to reduce tech debt and improve consistency through internal tooling.</li>
              </ul>
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="font-medium">Flipkart · Senior Business Analyst</p>
                  <p className="text-xs text-text-1">Bangalore, India</p>
                </div>
                <div className="text-xs text-text-1">2021–2022</div>
              </div>
              <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                <li>Built driver model with gradient boosting and sensitivity analysis to link CX with operations metrics; improved NPS by 800 bps and generated ~$5M value.</li>
                <li>Enabled same‑day installations for large appliances by optimizing process analytics; improved courier experience and saved $500K annually.</li>
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
                <li>Conducted HEOR‑focused epidemiological studies on real‑world medical data using statistical and causal inference methods.</li>
                <li>Published peer‑reviewed articles and presented posters at recognized industry conferences (ISPOR, ICPE).</li>
                <li>Assisted in COVID‑19 vaccine trials analytics by estimating optimal participant sample sizes.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Skills</h2>
          <div className="text-sm grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Programming & MLOps</p>
              <p className="text-text-1">Python, R, SQL, PySpark, CI/CD, GitHub Actions, Jenkins, Kedro</p>
            </div>
            <div>
              <p className="font-medium">ML & AI</p>
              <p className="text-text-1">Classification, NLP, Forecasting, Gradient Boosting (XGBoost/CatBoost), Deep Learning (CNN/RNN), LLMs</p>
            </div>
            <div>
              <p className="font-medium">Statistics</p>
              <p className="text-text-1">Hypothesis testing, A/B testing, regression, time series, causal inference</p>
            </div>
            <div>
              <p className="font-medium">BI & Viz</p>
              <p className="text-text-1">Tableau, Power BI, Plotly, Matplotlib, Seaborn</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Education</h2>
          <ul className="text-sm space-y-2">
            <li><span className="font-medium">UCLA Anderson School of Management</span> — M.S. in Business Analytics (MSBA), expected 2026</li>
            <li><span className="font-medium">Anna University</span> — B.E. Electrical & Electronics Engineering, 2018</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Awards & Recognition</h2>
          <ul className="text-sm space-y-1 text-text-1">
            <li>Société Générale: Employee of the Year Nominee (2024), Team of the Year (2024), Star of the Quarter (2023)</li>
            <li>Flipkart: Titan Award for analytical excellence during Big Billion Day Sale</li>
            <li>Mu Sigma: Spot Awards (2019–2021) and Client Kudos for COVID‑19 research collaboration</li>
          </ul>
        </section>

        <div className="pt-2 text-sm">
          PDF download: <Link href="/api/download/Nivesh_Resume_MSBA2026.pdf" className="underline">Nivesh_Resume_MSBA2026.pdf</Link>
        </div>
      </div>
    </Section>
  );
}

