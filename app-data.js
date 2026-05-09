// ============= APP MOCK DATA — Ayşe'nin Butiği =============

const business = {
  name: "Ayşe'nin Butiği",
  ownerName: "Ayşe Kara",
  location: "Kadıköy, İstanbul",
  posSerial: "ÖD-4429-K",
  activeSince: "2025-09-12",
  staffCount: 2
};

// Today's snapshot
const todayStats = {
  todaySales: 4750,
  yesterdaySales: 4350,
  openInvoices: 3,
  openInvoicesTotal: 8200,
  highRiskCustomers: 3,
  monthlyRevenue: 138400,
  cashPosition: 27500
};

// Detailed customers (extends existing customers list)
const customersDetailed = [
  {
    id: 1, name: "Ayşe Kara", phone: "+90 532 *** 4421",
    lastVisit: "2 gün önce", totalSpend: 4200, healthScore: 89, risk: "low",
    visits: 14, avgBasket: 300, segment: "Sadık",
    insights: ["Cuma akşamları aktif", "Kazak kategorisi favori", "Geçen ay 3 kez ziyaret"],
    suggestion: "Yeni sezon ürünleri için davet mesajı gönder"
  },
  {
    id: 2, name: "Mehmet Tan", phone: "+90 535 *** 8812",
    lastVisit: "37 gün önce", totalSpend: 12500, healthScore: 28, risk: "high",
    visits: 22, avgBasket: 568, segment: "Kayıp Risk",
    insights: ["Önceden ayda 4 kez gelirdi", "Son şikâyet metninde olumsuz duygu", "Yüksek harcama potansiyeli"],
    suggestion: "%15 kişiselleştirilmiş indirim + kişisel WhatsApp"
  },
  {
    id: 3, name: "Selim Demir", phone: "+90 533 *** 2256",
    lastVisit: "32 gün önce", totalSpend: 8400, healthScore: 35, risk: "high",
    visits: 11, avgBasket: 763, segment: "Kayıp Risk",
    insights: ["Son 3 ziyarette harcama düşüşte", "Vadeli ödeme geçmişi var", "İndirim duyarlı"],
    suggestion: "Sadakat puan kampanyası + ücretsiz kargo"
  },
  {
    id: 4, name: "Fatma Yılmaz", phone: "+90 534 *** 7723",
    lastVisit: "45 gün önce", totalSpend: 6700, healthScore: 31, risk: "high",
    visits: 9, avgBasket: 744, segment: "Kayıp Risk",
    insights: ["Sadakat skoru hızla düşüyor", "Sezonlu alıcı (yaz/kış)", "Yüksek sepet ama seyrek"],
    suggestion: "Sezon başlangıcı kampanyası — 1 hafta içinde"
  },
  {
    id: 5, name: "Zeynep Aksoy", phone: "+90 536 *** 1145",
    lastVisit: "5 gün önce", totalSpend: 3100, healthScore: 76, risk: "medium",
    visits: 8, avgBasket: 388, segment: "Düzenli",
    insights: ["İndirim tetikleyici", "Sosyal medyadan geliyor", "Genç segment"],
    suggestion: "%10 hedefli kupon — kabul olasılığı %71"
  },
  {
    id: 6, name: "Cem Öztürk", phone: "+90 537 *** 9982",
    lastVisit: "1 gün önce", totalSpend: 9200, healthScore: 92, risk: "low",
    visits: 18, avgBasket: 511, segment: "VIP",
    insights: ["En sadık 3 müşteriden biri", "Yüksek frekans, düşük indirim ihtiyacı", "Tavsiye etme potansiyeli yüksek"],
    suggestion: "VIP teşekkür mesajı + tavsiye kuponu"
  },
  {
    id: 7, name: "Elif Şahin", phone: "+90 538 *** 6678",
    lastVisit: "12 gün önce", totalSpend: 2300, healthScore: 64, risk: "medium",
    visits: 6, avgBasket: 383, segment: "Düzenli",
    insights: ["Yeni müşteri (3 ay)", "Düşük frekans", "Kararsız davranış"],
    suggestion: "Hoş geldin serisi 2. mesajı (sadakat kart önerisi)"
  },
  {
    id: 8, name: "Ali Korkmaz", phone: "+90 539 *** 3309",
    lastVisit: "3 gün önce", totalSpend: 5600, healthScore: 81, risk: "low",
    visits: 12, avgBasket: 467, segment: "Sadık",
    insights: ["Hafta içi öğle saatleri aktif", "Erkek giyim favori", "Sosyal etiketleyici"],
    suggestion: "Yeni gelen erkek giyim ürünleri bildirimi"
  }
];

