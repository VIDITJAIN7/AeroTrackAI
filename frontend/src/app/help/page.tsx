import { HelpPage } from "@/components/help/help-page";
import { Sidebar } from "@/components/layout/sidebar";
import { HelpHeader } from "@/components/layout/help-header";

export default function Help() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <div className="fixed top-0 left-0 right-0 lg:left-64 z-10">
          <HelpHeader />
        </div>
        <div className="flex-1 pt-32 overflow-y-auto">
          <HelpPage />
        </div>
      </div>
    </div>
  );
}
