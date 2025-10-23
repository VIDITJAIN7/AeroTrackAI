"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface MaintenanceEntry {
  id: string;
  icao24?: string;
  flightNumber: string;
  aircraftType: string;
  scheduledDate: string;
  status: 'Scheduled' | 'Pending' | 'Completed' | 'Cancelled';
  maintenanceType: 'A-Check' | 'B-Check' | 'C-Check';
  description?: string;
  estimatedDuration?: string;
  createdAt: string;
}

interface MaintenanceContextType {
  maintenanceEntries: MaintenanceEntry[];
  addMaintenanceEntry: (entry: Omit<MaintenanceEntry, 'id' | 'createdAt'>) => void;
  updateMaintenanceEntry: (id: string, updates: Partial<MaintenanceEntry>) => void;
  deleteMaintenanceEntry: (id: string) => void;
  getMaintenanceEntries: () => MaintenanceEntry[];
}

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

export function MaintenanceProvider({ children }: { children: ReactNode }) {
  const [maintenanceEntries, setMaintenanceEntries] = useState<MaintenanceEntry[]>([
    {
      id: '1',
      icao24: 'ABC123',
      flightNumber: 'FL123',
      aircraftType: 'Boeing 737',
      scheduledDate: '2024-07-15',
      status: 'Scheduled',
      maintenanceType: 'A-Check',
      description: 'Routine maintenance check',
      estimatedDuration: '4 hours',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      icao24: 'DEF456',
      flightNumber: 'FL456',
      aircraftType: 'Airbus A320',
      scheduledDate: '2024-07-20',
      status: 'Pending',
      maintenanceType: 'B-Check',
      description: 'Engine inspection',
      estimatedDuration: '6 hours',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      icao24: 'GHI789',
      flightNumber: 'FL789',
      aircraftType: 'Boeing 777',
      scheduledDate: '2024-07-25',
      status: 'Completed',
      maintenanceType: 'A-Check',
      description: 'Pre-flight inspection',
      estimatedDuration: '2 hours',
      createdAt: new Date().toISOString()
    },
    {
      id: '4',
      icao24: 'JKL101',
      flightNumber: 'FL101',
      aircraftType: 'Airbus A350',
      scheduledDate: '2024-08-01',
      status: 'Scheduled',
      maintenanceType: 'C-Check',
      description: 'Landing gear maintenance',
      estimatedDuration: '5 hours',
      createdAt: new Date().toISOString()
    },
    {
      id: '5',
      icao24: 'MNO112',
      flightNumber: 'FL112',
      aircraftType: 'Boeing 787',
      scheduledDate: '2024-08-05',
      status: 'Pending',
      maintenanceType: 'B-Check',
      description: 'Avionics system update',
      estimatedDuration: '8 hours',
      createdAt: new Date().toISOString()
    }
  ]);

  const addMaintenanceEntry = (entry: Omit<MaintenanceEntry, 'id' | 'createdAt'>) => {
    const newEntry: MaintenanceEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setMaintenanceEntries(prev => [...prev, newEntry]);
  };

  const updateMaintenanceEntry = (id: string, updates: Partial<MaintenanceEntry>) => {
    setMaintenanceEntries(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, ...updates } : entry
      )
    );
  };

  const deleteMaintenanceEntry = (id: string) => {
    setMaintenanceEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const getMaintenanceEntries = () => {
    return maintenanceEntries;
  };

  // Listen for AI-generated flight additions
  useEffect(() => {
    const handleAddFlightFromAI = (event: CustomEvent) => {
      const flightInfo = event.detail;
      addMaintenanceEntry(flightInfo);
    };

    window.addEventListener('addFlightToMaintenance', handleAddFlightFromAI as EventListener);
    
    return () => {
      window.removeEventListener('addFlightToMaintenance', handleAddFlightFromAI as EventListener);
    };
  }, []);

  return (
    <MaintenanceContext.Provider value={{
      maintenanceEntries,
      addMaintenanceEntry,
      updateMaintenanceEntry,
      deleteMaintenanceEntry,
      getMaintenanceEntries
    }}>
      {children}
    </MaintenanceContext.Provider>
  );
}

export function useMaintenance() {
  const context = useContext(MaintenanceContext);
  if (context === undefined) {
    throw new Error('useMaintenance must be used within a MaintenanceProvider');
  }
  return context;
}
