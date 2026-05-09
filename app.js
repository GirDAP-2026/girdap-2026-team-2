// ============= STATE =============
const APP = {
  state: {
    view: 'dashboard',
    plan: 'free',
    selectedCustomerId: null,
    paymentTab: 'overdue',
    customerSegment: 'all',
    aiHistory: [],
    aiQueriesUsed: 4,
    aiQuotaFree: 20
  },
  charts: {}
};

const PRO_ONLY_VIEWS = ['campaigns', 'whatsapp'];

// ============= ICONS =============
const I = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  invoice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>',
  campaign: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 13z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/></svg>',
  bot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>',
  arrowDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.4L19 10l-5.1 1.6L12 17l-1.9-5.4L5 10l5.1-1.6L12 3z"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
};

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Bugün', icon: I.home },
  { id: 'customers', label: 'Müşterilerim', icon: I.users },
  { id: 'payments', label: 'Tahsilat', icon: I.invoice },
  { id: 'campaigns', label: 'Kampanyalar', icon: I.campaign, pro: true },
  { id: 'whatsapp', label: 'WhatsApp', icon: I.whatsapp, pro: true },
  { id: 'ai', label: 'AI Asistan', icon: I.bot },
  { id: 'settings', label: 'Ayarlar', icon: I.settings }
];

// ============= INIT =============
document.addEventListener('DOMContentLoaded', init);

function init() {
  loadState();
  applyThemeOnLoad();
  buildSidebar();
  buildTopbarRight();
  bindGlobalEvents();
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  navigate(hash);
}

function loadState() {
  APP.state.plan = localStorage.getItem('odeal_plan') || 'free';
}

function savePlan() {
  localStorage.setItem('odeal_plan', APP.state.plan);
}

// ============= THEME =============
function applyThemeOnLoad() {
  const saved = localStorage.getItem('odeal_theme');
  const sysLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const theme = saved || (sysLight ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('odeal_theme', next);
  if (APP.state.view === 'dashboard') renderDashboard();
}

// ============= SIDEBAR =============
function buildSidebar() {
  const navHost = document.getElementById('sidebar-nav');
  if (!navHost) return;
  navHost.innerHTML = NAV_ITEMS.map(it => `
    <button class="nav-item ${it.pro && APP.state.plan === 'free' ? 'locked' : ''}" data-view="${it.id}" onclick="navigate('${it.id}')">
      <span class="nav-item-icon">${it.icon}</span>
      <span class="nav-item-text">${it.label}</span>
      ${it.pro ? `<span class="nav-item-badge ${APP.state.plan === 'free' ? 'lock' : ''}">${APP.state.plan === 'free' ? 'PRO' : 'PRO'}</span>` : ''}
    </button>
  `).join('');
  buildPlanToggle();
  updateActiveNav();
}

function buildPlanToggle() {
  const host = document.getElementById('plan-toggle-host');
  if (!host) return;
  const plan = APP.state.plan;
  host.innerHTML = `
    <div class="plan-toggle">
      <div class="plan-toggle-label">Plan görüntüle</div>
      <div class="plan-toggle-btns">
        <button class="plan-toggle-btn free ${plan==='free'?'active':''}" onclick="setPlan('free')">POS Standart</button>
        <button class="plan-toggle-btn pro ${plan==='pro'?'active':''}" onclick="setPlan('pro')">+ Pro</button>
      </div>
      <div class="plan-meta">
        ${plan === 'pro'
          ? '✨ Tüm özellikler açık · 199₺/ay'
          : 'Ödeal POS aboneliğine dahil'
        }
      </div>
    </div>
  `;
}

function setPlan(p) {
  if (APP.state.plan === p) return;
  APP.state.plan = p;
  savePlan();
  buildSidebar();
  buildTopbarRight();
  showToast(p === 'pro' ? '✨ Pro Versiyon açıldı — tüm özellikler kullanıma hazır' : 'Standart moduna geçildi', p === 'pro' ? 'success' : 'info');
  // Re-render current view
  navigate(APP.state.view);
}

function updateActiveNav() {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-view') === APP.state.view);
  });
}

// ============= TOPBAR =============
function buildTopbarRight() {
  const host = document.getElementById('topbar-right');
  if (!host) return;
  const plan = APP.state.plan;
  host.innerHTML = `
    <span class="plan-badge ${plan}">
      ${plan === 'pro' ? '✨ Pro' : '🟢 Standart'}
    </span>
    <button class="theme-toggle" onclick="toggleTheme()" aria-label="Tema değiştir" title="Tema (Açık/Koyu)">
      <span class="icon-moon">${I.moon}</span>
      <span class="icon-sun">${I.sun}</span>
    </button>
    <div class="user-pill">
      <div class="user-pill-avatar">A</div>
      <div class="user-pill-name">Ayşe Hanım</div>
    </div>
  `;
}

function setTopbarTitle(title, subtitle) {
  const t = document.getElementById('topbar-title');
  const s = document.getElementById('topbar-subtitle');
  if (t) t.textContent = title;
  if (s) s.textContent = subtitle || '';
}

// ============= GLOBAL EVENTS =============
function bindGlobalEvents() {
  // Mobile sidebar
  const menuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (menuBtn && sidebar && backdrop) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      backdrop.classList.add('open');
    });
    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('open');
    });
  }
  // Hashchange
  window.addEventListener('hashchange', () => {
    const h = window.location.hash.replace('#', '') || 'dashboard';
    if (h !== APP.state.view) navigate(h);
  });
}