// Payments / Tahsilat
const invoices = [
  // Gecikmiş
  { id: "FT-2348", customer: "Mehmet Tan", amount: 3500, issued: "20 Nis", due: "4 May", status: "overdue", daysOverdue: 5 },
  { id: "FT-2331", customer: "Selim Demir", amount: 2200, issued: "15 Nis", due: "29 Nis", status: "overdue", daysOverdue: 10 },
  { id: "FT-2329", customer: "Fatma Yılmaz", amount: 2500, issued: "12 Nis", due: "26 Nis", status: "overdue", daysOverdue: 13 },
  // Yaklaşan
  { id: "FT-2384", customer: "Cem Öztürk", amount: 4100, issued: "1 May", due: "15 May", status: "upcoming", daysUntilDue: 6 },
  { id: "FT-2391", customer: "Ali Korkmaz", amount: 1800, issued: "3 May", due: "17 May", status: "upcoming", daysUntilDue: 8 },
  { id: "FT-2402", customer: "Zeynep Aksoy", amount: 950, issued: "5 May", due: "19 May", status: "upcoming", daysUntilDue: 10 },
  { id: "FT-2408", customer: "Ayşe Kara", amount: 2400, issued: "7 May", due: "21 May", status: "upcoming", daysUntilDue: 12 },
  { id: "FT-2415", customer: "Elif Şahin", amount: 1200, issued: "8 May", due: "22 May", status: "upcoming", daysUntilDue: 13 },
  // Tamamlanmış
  { id: "FT-2298", customer: "Cem Öztürk", amount: 3200, issued: "1 Nis", due: "15 Nis", status: "paid", paidOn: "14 Nis" },
  { id: "FT-2305", customer: "Ali Korkmaz", amount: 1500, issued: "3 Nis", due: "17 Nis", status: "paid", paidOn: "16 Nis" }
];

// AI suggested actions for messages
const messageDrafts = {
  "Mehmet Tan": {
    tone: "samimi-hatırlatıcı",
    text: "Merhaba Mehmet Bey 👋\n\nUmarım iyisinizdir. Geçen ay aldığınız ürünlerin 3.500₺ tutarındaki ödemesinin vadesi 4 Mayıs'ta dolmuştu. Belki gözden kaçtı diye hatırlatmak istedim.\n\nDilerseniz tek tıkla buradan ödeyebilirsiniz: [link]\n\nSorularınız olursa hemen yazın.\n\nİyi günler,\nAyşe — Ayşe'nin Butiği"
  },
  "Selim Demir": {
    tone: "yumuşak-hatırlatıcı",
    text: "Merhaba Selim Bey 👋\n\n29 Nisan tarihli 2.200₺ ödemenizin vadesi geçti. Uygun olduğunuzda dönüş yaparsanız sevinirim. Ödemeyi şuradan tamamlayabilirsiniz: [link]\n\nSelamlar,\nAyşe"
  }
};

// Campaigns (Pro)
const campaigns = [
  {
    id: 1, name: "Kayıp Müşteri Geri Kazanma", status: "active", type: "whatsapp",
    targetSegment: "Kayıp Risk", sent: 23, opened: 18, converted: 7,
    startedAt: "2 May", revenue: 4800
  },
  {
    id: 2, name: "VIP Teşekkür Kampanyası", status: "active", type: "whatsapp+sms",
    targetSegment: "VIP", sent: 12, opened: 12, converted: 9,
    startedAt: "28 Nis", revenue: 8200
  },
  {
    id: 3, name: "Cuma Akşamı Mini İndirim", status: "scheduled", type: "whatsapp",
    targetSegment: "Düzenli + Sadık", scheduled: "9 May, Cuma 18:00",
    estimatedReach: 47, expectedRevenue: 6500
  }
];

