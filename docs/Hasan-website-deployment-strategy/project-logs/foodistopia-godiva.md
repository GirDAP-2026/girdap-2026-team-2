# foodistopia-godiva Log

## Proje Ozeti
- ProjeAdi: foodistopia-godiva
- CurrentGcpAccount: foodistopia@gmail.com
- KayitBaslangicTarihi: 2026-04-22
- Kapsam: Godiva Elix web/api canli GCP projesi.
- Mantik: Cloud Run uzerinden web+api, Cloud SQL ve medya/migration bucketlari.
- MevcutAsama: Aktif calisan prod servisler
- SonGuncelleme: 2026-04-22

## Servis Envanteri (2026-04-22)
- Cloud Run:
  - `godiva-elix-api`
  - `godiva-elix-web`
- Cloud SQL:
  - `godivadb` (MYSQL_8_0, europe-west1, RUNNABLE)
- Buckets:
  - `foodistopia-godiva-elix-media`
  - `foodistopia-godiva-migration`
  - `foodistopia-godiva_cloudbuild`

## Kayitlar

## 2026-04-22 16:35
- TarihSaat: 2026-04-22 16:35
- Proje: foodistopia-godiva
- CurrentGcpAccount: foodistopia@gmail.com
- KayitBaslangicTarihi: 2026-04-22
- Asama: GCP envanter dogrulamasi
- Yapilanlar: Proje servisleri gcloud ile tarandi, aktif Cloud Run/SQL/Storage kaynaklari belgelendi.
- MigrationNotu: Hesaplar arasi tasima plani icin mevcut kaynak tabani netlesti.
- RiskUyari: Preview servisleri proje stratejisine gore sonradan acilabilir, su an envanterde gorunmuyor.
- SonrakiAdim: Migration baslangicinda eski/yeni hesap mail teyidi ile checklist uygulanacak.
