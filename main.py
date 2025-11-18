import google.generativeai as genai
import PIL.Image
import os
from dotenv import load_dotenv

load_dotenv() 

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("HATA: .env dosyasından anahtar okunamadı! .env dosyasını kontrol et.")
    exit()

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel('gemini-2.5-flash')

def baslat():
    dosya_adi = "resim.jpg"

    if not os.path.exists(dosya_adi):
        print(f"HATA: '{dosya_adi}' dosyasını bulamadım!")
        return

    print(f"Resim bulundu, Gemini 2.5 Flash masalı yazıyor...")
    
    try:
        img = PIL.Image.open(dosya_adi)
        prompt = "Bu resme bak ve çocuklar için Türkçe, kısa, eğlenceli, yaratıcı bir masal yaz."
        response = model.generate_content([prompt, img])
        
        print("\n" + "="*30)
        print("MASAL GELDİ:")
        print("="*30 + "\n")
        print(response.text)
        
    except Exception as e:
        print("Bir hata oldu:", e)

if __name__ == "__main__":
    baslat()