const campaignTemplates = [
  { name: "Kayıp Müşteri Geri Kazanma", icon: "🎯", desc: "30+ gündür gelmeyen müşterilere özel %15 indirim", segments: 1 },
  { name: "Doğum Günü Kutlaması", icon: "🎂", desc: "Doğum günü olan müşterilere otomatik kupon", segments: "auto" },
  { name: "VIP Sadakat Ödülü", icon: "👑", desc: "En çok harcayan %10'a özel teşekkür + erken erişim", segments: 1 },
  { name: "Sezon Başlangıcı", icon: "🌸", desc: "Yeni sezon ürünleri için segmentli duyuru", segments: 3 },
  { name: "Cuma Akşamı Trafik", icon: "🌙", desc: "Geçmiş trende dayalı Cuma akşamı kampanyası", segments: "all" },
  { name: "Ödeme Hatırlatma Serisi", icon: "💸", desc: "Vade geçtiğinde 3 aşamalı yumuşak hatırlatma", segments: "auto" }
];

// WhatsApp messages (Pro)
const whatsappQueue = [
  { customer: "Mehmet Tan", type: "Tahsilat hatırlatma", status: "Onay bekliyor", scheduledFor: "Bugün 14:00", preview: "Merhaba Mehmet Bey 👋..." },
  { customer: "Selim Demir", type: "Tahsilat hatırlatma", status: "Onay bekliyor", scheduledFor: "Bugün 15:00", preview: "Merhaba Selim Bey 👋..." },
  { customer: "Zeynep Aksoy", type: "%10 indirim teklifi", status: "Onay bekliyor", scheduledFor: "Yarın 10:00", preview: "Merhaba Zeynep Hanım..." }
];

const whatsappHistory = [
  { customer: "Cem Öztürk", type: "VIP teşekkür", status: "Açıldı + Tıklandı", sentAt: "Dün 11:24", revenue: 850 },
  { customer: "Ali Korkmaz", type: "Yeni ürün bildirimi", status: "Açıldı", sentAt: "Dün 09:18", revenue: null },
  { customer: "Elif Şahin", type: "Hoş geldin 2/3", status: "Açıldı", sentAt: "2 gün önce 16:45", revenue: 380 },
  { customer: "Fatma Yılmaz", type: "Sezon kampanyası", status: "Gönderildi", sentAt: "3 gün önce 12:00", revenue: null }
];

// AI chat extended responses
const aiExtendedResponses = {
  ...chatResponses,
  "musteri-segment": `Müşterilerinizi davranışa göre <strong>4 segment</strong>e ayırdım:<br><br>
    👑 <strong>VIP (1 kişi)</strong> — Cem Öztürk. Yıllık 9.200₺, 18 ziyaret. Sadakat ödülü öneririm.<br>
    💚 <strong>Sadık (2 kişi)</strong> — Ayşe Kara, Ali Korkmaz. Düzenli, indirim bağımsız geliyorlar.<br>
    💛 <strong>Düzenli (2 kişi)</strong> — Zeynep Aksoy, Elif Şahin. Indirim duyarlı, büyütme potansiyeli var.<br>
    🔴 <strong>Kayıp Risk (3 kişi)</strong> — Mehmet, Selim, Fatma. 30+ gündür yok. Acil aksiyon gerek.`,
  "ne-satayim": `Geçmiş satış analizinize göre öneriler:<br><br>
    📈 <strong>En çok kazanç getiren:</strong> Sweat & Kazak (kâr marjı %42)<br>
    📊 <strong>Bu hafta yükseliş trendi:</strong> Çanta & Aksesuar (%18 artış)<br>
    🌧️ <strong>Hava etkisi:</strong> Yağmurlu günlerde dış giyim satışı %31 artıyor — bu hafta yağmur var<br>
    💡 <strong>Önerim:</strong> Cuma akşamı için trençkot/yağmurluk vitrini ön plana çıkar.`,
  "rekabetcilik": `Bölgenizdeki <strong>3 benzer butik</strong> verilerini analiz ettim (anonim):<br><br>
    📊 Ortalama sepet: 380₺ — sizinki <strong>425₺</strong> (üstte ✅)<br>
    🔄 Tekrar ziyaret oranı: %38 — sizinki <strong>%47</strong> (üstte ✅)<br>
    📅 Cuma akşamı yoğunluk: 24 müşteri/saat — sizinki <strong>16</strong> (geride ⚠️)<br><br>
    💡 <strong>Fırsat:</strong> Cuma akşamı kampanyasıyla bu farkı kapatabilirsiniz.`
};
