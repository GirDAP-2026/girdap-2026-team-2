// ============= SEKTÖR BİLGİSİ =============
const SECTORS = {
  butik:    { icon: '👗', label: 'Butik',           weatherImpact: { yağmurlu: -10, güneşli: 5,  soğuk: 15,  sıcak: -10 }, impactNote: 'Yağmurda yaya trafiği düşer; sezon değişiminde alışveriş artar' },
  inşaat:   { icon: '🏗️', label: 'İnşaat',          weatherImpact: { yağmurlu: -30, güneşli: 5,  soğuk: -10, sıcak: 0  },  impactNote: 'Yağmurda saha durur; soğukta beton dökümü zorlaşır' },
  kozmetik: { icon: '💄', label: 'Kozmetik',        weatherImpact: { yağmurlu: -5,  güneşli: 10, soğuk: 10,  sıcak: 0   }, impactNote: 'Mağaza içi, hava az etkili; özel günlerde pik' },
  gıda:     { icon: '🛒', label: 'Gıda',            weatherImpact: { yağmurlu: 5,   güneşli: 0,  soğuk: 10,  sıcak: -5  }, impactNote: 'Yağmurda yakın market tercihi; soğukta sıcak ürün artar' },
  tekstil:  { icon: '🧵', label: 'Tekstil',         weatherImpact: { yağmurlu: 0,   güneşli: -5, soğuk: 15,  sıcak: -10 }, impactNote: 'Sezon değişimleri ve kumaş trendleri ile değişken' },
  bilişim:  { icon: '💻', label: 'Bilişim',         weatherImpact: { yağmurlu: 5,   güneşli: -5, soğuk: 0,   sıcak: -5  }, impactNote: 'Online ağırlıklı, hava etkisi düşük' },
  bowling:  { icon: '🎳', label: 'Bowling Salonu',  weatherImpact: { yağmurlu: 20,  güneşli: -5, soğuk: 5,   sıcak: -10 }, impactNote: 'Kapalı mekan — yağmurda alternatif eğlence olarak tercih edilir' },
  halısaha: { icon: '⚽', label: 'Halısaha',        weatherImpact: { yağmurlu: -60, güneşli: 10, soğuk: -20, sıcak: -10 }, impactNote: 'Açık alan — hava şartlarına aşırı duyarlı' },
  lunapark: { icon: '🎡', label: 'Lunapark',        weatherImpact: { yağmurlu: -55, güneşli: 25, soğuk: -30, sıcak: 5   }, impactNote: 'Açık alan, hafta sonu ve tatil pikleri' },
  pastane:  { icon: '🥧', label: 'Pastane',         weatherImpact: { yağmurlu: 15,  güneşli: -5, soğuk: 25,  sıcak: -15 }, impactNote: 'Soğukta tatlı tüketimi artar; yaz sıcağında düşer' },
  kafe:     { icon: '☕', label: 'Kafe',            weatherImpact: { yağmurlu: 10,  güneşli: 5,  soğuk: 15,  sıcak: 10  }, impactNote: 'Hava tipinden bağımsız, esnek trafik' }
};

// ============= 5 PATRON =============
const PATRONS = [
  {
    id: 'ayse', name: 'Ayşe', fullName: 'Ayşe Kara', avatar: '👩',
    color: '#ec4899',
    businessIds: ['ayse-butik-kadikoy', 'ayse-butik-bostanci', 'ayse-butik-cadde'],
    sectors: ['butik'],
    bio: 'Tek sektör uzmanı. 3 butik şubesini Anadolu yakasında işletiyor.',
    note: '3 bayi · 1 sektör'
  },
  {
    id: 'hasan', name: 'Hasan', fullName: 'Hasan Yıldırım', avatar: '👨‍💼',
    color: '#8b5cf6',
    businessIds: ['dap-insaat-1', 'dap-insaat-2', 'glow-kozmetik'],
    sectors: ['inşaat', 'kozmetik'],
    bio: 'İki farklı sektörde dengeli portföy. İnşaat ana iş, kozmetik yan yatırım.',
    note: '3 bayi · 2 sektör'
  },
  {
    id: 'mehmet', name: 'Mehmet', fullName: 'Mehmet Tan', avatar: '👔',
    color: '#0ea5e9',
    businessIds: ['tan-gida-1', 'tan-gida-2', 'tan-gida-3', 'tan-tekstil', 'tan-bilisim-1', 'tan-bilisim-2'],
    sectors: ['gıda', 'tekstil', 'bilişim'],
    bio: 'Çok sektörlü holding tarzı yapı. 6 bayi, hızlı büyüme aşamasında.',
    note: '6 bayi · 3 sektör'
  },
  {
    id: 'bedirhan', name: 'Bedirhan', fullName: 'Bedirhan Demir', avatar: '🎮',
    color: '#10b981',
    businessIds: ['strike-bowling', 'yildiz-halisaha', 'joypark-luna'],
    sectors: ['bowling', 'halısaha', 'lunapark'],
    bio: 'Eğlence sektörü uzmanı. Hava bağımlı + kapalı mekan karması ile risk dengelemiş.',
    note: '3 bayi · Eğlence'
  },
  {
    id: 'inci', name: 'İnci', fullName: 'İnci Aksoy', avatar: '🍰',
    color: '#f59e0b',
    businessIds: ['inci-pastane', 'kahve-kosesi'],
    sectors: ['pastane', 'kafe'],
    bio: 'Tatlı + içecek ekosistemi. Çapraz müşteri trafiği yüksek.',
    note: '2 bayi · Yiyecek-içecek'
  }
];

