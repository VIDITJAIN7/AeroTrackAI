-----------------------------------------------------------
FIVETRAN + GOOGLE CLOUD HACKATHON CHECKLIST
-----------------------------------------------------------

1. IDEA & DATA SOURCE<br>
   ☐ Pick unique data source (API, IoT, niche SaaS) not in Fivetran<br>
   ☐ Define use case & impact metric<br>

2. SCHEMA DESIGN<br>
   ☐ Map endpoints → tables → fields → primary keys<br>
   ☐ Decide incremental sync logic (timestamps, IDs)<br>

3. CONNECTOR DEVELOPMENT<br>
   ☐ Install Fivetran Connector SDK (Python/Go)<br>
   ☐ Implement auth + catalog + incremental sync<br>
   ☐ Local test with sample data (pytest/Postman)<br>

4. GOOGLE CLOUD SETUP<br>
   ☐ Create GCP project<br>
   ☐ Enable BigQuery/Cloud SQL/Cloud Storage<br>
   ☐ Create service account + IAM roles<br>

5. PIPELINE CONFIG<br>
   ☐ Register connector in Fivetran dashboard<br>
   ☐ Configure sync frequency + backfill<br>
   ☐ Run initial sync & validate data in BigQuery<br>

6. TRANSFORMATIONS<br>
   ☐ Build dbt models or BigQuery SQL for cleaning<br>
   ☐ Create derived tables/features<br>
   ☐ Validate with test queries<br>

7. AI/ML LAYER<br>
   ☐ Create embeddings (Vertex AI Embeddings)<br>
   ☐ Load into vector store (Vertex Matching Engine)<br>
   ☐ Build LLM/agent workflow (Vertex AI/AgentSpace)<br>

8. BACKEND API<br>
   ☐ Expose AI logic via FastAPI/Flask or Node.js<br>
   ☐ Deploy to Cloud Run or Cloud Functions<br>

9. FRONTEND / DEMO<br>
   ☐ Build minimal UI (React/Streamlit/Next.js)<br>
   ☐ Connect to backend API<br>
   ☐ Show chatbot/dashboard/alerts<br>

10. POLISH & DELIVERY<br>
   ☐ Add monitoring (Fivetran dashboard + GCP logs)<br>
   ☐ Record 2–3 min demo video<br>
   ☐ Prepare slides (problem, solution, impact, arch.)<br>
   ☐ Final repo: connector code + README + demo link<br>
-----------------------------------------------------------
