# Namecheap Domain Mapping Migration

Bu belge, Namecheap DNS kayitlarini eski GCP ortami yerine yeni ortama gecirirken izlenecek net adimlari verir.

## 1) Hazirlik
- Domain listesi ve hangi projenin hangi domaine bagli oldugu netlestirilir.
- Eski GCP mapping kayitlari not edilir (root domain, subdomain, certificate durumu).
- Yeni GCP projesinde hedef servis URL'leri hazirlanir.

## 2) DNS Degisim Sirasi
1. Namecheap tarafinda TTL'i gecici olarak dusur (ornek: 300s).
2. Yeni ortamda domain mapping/certificate dogrulama adimini baslat.
3. Hazir olunca DNS kayitlarini degistir:
   - A/AAAA root kayitlari
   - CNAME subdomain kayitlari
4. Propagation boyunca eski ve yeni endpoint health kontrolleri yap.
5. Trafik yeni ortama oturunca eski mappingleri kapat.

## 3) Domain Mapping Silme Notu
- Eger otomatik silme adimi aracla yapilabiliyorsa otomatik uygula.
- Eger yetki/kisit sebebiyle otomatik silinmiyorsa manuel silme zorunludur.
- Manuel silme gereken her kayit, migration notlarina acikca yazilir.

## 4) Dogrulama
- Domain dogru servise gidiyor mu?
- HTTPS sertifikasi aktif mi?
- API ve kritik sayfalar yeni ortamda dogru mu?
- Eski mapping kalintisi var mi?

## 5) Geri Alma (Rollback) Cekirdegi
- DNS cutover sonrasi kritik hata varsa:
  - Namecheap kayitlarini onceki hedefe geri al.
  - Eski ortam hala calisiyorsa gecici geri donus yap.
  - Sorun cozulunce tekrar kontrollu cutover yap.