// ============= 17 İŞLETME =============
const BUSINESSES = {
  // Ayşe — 3 butik
  'ayse-butik-kadikoy': {
    id: 'ayse-butik-kadikoy', patronId: 'ayse',
    name: "Ayşe'nin Butiği · Kadıköy", shortName: 'Kadıköy Butik',
    sector: 'butik', location: 'Kadıköy', activeSince: '2025-09-12',
    staffCount: 2, baseMonthly: 168000, customers: 8, topProduct: 'Sweat & Kazak',
    notable: 'En iyi performans Cuma akşamları'
  },
  'ayse-butik-bostanci': {
    id: 'ayse-butik-bostanci', patronId: 'ayse',
    name: "Ayşe'nin Butiği · Bostancı", shortName: 'Bostancı Butik',
    sector: 'butik', location: 'Bostancı', activeSince: '2024-02-08',
    staffCount: 3, baseMonthly: 215000, customers: 14, topProduct: 'Çanta & Aksesuar',
    notable: 'Hafta sonu yoğun, marina trafiği'
  },
  'ayse-butik-cadde': {
    id: 'ayse-butik-cadde', patronId: 'ayse',
    name: "Ayşe'nin Butiği · Caddebostan", shortName: 'Caddebostan Butik',
    sector: 'butik', location: 'Caddebostan', activeSince: '2024-08-19',
    staffCount: 2, baseMonthly: 195000, customers: 11, topProduct: 'Premium giyim',
    notable: 'En yüksek sepet ortalaması'
  },

  // Hasan — 2 inşaat + 1 kozmetik
  'dap-insaat-1': {
    id: 'dap-insaat-1', patronId: 'hasan',
    name: 'DAP İnşaat · Maltepe Sahası', shortName: 'DAP Maltepe',
    sector: 'inşaat', location: 'Maltepe', activeSince: '2024-04-22',
    staffCount: 18, baseMonthly: 1850000, customers: 23, topProduct: 'Hazır beton + tedarik',
    notable: '450 konutluk proje, 2026 teslim'
  },
  'dap-insaat-2': {
    id: 'dap-insaat-2', patronId: 'hasan',
    name: 'DAP İnşaat · Pendik Sahası', shortName: 'DAP Pendik',
    sector: 'inşaat', location: 'Pendik', activeSince: '2024-11-03',
    staffCount: 12, baseMonthly: 1320000, customers: 17, topProduct: 'İnce işçilik & tesisat',
    notable: '24 villa projesi, butik ölçek'
  },
  'glow-kozmetik': {
    id: 'glow-kozmetik', patronId: 'hasan',
    name: 'Glow Kozmetik · Bağdat Cd.', shortName: 'Glow Kozmetik',
    sector: 'kozmetik', location: 'Bağdat Caddesi', activeSince: '2025-01-15',
    staffCount: 4, baseMonthly: 280000, customers: 142, topProduct: 'Cilt bakım setleri',
    notable: 'Yüksek trafik, sosyal medya etkin'
  },

  // Mehmet — 3 gıda + 1 tekstil + 2 bilişim
  'tan-gida-1': {
    id: 'tan-gida-1', patronId: 'mehmet',
    name: 'Tan Gıda · Üsküdar', shortName: 'Tan Üsküdar',
    sector: 'gıda', location: 'Üsküdar', activeSince: '2023-06-10',
    staffCount: 5, baseMonthly: 420000, customers: 1850, topProduct: 'Süt & ekmek',
    notable: 'Mahalle marketi, sabah pikleri'
  },
  'tan-gida-2': {
    id: 'tan-gida-2', patronId: 'mehmet',
    name: 'Tan Gıda · Beykoz', shortName: 'Tan Beykoz',
    sector: 'gıda', location: 'Beykoz', activeSince: '2024-03-22',
    staffCount: 4, baseMonthly: 380000, customers: 1620, topProduct: 'Et & şarküteri',
    notable: 'Hafta sonu kahvaltı paketleri popüler'
  },
  'tan-gida-3': {
    id: 'tan-gida-3', patronId: 'mehmet',
    name: 'Tan Gıda · Çekmeköy', shortName: 'Tan Çekmeköy',
    sector: 'gıda', location: 'Çekmeköy', activeSince: '2024-09-15',
    staffCount: 6, baseMonthly: 510000, customers: 2240, topProduct: 'Bakliyat & kuru gıda',
    notable: 'En yeni şube, en yüksek hacim'
  },
  'tan-tekstil': {
    id: 'tan-tekstil', patronId: 'mehmet',
    name: 'Tan Tekstil · Merter', shortName: 'Tan Tekstil',
    sector: 'tekstil', location: 'Merter', activeSince: '2024-01-08',
    staffCount: 8, baseMonthly: 740000, customers: 45, topProduct: 'Toptan kumaş',
    notable: 'B2B, ihracat hazırlığında'
  },
  'tan-bilisim-1': {
    id: 'tan-bilisim-1', patronId: 'mehmet',
    name: 'Tan Bilişim · Kadıköy', shortName: 'Tan Bilişim Kadıköy',
    sector: 'bilişim', location: 'Kadıköy', activeSince: '2024-06-20',
    staffCount: 3, baseMonthly: 320000, customers: 280, topProduct: 'Akıllı telefon & tablet',
    notable: 'Genç müşteri, sosyal kampanya etkin'
  },
  'tan-bilisim-2': {
    id: 'tan-bilisim-2', patronId: 'mehmet',
    name: 'Tan Bilişim · B2B Servis', shortName: 'Tan B2B Servis',
    sector: 'bilişim', location: 'Online + Saha', activeSince: '2024-10-05',
    staffCount: 6, baseMonthly: 580000, customers: 38, topProduct: 'Kurumsal donanım',
    notable: 'Sözleşmeli müşteri, istikrarlı ciro'
  },

  // Bedirhan — 3 eğlence
  'strike-bowling': {
    id: 'strike-bowling', patronId: 'bedirhan',
    name: 'Strike Bowling Salonu', shortName: 'Strike Bowling',
    sector: 'bowling', location: 'Ataşehir AVM', activeSince: '2024-11-12',
    staffCount: 7, baseMonthly: 380000, customers: 920, topProduct: '12 pist, 1 saat oyun',
    notable: 'Hafta sonu yoğun, kapalı mekan avantajı'
  },
  'yildiz-halisaha': {
    id: 'yildiz-halisaha', patronId: 'bedirhan',
    name: 'Yıldız Halısaha', shortName: 'Yıldız Halısaha',
    sector: 'halısaha', location: 'Sancaktepe', activeSince: '2024-04-08',
    staffCount: 3, baseMonthly: 145000, customers: 580, topProduct: 'Saatlik kira',
    notable: 'Hava bağımlı, akşam dolu'
  },
  'joypark-luna': {
    id: 'joypark-luna', patronId: 'bedirhan',
    name: 'Joypark Lunapark', shortName: 'Joypark Lunapark',
    sector: 'lunapark', location: 'Tuzla Sahil', activeSince: '2024-05-15',
    staffCount: 22, baseMonthly: 850000, customers: 3200, topProduct: 'Kombo bilet (8 oyun)',
    notable: 'Sezonluk · Haziran-Eylül zirve'
  },

  // İnci — pastane + kafe
  'inci-pastane': {
    id: 'inci-pastane', patronId: 'inci',
    name: 'İnci Pastanesi · Bağdat Cd.', shortName: 'İnci Pastane',
    sector: 'pastane', location: 'Bağdat Caddesi', activeSince: '2023-11-28',
    staffCount: 5, baseMonthly: 420000, customers: 680, topProduct: 'Pasta siparişleri',
    notable: 'Hafta sonu pasta + doğum günü siparişleri'
  },
  'kahve-kosesi': {
    id: 'kahve-kosesi', patronId: 'inci',
    name: 'Kahve Köşesi · Moda', shortName: 'Kahve Köşesi',
    sector: 'kafe', location: 'Moda', activeSince: '2024-07-04',
    staffCount: 4, baseMonthly: 295000, customers: 920, topProduct: 'Specialty coffee + kahvaltı',
    notable: 'Sabah ve öğleden sonra yoğun'
  }
};

