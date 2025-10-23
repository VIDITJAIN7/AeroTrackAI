# ✈️ AeroTrack AI — Predictive Aircraft Maintenance

**Transforming live flight data into proactive maintenance schedules** with **Fivetran + BigQuery + Vertex AI**, delivered via a **web app and conversational AI**.

---

## 🚀 Live Demo Link
> http://flighttracker-5loh.vercel.app

---

## 📊 Project Status

✅ **Full-Stack Functional Application**  
Complete end-to-end pipeline from data ingestion to AI-powered insights, submitted for the **AI Accelerate Hackathon (Fivetran & Google Cloud).**

---

## 🎯 Core Features

- **Real-Time Data Ingestion**  
  Custom Fivetran Connector (`fivetran_connector/`) pulls live flight states from the OpenSky Network API.

- **Predictive Forecasting**  
  A Vertex AI AutoML time-series model forecasts future flight hours for each unique aircraft.

- **Automated Scheduling**  
  A BigQuery scheduled query (`sql/`) analyzes model predictions and automatically inserts required maintenance tasks.

- **Conversational AI Agent**  
  A Vertex AI Agent, powered by Gemini, answers natural-language questions by querying the BigQuery database in real-time.

- **Web Application**  
  A Next.js frontend (`frontend/`) serves as the manager-facing portal for fleet and maintenance insights.

---

## 🏗️ How It Works (Architecture)

Our platform implements a sophisticated **8-step data pipeline**:

1. **Ingestion (Fivetran Python SDK)**  
   `fivetran_connector/connector.py` fetches live states from the OpenSky Network API.

2. **Warehousing (BigQuery)**  
   Fivetran loads raw flight states into a BigQuery table named `live_flights`.

3. **Transformation for ML (BigQuery SQL)**  
   `sql/1_create_training_data.sql` aggregates raw data into a `daily_flight_hours` table for model training.

4. **Machine Learning (Vertex AI AutoML)**  
   A time-series model is trained on the `daily_flight_hours` table.

5. **Prediction (Vertex AI Batch Prediction)**  
   Batch jobs run daily, forecasting future flight hours and writing results to timestamped `predictions_%` tables in BigQuery.

6. **Scheduling Logic (BigQuery SQL)**  
   `sql/2_populate_maintenance_schedule.sql` analyzes new predictions and inserts required tasks (e.g., “A-Check”) into the final `maintenance_schedules` table.

7. **Application Layer (Web App)**  
   The Next.js app in `frontend/` provides a dashboard for fleet status and maintenance insights.

8. **Conversational AI (Vertex AI Agent + Gemini)**  
   An embedded agent, defined in `agent/playbook.md`, connects to a BigQuery Data Store (using `live_flights` & `maintenance_schedules`) to answer manager questions.

---

## ⚠️ Limitations & Hackathon Shortcuts

To ensure demo reliability within the hackathon’s constraints, several pragmatic decisions were made:

- **Simplified Maintenance Logic**  
  Focuses on demo-scale thresholds for generic A-Checks based on forecasted flight hours.

- **Idempotent Scheduling (Deliberate Shortcut)**  
  Uses a robust `INSERT ... WHERE NOT EXISTS` pattern in `sql/2_populate_maintenance_schedule.sql` to avoid duplicates.  
  This was a deliberate choice for stability over a complex `MERGE` on a new dataset.

- **Single Data Source**  
  The current pipeline ingests only from the **OpenSky Network API**.

---

## 🚀 Future Plans

- **Integrate More Data Sources**  
  Enrich predictions by adding Fivetran connectors for **weather (NOAA)**, **flight schedules**, and **FAA directives**.

- **Advanced Component Models**  
  Expand the model to forecast maintenance for specific high-value components (e.g., engines, landing gear).

- **Full Frontend Integration**  
  Build out **user authentication**, richer dashboards, and **human-in-the-loop (HITL)** approval for AI-suggested maintenance.

- **Proactive Alerts**  
  Implement a **notification system (Pub/Sub)** to send alerts from the scheduling query directly to the web app.

---

## 🏆 Hackathon Highlights

This project showcases the power of **Fivetran and Google Cloud** working in perfect harmony:

- **Fivetran’s Python SDK** enabled us to build a custom, production-ready connector for a non-standard API in minutes.  
- **BigQuery’s serverless architecture** seamlessly handles everything from raw data ingestion to powering live AI queries.  
- **Vertex AI’s AutoML** democratized machine learning, allowing us to train a powerful forecasting model without deep ML expertise.  
- **Vertex AI Agent Builder & Gemini** allowed us to create a sophisticated, data-aware conversational AI that generates its own SQL and provides intelligent answers instantly.

---

## 🪪 License

**MIT License**

