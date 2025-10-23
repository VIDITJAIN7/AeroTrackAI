CREATE OR REPLACE TABLE `aerotrack_ai_connector.daily_flight_hours` AS
SELECT
  icao_24,
  -- This line takes the 'last_contact' timestamp (e.g., 2025-10-18 14:30:00 UTC)
  -- and extracts just the date part (e.g., 2025-10-18), creating a new column
  -- for this query that we name 'flight_date'.
  DATE(last_contact) AS flight_date,
  
  -- Calculate the difference between the max and min timestamp for each flight on a given day
  -- and convert it from seconds to hours.
  TIMESTAMP_DIFF(MAX(last_contact), MIN(last_contact), SECOND) / 3600.0 AS total_flight_hours
FROM
  `aerotrack_ai_connector.live_flights`
WHERE
  -- Filter for airborne flights to ensure accurate duration calculation
  on_ground = FALSE
GROUP BY
  icao_24,
  flight_date
ORDER BY
  icao_24,
  flight_date;
