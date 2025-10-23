"use client";

import { Plane, Clock, MapPin, Users, Wifi, Coffee, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlightCardProps {
  flight: {
    id: string;
    flightNumber: string;
    airline: string;
    departure: {
      city: string;
      code: string;
      time: string;
    };
    arrival: {
      city: string;
      code: string;
      time: string;
    };
    status: "on-time" | "delayed" | "boarding" | "departed";
    progress: number;
    passengers: number;
    amenities: string[];
  };
}

export function FlightCard({ flight }: FlightCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-green-100 text-green-800";
      case "delayed":
        return "bg-red-100 text-red-800";
      case "boarding":
        return "bg-yellow-100 text-yellow-800";
      case "departed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "on-time":
        return "On Time";
      case "delayed":
        return "Delayed";
      case "boarding":
        return "Boarding";
      case "departed":
        return "Departed";
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Plane className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{flight.flightNumber}</h3>
            <p className="text-sm text-gray-500">{flight.airline}</p>
          </div>
        </div>
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-medium",
          getStatusColor(flight.status)
        )}>
          {getStatusText(flight.status)}
        </span>
      </div>

      {/* Route */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{flight.departure.time}</p>
          <p className="text-sm text-gray-500">{flight.departure.city}</p>
          <p className="text-xs text-gray-400">{flight.departure.code}</p>
        </div>
        
        <div className="flex-1 mx-4">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className="mx-2">
              <Plane className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <div className="mt-2 flex justify-center">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${flight.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{flight.arrival.time}</p>
          <p className="text-sm text-gray-500">{flight.arrival.city}</p>
          <p className="text-xs text-gray-400">{flight.arrival.code}</p>
        </div>
      </div>

      {/* Details */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{flight.passengers} passengers</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>2h 45m</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {flight.amenities.map((amenity, index) => {
            const Icon = amenity === "wifi" ? Wifi : 
                        amenity === "food" ? Utensils : 
                        amenity === "drinks" ? Coffee : null;
            return Icon ? (
              <div key={index} className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon className="h-3 w-3 text-gray-600" />
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
