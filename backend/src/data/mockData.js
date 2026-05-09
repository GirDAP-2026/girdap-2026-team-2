export const salesSummary = {
  todaySales: 32,
  weekOverWeekChangePercent: -18,
  peakHours: "17:00-19:00",
  topProduct: "Latte",
  totalRevenueToday: 18450,
};

export const cashflowForecast = {
  riskLevel: "medium",
  sevenDayProjection: [12000, 11200, 10800, 10200, 9800, 11000, 11500],
  warning: "7 gun icinde odeme acigi riski bulunuyor.",
  expectedShortfall: 3500,
};

export const retentionSignals = [
  { customerName: "Ayse K.", daysInactive: 34, suggestion: "%10 kupon gonder" },
  { customerName: "Mert T.", daysInactive: 42, suggestion: "Yeni urun deneme kuponu" },
  { customerName: "Ece A.", daysInactive: 31, suggestion: "Tekrar alisveris indirimi" },
];

export const campaignIdeas = [
  {
    slot: "Pazartesi 14:00-17:00",
    suggestion: "%15 kahve kampanyasi",
    expectedImpact: "+%9 ek ciro",
  },
  {
    slot: "Carsamba 11:00-13:00",
    suggestion: "2. iced latte yarim fiyat",
    expectedImpact: "+%6 islem hacmi",
  },
];

export const voiceAssistantAnswers = {
  "Bu hafta en cok ne sattim?": "Bu hafta en cok Latte sattiniz. Toplam 96 adet.",
  "Nakit acigi riski var mi?":
    "Evet, orta seviyede risk var. Cumartesi gunu tahmini 3.500 TL acik olusabilir.",
  "Musteri kaybi nerede var?":
    "Son 30 gunde 5 musteri pasiflesmis gorunuyor. Kupon kampanyasi oneriyorum.",
};
