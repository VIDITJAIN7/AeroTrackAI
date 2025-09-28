-----------------------------------------------------------
FIVETRAN + GOOGLE CLOUD HACKATHON CHECKLIST
-----------------------------------------------------------

1. IDEA & DATA SOURCE
   ☐ Pick unique data source (API, IoT, niche SaaS) not in Fivetran
   ☐ Define use case & impact metric

2. SCHEMA DESIGN
   ☐ Map endpoints → tables → fields → primary keys
   ☐ Decide incremental sync logic (timestamps, IDs)

3. CONNECTOR DEVELOPMENT
   ☐ Install Fivetran Connector SDK (Python/Go)
   ☐ Implement auth + catalog + incremental sync
   ☐ Local test with sample data (pytest/Postman)

4. GOOGLE CLOUD SETUP
   ☐ Create GCP project
   ☐ Enable BigQuery/Cloud SQL/Cloud Storage
   ☐ Create service account + IAM roles

5. PIPELINE CONFIG
   ☐ Register connector in Fivetran dashboard
   ☐ Configure sync frequency + backfill
   ☐ Run initial sync & validate data in BigQuery

6. TRANSFORMATIONS
   ☐ Build dbt models or BigQuery SQL for cleaning
   ☐ Create derived tables/features
   ☐ Validate with test queries

7. AI/ML LAYER
   ☐ Create embeddings (Vertex AI Embeddings)
   ☐ Load into vector store (Vertex Matching Engine)
   ☐ Build LLM/agent workflow (Vertex AI/AgentSpace)

8. BACKEND API
   ☐ Expose AI logic via FastAPI/Flask or Node.js
   ☐ Deploy to Cloud Run or Cloud Functions

9. FRONTEND / DEMO
   ☐ Build minimal UI (React/Streamlit/Next.js)
   ☐ Connect to backend API
   ☐ Show chatbot/dashboard/alerts

10. POLISH & DELIVERY
   ☐ Add monitoring (Fivetran dashboard + GCP logs)
   ☐ Record 2–3 min demo video
   ☐ Prepare slides (problem, solution, impact, arch.)
   ☐ Final repo: connector code + README + demo link
-----------------------------------------------------------
