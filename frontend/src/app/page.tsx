import { Dashboard } from "@/components/dashboard/dashboard";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { FloatingChat } from "@/components/chat/floating-chat";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <div className="fixed top-0 left-0 right-0 lg:left-64 z-10">
          <Header />
        </div>
        <div className="flex-1 pt-32 overflow-y-auto">
          <Dashboard />
        </div>
      </div>
      <FloatingChat />
    </div>
  );
}