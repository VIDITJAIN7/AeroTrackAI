// Utility functions for parsing and formatting chat responses

export interface FlightData {
  icao24: string;
  flightNumber?: string;
  aircraftType?: string;
  status?: string;
  maintenanceType?: string;
}

export function parseFlightDataFromResponse(response: string): FlightData[] {
  console.log('Parsing flight data from response:', response);
  
  // Look for ICAO24 patterns in the response - try multiple patterns
  const patterns = [
    /\*\*ICAO24:\*\*\s*([a-f0-9,\s]+)/i,
    /ICAO24:\s*([a-f0-9,\s]+)/i,
    /icao24:\s*([a-f0-9,\s]+)/i,
    /ICAO24\s*([a-f0-9,\s]+)/i,
    // New patterns for table format
    /\|\s*([a-f0-9]+)\s*\|/g,
    /ICAO24\s*\|\s*([a-f0-9]+)/g,
    // Pattern for comma-separated lists
    /(?:aircraft|flights?)\s+(?:that\s+)?(?:need|needing)\s+(?:a\s+)?(?:b-check|b\s+check)[^:]*:?\s*([a-f0-9,\s]+)/i
  ];
  
  let match = null;
  let icao24Codes: string[] = [];
  
  // Try each pattern
  for (const pattern of patterns) {
    if (pattern.global) {
      const matches = [...response.matchAll(pattern)];
      if (matches.length > 0) {
        icao24Codes = matches.map(m => m[1]).filter(code => code && /^[a-f0-9]+$/i.test(code));
        if (icao24Codes.length > 0) break;
      }
    } else {
      match = response.match(pattern);
      if (match) {
        if (match[1]) {
          icao24Codes = match[1]
            .split(',')
            .map(code => code.trim())
            .filter(code => code.length > 0 && /^[a-f0-9]+$/i.test(code));
        }
        if (icao24Codes.length > 0) break;
      }
    }
  }
  
  // If no pattern matched, try to extract from table format
  if (icao24Codes.length === 0) {
    // Look for table rows with ICAO24 codes
    const tableRowPattern = /\|\s*([a-f0-9]{6,8})\s*\|/g;
    const tableMatches = [...response.matchAll(tableRowPattern)];
    if (tableMatches.length > 0) {
      icao24Codes = tableMatches.map(m => m[1]).filter(code => /^[a-f0-9]+$/i.test(code));
    }
  }
  
  // If still no codes found, try to extract from any text that looks like ICAO24
  if (icao24Codes.length === 0) {
    const generalPattern = /\b([a-f0-9]{6,8})\b/g;
    const generalMatches = [...response.matchAll(generalPattern)];
    if (generalMatches.length > 0) {
      icao24Codes = generalMatches.map(m => m[1]).filter(code => /^[a-f0-9]+$/i.test(code));
    }
  }
  
  if (icao24Codes.length === 0) {
    console.log('No ICAO24 codes found in response');
    return [];
  }
  
  console.log('Extracted ICAO24 codes:', icao24Codes);
  
  // Determine maintenance type based on response content
  let maintenanceType = 'A-Check';
  if (response.toLowerCase().includes('b-check') || response.toLowerCase().includes('b check') || response.toLowerCase().includes('b-check')) {
    maintenanceType = 'B-Check';
  } else if (response.toLowerCase().includes('c-check') || response.toLowerCase().includes('c check') || response.toLowerCase().includes('c-check')) {
    maintenanceType = 'C-Check';
  } else if (response.toLowerCase().includes('d-check') || response.toLowerCase().includes('d check') || response.toLowerCase().includes('d-check')) {
    maintenanceType = 'D-Check';
  }
  
  // Convert to FlightData objects
  const flights = icao24Codes.map(icao24 => ({
    icao24,
    flightNumber: `FL${icao24.slice(-3)}`,
    aircraftType: 'Unknown Aircraft',
    status: 'Needs Maintenance',
    maintenanceType: maintenanceType
  }));
  
  console.log('Parsed flights:', flights);
  return flights;
}

export function cleanResponseText(response: string): string {
  // Remove markdown formatting artifacts
  return response
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold markdown
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic markdown
    .replace(/`([^`]+)`/g, '$1') // Remove code markdown
    .replace(/\n\s*\n/g, '\n\n') // Clean up multiple newlines
    .trim();
}

export function hasFlightData(response: string): boolean {
  return /\*\*ICAO24:\*\*/i.test(response) || 
         /icao24/i.test(response) ||
         /\|\s*[a-f0-9]{6,8}\s*\|/i.test(response) ||
         /\b[a-f0-9]{6,8}\b/i.test(response);
}

export function extractTableData(response: string): { hasTable: boolean; flights: FlightData[] } {
  const flights = parseFlightDataFromResponse(response);
  return {
    hasTable: flights.length > 0,
    flights
  };
}
