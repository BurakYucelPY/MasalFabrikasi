from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import PIL.Image
import io
from fonks.masal_yarat import masal_yarat

app = FastAPI()

# CORS - React için
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://burakyucelpy.github.io"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/masal-uret")
async def masal_uret(
    resimler: List[UploadFile] = File(...),
    tema: str = Form(...)
):
    """Resimleri al, masal üret, text olarak döndür"""
    
    # Resimleri PIL objesine çevir
    pil_resimleri = []
    for resim in resimler:
        resim_bytes = await resim.read()
        pil_resim = PIL.Image.open(io.BytesIO(resim_bytes))
        pil_resimleri.append(pil_resim)
    
    # Masalı üret (başlık ve masal metni döner)
    sonuc = masal_yarat(pil_resimleri, tema)
    
    return {"baslik": sonuc["baslik"], "masal": sonuc["masal"]}

@app.get("/")
def anasayfa():
    return {"mesaj": "Masal Fabrikası API Çalışıyor!"}
