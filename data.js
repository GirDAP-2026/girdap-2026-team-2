// Mock data — Ayşe'nin Butiği (Kadıköy, 2 çalışan)

const customers = [
  { name: "Ayşe Kara",      lastVisit: "2 gün önce",  totalSpend: 4200,  healthScore: 89, risk: "low" },
  { name: "Mehmet Tan",     lastVisit: "37 gün önce", totalSpend: 12500, healthScore: 28, risk: "high" },
  { name: "Selim Demir",    lastVisit: "32 gün önce", totalSpend: 8400,  healthScore: 35, risk: "high" },
  { name: "Fatma Yılmaz",   lastVisit: "45 gün önce", totalSpend: 6700,  healthScore: 31, risk: "high" },
  { name: "Zeynep Aksoy",   lastVisit: "5 gün önce",  totalSpend: 3100,  healthScore: 76, risk: "medium" },
  { name: "Cem Öztürk",     lastVisit: "1 gün önce",  totalSpend: 9200,  healthScore: 92, risk: "low" },
  { name: "Elif Şahin",     lastVisit: "12 gün önce", totalSpend: 2300,  healthScore: 64, risk: "medium" },
  { name: "Ali Korkmaz",    lastVisit: "3 gün önce",  totalSpend: 5600,  healthScore: 81, risk: "low" }
];

// Cash flow: 30 gün gerçekleşen + 30 gün AI tahmini
const cashFlow = (() => {
  const labels = [];
  const baseDate = new Date(2026, 3, 9); // 9 Nisan 2026 (ay 0-indexed)
  for (let i = 0; i < 60; i++) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + i);
    labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
  }

  // 30 gün gerçekleşen — hafta sonu yükseklik
  const actualValues = [
    4200, 4500, 3800, 5100, 5800, 6200, 4900,
    4100, 4400, 3900, 5300, 5500, 6100, 4800,
    4300, 4600, 4000, 5200, 5700, 6000, 4700,
    4200, 4500, 4100, 5400, 5600, 6300, 4950,
    4350, 4750
  ];

  // 30 gün tahmin — 18 Mayıs (index 9) civarı dip
  const predictedValues = [
    4500, 4200, 3900, 3600, 3400, 3200, 3000,
    2900, 2800, 2700,
    3400, 3800, 4100, 3600, 4200, 4500, 4800,
    5200, 5600, 4900,
    4400, 4700, 5000, 5400, 5800,
    6100, 5300, 5600, 5400, 5800
  ];

  const actual = [];
  const predicted = [];
  for (let i = 0; i < 60; i++) {
    if (i < 30) {
      actual.push(actualValues[i]);
      predicted.push(null);
    } else {
      actual.push(null);
      predicted.push(predictedValues[i - 30]);
    }
  }
  // Görsel süreklilik: tahmin çizgisi son gerçek noktasından başlasın
  predicted[29] = actualValues[29];

  return { labels, actual, predicted };
})();

const todaysActions = [
  {
    priority: "high",
    icon: "🔴",
    text: "<strong>Mehmet Tan</strong>'ın 3.500₺ ödemesi 5 gün gecikti. WhatsApp hatırlatma metni hazır.",
    action: "Mesajı Onayla"
  },
  {
    priority: "medium",
    icon: "🟡",
    text: "<strong>5 müşteri</strong> 30+ gündür alışveriş yapmadı. Sadakat skorları düşüyor.",
    action: "Kampanya Oluştur"
  },
  {
    priority: "low",
    icon: "🟢",
    text: "Cuma akşamı kampanyası önerilir — son 4 Cuma ortalaması <strong>%23</strong> daha yüksek.",
    action: "Detayları Gör"
  },
  {
    priority: "medium",
    icon: "🟡",
    text: "Bu hafta nakit akışı <strong>%12 düşebilir</strong>. 18 Mayıs'ta 8.000₺ açık riski var.",
    action: "Tahsilat Planı"
  },
  {
    priority: "low",
    icon: "🟢",
    text: "<strong>Zeynep Aksoy</strong>'a %10 indirim önerisi — kabul olasılığı <strong>%71</strong>.",
    action: "Teklifi Gönder"
  }
];

const chatResponses = {
  "en-riskli": `Şu an <strong>3 yüksek riskli</strong> müşteriniz var:<br><br>
    <strong>1. Mehmet Tan</strong> — 37 gündür gelmedi, ortalama harcaması 12.500₺. Geçen yıl bu dönemde aktifti, son şikâyet metinlerinde olumsuz duygu skoru yükseldi.<br>
    <strong>2. Selim Demir</strong> — 32 gündür gelmedi, son 3 ziyarette harcaması düşüş trendinde.<br>
    <strong>3. Fatma Yılmaz</strong> — 45 gündür gelmedi, sadakat skoru hızla düşüyor.<br><br>
    💡 <strong>Önerim:</strong> Mehmet'e WhatsApp üzerinden kişiselleştirilmiş %15 indirim teklifi gönder.`,
  "bu-hafta": `Bu hafta için <strong>3 öncelikli aksiyon</strong>:<br><br>
    <strong>1.</strong> Mehmet Tan'ın 5 günlük gecikmiş borcu — hatırlatma hazır, onayını bekliyorum.<br>
    <strong>2.</strong> Cuma akşamı kampanyası — geçen 4 Cuma ortalama %23 daha yüksek satış. 18:00–22:00 arası %15 indirim öneriyorum.<br>
    <strong>3.</strong> 18 Mayıs'ta 8.000₺ nakit açığı — Selim Demir ve 2 müşteriden tahsilatı hızlandırırsan kapanır.`,
  "nakit-durumu": `Önümüzdeki 30 gün için tahminim:<br><br>
    📊 Beklenen gelir: <strong>147.300₺</strong><br>
    📉 Beklenen gider: <strong>129.800₺</strong><br>
    💰 Net pozisyon: <strong style="color:#00c896">+17.500₺</strong><br><br>
    ⚠️ <strong>Dikkat:</strong> 18 Mayıs'ta geçici bir açık var (8.000₺). Mehmet Tan ve Selim Demir'den tahsilatı bu tarihten önce yaparsan sorun olmaz.`
};
