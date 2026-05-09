"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ModuleKey } from "@/lib/ai-modules";

const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:4000";

type ThemeMode = "dark" | "light";

type CompanyRow = {
  id: string;
  name: string;
  category: string;
  tagline: string;
};

type ChatMessage = { role: "user" | "assistant"; text: string };

type Kpi = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
};

type InsightPayload = {
  module: string;
  company: { id: string; name: string; category: string };
  headline: string;
  kpis: Kpi[];
  highlights: string[];
  recommendations: {
    id: string;
    title: string;
    description: string;
    impact: string;
    priority: string;
  }[];
};

type CashflowPayload = {
  module: string;
  company: { id: string; name: string; category: string };
  riskLevel: string;
  riskLabel: string;
  expectedShortfall: number;
  days: { label: string; amount: number }[];
  warning: string;
  actions: { title: string; detail: string }[];
};

type RetentionPayload = {
  module: string;
  company: { id: string; name: string; category: string };
  insight: string;
  customers: {
    id: string;
    name: string;
    daysInactive: number;
    segment: string;
    suggestion: string;
    couponCode: string;
    recoverScore: number;
  }[];
};

type CampaignPayload = {
  module: string;
  company: { id: string; name: string; category: string };
  generatedAt: string;
  campaigns: {
    id: string;
    slot: string;
    title: string;
    suggestion: string;
    expectedImpact: string;
    audience: string;
  }[];
};

type VoiceBootstrap = {
  module: string;
  company: { id: string; name: string; category: string };
  quickQuestions: string[];
};

function trendIcon(trend: Kpi["trend"]) {
  if (trend === "up") return "↑";
  if (trend === "down") return "↓";
  return "→";
}

function trendClass(trend: Kpi["trend"]) {
  if (trend === "up") return "text-[var(--odeal-success)]";
  if (trend === "down") return "text-[var(--odeal-danger)]";
  return "text-[var(--odeal-text-muted)]";
}

type CopilotDemoProps = {
  routeModule: ModuleKey;
};

