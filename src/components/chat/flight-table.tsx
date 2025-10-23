"use client";

import { useState } from "react";
import { Plus, Plane, Calendar, Wrench } from "lucide-react";
import { useMaintenance } from "@/contexts/maintenance-context";

interface FlightData {
  icao24: string;
  flightNumber?: string;
  aircraftType?: string;
  status?: string;
  maintenanceType?: string;
}

interface FlightTableProps {
  flights: FlightData[];
  title?: string;
}

export function FlightTable({ flights, title = "Flight Information" }: FlightTableProps) {
  const { addMaintenanceEntry } = useMaintenance();
  const [addedFlights, setAddedFlights] = useState<Set<string>>(new Set());

  const handleAddToMaintenance = (flight: FlightData) => {
    const flightNumber = flight.flightNumber || `FL${flight.icao24.slice(-3)}`;
    const aircraftType = flight.aircraftType || 'Unknown Aircraft';
    const maintenanceType = flight.maintenanceType || 'A-Check';
    
    // Set priority based on maintenance type
    let priority = 'Medium';
    let estimatedDuration = '4-6 hours';
    
    if (maintenanceType === 'B-Check') {
      priority = 'High';
      estimatedDuration = '6-8 hours';
    } else if (maintenanceType === 'C-Check') {
      priority = 'High';
      estimatedDuration = '8-12 hours';
    } else if (maintenanceType === 'D-Check') {
      priority = 'Critical';
      estimatedDuration = '12-24 hours';
    }
    
    addMaintenanceEntry({
      flightNumber,
      aircraftType,
      scheduledDate: new Date().toISOString().split('T')[0],
      status: 'Scheduled',
      priority: priority as any,
      description: `${maintenanceType} maintenance for ${flight.icao24}`,
      assignedTechnician: '',
      estimatedDuration
    });

    setAddedFlights(prev => new Set([...prev, flight.icao24]));
  };

  const handleAddAllToMaintenance = () => {
    flights.forEach(flight => {
      if (!addedFlights.has(flight.icao24)) {
        handleAddToMaintenance(flight);
      }
    });
  };

  const isAdded = (icao24: string) => addedFlights.has(icao24);
  const allAdded = flights.every(flight => addedFlights.has(flight.icao24));
  const someAdded = flights.some(flight => addedFlights.has(flight.icao24));

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm my-4">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center">
          <Plane className="h-4 w-4 mr-2" />
          {flights.length > 0 && flights[0].maintenanceType 
            ? `${flights[0].maintenanceType} Aircraft` 
            : title
          } ({flights.length} flights)
        </h3>
        <button
          onClick={handleAddAllToMaintenance}
          disabled={allAdded}
          className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-md transition-colors ${
            allAdded
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          {allAdded ? (
            <>
              <Wrench className="h-3 w-3 mr-1" />
              All Added
            </>
          ) : (
            <>
              <Plus className="h-3 w-3 mr-1" />
              Add All to Maintenance
            </>
          )}
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ICAO24
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Flight Number
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aircraft Type
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Maintenance Type
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {flights.map((flight, index) => (
              <tr key={flight.icao24} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-mono text-gray-900">
                  {flight.icao24}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {flight.flightNumber || `FL${flight.icao24.slice(-3)}`}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {flight.aircraftType || 'Unknown'}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {flight.status || 'Needs Maintenance'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    flight.maintenanceType === 'A-Check' ? 'bg-blue-100 text-blue-800' :
                    flight.maintenanceType === 'B-Check' ? 'bg-orange-100 text-orange-800' :
                    flight.maintenanceType === 'C-Check' ? 'bg-purple-100 text-purple-800' :
                    flight.maintenanceType === 'D-Check' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {flight.maintenanceType || 'A-Check'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleAddToMaintenance(flight)}
                    disabled={isAdded(flight.icao24)}
                    className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      isAdded(flight.icao24)
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {isAdded(flight.icao24) ? (
                      <>
                        <Wrench className="h-3 w-3 mr-1" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="h-3 w-3 mr-1" />
                        Add to Maintenance
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-600">
            {someAdded 
              ? `${addedFlights.size} of ${flights.length} flights added to maintenance schedule`
              : 'Click "Add to Maintenance" to schedule these flights for A-Check maintenance.'
            }
          </p>
          {someAdded && !allAdded && (
            <button
              onClick={handleAddAllToMaintenance}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Add remaining flights
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