// ============= NAVIGATION =============
function navigate(view) {
  APP.state.view = view;
  history.replaceState(null, '', '#' + view);
  // Close mobile sidebar after nav
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebar-backdrop')?.classList.remove('open');

  if (PRO_ONLY_VIEWS.includes(view) && APP.state.plan === 'free') {
    renderPaywall(view);
  } else {
    const renderers = {
      dashboard: renderDashboard,
      customers: renderCustomers,
      payments: renderPayments,
      campaigns: renderCampaigns,
      whatsapp: renderWhatsApp,
      ai: renderAI,
      settings: renderSettings
    };
    (renderers[view] || renderDashboard)();
  }
  updateActiveNav();
}

// ============= UTILS =============
function $view() { return document.getElementById('view-content'); }
function fmtTL(n) { return n.toLocaleString('tr-TR') + '₺'; }
function clearChart(key) {
  if (APP.charts[key]) { APP.charts[key].destroy(); delete APP.charts[key]; }
}
function getThemeChartColors() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  return {
    actual: isLight ? '#00866b' : '#00c896',
    actualBg: isLight ? 'rgba(0, 134, 107, 0.10)' : 'rgba(0, 200, 150, 0.12)',
    predicted: isLight ? '#e2541c' : '#ff6b35',
    predictedBg: isLight ? 'rgba(226, 84, 28, 0.08)' : 'rgba(255, 107, 53, 0.10)',
    text: isLight ? '#475569' : '#cbd5e1',
    muted: isLight ? '#64748b' : '#94a3b8',
    grid: isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.04)',
    tooltipBg: isLight ? 'rgba(255,255,255,0.97)' : 'rgba(10,22,40,0.95)',
    tooltipText: isLight ? '#0f172a' : '#e2e8f0',
    tooltipBody: isLight ? '#475569' : '#cbd5e1'
  };
}

function showToast(msg, variant) {
  const host = document.getElementById('toast-container');
  if (!host) return;
  const t = document.createElement('div');
  t.className = 'toast' + (variant === 'success' ? ' success' : '');
  t.innerHTML = `<span>${msg}</span>`;
  host.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(10px)'; }, 3500);
  setTimeout(() => { t.remove(); }, 4000);
}

function riskBadge(risk) {
  if (risk === 'high') return '<span class="badge badge-danger">Yüksek risk</span>';
  if (risk === 'medium') return '<span class="badge badge-warning">Orta</span>';
  return '<span class="badge badge-success">Sağlıklı</span>';
}

function healthBar(score) {
  let color = '#00c896';
  if (score < 40) color = '#ef4444';
  else if (score < 70) color = '#f59e0b';
  return `<div style="display:flex; align-items:center; gap:8px;">
    <div class="health-bar"><div class="health-bar-fill" style="background:${color}; width:${score}%"></div></div>
    <span style="font-size:13px; font-variant-numeric: tabular-nums;">${score}</span>
  </div>`;
}

