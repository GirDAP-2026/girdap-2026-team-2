// ============= SCOPE-AWARE VERİ ÜRETECI =============
// Her businessId için deterministik müşteri / fatura / kampanya / whatsapp listeleri.
// Ayşe Kadıköy (ayse-butik-kadikoy) için app-data.js'teki orijinal sabit veriler kullanılır;
// diğer 16 işletme için sektör + baseMonthly + customers field'ına göre üretilir.

// ---------- Sektör havuzları ----------
const SECTOR_CUSTOMERS_B2C = {
  butik: ['Ayşe K.', 'Mehmet T.', 'Selim D.', 'Fatma Y.', 'Zeynep A.', 'Cem Ö.', 'Elif Ş.', 'Ali K.', 'Burcu E.', 'Hande N.', 'Tuğçe O.', 'Begüm L.'],
  kozmetik: ['Ece Y.', 'Selin M.', 'Pelin D.', 'Begüm Ş.', 'Aslı K.', 'Defne A.', 'Naz Ö.', 'Cansu R.', 'Yağmur P.', 'Sıla T.', 'Tuana G.', 'Melisa H.'],
  gıda: ['Hasan A.', 'Mustafa Y.', 'Hatice K.', 'İbrahim S.', 'Şerife B.', 'Mahmut D.', 'Sabriye T.', 'Ömer K.', 'Nuray P.', 'Recep E.', 'Hülya O.', 'Yusuf M.', 'Pınar L.', 'Tolga A.', 'Esra B.', 'Murat C.'],
  pastane: ['Aile Yıldız', 'Aile Demir', 'Aile Kaya', 'Aile Çelik', 'Aile Şahin', 'Aile Öztürk', 'Aile Aydın', 'Aile Yılmaz', 'Aile Koç', 'Aile Doğan'],
  kafe: ['Selin M.', 'Burak A.', 'Deniz K.', 'Cem T.', 'Pelin O.', 'Onur Y.', 'Hülya R.', 'Tolga B.', 'Ezgi C.', 'Caner D.', 'Buse E.', 'Volkan F.'],
  bowling: ['Grup Mavi', 'Grup Sarı', 'Grup Yeşil', 'Grup Kırmızı', 'Atölye Takım', 'A.Ş. Etkinlik', 'Lige Eklendi', 'Cumartesi Grup', 'Doğum Günü Set', 'Şirket K.'],
  halısaha: ['Yıldızlar FC', 'Mavi Şimşek', 'Gece Kartalları', 'Şahinler', 'Sahil Yıldızı', 'Maraton FC', 'Boğaz Boğaları', 'Çakal Boys', 'AlperKurtler', 'Mahalle Takımı'],
  lunapark: ['Ailenli Hafta Sonu', 'Okul Gezisi', 'Doğum Günü Grup', 'Pazar Aile', 'Cumartesi Aile', 'Cuma Gece', 'Kursiyer Grup', 'Hareketli Aile', 'Komşu Aile', 'Pikniğe Eklendi'],
};

const SECTOR_CUSTOMERS_B2B = {
  inşaat: ['DAP Yapı A.Ş.', 'BetaYapı Ltd.', 'Çelik İnşaat', 'Aksoy Müteahhitlik', 'TerraBina', 'Karpat Şantiye', 'Aklan Yapı', 'Yıldız Konut', 'MetroBeton', 'Akın İnşaat', 'Marmara Yapı', 'Solfa İnşaat'],
  tekstil: ['Konfeks Plus A.Ş.', 'Anadolu Tekstil', 'Marmara Konfek.', 'Ege Kumaş', 'Bursa İplik', 'Aksoy Tekstil', 'Atlas Konfek.', 'Tan Hold.', 'Star Konfek.', 'Bayrak Tekstil'],
  bilişim: ['Logo Sistem', 'NetTech A.Ş.', 'DataMaks', 'KuruluşBT', 'OfisPro', 'Sigma BT', 'Kar Sistem', 'TechHub', 'BlueData', 'CloudArt'],
};

