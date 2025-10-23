import { FlightsPage } from "@/components/flights/flights-page";
import { Sidebar } from "@/components/layout/sidebar";
import { UserProfile } from "@/components/layout/user-profile";

export default function FlightsPageRoute() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Live Flights Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Live Flights</h1>
              <p className="text-gray-600 text-sm mt-1">Real-time flight tracking and monitoring</p>
            </div>
            <UserProfile />
          </div>
        </div>
        <FlightsPage />
      </div>
    </div>
  );
}