export default function CopilotDemo({ routeModule }: CopilotDemoProps) {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [companyList, setCompanyList] = useState<CompanyRow[]>([]);
  const [defaultCompanyId, setDefaultCompanyId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [activeModule, setActiveModule] = useState<ModuleKey>(routeModule);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [insight, setInsight] = useState<InsightPayload | null>(null);
  const [cashflow, setCashflow] = useState<CashflowPayload | null>(null);
  const [retention, setRetention] = useState<RetentionPayload | null>(null);
  const [campaign, setCampaign] = useState<CampaignPayload | null>(null);

  const [voiceQuick, setVoiceQuick] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatBusy, setChatBusy] = useState(false);

  const [toast, setToast] = useState("");
  const [sentCoupons, setSentCoupons] = useState<Record<string, boolean>>({});
  const [activeCampaigns, setActiveCampaigns] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("odeal-theme");
    const initial: ThemeMode = saved === "light" || saved === "dark" ? saved : "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("odeal-theme", theme);
  }, [theme]);

  useEffect(() => {
    setActiveModule(routeModule);
  }, [routeModule]);

  const categories = useMemo(() => {
    const set = new Set(companyList.map((c) => c.category));
    return ["all", ...Array.from(set).sort()];
  }, [companyList]);

  const filteredCompanies = useMemo(() => {
    if (categoryFilter === "all") return companyList;
    return companyList.filter((c) => c.category === categoryFilter);
  }, [companyList, categoryFilter]);

  const sortedCompanyCards = useMemo(() => {
    return [...filteredCompanies].sort(
      (a, b) => a.category.localeCompare(b.category, "tr") || a.name.localeCompare(b.name, "tr"),
    );
  }, [filteredCompanies]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${baseUrl}/api/companies`);
        if (!res.ok) throw new Error("Şirket listesi alınamadı");
        const data = (await res.json()) as {
          companies: CompanyRow[];
          defaultCompanyId?: string;
        };
        if (cancelled) return;
        setCompanyList(data.companies);
        const initial = data.defaultCompanyId ?? data.companies[0]?.id ?? "";
        setDefaultCompanyId(initial);
        setCompanyId(initial);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Bağlantı hatası");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const fetchModuleData = useCallback(
    async (mod: ModuleKey, cid: string) => {
      if (!cid) return;
      setLoading(true);
      setError("");
      try {
        if (mod === "voice") {
          const res = await fetch(`${baseUrl}/api/modules/voice/bootstrap?companyId=${encodeURIComponent(cid)}`);
          if (!res.ok) throw new Error(`Voice bootstrap: ${res.status}`);
          const data = (await res.json()) as VoiceBootstrap;
          setVoiceQuick(data.quickQuestions);
          setChatMessages([
            {
              role: "assistant",
              text: `${data.company.name} için hazırım. Aşağıdaki sorulardan birini seçin veya yazın.`,
            },
          ]);
          setInsight(null);
          setCashflow(null);
          setRetention(null);
          setCampaign(null);
          return;
        }

        const path =
          mod === "insight"
            ? "insight"
            : mod === "cashflow"
              ? "cashflow"
              : mod === "retention"
                ? "retention"
                : "campaign";
        const res = await fetch(`${baseUrl}/api/modules/${path}?companyId=${encodeURIComponent(cid)}`);
        if (!res.ok) throw new Error(`Modül verisi: ${res.status}`);
        const json = (await res.json()) as InsightPayload | CashflowPayload | RetentionPayload | CampaignPayload;

        if (mod === "insight") setInsight(json as InsightPayload);
        if (mod === "cashflow") setCashflow(json as CashflowPayload);
        if (mod === "retention") setRetention(json as RetentionPayload);
        if (mod === "campaign") setCampaign(json as CampaignPayload);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Yükleme hatası");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!companyId) return;
    void fetchModuleData(activeModule, companyId);
  }, [activeModule, companyId, fetchModuleData]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  async function sendVoiceMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || !companyId) return;
    setChatMessages((m) => [...m, { role: "user", text: trimmed }]);
    setChatBusy(true);
    try {
      const res = await fetch(`${baseUrl}/api/modules/voice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, companyId }),
      });
      if (!res.ok) throw new Error("Asistan yanıt veremedi");
      const data = (await res.json()) as { answer: string };
      setChatMessages((m) => [...m, { role: "assistant", text: data.answer }]);
    } catch (e) {
      setChatMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: e instanceof Error ? e.message : "Bir hata oluştu.",
        },
      ]);
    } finally {
      setChatBusy(false);
      setChatInput("");
    }
  }

  const selectedCompany = companyList.find((c) => c.id === companyId);

  const cardBase =
    "rounded-[var(--odeal-radius)] border border-[var(--odeal-border)] bg-[var(--odeal-card)] text-[var(--odeal-text)]";
  const cardHover = "odeal-hover-lift hover:border-[var(--odeal-primary)] hover:bg-[var(--odeal-card-hover)]";

  return (
    <div className="w-full text-[var(--odeal-text)]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="border-b border-[var(--odeal-border)] pb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--odeal-primary)]">
                Ödeal Copilot
              </p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">KOBİ Karar Destek Demo</h2>
              <p className="mt-1 max-w-2xl text-sm text-[var(--odeal-text-muted)]">
                {selectedCompany
                  ? `Seçili işletme: ${selectedCompany.name} · ${selectedCompany.category}`
                  : "İşletme listesi yükleniyor..."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                className={`odeal-ring-focus rounded-[var(--odeal-radius)] border border-[var(--odeal-border)] bg-[var(--odeal-card)] px-3 py-2 text-sm font-medium text-[var(--odeal-text)] transition hover:border-[var(--odeal-primary)] hover:text-[var(--odeal-primary)] ${cardHover}`}
                aria-label={theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"}
              >
                {theme === "dark" ? "Açık tema" : "Koyu tema"}
              </button>
              <button
                type="button"
                onClick={() => {
                  void fetchModuleData(activeModule, companyId);
                }}
                className="odeal-ring-focus rounded-[var(--odeal-radius)] bg-[var(--odeal-primary)] px-4 py-2 text-sm font-medium text-white shadow-[var(--odeal-shadow-card)] transition hover:bg-[var(--odeal-primary-hover)]"
              >
                Modülü yenile
              </button>
            </div>
          </div>
        </header>

        <section
          className={`mt-6 ${cardBase} p-5 shadow-[var(--odeal-shadow-card)]`}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="text-lg font-semibold">İşletme seçimi</h3>
              <p className="mt-1 max-w-xl text-sm text-[var(--odeal-text-muted)]">
                Aşağıdaki kartlardan birini seçin. Tüm modüller seçilen işletmeye göre mock veriyle güncellenir.
                Tasarım renkleri:{" "}
                <code className="rounded bg-[var(--odeal-primary-muted)] px-1 text-xs text-[var(--odeal-primary)]">
                  src/design/odeal-design-tokens.json
                </code>
              </p>
              {defaultCompanyId ? (
                <p className="mt-2 text-xs text-[var(--odeal-text-muted)]">
                  Varsayılan demo işletme: {defaultCompanyId}
                </p>
              ) : null}
            </div>
            <div className="flex flex-shrink-0 flex-wrap gap-2 lg:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition odeal-ring-focus ${
                    categoryFilter === cat
                      ? "bg-[var(--odeal-primary)] text-white shadow-[var(--odeal-shadow-card)]"
                      : `border border-[var(--odeal-border)] bg-[var(--odeal-bg-elevated)] text-[var(--odeal-text)] hover:border-[var(--odeal-primary)]`
                  }`}
                >
                  {cat === "all" ? "Tümü" : cat}
                </button>
              ))}
            </div>
          </div>

          {sortedCompanyCards.length === 0 ? (
            <p
              className={`mt-6 rounded-[var(--odeal-radius)] border border-[var(--odeal-border)] bg-[var(--odeal-bg-elevated)] p-6 text-center text-sm text-[var(--odeal-text-muted)]`}
            >
              Bu filtrede işletme yok.
            </p>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedCompanyCards.map((c) => {
                const active = c.id === companyId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setCompanyId(c.id);
                      setSentCoupons({});
                      setActiveCampaigns({});
                    }}
                    className={`group flex min-h-[140px] flex-col rounded-[var(--odeal-radius)] border p-4 text-left transition duration-200 odeal-ring-focus ${
                      active
                        ? "border-[var(--odeal-primary)] bg-[var(--odeal-primary-muted)] shadow-[var(--odeal-shadow-card)] ring-2 ring-[var(--odeal-primary)]"
                        : `${cardBase} ${cardHover}`
                    }`}
                  >
                    <span className="inline-flex w-fit rounded-full bg-[var(--odeal-primary-muted)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--odeal-primary)]">
                      {c.category}
                    </span>
                    <span className="mt-3 text-base font-semibold leading-snug group-hover:text-[var(--odeal-primary)]">
                      {c.name}
                    </span>
                    <span className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-[var(--odeal-text-muted)]">
                      {c.tagline}
                    </span>
                    <span className="mt-3 text-[11px] font-medium text-[var(--odeal-primary)]">
                      {active ? "Seçili" : "Seçmek için tıklayın →"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <main className="mt-8 flex-1 pb-10">
          {toast ? (
            <div
              className="mb-4 rounded-[var(--odeal-radius)] border px-4 py-3 text-sm"
              style={{
                borderColor: "color-mix(in srgb, var(--odeal-success) 40%, transparent)",
                backgroundColor: "color-mix(in srgb, var(--odeal-success) 12%, transparent)",
                color: "var(--odeal-success)",
              }}
            >
              {toast}
            </div>
          ) : null}

          {error ? (
            <div
              className="mb-4 rounded-[var(--odeal-radius)] border px-4 py-3 text-sm"
              style={{
                borderColor: "color-mix(in srgb, var(--odeal-danger) 40%, transparent)",
                backgroundColor: "color-mix(in srgb, var(--odeal-danger) 12%, transparent)",
                color: "var(--odeal-danger)",
              }}
            >
              {error}
            </div>
          ) : null}

          {loading ? (
            <div
              className={`flex items-center gap-3 rounded-[var(--odeal-radius)] border border-[var(--odeal-border)] bg-[var(--odeal-card)] p-6 text-[var(--odeal-text-muted)]`}
            >
              <span className="h-3 w-3 animate-pulse rounded-full bg-[var(--odeal-primary)]" />
              Copilot verileri hazırlanıyor...
            </div>
          ) : null}

          {!loading && activeModule === "insight" && insight ? (
            <div className="space-y-6">
              <div
                className={`rounded-[var(--odeal-radius)] border border-[var(--odeal-border)] bg-gradient-to-br from-[var(--odeal-primary-muted)] to-[var(--odeal-card)] p-6`}
              >
                <p className="text-xs uppercase tracking-widest text-[var(--odeal-primary)]">Bugünün özeti</p>
                <h3 className="mt-2 text-2xl font-semibold">{insight.headline}</h3>
                <p className="mt-2 text-sm text-[var(--odeal-text-muted)]">
                  Rakamlar yerine yorum ve aksiyon önceliği; &quot;veri → aksiyon&quot; hikâyesi.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {insight.kpis.map((k) => (
                  <div
                    key={k.label}
                    className={`${cardBase} p-4 ${cardHover}`}
                  >
                    <p className="text-xs uppercase text-[var(--odeal-text-muted)]">{k.label}</p>
                    <p className="mt-2 text-2xl font-semibold">{k.value}</p>
                    <p className={`mt-1 text-sm font-medium ${trendClass(k.trend)}`}>
                      {trendIcon(k.trend)} {k.change}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className={`${cardBase} p-5`}>
                  <h4 className="text-sm font-semibold">AI vurguları</h4>
                  <ul className="mt-3 space-y-3 text-sm text-[var(--odeal-text-muted)]">
                    {insight.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--odeal-primary)]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${cardBase} p-5`}>
                  <h4 className="text-sm font-semibold">Öncelikli tavsiyeler</h4>
                  <div className="mt-3 space-y-3">
                    {insight.recommendations.map((r) => (
                      <div
                        key={r.id}
                        className={`rounded-[var(--odeal-radius)] border border-[var(--odeal-border)] bg-[var(--odeal-bg-elevated)] p-4 transition hover:border-[var(--odeal-primary)] ${cardHover}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium">{r.title}</p>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                              r.priority === "high"
                                ? "bg-[color-mix(in_srgb,var(--odeal-danger)_22%,transparent)] text-[var(--odeal-danger)]"
                                : "bg-[color-mix(in_srgb,var(--odeal-warning)_22%,transparent)] text-[var(--odeal-warning)]"
                            }`}
                          >
                            {r.priority}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-[var(--odeal-text-muted)]">{r.description}</p>
                        <p className="mt-2 text-xs font-semibold text-[var(--odeal-success)]">{r.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {!loading && activeModule === "cashflow" && cashflow ? (
            <div className="space-y-6">
              <div
                className={`rounded-[var(--odeal-radius)] border p-5 ${
                  cashflow.riskLevel === "medium"
                    ? "border-[color-mix(in_srgb,var(--odeal-warning)_45%,var(--odeal-border))] bg-[color-mix(in_srgb,var(--odeal-warning)_12%,var(--odeal-card))]"
                    : "border-[color-mix(in_srgb,var(--odeal-success)_35%,var(--odeal-border))] bg-[color-mix(in_srgb,var(--odeal-success)_10%,var(--odeal-card))]"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--odeal-warning)]">
                  Erken uyarı
                </p>
                <h3 className="mt-2 text-xl font-semibold">{cashflow.riskLabel}</h3>
                <p className="mt-2 text-sm text-[var(--odeal-text-muted)]">{cashflow.warning}</p>
                {cashflow.expectedShortfall > 0 ? (
                  <p className="mt-3 text-sm font-semibold text-[var(--odeal-warning)]">
                    Tahmini açık: {cashflow.expectedShortfall.toLocaleString("tr-TR")} TL
                  </p>
                ) : null}
              </div>

              <div className={`${cardBase} p-5`}>
                <h4 className="text-sm font-semibold">7 günlük nakit görünümü (mock)</h4>
                <div className="mt-4 flex h-48 items-end gap-2">
                  {(() => {
                    const max = Math.max(...cashflow.days.map((d) => d.amount), 1);
                    return cashflow.days.map((d) => (
                      <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
                        <div
                          className="w-full rounded-t-md bg-gradient-to-t from-[var(--odeal-primary)] to-[var(--odeal-primary-hover)] transition hover:opacity-90"
                          style={{ height: `${(d.amount / max) * 100}%` }}
                          title={`${d.amount} TL`}
                        />
                        <span className="text-[10px] text-[var(--odeal-text-muted)]">{d.label}</span>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {cashflow.actions.map((a) => (
                  <div key={a.title} className={`${cardBase} p-4 ${cardHover}`}>
                    <p className="font-semibold">{a.title}</p>
                    <p className="mt-2 text-sm text-[var(--odeal-text-muted)]">{a.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {!loading && activeModule === "retention" && retention ? (
            <div className="space-y-5">
              <div className={`${cardBase} p-5`}>
                <h3 className="text-lg font-semibold">Müşteri geri kazanma</h3>
                <p className="mt-2 text-sm text-[var(--odeal-text-muted)]">{retention.insight}</p>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {retention.customers.map((c) => (
                  <div key={c.id} className={`${cardBase} p-4 ${cardHover}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-xs text-[var(--odeal-text-muted)]">{c.segment}</p>
                      </div>
                      <span className="rounded-full bg-[var(--odeal-bg-elevated)] px-2 py-1 text-[10px] text-[var(--odeal-text-muted)]">
                        {c.daysInactive} gün
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-[var(--odeal-primary)]">{c.suggestion}</p>
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] uppercase text-[var(--odeal-text-muted)]">
                        <span>Geri dönüş skoru</span>
                        <span>{c.recoverScore}%</span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-[var(--odeal-bg-elevated)]">
                        <div
                          className="h-2 rounded-full bg-[var(--odeal-primary)] transition-all"
                          style={{ width: `${c.recoverScore}%` }}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={Boolean(sentCoupons[c.id])}
                      onClick={() => {
                        setSentCoupons((s) => ({ ...s, [c.id]: true }));
                        setToast(`Kupon ${c.couponCode} — ${c.name} için simüle edildi.`);
                      }}
                      className="mt-4 w-full rounded-[var(--odeal-radius)] bg-[var(--odeal-primary)] py-2 text-sm font-medium text-white transition hover:bg-[var(--odeal-primary-hover)] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      {sentCoupons[c.id] ? "Kupon gönderildi (demo)" : "Kuponu simüle et"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {!loading && activeModule === "campaign" && campaign ? (
            <div className="space-y-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">Smart Campaign Generator</h3>
                  <p className="text-xs text-[var(--odeal-text-muted)]">
                    Üretim zamanı: {new Date(campaign.generatedAt).toLocaleString("tr-TR")}
                  </p>
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {campaign.campaigns.map((c) => (
                  <div key={c.id} className={`${cardBase} p-5 ${cardHover}`}>
                    <p className="text-xs uppercase text-[var(--odeal-text-muted)]">{c.slot}</p>
                    <h4 className="mt-2 text-lg font-semibold">{c.title}</h4>
                    <p className="mt-2 text-sm text-[var(--odeal-text-muted)]">{c.suggestion}</p>
                    <p className="mt-3 text-sm font-semibold text-[var(--odeal-success)]">{c.expectedImpact}</p>
                    <p className="mt-1 text-xs text-[var(--odeal-text-muted)]">Hedef: {c.audience}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCampaigns((s) => ({ ...s, [c.id]: true }));
                        setToast(`Kampanya "${c.title}" POS'ta aktif edildi (demo).`);
                      }}
                      className="mt-4 w-full rounded-[var(--odeal-radius)] border-2 border-[var(--odeal-primary)] bg-[var(--odeal-primary-muted)] py-2 text-sm font-medium text-[var(--odeal-primary)] transition hover:bg-[color-mix(in_srgb,var(--odeal-primary)_18%,transparent)]"
                    >
                      {activeCampaigns[c.id] ? "Aktif (demo)" : "POS'ta aktif et (demo)"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {!loading && activeModule === "voice" ? (
            <div
              className={`mx-auto flex max-w-3xl flex-col rounded-[var(--odeal-radius)] border border-[var(--odeal-border)] bg-[var(--odeal-card)] shadow-[var(--odeal-shadow-card)]`}
            >
              <div className="border-b border-[var(--odeal-border)] px-4 py-3">
                <p className="text-sm font-semibold">Voice / Chat Copilot</p>
                <p className="text-xs text-[var(--odeal-text-muted)]">
                  Hazır sorular ve serbest metin (mock cevaplar)
                </p>
              </div>
              <div className="h-[420px] space-y-3 overflow-y-auto px-4 py-4">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={`${idx}-${msg.text.slice(0, 12)}`}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[var(--odeal-primary)] text-white"
                          : "bg-[var(--odeal-chat-assistant-bg)] text-[var(--odeal-chat-assistant-text)]"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatBusy ? (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-[var(--odeal-chat-assistant-bg)] px-4 py-2 text-sm text-[var(--odeal-text-muted)]">
                      Yazıyor...
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="border-t border-[var(--odeal-border)] px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {voiceQuick.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => {
                        void sendVoiceMessage(q);
                      }}
                      className="rounded-full border border-[var(--odeal-border)] bg-[var(--odeal-input-bg)] px-3 py-1 text-xs text-[var(--odeal-text)] transition hover:border-[var(--odeal-primary)] hover:text-[var(--odeal-primary)] odeal-ring-focus"
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <form
                  className="mt-3 flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void sendVoiceMessage(chatInput);
                  }}
                >
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Örnek: Bu hafta en çok ne sattım?"
                    className="odeal-ring-focus flex-1 rounded-[var(--odeal-radius)] border border-[var(--odeal-border)] bg-[var(--odeal-input-bg)] px-3 py-2 text-sm text-[var(--odeal-text)] placeholder:text-[var(--odeal-text-muted)] focus:border-[var(--odeal-primary)]"
                  />
                  <button
                    type="submit"
                    disabled={chatBusy}
                    className="odeal-ring-focus rounded-[var(--odeal-radius)] bg-[var(--odeal-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--odeal-primary-hover)] disabled:opacity-45"
                  >
                    Gönder
                  </button>
                </form>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
