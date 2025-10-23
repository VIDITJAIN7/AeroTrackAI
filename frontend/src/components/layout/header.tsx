import { UserProfile } from "./user-profile";

export function Header() {
  return (
    <div className="bg-white px-6 py-8 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 text-sm mt-1">Welcome back, get a quick overview of your fleet.</p>
        </div>
        <UserProfile />
      </div>
    </div>
  );
}
