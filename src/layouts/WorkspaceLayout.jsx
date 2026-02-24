import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function WorkspaceLayout() {
  return (
    <div className="min-h-screen bg-[var(--surface-900)] mesh-gradient-bg">
      <div className="flex relative">
        <Sidebar />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8 w-full lg:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
