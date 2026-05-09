/** Firma bazli demo yukleri – UI icin yapilandirilmis alanlar */

function voicePack(pairs) {
  const quickQuestions = Object.keys(pairs);
  return { quickQuestions, answers: pairs };
}

const packs = {
  demo_kafe: voicePack({
    "Bu hafta en cok ne sattim?":
      "Bu hafta en cok Latte sattiniz (96 adet). Ikinci sirada Americano var.",
    "Nakit acigi riski var mi?":
      "Orta risk: Cumartesi gunu tahmini 3.500 TL odeme acigi olusabilir. Cuma aksami kampanyayi hafifletmeyi dusunun.",
    "Musteri kaybi nerede var?":
      "5 musteri 30+ gundur gelmedi. En yuksek geri donus potansiyeli: sadakat uyesi segmenti.",
  }),
  franchise: voicePack({
    "Bu hafta en cok ne sattim?":
      "Hediye setleri ve sicak icecek kombinasyonlari onde. En cok satan kalem: orta boy gunun menu paketi.",
    "Nakit acigi riski var mi?":
      "Dusuk risk. Hafta sonu AVM trafigi nakit girisini destekliyor; sadece Pazartesi sabahina dikkat.",
    "Musteri kaybi nerede var?":
      "Kurumsal siparis musterilerinde 2 hesap 45 gundur pasif. Toplu siparis hatirlatmasi onerilir.",
  }),
  retail: voicePack({
    "Bu hafta en cok ne sattim?":
      "Kilif ve sarj urunleri onde. Sepet ortalamasi gecen haftaya gore %6 artti.",
    "Nakit acigi riski var mi?":
      "Iade dalgalanmasi nedeniyle orta risk. Iade yogun gunlerinde tedarik odemelerini kaydirmak faydali olur.",
    "Musteri kaybi nerede var?":
      "Garanti yenileme hatirlatmasi gereken 120 musteri var. SMS + kupon kombinasyonu oneriliyor.",
  }),
  service: voicePack({
    "Bu hafta en cok ne sattim?":
      "En cok randevu paketi: kesim + sakal kombo. Bos slotlar Persembe ogleden sonra.",
    "Nakit acigi riski var mi?":
      "Dusuk risk; nakit girisleri randevu on odemeleriyle dengeli.",
    "Musteri kaybi nerede var?":
      "60+ gun gelmeyen 14 musteri. 'Geri donus %20' mesaji onerilir.",
  }),
  health: voicePack({
    "Bu hafta en cok ne sattim?":
      "En cok talep: kontrol + temizlik paketi. Taksitli plan secenleri artti.",
    "Nakit acigi riski var mi?":
      "Yuksek risk yok; ancak SGK bekleyen tahsilatlar icin Cuma gunu nakit dip olabilir.",
    "Musteri kaybi nerede var?":
      "Kontrol randevusu kaciran 9 hasta. Otomatik hatirlatma + esnek saat onerisi etkili olur.",
  }),
};

/** @type {Record<string, ReturnType<typeof buildDemo>>} */
const cache = {};

