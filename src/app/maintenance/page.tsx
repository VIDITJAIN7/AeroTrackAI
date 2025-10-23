import { ScheduleMaintenance } from "@/components/maintenance/schedule-maintenance";
import { Sidebar } from "@/components/layout/sidebar";
import { FloatingChat } from "@/components/chat/floating-chat";
import { MaintenanceHeader } from "@/components/layout/maintenance-header";

export default function MaintenancePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <MaintenanceHeader />
        <ScheduleMaintenance />
      </div>
      <FloatingChat />
    </div>
  );
}
