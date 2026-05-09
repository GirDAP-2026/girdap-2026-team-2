# Hasan Website Deployment Strategy

Bu klasor, farkli projelerde tekrar kullanilabilecek deployment ve migration belgelerini bir arada tutar.

## Amac
- Proje-ozel teknik detaylari ayirip, yeniden kullanilabilir bir GCP deployment standardi sunmak.
- Hesaplar arasi migration (mail/account degisimi), domain cutover ve maliyet kapama adimlarini standartlastirmak.
- Proje bazli + merkezi gunluk sistemi ile not kaydini tutarli hale getirmek.

## Klasor Icerigi
- `general-deployment-logic.md`: Branch, trigger, preview/prod, secret ve genel isletim mantigi.
- `gcp-account-migration-checklist.md`: Eski hesaptan yeni hesaba gecis kontrol listesi.
- `namecheap-domain-mapping-migration.md`: Namecheap DNS ve GCP domain mapping gecis adimlari.
- `RULES.md`: "kaydet" ve "mevcut durumu al" komutlarinda uyulacak kayit protokolu.
- `project-logs/_master-log.md`: Tum projelerin merkezi kronolojik gunlugu.
- `project-logs/*.md`: Her proje icin ayri gunluk.

## Kullanim
1. Yeni proje baslarken once `general-deployment-logic.md` uzerinden iskeleti sec.
2. Hesap migration varsa `gcp-account-migration-checklist.md` ile ilerle.
3. Domain tasima varsa `namecheap-domain-mapping-migration.md` adimlarini uygula.
4. Her guncellemede once `RULES.md` oku, sonra kayitlari hem master loga hem proje loguna isle.

## Not
Bu klasor yerel operasyon dokumantasyonudur. Git'e push edilmemesi hedeflenmistir (root `.gitignore` kurali ile).
