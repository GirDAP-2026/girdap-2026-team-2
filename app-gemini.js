// ============= GEMINI API ENTEGRASYONU =============
// FRONTEND DEMO: Anahtarlar burada görünüyor — production'da BACKEND'de tutulmalı.
// 1 anahtar tükendiğinde otomatik diğerine geçilir.

const GEMINI_CONFIG = {
  primaryModel: 'gemini-3-flash-preview',
  fallbackModels: ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-1.5-flash'],
  keys: [
    'AIzaSyCCVIAfXZOsDs6T9SSyWf57wYAzv5jRgV4',
    'AIzaSyC5OEdNw_9IDLS-8MHjEM2QTpobxeEhVWI',
    'AIzaSyDcCrvL8TLmGr2G-rK_W_JaEDy_A4omHmE'
  ],
  currentKeyIdx: 0,
  workingModel: null   // ilk başarılı çağrıdan sonra burada saklanır
};

async function callGemini(systemPrompt, userPrompt) {
  const models = GEMINI_CONFIG.workingModel
    ? [GEMINI_CONFIG.workingModel, ...GEMINI_CONFIG.fallbackModels.filter(m => m !== GEMINI_CONFIG.workingModel)]
    : [GEMINI_CONFIG.primaryModel, ...GEMINI_CONFIG.fallbackModels];

  for (let keyTry = 0; keyTry < GEMINI_CONFIG.keys.length; keyTry++) {
    const keyIdx = (GEMINI_CONFIG.currentKeyIdx + keyTry) % GEMINI_CONFIG.keys.length;
    const key = GEMINI_CONFIG.keys[keyIdx];

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 4096,
              topP: 0.9,
              thinkingConfig: { thinkingBudget: 0 }
            }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const candidate = data.candidates?.[0];
          const text = candidate?.content?.parts?.[0]?.text;
          const finishReason = candidate?.finishReason;
          if (text && text.trim()) {
            GEMINI_CONFIG.currentKeyIdx = keyIdx;
            GEMINI_CONFIG.workingModel = model;
            console.log(`[Gemini] ✓ ${model} key#${keyIdx + 1} finish=${finishReason}`);
            // MAX_TOKENS nedeniyle yarıda kesildi mi? Uyarı ekle
            const processed = geminiPostProcess(text);
            const final = finishReason === 'MAX_TOKENS'
              ? processed + '<br><br><em style="color:var(--odeal-muted); font-size:11px;">⚠ Cevap uzun, tamamı sığmadı. Daha spesifik soru sorman daha net cevap verebilir.</em>'
              : processed;
            return { text: final, source: 'gemini', model, finishReason };
          }
          continue;
        }

        // 401/403/429 → key sorunu, sonraki key'e geç
        if ([401, 403, 429].includes(res.status)) {
          console.warn(`[Gemini] Key #${keyIdx + 1} ${res.status} — sonraki key'e geçiliyor`);
          break;
        }

        // 400/404 → model sorunu, sonraki modeli dene (aynı key)
        if ([400, 404].includes(res.status)) {
          console.warn(`[Gemini] Model "${model}" ${res.status} — sonraki modele geçiliyor`);
          continue;
        }

        // Diğer hatalar
        const errBody = await res.text().catch(() => '');
        console.warn(`[Gemini] ${res.status}:`, errBody.substring(0, 200));
      } catch (e) {
        console.warn('[Gemini] Network/fetch hatası:', e.message);
      }
    }
  }

  console.warn('[Gemini] Tüm key+model kombinasyonları başarısız, mock cevaba düşüyoruz.');
  return { text: null, source: 'fallback' };
}