// ============= VIEW: DASHBOARD =============
function renderDashboard() {
  setTopbarTitle('Bugün', `Günaydın Ayşe Hanım — ${todaysActions.length} öneriniz var`);
  clearChart('cashflow');

  const todayDelta = (todayStats.todaySales / todayStats.yesterdaySales - 1) * 100;
  const cashChange = '+12,4%';

  $view().innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-card-label">Bugünkü satış</div>
        <div class="stat-card-value">${fmtTL(todayStats.todaySales)}</div>
        <div class="stat-card-delta ${todayDelta >= 0 ? 'positive' : 'negative'}">
          ${todayDelta >= 0 ? '↑' : '↓'} ${Math.abs(todayDelta).toFixed(1)}% düne göre
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Açık tahsilat</div>
        <div class="stat-card-value">${fmtTL(todayStats.openInvoicesTotal)}</div>
        <div class="stat-card-delta negative">${todayStats.openInvoices} fatura · 3'ü gecikmiş</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Yüksek riskli müşteri</div>
        <div class="stat-card-value">${todayStats.highRiskCustomers}</div>
        <div class="stat-card-delta neutral">8 müşteriden</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Bu ayki gelir</div>
        <div class="stat-card-value">${fmtTL(todayStats.monthlyRevenue)}</div>
        <div class="stat-card-delta positive">${cashChange} geçen aya göre</div>
      </div>
    </div>

    <div class="app-grid-2">
      <!-- Bugün Ne Yapayım? -->
      <div class="app-card" style="grid-column: span 1;">
        <div class="app-card-header">
          <div>
            <div class="app-card-title">Bugün ne yapayım?</div>
            <div style="font-size: 11px; color: var(--odeal-muted); margin-top: 2px;">AI'nın bugün için 5 önerisi</div>
          </div>
          <span class="badge badge-accent">AI öncelikli</span>
        </div>
        <div class="app-card-body" style="display: flex; flex-direction: column; gap: 10px;">
          ${todaysActions.map((a, i) => `
            <div class="action-item">
              <span class="action-item-icon">${a.icon}</span>
              <div class="action-item-body">
                <div class="action-item-text">${a.text}</div>
                <button class="btn btn-sm btn-accent" onclick="handleAction(${i})">${a.action}</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Riskli Müşteriler özeti -->
      <div class="app-card">
        <div class="app-card-header">
          <div>
            <div class="app-card-title">Yüksek riskli 3 müşteri</div>
            <div style="font-size: 11px; color: var(--odeal-muted); margin-top: 2px;">30+ gündür gelmedi</div>
          </div>
          <button class="btn btn-sm btn-outline" onclick="navigate('customers')">Tümü →</button>
        </div>
        <div class="app-card-body" style="padding: 0;">
          <table class="app-table">
            <tbody>
              ${customersDetailed.filter(c => c.risk === 'high').map(c => `
                <tr onclick="openCustomer(${c.id})">
                  <td>
                    <div style="font-weight: 600;">${c.name}</div>
                    <div style="font-size: 11px; color: var(--odeal-muted);">${c.lastVisit} · ${c.segment}</div>
                  </td>
                  <td>${fmtTL(c.totalSpend)}</td>
                  <td>${healthBar(c.healthScore)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Cash flow chart -->
    <div class="app-card" style="margin-top: 14px;">
      <div class="app-card-header">
        <div>
          <div class="app-card-title">Nakit tahmini · 60 gün</div>
          <div style="font-size: 11px; color: var(--odeal-muted); margin-top: 2px;">Son 30 gün gerçekleşen + 30 gün AI tahmini</div>
        </div>
        <span class="badge badge-warning">⚠ 18 May'da açık riski</span>
      </div>
      <div class="app-card-body">
        <div style="height: 280px; position: relative;">
          <canvas id="dash-cashflow"></canvas>
        </div>
      </div>
    </div>

    <!-- AI Asistan kısayol -->
    <div class="app-card" style="margin-top: 14px;">
      <div class="app-card-header">
        <div>
          <div class="app-card-title">İşletmene sor — AI Asistan</div>
          <div style="font-size: 11px; color: var(--odeal-muted); margin-top: 2px;">${APP.state.plan === 'pro' ? 'Sınırsız sorgu' : `${APP.state.aiQueriesUsed}/${APP.state.aiQuotaFree} sorgu kullanıldı bugün`}</div>
        </div>
        <button class="btn btn-sm btn-outline" onclick="navigate('ai')">Asistan'ı aç →</button>
      </div>
      <div class="app-card-body" style="display: flex; flex-wrap: wrap; gap: 8px;">
        <button class="chat-suggestion-chip" style="flex: 0 0 auto; width: auto;" onclick="quickAsk('en-riskli')">En riskli müşterim kim?</button>
        <button class="chat-suggestion-chip" style="flex: 0 0 auto; width: auto;" onclick="quickAsk('bu-hafta')">Bu hafta ne yapmalıyım?</button>
        <button class="chat-suggestion-chip" style="flex: 0 0 auto; width: auto;" onclick="quickAsk('nakit-durumu')">Nakit durumum nasıl?</button>
        <button class="chat-suggestion-chip" style="flex: 0 0 auto; width: auto;" onclick="quickAsk('musteri-segment')">Müşterilerimi segmentlere ayır</button>
      </div>
    </div>
  `;

  // Render chart
  setTimeout(() => {
    const canvas = document.getElementById('dash-cashflow');
    if (!canvas || typeof Chart === 'undefined') return;
    const c = getThemeChartColors();
    APP.charts.cashflow = new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: cashFlow.labels,
        datasets: [
          { label: 'Gerçekleşen', data: cashFlow.actual, borderColor: c.actual, backgroundColor: c.actualBg, tension: 0.35, fill: true, pointRadius: 0, pointHoverRadius: 5, borderWidth: 2.5 },
          { label: 'AI Tahmini', data: cashFlow.predicted, borderColor: c.predicted, backgroundColor: c.predictedBg, borderDash: [6,4], tension: 0.35, fill: true, pointRadius: 0, pointHoverRadius: 5, borderWidth: 2.5 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { labels: { color: c.text, font: { family: 'Inter', size: 12 }, usePointStyle: true, padding: 16 } },
          tooltip: { backgroundColor: c.tooltipBg, titleColor: c.tooltipText, bodyColor: c.tooltipBody, borderColor: c.predicted, borderWidth: 1, padding: 12,
            callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y?.toLocaleString('tr-TR') ?? '-'}₺` }}
        },
        scales: {
          y: { ticks: { color: c.muted, font: { family: 'Inter', size: 11 }, callback: (v) => (v/1000)+'k' }, grid: { color: c.grid } },
          x: { ticks: { color: c.muted, font: { family: 'Inter', size: 11 }, maxTicksLimit: 12 }, grid: { display: false } }
        }
      }
    });
  }, 30);
}

function handleAction(i) {
  const a = todaysActions[i];
  showToast(`✓ "${a.action}" işlendi`, 'success');
}

