# Kayit Kurallari (RULES)

Bu dosya, "kaydet" ve "mevcut durumu al" komutlarinda hangi kaydin nereye ve hangi formatta yazilacagini belirler.

## 1) Zorunlu Okuma Kurali
- "Kaydet" komutu geldiginde ilk adim bu dosyayi okumaktir.
- Kayit yazmadan once hedef proje adini netlestir.

## 2) Cift Kayit Kurali
Her kayit ayni anda iki dosyaya yazilir:
1. `project-logs/_master-log.md`
2. `project-logs/<project-name>.md`

## 3) Kayit Formati (Zorunlu Alanlar)
Her kayit asagidaki alanlari icermelidir:
- TarihSaat (ISO benzeri: `YYYY-MM-DD HH:mm`)
- Proje
- CurrentGcpAccount
- KayitBaslangicTarihi
- Asama
- Yapilanlar
- MigrationNotu
- RiskUyari
- SonrakiAdim

## 4) "Mevcut durumu al" Komutu
- Kullanici yeni not/ozet verdiginde bunu analiz et.
- En uygun proje dosyasini sec.
- Ayni kaydi hem master loga hem proje loguna ekle.
- Notlarda migration bilgisi varsa "MigrationNotu" alanini mutlaka doldur.

## 5) Proje Secim Kurali
- Proje acik belirtilmisse o dosyaya yaz.
- Belirtilmemisse once proje adini sor.
- Proje dosyasi yoksa `project-logs/<project-name>.md` dosyasini olustur ve sonra kaydet.

## 6) Yeni Proje Acilis Kurali
- Kullanici "yeni proje olusturdum" veya benzeri bir ifade verirse yeni proje olarak kabul et.
- `project-logs/<project-name>.md` dosyasini `_project-template.md` formatinda otomatik olustur.
- `project-logs/_master-log.md` icinde o proje icin tarihli ilk kaydi ac ve "proje acilisi" notu dus.
- Yeni proje ilk kaydinda `CurrentGcpAccount` ve `KayitBaslangicTarihi` alanlarini zorunlu doldur.
- Sonraki kayitlarda bu yeni proje dosyasi + master log cift kayit kurali aynen devam eder.

## 7) GCP Migration Hatirlatma Kurali
Migration baglaminda kayit yapmadan once su iki bilgiyi mutlaka sor/teyit et:
- Eski hesap maili (kredisi bitmek uzere olan)
- Yeni migration hesap maili

Ayrica su notu hatirlat:
- Varsayilan strateji: minimal Storage + minimal SQL + minimal Cloud Run

## 8) Kayit Ornegi
```md
## 2026-04-22 16:30
- TarihSaat: 2026-04-22 16:30
- Proje: godiva-elix
- CurrentGcpAccount: foodistopia@gmail.com
- KayitBaslangicTarihi: 2026-04-22
- Asama: Preview stabilizasyonu
- Yapilanlar: Frontend preview env degerleri guncellendi, backend health dogrulandi.
- MigrationNotu: Eski hesaptan yeni hesaba secret listesi karsilastirildi.
- RiskUyari: Domain cutover oncesi TTL hala yuksek olabilir.
- SonrakiAdim: Namecheap CNAME kayitlarini planli pencerede guncelle.
```