const SECTOR_PRODUCTS = {
  butik: ['Sweat & Kazak', 'Çanta + Aksesuar', 'Premium giyim', 'Etek', 'Pantolon'],
  inşaat: ['Hazır beton', 'İnce işçilik', 'Tesisat', 'Demir & çelik', 'Boya & izolasyon'],
  kozmetik: ['Cilt bakım seti', 'Parfüm', 'Makyaj seti', 'Saç bakım', 'Hediye paketi'],
  gıda: ['Süt & ekmek', 'Et & şarküteri', 'Bakliyat', 'Sebze meyve', 'Kahvaltı paketi'],
  tekstil: ['Pamuklu kumaş', 'Polyester', 'Düğme + fermuar', 'İplik', 'Konfeksiyon hizmeti'],
  bilişim: ['Akıllı telefon', 'Tablet', 'Kurumsal donanım', 'Yazılım lisansı', 'Servis paketi'],
  bowling: ['Pist saati', 'Grup paketi', 'Şirket etkinliği', 'Doğum günü paketi', 'Lig kaydı'],
  halısaha: ['Saatlik kira', 'Lig kaydı', 'Turnuva organizasyon', 'Aylık üyelik'],
  lunapark: ['Kombo bilet', 'Aile paketi', 'Doğum günü', 'Okul gezisi', 'Tek atraksiyon'],
  pastane: ['Pasta siparişi', 'Doğum günü pastası', 'Kurabiye paketi', 'Düğün pastası', 'Kahvaltı tatlısı'],
  kafe: ['Specialty kahve', 'Kahvaltı', 'Tatlı + içecek', 'Toplantı paketi', 'Sandviç'],
};

const SECTOR_FT_PREFIX = {
  butik: 'BT', inşaat: 'IN', kozmetik: 'KZ', gıda: 'GD', tekstil: 'TX',
  bilişim: 'BL', bowling: 'BW', halısaha: 'HS', lunapark: 'LP', pastane: 'PS', kafe: 'KF',
};

const SECTOR_SEGMENTS = {
  butik: ['VIP', 'Sadık', 'Düzenli', 'Kayıp Risk'],
  kozmetik: ['VIP', 'Sadık', 'Düzenli', 'Kayıp Risk'],
  gıda: ['Sabit', 'Sabah', 'Hafta sonu', 'Kayıp Risk'],
  pastane: ['Sipariş', 'Kahvaltı', 'Hediye', 'Kayıp Risk'],
  kafe: ['Sabah sabit', 'Specialty', 'Toplantı', 'Kayıp Risk'],
  inşaat: ['Kurumsal', 'Müteahhit', 'Bireysel', 'Vade riski'],
  tekstil: ['Toptan', 'İhracat', 'Konfeksiyon', 'Vade riski'],
  bilişim: ['Kurumsal', 'Genç', 'Servis', 'Bireysel'],
  bowling: ['Grup', 'Şirket', 'Sadık', 'Kayıp Risk'],
  halısaha: ['Lig', 'Düzenli', 'Şirket', 'Kayıp Risk'],
  lunapark: ['Aile', 'Doğum günü', 'Okul', 'Tek seferlik'],
};

