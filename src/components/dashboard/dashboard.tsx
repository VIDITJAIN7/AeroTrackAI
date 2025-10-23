"use client";

import { useState, useEffect } from "react";

export function Dashboard() {
  const [totalFlights, setTotalFlights] = useState(1);
  const [maintenanceDue, setMaintenanceDue] = useState(1);
  const [avgFlightHours, setAvgFlightHours] = useState(1);

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
    setTimeout(() => animateCounter(setMaintenanceDue, 3, 1500), 300);
    setTimeout(() => animateCounter(setAvgFlightHours, 120, 1800), 500);
  }, []);

  const maintenanceData = [
    {
      flightNumber: "FL123",
      aircraftType: "Boeing 737",
      scheduledDate: "2024-07-15",
      status: "Scheduled"
    },
    {
      flightNumber: "FL456",
      aircraftType: "Airbus A320",
      scheduledDate: "2024-07-20",
      status: "Pending"
    },
    {
      flightNumber: "FL789",
      aircraftType: "Boeing 777",
      scheduledDate: "2024-07-25",
      status: "Completed"
    },
    {
      flightNumber: "FL101",
      aircraftType: "Airbus A350",
      scheduledDate: "2024-08-01",
      status: "Scheduled"
    },
    {
      flightNumber: "FL112",
      aircraftType: "Boeing 787",
      scheduledDate: "2024-08-05",
      status: "Pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
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

          {/* Maintenance Due Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-2 hover:border-blue-500 transition-colors duration-200 cursor-pointer">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Maintenance Due</h3>
            <p className="text-3xl font-bold text-blue-600">{maintenanceDue}</p>
          </div>

          {/* Average Flight Hours Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-2 hover:border-blue-500 transition-colors duration-200 cursor-pointer">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Average Flight Hours</h3>
            <p className="text-3xl font-bold text-gray-900">{avgFlightHours}</p>
          </div>
        </div>

        {/* Maintenance Schedule Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Maintenance Schedule Summary</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    FLIGHT NUMBER
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AIRCRAFT TYPE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SCHEDULED DATE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {maintenanceData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.flightNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.aircraftType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.scheduledDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
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
