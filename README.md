 
# AeroTrack AI — Predictive Aircraft Maintenance

A backend-focused project that ingests real-time flight data and generates maintenance scheduling artifacts using SQL transformations. The repository also contains a Next.js frontend scaffold and an agent playbook, but this README centers on the backend as it exists today.

## Project Status

- **Data ingestion:** Present via a custom connector that fetches live flight states from the OpenSky Network API and upserts records into a `live_flights` table schema ([fivetran_connector/connector.py](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/fivetran_connector/connector.py:0:0-0:0)).
- **SQL artifacts:** Present for building daily flight-hour aggregates and inserting maintenance schedules based on predictions ([sql/](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/sql:0:0-0:0)).
- **Predictions:** The scheduling SQL expects BigQuery tables named `predictions_%`; code/pipelines that create these are not included here.
- **Frontend:** A Next.js project scaffold is present under [frontend/](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/frontend:0:0-0:0) with supporting docs; details are in that folder.
- **Agent:** A conversational assistant playbook exists in [agent/playbook.md](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/agent/playbook.md:0:0-0:0).

## Repository Structure

- [fivetran_connector/](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/fivetran_connector:0:0-0:0) — Custom data connector and related files.
- [sql/](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/sql:0:0-0:0) — BigQuery SQL scripts for training data creation and maintenance scheduling.
- [agent/](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/agent:0:0-0:0) — Agent behavior playbook for natural-language maintenance queries.
- [frontend/](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/frontend:0:0-0:0) — Next.js scaffold and setup docs.
- [docs/](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/docs:0:0-0:0) — Placeholder docs.
- [LICENSE](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/LICENSE:0:0-0:0), [README.md](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/README.md:0:0-0:0), [ARCHITECTURE.md](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/ARCHITECTURE.md:0:0-0:0), [SETUP.md](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/SETUP.md:0:0-0:0) — Licensing and documentation files.

## Backend Overview

- **Data Source**
  - OpenSky Network API: `https://opensky-network.org/api/states/all`

