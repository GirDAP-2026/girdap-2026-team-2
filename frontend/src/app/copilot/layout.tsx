import ModuleSidebar from "../components/ModuleSidebar";

export default function CopilotLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--odeal-bg)] text-[var(--odeal-text)]">
      <ModuleSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
