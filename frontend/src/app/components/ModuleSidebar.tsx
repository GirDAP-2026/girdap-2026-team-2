"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AI_MODULES, type ModuleKey, copilotModulePath } from "@/lib/ai-modules";

const cardHover =
  "odeal-hover-lift hover:border-[var(--odeal-primary)] hover:bg-[var(--odeal-card-hover)]";

export default function ModuleSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="sticky top-0 flex h-screen w-[min(100%,17.5rem)] shrink-0 flex-col border-r border-[var(--odeal-border)] bg-[var(--odeal-sidebar)]"
      aria-label="AI modülleri"
    >
      <div className="border-b border-[var(--odeal-border)] px-4 py-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--odeal-primary)]">
          AI modülleri
        </p>
        <p className="mt-2 text-sm font-semibold leading-snug text-[var(--odeal-text)]">
          Copilot görünümleri
        </p>
        <p className="mt-1 text-xs leading-relaxed text-[var(--odeal-text-muted)]">
          Modül seçince sayfa ve veri bu panele göre yüklenir.
        </p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {AI_MODULES.map((m) => {
          const href = copilotModulePath(m.key);
          const on = pathname === href || pathname?.startsWith(`${href}/`);
          return (
            <Link
              key={m.key}
              href={href}
              className={`odeal-ring-focus rounded-[var(--odeal-radius)] border px-3 py-3 text-left transition duration-200 ${
                on
                  ? "border-[var(--odeal-primary)] bg-[var(--odeal-primary-muted)] shadow-[var(--odeal-shadow-card)]"
                  : `border-[var(--odeal-border)] bg-[var(--odeal-bg-elevated)] ${cardHover}`
              }`}
            >
              <p className="text-sm font-semibold text-[var(--odeal-text)]">{m.title}</p>
              <p className="mt-0.5 text-xs text-[var(--odeal-text-muted)]">{m.blurb}</p>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-[var(--odeal-border)] px-4 py-3">
        <p className="text-[10px] text-[var(--odeal-text-muted)]">
          Aktif:{" "}
          <span className="font-medium text-[var(--odeal-primary)]">
            {(pathname?.split("/").pop() || "—") as ModuleKey | string}
          </span>
        </p>
      </div>
    </aside>
  );
}