const SECTOR_SUGGESTIONS = {
  butik: ['%10 hedefli kupon', 'Yeni sezon davet mesajı', 'VIP teşekkür mesajı', 'Sadakat kart önerisi'],
  kozmetik: ['Cilt bakım randevusu daveti', 'Hediye paketi öner', 'VIP teşekkür', 'Yeni ürün lansman daveti'],
  gıda: ['Sabah teslimat hatırlatması', 'Hafta sonu kahvaltı paketi', 'Sadakat kartı', '%5 indirim WhatsApp'],
  pastane: ['Doğum günü hatırlatma', 'Pasta sipariş hatırlatma', 'Hediye paketi öner', 'Hafta sonu kampanya'],
  kafe: ['Sabah kahvaltı menüsü daveti', 'Specialty etkinlik daveti', 'Sadakat 10 al 1 bedava', 'Toplantı paketi öner'],
  inşaat: ['Vade hatırlatma', 'Erken ödeme indirim teklifi', 'Yeni proje teklifi', 'Tedarik anlaşması yenileme'],
  tekstil: ['Peşin ödeme indirimi', 'Sezon teklifi', 'İhracat kategori önerisi', 'Yeni koleksiyon daveti'],
  bilişim: ['Servis anlaşması teklifi', 'Yeni donanım önerisi', 'Yıl sonu paketi', 'Genç öğrenci kampanyası'],
  bowling: ['Grup paketi indirimi', 'Şirket etkinlik teklifi', 'Doğum günü paketi', 'Sadakat kartı'],
  halısaha: ['Lig kayıt hatırlatma', 'Sabah saat indirimi', 'Turnuva daveti', 'Yağmur telafi rezervasyonu'],
  lunapark: ['Aile paketi indirimi', 'Doğum günü teklifi', 'Hafta içi kampanya', 'Sezon kart önerisi'],
};

const SECTOR_INSIGHTS = {
  butik: ['Cuma akşamı aktif', 'Sezon değişimi yaklaşıyor', 'Sosyal medya etkili'],
  kozmetik: ['Influencer etkisi yüksek', 'Hediye sezonu yaklaşıyor', 'Cilt analizi randevuya hazır'],
  gıda: ['Sabah saatleri sabit', 'Ailesel alışveriş trendi', 'Yağmurlu günlerde artış'],
  pastane: ['Hafta sonu sipariş yoğun', 'Doğum günü ay başı pikleri', 'Soğuk hava etkisi pozitif'],
  kafe: ['Sabah pikleri belirgin', 'Toplantı saatleri 14-17', 'Specialty merakı yüksek'],
  inşaat: ['Vade ortalaması 45 gün', 'Mevsime hassas saha', 'Hakediş onayı bekliyor'],
  tekstil: ['B2B yoğun', 'Sezon ön sipariş zamanı', 'İhracat sertifika hazırlığı'],
  bilişim: ['Kurumsal yıl sonu artışı', 'Servis aboneliği önerilebilir', 'Yeni ürün lansman bekleniyor'],
  bowling: ['Hafta sonu doluluk pikleri', 'Kapalı mekan avantajı', 'Şirket etkinlik fırsatı'],
  halısaha: ['Akşam tam dolu', 'Hava bağımlı iptal riski', 'Sabah saatleri boş'],
  lunapark: ['Yaz pik yaklaşıyor', 'Aile paketleri popüler', 'Hava hassas sezon'],
};

const SECTOR_CAMPAIGN_TYPES = {
  butik: ['Cuma akşamı indirim', 'VIP teşekkür', 'Sezon başlangıcı'],
  kozmetik: ['Hediye paketi sezon', 'Cilt analizi daveti', 'Sosyal medya kampanyası'],
  gıda: ['Sabah teslimat anlaşması', 'Hafta sonu kahvaltı paketi', 'Sadakat kartı'],
  pastane: ['Doğum günü erken sipariş', 'Hafta sonu pasta paketi', 'Soğuk hava menüsü'],
  kafe: ['Sabah kahvaltı menüsü', 'Specialty cupping', 'Sadakat 10 al 1 bedava'],
  inşaat: ['Erken ödeme indirimi', 'Yaz inşaat paketi', 'Kurumsal müşteri anlaşması'],
  tekstil: ['Peşin ödeme', 'İhracat sezon koleksiyonu', 'Düğme + fermuar bundle'],
  bilişim: ['Yıl sonu kurumsal', 'Öğrenci taksit', 'Servis abonelik'],
  bowling: ['Yağmurlu hafta sonu', 'Şirket etkinlik paketi', 'Doğum günü grup'],
  halısaha: ['Sabah erken kuş', 'Lig organizasyonu', 'Yağmur telafi'],
  lunapark: ['Aile hafta içi', 'Doğum günü', 'Yaz pik sezon'],
};

