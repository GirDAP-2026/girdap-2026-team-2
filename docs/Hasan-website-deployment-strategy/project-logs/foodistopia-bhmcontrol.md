# foodistopia-bhmcontrol Log

## Proje Ozeti
- ProjeAdi: foodistopia-bhmcontrol
- CurrentGcpAccount: foodistopia@gmail.com
- KayitBaslangicTarihi: 2026-04-22
- Kapsam: BHM Control uygulamasi web/api dagitim ortami.
- Mantik: Cloud Run web+api, Cloud SQL ve migration bucketlari.
- MevcutAsama: Aktif calisan prod servisler
- SonGuncelleme: 2026-04-22

## Servis Envanteri (2026-04-22)
- Cloud Run:
  - `bhm-api`
  - `bhm-web`
- Cloud SQL:
  - `bhmdb` (MYSQL_8_0, europe-west1, RUNNABLE)
- Buckets:
  - `foodistopia-bhmcontrol-migration`
  - `foodistopia-shared-migration`

## Kayitlar

## 2026-04-22 16:35
- TarihSaat: 2026-04-22 16:35
- Proje: foodistopia-bhmcontrol
- CurrentGcpAccount: foodistopia@gmail.com
- KayitBaslangicTarihi: 2026-04-22
- Asama: GCP envanter dogrulamasi
- Yapilanlar: Proje kaynaklari gcloud ile taranip deployment/migration gunlugune eklendi.
- MigrationNotu: Shared migration bucket kullaniminda proje erisim sinirlari migration oncesi kontrol edilmeli.
- RiskUyari: Ortak bucket kaynaklarinda yanlis proje temizligi veri etkisi yaratabilir.
- SonrakiAdim: Tasima zamani IAM kapsamlari ve bucket sahipligi dogrulanacak.