function buildDemo(companyId, meta, variant) {
  const voice = packs[variant];

  return {
    insight: {
      headline: "Veriden aksiyona",
      kpis: [
        {
          label: "Bugunku islem",
          value: variant === "demo_kafe" ? "32" : variant === "franchise" ? "118" : "84",
          change:
            variant === "demo_kafe" ? "-18%" : variant === "retail" ? "+6%" : "+4%",
          trend: variant === "demo_kafe" ? "down" : "up",
        },
        {
          label: "Ciro (TL)",
          value:
            variant === "demo_kafe"
              ? "18.450"
              : variant === "health"
                ? "42.800"
                : "63.200",
          change: variant === "demo_kafe" ? "-12%" : "+9%",
          trend: variant === "demo_kafe" ? "down" : "up",
        },
        {
          label: "En yogun saat",
          value:
            variant === "service" ? "12:00-15:00" : variant === "health" ? "10:00-12:00" : "17:00-19:00",
          change: "AI oncelik",
          trend: "neutral",
        },
        {
          label: "One cikan urun/hizmet",
          value:
            variant === "demo_kafe"
              ? "Latte"
              : variant === "franchise"
                ? "Gunun menu paketi"
                : variant === "retail"
                  ? "Telefon kilifi"
                  : variant === "service"
                    ? "Kesim + sakal"
                    : "Kontrol paketi",
          change: "Marj iyi",
          trend: "up",
        },
      ],
      highlights: [
        meta.category.startsWith("Gıda")
          ? "Öğle sonrası içecek talebi artıyor; personel planını 30 dk kaydırmak bekleme süresini düşürür."
          : "Hafta içi öğle arası boşluklar kampanya için uygun.",
        variant === "retail"
          ? "Iade orani Salı gunleri %1.2 ustunde; iade nedeni analizi acin."
          : "Tekrar ziyaret orani gecen aya gore stabil; kupon ile 3 puan yukselme potansiyeli var.",
      ],
      recommendations: [
        {
          id: "rec-1",
          title: "Personel / kapasite optimizasyonu",
          description:
            "AI yogunluk tahminine gore acilis ve kapanis vardiyalarini 45 dk kaydirin.",
          impact: "Tahmini bekleme -%15",
          priority: "high",
        },
        {
          id: "rec-2",
          title: "Marj koruyan kampanya",
          description:
            "Dusuk trafik diliminde yuksek marjli urunleri one cikaran mini bundle.",
          impact: "Ek ciro +%7-11",
          priority: "medium",
        },
        {
          id: "rec-3",
          title: "Musteri geri kazanma",
          description: "30+ gun pasif segmente kisisellestirilmis mesaj + sinirli sure kupon.",
          impact: "Geri donus +%5",
          priority: "medium",
        },
      ],
    },
    cashflow: {
      riskLevel: variant === "demo_kafe" ? "medium" : variant === "health" ? "low" : "low",
      riskLabel:
        variant === "demo_kafe"
          ? "7 gun icinde odeme acigi riski"
          : "Nakit akisi dengeli; dikkat noktasi: bekleyen tahsilatlar",
      expectedShortfall: variant === "demo_kafe" ? 3500 : 0,
      days: [
        { label: "Pzt", amount: 12000 },
        { label: "Sal", amount: variant === "demo_kafe" ? 11200 : 14500 },
        { label: "Car", amount: 10800 },
        { label: "Per", amount: 10200 },
        { label: "Cum", amount: 9800 },
        { label: "Cmt", amount: 11000 },
        { label: "Paz", amount: 11500 },
      ],
      warning:
        variant === "demo_kafe"
          ? "Cumartesi gunu tahmini 3.500 TL acik. Cuma aksami kampanya siddetini dusurun veya kisa vadeli tahsilat hatti kullanin."
          : "Bekleyen taksit tahsilatlari nakit girisini geciktirebilir; otomatik hatirlatma acin.",
      actions: [
        {
          title: "Odeme vadelerini netlestir",
          detail: "Tedarikci ve musteri vadelerini 2 gun icinde esitleyin.",
        },
        {
          title: "Yuksek marj gunu",
          detail: "En yuksek marjli gununuzde promosyonu kisitlayin.",
        },
      ],
    },
    retention: {
      insight:
        "30+ gun inaktif musterilerde geri kazanma potansiyeli yuksek; kisisellestirilmis kupon en iyi sonucu veriyor.",
      customers: [
        {
          id: "c1",
          name: variant === "franchise" ? "Kurumsal – Beta A.S." : "Ayse K.",
          daysInactive: variant === "service" ? 62 : 34,
          segment: variant === "retail" ? "Garanti musterisi" : "Sadakat uyesi",
          suggestion: "%10 geri donus kuponu",
          couponCode: "BACK10",
          recoverScore: 82,
        },
        {
          id: "c2",
          name: "Mert T.",
          daysInactive: 42,
          segment: "Duzenli musteri",
          suggestion: "Yeni urun deneme paketi",
          couponCode: "TRYNEW",
          recoverScore: 74,
        },
        {
          id: "c3",
          name: "Ece A.",
          daysInactive: 31,
          segment: "Hafta sonu ziyaretci",
          suggestion: "2. ziyarette %15",
          couponCode: "SECOND15",
          recoverScore: 68,
        },
      ],
    },
    campaign: {
      campaigns: [
        {
          id: "camp-1",
          slot: "Pazartesi 14:00-17:00",
          title: "Dusuk yogunluk kampanyasi",
          suggestion: "%15 kahve / secili kategori indirimi",
          expectedImpact: "Tahmini +%9 ek ciro",
          audience: "Yerel musteri + push bildirimi",
        },
        {
          id: "camp-2",
          title: "Hafta ici ogle paketi",
          slot: "Sali-Cars 11:00-13:00",
          suggestion: "Menu + icecek bundle, marj koruyan fiyat",
          expectedImpact: "Islem adedi +%6",
          audience: "Ofis cevresi",
        },
      ],
    },
    voice,
  };
}

const variantByCompany = {
  "merkez-kahve-evi": "demo_kafe",
  "vadide-organik-kafe": "franchise",
  "kampus-kantin-bistro": "franchise",
  "lezzet-duragi-subesi": "franchise",
  "aurora-boutique": "franchise",
  "neon-avm-teknoloji": "franchise",
  "delta-aksesuar": "retail",
  "ustalik-berber": "service",
  "pearl-dis-poliklinigi": "health",
  "nefes-studio": "service",
};

export function getCompanyPayload(companyId, companyMeta) {
  if (cache[companyId]) {
    return cache[companyId];
  }
  const variant = variantByCompany[companyId] ?? "demo_kafe";
  cache[companyId] = buildDemo(companyId, companyMeta, variant);
  return cache[companyId];
}
