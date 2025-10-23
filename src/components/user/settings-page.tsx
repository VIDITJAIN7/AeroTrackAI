"use client";

import { useState } from "react";
import { Shield, Bell, Eye, Key, Database, Globe, Palette } from "lucide-react";

export function SettingsPage() {
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    emailNotifications: true,
    pushNotifications: false,
    dataSharing: false,
    analytics: true,
    darkMode: false,
    autoSave: true
  });

  const handleToggle = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleSaveChanges = () => {
    alert("Settings updated successfully!");
  };

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    description, 
    setting, 
    enabled 
  }: {
    icon: any;
    title: string;
    description: string;
    setting: string;
    enabled: boolean;
  }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <Icon className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <button
        onClick={() => handleToggle(setting)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-blue-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Security</h3>
            <div className="space-y-4">
              <SettingItem
                icon={Shield}
                title="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
                setting="twoFactorAuth"
                enabled={settings.twoFactorAuth}
              />
              <SettingItem
                icon={Key}
                title="Password Requirements"
                description="Enforce strong password policies"
                setting="passwordRequirements"
                enabled={true}
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Notifications</h3>
            <div className="space-y-4">
              <SettingItem
                icon={Bell}
                title="Email Notifications"
                description="Receive updates via email"
                setting="emailNotifications"
                enabled={settings.emailNotifications}
              />
              <SettingItem
                icon={Bell}
                title="Push Notifications"
                description="Receive real-time notifications"
                setting="pushNotifications"
                enabled={settings.pushNotifications}
              />
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Privacy</h3>
            <div className="space-y-4">
              <SettingItem
                icon={Eye}
                title="Data Sharing"
                description="Allow data to be shared with third parties"
                setting="dataSharing"
                enabled={settings.dataSharing}
              />
              <SettingItem
                icon={Database}
                title="Analytics"
                description="Help improve our service with usage analytics"
                setting="analytics"
                enabled={settings.analytics}
              />
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Appearance</h3>
            <div className="space-y-4">
              <SettingItem
                icon={Palette}
                title="Dark Mode"
                description="Use dark theme for the interface"
                setting="darkMode"
                enabled={settings.darkMode}
              />
              <SettingItem
                icon={Globe}
                title="Auto Save"
                description="Automatically save your work"
                setting="autoSave"
                enabled={settings.autoSave}
              />
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


