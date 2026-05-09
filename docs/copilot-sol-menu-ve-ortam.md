# Copilot: sol menü, rotalar ve ortam değişkenleri

Bu doküman, arkadaşınızın Ödeal tarzı arayüzü üzerinde AI modüllerinin **sol sabit menüden seçilmesi** ve **URL ile yönlendirme** mantığını özetler; yerel çalıştırma ve ileride Gemini bağlama için notlar içerir.

## Mimari özet

- Ana sayfa (`/`) varsayılan olarak **`/copilot/insight`** adresine yönlendirilir.
- Tüm demo içeriği **`/copilot/[module]`** altında: `insight`, `cashflow`, `retention`, `campaign`, `voice`.
- Sol şerit: `frontend/src/app/components/ModuleSidebar.tsx` — Next.js `Link` ile modül rotalarına gider; aktif öğe tasarım token’larıyla vurgulanır.
- Modül listesi ve yardımcılar: `frontend/src/lib/ai-modules.ts` (yeni modül eklerken tek kaynak burası).
- Sayfa gövdesi: `frontend/src/app/components/CopilotDemo.tsx` — `routeModule` prop’u URL ile senkron; üstteki yatay modül butonları kaldırıldı, navigasyon sol menüdedir.

```
/copilot/layout.tsx  →  [ ModuleSidebar | children ]
/copilot/[module]/page.tsx  →  <CopilotDemo routeModule={module} />
```

## Ortam değişkenleri

Repoda kök dizinde **`.env.example`** dosyası vardır. Kopyalayıp ihtiyaca göre doldurun:

| Dosya konumu | Değişken | Açıklama |
|--------------|----------|----------|
| `frontend/.env.local` (önerilir) | `NEXT_PUBLIC_API_BASE_URL` | Backend tabanı, örn. `http://localhost:4000` |
| `backend/.env` (isteğe bağlı) | `PORT` | API portu, varsayılan `4000` |
| `backend/.env` (gelecek) | `GEMINI_API_KEY` veya `GOOGLE_GENERATIVE_AI_API_KEY` | Gerçek LLM çağrıları için |

**Not:** Şu an Voice ve diğer modül uçları çoğunlukla **mock veri** ile çalışır; anahtarları repoya **commit etmeyin**, sadece `.env` / `.env.local` kullanın.

## Yerel çalıştırma

Repoda:

```bash
npm install
npm run dev
```

Bu komut backend ve frontend’i birlikte açar. Tarayıcıda: `http://localhost:3000` → otomatik olarak copilot insight sayfasına düşer.

## Arkadaşınızın sitesi ile birleştirme

1. **Landing / pazarlama sayfaları** kökte veya `/` altında kalabilir; o zaman `frontend/src/app/page.tsx` içindeki `redirect(...)` yerine arkadaşınızın ana bileşenini render edin ve copilot’a **`/copilot/...`** veya `/app` gibi sabit bir yoldan `Link` verin.
2. **Ortak shell** (header/footer) istiyorsanız: `app/layout.tsx` içinde children’ı sarmalayan bir üst layout ekleyin; copilot dalı `app/copilot/layout.tsx` ile kendi sol menüsünü korur.
3. Yeni bir AI modülü eklemek için:
   - `ai-modules.ts` içine `ModuleKey` ve liste öğesi ekleyin.
   - `CopilotDemo.tsx` içinde fetch ve render dalını ekleyin.
   - Backend’de `routes/modules.js` ve servis katmanına karşılık gelen endpoint’i ekleyin.

## Gemini entegrasyonu (önerilen yol)

1. `backend` içinde `GEMINI_API_KEY` okuyan ince bir servis yazın (ör. `@google/generative-ai`).
2. `POST /api/modules/voice` veya seçtiğiniz modülde mock yerine bu servisi çağırın; hata ve rate limit için timeout + fallback düşünün.
3. Üretimde anahtarı yalnızca sunucu ortamında tutun; tarayıcıya **asla** `NEXT_PUBLIC_*` ile Gemini anahtarı koymayın.

## Push / Git

Değişiklikleri commit edip uzak repoya göndermek için:

```bash
git add .
git status
git commit -m "feat(frontend): copilot sol menü ve modül rotaları; ortam örneği ve doküman"
git push origin <dal-adınız>
```

Dal adı ortamınıza göre `main` veya `master` olabilir.