const SECTOR_WA_TEMPLATES = {
  butik: 'Merhaba {ad} 👋\n\n{urun} koleksiyonumuz yenilendi — Cuma akşamı %15 indirim sizi bekliyor. Yer ayırtmak ister misiniz?\n\n— {isletme}',
  kozmetik: 'Merhaba {ad} ✨\n\nYeni sezon cilt bakım setlerimiz geldi — sizin için %10 hediye paketleme ile hazır. Detay için yazın.\n\n— {isletme}',
  gıda: 'Merhaba {ad} 👋\n\nBu hafta {urun} taze ve uygun fiyatlarla. Sabah teslimat için bizi arayın.\n\n— {isletme}',
  pastane: 'Merhaba {ad} 🎂\n\n{urun} siparişiniz için yardımcı olabilirim. Hafta sonu için yer kalmadan haber verin lütfen.\n\n— {isletme}',
  kafe: 'Merhaba {ad} ☕\n\nSabah specialty menüsü değişti, kahvaltı + filtre kahve sadece bu hafta 95₺. Görüşmek üzere.\n\n— {isletme}',
  inşaat: 'Sayın {ad} yetkilisi,\n\n{urun} sevkiyatınız için vade tarihinize 3 gün kaldı. Erken ödemede %3 indirimimiz mevcuttur.\n\nSaygılarımla,\n{isletme}',
  tekstil: 'Sayın {ad} yetkilisi,\n\nSezon koleksiyonu için son sipariş tarihimiz yaklaşıyor. Peşin ödemede %3 indirim, listeyi paylaşalım mı?\n\n{isletme}',
  bilişim: 'Sayın {ad} yetkilisi,\n\nKurumsal donanım kampanyamız bu hafta sonu sonlanıyor — 3+1 + 12 ay bakım. Müsait olduğunuzda dönelim.\n\n{isletme}',
  bowling: 'Merhaba {ad} 🎳\n\nHafta sonu için pist boşluğunuz hazır — şirket grupları için %15 indirim. Rezervasyon için cevap verin.\n\n— {isletme}',
  halısaha: 'Merhaba {ad} ⚽\n\nGelecek hafta sahanızı erken rezerve edin, yağmur olursa otomatik telafi yapıyoruz. Saat: 20:00?\n\n— {isletme}',
  lunapark: 'Merhaba {ad} 🎡\n\nHafta sonu aile paketinde %15 indirim — kombo bilet + doğum günü pasta paketi. Yer kalmadan rezerve edin.\n\n— {isletme}',
};

// ---------- Yardımcılar ----------
function _seed(str) { return typeof simpleHash === 'function' ? simpleHash(str) : Array.from(str).reduce((s, c) => ((s << 5) - s + c.charCodeAt(0)) | 0, 0); }
function _pick(seed, arr) { return arr[Math.abs(seed) % arr.length]; }
function _pickN(seed, arr, n) {
  const out = [];
  const used = new Set();
  let s = seed;
  while (out.length < Math.min(n, arr.length)) {
    const idx = Math.abs(s) % arr.length;
    if (!used.has(idx)) { out.push(arr[idx]); used.add(idx); }
    s = (s * 31 + 17) | 0;
  }
  return out;
}
function _formatDayMonth(date) {
  const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  return `${date.getDate()} ${months[date.getMonth()]}`;
}

