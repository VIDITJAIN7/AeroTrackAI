import { NotificationsPage } from "@/components/user/notifications-page";
import { Sidebar } from "@/components/layout/sidebar";
import { FloatingChat } from "@/components/chat/floating-chat";
import { UserProfile } from "@/components/layout/user-profile";

export default function NotificationsPageRoute() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Notifications Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-1">Manage your notifications</p>
            </div>
            <UserProfile />
          </div>
        </div>
        <NotificationsPage />
      </div>
      <FloatingChat />
    </div>
  );
}


