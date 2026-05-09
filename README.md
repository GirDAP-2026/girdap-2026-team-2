# Ödeal AI — KOBİ Karar Destek Sistemi

> GirDAP-2026 · Team-2 · Ödeal Case

KOBİ'lerin satış, müşteri ve ödeme süreçlerini yönetmek için **Ödeal POS ile birlikte ücretsiz gelen** AI tabanlı karar destek sistemi (KDS).

## 🎯 Konsept

**"AI'ı yalnızca müşteriyle konuşan bir chatbot olarak değil, satış ve ödeme davranışlarını önceden tahmin eden bir karar destek sistemi olarak konumlandırıyoruz."**

Ödeal POS satışlarına bağlı **bundled** ürün — POS müşterileri için ücretsiz, opsiyonel **Pro Versiyon** upsell katmanı.

## 🧠 Hibrit AI Mimarisi

| Katman | Model | Görev |
|---|---|---|
| Zaman serisi | **LSTM** | Günlük satış, ödeme akışı, sezonsallık, nakit akışı tahmini |
| Etkileşim | **Transformer** | WhatsApp/e-posta/şikayet metinleri → duygu, niyet, risk |

## 🚀 Çalıştırma

```bash
# Sadece tarayıcıda aç
start index.html       # Windows
open index.html        # macOS

# Veya basit HTTP server (önerilen)
python -m http.server 8000
# → http://localhost:8000
```

## 📁 Yapı

```
.
├── index.html          ← tek-sayfa site
├── style.css           ← özel stiller
├── script.js           ← dashboard, grafik, chat
├── data.js             ← Ayşe'nin Butiği mock verisi
├── assets/
│   ├── logo.svg
│   └── favicon.svg
└── README.md
```

## 🛠️ Teknoloji

- HTML5 + Tailwind CSS (CDN) + Vanilla JS
- Chart.js (cash flow grafiği)
- Inter (Google Fonts)
- Sıfır build adımı, sıfır bağımlılık kurulumu

## 📊 Dashboard Widget'ları

1. **"Bugün ne yapayım?"** — 5 öncelikli aksiyon (gecikmiş ödeme, kayıp müşteri, kampanya önerisi, vb.)
2. **Müşteri Sağlık Skoru** — 8 müşteri tablosu, risk renkli skorlar
3. **Nakit Tahmini** — 30 gün gerçekleşen + 30 gün AI tahmini, dip uyarısı
4. **İşletmene Sor** — AI Asistan chat (3 hazır soru + scripted cevap)

## 🎤 Sunum

8 dakika · jüri Ödeal · değerlendirme: İnovasyon, Uygulanabilirlik, Etki, Ölçeklenebilirlik, Pazar Potansiyeli, Uygulama Planı, Sunum, Ekip Dinamikleri.

## 👥 Takım

GirDAP 2026 — Team-2

---

**Demo persona:** Ayşe Hanım, Kadıköy butik sahibi, 2 çalışan. Tüm dashboard verisi onun butiğinden.