// ---------- AYŞE KADIKÖY ORİJİNAL VERİLER ----------
const _AYSE_KDK_ID = 'ayse-butik-kadikoy';
let _AYSE_KDK_SNAPSHOT = null;
function _snapshotAyseKdk() {
  if (_AYSE_KDK_SNAPSHOT) return _AYSE_KDK_SNAPSHOT;
  _AYSE_KDK_SNAPSHOT = {
    business: typeof business !== 'undefined' ? { ...business } : null,
    todayStats: typeof todayStats !== 'undefined' ? { ...todayStats } : null,
    customers: typeof customersDetailed !== 'undefined' ? customersDetailed.map(c => ({ ...c })) : [],
    invoices: typeof invoices !== 'undefined' ? invoices.map(i => ({ ...i })) : [],
    campaigns: typeof campaigns !== 'undefined' ? campaigns.map(c => ({ ...c })) : [],
    whatsappQueue: typeof whatsappQueue !== 'undefined' ? whatsappQueue.map(m => ({ ...m })) : [],
    whatsappHistory: typeof whatsappHistory !== 'undefined' ? whatsappHistory.map(m => ({ ...m })) : [],
    messageDrafts: typeof messageDrafts !== 'undefined' ? JSON.parse(JSON.stringify(messageDrafts)) : {},
  };
  return _AYSE_KDK_SNAPSHOT;
}

// ---------- ÜRETECILER ----------
function generateCustomersForBusiness(b) {
  const sector = b.sector;
  const namesPool = SECTOR_CUSTOMERS_B2C[sector] || SECTOR_CUSTOMERS_B2B[sector] || [];
  const segments = SECTOR_SEGMENTS[sector] || ['Düzenli', 'VIP', 'Sadık', 'Kayıp Risk'];
  const insightsPool = SECTOR_INSIGHTS[sector] || ['Düzenli ilişki'];
  const suggestionsPool = SECTOR_SUGGESTIONS[sector] || ['Hatırlatma mesajı'];
  const products = SECTOR_PRODUCTS[sector] || ['Ürün'];

  const customerCount = Math.min(Math.max(6, Math.round(b.customers / 20) + 4), 12);
  const avgBasketBase = Math.round(b.baseMonthly / Math.max(b.customers, 8) / 1.2);

  const out = [];
  for (let i = 0; i < customerCount; i++) {
    const seed = _seed(`${b.id}-cust-${i}`);
    const name = namesPool[i % namesPool.length] + (i >= namesPool.length ? ' #' + Math.floor(i / namesPool.length + 1) : '');
    const seg = segments[Math.abs(seed) % segments.length];
    const isRisk = seg.toLowerCase().includes('risk') || seg.toLowerCase().includes('kayıp');
    const lastVisit = isRisk ? `${30 + (seed % 30)} gün önce` : `${1 + (seed % 14)} gün önce`;
    const health = isRisk ? 20 + (seed % 25) : seg === 'VIP' ? 85 + (seed % 14) : 60 + (seed % 28);
    const risk = isRisk ? 'high' : health > 78 ? 'low' : 'medium';
    const visits = isRisk ? 5 + (seed % 8) : 8 + (seed % 18);
    const avgBasket = Math.round(avgBasketBase * (0.6 + (Math.abs(seed % 100)) / 100));
    const totalSpend = avgBasket * visits;
    out.push({
      id: i + 1,
      name,
      phone: `+90 53${(seed % 9)} *** ${1000 + (seed % 9000)}`,
      lastVisit,
      totalSpend,
      healthScore: health,
      risk,
      visits,
      avgBasket,
      segment: seg,
      insights: _pickN(seed, insightsPool, Math.min(3, insightsPool.length)),
      suggestion: _pick(seed * 7, suggestionsPool),
    });
  }
  return out;
}