// Markdown → basit HTML
function geminiPostProcess(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')                                    // code block sil
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<strong>$1</strong>')
    .replace(/^## (.+)$/gm, '<strong style="font-size:15px;">$1</strong>')
    .replace(/^- (.+)$/gm, '• $1')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
    .trim();
}

// ============= SCOPE → GEMINI CONTEXT =============
function buildGeminiSystemPrompt() {
  const s = currentScope();
  if (!s.patron) return 'Sen ÖdeAI asistanısın.';

  const today = new Date();
  const todayStr = today.toLocaleDateString('tr-TR');

  let ctx = `Sen "ÖdeAI"sın — Ödeal POS'un KOBİ'lere sunduğu AI karar destek asistanı.

GENEL KURALLAR:
- Türkçe yaz, akıcı ve doğal ol. 80-150 kelime arası, asla 200'ü geçme.
- Düşünmeden konuşma; verilen veriye dayanarak hesaplama yap, sayı ver.
- Sayıları "₺" ile yaz, Türkçe binlik ayraç (123.456₺).
- Yüzde için "%X" yaz (örn: %23 yükseliş).
- ASLA cümle yarıda bırakma. Çıktıyı tamamla.

FORMAT:
- HTML kullan: <strong>, <em>, <br><br> (paragraf), • (madde işareti)
- Markdown YOK: # ## *** kullanma, kod bloğu yazma.
- Başlangıçta selamlama yapma, doğrudan cevaba gir.
- Bitir cümleni tam olarak.

YASAKLAR:
- "Patron'a sor", "yöneticinize danışın" gibi yönlendirme yapma.
- Kullanıcı KOBİ ise diğer şubelerden bahsetme.
- Veride olmayan bilgiyi uydurma — "elimde yok" de.

BUGÜN: ${todayStr}
KULLANICI: ${s.patron.fullName}
`;

  if (s.isPatron) {
    ctx += `MOD: PATRON — ${s.patron.businessIds.length} bayisinin tüm verisine erişimin var.

BAYİLER:
`;
    s.patron.businessIds.forEach(bid => {
      const b = BUSINESSES[bid];
      const sec = SECTORS[b.sector];
      ctx += `▸ ${b.name}
  - Sektör: ${sec.label} | Yer: ${b.location}
  - Aktif: ${b.activeSince} | Personel: ${b.staffCount} | Müşteri: ${b.customers}
  - Aylık ortalama: ${b.baseMonthly.toLocaleString('tr-TR')}₺ | Top ürün: ${b.topProduct}
  - Hava etkisi: yağmur ${sec.weatherImpact.yağmurlu}%, soğuk ${sec.weatherImpact.soğuk}%, sıcak ${sec.weatherImpact.sıcak}%
  - Not: ${b.notable}
`;
    });

    ctx += `\nGEÇMIŞ AYLIK CIROLAR (son 24 ay):\n`;
    s.patron.businessIds.forEach(bid => {
      const b = BUSINESSES[bid];
      ctx += `\n${b.shortName}:\n`;
      for (let i = 23; i >= 0; i--) {
        const d = new Date(today);
        d.setMonth(d.getMonth() - i);
        const y = d.getFullYear(), m = d.getMonth() + 1;
        const r = getMonthlyRevenue(bid, y, m);
        ctx += `  ${MONTHS_TR[m]} ${y}: ${r.toLocaleString('tr-TR')}₺\n`;
      }
    });

    ctx += `\nKISA SÜRE TAHMİNLERİ (her bayi için):\n`;
    s.patron.businessIds.forEach(bid => {
      const b = BUSINESSES[bid];
      ctx += `${b.shortName}: son 7 gün ≈ ${estimateLastNDays(bid, 7).toLocaleString('tr-TR')}₺ | son 30 gün ≈ ${estimateLastNDays(bid, 30).toLocaleString('tr-TR')}₺ | son 90 gün ≈ ${estimateLastNDays(bid, 90).toLocaleString('tr-TR')}₺\n`;
    });

    // Patron toplam aylar
    ctx += `\nPATRON TOPLAM (son 12 ay):\n`;
    for (let i = 11; i >= 0; i--) {
      const d = new Date(today);
      d.setMonth(d.getMonth() - i);
      const y = d.getFullYear(), m = d.getMonth() + 1;
      const r = getPatronRevenue(s.patron.id, y, m);
      ctx += `  ${MONTHS_TR[m]} ${y}: ${r.toLocaleString('tr-TR')}₺\n`;
    }

    ctx += `\nKULLANICIYA NASIL CEVAP VERMELİSİN:
- Genel ciro/satış soruları → patron toplamı ver, sonra bayi dağılımını listele
- Belirli bayi adı (örn "DAP İnşaat", "Glow Kozmetik") geçerse → o bayi için cevap ver
- "Bayilerimi kıyasla" → 3-4 satır kıyaslama tablosu
- "Son N gün" → yukarıdaki kısa süre tahminlerinden ya da hesapla
`;
  } else {
    const b = s.business;
    const sec = SECTORS[b.sector];
    ctx += `MOD: KOBİ — Sadece ${b.shortName} verisini görebilirsin. Diğer şubelerden bahsetme.

İŞLETME:
- Ad: ${b.name}
- Sektör: ${sec.label} | Yer: ${b.location}
- Aktif: ${b.activeSince} | Personel: ${b.staffCount} | Müşteri: ${b.customers}
- Aylık ortalama ciro: ${b.baseMonthly.toLocaleString('tr-TR')}₺
- Top ürün: ${b.topProduct}
- Not: ${b.notable}
- Hava etkisi: yağmur ${sec.weatherImpact.yağmurlu}%, güneş ${sec.weatherImpact.güneşli}%, soğuk ${sec.weatherImpact.soğuk}%, sıcak ${sec.weatherImpact.sıcak}%
- Hava notu: ${sec.impactNote}

GEÇMIŞ 24 AY CIROSU:
`;
    for (let i = 23; i >= 0; i--) {
      const d = new Date(today);
      d.setMonth(d.getMonth() - i);
      const y = d.getFullYear(), m = d.getMonth() + 1;
      const r = getMonthlyRevenue(b.id, y, m);
      ctx += `  ${MONTHS_TR[m]} ${y}: ${r.toLocaleString('tr-TR')}₺\n`;
    }

    ctx += `\nKISA SÜRE TAHMİNLERİ (yaklaşık):
- Son 7 gün: ${estimateLastNDays(b.id, 7).toLocaleString('tr-TR')}₺
- Son 14 gün: ${estimateLastNDays(b.id, 14).toLocaleString('tr-TR')}₺
- Son 25 gün: ${estimateLastNDays(b.id, 25).toLocaleString('tr-TR')}₺
- Son 30 gün: ${estimateLastNDays(b.id, 30).toLocaleString('tr-TR')}₺
- Son 60 gün: ${estimateLastNDays(b.id, 60).toLocaleString('tr-TR')}₺
- Son 90 gün: ${estimateLastNDays(b.id, 90).toLocaleString('tr-TR')}₺

KULLANICIYA NASIL CEVAP VERMELİSİN:
- Sadece bu işletme hakkında konuş
- "Patron'a sor" deme — kullanıcı zaten yetkili
- Geçmiş aylık veriden hesapla
- "Son N gün" → yukarıdan al, gerekirse interpole et
- Tahmin sorulursa son aylarda büyüme yönüne göre cevapla
`;
  }

  return ctx;
}

// Son N gün için yaklaşık ciro (deterministik)
function estimateLastNDays(businessId, n) {
  const today = new Date();
  let total = 0;
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const y = d.getFullYear(), m = d.getMonth() + 1;
    const monthlyRev = getMonthlyRevenue(businessId, y, m);
    const daysInMonth = new Date(y, m, 0).getDate();
    total += monthlyRev / daysInMonth;
  }
  return Math.round(total);
}

