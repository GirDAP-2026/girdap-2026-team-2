# foodistopia-edura Log

## Proje Ozeti
- ProjeAdi: foodistopia-edura
- CurrentGcpAccount: foodistopia@gmail.com
- KayitBaslangicTarihi: 2026-04-22
- Kapsam: Edura platformu icin web/api deployment yapisi.
- Mantik: Cloud Run api + api-preview, Cloud SQL ve proje bucketlari.
- MevcutAsama: Aktif canli + preview backend yapisi
- SonGuncelleme: 2026-04-22

## Servis Envanteri (2026-04-22)
- Cloud Run:
  - `edura-api`
  - `edura-api-preview`
- Cloud SQL:
  - `edura-sql` (MYSQL_8_0, europe-west1, RUNNABLE)
- Buckets:
  - `foodistopia-edura-storage`
  - `foodistopia-edura_cloudbuild`

## Kayitlar

## 2026-04-22 16:35
- TarihSaat: 2026-04-22 16:35
- Proje: foodistopia-edura
- CurrentGcpAccount: foodistopia@gmail.com
- KayitBaslangicTarihi: 2026-04-22
- Asama: GCP envanter dogrulamasi
- Yapilanlar: Cloud Run, SQL ve Storage servisleri listelenip proje loguna islenmis durum envanteri olusturuldu.
- MigrationNotu: Gelecek hesap migrationinda preview/prod ayrimi korunacak sekilde tasima planlanmali.
- RiskUyari: Frontend servisi envanterde gorunmuyor; mimari tercihi veya eksik deploy olabilir, teyit edilmeli.
- SonrakiAdim: Proje sahibiyle frontend hedef topolojisi netlestirilecek.