function generateInvoicesForBusiness(b) {
  const prefix = SECTOR_FT_PREFIX[b.sector] || 'FT';
  const products = SECTOR_PRODUCTS[b.sector] || ['Ürün'];
  const customers = generateCustomersForBusiness(b);
  const today = new Date();

  const isB2B = !!SECTOR_CUSTOMERS_B2B[b.sector];
  const avgInvoiceBase = isB2B ? Math.round(b.baseMonthly / 12) : Math.round(b.baseMonthly / Math.max(b.customers, 10));

  const out = [];
  // 3 gecikmiş
  for (let i = 0; i < 3; i++) {
    const seed = _seed(`${b.id}-inv-od-${i}`);
    const c = customers[(i + 1) % customers.length];
    const daysOverdue = 3 + (seed % 18);
    const issuedDate = new Date(today);
    issuedDate.setDate(issuedDate.getDate() - daysOverdue - 14);
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() - daysOverdue);
    out.push({
      id: `${prefix}-${2300 + (seed % 200)}`,
      customer: c.name,
      amount: Math.round(avgInvoiceBase * (0.7 + (Math.abs(seed % 100)) / 100)),
      issued: _formatDayMonth(issuedDate),
      due: _formatDayMonth(dueDate),
      status: 'overdue',
      daysOverdue,
    });
  }
  // 5 yaklaşan
  for (let i = 0; i < 5; i++) {
    const seed = _seed(`${b.id}-inv-up-${i}`);
    const c = customers[(i + 4) % customers.length];
    const daysUntilDue = 3 + (seed % 18);
    const issuedDate = new Date(today);
    issuedDate.setDate(issuedDate.getDate() - 7 + (i * 2));
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + daysUntilDue);
    out.push({
      id: `${prefix}-${2380 + (seed % 80)}`,
      customer: c.name,
      amount: Math.round(avgInvoiceBase * (0.6 + (Math.abs(seed % 100)) / 100)),
      issued: _formatDayMonth(issuedDate),
      due: _formatDayMonth(dueDate),
      status: 'upcoming',
      daysUntilDue,
    });
  }
  // 2 ödenmiş
  for (let i = 0; i < 2; i++) {
    const seed = _seed(`${b.id}-inv-pd-${i}`);
    const c = customers[i % customers.length];
    const issuedDate = new Date(today);
    issuedDate.setDate(issuedDate.getDate() - 28 + (i * 5));
    const paidDate = new Date(today);
    paidDate.setDate(paidDate.getDate() - 18 + (i * 5));
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() - 14 + (i * 5));
    out.push({
      id: `${prefix}-${2290 + (seed % 60)}`,
      customer: c.name,
      amount: Math.round(avgInvoiceBase * (0.7 + (Math.abs(seed % 100)) / 100)),
      issued: _formatDayMonth(issuedDate),
      due: _formatDayMonth(dueDate),
      status: 'paid',
      paidOn: _formatDayMonth(paidDate),
    });
  }
  return out;
}

function generateCampaignsForBusiness(b) {
  const types = SECTOR_CAMPAIGN_TYPES[b.sector] || ['Sezon kampanyası'];
  const segments = SECTOR_SEGMENTS[b.sector] || ['Düzenli'];
  const baseRevenue = Math.round(b.baseMonthly * 0.05);
  const seed = _seed(b.id + '-camp');

  return [
    {
      id: 1,
      name: types[0],
      status: 'active',
      type: 'whatsapp',
      targetSegment: segments[seed % segments.length],
      sent: 15 + (seed % 25),
      opened: 12 + (seed % 18),
      converted: 4 + (seed % 8),
      startedAt: _formatDayMonth(new Date(Date.now() - 6 * 86400000)),
      revenue: Math.round(baseRevenue * 0.6),
    },
    {
      id: 2,
      name: types[1] || types[0],
      status: 'active',
      type: 'whatsapp+sms',
      targetSegment: segments[(seed + 1) % segments.length],
      sent: 8 + (seed % 12),
      opened: 8 + (seed % 8),
      converted: 5 + (seed % 6),
      startedAt: _formatDayMonth(new Date(Date.now() - 12 * 86400000)),
      revenue: Math.round(baseRevenue * 1.1),
    },
    {
      id: 3,
      name: types[2] || types[0],
      status: 'scheduled',
      type: 'whatsapp',
      targetSegment: segments[(seed + 2) % segments.length],
      scheduled: _formatDayMonth(new Date(Date.now() + 3 * 86400000)) + ', 18:00',
      estimatedReach: 25 + (seed % 40),
      expectedRevenue: Math.round(baseRevenue * 0.8),
    },
  ];
}

