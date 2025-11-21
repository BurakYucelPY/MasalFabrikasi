import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("HATA: .env dosyasından GEMINI_API_KEY okunamadı!")
    print("Lütfen .env dosyasını kontrol edin ve anahtarınızı doğru yazdığınızdan emin olun.")
    exit()

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')

def masal_yarat(resim_listesi: list, tema: str):
    """4 aşamalı (Chaining) yöntemle uzun ve tutarlı bir masal üretir."""
    
    if not resim_listesi:
        print("\nUYARI: images/ klasöründe hiç resim bulunamadı. Lütfen resim ekleyin.")
        return

    resim_multimodal = [r for r in resim_listesi]
    tum_masal = ""
    
    kurgu_prompt = f"""
    Sen harika bir çocuk kitabı yazarı ve kurgu uzmanısın. Ekli resimlere bak ve 
    {tema.upper()} temasına uygun, çocuklar için öğretici ve eğlenceli, 3 bölümlü (Giriş, Gelişme, Sonuç) 
    bir hikayenin detaylı kurgusunu (ana hatlarını) yaz. Masalın adı da olsun. Sadece kurguyu maddeler halinde (maksimum 150 kelime) yaz.
    """
    
    kurgu_response = model.generate_content([kurgu_prompt] + resim_multimodal)
    kurgu_metni = kurgu_response.text
    giris_prompt = f"""
    Az önce yazdığın kurgu planı budur: {kurgu_metni}
    Bu kurguya uygun olarak, kitabın ilk bölümü olan **GİRİŞ** bölümünü detaylı ve akıcı bir dille yaz. 
    Giriş bölümü en az 2-3 uzun paragraf olmalıdır. Başka bir şey yazma, sadece bölüm metnini yaz.
    """
    giris_response = model.generate_content([giris_prompt] + resim_multimodal)
    giris_metni = giris_response.text
    tum_masal += giris_metni
    gelisme_prompt = f"""
    Hikayenin kurgusu bu: {kurgu_metni}
    Hikayenin şu ana kadar yazılan kısmı (Giriş) bu: {giris_metni[-800:]} 
    Giriş bölümünün sonuna bağlanarak, kurgunun ortasına uygun olacak şekilde **GELİŞME** bölümünü detaylıca yaz. 
    Bu bölüm en az 6-8 uzun paragraf olmalıdır. Başka bir şey yazma, sadece bölüm metnini yaz.
    """
    gelisme_response = model.generate_content([gelisme_prompt] + resim_multimodal)
    gelisme_metni = gelisme_response.text
    tum_masal += gelisme_metni
    sonuc_prompt = f"""
    Hikayenin kurgusu bu: {kurgu_metni}
    Hikayenin şu ana kadar yazılan son kısmı (Gelişme) bu: {gelisme_metni[-800:]} 
    Gelişme bölümünün sonuna bağlanarak, kurguyu tamamlayacak şekilde **SONUÇ** bölümünü yaz. 
    Tüm problemler çözülsün ve {tema} temasına uygun bir ders çıkarıldığından emin olun. 
    Sonuç bölümü en az 2-3 uzun paragraf olmalıdır. Başka bir şey yazma, sadece bölüm metnini yaz.
    """
    sonuc_response = model.generate_content(sonuc_prompt)
    sonuc_metni = sonuc_response.text
    tum_masal += sonuc_metni

    # Masalı tamamladıktan SONRA başlık oluştur
    baslik_prompt = f"""
    Sen yaratıcı bir çocuk kitabı başlık uzmanısısın. Aşağıdaki masalı oku ve masalın ana temasını, 
    kahramanlarını ve mesajını özetleyen, çocukların ilgisini çekecek, akılda kalıcı bir başlık yaz.
    
    KURALLAR:
    - Başlık 3-6 kelime arasında olmalı
    - Çocuklar için sihirli ve merak uyandırıcı olmalı
    - Masalın ana karakterini veya olayını yansıtmalı
    - Sade ve anlaşılır Türkçe kullan
    - Sadece başlığı yaz, başka hiçbir şey yazma
    - Tırnak işareti, nokta veya açıklama ekleme
    
    MASAL:
    {tum_masal[:2000]}
    
    BAŞLIK:
    """
    baslik_response = model.generate_content(baslik_prompt)
    masal_basligi = baslik_response.text.strip()
    
    # Gereksiz karakterleri temizle
    masal_basligi = masal_basligi.replace('"', '').replace("'", '').replace(':', '').strip()

    return {"baslik": masal_basligi, "masal": tum_masal}
