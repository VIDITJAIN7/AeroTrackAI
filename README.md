# ✈️ AeroTrack AI — Predictive Aircraft Maintenance

Transforming live flight data into proactive maintenance schedules with Fivetran + BigQuery + Vertex AI, delivered via a web app and conversational AI.

[![Fivetran](https://img.shields.io/badge/Fivetran-Python%20SDK-2F8CFF?logo=fivetran&logoColor=white)](#)
[![Google Cloud / BigQuery](https://img.shields.io/badge/Google%20Cloud-BigQuery-4285F4?logo=googlecloud&logoColor=white)](#)
[![Vertex AI AutoML](https://img.shields.io/badge/Vertex%20AI-AutoML-4285F4?logo=googlecloud&logoColor=white)](#)
[![Vertex AI Agent Builder](https://img.shields.io/badge/Vertex%20AI-Agent%20Builder-4285F4?logo=googlecloud&logoColor=white)](#)
[![Gemini](https://img.shields.io/badge/Gemini-Conversational%20AI-4285F4?logo=googlecloud&logoColor=white)](#)
[![OpenSky Network](https://img.shields.io/badge/OpenSky%20Network-API-555555)](#)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)](#)
[![BigQuery SQL](https://img.shields.io/badge/SQL-BigQuery-FFCA28?logo=googlecloud&logoColor=black)](#)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)](#)

### 🚀 [Live Demo Link](http://your-app-url-here.com) 🚀

## Project Status
A full-stack, functional application aligned to the AI Accelerate Hackathon (Fivetran & Google Cloud). This repo includes the custom Fivetran connector and BigQuery SQL for transformation and scheduling; Vertex AI training and batch prediction run in cloud, and a Next.js frontend scaffold is provided.

## Core Features
- **Real-Time Data Ingestion:** Custom Fivetran Connector (Python SDK) pulls live flight states from OpenSky.
- **Predictive Forecasting:** Vertex AI AutoML time-series model forecasts future flight hours per aircraft.
- **Automated Scheduling:** BigQuery scheduled query inserts required maintenance tasks from predictions.
- **Conversational AI Agent:** Vertex AI Agent (Gemini) answers natural-language questions over BigQuery tables.
- **Web Application:** Next.js frontend as the manager-facing portal for fleet and maintenance insights.

## How It Works (Architecture)
1. **Ingestion (Fivetran Python SDK):** [fivetran_connector/connector.py](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/fivetran_connector/connector.py:0:0-0:0) fetches live states from the OpenSky Network API and prepares upserts.
2. **Warehousing (BigQuery):** Fivetran loads raw flight states into a BigQuery table named `live_flights`.
3. **Transformation for ML (BigQuery SQL):** [sql/1_create_training_data.sql](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/sql/1_create_training_data.sql:0:0-0:0) aggregates to a `daily_flight_hours` table for model training.
4. **Machine Learning (Vertex AI AutoML):** A time-series model is trained on `daily_flight_hours`.
5. **Prediction (Vertex AI Batch Prediction):** Batch jobs write forecasts to timestamped `predictions_%` tables in BigQuery.
6. **Scheduling Logic (BigQuery SQL):** [sql/2_populate_maintenance_schedule.sql](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/sql/2_populate_maintenance_schedule.sql:0:0-0:0) analyzes new predictions and INSERTS tasks (e.g., “A-Check”) into `maintenance_schedules`.
7. **Application Layer (Web App):** The Next.js app in [frontend/](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/frontend:0:0-0:0) provides a dashboard for fleet status and maintenance insights.
8. **Conversational AI (Vertex AI Agent + Gemini):** Embedded agent connected to a BigQuery Data Store (e.g., `live_flights`, `maintenance_schedules`) answers manager questions in natural language.

## Limitations & Hackathon Shortcuts
- **Simplified Maintenance Logic:** Demo-scale thresholds map predicted flight hours to generic checks (e.g., A/B/C/D-Check).
- **Idempotent Scheduling (Deliberate Shortcut):** Uses `INSERT ... WHERE NOT EXISTS` in [sql/2_populate_maintenance_schedule.sql](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/sql/2_populate_maintenance_schedule.sql:0:0-0:0) to avoid duplicates and ensure demo reliability with new datasets.
- **Single Data Source:** Current pipeline ingests only from the OpenSky Network API.

## Future Plans
- **Integrate More Data Sources:** Weather (e.g., NOAA), flight schedules, and regulatory directives to enrich predictions.
- **Advanced Models:** Component-level forecasting (engines, landing gear) beyond total flight hours.
- **Frontend Enhancements:** Authentication, richer dashboards, and human-in-the-loop approvals.
- **Proactive Alerts:** Notifications from scheduling events (e.g., via Pub/Sub) to web and email.

---

- Ingestion code: [fivetran_connector/connector.py](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/fivetran_connector/connector.py:0:0-0:0)
- SQL: [sql/1_create_training_data.sql](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/sql/1_create_training_data.sql:0:0-0:0), [sql/2_populate_maintenance_schedule.sql](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/sql/2_populate_maintenance_schedule.sql:0:0-0:0)
- Frontend scaffold: [frontend/](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/frontend:0:0-0:0)
- Agent playbook: [agent/playbook.md](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/agent/playbook.md:0:0-0:0)
- License: [LICENSE](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/LICENSE:0:0-0:0) (MIT)