- **Connector** ([fivetran_connector/connector.py](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/fivetran_connector/connector.py:0:0-0:0))
  - Imports: `fivetran_connector_sdk` ([Connector](cci:2://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/fivetran_connector/connector.py:106:0-122:9), `Operations`, `Logging`), `requests`, `datetime`.
  - Key functions:
    - [schema(configuration: dict)](cci:1://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/fivetran_connector/connector.py:29:0-55:5) — Returns the `live_flights` schema.
    - [update(configuration: dict, state: dict)](cci:1://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/fivetran_connector/connector.py:58:0-97:16) — Fetches OpenSky states (capped at 300 for demo), transforms, and `upsert`s each record.
  - Entrypoints:
    - `connector = Connector(update=update, schema=schema)`
    - `if __name__ == "__main__": connector.debug()`
  - Config hints (class-defined): `api_url`, `flight_limit`.

- **Connector Table Schema** (`live_flights`)
  - Primary key: `icao24`
  - Columns:
    - `icao24 STRING`
    - `callsign STRING`
    - `origin_country STRING`
    - `time_position UTC_DATETIME`
    - `last_contact UTC_DATETIME`
    - `longitude DOUBLE`
    - `latitude DOUBLE`
    - `baro_altitude DOUBLE`
    - `on_ground BOOLEAN`
    - `velocity DOUBLE`
    - `true_track DOUBLE`
    - `vertical_rate DOUBLE`
    - `geo_altitude DOUBLE`
    - `squawk STRING`
    - `spi BOOLEAN`
    - `position_source INT`
    - `category INT`

## SQL Artifacts ([sql/](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/sql:0:0-0:0))

- **Training Data Build** — [1_create_training_data.sql](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/sql/1_create_training_data.sql:0:0-0:0)
  - Creates or replaces `quiet-engine-474303-i5.aerotrack_ai_connector.daily_flight_hours`.
  - Reads from `quiet-engine-474303-i5.aerotrack_ai_connector.live_flights`.
  - Groups by aircraft and `DATE(last_contact)`; computes daily total flight hours with:
    - `TIMESTAMP_DIFF(MAX(last_contact), MIN(last_contact), SECOND) / 3600.0`
  - Filters to airborne records: `on_ground = FALSE`.

- **Maintenance Scheduling** — [2_populate_maintenance_schedule.sql](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/sql/2_populate_maintenance_schedule.sql:0:0-0:0)
  - Targets: `quiet-engine-474303-i5.aerotrack_ai_connector_us_central1.maintenance_schedules`.
  - Dynamically selects the most recent table named `predictions_%` in `..._us_central1`.
  - Inserts rows with `status = 'Needs Maintenance'` using demo thresholds:
    - `>= 5` hours → `D-Check`
    - `>= 4` hours → `C-Check`
    - `>= 3` hours → `B-Check`
    - `>= 1` hours → `A-Check`
  - Uses `NOT EXISTS` to prevent duplicates; includes `LIMIT 100` for demo control.

## Data and Config

- **Sample CSV** — [fivetran_connector/maintenance_schedules.csv](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/fivetran_connector/maintenance_schedules.csv:0:0-0:0)
  - Columns: `icao24, required_maintenance_type, last_serviced_date`
  - Example rows: `a83565`, `ac4f32`, `406a77`.

- **Connector Config** — [fivetran_connector/config.json](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/fivetran_connector/config.json:0:0-0:0)
  - `api_url`: OpenSky endpoint.
  - `flight_limit`: `"300"` (string literal).

- **Python Requirements (connector)** — [fivetran_connector/requirements.txt](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/fivetran_connector/requirements.txt:0:0-0:0)
  - Currently includes: `google-cloud-bigquery`.

## Agent Playbook

- **[agent/playbook.md](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/agent/playbook.md:0:0-0:0)**
  - Goal: Answer maintenance/scheduling questions in everyday language; present clean tables with headers like ICAO24, Last Serviced Date, Maintenance Type, Status.
  - Notes: Include records even if `last_serviced_date` is null; use flexible/fuzzy matching for user inputs (e.g., variants of “A-Check”).

## Frontend (Brief)

- **[frontend/](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/frontend:0:0-0:0)**
  - Next.js scaffold (`next 15`, `react 19`) with TypeScript/Tailwind configs.
  - Docs for Dialogflow and deployment: [DIALOGFLOW_SETUP.md](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/frontend/DIALOGFLOW_SETUP.md:0:0-0:0), [DIALOGFLOW_AGENT_SETUP.md](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/frontend/DIALOGFLOW_AGENT_SETUP.md:0:0-0:0), [DIALOGFLOW_CX_SETUP.md](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/frontend/DIALOGFLOW_CX_SETUP.md:0:0-0:0), [VERCEL_SETUP.md](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/frontend/VERCEL_SETUP.md:0:0-0:0).
  - Detailed setup and architecture are documented in that folder and other docs.

## Notes and Limitations

- **Predictions dependency:** [sql/2_populate_maintenance_schedule.sql](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/sql/2_populate_maintenance_schedule.sql:0:0-0:0) expects a BigQuery table named like `predictions_%` in `..._us_central1`. Generation of these tables is not included.
- **Environment IDs:** SQL scripts reference project/dataset IDs (`quiet-engine-474303-i5.aerotrack_ai_connector` and `..._us_central1`) that are environment-specific.
- **Field naming mismatch:** The connector schema uses `icao24` (no underscore), while SQL scripts reference `icao_24` in places; alignment is required during deployment.
- **Demo thresholds:** Maintenance type thresholds are intentionally simple (1–5 total hours).
- **Single source:** Ingestion logic targets the OpenSky states API.

## License

- **MIT License** — see [LICENSE](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/LICENSE:0:0-0:0).

## Where to Look Next

- **Setup and deployment:** [SETUP.md](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/SETUP.md:0:0-0:0)
- **Architecture details:** [ARCHITECTURE.md](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/ARCHITECTURE.md:0:0-0:0)
- **Frontend and agent integration:** [frontend/](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/frontend:0:0-0:0) and [agent/playbook.md](cci:7://file:///c:/Users/vidit/Desktop/Projects/AeroTrackAI/agent/playbook.md:0:0-0:0)
