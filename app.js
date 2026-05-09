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
    aiQuotaFree: 20,
    // SCOPE: hangi patron + bayi üzerinden bakıyoruz?
    currentPatronId: 'ayse',           // varsayılan
    currentBusinessId: 'ayse-butik-kadikoy', // null = patron modu
    isPatronMode: false
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
  { id: 'dashboard', label: 'Ana Sayfa', icon: I.home },
  { id: 'customers', label: 'Müşterilerim', icon: I.users },
  { id: 'payments', label: 'Tahsilat', icon: I.invoice },
  { id: 'campaigns', label: 'Kampanyalar', icon: I.campaign, pro: true },
  { id: 'whatsapp', label: 'WhatsApp', icon: I.whatsapp, pro: true },
  { id: 'ai', label: 'AI Asistan', icon: I.bot },
  { id: 'settings', label: 'Ayarlar', icon: I.settings }
];

// ============= AI MODÜL KATALOĞU =============
// entegrasyon.md mantığı: tek katalog → sidebar + rota + tip güvenliği aynı yerden.
// İleride backend'e (Gemini) bağlanırken sadece askModule() içinde fetch eklenecek.
const AI_MODULES = [
  {
    id: 'forecast',
    label: 'Tahmin Asistanı',
    iconEmoji: '📈',
    color: '#00c896',
    description: 'Geçmiş POS verisini LSTM ile analiz eder, sonraki 30-90 günü tahmin eder.',
    prompts: [
      {
        q: 'Önümüzdeki 30 günde nakit akışım ne olacak?',
        a: `<strong>Tahmin (Mayıs 9 → Haziran 7):</strong><br><br>
          📊 Beklenen toplam gelir: <strong>147.300₺</strong> (±8%)<br>
          📉 Beklenen gider: <strong>129.800₺</strong><br>
          💰 Net pozisyon: <strong style="color:#00c896">+17.500₺</strong><br><br>
          ⚠️ <strong>18 Mayıs civarı dip:</strong> 8.000₺ geçici açık riski (%72 olasılık).<br>
          💡 <strong>Önerim:</strong> Mehmet Tan ve Selim Demir'den tahsilatı 17 Mayıs'a çekersen kapanır.`
      },
      {
        q: 'Gelecek hafta hangi gün en yüksek satış olur?',
        a: `Geçmiş 12 hafta verisi + sezonsal patern + hava tahmininden:<br><br>
          🥇 <strong>Cuma (16 May):</strong> tahmini <strong>6.200₺</strong> (haftalık ortalamanın %23 üstü)<br>
          🥈 <strong>Cumartesi (17 May):</strong> tahmini <strong>5.800₺</strong><br>
          🥉 <strong>Salı (13 May):</strong> tahmini <strong>5.400₺</strong> — hava yağmurlu, dış giyim trendi<br><br>
          💡 Cuma 18:00-22:00 arası kampanya yaparsan ek <strong>~1.400₺</strong> getirisi tahmin ediyorum.`
      },
      {
        q: 'Bu ay sonunda kâra geçecek miyim?',
        a: `<strong>Ay sonu projeksiyonu (31 Mayıs):</strong><br><br>
          📈 Beklenen aylık gelir: <strong>168.200₺</strong><br>
          📉 Sabit + değişken giderler: <strong>142.000₺</strong><br>
          ✅ <strong>Net kâr beklentisi:</strong> ~26.200₺ (%15.6 marj)<br><br>
          Geçen ay marjın %12.8'di — <strong style="color:#00c896">↑%2.8 artış</strong> trendinde.<br>
          💡 Cuma kampanyaları çalışırsa marj %17'ye çıkabilir.`
      },
      {
        q: 'Stoklarım ne zaman biter?',
        a: `Satış hızına göre stok bitiş tahminleri:<br><br>
          🔴 <strong>Sweat & Kazak:</strong> 8 gün sonra (16 May) — <em>acil sipariş ver</em><br>
          🟡 <strong>Çanta & Aksesuar:</strong> 17 gün (25 May)<br>
          🟢 <strong>Erkek giyim:</strong> 31 gün (8 Haz) — durum iyi<br>
          🟢 <strong>Yağmurluk/dış giyim:</strong> 14 gün — hava etkisi ile hızlanabilir<br><br>
          💡 Sweat kategorisi marjı en yüksek (%42), önceliklendir.`
      }
    ]
  },
  {
    id: 'customer',
    label: 'Müşteri Analisti',
    iconEmoji: '🧑‍🤝‍🧑',
    color: '#3b82f6',
    description: 'Transformer modeli + davranış verisi ile müşteri segmentasyonu, sadakat ve kayıp tahmini.',
    prompts: [
      {
        q: 'Hangi müşterilerimi kaybedebilirim?',
        a: `<strong>3 yüksek riskli müşteri</strong> tespit ettim:<br><br>
          🔴 <strong>Mehmet Tan</strong> (sağlık skoru 28) — 37 gündür yok, son şikâyet metninde olumsuz duygu (–0.62)<br>
          🔴 <strong>Selim Demir</strong> (skor 35) — 32 gün, son 3 ziyarette harcaması düşüş trendinde<br>
          🔴 <strong>Fatma Yılmaz</strong> (skor 31) — 45 gün, sezonlu alıcı ama bu sezon sessiz<br><br>
          💡 <strong>Aksiyon:</strong> Üçü için kişiselleştirilmiş geri kazanma kampanyası hazırlayabilirim. <em>Devam et?</em>`
      },
      {
        q: 'En sadık müşterilerim kim?',
        a: `<strong>Top 3 sadık müşteri</strong> (frekans + harcama + duygu):<br><br>
          👑 <strong>Cem Öztürk</strong> — VIP, yıllık 9.200₺, 18 ziyaret, sadakat %92<br>
          💚 <strong>Ayşe Kara</strong> — Sadık, 4.200₺, 14 ziyaret, %89<br>
          💚 <strong>Ali Korkmaz</strong> — Sadık, 5.600₺, 12 ziyaret, %81<br><br>
          💡 Bu 3 müşteri toplam gelirinin <strong>%32</strong>'sini temsil ediyor. Tavsiye programı + öncelikli erişim öner.`
      },
      {
        q: 'Hangi müşteriye ne satmalıyım?',
        a: `Çapraz satış önerileri (alışveriş geçmişi + benzer müşteri patern):<br><br>
          • <strong>Cem Öztürk</strong> → Premium aksesuar (kabul olasılığı %78)<br>
          • <strong>Zeynep Aksoy</strong> → Yaz koleksiyonu mini paket (%71)<br>
          • <strong>Ali Korkmaz</strong> → Yağmurluk + çanta seti (%65)<br>
          • <strong>Elif Şahin</strong> → Sadakat kartı + ilk indirim (%58)<br><br>
          💡 Toplam beklenen ek gelir: ~<strong>3.400₺</strong>`
      },
      {
        q: 'Müşterilerimi segmentlere ayır',
        a: `8 müşterini davranışa göre <strong>4 segmente</strong> ayırdım:<br><br>
          👑 <strong>VIP (1):</strong> Cem — düşük indirim duyarlılığı, yüksek harcama<br>
          💚 <strong>Sadık (2):</strong> Ayşe Kara, Ali — düzenli, indirim bağımsız<br>
          💛 <strong>Düzenli (2):</strong> Zeynep, Elif — indirim duyarlı, büyütme potansiyeli<br>
          🔴 <strong>Kayıp Risk (3):</strong> Mehmet, Selim, Fatma — acil aksiyon gerek<br><br>
          💡 Her segment için farklı iletişim stratejisi öneriyorum. Detay ister misin?`
      }
    ]
  },
  {
    id: 'message',
    label: 'Mesaj Asistanı',
    iconEmoji: '✉️',
    color: '#ff6b35',
    description: 'WhatsApp/SMS için kişiselleştirilmiş mesajlar üretir. Ton ve uzunluk seçilebilir.',
    prompts: [
      {
        q: 'Mehmet\'e tahsilat hatırlatma yaz (yumuşak)',
        a: `<div style="background: rgba(0,200,150,0.06); padding: 14px; border-radius: 10px; white-space: pre-line; font-size: 13.5px; line-height: 1.6;">Merhaba Mehmet Bey 👋

Umarım iyisinizdir. Geçen ay aldığınız ürünlerin 3.500₺ tutarındaki ödemesinin vadesi 4 Mayıs'ta dolmuştu. Belki gözden kaçtı diye hatırlatmak istedim.

Dilerseniz tek tıkla buradan ödeyebilirsiniz: [link]

Sorularınız olursa hemen yazın.

İyi günler,
Ayşe — Ayşe'nin Butiği</div>
          <br>
          <em style="color:var(--odeal-muted); font-size:12px;">Ton: yumuşak-hatırlatıcı · Tahmini açılma: %87 · WhatsApp uygun</em>`
      },
      {
        q: 'VIP müşteriye teşekkür mesajı',
        a: `<div style="background: rgba(0,200,150,0.06); padding: 14px; border-radius: 10px; white-space: pre-line; font-size: 13.5px; line-height: 1.6;">Sevgili Cem Bey 👑

Bu yıl 18'inci kez bizi tercih ettiniz — çok minnettarız!

Sizi VIP listemize ekliyoruz: yeni sezon ürünlerimize 24 saat erken erişim + her alışverişte %5 sürpriz indirim. Hiçbir şey yapmanıza gerek yok, otomatik aktif.

Bir kahve içmeye buyurun, evden bekleriz ☕

Ayşe</div>
          <br>
          <em style="color:var(--odeal-muted); font-size:12px;">Ton: samimi-ödüllendirici · Tahmini etki: tekrar ziyaret +%34</em>`
      },
      {
        q: 'Kayıp müşteriye geri dönüş daveti',
        a: `<div style="background: rgba(0,200,150,0.06); padding: 14px; border-radius: 10px; white-space: pre-line; font-size: 13.5px; line-height: 1.6;">Merhaba Selim Bey 🌷

Bir aydır sizi göremedik, umarım her şey yolundadır!

Yeni sezon ürünlerimize sizin için <strong>%15 özel indirim</strong> ayırdım — sadece bu hafta geçerli. Kullanmak için bu mesajı gösterip uğramanız yeterli.

Sizi yeniden görmek isterim,
Ayşe</div>
          <br>
          <em style="color:var(--odeal-muted); font-size:12px;">Ton: sıcak-davetkâr · Geri kazanma olasılığı: %42</em>`
      },
      {
        q: 'Cuma kampanya duyurusu (toplu)',
        a: `<div style="background: rgba(0,200,150,0.06); padding: 14px; border-radius: 10px; white-space: pre-line; font-size: 13.5px; line-height: 1.6;">{Ad} Hanım/Bey 🌙

Bu Cuma Ayşe'nin Butiği'nde özel akşam: <strong>18:00-22:00 arası tüm ürünlerde %15 indirim</strong>!

Yağmurlu hava için yeni gelen yağmurluklarımıza özellikle bakmanızı öneririm 🌧️

Görüşmek üzere,
Ayşe</div>
          <br>
          <em style="color:var(--odeal-muted); font-size:12px;">Ton: enerjik-kısa · Hedef: 47 müşteri · Tahmini geri dönüş: ~6.500₺</em>`
      }
    ]
  },
  {
    id: 'campaign',
    label: 'Kampanya Stüdyosu',
    iconEmoji: '🎯',
    color: '#ec4899',
    description: 'Hedef segment, mesaj ve zamanlama önerir. AI, geçmiş kampanya verisinden öğrenir.',
    prompts: [
      {
        q: 'Cuma akşamı için kampanya öner',
        a: `<strong>📅 Kampanya: Cuma Akşamı Trafik</strong><br><br>
          🎯 <strong>Hedef:</strong> Düzenli + Sadık (47 müşteri)<br>
          🎁 <strong>Teklif:</strong> 18:00-22:00 arası %15 indirim<br>
          💬 <strong>Kanal:</strong> WhatsApp (Cuma 14:00 gönder)<br>
          🌧️ <strong>Bonus tetikleyici:</strong> Yağmur tahmini → dış giyim ön plana çıkar<br><br>
          📊 <strong>Tahmini sonuç:</strong><br>
          • Yanıt oranı: %38<br>
          • Mağazaya gelen: ~18 müşteri<br>
          • Ek gelir: <strong>~6.500₺</strong><br>
          • ROI: %1300 (mesaj maliyeti yok)<br><br>
          💡 <em>Aktif et?</em>`
      },
      {
        q: 'Kayıp müşterileri geri kazan',
        a: `<strong>📅 Kampanya: Geri Hoşgeldin</strong><br><br>
          🎯 <strong>Hedef:</strong> 30+ gündür yok (Mehmet, Selim, Fatma + 2 daha)<br>
          🎁 <strong>Teklif:</strong> Kişiye özel %15-25 indirim (sadakat skoruna göre)<br>
          💬 <strong>Kanal:</strong> WhatsApp + SMS (yedek)<br>
          📅 <strong>Akış:</strong><br>
          1. Gün: kişisel mesaj (samimi ton)<br>
          4. Gün: kullanmadıysa hatırlatma<br>
          7. Gün: son fırsat + ek %5<br><br>
          📊 <strong>Tahmin:</strong> %42 geri dönüş = ~2 müşteri × 600₺ = <strong>1.200₺</strong> ek gelir<br><br>
          💡 LTV korumasi: bu müşteriler kalırsa yıllık ~28.000₺.`
      },
      {
        q: 'Yeni müşteri çekme kampanyası',
        a: `<strong>📅 Kampanya: Komşu Davet</strong><br><br>
          🎯 <strong>Yöntem:</strong> Mevcut müşterilerin tavsiyesi<br>
          🎁 <strong>Teklif:</strong> Tavsiye eden +50₺ kupon, gelen +%20 indirim<br>
          💬 <strong>Kanal:</strong> WhatsApp + sosyal medya story<br>
          👥 <strong>Tetikleyici:</strong> VIP + Sadık 3 müşteri (en yüksek tavsiye potansiyeli)<br><br>
          📊 <strong>Tahmini sonuç (4 hafta):</strong><br>
          • Tavsiye gönderimi: ~12<br>
          • Gelen yeni müşteri: 3-5<br>
          • Maliyet: ~150₺ kupon + %20 indirim<br>
          • Tahmini LTV: <strong>2.400-4.000₺</strong>`
      },
      {
        q: 'Doğum günü kampanyası kur',
        a: `<strong>📅 Kampanya: Doğum Günü Hediyesi (otomatik)</strong><br><br>
          🤖 <strong>Tetikleyici:</strong> Müşteri profili → doğum günü tarihi<br>
          🎁 <strong>Teklif:</strong> %20 indirim + ücretsiz hediye paketi<br>
          📅 <strong>Zamanlama:</strong> 7 gün önce + doğum günü sabahı<br>
          💬 <strong>Kanal:</strong> WhatsApp (kişisel ton)<br><br>
          📊 <strong>Yıllık tahmin:</strong><br>
          • Tetiklenecek müşteri: 8 × 12 ay = 96 fırsat<br>
          • Ortalama dönüşüm: %58<br>
          • Ek gelir: <strong>~22.400₺/yıl</strong><br><br>
          ✨ Bir kez kur, sonsuza dek otomatik.`
      }
    ]
  },
  {
    id: 'insight',
    label: 'İçgörü Üreticisi',
    iconEmoji: '💡',
    color: '#a855f7',
    description: 'Verinizdeki gizli paternleri, anomali ve fırsatları yakalar. Sürekli arka planda çalışır.',
    prompts: [
      {
        q: 'Bu hafta dikkat etmem gereken ne?',
        a: `<strong>🚨 Bu hafta için 3 önemli sinyal:</strong><br><br>
          1. <strong>Cuma anomalisi:</strong> Son 4 Cuma satışların ortalamadan %23 yüksek — kampanyayla bu farkı %35'e çıkarabilirsin.<br><br>
          2. <strong>Mehmet Tan kritik dönem:</strong> Geçen yıl bu tarihte 3 alışveriş yaptı, bu yıl 0. Tarihsel patern + duygu skoru → kalıcı kayıp riski %71.<br><br>
          3. <strong>Yağmur etkisi:</strong> 11-13 Mayıs hava tahmini yağmurlu. Geçmiş veride yağmurlu günlerde dış giyim satışı +%31.`
      },
      {
        q: 'Beklenmedik trend var mı?',
        a: `<strong>🔍 3 ilginç patern buldum:</strong><br><br>
          • <strong>Salı saat 14:00 zirvesi:</strong> Geçen 6 ay verinde Salı 14:00-15:00 arası satışların ortalamanın %18 üstünde. Sebep belirsiz — belki öğle arası ofislerden? <em>Bu saatler için özel teklif test edilebilir.</em><br><br>
          • <strong>Aksesuar + Çanta beraber:</strong> Çanta alanların %67'si aksesuar da alıyor (sektör %42). Bu güçlü cross-sell sinyali.<br><br>
          • <strong>Zeynep'in patern bozması:</strong> 3 aydır her ayın başı geliyordu, bu ay gelmedi. Sebebi araştırmaya değer — kişisel mesaj?`
      },
      {
        q: 'Rakiplerime göre nerede iyi/kötüyüm?',
        a: `<strong>📊 Bölgenizdeki 3 benzer butik (anonim) ile karşılaştırma:</strong><br><br>
          ✅ <strong>Üstte olduğun:</strong><br>
          • Ortalama sepet: 425₺ (rakip ort. 380₺) — <em>+%12</em><br>
          • Tekrar ziyaret oranı: %47 (rakip %38) — <em>+%24</em><br>
          • Müşteri başı yıllık değer: 5.800₺ (rakip 4.700₺)<br><br>
          ⚠️ <strong>Geride olduğun:</strong><br>
          • Cuma akşamı yoğunluk: 16 müşteri/saat (rakip 24)<br>
          • Sosyal medya görünürlüğü: ~%40 daha düşük<br><br>
          💡 <strong>Önerim:</strong> Cuma kampanyasıyla bu fark kapatılabilir — diğer her şey iyi.`
      },
      {
        q: 'Sıradaki büyüme adımım ne olmalı?',
        a: `<strong>🚀 Veri odaklı 3 büyüme önerisi (etki sırasıyla):</strong><br><br>
          <strong>1. Sadakat programı kur</strong> (yüksek etki)<br>
          • Mevcut Top-3 müşterin gelirinin %32'sini getiriyor<br>
          • Sadakat puanı sistemi → tekrar ziyaret +%18 tahmini<br>
          • 6 aylık ek gelir: <strong>~38.000₺</strong><br><br>
          <strong>2. Cuma akşamı düzenli etkinlik</strong> (orta etki)<br>
          • Boş kapasite var, müşteri var, talep var<br>
          • Aylık ek gelir: <strong>~12.000₺</strong><br><br>
          <strong>3. Komşu butikle çapraz tavsiye</strong> (düşük risk)<br>
          • Aksesuar/çanta gibi tamamlayıcı müşteri trafiği<br>
          • Maliyet düşük, dene-gör.`
      }
    ]
  }
];

