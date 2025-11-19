import PIL.Image
import os

IMAGES_DIR = "images"

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
            except Exception as e:
                print(f"HATA: {dosya_adi} yüklenirken sorun oluştu: {e}")

    return resimler
