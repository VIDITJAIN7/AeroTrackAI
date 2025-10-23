"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useMaintenance } from "@/contexts/maintenance-context";

interface AddFlightFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddFlightForm({ isOpen, onClose }: AddFlightFormProps) {
  const { addMaintenanceEntry } = useMaintenance();
  const [formData, setFormData] = useState({
    icao24: '',
    flightNumber: '',
    aircraftType: '',
    scheduledDate: '',
    status: 'Scheduled' as const,
    maintenanceType: 'A-Check' as const,
    description: '',
    estimatedDuration: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.flightNumber || !formData.aircraftType || !formData.scheduledDate) {
      alert('Please fill in all required fields');
      return;
    }

    addMaintenanceEntry({
      icao24: formData.icao24,
      flightNumber: formData.flightNumber,
      aircraftType: formData.aircraftType,
      scheduledDate: formData.scheduledDate,
      status: formData.status,
      maintenanceType: formData.maintenanceType,
      description: formData.description,
      estimatedDuration: formData.estimatedDuration
    });

    // Reset form
    setFormData({
      icao24: '',
      flightNumber: '',
      aircraftType: '',
      scheduledDate: '',
      status: 'Scheduled',
      maintenanceType: 'A-Check',
      description: '',
      estimatedDuration: ''
    });

    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add New Maintenance Entry</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ICAO24
              </label>
              <input
                type="text"
                value={formData.icao24}
                onChange={(e) => handleChange('icao24', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., ABC123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Flight Number *
              </label>
              <input
                type="text"
                value={formData.flightNumber}
                onChange={(e) => handleChange('flightNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., FL123"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aircraft Type *
              </label>
              <input
                type="text"
                value={formData.aircraftType}
                onChange={(e) => handleChange('aircraftType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Boeing 737"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Added *
              </label>
              <input
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => handleChange('scheduledDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maintenance Type
              </label>
              <select
                value={formData.maintenanceType}
                onChange={(e) => handleChange('maintenanceType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="A-Check">A-Check</option>
                <option value="B-Check">B-Check</option>
                <option value="C-Check">C-Check</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Duration
              </label>
              <input
                type="text"
                value={formData.estimatedDuration}
                onChange={(e) => handleChange('estimatedDuration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 4 hours"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Describe the maintenance task..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Entry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