// ============= AYLIK GELİR HESAPLAMA =============
// Deterministik (aynı işletme + ay her zaman aynı sonucu verir).
function getMonthlyRevenue(businessId, year, month) {
  const b = BUSINESSES[businessId];
  if (!b) return 0;
  const yearFactor =
    year < 2024 ? 0.7 :
    year === 2024 ? 0.86 :
    year === 2025 ? 1.0 :
    year === 2026 ? 1.12 : 1.2;
  const seasonal = getSeasonalFactor(b.sector, month);
  const seed = simpleHash(businessId + '-' + year + '-' + month);
  const variance = ((seed % 200) - 100) / 1000;
  return Math.round(b.baseMonthly * yearFactor * seasonal * (1 + variance));
}

function getSeasonalFactor(sector, month) {
  const factors = {
    butik:    [0.85, 0.85, 1.05, 1.10, 1.05, 0.95, 0.85, 0.85, 1.15, 1.20, 1.15, 1.10],
    inşaat:   [0.55, 0.55, 0.85, 1.05, 1.20, 1.25, 1.30, 1.30, 1.20, 1.10, 0.85, 0.55],
    kozmetik: [0.95, 1.10, 1.00, 0.95, 1.05, 0.95, 0.85, 0.85, 1.00, 1.05, 1.10, 1.30],
    gıda:     [0.95, 0.95, 1.00, 1.00, 1.05, 1.00, 0.95, 0.95, 1.00, 1.05, 1.05, 1.15],
    tekstil:  [0.85, 0.90, 1.10, 1.10, 1.00, 0.85, 0.75, 0.80, 1.15, 1.25, 1.20, 1.05],
    bilişim:  [0.90, 0.85, 0.95, 0.95, 0.95, 0.95, 0.90, 0.90, 1.05, 1.10, 1.20, 1.30],
    bowling:  [1.10, 1.05, 0.95, 0.85, 0.80, 0.75, 0.70, 0.75, 0.95, 1.15, 1.25, 1.30],
    halısaha: [0.55, 0.60, 0.85, 1.05, 1.20, 1.20, 1.15, 1.10, 1.20, 1.10, 0.85, 0.60],
    lunapark: [0.40, 0.50, 0.65, 0.85, 1.10, 1.45, 1.55, 1.55, 1.20, 0.90, 0.60, 0.50],
    pastane:  [1.00, 1.10, 1.05, 1.00, 1.00, 0.90, 0.85, 0.85, 0.95, 1.05, 1.10, 1.30],
    kafe:     [0.95, 0.95, 1.00, 1.05, 1.05, 1.05, 1.00, 1.00, 1.05, 1.05, 1.00, 1.00]
  };
  return (factors[sector] || [1,1,1,1,1,1,1,1,1,1,1,1])[month - 1];
}

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

