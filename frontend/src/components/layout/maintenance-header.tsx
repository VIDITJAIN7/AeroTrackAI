import { UserProfile } from "./user-profile";

export function MaintenanceHeader() {
  return (
    <div className="bg-white px-6 py-8 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule Maintenance</h1>
          <p className="text-gray-600 text-sm mt-1">Review your bookmarked flights and schedule maintenance based on your operational needs and aircraft availability.</p>
        </div>
        <UserProfile />
      </div>
    </div>
  );
}