function generateWhatsAppQueueForBusiness(b) {
  const customers = generateCustomersForBusiness(b).filter(c => c.risk === 'high' || c.segment.toLowerCase().includes('risk'));
  const template = SECTOR_WA_TEMPLATES[b.sector] || 'Merhaba {ad} 👋\n\n{urun} hakkında konuşmak için yazın.\n\n— {isletme}';
  const products = SECTOR_PRODUCTS[b.sector] || ['Ürün'];
  const pool = customers.length > 0 ? customers : generateCustomersForBusiness(b).slice(0, 3);

  return pool.slice(0, 3).map((c, i) => {
    const seed = _seed(`${b.id}-wa-${i}`);
    const product = products[seed % products.length];
    const preview = template
      .replace('{ad}', c.name)
      .replace('{urun}', product)
      .replace('{isletme}', b.shortName);
    const types = ['Tahsilat hatırlatma', '%10 indirim teklifi', 'VIP teşekkür', 'Yeni ürün bildirimi'];
    const hours = ['Bugün 14:00', 'Bugün 15:00', 'Bugün 16:00', 'Yarın 10:00', 'Yarın 11:30'];
    return {
      customer: c.name,
      type: types[seed % types.length],
      status: 'Onay bekliyor',
      scheduledFor: hours[seed % hours.length],
      preview,
    };
  });
}

function generateWhatsAppHistoryForBusiness(b) {
  const customers = generateCustomersForBusiness(b);
  const seed = _seed(b.id + '-wah');
  const types = ['VIP teşekkür', 'Yeni ürün bildirimi', 'Hoş geldin 2/3', 'Sezon kampanyası', 'Doğum günü kuponu'];
  const statuses = ['Açıldı + Tıklandı', 'Açıldı', 'Gönderildi', 'Açıldı'];
  const baseRev = Math.round(b.baseMonthly / 250);

  return customers.slice(0, 4).map((c, i) => {
    const s = _seed(`${b.id}-wah-${i}`);
    const hasRev = s % 3 !== 0;
    return {
      customer: c.name,
      type: types[(s + i) % types.length],
      status: statuses[(s + i) % statuses.length],
      sentAt: i === 0 ? 'Dün 11:24' : i === 1 ? 'Dün 09:18' : i === 2 ? '2 gün önce 16:45' : '3 gün önce 12:00',
      revenue: hasRev ? baseRev * (1 + (s % 4)) : null,
    };
  });
}

function generateMessageDraftsForBusiness(b) {
  const invs = generateInvoicesForBusiness(b);
  const overdue = invs.filter(i => i.status === 'overdue');
  const template = SECTOR_WA_TEMPLATES[b.sector] || 'Merhaba {ad} 👋\n\n{urun} ödemeniz hakkında konuşalım.\n\n— {isletme}';
  const products = SECTOR_PRODUCTS[b.sector] || ['ürün'];
  const drafts = {};

  overdue.slice(0, 2).forEach((inv, i) => {
    const seed = _seed(`${b.id}-draft-${i}`);
    const product = products[seed % products.length];
    drafts[inv.customer] = {
      tone: i === 0 ? 'samimi-hatırlatıcı' : 'yumuşak-hatırlatıcı',
      text: template
        .replace('{ad}', inv.customer)
        .replace('{urun}', product)
        .replace('{isletme}', b.shortName) +
        `\n\n(Vade: ${inv.due} · Tutar: ${inv.amount.toLocaleString('tr-TR')}₺)`,
    };
  });
  return drafts;
}

function generateTodayStatsForBusiness(b) {
  const now = new Date();
  const monthlyRev = typeof getMonthlyRevenue === 'function'
    ? getMonthlyRevenue(b.id, now.getFullYear(), now.getMonth() + 1)
    : b.baseMonthly;
  const dailyAvg = Math.round(monthlyRev / 30);
  const seed = _seed(b.id + '-today');
  const variance = ((seed % 200) - 100) / 1000;

  return {
    todaySales: Math.round(dailyAvg * (1 + variance)),
    yesterdaySales: Math.round(dailyAvg * (1 + ((seed * 3) % 200 - 100) / 1000)),
    openInvoices: 3,
    openInvoicesTotal: Math.round(monthlyRev * 0.06),
    highRiskCustomers: 3,
    monthlyRevenue: monthlyRev,
    cashPosition: Math.round(monthlyRev * 0.2 * (1 + variance)),
  };
}