// ============= VIEW: CUSTOMERS =============
function renderCustomers() {
  setTopbarTitle('Müşterilerim', `${customersDetailed.length} aktif müşteri`);

  const segments = [
    { id: 'all', label: 'Hepsi', count: customersDetailed.length },
    { id: 'VIP', label: 'VIP', count: customersDetailed.filter(c => c.segment === 'VIP').length },
    { id: 'Sadık', label: 'Sadık', count: customersDetailed.filter(c => c.segment === 'Sadık').length },
    { id: 'Düzenli', label: 'Düzenli', count: customersDetailed.filter(c => c.segment === 'Düzenli').length },
    { id: 'Kayıp Risk', label: 'Kayıp Risk', count: customersDetailed.filter(c => c.segment === 'Kayıp Risk').length }
  ];

  const filtered = APP.state.customerSegment === 'all'
    ? customersDetailed
    : customersDetailed.filter(c => c.segment === APP.state.customerSegment);

  $view().innerHTML = `
    <div class="segment-tabs">
      ${segments.map(s => `
        <button class="segment-tab ${APP.state.customerSegment === s.id ? 'active' : ''}" onclick="filterCustomers('${s.id}')">
          ${s.label} <span style="opacity:0.6; margin-left: 4px;">${s.count}</span>
        </button>
      `).join('')}
    </div>

    <div class="app-card">
      <table class="app-table">
        <thead>
          <tr>
            <th>İsim</th>
            <th>Segment</th>
            <th>Son ziyaret</th>
            <th>Yıllık harcama</th>
            <th>Sağlık</th>
            <th>Risk</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(c => `
            <tr onclick="openCustomer(${c.id})">
              <td>
                <div style="font-weight: 600;">${c.name}</div>
                <div style="font-size: 11px; color: var(--odeal-muted);">${c.phone}</div>
              </td>
              <td><span class="badge badge-muted">${c.segment}</span></td>
              <td style="color: var(--odeal-muted);">${c.lastVisit}</td>
              <td>${fmtTL(c.totalSpend)}</td>
              <td>${healthBar(c.healthScore)}</td>
              <td>${riskBadge(c.risk)}</td>
              <td><button class="btn btn-sm btn-outline">Detay →</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div id="customer-detail-host"></div>
  `;
}

function filterCustomers(seg) {
  APP.state.customerSegment = seg;
  renderCustomers();
}

function openCustomer(id) {
  const c = customersDetailed.find(x => x.id === id);
  if (!c) return;
  APP.state.selectedCustomerId = id;
  // Render side detail panel
  if (APP.state.view !== 'customers') navigate('customers');
  setTimeout(() => {
    const host = document.getElementById('customer-detail-host');
    if (!host) return;
    host.innerHTML = `
      <div class="app-card" style="margin-top: 14px; border-color: rgba(255,107,53,0.3);">
        <div class="app-card-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #ff6b35, #00c896); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; color: white;">${c.name.charAt(0)}</div>
            <div>
              <div class="app-card-title">${c.name}</div>
              <div style="font-size: 12px; color: var(--odeal-muted);">${c.phone} · ${c.segment} · ${c.visits} ziyaret</div>
            </div>
          </div>
          <button class="btn btn-sm btn-outline" onclick="closeCustomer()">Kapat ✕</button>
        </div>
        <div class="app-card-body">
          <div class="app-grid-3" style="margin-bottom: 16px;">
            <div class="stat-card"><div class="stat-card-label">Toplam harcama</div><div class="stat-card-value">${fmtTL(c.totalSpend)}</div></div>
            <div class="stat-card"><div class="stat-card-label">Ortalama sepet</div><div class="stat-card-value">${fmtTL(c.avgBasket)}</div></div>
            <div class="stat-card"><div class="stat-card-label">Sağlık skoru</div><div class="stat-card-value" style="display: flex; align-items: center; gap: 8px;">${c.healthScore} ${riskBadge(c.risk)}</div></div>
          </div>

          <div style="margin-bottom: 18px;">
            <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: var(--odeal-muted); margin-bottom: 10px;">AI içgörüleri</div>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
              ${c.insights.map(i => `<li style="display: flex; align-items: flex-start; gap: 8px; font-size: 13.5px;"><span style="color: var(--odeal-accent); flex-shrink: 0;">●</span> ${i}</li>`).join('')}
            </ul>
          </div>

          <div style="padding: 14px; background: rgba(255,107,53,0.08); border: 1px solid rgba(255,107,53,0.2); border-radius: 12px;">
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--odeal-accent); font-weight: 600; margin-bottom: 6px;">💡 AI önerisi</div>
            <div style="font-size: 14px; line-height: 1.5; margin-bottom: 12px;">${c.suggestion}</div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="btn btn-sm btn-accent" onclick="actionApplySuggestion('${c.name}')">Uygula</button>
              <button class="btn btn-sm btn-outline">Şimdi değil</button>
            </div>
          </div>
        </div>
      </div>
    `;
    host.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 30);
}

function closeCustomer() {
  APP.state.selectedCustomerId = null;
  const host = document.getElementById('customer-detail-host');
  if (host) host.innerHTML = '';
}

function actionApplySuggestion(name) {
  showToast(`✓ ${name} için AI önerisi uygulandı`, 'success');
}

// ============= VIEW: PAYMENTS =============
function renderPayments() {
  setTopbarTitle('Tahsilat', '3 gecikmiş · 5 yaklaşan · ₺16.350 açık');

  const tab = APP.state.paymentTab;
  const filtered = invoices.filter(i => i.status === tab);
  const tabConfig = {
    overdue: { label: 'Gecikmiş', count: invoices.filter(i => i.status === 'overdue').length },
    upcoming: { label: 'Yaklaşan', count: invoices.filter(i => i.status === 'upcoming').length },
    paid: { label: 'Tamamlanmış', count: invoices.filter(i => i.status === 'paid').length }
  };

  const isPro = APP.state.plan === 'pro';

  $view().innerHTML = `
    ${!isPro ? `
    <div class="app-card" style="margin-bottom: 14px; background: linear-gradient(90deg, rgba(255,107,53,0.06), transparent); border-color: rgba(255,107,53,0.25);">
      <div class="app-card-body" style="display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
        <div>
          <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">⚡ Otomatik tahsilat takibi</div>
          <div style="font-size: 12.5px; color: var(--odeal-muted);">Pro'da AI gecikmiş ödemeleri otomatik WhatsApp ile takip eder, tek tek mesaj yazmana gerek kalmaz.</div>
        </div>
        <button class="btn btn-accent" onclick="setPlan('pro')">Pro'ya Geç →</button>
      </div>
    </div>
    ` : `
    <div class="app-card" style="margin-bottom: 14px;">
      <div class="app-card-body" style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 24px;">⚡</span>
          <div>
            <div style="font-weight: 600;">Otomatik WhatsApp tahsilat takibi</div>
            <div style="font-size: 12px; color: var(--odeal-muted);">3 gecikmiş ödeme için hatırlatma sırada</div>
          </div>
        </div>
        <label style="position: relative; display: inline-block; width: 48px; height: 26px;">
          <input type="checkbox" checked style="opacity:0; width:0; height:0;">
          <span style="position:absolute; cursor:pointer; inset:0; background:var(--odeal-accent); border-radius:999px;"></span>
          <span style="position:absolute; left:23px; top:3px; width:20px; height:20px; background:white; border-radius:50%; transition:.2s;"></span>
        </label>
      </div>
    </div>
    `}

    <div class="segment-tabs">
      ${['overdue', 'upcoming', 'paid'].map(t => `
        <button class="segment-tab ${tab === t ? 'active' : ''}" onclick="setPaymentTab('${t}')">
          ${tabConfig[t].label} <span style="opacity: 0.6; margin-left: 4px;">${tabConfig[t].count}</span>
        </button>
      `).join('')}
    </div>

    <div class="app-card">
      <table class="app-table">
        <thead>
          <tr>
            <th>Fatura</th>
            <th>Müşteri</th>
            <th>Tutar</th>
            <th>${tab === 'paid' ? 'Ödendi' : 'Vade'}</th>
            <th>Durum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(inv => `
            <tr>
              <td style="font-family: monospace; font-size: 12.5px;">${inv.id}</td>
              <td><div style="font-weight: 600;">${inv.customer}</div></td>
              <td>${fmtTL(inv.amount)}</td>
              <td>${tab === 'paid' ? inv.paidOn : inv.due}</td>
              <td>
                ${inv.status === 'overdue' ? `<span class="badge badge-danger">${inv.daysOverdue} gün gecikmiş</span>` : ''}
                ${inv.status === 'upcoming' ? `<span class="badge badge-info">${inv.daysUntilDue} gün kaldı</span>` : ''}
                ${inv.status === 'paid' ? `<span class="badge badge-success">Ödendi</span>` : ''}
              </td>
              <td>
                ${inv.status === 'overdue' ? `<button class="btn btn-sm btn-accent" onclick="sendReminder('${inv.customer}')">WhatsApp ile hatırlat</button>` : ''}
                ${inv.status === 'upcoming' ? `<button class="btn btn-sm btn-outline">Görüntüle</button>` : ''}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    ${tab === 'overdue' && messageDrafts['Mehmet Tan'] ? `
      <div class="app-card" style="margin-top: 14px;">
        <div class="app-card-header">
          <div>
            <div class="app-card-title">📨 AI'nın hazırladığı hatırlatma mesajı (Mehmet Tan)</div>
            <div style="font-size: 11px; color: var(--odeal-muted); margin-top: 2px;">Ton: ${messageDrafts['Mehmet Tan'].tone} · Onayınla gönderilir</div>
          </div>
        </div>
        <div class="app-card-body">
          <div style="background: rgba(0,200,150,0.06); border: 1px solid rgba(0,200,150,0.15); padding: 14px; border-radius: 12px; white-space: pre-line; font-size: 13.5px; line-height: 1.6;">${messageDrafts['Mehmet Tan'].text}</div>
          <div style="display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap;">
            <button class="btn btn-sm btn-success" onclick="sendReminder('Mehmet Tan')">${I.check} Onayla & Gönder</button>
            <button class="btn btn-sm btn-outline">Düzenle</button>
            <button class="btn btn-sm btn-outline">Tonu yumuşat</button>
          </div>
        </div>
      </div>
    ` : ''}
  `;
}

