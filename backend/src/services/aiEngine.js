import { companies, defaultCompanyId, resolveCompanyId } from "../data/companiesCatalog.js";
import { getCompanyPayload } from "../data/mockDataByCompany.js";

function findCompanyMeta(companyId) {
  return companies.find((c) => c.id === companyId) ?? companies[0];
}

export function getCompaniesList() {
  return {
    defaultCompanyId,
    companies: companies.map((c) => ({
      id: c.id,
      name: c.name,
      category: c.category,
      tagline: c.tagline,
    })),
  };
}

export function getInsightPanel(companyIdRaw) {
  const companyId = resolveCompanyId(companyIdRaw);
  const meta = findCompanyMeta(companyId);
  const data = getCompanyPayload(companyId, meta);
  return {
    module: "insight",
    company: { id: meta.id, name: meta.name, category: meta.category },
    ...data.insight,
  };
}

export function getCashflowModule(companyIdRaw) {
  const companyId = resolveCompanyId(companyIdRaw);
  const meta = findCompanyMeta(companyId);
  const data = getCompanyPayload(companyId, meta);
  return {
    module: "cashflow",
    company: { id: meta.id, name: meta.name, category: meta.category },
    ...data.cashflow,
  };
}

export function getRetentionModule(companyIdRaw) {
  const companyId = resolveCompanyId(companyIdRaw);
  const meta = findCompanyMeta(companyId);
  const data = getCompanyPayload(companyId, meta);
  return {
    module: "retention",
    company: { id: meta.id, name: meta.name, category: meta.category },
    ...data.retention,
  };
}

export function getCampaignModule(companyIdRaw) {
  const companyId = resolveCompanyId(companyIdRaw);
  const meta = findCompanyMeta(companyId);
  const data = getCompanyPayload(companyId, meta);
  return {
    module: "campaign",
    company: { id: meta.id, name: meta.name, category: meta.category },
    generatedAt: new Date().toISOString(),
    campaigns: data.campaign.campaigns,
  };
}

export function getVoiceBootstrap(companyIdRaw) {
  const companyId = resolveCompanyId(companyIdRaw);
  const meta = findCompanyMeta(companyId);
  const data = getCompanyPayload(companyId, meta);
  return {
    module: "voice",
    company: { id: meta.id, name: meta.name, category: meta.category },
    quickQuestions: data.voice.quickQuestions,
  };
}

export function getVoiceAnswer(companyIdRaw, question) {
  const companyId = resolveCompanyId(companyIdRaw);
  const meta = findCompanyMeta(companyId);
  const data = getCompanyPayload(companyId, meta);
  const answer =
    data.voice.answers[question] ??
    "Bu soru icin hazir demo cevabi yok. Hizli sorulardan birini secin veya soruyu yeniden ifade edin.";

  return {
    module: "voice",
    company: { id: meta.id, name: meta.name, category: meta.category },
    question,
    answer,
    quickQuestions: data.voice.quickQuestions,
  };
}