// Ana giriş — UI'dan çağırılır
async function askGemini(userQuery) {
  const sys = buildGeminiSystemPrompt();
  const result = await callGemini(sys, userQuery);
  return result;
}

// ============= AI MODÜL UZMAN PROMPT'LARI =============
const MODULE_PROMPT_CONTEXTS = {
  forecast: `MODÜL: TAHMİN ASİSTANI (LSTM)

Görevin: Geçmiş POS verisini kullanarak gelecek tahmini yap.

ÇIKTI YAPISI (her zaman bu sıra):
1. Tek cümle özet (sayı ile)
2. <br><br>
3. 2-3 madde (•) — destekleyici sayılar + gerekçeler
4. <br><br>
5. <strong>💡 Önerim:</strong> tek cümle aksiyon

KURALLAR:
- "Tahmini" kelimesini kullan, kesinlik iddia etme
- ±%10-15 hata payı belirt
- Sezonsallık + son aylar büyüme trendini birleştir
- Hava etkisi sektörün yüzdesini kullan
- Maks 110 kelime`,

  customer: `MODÜL: MÜŞTERİ ANALİSTİ (Transformer)

Görevin: Müşteri davranışı, segmentasyon, kayıp tahmini, çapraz satış.

ÇIKTI YAPISI:
1. Tek cümle ana bulgu (sayı ile)
2. <br><br>
3. Liste (• ile) — her madde 1 müşteri/segment + 1 cümle gerekçe
4. <br><br>
5. <strong>💡 Önerim:</strong> tek cümle aksiyon (% kabul olasılığıyla)

KURALLAR:
- 4 segment: VIP / Sadık / Düzenli / Kayıp Risk
- Skoru gerekçele ("37 gün gelmedi", "olumsuz duygu")
- Maks 100 kelime`,

  message: `MODÜL: MESAJ ASİSTANI

Görevin: Müşteri için kişiselleştirilmiş WhatsApp/SMS metni üret.

ÇIKTI YAPISI:
1. Mesaj metni (4-6 satır), <br> ile satır kır
2. <br><br>
3. <em>Ton: [seçilen ton] · Tahmini açılma: %XX</em>

KURALLAR:
- Doğal, samimi ama profesyonel Türkçe
- 1-2 emoji
- [link] = ödeme linki yer tutucu
- {Ad} = müşteri ismi yer tutucu
- 60-90 kelime mesaj
- Selamlama → bağlam → eylem → kapanış akışı`,

  campaign: `MODÜL: KAMPANYA STÜDYOSU

Görevin: Hedef + teklif + zamanlama + ROI ile bütünleşik kampanya öner.

ÇIKTI YAPISI (sıkı):
<strong>📅 Kampanya: [Ad]</strong>
<br><br>
🎯 <strong>Hedef:</strong> [segment] (~XX kişi)<br>
🎁 <strong>Teklif:</strong> [açıklama]<br>
💬 <strong>Kanal:</strong> [WhatsApp/SMS/email]<br>
⏰ <strong>Zaman:</strong> [tarih/saat]
<br><br>
<strong>📊 Tahmin:</strong><br>
• Yanıt oranı: %XX<br>
• Dönüşüm: XX kişi<br>
• Ek gelir: <strong>~X.XXX₺</strong>
<br><br>
<em>💡 Aktif et?</em>

KURALLAR:
- Tüm sayılar tahmini, gerçekçi olsun
- Maks 110 kelime`,

  insight: `MODÜL: İÇGÖRÜ ÜRETİCİSİ

Görevin: Verideki gizli paternleri + anomalileri + fırsatları sun.

ÇIKTI YAPISI:
1. <strong>🔍 [N] dikkat çeken sinyal:</strong>
2. <br><br>
3. 2-3 madde, her biri:
   <strong>[Başlık]:</strong> [Bulgu sayı ile] — <em>[1 cümle aksiyon önerisi]</em>
   <br><br>

KURALLAR:
- "Beklenmedik" / "ilginç" sinyalleri öncele
- Her bulguda sayısal kanıt (%XX, "son N hafta")
- Sebep-sonuç bağı kur
- Aksiyonel — sadece "ilginç" değil, "şunu yap"
- Maks 110 kelime`
};

async function askGeminiForModule(moduleId, userQuery) {
  const baseSys = buildGeminiSystemPrompt();
  const moduleCtx = MODULE_PROMPT_CONTEXTS[moduleId] || '';
  const sys = baseSys + '\n\n' + moduleCtx;
  return await callGemini(sys, userQuery);
}

// ============= AI TON REWRITER (Tahsilat) =============
async function rewriteMessageTone(originalMessage, toneInstruction) {
  const sys = `Sen Türkçe iş yazışması redaktörüsün.
Sana verilen mesajı yeniden yaz. Talimatı uygula.
Kurallar:
- Ana içeriği koru (tutarı, tarihi, ödeme linkini)
- Sadece TON ve UZUNLUK değişebilir
- WhatsApp uyumlu (4-6 satır)
- Emoji 1-2 tane, abartma
- HTML kullanma, düz metin yaz (newline ayraç)
- Cevabında SADECE yeni mesaj olsun, başka açıklama yapma`;
  const user = `TALİMAT: ${toneInstruction}\n\nORİJİNAL MESAJ:\n${originalMessage}\n\nYENİDEN YAZ:`;
  return await callGemini(sys, user);
}