function setPaymentTab(t) {
  APP.state.paymentTab = t;
  renderPayments();
}

function sendReminder(name) {
  showToast(`✓ ${name}'a WhatsApp hatırlatma gönderildi`, 'success');
}

// ============= VIEW: CAMPAIGNS (Pro) =============
function renderCampaigns() {
  setTopbarTitle('Kampanyalar', '2 aktif · 1 zamanlanmış · son 30 günde ₺13.000 ek gelir');
  $view().innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-card-label">Aktif kampanya</div><div class="stat-card-value">2</div><div class="stat-card-delta positive">35 mesaj gönderildi</div></div>
      <div class="stat-card"><div class="stat-card-label">Açılma oranı</div><div class="stat-card-value">85,7%</div><div class="stat-card-delta positive">↑ 12% sektör ort.</div></div>
      <div class="stat-card"><div class="stat-card-label">Dönüşüm</div><div class="stat-card-value">45,7%</div><div class="stat-card-delta positive">16 satışa dönüştü</div></div>
      <div class="stat-card"><div class="stat-card-label">Ek gelir</div><div class="stat-card-value">${fmtTL(13000)}</div><div class="stat-card-delta neutral">Son 30 gün</div></div>
    </div>

    <div class="app-card">
      <div class="app-card-header">
        <div class="app-card-title">Kampanyalarım</div>
        <button class="btn btn-sm btn-accent">+ Yeni Kampanya</button>
      </div>
      <div class="app-card-body" style="padding: 0;">
        <table class="app-table">
          <thead>
            <tr>
              <th>Kampanya</th>
              <th>Hedef Segment</th>
              <th>Durum</th>
              <th>Mesaj</th>
              <th>Açıldı</th>
              <th>Dönüşüm</th>
              <th>Gelir</th>
            </tr>
          </thead>
          <tbody>
            ${campaigns.map(c => `
              <tr>
                <td>
                  <div style="font-weight: 600;">${c.name}</div>
                  <div style="font-size: 11px; color: var(--odeal-muted);">${c.startedAt || c.scheduled} · ${c.type}</div>
                </td>
                <td><span class="badge badge-muted">${c.targetSegment}</span></td>
                <td>${c.status === 'active' ? '<span class="badge badge-success">● Aktif</span>' : '<span class="badge badge-info">⏰ Zamanlandı</span>'}</td>
                <td>${c.sent || c.estimatedReach} ${c.sent ? '✓' : '~'}</td>
                <td>${c.opened || '-'}</td>
                <td>${c.converted || '-'}</td>
                <td>${fmtTL(c.revenue || c.expectedRevenue)} ${c.revenue ? '' : '<span style="font-size:10px; color:var(--odeal-muted);">tahmini</span>'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="app-card" style="margin-top: 14px;">
      <div class="app-card-header">
        <div class="app-card-title">Şablonlar — tek tıkla başlat</div>
      </div>
      <div class="app-card-body">
        <div class="app-grid-3">
          ${campaignTemplates.map(t => `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px;">
              <div style="font-size: 22px; margin-bottom: 8px;">${t.icon}</div>
              <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${t.name}</div>
              <div style="font-size: 12px; color: var(--odeal-muted); line-height: 1.5; margin-bottom: 12px;">${t.desc}</div>
              <button class="btn btn-sm btn-outline" onclick="showToast('Şablon yüklendi: ${t.name}','success')">Kullan →</button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ============= VIEW: WHATSAPP (Pro) =============
function renderWhatsApp() {
  setTopbarTitle('WhatsApp Otomasyon', `${whatsappQueue.length} bekleyen · ${whatsappHistory.length} gönderildi`);
  $view().innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-card-label">Onay bekleyen</div><div class="stat-card-value">${whatsappQueue.length}</div></div>
      <div class="stat-card"><div class="stat-card-label">Bu hafta gönderilen</div><div class="stat-card-value">${whatsappHistory.length + 18}</div></div>
      <div class="stat-card"><div class="stat-card-label">Açılma</div><div class="stat-card-value">87%</div><div class="stat-card-delta positive">↑ Sektör ort. üstü</div></div>
      <div class="stat-card"><div class="stat-card-label">Geri dönüş</div><div class="stat-card-value">${fmtTL(1230)}</div><div class="stat-card-delta neutral">Son 7 gün</div></div>
    </div>

    <div class="app-card">
      <div class="app-card-header">
        <div class="app-card-title">📥 Onay bekleyen mesajlar</div>
        <button class="btn btn-sm btn-success">Hepsini onayla</button>
      </div>
      <div class="app-card-body" style="padding: 0;">
        <table class="app-table">
          <thead>
            <tr><th>Müşteri</th><th>Tip</th><th>Önizleme</th><th>Zamanlandı</th><th>Aksiyon</th></tr>
          </thead>
          <tbody>
            ${whatsappQueue.map(m => `
              <tr>
                <td><div style="font-weight: 600;">${m.customer}</div></td>
                <td><span class="badge badge-info">${m.type}</span></td>
                <td style="font-size: 12.5px; color: var(--odeal-muted); max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${m.preview}</td>
                <td><span class="badge badge-muted">${m.scheduledFor}</span></td>
                <td style="display: flex; gap: 4px;">
                  <button class="btn btn-sm btn-success" onclick="showToast('✓ Mesaj gönderildi','success')">Onayla</button>
                  <button class="btn btn-sm btn-outline">Düzenle</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="app-card" style="margin-top: 14px;">
      <div class="app-card-header">
        <div class="app-card-title">📤 Geçmiş — son gönderilenler</div>
      </div>
      <div class="app-card-body" style="padding: 0;">
        <table class="app-table">
          <thead>
            <tr><th>Müşteri</th><th>Tip</th><th>Durum</th><th>Gönderildi</th><th>Geri dönüş</th></tr>
          </thead>
          <tbody>
            ${whatsappHistory.map(m => `
              <tr>
                <td><div style="font-weight: 600;">${m.customer}</div></td>
                <td><span class="badge badge-muted">${m.type}</span></td>
                <td><span class="badge ${m.status.includes('Tıklandı') ? 'badge-success' : m.status.includes('Açıldı') ? 'badge-info' : 'badge-muted'}">${m.status}</span></td>
                <td style="color: var(--odeal-muted); font-size: 12.5px;">${m.sentAt}</td>
                <td>${m.revenue ? `<strong>${fmtTL(m.revenue)}</strong>` : '<span style="color:var(--odeal-muted);">-</span>'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ============= VIEW: AI ASİSTAN =============
function renderAI() {
  setTopbarTitle('AI Asistan', APP.state.plan === 'pro' ? 'Sınırsız sorgu — Pro' : `${APP.state.aiQueriesUsed}/${APP.state.aiQuotaFree} sorgu kullanıldı`);

  const messages = APP.state.aiHistory.length > 0 ? APP.state.aiHistory : [
    { role: 'ai', text: `Günaydın Ayşe Hanım! 👋<br><br>Bugün için <strong>${todaysActions.length} öncelikli aksiyon</strong> hazırladım. Sorularını sorabilir, yan paneldeki örnek soruları tıklayabilirsin.` }
  ];

  const suggestions = [
    { key: 'en-riskli', label: 'En riskli müşterim kim?' },
    { key: 'bu-hafta', label: 'Bu hafta ne yapmalıyım?' },
    { key: 'nakit-durumu', label: 'Nakit durumum nasıl?' },
    { key: 'musteri-segment', label: 'Müşterilerimi segmentlere ayır' },
    { key: 'ne-satayim', label: 'Bu hafta ne satmalıyım?' },
    { key: 'rekabetcilik', label: 'Rakiplerime göre nasılım?' }
  ];

  const remaining = APP.state.aiQuotaFree - APP.state.aiQueriesUsed;
  const isPro = APP.state.plan === 'pro';

  $view().innerHTML = `
    <div class="chat-grid">
      <div class="chat-window">
        <div class="chat-messages" id="chat-messages">
          ${messages.map(m => `
            <div class="chat-msg ${m.role}">${m.text}</div>
          `).join('')}
        </div>
        <div class="chat-input-row">
          <input type="text" class="chat-input" id="chat-input" placeholder="Bir soru yaz..." onkeydown="if(event.key==='Enter') sendChat();">
          <button class="btn btn-accent" onclick="sendChat()">${I.send}</button>
        </div>
      </div>
      <div class="chat-suggestions-panel">
        ${isPro
          ? '<div class="chat-quota">✨ Pro · Sınırsız sorgu</div>'
          : `<div class="chat-quota ${remaining < 5 ? 'warn' : ''}">${remaining} sorgu kaldı bugün · <a href="javascript:setPlan('pro')" style="color:inherit; text-decoration:underline;">Pro'ya geç</a></div>`
        }
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--odeal-muted); margin-bottom: 10px; font-weight: 600;">Önerilen sorular</div>
        ${suggestions.map(s => `
          <button class="chat-suggestion-chip" onclick="quickAsk('${s.key}')">${s.label}</button>
        `).join('')}
        <div style="margin-top: 18px; padding: 12px; background: rgba(255,255,255,0.02); border-radius: 10px; font-size: 11.5px; color: var(--odeal-muted); line-height: 1.5;">
          💡 AI, son 90 günlük POS verini, müşteri iletişimlerini ve dış etkenleri analiz ederek cevap verir.
        </div>
      </div>
    </div>
  `;
}

function quickAsk(key) {
  const labels = {
    'en-riskli': 'En riskli müşterim kim?',
    'bu-hafta': 'Bu hafta ne yapmalıyım?',
    'nakit-durumu': 'Nakit durumum nasıl?',
    'musteri-segment': 'Müşterilerimi segmentlere ayır',
    'ne-satayim': 'Bu hafta ne satmalıyım?',
    'rekabetcilik': 'Rakiplerime göre nasılım?'
  };
  if (APP.state.view !== 'ai') {
    APP.state.aiHistory.push({ role: 'user', text: labels[key] });
    const response = aiExtendedResponses[key] || 'AI yanıt hazırlanıyor...';
    APP.state.aiHistory.push({ role: 'ai', text: response });
    APP.state.aiQueriesUsed++;
    navigate('ai');
    return;
  }
  APP.state.aiHistory.push({ role: 'user', text: labels[key] });
  const response = aiExtendedResponses[key] || 'AI yanıt hazırlanıyor...';
  APP.state.aiHistory.push({ role: 'ai', text: response });
  APP.state.aiQueriesUsed++;
  renderAI();
  setTimeout(() => {
    const m = document.getElementById('chat-messages');
    if (m) m.scrollTop = m.scrollHeight;
  }, 50);
}

function sendChat() {
  const input = document.getElementById('chat-input');
  if (!input || !input.value.trim()) return;
  const text = input.value.trim();
  APP.state.aiHistory.push({ role: 'user', text: text });
  // Mock AI response
  const mockResponse = `Anlıyorum, "<em>${text}</em>" sorunuzla ilgili POS verinizi analiz ediyorum...<br><br>Bu konuda detaylı bir cevap için yan paneldeki <strong>önerilen sorulardan</strong> birini deneyebilirsiniz.`;
  APP.state.aiHistory.push({ role: 'ai', text: mockResponse });
  APP.state.aiQueriesUsed++;
  input.value = '';
  renderAI();
  setTimeout(() => {
    const m = document.getElementById('chat-messages');
    if (m) m.scrollTop = m.scrollHeight;
  }, 50);
}

// ============= VIEW: SETTINGS =============
function renderSettings() {
  setTopbarTitle('Ayarlar', business.name);
  const isPro = APP.state.plan === 'pro';
  $view().innerHTML = `
    <div class="app-grid-2">
      <div class="app-card">
        <div class="app-card-header"><div class="app-card-title">İşletme Bilgileri</div></div>
        <div class="app-card-body">
          <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 18px;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #ff6b35, #00c896); display: flex; align-items: center; justify-content: center; font-size: 28px;">👩</div>
            <div>
              <div style="font-size: 18px; font-weight: 700;">${business.name}</div>
              <div style="font-size: 12.5px; color: var(--odeal-muted);">${business.location}</div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04);">
              <span style="color: var(--odeal-muted); font-size: 13px;">Sahip</span>
              <strong>${business.ownerName}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04);">
              <span style="color: var(--odeal-muted); font-size: 13px;">POS Seri No</span>
              <strong style="font-family: monospace;">${business.posSerial}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04);">
              <span style="color: var(--odeal-muted); font-size: 13px;">Aktif olduğun tarih</span>
              <strong>${business.activeSince}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0;">
              <span style="color: var(--odeal-muted); font-size: 13px;">Çalışan sayısı</span>
              <strong>${business.staffCount}</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="app-card" style="border-color: ${isPro ? 'rgba(255,107,53,0.4)' : 'rgba(0,200,150,0.4)'};">
        <div class="app-card-header">
          <div class="app-card-title">Mevcut Plan</div>
          <span class="plan-badge ${APP.state.plan}">${isPro ? '✨ Pro' : '🟢 Standart'}</span>
        </div>
        <div class="app-card-body">
          <div style="margin-bottom: 14px;">
            <div style="font-size: 22px; font-weight: 700; margin-bottom: 4px;">${isPro ? 'POS + Pro Versiyon' : 'Ödeal POS Standart'}</div>
            <div style="font-size: 12.5px; color: var(--odeal-muted);">${isPro ? 'POS aboneliğine ek 199₺/ay' : 'POS aboneliğine dahil — ek ücret yok'}</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px;">
            <div style="display: flex; align-items: center; gap: 10px; font-size: 13.5px;"><span class="paywall-feature-icon">✓</span> "Bugün ne yapayım?" paneli</div>
            <div style="display: flex; align-items: center; gap: 10px; font-size: 13.5px;"><span class="paywall-feature-icon">✓</span> Müşteri Sağlık Skoru</div>
            <div style="display: flex; align-items: center; gap: 10px; font-size: 13.5px;"><span class="paywall-feature-icon">✓</span> Nakit akışı tahmini</div>
            <div style="display: flex; align-items: center; gap: 10px; font-size: 13.5px; ${!isPro ? 'opacity:0.5;' : ''}"><span class="paywall-feature-icon" style="${!isPro ? 'background: rgba(255,255,255,0.06); color:var(--odeal-muted);' : ''}">${isPro ? '✓' : '✗'}</span> Otomatik WhatsApp tahsilat</div>
            <div style="display: flex; align-items: center; gap: 10px; font-size: 13.5px; ${!isPro ? 'opacity:0.5;' : ''}"><span class="paywall-feature-icon" style="${!isPro ? 'background: rgba(255,255,255,0.06); color:var(--odeal-muted);' : ''}">${isPro ? '✓' : '✗'}</span> Sınırsız AI sorgu</div>
            <div style="display: flex; align-items: center; gap: 10px; font-size: 13.5px; ${!isPro ? 'opacity:0.5;' : ''}"><span class="paywall-feature-icon" style="${!isPro ? 'background: rgba(255,255,255,0.06); color:var(--odeal-muted);' : ''}">${isPro ? '✓' : '✗'}</span> Kampanya motoru</div>
          </div>

          ${isPro
            ? `<button class="btn btn-outline" onclick="setPlan('free')" style="width: 100%;">Standart'a geri dön</button>`
            : `<button class="btn btn-accent" onclick="setPlan('pro')" style="width: 100%;">${I.sparkle} Pro Versiyona geç (+199₺/ay)</button>`
          }
        </div>
      </div>
    </div>

    <div class="app-card" style="margin-top: 14px;">
      <div class="app-card-header"><div class="app-card-title">Bildirimler</div></div>
      <div class="app-card-body" style="display: flex; flex-direction: column; gap: 12px;">
        ${[
          ['Sabah brifingi', 'Her sabah 09:00\'da gün özetimi WhatsApp\'a gönder', true],
          ['Yüksek riskli müşteri uyarısı', 'Bir müşteri yüksek riske geçtiğinde anında bildir', true],
          ['Geciken ödeme uyarısı', 'Ödeme vadesi 3 gün geçince bildir', true],
          ['Haftalık özet raporu', 'Pazartesi sabahı haftalık özeti gönder', false]
        ].map(([title, desc, on]) => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: rgba(255,255,255,0.02); border-radius: 10px;">
            <div>
              <div style="font-weight: 600; font-size: 13.5px;">${title}</div>
              <div style="font-size: 11.5px; color: var(--odeal-muted); margin-top: 2px;">${desc}</div>
            </div>
            <div style="width: 40px; height: 22px; background: ${on ? 'var(--odeal-accent)' : 'rgba(255,255,255,0.1)'}; border-radius: 999px; position: relative; cursor: pointer;">
              <div style="position: absolute; top: 3px; left: ${on ? '21px' : '3px'}; width: 16px; height: 16px; background: white; border-radius: 50%; transition: 0.2s;"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="app-card" style="margin-top: 14px;">
      <div class="app-card-header"><div class="app-card-title">Bağlantı</div></div>
      <div class="app-card-body">
        <a href="index.html" class="btn btn-outline" style="text-decoration: none;">${I.back} Tanıtım sayfasına dön</a>
      </div>
    </div>
  `;
}

// ============= PAYWALL =============
function renderPaywall(view) {
  setTopbarTitle(view === 'campaigns' ? 'Kampanyalar' : 'WhatsApp Otomasyon', 'Bu özellik Pro Versiyonda gelir');
  const config = {
    campaigns: {
      icon: '🎯',
      title: 'Kampanya motoru',
      text: 'AI, müşteri segmentlerini analiz eder ve hedefli kampanyaları senin için hazırlar. Tek tıkla başlat — AI kimi, ne zaman ve hangi mesajla bulacağını planlar.',
      features: [
        '6 hazır şablon (Kayıp Müşteri, Doğum Günü, VIP Sadakat, vb.)',
        'Otomatik segment hedefleme — kimi neden seçtiği görünür',
        'Performans takibi: açılma, dönüşüm, gelir',
        'A/B test için 2 mesaj versiyonu denemesi',
        'WhatsApp + SMS + e-posta kanal seçimi'
      ]
    },
    whatsapp: {
      icon: '💬',
      title: 'Otomatik WhatsApp takibi',
      text: 'Geciken ödemeleri AI hatırlatır, yeni müşterilere hoş geldin mesajı yollar, kayıp müşterileri geri kazanır. Sen sadece onaylarsın.',
      features: [
        'Tahsilat hatırlatma serisi (3 aşamalı, yumuşak ton)',
        'Kişiselleştirilmiş mesaj — her müşteriye farklı',
        'Gönderim onaylı: AI yazar, sen okur onaylarsın',
        'Açılma + tıklama + dönüş takibi',
        'WhatsApp Business API üzerinden meşru gönderim'
      ]
    }
  };
  const c = config[view];
  $view().innerHTML = `
    <div class="paywall">
      <div class="paywall-icon">${c.icon}</div>
      <div class="paywall-title">${c.title}</div>
      <div class="paywall-text">${c.text}</div>
      <div class="paywall-features">
        ${c.features.map(f => `<div class="paywall-feature"><span class="paywall-feature-icon">✓</span> ${f}</div>`).join('')}
      </div>
      <div class="paywall-price">
        <span class="paywall-price-value">+199₺</span>
        <span class="paywall-price-period">/ay · POS aboneliğinin üstüne</span>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
        <button class="btn btn-accent" onclick="setPlan('pro')">${I.sparkle} Pro'yu hemen aç</button>
        <button class="btn btn-outline" onclick="navigate('settings')">Plan detaylarını gör</button>
      </div>
      <div style="margin-top: 24px; font-size: 11.5px; color: var(--odeal-muted);">
        🔒 Demo modu: Pro'ya geç butonuyla simülasyon olarak özelliği açabilirsin
      </div>
    </div>
  `;
}
