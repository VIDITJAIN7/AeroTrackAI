import { SettingsPage } from "@/components/user/settings-page";
import { Sidebar } from "@/components/layout/sidebar";
import { FloatingChat } from "@/components/chat/floating-chat";
import { UserProfile } from "@/components/layout/user-profile";

export default function SettingsPageRoute() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Settings Header */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 z-10 bg-white border-b border-gray-200 px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 text-sm mt-1">Account settings and preferences</p>
            </div>
            <UserProfile />
          </div>
        </div>
        <div className="flex-1 pt-32 overflow-y-auto">
          <SettingsPage />
        </div>
      </div>
      <FloatingChat />
    </div>
  );
}


