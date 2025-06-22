from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.resnet50 import preprocess_input
from PIL import Image
import numpy as np
import io

app = FastAPI()

# Izinkan akses dari frontend (Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ganti nanti kalau mau lebih aman
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model sekali saat server mulai
# model = load_model("model/model.h5")
model = load_model("model/model.keras")
# model = load_model("model/model_2.h5")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Baca file gambar
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    
    # Ubah ukuran gambar sesuai kebutuhan model
    image = image.resize((224, 224))
    img_array = np.array(image)
    img_array = preprocess_input(img_array)
    img_array = np.expand_dims(img_array, axis=0)

    # Prediksi
    prediction = model.predict(img_array)
    predicted_class = int(np.argmax(prediction))

    return {
        "predicted_class": predicted_class,
        "confidence": float(np.max(prediction))
    }
