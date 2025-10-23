-- This script extends the proven INSERT logic for multiple maintenance types.
-- Safe for scheduling: no duplicates on subsequent runs.
-- Adjusted for demo-scale (1–5 total flight hours).

-- Step 1: Declare variable for latest prediction table
DECLARE latest_prediction_table STRING;

-- Step 2: Find the most recently created predictions table
SET latest_prediction_table = (
  SELECT table_name
  FROM `quiet-engine-474303-i5.aerotrack_ai_connector_us_central1.INFORMATION_SCHEMA.TABLES`
  WHERE table_name LIKE 'predictions_%'
  ORDER BY creation_time DESC
  LIMIT 1
);

-- Step 3: Execute INSERT logic using the dynamic table name (multi-maintenance)
EXECUTE IMMEDIATE FORMAT("""
INSERT INTO `quiet-engine-474303-i5.aerotrack_ai_connector_us_central1.maintenance_schedules`
(icao_24, required_maintenance_type, last_serviced_date, status)
SELECT
    source.icao_24,
    CASE
        -- Demo-scale thresholds: larger total hours => heavier maintenance
        WHEN source.predicted_total_flight_hours.value >= 5 THEN 'D-Check'
        WHEN source.predicted_total_flight_hours.value >= 4 THEN 'C-Check'
        WHEN source.predicted_total_flight_hours.value >= 3 THEN 'B-Check'
        WHEN source.predicted_total_flight_hours.value >= 1 THEN 'A-Check'
        ELSE 'A-Check'
    END AS required_maintenance_type,
    CAST(NULL AS DATE) AS last_serviced_date,
    'Needs Maintenance' AS status
FROM
    `quiet-engine-474303-i5.aerotrack_ai_connector_us_central1.%s` AS source
WHERE
    source.icao_24 IS NOT NULL
    AND source.predicted_total_flight_hours.value IS NOT NULL
    -- CRITICAL: Only insert if this specific maintenance task doesn't already exist
    AND NOT EXISTS (
        SELECT 1
        FROM `quiet-engine-474303-i5.aerotrack_ai_connector_us_central1.maintenance_schedules` AS target
        WHERE target.icao_24 = source.icao_24
        AND target.required_maintenance_type = CASE
            WHEN source.predicted_total_flight_hours.value >= 5 THEN 'D-Check'
            WHEN source.predicted_total_flight_hours.value >= 4 THEN 'C-Check'
            WHEN source.predicted_total_flight_hours.value >= 3 THEN 'B-Check'
            WHEN source.predicted_total_flight_hours.value >= 1 THEN 'A-Check'
            ELSE 'A-Check'
        END
    )
-- Optional: limit insert count per run for demo control
LIMIT 100;
""", latest_prediction_table);
