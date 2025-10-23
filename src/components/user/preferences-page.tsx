"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function PreferencesPage() {
  const [preferences, setPreferences] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    defaultRole: "Admin",
    defaultGroup: "Engineering",
    defaultDestination: "BigQuery Production",
    language: "English",
    timezone: "Pacific Time (PT)",
    theme: "Light"
  });

  const handleInputChange = (field: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = () => {
    alert("Preferences updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Account Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Account</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={preferences.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-80 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={preferences.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-80 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <button className="w-80 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Default role</label>
                <div className="relative w-80">
                  <select
                    value={preferences.defaultRole}
                    onChange={(e) => handleInputChange("defaultRole", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Manager">Manager</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Default group</label>
                <div className="relative w-80">
                  <select
                    value={preferences.defaultGroup}
                    onChange={(e) => handleInputChange("defaultGroup", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Operations">Operations</option>
                    <option value="Management">Management</option>
                    <option value="Support">Support</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Default destination</label>
                <div className="relative w-80">
                  <select
                    value={preferences.defaultDestination}
                    onChange={(e) => handleInputChange("defaultDestination", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="BigQuery Production">BigQuery Production</option>
                    <option value="BigQuery Staging">BigQuery Staging</option>
                    <option value="PostgreSQL">PostgreSQL</option>
                    <option value="MySQL">MySQL</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Language</label>
                <div className="relative w-80">
                  <select
                    value={preferences.language}
                    onChange={(e) => handleInputChange("language", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Timezone</label>
                <div className="relative w-80">
                  <select
                    value={preferences.timezone}
                    onChange={(e) => handleInputChange("timezone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                    <option value="Mountain Time (MT)">Mountain Time (MT)</option>
                    <option value="Central Time (CT)">Central Time (CT)</option>
                    <option value="Eastern Time (ET)">Eastern Time (ET)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Theme</label>
                <div className="relative w-80">
                  <select
                    value={preferences.theme}
                    onChange={(e) => handleInputChange("theme", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="Light">Light</option>
                    <option value="Dark">Dark</option>
                    <option value="Auto">Auto</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveChanges}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


