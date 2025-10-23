# connector.py
import requests
from fivetran_connector_sdk import Connector, Operations as op, Logging as log
from datetime import datetime, timezone

API_ENDPOINT = "https://opensky-network.org/api/states/all"
MAX_FLIGHTS = 300  # Limit for hackathon/demo

# --- Helpers for type safety ---
def safe_bool(val):
    if val is None:
        return None
    if isinstance(val, bool):
        return val
    if isinstance(val, (int, float)):
        return bool(val)
    if isinstance(val, str):
        return val.lower() in ["true", "1", "yes"]
    return None

def safe_int(val):
    if val is None:
        return None
    try:
        return int(val)
    except (ValueError, TypeError):
        return None

# --- Schema ---
def schema(configuration: dict):
    log.info("Defining schema for the 'live_flights' table.")
    return [
        {
            "table": "live_flights",
            "primary_key": ["icao24"],
            "columns": {
                "icao24": "STRING",
                "callsign": "STRING",
                "origin_country": "STRING",
                "time_position": "UTC_DATETIME",
                "last_contact": "UTC_DATETIME",
                "longitude": "DOUBLE",
                "latitude": "DOUBLE",
                "baro_altitude": "DOUBLE",
                "on_ground": "BOOLEAN",
                "velocity": "DOUBLE",
                "true_track": "DOUBLE",
                "vertical_rate": "DOUBLE",
                "geo_altitude": "DOUBLE",
                "squawk": "STRING",
                "spi": "BOOLEAN",
                "position_source": "INT",
                "category": "INT"
            }
        }
    ]

# --- Update ---
def update(configuration: dict, state: dict):
    log.info(f"Starting data sync from OpenSky API (limit {MAX_FLIGHTS} flights).")
    try:
        response = requests.get(API_ENDPOINT, timeout=15)
        response.raise_for_status()
        flight_data = response.json()
    except requests.exceptions.RequestException as e:
        log.error(f"API request failed: {e}")
        return state

    if not flight_data or not flight_data.get("states"):
        log.info("No flight states returned from the API.")
        return state

    # Only process up to MAX_FLIGHTS
    for flight_state in flight_data["states"][:MAX_FLIGHTS]:
        record = {
            "icao24": flight_state[0],
            "callsign": flight_state[1].strip() if flight_state[1] else None,
            "origin_country": flight_state[2],
            "time_position": datetime.fromtimestamp(flight_state[3], tz=timezone.utc) if flight_state[3] else None,
            "last_contact": datetime.fromtimestamp(flight_state[4], tz=timezone.utc) if flight_state[4] else None,
            "longitude": flight_state[5],
            "latitude": flight_state[6],
            "baro_altitude": flight_state[7],
            "on_ground": safe_bool(flight_state[8]),
            "velocity": flight_state[9],
            "true_track": flight_state[10],
            "vertical_rate": flight_state[11],
            "geo_altitude": flight_state[13],
            "squawk": flight_state[14],
            "spi": safe_bool(flight_state[15]),
            "position_source": safe_int(flight_state[16] if len(flight_state) > 16 else None),
            "category": safe_int(flight_state[17] if len(flight_state) > 17 else None),
        }
        op.upsert(table="live_flights", data=record)

    op.checkpoint(state)
    log.info("Data sync finished successfully.")
    return state

# --- Top-level connector object ---
connector = Connector(update=update, schema=schema)

# --- Optional local debug ---
if __name__ == "__main__":
    connector.debug()

class Connector(Connector):
    def __init__(self, update):
        super().__init__(update)
        self.config = {
            "api_url": {
                "value": "https://opensky-network.org/api/states/all",
                "type": "string",
                "required": True,
                "description": "The base URL for the OpenSky API"
            },
            "flight_limit": {
                "value": 300,
                "type": "integer",
                "required": False,
                "description": "Maximum number of flights to fetch"
            }
        }
