# GCP Account Migration Checklist

Bu checklist, bir GCP hesaptan digerine proje migration yaparken sifirdan son kontrole kadar izlenir.

## A) Baslangic Bilgileri (Zorunlu)
- [ ] Eski hesap maili (kredisi bitmek uzere olan) alindi.
- [ ] Yeni migration hesap maili alindi.
- [ ] Yeni hesapta proje olusturma/yetki/Cloud Build/Cloud Run erisimi dogrulandi.
- [ ] Migration kapsami (hangi projeler tasinacak) netlestirildi.

## B) Kaynak Envanteri (Eski Hesap)
- [ ] Cloud Run servisleri listelendi.
- [ ] Cloud SQL instance/database/user envanteri cikarildi.
- [ ] Cloud Storage bucket ve kritik obje siniflari not edildi.
- [ ] Secret Manager secret listesi alindi.
- [ ] Domain mapping/certificate/custom domain kayitlari not edildi.
- [ ] Gerekiyorsa Pub/Sub, Scheduler, Artifact Registry, VPC baglantilari not edildi.

## C) Minimal Yeni Ortam Kurulumu
- [ ] Yeni projede minimal kaynak yaklasimi secildi:
  - [ ] Cloud Run: sadece gerekli web/api servisleri
  - [ ] Cloud SQL: minimum uygun tier
  - [ ] Storage: minimum bucket sayisi + lifecycle
- [ ] Yeni projede gerekli API servisleri acildi.
- [ ] Runtime service account ve gerekli IAM rolleri tanimlandi.
- [ ] Secret Manager yapisi yeni projede olusturuldu.

## D) Uygulama Tasima ve Dogrulama
- [ ] Backend deploy edildi.
- [ ] Frontend deploy edildi.
- [ ] Env ve Secret baglantilari dogrulandi.
- [ ] DB migration guvenli sekilde uygulandi.
- [ ] Preview testleri yapildi.
- [ ] Prod dogrulamasi (health + kritik endpointler) tamamlandi.

## E) DNS / Domain Cutover
- [ ] Namecheap TTL gecici olarak dusuruldu.
- [ ] Yeni hedefler hazir olduktan sonra A/AAAA/CNAME kayitlari guncellendi.
- [ ] SSL/dogrulama tamamlandi.
- [ ] Eski mapping baglantisi guvenli sekilde sonlandirildi.
- [ ] Otomatik silme yoksa manuel adimlar kullaniciya not edildi.

## F) Eski Hesap Kapanis Kontrolleri (Kritik)
- [ ] Eski projelerde faturalanan aktif kaynak kalmadi.
- [ ] Gecici test kaynaklari da silindi.
- [ ] Billing account baglantisi kapatildi veya gerekli kapsamda sonlandirildi.
- [ ] Odeme yontemi/kart baglantilari kontrol edildi.
- [ ] Beklenmeyen masraf riski icin son bir kez "aktif servis = 0" dogrulandi.

## G) Kayit ve Kapanis
- [ ] Yapilanlar `project-logs/_master-log.md` dosyasina kaydedildi.
- [ ] Ilgili proje log dosyasina ayni kayit dusuldu.
- [ ] Sonraki adimlar ve kalan riskler yazildi.
