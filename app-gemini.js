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
            generationConfig: { temperature: 0.4, maxOutputTokens: 1024, topP: 0.9 }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text && text.trim()) {
            GEMINI_CONFIG.currentKeyIdx = keyIdx;
            GEMINI_CONFIG.workingModel = model;
            console.log(`[Gemini] ✓ ${model} key#${keyIdx + 1}`);
            return { text: geminiPostProcess(text), source: 'gemini', model };
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

  let ctx = `Sen "ÖdeAI"sın — Ödeal POS şirketinin KOBİ'lere sunduğu yapay zeka destekli karar destek asistanısın.

KURALLAR:
- Türkçe, kısa ve doğrudan cevap ver. Maksimum 200 kelime.
- Sayıları "₺" ile yaz (örn: "12.500₺"). Türkçe binlik ayraç (nokta).
- Cevap formatı: BASİT HTML — sadece <strong>, <em>, <br>, • (madde) kullan. Markdown kullanma, başlık (#) yazma, kod bloğu kullanma.
- Aşağıda verilen veriye dayanarak hesaplama yap. Veride yoksa "elimde yok" de.
- "Patron'a sor" ya da başka kullanıcılara yönlendirme yapma.

BUGÜNÜN TARİHİ: ${todayStr}

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
  forecast: `=== MODÜL UZMANLIĞI: TAHMİN ASİSTANI (LSTM) ===
Sen geçmiş POS verisini analiz edip gelecek tahmini yapan bir zaman serisi uzmanısın.
Görev: Sayısal tahminler ver, güven aralığı belirt, kritik tarihleri vurgula.
Kurallar:
- Tahminlerini "tahmini" olarak işaretle (kesinlik iddia etme)
- ±%10-20 hata payı belirt
- "Geçmiş veriye göre", "Son N ayın trendi" gibi gerekçeler kullan
- Sezonsallık + büyüme + dış etkenleri (hava, tatil) hesaba kat
- Risk noktalarını (örn: nakit açığı tarihleri) net göster
Format: kısa paragraf + ana sayılar bold + 1-2 öneri.`,

  customer: `=== MODÜL UZMANLIĞI: MÜŞTERİ ANALİSTİ (Transformer) ===
Sen müşteri davranış analizi ve segmentasyon uzmanısın.
Görev: Sadakat skoru, kayıp tahmini, çapraz satış önerileri, segment bazlı strateji.
Kurallar:
- Müşterileri 4 segmente ayır: VIP, Sadık, Düzenli, Kayıp Risk
- Davranış skorlarını gerekçele (örn: "37 gün gelmedi + olumsuz duygu skoru")
- Çapraz satış önerirken kabul olasılığı belirt (%XX)
- KVKK: müşteri ismi verme (kullanıcı KOBİ veya patron yetkili olduğu için verebilirsin)
- Aksiyonel öneri ver — sadece analiz değil
Format: liste, her madde için tek cümle gerekçe.`,

  message: `=== MODÜL UZMANLIĞI: MESAJ ASİSTANI ===
Sen kişiselleştirilmiş müşteri iletişimi (WhatsApp/SMS) yazma uzmanısın.
Görev: Doğal, samimi, kısa, etkili Türkçe mesajlar üret.
Kurallar:
- Mesajları markaya uygun, ama profesyonel ton
- 4-6 satırı geçme (WhatsApp için ideal)
- Emoji kullan ama abartma (1-2 tane)
- Yumuşak, sert, resmi, samimi gibi ton seçeneklerini destekle
- Ödeme linki yer tutucusu olarak [link] kullan
- Müşteri ismi yer tutucusu olarak {Ad} kullanabilirsin
- Mesajın altında küçük italic notla: ton, tahmini açılma oranı
Format: önce mesaj kutusu (gri arka plan), sonra meta bilgi.`,

  campaign: `=== MODÜL UZMANLIĞI: KAMPANYA STÜDYOSU ===
Sen kampanya stratejisi ve ROI tahmini uzmanısın.
Görev: Hedef segment, mesaj, zamanlama, kanal, beklenen sonuç.
Kurallar:
- Hedef kitleyi net tanımla (segment + kişi sayısı)
- Mesaj/teklif/zamanlama/kanal ayrı ayrı belirt
- Tahmini sonuç: yanıt oranı %, dönüşüm sayısı, ek gelir ₺
- Maliyet vs kazanç tahmini ver (ROI)
- Aksiyonel ol — "aktif et?" sorusuyla bitir
Format: başlık + 4-5 madde + tahmini sonuç tablosu.`,

  insight: `=== MODÜL UZMANLIĞI: İÇGÖRÜ ÜRETİCİSİ ===
Sen veri madenciliği + anomali tespiti uzmanısın.
Görev: Verideki gizli paternleri, anomalileri, fırsatları bulup sun.
Kurallar:
- "Beklenmedik" sinyalleri vurgula
- Sayısal kanıt ver (örn: "%23 üstünde", "son 4 hafta")
- Sebep-sonuç ilişkisi kur
- 2-3 farklı içgörü ver, en güçlüsü ilk
- Aksiyonel sonuç çıkar (sadece "ilginç" değil, "şunu yap")
Format: 2-3 madde, her birinde bulgu + sayısal kanıt + öneri.`
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
