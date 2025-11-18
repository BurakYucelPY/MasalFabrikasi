import google.generativeai as genai
import PIL.Image
import os
from dotenv import load_dotenv

# --- AYARLAR ---
IMAGES_DIR = "images"
MUMKUN_TEMALAR = ["MACERA", "DOSTLUK", "CESARET", "EĞİTİCİ", "KOMİK"]

load_dotenv() 
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("HATA: .env dosyasından GEMINI_API_KEY okunamadı!")
    exit()

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')


def klasorden_resimleri_yukle():
    
    resimler = []
    gecerli_uzantilar = ('.png', '.jpg', '.jpeg')
    
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
    """Verilen resim listesi ve temayı kullanarak masal üretir."""
    
    if not resim_listesi:
        print("\nUYARI: images/ klasöründe hiç resim bulunamadı. Lütfen resim ekleyin.")
        return

    prompt = f"""
    Sen harika bir çocuk masalı yazarı ve pedagogusun. 
    Aşağıdaki resimlere dikkatlice bak. Resimlerdeki tüm karakterleri, ortamları ve olayları BİRLEŞTİREREK 
    bütünlüklü bir hikaye kurgula.
    
    İstenen Tema: **{tema.upper()}**
    
    Masalın uzunluğu en az 4 paragraf olmalı ve mutlaka seçilen temayla ilgili öğretici bir ders içermelidir. 
    Masalı {tema} temasına uygun olarak, Türkçe ve akıcı bir dille yaz. 
    Masalına yaratıcı bir başlık koy.
    """
    
    multimodal_input = [prompt] + resim_listesi

    print(f"\nSeçilen Tema: {tema}. Toplam Resim Sayısı: {len(resim_listesi)}")
    print("Gemini 2.5 Flash masalı düşünüyor... Lütfen bekle...")

    try:
        response = model.generate_content(multimodal_input)
        
        print("\n" + "="*30)
        print("MASAL GELDİ:")
        print("="*30 + "\n")
        print(response.text)
        
    except Exception as e:
        print("Bir hata oldu:", e)


if __name__ == "__main__":
    
    # DENEME AYAR
    SECİLEN_TEMA = "MACERA" 
    
    print("\n\n--- YENİ ESNEK MASAL SİSTEMİ BAŞLIYOR ---")
    
    resimler = klasorden_resimleri_yukle()
    
    masal_yarat(resimler, SECİLEN_TEMA)