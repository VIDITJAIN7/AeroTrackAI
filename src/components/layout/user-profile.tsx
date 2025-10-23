"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  User, 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronDown,
  Shield,
  Palette,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

export function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      icon: User,
      label: "Profile",
      href: "/profile",
      description: "View and edit your profile"
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      description: "Account settings and preferences"
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/notifications",
      description: "Manage your notifications"
    },
    {
      icon: Palette,
      label: "Preferences",
      href: "/preferences",
      description: "Customize your experience"
    },
    {
      icon: Shield,
      label: "Privacy",
      href: "#",
      description: "Privacy and security settings"
    },
    {
      icon: Globe,
      label: "Language",
      href: "#",
      description: "Change language and region"
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      href: "#",
      description: "Get help and contact support"
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">JD</span>
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-900">John Doe</p>
          <p className="text-xs text-gray-500">john@example.com</p>
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 text-gray-400 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-medium">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
                <p className="text-xs text-blue-600">Administrator</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <Icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Logout Section */}
          <div className="border-t border-gray-100 pt-2">
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors group"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-red-50 transition-colors">
                <LogOut className="h-4 w-4 text-gray-600 group-hover:text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 group-hover:text-red-600">Sign Out</p>
                <p className="text-xs text-gray-500">Sign out of your account</p>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
