import { ScheduleMaintenance } from "@/components/maintenance/schedule-maintenance";
import { Sidebar } from "@/components/layout/sidebar";
import { FloatingChat } from "@/components/chat/floating-chat";
import { MaintenanceHeader } from "@/components/layout/maintenance-header";

export default function MaintenancePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <div className="fixed top-0 left-0 right-0 lg:left-64 z-10">
          <MaintenanceHeader />
        </div>
        <div className="flex-1 pt-32 overflow-y-auto">
          <ScheduleMaintenance />
        </div>
      </div>
      <FloatingChat />
    </div>
  );
}
