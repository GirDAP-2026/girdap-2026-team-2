import Link from "next/link";
import { AI_MODULES, copilotModulePath, DEFAULT_AI_MODULE } from "@/lib/ai-modules";

export default function CopilotModuleNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <p className="text-sm font-semibold text-[var(--odeal-primary)]">404</p>
      <h1 className="mt-2 text-xl font-semibold">Bilinmeyen modül</h1>
      <p className="mt-2 max-w-md text-center text-sm text-[var(--odeal-text-muted)]">
        Bu adres geçerli bir AI modülüne karşılık gelmiyor. Aşağıdan bir modüle gidebilirsiniz.
      </p>
      <ul className="mt-6 flex flex-col gap-2">
        {AI_MODULES.map((m) => (
          <li key={m.key}>
            <Link
              href={copilotModulePath(m.key)}
              className="text-sm font-medium text-[var(--odeal-primary)] underline-offset-2 hover:underline"
            >
              {m.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={copilotModulePath(DEFAULT_AI_MODULE)}
        className="mt-8 rounded-[var(--odeal-radius)] bg-[var(--odeal-primary)] px-4 py-2 text-sm font-medium text-white"
      >
        Varsayılan modüle dön
      </Link>
    </div>
  );
}
