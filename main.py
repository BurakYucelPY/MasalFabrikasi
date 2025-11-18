from fonks.klasorden_resimleri_yukle import klasorden_resimleri_yukle
from fonks.masal_yarat import masal_yarat

MUMKUN_TEMALAR = ["MACERA", "DOSTLUK", "CESARET", "EĞİTİCİ", "KOMİK"]
# ----------------


if __name__ == "__main__":
    
    # DENEME AYARLARI
    SECİLEN_TEMA = "DOSTLUK" 
    
    print("\n\n--- 4 AŞAMALI KİTAP ÜRETİM SİSTEMİ BAŞLIYOR ---")
    
    # 1. Resimleri Klasörden Yükle
    resimler = klasorden_resimleri_yukle()
    
    # 2. Masalı Yarat
    masal_yarat(resimler, SECİLEN_TEMA)