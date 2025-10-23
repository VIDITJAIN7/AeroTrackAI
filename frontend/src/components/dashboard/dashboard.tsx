"use client";

import { useState, useEffect } from "react";
import { useMaintenance } from "@/contexts/maintenance-context";
import { Calendar, Plane } from "lucide-react";

export function Dashboard() {
  const { maintenanceEntries } = useMaintenance();
  const [totalFlights, setTotalFlights] = useState(1);
  const [maintenanceDue, setMaintenanceDue] = useState(1);
  const [avgFlightHours, setAvgFlightHours] = useState(1);

  // Get the last 5 maintenance entries
  const lastFiveEntries = maintenanceEntries.slice(-5);

  useEffect(() => {
    const animateCounter = (setter: (value: number) => void, target: number, duration: number) => {
      const startTime = Date.now();
      const startValue = 1;
      
      const updateCounter = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOutCubic);
        
        setter(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };
      
      requestAnimationFrame(updateCounter);
    };

    // Start animations with slight delays for staggered effect
    setTimeout(() => animateCounter(setTotalFlights, 1250, 2000), 100);
    setTimeout(() => animateCounter(setMaintenanceDue, 125, 1500), 300);
    setTimeout(() => animateCounter(setAvgFlightHours, 1125, 1800), 500);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMaintenanceTypeColor = (maintenanceType: string) => {
    switch (maintenanceType) {
      case "A-Check":
        return "bg-yellow-100 text-yellow-800";
      case "B-Check":
        return "bg-orange-100 text-orange-800";
      case "C-Check":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Key Metrics Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Flights Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-2 hover:border-blue-500 transition-colors duration-200 cursor-pointer">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Flights</h3>
            <p className="text-3xl font-bold text-gray-900">{totalFlights.toLocaleString()}</p>
          </div>

          {/* Maintenance Completed Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-2 hover:border-blue-500 transition-colors duration-200 cursor-pointer">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Maintenance Completed</h3>
            <p className="text-3xl font-bold text-green-600">{maintenanceDue}</p>
          </div>

          {/* Maintenance Due Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-2 hover:border-blue-500 transition-colors duration-200 cursor-pointer">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Maintenance Due</h3>
            <p className="text-3xl font-bold text-blue-600">{avgFlightHours}</p>
          </div>
        </div>

        {/* Maintenance Schedule Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Maintenance Entries</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ICAO24
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flight Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aircraft Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Maintenance Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lastFiveEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-900">{entry.icao24 || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Plane className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">{entry.flightNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{entry.aircraftType}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{entry.scheduledDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(entry.status)}`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMaintenanceTypeColor(entry.maintenanceType || 'A-Check')}`}>
                        {entry.maintenanceType || 'A-Check'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