function generateBusinessMetaForBusiness(b) {
  const p = typeof PATRONS !== 'undefined' ? PATRONS.find(x => x.id === b.patronId) : null;
  const sectorMeta = typeof SECTORS !== 'undefined' ? SECTORS[b.sector] : null;
  return {
    name: b.name,
    ownerName: p ? p.fullName : '',
    location: b.location,
    posSerial: 'ÖD-' + Math.abs(_seed(b.id)).toString().slice(0, 6) + '-' + b.sector.toUpperCase().slice(0, 2),
    activeSince: b.activeSince,
    staffCount: b.staffCount,
    sectorLabel: sectorMeta ? sectorMeta.label : b.sector,
    sectorIcon: sectorMeta ? sectorMeta.icon : '🏪',
  };
}

// ---------- TEK GİRİŞ NOKTASI ----------
function refreshScopedData() {
  _snapshotAyseKdk(); // ilk çağrıda Ayşe Kadıköy orijinalini sakla

  if (typeof APP === 'undefined' || !APP.state) return;

  const bid = APP.state.currentBusinessId;
  const isPatronMode = APP.state.isPatronMode;

  // Patron modunda → varsayılan olarak patronun ilk işletmesinin verisini göster
  let effectiveBid = bid;
  if (isPatronMode && typeof PATRONS !== 'undefined') {
    const p = PATRONS.find(x => x.id === APP.state.currentPatronId);
    if (p && p.businessIds.length > 0) effectiveBid = p.businessIds[0];
  }

  if (!effectiveBid || typeof BUSINESSES === 'undefined' || !BUSINESSES[effectiveBid]) return;

  // Ayşe Kadıköy → orijinal sabit veriler
  if (effectiveBid === _AYSE_KDK_ID && _AYSE_KDK_SNAPSHOT) {
    const snap = _AYSE_KDK_SNAPSHOT;
    if (snap.business) business = { ...snap.business };
    if (snap.todayStats) todayStats = { ...snap.todayStats };
    customersDetailed = snap.customers.map(c => ({ ...c }));
    invoices = snap.invoices.map(i => ({ ...i }));
    campaigns = snap.campaigns.map(c => ({ ...c }));
    whatsappQueue = snap.whatsappQueue.map(m => ({ ...m }));
    whatsappHistory = snap.whatsappHistory.map(m => ({ ...m }));
    messageDrafts = JSON.parse(JSON.stringify(snap.messageDrafts));
    return;
  }

  // Diğer 16 işletme → üretilen veriler
  const b = BUSINESSES[effectiveBid];
  business = generateBusinessMetaForBusiness(b);
  todayStats = generateTodayStatsForBusiness(b);
  customersDetailed = generateCustomersForBusiness(b);
  invoices = generateInvoicesForBusiness(b);
  campaigns = generateCampaignsForBusiness(b);
  whatsappQueue = generateWhatsAppQueueForBusiness(b);
  whatsappHistory = generateWhatsAppHistoryForBusiness(b);
  messageDrafts = generateMessageDraftsForBusiness(b);
}

// Global export (window üzerinden de erişilebilsin diye)
if (typeof window !== 'undefined') {
  window.refreshScopedData = refreshScopedData;
  window.generateCustomersForBusiness = generateCustomersForBusiness;
  window.generateInvoicesForBusiness = generateInvoicesForBusiness;
  window.generateCampaignsForBusiness = generateCampaignsForBusiness;
  window.generateWhatsAppQueueForBusiness = generateWhatsAppQueueForBusiness;
  window.generateWhatsAppHistoryForBusiness = generateWhatsAppHistoryForBusiness;
}
