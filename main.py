import google.generativeai as genai
import PIL.Image
import os
from dotenv import load_dotenv

# --- AYARLAR ---
# Resimlerin bulunduğu klasör
IMAGES_DIR = "images" 
# Temaları burada tanımlıyoruz
MUMKUN_TEMALAR = ["MACERA", "DOSTLUK", "CESARET", "EĞİTİCİ", "KOMİK"]
# ----------------

# .env dosyasındaki anahtarı oku
load_dotenv() 
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("HATA: .env dosyasından GEMINI_API_KEY okunamadı!")
    print("Lütfen .env dosyasını kontrol edin ve anahtarınızı doğru yazdığınızdan emin olun.")
    exit()

genai.configure(api_key=GEMINI_API_KEY)
# En güçlü ve hızlı model
model = genai.GenerativeModel('gemini-2.5-flash')


def klasorden_resimleri_yukle():
    """Belirtilen klasördeki tüm resim dosyalarını bulur ve PIL objeleri olarak yükler."""
    resimler = []
    gecerli_uzantilar = ('.png', '.jpg', '.jpeg')
    
    if not os.path.isdir(IMAGES_DIR):
        print(f"HATA: '{IMAGES_DIR}' klasörü bulunamadı!")
        return []
        
    dosya_isimleri = os.listdir(IMAGES_DIR)
    
    for dosya_adi in dosya_isimleri:
        tam_yol = os.path.join(IMAGES_DIR, dosya_adi)
        
        if os.path.isfile(tam_yol) and dosya_adi.lower().endswith(gecerli_uzantilar):
            try:
                resimler.append(PIL.Image.open(tam_yol))
                print(f"-> {dosya_adi} yüklendi.")
            except Exception as e:
                print(f"HATA: {dosya_adi} yüklenirken sorun oluştu: {e}")

    return resimler


def masal_yarat(resim_listesi: list, tema: str):
    """4 aşamalı (Chaining) yöntemle uzun ve tutarlı bir masal üretir."""
    
    if not resim_listesi:
        print("\nUYARI: images/ klasöründe hiç resim bulunamadı. Lütfen resim ekleyin.")
        return

    print(f"\nSeçilen Tema: {tema}. Toplam Resim Sayısı: {len(resim_listesi)}")
    print("Gemini ile 4 aşamalı uzun hikaye üretimi başlıyor...")

    resim_multimodal = [r for r in resim_listesi]
    tum_masal = ""
    
    # =======================================================
    # AŞAMA 1: KURGU OLUŞTURMA (PLAN) - (Kurgu sadece arka planda kullanılacak)
    # =======================================================
    print("\n[ADIM 1/4] Kurgu (Hikaye Planı) oluşturuluyor...")
    
    kurgu_prompt = f"""
    Sen harika bir çocuk kitabı yazarı ve kurgu uzmanısın. Ekli resimlere bak ve 
    {tema.upper()} temasına uygun, çocuklar için öğretici ve eğlenceli, 3 bölümlü (Giriş, Gelişme, Sonuç) 
    bir hikayenin detaylı kurgusunu (ana hatlarını) yaz. Masalın adı da olsun. Sadece kurguyu maddeler halinde (maksimum 150 kelime) yaz.
    """
    
    kurgu_response = model.generate_content([kurgu_prompt] + resim_multimodal)
    kurgu_metni = kurgu_response.text
    # NOT: Kurgu metni, tum_masal değişkenine eklenmiyor, böylece çıktıya yansımıyor.
    print("✅ Kurgu Planı Tamamlandı.")
    
    # =======================================================
    # AŞAMA 2: GİRİŞ BÖLÜMÜNÜ YAZMA
    # =======================================================
    print("[ADIM 2/4] Giriş bölümü yazılıyor...")
    giris_prompt = f"""
    Az önce yazdığın kurgu planı budur: {kurgu_metni}
    Bu kurguya uygun olarak, kitabın ilk bölümü olan **GİRİŞ** bölümünü detaylı ve akıcı bir dille yaz. 
    Giriş bölümü en az 5-6 uzun paragraf olmalıdır. Başka bir şey yazma, sadece bölüm metnini yaz.
    """
    giris_response = model.generate_content([giris_prompt] + resim_multimodal)
    giris_metni = giris_response.text
    tum_masal += giris_metni
    print("✅ Giriş Bölümü Tamamlandı.")

    # =======================================================
    # AŞAMA 3: GELİŞME BÖLÜMÜNÜ YAZMA
    # =======================================================
    print("[ADIM 3/4] Gelişme bölümü yazılıyor...")
    gelisme_prompt = f"""
    Hikayenin kurgusu bu: {kurgu_metni}
    Hikayenin şu ana kadar yazılan kısmı (Giriş) bu: {giris_metni[-800:]} 
    Giriş bölümünün sonuna bağlanarak, kurgunun ortasına uygun olacak şekilde **GELİŞME** bölümünü detaylıca yaz. 
    Bu bölüm en az 8-10 uzun paragraf olmalıdır. Başka bir şey yazma, sadece bölüm metnini yaz.
    """
    gelisme_response = model.generate_content([gelisme_prompt] + resim_multimodal)
    gelisme_metni = gelisme_response.text
    tum_masal += gelisme_metni
    print("✅ Gelişme Bölümü Tamamlandı.")

    # =======================================================
    # AŞAMA 4: SONUÇ BÖLÜMÜNÜ YAZMA
    # =======================================================
    print("[ADIM 4/4] Sonuç bölümü yazılıyor...")
    sonuc_prompt = f"""
    Hikayenin kurgusu bu: {kurgu_metni}
    Hikayenin şu ana kadar yazılan son kısmı (Gelişme) bu: {gelisme_metni[-800:]} 
    Gelişme bölümünün sonuna bağlanarak, kurguyu tamamlayacak şekilde **SONUÇ** bölümünü yaz. 
    Tüm problemler çözülsün ve {tema} temasına uygun bir ders çıkarıldığından emin ol. 
    Sonuç bölümü en az 4-5 uzun paragraf olmalıdır. Başka bir şey yazma, sadece bölüm metnini yaz.
    """
    sonuc_response = model.generate_content(sonuc_prompt)
    sonuc_metni = sonuc_response.text
    tum_masal += sonuc_metni
    print("✅ Sonuç Bölümü Tamamlandı.")

    # =======================================================
    # FİNAL
    # =======================================================
    print("\n" + "="*50)
    print("UZUN KİTAP FORMATINDA MASALINIZ HAZIR!")
    print("="*50 + "\n")
    print(tum_masal) # Sadece birleştirilmiş masalın kendisi yazdırılıyor.


if __name__ == "__main__":
    
    # ⭐️ DENEME AYARLARI
    # Temayı burayı değiştirerek test edebilirsin
    SECİLEN_TEMA = "DOSTLUK" 
    
    print("\n\n--- 4 AŞAMALI KİTAP ÜRETİM SİSTEMİ BAŞLIYOR ---")
    
    # 1. Resimleri Klasörden Yükle
    resimler = klasorden_resimleri_yukle()
    
    # 2. Masalı Yarat
    masal_yarat(resimler, SECİLEN_TEMA)