// ============= INIT =============
document.addEventListener('DOMContentLoaded', init);

function init() {
  loadState();
  applyThemeOnLoad();
  renderSidebarBusiness();
  buildSidebar();
  buildTopbarRight();
  bindGlobalEvents();
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  navigate(hash);
}

// ============= SIDEBAR BUSINESS DISPLAY =============
function renderSidebarBusiness() {
  const host = document.getElementById('sidebar-business');
  if (!host) return;
  const s = currentScope();
  if (!s.patron) return;

  if (s.isPatron) {
    host.innerHTML = `
      <div class="sidebar-business-avatar" style="background: linear-gradient(135deg, ${s.patron.color}, ${s.patron.color}aa);">${s.patron.avatar}</div>
      <div style="min-width: 0; flex: 1;">
        <div class="sidebar-business-name">${s.patron.fullName}</div>
        <div class="sidebar-business-meta">${s.patron.businessIds.length} bayi <span class="scope-mode-badge patron">PATRON</span></div>
      </div>
    `;
  } else {
    const sec = SECTORS[s.business.sector];
    host.innerHTML = `
      <div class="sidebar-business-avatar" style="background: linear-gradient(135deg, ${s.patron.color}, ${s.patron.color}aa);">${sec.icon}</div>
      <div style="min-width: 0; flex: 1;">
        <div class="sidebar-business-name">${s.business.shortName}</div>
        <div class="sidebar-business-meta">${sec.label} · ${s.business.location} <span class="scope-mode-badge kobi">KOBİ</span></div>
      </div>
    `;
  }
}

