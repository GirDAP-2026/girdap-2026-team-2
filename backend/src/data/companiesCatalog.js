/**
 * Tamamen hayali örnek KOBİ’ler — gerçek projelerle ilişkilendirilmez.
 * Segmentler: gıda, perakende, hizmet, sağlık (yarışma / ortak demo için).
 */
export const companies = [
  {
    id: "merkez-kahve-evi",
    name: "Merkez Kahve Evi",
    category: "Gıda & İçecek",
    tagline: "Mahalle kafesi, yüksek POS hacmi",
  },
  {
    id: "vadide-organik-kafe",
    name: "Vadide Organik Kafe",
    category: "Gıda & İçecek",
    tagline: "Şube bazlı kampanya ve sadakat yoğun",
  },
  {
    id: "kampus-kantin-bistro",
    name: "Kampüs Kantin Bistro",
    category: "Gıda & İçecek",
    tagline: "Öğle trafiği, kurumsal hat satışları",
  },
  {
    id: "lezzet-duragi-subesi",
    name: "Lezzet Durağı — Moda Şubesi",
    category: "Gıda & İçecek",
    tagline: "Hızlı servis, stok ve vardiya hassasiyeti",
  },
  {
    id: "aurora-boutique",
    name: "Aurora Kozmetik Butik",
    category: "Perakende",
    tagline: "Premium sepet, hediye paketleme",
  },
  {
    id: "neon-avm-teknoloji",
    name: "Neon AVM Teknoloji Mağazası",
    category: "Perakende",
    tagline: "Hafta sonu yoğun, çok kanallı ödeme",
  },
  {
    id: "delta-aksesuar",
    name: "Delta Aksesuar Mağazası",
    category: "Perakende",
    tagline: "Elektronik aksesuar, iade oranı takibi",
  },
  {
    id: "ustalik-berber",
    name: "Ustalık Berber Karaköy",
    category: "Hizmet",
    tagline: "Randevu ve nakit akışı dengesi",
  },
  {
    id: "pearl-dis-poliklinigi",
    name: "Pearl Ağız ve Diş Sağlığı",
    category: "Sağlık",
    tagline: "Taksitli tedavi ve tahsilat vadesi",
  },
  {
    id: "nefes-studio",
    name: "Nefes Yoga Stüdyosu",
    category: "Hizmet",
    tagline: "Üyelik ve paket satışları",
  },
];

export const defaultCompanyId = "merkez-kahve-evi";

export const companyIds = new Set(companies.map((c) => c.id));

export function resolveCompanyId(raw) {
  if (!raw || typeof raw !== "string") {
    return defaultCompanyId;
  }
  return companyIds.has(raw) ? raw : defaultCompanyId;
}
