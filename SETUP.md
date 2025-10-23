# 🛠️ AeroTrack AI: Setup Guide

This guide provides step-by-step instructions to configure and run the **AeroTrack AI** pipeline from end to end.

---

## Part 1: Google Cloud Project & BigQuery Setup

This section prepares your Google Cloud environment for data ingestion and machine learning.

### 1. Create a Google Cloud Project

Use your existing Google Cloud Project or create a new one in the [Google Cloud Console](https://console.cloud.google.com/).

### 2. Enable Required APIs

Enable the following APIs for your project:

* BigQuery API
* Vertex AI API
* Vertex AI Agent Builder API (formerly Dialogflow CX)

### 3. Create a BigQuery Dataset

1. Go to **BigQuery Console**.
2. Create a new dataset (example: `aerotrack_ai_dataset`).
3. Set the **Location** to `us-central1` (or match your region for Vertex AI).

---

## Part 2: Data Ingestion (Fivetran Connector)

This step configures automated ingestion of live flight data into BigQuery.

### 1. Access Fivetran

Log in to your [Fivetran](https://fivetran.com/) account.

### 2. Create a Custom Connector Using the Fivetran Connector SDK

1. Go to **Connectors → Add Connector**.
2. Select **Fivetran Connector SDK** as the connector type.
3. Configure:

   * **Destination:** Your BigQuery project and dataset (`aerotrack_ai_dataset`).
   * **Connector Code:** Upload the file `fivetran_connector/connector.py` from this repository.
   * **Authentication:** Configure API keys or credentials as required by your chosen data source (e.g., OpenSky API).

### 3. Initialize Sync

Run the initial sync manually from the Fivetran dashboard.
This will populate your first table, e.g., `live_flights`, which serves as the base dataset for further processing.

---

## Part 3: Data Transformation (BigQuery SQL)

This step builds the training dataset for the machine learning model.

1. Go to **BigQuery SQL Workspace**.
2. Run the query from `sql/1_create_training_data.sql`.
3. This query reads data from `live_flights` and creates a new table, e.g., `daily_flight_hours`.

---

## Part 4: Machine Learning (Vertex AI)

This section sets up and trains a forecasting model to predict aircraft maintenance schedules.

### 1. Create and Train the Model

1. Navigate to **Vertex AI → Models**.
2. Click **Create New Model**.
3. Select:

   * **Training method:** AutoML
   * **Model type:** Time-series forecasting
   * **Dataset:** Your BigQuery table (`daily_flight_hours`)
4. Configure:

   * **Target column:** `total_flight_hours`
   * **Series identifier:** `icao24` (ensure it matches your schema)
   * **Timestamp column:** `flight_date`
5. Start the training job.

### 2. Run Batch Predictions

1. Once trained, go to **Batch Predictions**.
2. Create a new job:

   * **Input source:** `daily_flight_hours`
   * **Destination:** BigQuery (Vertex AI will create a new table, e.g., `predictions_<timestamp>`)

---

## Part 5: Automated Scheduling (BigQuery Scheduled Query)

This step automatically updates the maintenance schedule table daily.

1. Go to **BigQuery Console → Scheduled Queries**.
2. Paste the SQL from `sql/2_populate_maintenance_schedule.sql`.
3. Configure:

   * **Schedule:** Daily (after the Vertex AI batch prediction completes).
   * **Destination:** Your dataset (modifies `maintenance_schedules`).

💡 *For demos or hackathons, you can run this query manually to instantly populate `maintenance_schedules`.*

---

## Part 6: Conversational AI Agent (Vertex AI)

Set up the conversational agent that interacts with users and queries your BigQuery data.

### 1. Create Agent

Go to **Vertex AI Agent Builder (Dialogflow CX)** and create a new agent (e.g., `AeroTrack Agent`).

### 2. Connect Data Store

1. Go to the **Data Stores** tab.
2. Create a **BigQuery Data Store**.
3. Point it to your dataset (`aerotrack_ai_dataset`).
4. Include tables:

   * `live_flights`
   * `maintenance_schedules`

### 3. Set Agent Instructions

1. Go to **Agent Settings → Instructions**.
2. Paste contents from `agent/playbook.md`.
   These define the agent’s behavior and query logic.

### 4. Test the Agent

Use the built-in test panel to verify responses, e.g.:

> “Which aircraft are due for A-check maintenance?”

---

## Part 7: Running the Frontend (Next.js)

This step runs the dashboard and chatbot interface.

1. Open a terminal and navigate to the frontend folder:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Configure environment:

   * Rename `.env.template` → `.env.local`.
   * Fill in API keys and credentials for your Vertex AI Agent and backend.

4. Run the app locally:

   ```
   npm run dev
   ```

5. Open in browser:

   ```
   http://localhost:3000
   ```

---

## Further Documentation

For more details on architecture, components, and development setup, refer to:

* [README.md](./README.md)
* [ARCHITECTURE.md](./ARCHITECTURE.md)

---
