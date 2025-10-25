---
slug: liquidity-forecasting
title: "Liquidity Forecasting"
role: [Data Scientist]
domain: Finance
stack: [Python, Kedro, Liquidity, Streamlit, Forecasting, ARIMA, ARDL]
year: 2023
impact:
  revenue_usd: 27000000
  metric_uplift: 0.18
summary: "ARIMA/ARDL-based liquidity forecasting with Kedro pipelines and Streamlit reporting, improving liquidity planning and decisioning."
cover: "/images/projects/personal/liquidity-animated.svg"
downloads:
  - label: "One‑Pager (PDF)"
    file: "/downloads/Liquidity_Forecasting_OnePager.pdf"
---

<Problem>
Liquidity planning accuracy limited investment decisions and impacted availability.
</Problem>

<Approach>
Consolidated data from treasury and product systems, engineered features, and trained XGBoost with time‑aware validation.
</Approach>

<Solution>
Airflow‑orchestrated pipeline on BigQuery with weekly model refresh, metrics dashboard, and alerting.
</Solution>

<Outcome>
18% planning uplift contributing to ~$27M value.
</Outcome>

<Next>
Introduce hierarchical reconciliation and quantile forecasting for risk bands.
</Next>
