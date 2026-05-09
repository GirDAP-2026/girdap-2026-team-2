// Render today's actions
function renderTodaysActions() {
  const container = document.getElementById('todays-actions');
  if (!container) return;
  container.innerHTML = todaysActions.map(action => `
    <div class="flex items-start gap-3 p-3 rounded-lg fade-in" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);">
      <span class="text-base flex-shrink-0 mt-0.5">${action.icon}</span>
      <div class="flex-1 min-w-0">
        <p class="text-sm leading-snug" style="color: var(--odeal-text);">${action.text}</p>
        <button class="btn-tiny mt-2">${action.action} →</button>
      </div>
    </div>
  `).join('');
}

// Render customers table
function renderCustomers() {
  const tbody = document.getElementById('customers-tbody');
  if (!tbody) return;
  tbody.innerHTML = customers.map(c => {
    const riskLabel = c.risk === 'high' ? 'Yüksek' : c.risk === 'medium' ? 'Orta' : 'Düşük';
    const riskColor = c.risk === 'high' ? '#f87171' : c.risk === 'medium' ? '#fbbf24' : '#00c896';
    const scoreBg = c.healthScore < 40 ? '#ef4444' : c.healthScore < 70 ? '#f59e0b' : '#00c896';
    return `
      <tr>
        <td style="font-weight: 500;">${c.name}</td>
        <td class="muted">${c.lastVisit}</td>
        <td>${c.totalSpend.toLocaleString('tr-TR')}₺</td>
        <td>
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:60px; background: rgba(255,255,255,0.08); border-radius: 999px; height: 6px; overflow: hidden;">
              <div style="background:${scoreBg}; height: 6px; width: ${c.healthScore}%; border-radius: 999px;"></div>
            </div>
            <span style="font-size:13px;">${c.healthScore}</span>
          </div>
        </td>
        <td style="color:${riskColor}; font-weight: 600; font-size: 13px;">${riskLabel}</td>
      </tr>
    `;
  }).join('');
}

// Cash flow chart
function renderChart() {
  const canvas = document.getElementById('cashflow-chart');
  if (!canvas || typeof Chart === 'undefined') return;
  new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: cashFlow.labels,
      datasets: [
        {
          label: 'Gerçekleşen',
          data: cashFlow.actual,
          borderColor: '#00c896',
          backgroundColor: 'rgba(0, 200, 150, 0.12)',
          tension: 0.35,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 5,
          borderWidth: 2.5,
          spanGaps: false
        },
        {
          label: 'AI Tahmini',
          data: cashFlow.predicted,
          borderColor: '#ff6b35',
          backgroundColor: 'rgba(255, 107, 53, 0.10)',
          borderDash: [6, 4],
          tension: 0.35,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 5,
          borderWidth: 2.5,
          spanGaps: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: { color: '#cbd5e1', font: { family: 'Inter', size: 12 }, usePointStyle: true, padding: 16 }
        },
        tooltip: {
          backgroundColor: 'rgba(10, 22, 40, 0.95)',
          titleColor: '#e2e8f0',
          bodyColor: '#cbd5e1',
          borderColor: 'rgba(255,107,53,0.3)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y?.toLocaleString('tr-TR') ?? '-'}₺`
          }
        }
      },
      scales: {
        y: {
          ticks: {
            color: '#94a3b8',
            font: { family: 'Inter', size: 11 },
            callback: (v) => (v / 1000) + 'k'
          },
          grid: { color: 'rgba(255,255,255,0.04)' }
        },
        x: {
          ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, maxTicksLimit: 10 },
          grid: { display: false }
        }
      }
    }
  });
}

// Chat
function askChat(key) {
  const response = chatResponses[key];
  if (!response) return;
  const container = document.getElementById('chat-response');
  if (!container) return;
  container.innerHTML = `
    <div class="fade-in" style="padding: 20px; background: rgba(255,255,255,0.03); border-left: 3px solid var(--odeal-accent); border-radius: 0 12px 12px 0; line-height: 1.7; font-size: 14px;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom: 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: var(--odeal-accent); font-weight: 600;">
        <span class="pulse-dot"></span> AI Cevaplıyor
      </div>
      ${response}
    </div>
  `;
}

// Mobile menu toggle
function setupMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => menu.classList.add('hidden'))
  );
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderTodaysActions();
  renderCustomers();
  renderChart();
  setupMobileMenu();
});
