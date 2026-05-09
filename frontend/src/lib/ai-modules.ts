export type ModuleKey = "insight" | "cashflow" | "retention" | "campaign" | "voice";

export const AI_MODULES: { key: ModuleKey; title: string; blurb: string }[] = [
  { key: "insight", title: "AI Insight", blurb: "Trend ve öncelikli aksiyonlar" },
  { key: "cashflow", title: "Nakit Akışı", blurb: "Risk ve 7 günlük görünüm" },
  { key: "retention", title: "Retention", blurb: "Pasif müşteri geri kazanma" },
  { key: "campaign", title: "Kampanya", blurb: "Akıllı kampanya önerileri" },
  { key: "voice", title: "Voice Copilot", blurb: "Sohbet tarzı asistan" },
];

export const DEFAULT_AI_MODULE: ModuleKey = "insight";

const MODULE_KEYS = new Set<ModuleKey>(AI_MODULES.map((m) => m.key));

export function isModuleKey(value: string): value is ModuleKey {
  return MODULE_KEYS.has(value as ModuleKey);
}

export function copilotModulePath(key: ModuleKey): string {
  return `/copilot/${key}`;
}
