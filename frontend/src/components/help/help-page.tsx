"use client";

import { HelpCircle, Clock, BookOpen, Video, FileText } from "lucide-react";

export function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Coming Soon Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          {/* Icon */}
          <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-8">
            <HelpCircle className="h-12 w-12 text-blue-600" />
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Help & Support
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive help resources and support system
          </p>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Knowledge Base</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive documentation and guides for all features
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Video className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-gray-600 text-sm">
                Step-by-step video guides for common tasks and features
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">FAQ Section</h3>
              <p className="text-gray-600 text-sm">
                Quick answers to frequently asked questions and common issues
              </p>
            </div>
          </div>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium">
            <Clock className="h-5 w-5 mr-2" />
            Coming Soon
          </div>

          {/* Description */}
          <p className="text-gray-500 mt-6 max-w-lg mx-auto">
            We're building a comprehensive help center with documentation, tutorials, 
            and support resources. Stay tuned for this valuable addition to AeroTrack AI.
          </p>
        </div>
      </div>
    </div>
  );
}