// ============= SCOPE MODAL =============
function openScopeModal() {
  const modal = document.getElementById('scope-modal');
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  renderPatronGrid();
}

function closeScopeModal() {
  const modal = document.getElementById('scope-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function renderPatronGrid() {
  const body = document.getElementById('scope-modal-body');
  if (!body) return;
  body.innerHTML = `
    <div class="modal-step-title">5 Patron · Tek tıkla geç</div>
    <div class="patron-grid">
      ${PATRONS.map(p => `
        <button class="patron-card" onclick="renderPatronDetail('${p.id}')" style="--patron-color: ${p.color};">
          <div class="patron-card-avatar">${p.avatar}</div>
          <div class="patron-card-name">${p.fullName}</div>
          <div class="patron-card-meta">${p.note}</div>
          <div class="patron-card-bio">${p.bio}</div>
        </button>
      `).join('')}
    </div>
  `;
}

function renderPatronDetail(patronId) {
  const p = PATRONS.find(x => x.id === patronId);
  if (!p) return;
  const body = document.getElementById('scope-modal-body');
  if (!body) return;
  const businesses = p.businessIds.map(id => BUSINESSES[id]);
  body.innerHTML = `
    <button class="modal-back-btn" onclick="renderPatronGrid()">← Tüm patronlar</button>

    <div class="patron-detail-header" style="--patron-color: ${p.color};">
      <div style="font-size: 36px;">${p.avatar}</div>
      <div style="flex: 1;">
        <div style="font-size: 18px; font-weight: 700;">${p.fullName}</div>
        <div style="font-size: 12.5px; color: var(--odeal-muted); margin-top: 2px;">${p.bio}</div>
      </div>
    </div>

    <button class="patron-mode-btn" onclick="enterPatronMode('${p.id}')" style="--patron-color: ${p.color};">
      <div class="patron-mode-btn-icon">👁️</div>
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 14.5px;">Tüm bayilerimi görüntüle</div>
        <div style="font-size: 12px; color: var(--odeal-muted); margin-top: 2px;">${p.businessIds.length} bayi · Patron modu · Birleşik görüntü</div>
      </div>
      <span style="color: var(--patron-color); font-size: 18px;">→</span>
    </button>

    <div class="scope-divider">VEYA TEK BAYİ SEÇ</div>

    <div class="business-list" style="--patron-color: ${p.color};">
      ${businesses.map(b => {
        const sec = SECTORS[b.sector];
        return `
          <button class="business-row" onclick="enterBusinessMode('${p.id}', '${b.id}')" style="--patron-color: ${p.color};">
            <div class="business-row-icon">${sec.icon}</div>
            <div style="flex: 1; min-width: 0;">
              <div class="business-row-name">${b.shortName}</div>
              <div class="business-row-meta">${sec.label} · ${b.location} · ortalama aylık ${b.baseMonthly.toLocaleString('tr-TR')}₺</div>
            </div>
            <span class="business-row-arrow">→</span>
          </button>
        `;
      }).join('')}
    </div>
  `;
}

function enterPatronMode(patronId) {
  APP.state.currentPatronId = patronId;
  APP.state.currentBusinessId = null;
  APP.state.isPatronMode = true;
  saveScope();
  closeScopeModal();
  renderSidebarBusiness();
  const p = PATRONS.find(x => x.id === patronId);
  showToast(`👁️ ${p.fullName} · Patron Modu (${p.businessIds.length} bayi)`, 'success');
  // AI history sıfırla — yeni scope, yeni context
  APP.state.aiHistory = [];
  navigate(APP.state.view);
}

function enterBusinessMode(patronId, businessId) {
  APP.state.currentPatronId = patronId;
  APP.state.currentBusinessId = businessId;
  APP.state.isPatronMode = false;
  saveScope();
  closeScopeModal();
  renderSidebarBusiness();
  const b = BUSINESSES[businessId];
  showToast(`🏪 ${b.shortName}'na geçildi`, 'success');
  APP.state.aiHistory = [];
  navigate(APP.state.view);
}

function loadState() {
  APP.state.plan = localStorage.getItem('odeal_plan') || 'free';
  // Scope state
  const savedScope = localStorage.getItem('odeal_scope');
  if (savedScope) {
    try {
      const s = JSON.parse(savedScope);
      if (s.currentPatronId && PATRONS && PATRONS.find(p => p.id === s.currentPatronId)) {
        APP.state.currentPatronId = s.currentPatronId;
        APP.state.currentBusinessId = s.currentBusinessId;
        APP.state.isPatronMode = !!s.isPatronMode;
      }
    } catch(e) {}
  }
}

function savePlan() {
  localStorage.setItem('odeal_plan', APP.state.plan);
}

function saveScope() {
  localStorage.setItem('odeal_scope', JSON.stringify({
    currentPatronId: APP.state.currentPatronId,
    currentBusinessId: APP.state.currentBusinessId,
    isPatronMode: APP.state.isPatronMode
  }));
}

// ============= SCOPE HELPERS =============
function currentScope() {
  return {
    patronId: APP.state.currentPatronId,
    businessId: APP.state.currentBusinessId,
    isPatron: APP.state.isPatronMode,
    patron: PATRONS.find(p => p.id === APP.state.currentPatronId),
    business: APP.state.currentBusinessId ? BUSINESSES[APP.state.currentBusinessId] : null
  };
}

function scopeLabel() {
  const s = currentScope();
  if (!s.patron) return '';
  if (s.isPatron) return `${s.patron.fullName} · Patron Modu`;
  return s.business ? s.business.shortName : s.patron.fullName;
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
  buildModulesSection();
  buildPlanToggle();
  updateActiveNav();
}

function buildModulesSection() {
  const host = document.getElementById('sidebar-modules');
  if (!host) return;
  host.innerHTML = `
    <div class="sidebar-section" style="display: flex; align-items: center; gap: 6px;">
      <span>AI Modülleri</span>
      <span style="font-size: 9px; padding: 1px 6px; border-radius: 4px; background: rgba(255,107,53,0.15); color: var(--odeal-accent); font-weight: 700; letter-spacing: 0.5px;">YENİ</span>
    </div>
    ${AI_MODULES.map(m => `
      <button class="nav-item module-nav-item" data-view="module-${m.id}" onclick="navigate('module-${m.id}')" style="--mod-color: ${m.color};">
        <span class="nav-item-icon module-emoji">${m.iconEmoji}</span>
        <span class="nav-item-text">${m.label}</span>
      </button>
    `).join('')}
  `;
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
        <button class="plan-toggle-btn pro ${plan==='pro'?'active':''}" onclick="setPlan('pro')">POS Pro+</button>
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
  showToast(p === 'pro' ? '✨ POS Pro+ açıldı — tüm özellikler kullanıma hazır' : 'Standart moduna geçildi', p === 'pro' ? 'success' : 'info');
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

  // AI Module rota: module-<id>
  if (view.startsWith('module-')) {
    const moduleId = view.slice('module-'.length);
    renderModule(moduleId);
    updateActiveNav();
    return;
  }

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

// ============= SCOPE-AWARE STATS & CASHFLOW =============
function getScopedStats() {
  const s = currentScope();
  if (!s.patron) return null;
  if (s.isPatron) {
    let today = 0, last2 = 0, last7 = 0, last30 = 0, openInvoices = 0, openTotal = 0, customers = 0, staff = 0;
    s.patron.businessIds.forEach(bid => {
      const b = BUSINESSES[bid];
      today += estimateLastNDays(bid, 1);
      last2 += estimateLastNDays(bid, 2);
      last7 += estimateLastNDays(bid, 7);
      last30 += estimateLastNDays(bid, 30);
      openTotal += Math.round(b.baseMonthly * 0.06);
      openInvoices += 3;
      customers += b.customers;
      staff += b.staffCount;
    });
    return { today, yesterday: last2 - today, last7, last30, openInvoices, openTotal, customers, staff };
  }
  const b = s.business;
  const today = estimateLastNDays(b.id, 1);
  const last2 = estimateLastNDays(b.id, 2);
  return {
    today,
    yesterday: last2 - today,
    last7: estimateLastNDays(b.id, 7),
    last30: estimateLastNDays(b.id, 30),
    openInvoices: 3,
    openTotal: Math.round(b.baseMonthly * 0.06),
    customers: b.customers,
    staff: b.staffCount
  };
}

function getScopedCashFlow() {
  const s = currentScope();
  const labels = [];
  const actual = [];
  const predicted = [];
  const today = new Date();
  const seedBase = (s.businessId || s.patronId) + (s.isPatron ? '-pat' : '');

  // 30 gün geçmiş
  for (let i = 30; i >= 1; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
    const y = d.getFullYear(), m = d.getMonth() + 1;
    const monthlyRev = s.isPatron ? getPatronRevenue(s.patronId, y, m) : getMonthlyRevenue(s.businessId, y, m);
    const daysInMonth = new Date(y, m, 0).getDate();
    const seed = simpleHash(seedBase + d.toISOString().slice(0, 10));
    const variance = ((seed % 220) - 110) / 1000;
    actual.push(Math.round((monthlyRev / daysInMonth) * (1 + variance)));
    predicted.push(null);
  }
  // Bugün — köprü noktası
  predicted[predicted.length - 1] = actual[actual.length - 1];

  // 30 gün gelecek
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
    const y = d.getFullYear(), m = d.getMonth() + 1;
    const monthlyRev = s.isPatron ? getPatronRevenue(s.patronId, y, m) : getMonthlyRevenue(s.businessId, y, m);
    const daysInMonth = new Date(y, m, 0).getDate();
    const seed = simpleHash(seedBase + 'p' + d.toISOString().slice(0, 10));
    const variance = ((seed % 280) - 140) / 1000;
    actual.push(null);
    predicted.push(Math.round((monthlyRev / daysInMonth) * (1 + variance)));
  }
  return { labels, actual, predicted };
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

// ============= VIEW: DASHBOARD (ANA SAYFA) =============
function renderDashboard() {
  const s = currentScope();
  const stats = getScopedStats();
  const cashflowScoped = getScopedCashFlow();

  const greeting = s.isPatron
    ? `${s.patron.fullName} · ${s.patron.businessIds.length} bayi birleşik`
    : `${s.business.shortName} · ${SECTORS[s.business.sector].label} · ${s.business.location}`;
  setTopbarTitle('Ana Sayfa', greeting);
  clearChart('cashflow');

  const todayDelta = stats.yesterday > 0 ? ((stats.today / stats.yesterday) - 1) * 100 : 0;
  const last7Avg = Math.round(stats.last7 / 7);
  const last30Avg = Math.round(stats.last30 / 30);

  // Dinamik widget B içeriği — scope'a göre değişir
  let widgetB = '';
  if (s.isPatron) {
    // Patron modu: bayi özeti
    const ranked = s.patron.businessIds.map(bid => ({
      b: BUSINESSES[bid],
      last30: estimateLastNDays(bid, 30)
    })).sort((a, b) => b.last30 - a.last30);
    widgetB = `
      <div class="app-card">
        <div class="app-card-header">
          <div>
            <div class="app-card-title">Bayilerim — 30 gün performansı</div>
            <div style="font-size: 11px; color: var(--odeal-muted); margin-top: 2px;">En iyi → en zayıf</div>
          </div>
          <span class="badge badge-accent">${s.patron.businessIds.length} bayi</span>
        </div>
        <div class="app-card-body" style="padding: 0;">
          <table class="app-table">
            <tbody>
              ${ranked.map((r, i) => {
                const sec = SECTORS[r.b.sector];
                return `
                  <tr onclick="enterBusinessMode('${s.patron.id}', '${r.b.id}')">
                    <td style="width: 32px; text-align: center; font-size: 16px;">${sec.icon}</td>
                    <td>
                      <div style="font-weight: 600;">${r.b.shortName}</div>
                      <div style="font-size: 11px; color: var(--odeal-muted);">${sec.label} · ${r.b.location}</div>
                    </td>
                    <td style="text-align: right; font-weight: 600;">${fmtTL(r.last30)}</td>
                    <td style="text-align: right; font-size: 11px; color: var(--odeal-muted);">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '🏅'}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (s.businessId === 'ayse-butik-kadikoy') {
    // Ayşe Kadıköy — özel risky customers widget'ı
    widgetB = `
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
    `;
  } else {
    // Diğer KOBİ'ler için işletme analizi widget
    const sec = SECTORS[s.business.sector];
    widgetB = `
      <div class="app-card">
        <div class="app-card-header">
          <div>
            <div class="app-card-title">İşletme analizi</div>
            <div style="font-size: 11px; color: var(--odeal-muted); margin-top: 2px;">${sec.label} sektörü için sezon ve hava etkileri</div>
          </div>
        </div>
        <div class="app-card-body">
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; padding: 10px 12px; background: rgba(255,255,255,0.02); border-radius: 8px;">
              <span style="color: var(--odeal-muted); font-size: 13px;">Top ürün</span>
              <strong>${s.business.topProduct}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 12px; background: rgba(255,255,255,0.02); border-radius: 8px;">
              <span style="color: var(--odeal-muted); font-size: 13px;">Personel</span>
              <strong>${s.business.staffCount} kişi</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 12px; background: rgba(255,255,255,0.02); border-radius: 8px;">
              <span style="color: var(--odeal-muted); font-size: 13px;">Müşteri</span>
              <strong>${s.business.customers.toLocaleString('tr-TR')}</strong>
            </div>
            <div style="padding: 12px; background: rgba(255,107,53,0.06); border: 1px solid rgba(255,107,53,0.2); border-radius: 8px;">
              <div style="font-size: 11px; color: var(--odeal-accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px;">🌦️ Hava etkisi</div>
              <div style="font-size: 12.5px; line-height: 1.5;">
                Yağmur: <strong style="color:${sec.weatherImpact.yağmurlu >= 0 ? '#00c896' : '#f87171'}">${sec.weatherImpact.yağmurlu > 0 ? '+' : ''}${sec.weatherImpact.yağmurlu}%</strong> ·
                Soğuk: <strong style="color:${sec.weatherImpact.soğuk >= 0 ? '#00c896' : '#f87171'}">${sec.weatherImpact.soğuk > 0 ? '+' : ''}${sec.weatherImpact.soğuk}%</strong> ·
                Sıcak: <strong style="color:${sec.weatherImpact.sıcak >= 0 ? '#00c896' : '#f87171'}">${sec.weatherImpact.sıcak > 0 ? '+' : ''}${sec.weatherImpact.sıcak}%</strong>
              </div>
              <div style="font-size: 11.5px; color: var(--odeal-muted); margin-top: 6px; line-height: 1.5;">${sec.impactNote}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Bugün ne yapayım — sadece Ayşe Kadıköy için tam liste, diğerleri için generic
  const showActionList = s.businessId === 'ayse-butik-kadikoy' && !s.isPatron;
  const actionWidget = showActionList ? `
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
  ` : `
      <div class="app-card" style="grid-column: span 1;">
        <div class="app-card-header">
          <div>
            <div class="app-card-title">${s.isPatron ? 'Patron için günün özeti' : 'Bu işletme için bugün'}</div>
            <div style="font-size: 11px; color: var(--odeal-muted); margin-top: 2px;">AI Asistan'a sor, scope'a göre cevaplar</div>
          </div>
        </div>
        <div class="app-card-body" style="display: flex; flex-direction: column; gap: 10px;">
          <div class="action-item"><span class="action-item-icon">💰</span><div class="action-item-body"><div class="action-item-text">Bugünkü tahmini ciron <strong>${fmtTL(stats.today)}</strong> — ${todayDelta >= 0 ? 'düne göre artış' : 'düne göre düşüş'} (${todayDelta >= 0 ? '+' : ''}${todayDelta.toFixed(1)}%).</div><button class="btn btn-sm btn-accent" onclick="askChatFree('Bugün ne yapayım?')">AI'a sor</button></div></div>
          <div class="action-item"><span class="action-item-icon">📊</span><div class="action-item-body"><div class="action-item-text">Son 30 günün ortalama günlük cirosu <strong>${fmtTL(last30Avg)}</strong>. Trendinizi inceleyebilirim.</div><button class="btn btn-sm btn-accent" onclick="askChatFree('Son 30 gün performansım nasıl?')">Analiz et</button></div></div>
          <div class="action-item"><span class="action-item-icon">📨</span><div class="action-item-body"><div class="action-item-text">${stats.openInvoices} açık tahsilat var, toplam <strong>${fmtTL(stats.openTotal)}</strong>.</div><button class="btn btn-sm btn-accent" onclick="navigate('payments')">Tahsilata git</button></div></div>
          <div class="action-item"><span class="action-item-icon">🌦️</span><div class="action-item-body"><div class="action-item-text">${s.isPatron ? 'Hava etkisi bayilerin için farklı — analiz isteyebilirsin.' : `Yağmurlu hava bu sektörü ${SECTORS[s.business.sector].weatherImpact.yağmurlu >= 0 ? '+' : ''}${SECTORS[s.business.sector].weatherImpact.yağmurlu}% etkiliyor.`}</div><button class="btn btn-sm btn-accent" onclick="askChatFree('Yağmurlu hava nasıl etkiler?')">Detay</button></div></div>
        </div>
      </div>
  `;

  $view().innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-card-label">Bugünkü tahmini ciro</div>
        <div class="stat-card-value">${fmtTL(stats.today)}</div>
        <div class="stat-card-delta ${todayDelta >= 0 ? 'positive' : 'negative'}">
          ${todayDelta >= 0 ? '↑' : '↓'} %${Math.abs(todayDelta).toFixed(1)} düne göre
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Son 7 gün</div>
        <div class="stat-card-value">${fmtTL(stats.last7)}</div>
        <div class="stat-card-delta neutral">Günlük ort. ${fmtTL(last7Avg)}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Son 30 gün</div>
        <div class="stat-card-value">${fmtTL(stats.last30)}</div>
        <div class="stat-card-delta neutral">Günlük ort. ${fmtTL(last30Avg)}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Açık tahsilat</div>
        <div class="stat-card-value">${fmtTL(stats.openTotal)}</div>
        <div class="stat-card-delta negative">${stats.openInvoices} fatura</div>
      </div>
    </div>

    <div class="app-grid-2">
      ${actionWidget}
      ${widgetB}
    </div>

    <div class="app-card" style="margin-top: 14px;">
      <div class="app-card-header">
        <div>
          <div class="app-card-title">Nakit akışı · 60 gün</div>
          <div style="font-size: 11px; color: var(--odeal-muted); margin-top: 2px;">Son 30 gün günlük + 30 gün AI tahmini</div>
        </div>
        <span class="badge badge-info">${s.isPatron ? `${s.patron.businessIds.length} bayi birleşik` : SECTORS[s.business.sector].label}</span>
      </div>
      <div class="app-card-body">
        <div style="height: 280px; position: relative;">
          <canvas id="dash-cashflow"></canvas>
        </div>
      </div>
    </div>

    <div class="app-card" style="margin-top: 14px;">
      <div class="app-card-header">
        <div>
          <div class="app-card-title">İşletmene sor — AI Asistan</div>
          <div style="font-size: 11px; color: var(--odeal-muted); margin-top: 2px;">${APP.state.plan === 'pro' ? 'Sınırsız sorgu' : `${APP.state.aiQueriesUsed}/${APP.state.aiQuotaFree} sorgu kullanıldı`}</div>
        </div>
        <button class="btn btn-sm btn-outline" onclick="navigate('ai')">Asistan'ı aç →</button>
      </div>
      <div class="app-card-body" style="display: flex; flex-wrap: wrap; gap: 8px;">
        <button class="chat-suggestion-chip" style="flex: 0 0 auto; width: auto;" onclick="askChatFree('Son 25 günün cirom ne kadar?')">Son 25 gün ciro?</button>
        <button class="chat-suggestion-chip" style="flex: 0 0 auto; width: auto;" onclick="askChatFree('Mayıs 2024 cirom ne kadar?')">Mayıs 2024 ciro?</button>
        <button class="chat-suggestion-chip" style="flex: 0 0 auto; width: auto;" onclick="askChatFree('En iyi ayım hangisi?')">En iyi ay?</button>
        ${s.isPatron ? `<button class="chat-suggestion-chip" style="flex: 0 0 auto; width: auto;" onclick="askChatFree('Bayilerimi karşılaştır')">Bayilerimi kıyasla</button>` : ''}
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
        labels: cashflowScoped.labels,
        datasets: [
          { label: 'Gerçekleşen', data: cashflowScoped.actual, borderColor: c.actual, backgroundColor: c.actualBg, tension: 0.35, fill: true, pointRadius: 0, pointHoverRadius: 5, borderWidth: 2.5 },
          { label: 'AI Tahmini', data: cashflowScoped.predicted, borderColor: c.predicted, backgroundColor: c.predictedBg, borderDash: [6,4], tension: 0.35, fill: true, pointRadius: 0, pointHoverRadius: 5, borderWidth: 2.5 }
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
      <div class="app-card" style="margin-top: 14px;" id="msg-draft-card">
        <div class="app-card-header">
          <div>
            <div class="app-card-title">📨 AI'nın hazırladığı hatırlatma mesajı (Mehmet Tan)</div>
            <div style="font-size: 11px; color: var(--odeal-muted); margin-top: 2px;" id="msg-draft-tone">Ton: ${messageDrafts['Mehmet Tan'].tone} · Onayınla gönderilir</div>
          </div>
          <span class="badge badge-info" id="msg-draft-badge">cache</span>
        </div>
        <div class="app-card-body">
          <div id="msg-draft-text" style="background: rgba(0,200,150,0.06); border: 1px solid rgba(0,200,150,0.15); padding: 14px; border-radius: 12px; white-space: pre-line; font-size: 13.5px; line-height: 1.6;">${messageDrafts['Mehmet Tan'].text}</div>

          <div style="margin-top: 14px;">
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--odeal-muted); font-weight: 600; margin-bottom: 8px;">AI ton ayarı (Gemini ile yeniden yaz)</div>
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              <button class="btn btn-sm btn-outline" onclick="rewriteDraftTone('Daha yumuşak ton kullan, anlayışlı yaklaş, suçlayıcı olma')">🌸 Yumuşat</button>
              <button class="btn btn-sm btn-outline" onclick="rewriteDraftTone('Daha sert ve kararlı bir ton, ödemenin gecikmesinin ciddiyeti vurgulansın')">⚡ Sertleştir</button>
              <button class="btn btn-sm btn-outline" onclick="rewriteDraftTone('Daha resmi, profesyonel bir dil kullan')">🎩 Resmi</button>
              <button class="btn btn-sm btn-outline" onclick="rewriteDraftTone('Daha samimi, arkadaşça bir ton, sanki yıllardır tanışıyormuşuz gibi')">💬 Samimi</button>
              <button class="btn btn-sm btn-outline" onclick="rewriteDraftTone('Daha kısa, 3 satırı geçme, doğrudan ol')">✂️ Kısalt</button>
              <button class="btn btn-sm btn-outline" onclick="rewriteDraftTone('Daha detaylı yaz, ödeme yöntemleri ve müşteri ile geçmiş ilişkiyi de anımsat')">📝 Detaylandır</button>
            </div>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.06);">
            <button class="btn btn-sm btn-success" onclick="sendReminder('Mehmet Tan')">${I.check} Onayla & Gönder</button>
            <button class="btn btn-sm btn-outline" onclick="resetDraft()">↻ Orijinal taslağa dön</button>
            <button class="btn btn-sm btn-outline" onclick="showToast('Kopyalandı','success')">📋 Kopyala</button>
          </div>

          <details style="margin-top: 14px;">
            <summary style="cursor: pointer; font-size: 12px; color: var(--odeal-muted); padding: 6px 0;">📋 Mehmet Tan ile geçmiş ilişki ve geri bildirimler</summary>
            <div style="padding: 12px; background: rgba(255,255,255,0.02); border-radius: 8px; margin-top: 8px; font-size: 12.5px; line-height: 1.6;">
              <div style="margin-bottom: 8px;"><strong>📊 Müşteri profili:</strong></div>
              <ul style="margin: 0 0 12px 18px; color: var(--odeal-muted); padding: 0;">
                <li>Yıllık harcama: 12.500₺ (TOP 10'da)</li>
                <li>Önceki 22 ödemesinde 21 zamanında, 1 gecikmiş (bu)</li>
                <li>Son 3 ödemenin ortalama süresi: vadeden 2 gün önce</li>
              </ul>
              <div style="margin-bottom: 8px;"><strong>💬 Son geri bildirimler:</strong></div>
              <ul style="margin: 0 0 12px 18px; padding: 0;">
                <li style="color: #f87171;">"Ürün geç geldi, bu sefer mağdur oldum." — 15 Nisan</li>
                <li style="color: var(--odeal-muted);">"Her zamanki gibi memnun kaldım, teşekkürler." — 8 Mart</li>
                <li style="color: #00c896;">"Ayşe Hanım çok ilgili, 5 yıldız." — 12 Şubat</li>
              </ul>
              <div style="margin-bottom: 8px;"><strong>🤖 AI yorumu:</strong></div>
              <div style="color: var(--odeal-muted);">
                Müşteri normalde sadık ve düzenli ödeme yapıyor. Son şikâyet metninde olumsuz duygu var (sentiment skor: -0.62). Bu gecikme bir <em>tepki</em> olabilir — sert ton riskli, yumuşak başlamak daha akıllı.
              </div>
            </div>
          </details>
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

// AI ton rewriter — Gemini ile mevcut taslağı yeniden yaz
async function rewriteDraftTone(toneInstruction) {
  const textEl = document.getElementById('msg-draft-text');
  const badgeEl = document.getElementById('msg-draft-badge');
  const toneEl = document.getElementById('msg-draft-tone');
  if (!textEl) return;

  const original = textEl.textContent;
  const previousHtml = textEl.innerHTML;

  // Loading
  badgeEl.textContent = 'Gemini düşünüyor...';
  badgeEl.className = 'badge badge-warning';
  textEl.innerHTML = `<span class="typing-dots"><span></span><span></span><span></span></span> <em style="color:var(--odeal-muted); margin-left:8px; font-size:12px;">Yeniden yazılıyor…</em>`;

  try {
    if (typeof rewriteMessageTone === 'function') {
      const result = await rewriteMessageTone(original, toneInstruction);
      if (result && result.text) {
        // Strip HTML if Gemini gave any
        const cleanText = result.text.replace(/<[^>]+>/g, '').trim();
        textEl.textContent = cleanText;
        if (badgeEl) {
          badgeEl.textContent = '✓ Gemini ile yeniden yazıldı';
          badgeEl.className = 'badge badge-success';
        }
        if (toneEl) toneEl.textContent = `Ton: ${toneInstruction.split(',')[0].toLowerCase()} · Yeniden üretildi`;
        showToast('Mesaj yeniden yazıldı', 'success');
        return;
      }
    }
    // Fallback
    textEl.innerHTML = previousHtml;
    badgeEl.textContent = 'Gemini erişilemedi';
    badgeEl.className = 'badge badge-warning';
    showToast('Gemini şu an erişilemiyor — orijinal mesaj korundu');
  } catch (e) {
    console.warn(e);
    textEl.innerHTML = previousHtml;
    badgeEl.textContent = 'Hata';
    badgeEl.className = 'badge badge-danger';
  }
}

function resetDraft() {
  const textEl = document.getElementById('msg-draft-text');
  const badgeEl = document.getElementById('msg-draft-badge');
  const toneEl = document.getElementById('msg-draft-tone');
  if (textEl && messageDrafts['Mehmet Tan']) {
    textEl.textContent = messageDrafts['Mehmet Tan'].text;
    if (badgeEl) {
      badgeEl.textContent = 'cache';
      badgeEl.className = 'badge badge-info';
    }
    if (toneEl) toneEl.textContent = `Ton: ${messageDrafts['Mehmet Tan'].tone} · Onayınla gönderilir`;
    showToast('Orijinal taslağa döndün');
  }
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
  const s = currentScope();
  const subtitle = s.isPatron
    ? `${s.patron.fullName} · Patron · ${APP.state.plan === 'pro' ? 'Sınırsız' : `${APP.state.aiQueriesUsed}/${APP.state.aiQuotaFree}`}`
    : `${s.business?.shortName || 'KOBİ'} · ${APP.state.plan === 'pro' ? 'Sınırsız' : `${APP.state.aiQueriesUsed}/${APP.state.aiQuotaFree}`}`;
  setTopbarTitle('AI Asistan', subtitle);

  // İlk mesaj scope'a göre değişir
  const welcomeMsg = s.isPatron
    ? `Merhaba ${s.patron.fullName}! 👋<br><br>Şu an <strong>Patron Modu</strong>'ndasın — <strong>${s.patron.businessIds.length} bayinin</strong> verisine erişim var. Tüm bayileri kıyasla, belirli bir bayi sor, ay-yıl bazında ciro sor — hepsi mümkün.`
    : `Merhaba 👋<br><br><strong>${s.business.shortName}</strong> verilerin üzerinden cevap veriyorum. Geçmiş ay cirosu, hava etkisi, müşteri analizi — sorabilirsin.`;

  const messages = APP.state.aiHistory.length > 0 ? APP.state.aiHistory : [{ role: 'ai', text: welcomeMsg }];

  // Scope'a göre öneriler
  const suggestions = s.isPatron ? [
    { type: 'free', label: `Mayıs 2024'te toplam ne kadar sattık?` },
    { type: 'free', label: 'Bayilerimi karşılaştır' },
    { type: 'free', label: 'En iyi ayım hangisi?' },
    { type: 'free', label: `${BUSINESSES[s.patron.businessIds[0]].shortName} Mart 2025 nedir?` },
    { type: 'free', label: 'Yağmurlu hava bayilerimi nasıl etkiler?' },
    { type: 'free', label: 'Toplam personel sayım?' }
  ] : [
    { type: 'free', label: `Mayıs 2024'te ne kadar sattık?` },
    { type: 'free', label: '2024 yıllık ciromuz nedir?' },
    { type: 'free', label: 'En iyi ayım hangisi?' },
    { type: 'free', label: 'Yağmurlu hava nasıl etkiler?' },
    { type: 'free', label: 'En çok satan ürünüm?' },
    { type: 'key', key: 'en-riskli', label: 'En riskli müşterim kim?' }
  ];

  const remaining = APP.state.aiQuotaFree - APP.state.aiQueriesUsed;
  const isPro = APP.state.plan === 'pro';

  $view().innerHTML = `
    <div class="chat-grid">
      <div class="chat-window">
        <div class="chat-messages" id="chat-messages">
          ${messages.map(m => {
            if (m.text === '__TYPING__') {
              return `<div class="chat-msg ai chat-typing">
                <span class="typing-dots"><span></span><span></span><span></span></span>
                <span style="margin-left:8px; font-size:12px; color: var(--odeal-muted);">ÖdeAI düşünüyor…</span>
              </div>`;
            }
            return `<div class="chat-msg ${m.role}">${m.text}</div>`;
          }).join('')}
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
        ${suggestions.map(sg => sg.type === 'key'
          ? `<button class="chat-suggestion-chip" onclick="quickAsk('${sg.key}')">${sg.label}</button>`
          : `<button class="chat-suggestion-chip" onclick="askChatFree('${sg.label.replace(/'/g, "\\'")}')">${sg.label}</button>`
        ).join('')}
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

// Yan paneldeki örnek soruları tetiklemek için
async function askChatFree(text) {
  if (!text) return;
  if (APP.state.view !== 'ai') {
    navigate('ai');
    setTimeout(() => askChatFree(text), 50);
    return;
  }
  await processChat(text);
}

async function sendChat() {
  const input = document.getElementById('chat-input');
  if (!input || !input.value.trim()) return;
  const text = input.value.trim();
  input.value = '';
  await processChat(text);
}

// Asıl chat işleyici — Gemini çağrısı yapar, fallback'e düşer
async function processChat(userText) {
  APP.state.aiHistory.push({ role: 'user', text: userText });
  APP.state.aiHistory.push({ role: 'ai', text: '__TYPING__' });
  APP.state.aiQueriesUsed++;
  renderAI();
  scrollChatToBottom();

  let aiText = null;
  try {
    if (typeof askGemini === 'function') {
      const result = await askGemini(userText);
      if (result && result.text) aiText = result.text;
    }
  } catch (e) {
    console.warn('Gemini çağrısı başarısız:', e);
  }

  // Fallback: scope-aware mock
  if (!aiText) {
    aiText = generateScopeAwareResponse(userText);
  }

  // Replace typing placeholder
  APP.state.aiHistory.pop();
  APP.state.aiHistory.push({ role: 'ai', text: aiText });
  renderAI();
  scrollChatToBottom();
}

function scrollChatToBottom() {
  setTimeout(() => {
    const m = document.getElementById('chat-messages');
    if (m) m.scrollTop = m.scrollHeight;
  }, 50);
}

// ============= SCOPE-AWARE AI CHAT GENERATOR =============
function generateScopeAwareResponse(query) {
  const s = currentScope();
  if (!s.patron) return 'Önce bir hesap seç (sol üstten).';
  const lower = query.toLocaleLowerCase('tr');

  // Selamlama / kısa cevap
  if (lower.match(/^(merhaba|selam|hey|hi|naber)/)) {
    if (s.isPatron) {
      return `Merhaba ${s.patron.fullName} 👋<br><br>Şu an <strong>Patron Modu</strong>'ndasınız — ${s.patron.businessIds.length} bayinizin verisine erişimim var. Hangi bayi veya genel toplam hakkında konuşmak istersiniz?`;
    }
    return `Merhaba 👋<br><br>${s.business.shortName} verilerinize bakıyorum. Sorularınız var mı?`;
  }

  // Ay-yıl pattern + ciro/satış sorgusu
  const monthYear = extractMonthYear(query);
  const isRevenueQuery = lower.match(/(satış|ciro|gelir|hasılat|kazanç|para|kazandık|sattık|yaptık|işlem|hacim)/);
  const isYearlyQuery = lower.match(/(yıllık|yıl boyu|sene|tüm yıl)/) && lower.match(/\b(20\d{2})\b/);

  if (isRevenueQuery && monthYear) {
    return formatRevenueResponse(query, monthYear);
  }

  if (isYearlyQuery) {
    const yearMatch = lower.match(/\b(20\d{2})\b/);
    if (yearMatch) return formatYearlyResponse(parseInt(yearMatch[1]));
  }

  // En iyi/en kötü ay sorgusu
  if (lower.match(/(en iyi ay|hangi ay|en yüksek ay|zirve)/)) {
    return findBestMonth();
  }

  // Hava etkisi
  if (lower.match(/(hava|yağmur|güneş|soğuk|sıcak)/)) {
    return generateWeatherImpactResponse(lower);
  }

  // Bayi karşılaştırma (sadece patron mode)
  if (s.isPatron && lower.match(/(karşılaştır|hangi bayi|en iyi bayi|en kötü bayi|kıyasla)/)) {
    return comparePatronBusinesses();
  }

  // Bayi listesi
  if (s.isPatron && lower.match(/(bayilerim|işletmelerim|hangi bayilerim|kaç bayim)/)) {
    return listPatronBusinesses();
  }

  // Personel sorgusu
  if (lower.match(/(personel|çalışan|kaç kişi)/)) {
    return generateStaffResponse();
  }

  // Müşteri sorgusu
  if (lower.match(/(müşteri sayı|kaç müşteri)/)) {
    return generateCustomerCountResponse();
  }

  // En çok satan
  if (lower.match(/(en çok satan|popüler ürün|hit ürün)/)) {
    return generateTopProductResponse();
  }

  // Genel cevap
  return generateGenericResponse(query);
}

function formatRevenueResponse(query, monthYear) {
  const s = currentScope();
  const targetBusiness = detectBusinessInQuery(query, s.patronId);

  // Patron modu, belirli bayi soruldu
  if (s.isPatron && targetBusiness) {
    const rev = getMonthlyRevenue(targetBusiness.id, monthYear.year, monthYear.month);
    const sec = SECTORS[targetBusiness.sector];
    return `<strong>${targetBusiness.name}</strong> için ${monthYear.label} cirosu:<br><br>
      💰 <strong style="font-size:18px; color:var(--odeal-accent);">${rev.toLocaleString('tr-TR')}₺</strong><br><br>
      ${sec.icon} Sektör: ${sec.label} · 📍 ${targetBusiness.location}<br>
      🗓 Aktif: ${targetBusiness.activeSince}<br><br>
      <em style="color:var(--odeal-muted); font-size:12px;">Bu rakam POS işlem verisi + e-fatura kayıtlarından hesaplandı.</em>`;
  }

  // Patron modu, toplam soruldu
  if (s.isPatron) {
    const total = getPatronRevenue(s.patronId, monthYear.year, monthYear.month);
    const breakdown = s.patron.businessIds.map(bid => {
      const b = BUSINESSES[bid];
      const rev = getMonthlyRevenue(bid, monthYear.year, monthYear.month);
      return { name: b.shortName, rev };
    }).sort((a, b) => b.rev - a.rev);
    return `<strong>${s.patron.fullName}</strong> · ${monthYear.label} toplam ciro:<br><br>
      💰 <strong style="font-size:20px; color:var(--odeal-accent);">${total.toLocaleString('tr-TR')}₺</strong><br><br>
      <strong>Bayi dağılımı:</strong><br>
      ${breakdown.map((b, i) => `${i+1}. ${b.name}: <strong>${b.rev.toLocaleString('tr-TR')}₺</strong>`).join('<br>')}<br><br>
      <em style="color:var(--odeal-muted); font-size:12px;">Belirli bir bayi için sormak istersen ismini yaz.</em>`;
  }

  // KOBİ modu
  const rev = getMonthlyRevenue(s.businessId, monthYear.year, monthYear.month);
  return `<strong>${s.business.shortName}</strong> için ${monthYear.label} cirosu:<br><br>
    💰 <strong style="font-size:20px; color:var(--odeal-accent);">${rev.toLocaleString('tr-TR')}₺</strong><br><br>
    📊 Aylık ortalamanın ${rev > s.business.baseMonthly ? '<span style="color:#00c896;">üzerinde ↑</span>' : '<span style="color:#f87171;">altında ↓</span>'}<br>
    🗓 Sektör: ${SECTORS[s.business.sector].label}`;
}

function formatYearlyResponse(year) {
  const s = currentScope();
  if (s.isPatron) {
    const total = getPatronYearlyRevenue(s.patronId, year);
    return `<strong>${s.patron.fullName}</strong> · ${year} yılı toplam ciro:<br><br>
      💰 <strong style="font-size:20px; color:var(--odeal-accent);">${total.toLocaleString('tr-TR')}₺</strong><br><br>
      ${s.patron.businessIds.length} bayinin yıllık toplamı.`;
  }
  let total = 0;
  for (let m = 1; m <= 12; m++) total += getMonthlyRevenue(s.businessId, year, m);
  return `<strong>${s.business.shortName}</strong> · ${year} yılı toplam:<br><br>
    💰 <strong style="font-size:20px; color:var(--odeal-accent);">${total.toLocaleString('tr-TR')}₺</strong>`;
}

function findBestMonth() {
  const s = currentScope();
  const year = 2025;
  if (s.isPatron) {
    let best = { month: 1, rev: 0 };
    for (let m = 1; m <= 12; m++) {
      const r = getPatronRevenue(s.patronId, year, m);
      if (r > best.rev) best = { month: m, rev: r };
    }
    return `${year} yılında ${s.patron.fullName} için en iyi ay:<br><br>
      🏆 <strong>${MONTHS_TR[best.month]} ${year}</strong> — <strong>${best.rev.toLocaleString('tr-TR')}₺</strong><br><br>
      <em style="color:var(--odeal-muted); font-size:12px;">Sezonsallık + büyüme trendinin birleştiği zirve.</em>`;
  }
  let best = { month: 1, rev: 0 };
  for (let m = 1; m <= 12; m++) {
    const r = getMonthlyRevenue(s.businessId, year, m);
    if (r > best.rev) best = { month: m, rev: r };
  }
  return `${s.business.shortName} için ${year} en iyi ay:<br><br>
    🏆 <strong>${MONTHS_TR[best.month]} ${year}</strong> — <strong>${best.rev.toLocaleString('tr-TR')}₺</strong>`;
}

function generateWeatherImpactResponse(lower) {
  const s = currentScope();
  const weatherType = lower.includes('yağmur') ? 'yağmurlu' :
                      lower.includes('güneş') ? 'güneşli' :
                      lower.includes('soğuk') ? 'soğuk' :
                      lower.includes('sıcak') ? 'sıcak' : 'yağmurlu';

  if (s.isPatron) {
    const items = s.patron.businessIds.map(bid => {
      const b = BUSINESSES[bid];
      const sec = SECTORS[b.sector];
      const impact = sec.weatherImpact[weatherType];
      const sign = impact > 0 ? '↑' : impact < 0 ? '↓' : '→';
      const color = impact > 0 ? '#00c896' : impact < 0 ? '#f87171' : '#94a3b8';
      return { name: b.shortName, sec, impact, sign, color };
    }).sort((a, b) => b.impact - a.impact);

    return `<strong>${weatherType.charAt(0).toLocaleUpperCase('tr') + weatherType.slice(1)} hava</strong> ${s.patron.fullName} bayilerini nasıl etkiler:<br><br>
      ${items.map(it => `
        ${it.sec.icon} <strong>${it.name}</strong>: <span style="color:${it.color}; font-weight:700;">${it.sign} ${Math.abs(it.impact)}%</span><br>
        <span style="font-size:11.5px; color:var(--odeal-muted);">${it.sec.impactNote}</span><br>
      `).join('<br>')}
      <br>💡 <strong>Strateji:</strong> ${weatherType} dönemde ${items[0].name} ön planda, ${items[items.length-1].name} risk altında.`;
  }

  const sec = SECTORS[s.business.sector];
  const impact = sec.weatherImpact[weatherType];
  const sign = impact > 0 ? '↑' : impact < 0 ? '↓' : '→';
  const color = impact > 0 ? '#00c896' : impact < 0 ? '#f87171' : '#94a3b8';
  const expectedRev = Math.round(s.business.baseMonthly * (1 + impact/100) / 30);
  return `<strong>${s.business.shortName}</strong> · ${weatherType} hava etkisi:<br><br>
    📊 Tahmini etki: <span style="color:${color}; font-weight:700; font-size:18px;">${sign} ${Math.abs(impact)}%</span><br>
    💰 Günlük gelir tahmini: ~${expectedRev.toLocaleString('tr-TR')}₺<br><br>
    <em>${sec.impactNote}</em>${impact < -30 ? '<br><br>⚠️ <strong>Yüksek risk:</strong> Önceden tedbir öneriyorum — alternatif kanal/kampanya hazırla.' : ''}`;
}

function comparePatronBusinesses() {
  const s = currentScope();
  if (!s.isPatron) return 'Bu sorgu sadece Patron Modu için anlamlı.';
  const year = 2025, month = 4; // Nisan 2025 referans
  const ranked = s.patron.businessIds.map(bid => {
    const b = BUSINESSES[bid];
    const rev = getMonthlyRevenue(bid, year, month);
    return { b, rev };
  }).sort((a, b) => b.rev - a.rev);
  return `${s.patron.fullName} · Nisan 2025 bayi performansı:<br><br>
    ${ranked.map((it, i) => `
      ${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '🏅'} <strong>${it.b.shortName}</strong> (${SECTORS[it.b.sector].label})<br>
      <span style="color:var(--odeal-muted); font-size:12px;">${it.rev.toLocaleString('tr-TR')}₺ · ${it.b.location}</span><br>
    `).join('<br>')}
    <br>💡 <strong>Önerim:</strong> ${ranked[0].b.shortName} en güçlü, oradaki başarılı taktikleri ${ranked[ranked.length-1].b.shortName}'na uyarlayabilirsin.`;
}

function listPatronBusinesses() {
  const s = currentScope();
  if (!s.isPatron) return `Şu an sadece <strong>${s.business.shortName}</strong> verisini görüyorsun. Tüm bayilerini görmek için sol üstten Patron moduna geç.`;
  return `<strong>${s.patron.fullName}</strong> · ${s.patron.businessIds.length} bayi:<br><br>
    ${s.patron.businessIds.map(bid => {
      const b = BUSINESSES[bid];
      const sec = SECTORS[b.sector];
      return `${sec.icon} <strong>${b.shortName}</strong> — ${sec.label}, ${b.location}<br><span style="color:var(--odeal-muted); font-size:11.5px;">Aktif: ${b.activeSince} · Aylık ort.: ${b.baseMonthly.toLocaleString('tr-TR')}₺</span>`;
    }).join('<br><br>')}`;
}

function generateStaffResponse() {
  const s = currentScope();
  if (s.isPatron) {
    const total = s.patron.businessIds.reduce((sum, bid) => sum + BUSINESSES[bid].staffCount, 0);
    return `${s.patron.fullName} toplam <strong>${total} personel</strong> ile çalışıyor (${s.patron.businessIds.length} bayide).`;
  }
  return `${s.business.shortName}'nda <strong>${s.business.staffCount} personel</strong> çalışıyor.`;
}

function generateCustomerCountResponse() {
  const s = currentScope();
  if (s.isPatron) {
    const total = s.patron.businessIds.reduce((sum, bid) => sum + BUSINESSES[bid].customers, 0);
    return `Toplam aktif müşteri sayın: <strong>${total.toLocaleString('tr-TR')}</strong> (${s.patron.businessIds.length} bayide birleşik).`;
  }
  return `${s.business.shortName}'nda kayıtlı <strong>${s.business.customers}</strong> aktif müşteri var.`;
}

function generateTopProductResponse() {
  const s = currentScope();
  if (s.isPatron) {
    return `Bayilerinin en çok satan ürünleri:<br><br>
      ${s.patron.businessIds.map(bid => {
        const b = BUSINESSES[bid];
        return `• <strong>${b.shortName}:</strong> ${b.topProduct}`;
      }).join('<br>')}`;
  }
  return `${s.business.shortName}'nın en çok satan ürünü: <strong>${s.business.topProduct}</strong>.<br><br>${s.business.notable}`;
}

function generateGenericResponse(query) {
  const s = currentScope();
  const ctx = s.isPatron
    ? `${s.patron.fullName} (Patron Modu, ${s.patron.businessIds.length} bayi)`
    : `${s.business.shortName} (${SECTORS[s.business.sector].label})`;
  return `Sorunu aldım: "<em>${query}</em>"<br><br>
    Şu an <strong>${ctx}</strong> verisi üzerinden cevap veriyorum. Daha spesifik sorabilirsin:<br><br>
    • <em>"Mayıs 2024'te ne kadar sattık?"</em> — belirli ay cirosu<br>
    • <em>"En iyi ayım hangisi?"</em> — yıllık zirve<br>
    • <em>"Yağmurlu hava nasıl etkiler?"</em> — hava etkisi<br>
    ${s.isPatron ? '• <em>"Bayilerimi karşılaştır"</em> — bayi kıyaslama<br>• <em>"DAP İnşaatta Mayıs 2024 nedir?"</em> — belirli bayi sorgusu' : ''}<br>
    <em style="color:var(--odeal-muted); font-size:11.5px;">Backend Gemini bağlandığında doğal dil cevapları çok daha akıcı olacak.</em>`;
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
            <div style="font-size: 22px; font-weight: 700; margin-bottom: 4px;">${isPro ? 'POS Pro+' : 'Ödeal POS Standart'}</div>
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
            : `<button class="btn btn-accent" onclick="setPlan('pro')" style="width: 100%;">${I.sparkle} POS Pro+ aboneliğine geç (+199₺/ay)</button>`
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
  setTopbarTitle(view === 'campaigns' ? 'Kampanyalar' : 'WhatsApp Otomasyon', 'Bu özellik POS Pro+ ile gelir');
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

// ============= AI MODULE RENDERER =============
function renderModule(id) {
  const m = AI_MODULES.find(x => x.id === id);
  if (!m) { renderDashboard(); return; }
  setTopbarTitle(m.label, m.description);

  $view().innerHTML = `
    <div class="module-shell" style="--mod-color: ${m.color};">
      <div class="module-header">
        <div class="module-header-icon">${m.iconEmoji}</div>
        <div style="flex: 1;">
          <h2 style="font-size: 22px; font-weight: 700; margin: 0 0 4px;">${m.label}</h2>
          <p style="margin: 0; color: var(--odeal-muted); font-size: 13px; line-height: 1.5; max-width: 640px;">${m.description}</p>
        </div>
        <span class="badge badge-info" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa;">${APP.state.plan === 'pro' ? '✨ Pro' : 'Standart'}</span>
      </div>

      <div class="module-prompt-grid">
        ${m.prompts.map((p, i) => `
          <button class="module-prompt-btn" onclick="askModule('${m.id}', ${i})">
            <span class="module-prompt-arrow">↗</span>
            <span class="module-prompt-text">${p.q}</span>
          </button>
        `).join('')}
      </div>

      <div id="module-output" class="module-output">
        <div class="module-output-empty">
          <div style="font-size: 36px; margin-bottom: 12px;">${m.iconEmoji}</div>
          <div style="font-size: 14px; color: var(--odeal-muted);">Yukarıdan bir soru seç ya da kendi sorunu yaz</div>
        </div>
      </div>

      <div class="module-input-row">
        <input type="text" class="module-input" id="module-input" placeholder="Veya kendi sorunu yaz..." onkeydown="if(event.key==='Enter') askModuleFreeform('${m.id}');">
        <button class="btn btn-accent" onclick="askModuleFreeform('${m.id}')">${I.send}</button>
      </div>

      <div style="margin-top: 16px; padding: 12px 14px; background: rgba(255,255,255,0.02); border-radius: 10px; font-size: 11.5px; color: var(--odeal-muted); line-height: 1.5; display: flex; align-items: center; gap: 8px;">
        <span>🔌</span>
        <span>Bu modül şu an mock veriyle çalışıyor. <code style="background: rgba(255,255,255,0.06); padding: 1px 6px; border-radius: 4px; font-family: monospace;">backend/api/${m.id}</code> uç noktasına bağlandığında Gemini'den gerçek cevap gelecek.</span>
      </div>
    </div>
  `;
}

async function askModule(moduleId, promptIndex) {
  const m = AI_MODULES.find(x => x.id === moduleId);
  if (!m) return;
  const p = m.prompts[promptIndex];
  if (!p) return;
  await runModuleQuery(m, p.q, p.a);
}

async function askModuleFreeform(moduleId) {
  const input = document.getElementById('module-input');
  if (!input || !input.value.trim()) return;
  const m = AI_MODULES.find(x => x.id === moduleId);
  if (!m) return;
  const q = input.value.trim();
  input.value = '';
  await runModuleQuery(m, q, null);
}

async function runModuleQuery(m, question, fallbackAnswer) {
  const out = document.getElementById('module-output');
  if (!out) return;

  // Step 1: typing
  out.innerHTML = `
    <div class="module-msg user fade-in">${question}</div>
    <div class="module-msg ai fade-in">
      <div class="module-msg-header">
        <span style="font-size: 14px;">${m.iconEmoji}</span>
        <strong style="color: var(--mod-color);">${m.label}</strong>
        <span class="typing-dots"><span></span><span></span><span></span></span>
        <span style="font-size: 10px; color: var(--odeal-muted); margin-left: 6px;">Gemini ile düşünüyor…</span>
      </div>
    </div>
  `;
  out.scrollTop = out.scrollHeight;

  // Step 2: Try Gemini
  let aiText = null;
  let source = 'fallback';
  try {
    if (typeof askGeminiForModule === 'function') {
      const result = await askGeminiForModule(m.id, question);
      if (result && result.text) {
        aiText = result.text;
        source = 'gemini';
      }
    }
  } catch (e) {
    console.warn('[Module] Gemini error:', e);
  }

  // Fallback to static answer
  if (!aiText) {
    aiText = fallbackAnswer || `<em>"${question}"</em> sorgun için Gemini şu an erişilemiyor.<br><br>Mock cevap için yukarıdaki hazır sorulardan birini deneyebilirsin.`;
  }

  // Step 3: render final
  const sourceBadge = source === 'gemini'
    ? '<span style="font-size:10px; padding:2px 6px; background: rgba(0,200,150,0.15); color:#00c896; border-radius:4px; margin-left:6px;">✓ Gemini</span>'
    : '<span style="font-size:10px; padding:2px 6px; background: rgba(255,255,255,0.06); color:var(--odeal-muted); border-radius:4px; margin-left:6px;">cache</span>';

  out.innerHTML = `
    <div class="module-msg user fade-in">${question}</div>
    <div class="module-msg ai fade-in">
      <div class="module-msg-header">
        <span style="font-size: 14px;">${m.iconEmoji}</span>
        <strong style="color: var(--mod-color);">${m.label}</strong>
        ${sourceBadge}
        <span style="font-size: 10px; color: var(--odeal-muted); margin-left: auto;">${new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div class="module-msg-body">${aiText}</div>
      <div class="module-msg-actions">
        <button class="btn-tiny" onclick="showToast('Kopyalandı','success')">📋 Kopyala</button>
        <button class="btn-tiny" onclick="showToast('Cevap kaydedildi','success')">⭐ Kaydet</button>
        <button class="btn-tiny" onclick="runModuleQuery(AI_MODULES.find(x=>x.id==='${m.id}'), ${JSON.stringify(question).replace(/"/g, '&quot;')}, null)">↻ Yeniden üret</button>
      </div>
    </div>
  `;
  out.scrollTop = out.scrollHeight;
}