// Patron toplam gelir (belirli bir ay için tüm bayilerinin toplamı)
function getPatronRevenue(patronId, year, month) {
  const p = PATRONS.find(x => x.id === patronId);
  if (!p) return 0;
  return p.businessIds.reduce((sum, bid) => sum + getMonthlyRevenue(bid, year, month), 0);
}

// Patron yıllık ciro
function getPatronYearlyRevenue(patronId, year) {
  let total = 0;
  for (let m = 1; m <= 12; m++) total += getPatronRevenue(patronId, year, m);
  return total;
}

// Türkçe ay isimleri
const MONTHS_TR = ['', 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const MONTH_NAME_TO_NUM = {
  'ocak': 1, 'şubat': 2, 'mart': 3, 'nisan': 4, 'mayıs': 5, 'haziran': 6,
  'temmuz': 7, 'ağustos': 8, 'eylül': 9, 'ekim': 10, 'kasım': 11, 'aralık': 12
};

// Sorgudan ay+yıl çıkar
function extractMonthYear(query) {
  const lower = query.toLocaleLowerCase('tr');
  const monthRegex = new RegExp('(' + Object.keys(MONTH_NAME_TO_NUM).join('|') + ')', 'i');
  const monthMatch = lower.match(monthRegex);
  const yearMatch = lower.match(/\b(20\d{2})\b/);
  if (!monthMatch) return null;
  const month = MONTH_NAME_TO_NUM[monthMatch[1].toLocaleLowerCase('tr')];
  const year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear();
  return { month, year, label: `${MONTHS_TR[month]} ${year}` };
}

// Sorguda işletme ismi geçiyor mu?
function detectBusinessInQuery(query, scopePatronId) {
  if (!scopePatronId) return null;
  const p = PATRONS.find(x => x.id === scopePatronId);
  if (!p) return null;
  const lower = query.toLocaleLowerCase('tr');
  for (const bid of p.businessIds) {
    const b = BUSINESSES[bid];
    const tokens = (b.shortName + ' ' + b.location).toLocaleLowerCase('tr').split(/[\s·.]+/).filter(t => t.length > 3);
    for (const t of tokens) {
      if (lower.includes(t)) return b;
    }
  }
  return null;
}
