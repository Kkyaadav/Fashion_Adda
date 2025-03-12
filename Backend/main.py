import logging
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from io import BytesIO
from PIL import Image
import base64
from model import ImageRetrievalModel

app = FastAPI()

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Add CORS middleware
origins = [
    "http://localhost",
    "http://localhost:19006",
    "http://192.168.140.242:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the model
DATASET_PATH = r"C:/Users/Rajesh R/Desktop/similarity/Apparel images dataset new/black_shirt"
model = ImageRetrievalModel()
model.fit(DATASET_PATH)


@app.get("/")
def read_root():
    return {"message": "Server is running!"}


@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_extension = file.filename.split(".")[-1].lower()
        if file_extension not in ALLOWED_EXTENSIONS:
            raise HTTPException(status_code=400, detail="Invalid file format")

        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        logging.info(f"Image saved to {file_path}")

        # Retrieve similar images
        similar_images_arrays = model.retrieve_similar_images(file_path)

        # Convert similar images to Base64
        similar_images = []
        for idx, img_array in enumerate(similar_images_arrays):
            img = Image.fromarray((img_array * 255).astype("uint8"))  # Ensure correct conversion
            buffered = BytesIO()
            img.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
            similar_images.append(img_str)  

        # Convert the uploaded image to Base64
        with open(file_path, "rb") as img_file:
            uploaded_image_str = base64.b64encode(img_file.read()).decode("utf-8")

        # 🔥 Add this log to check if Base64 is valid
        logging.info(f"Uploaded Image Base64 (First 100 chars): {uploaded_image_str[:100]}")
        logging.info(f"Similar Images Count: {len(similar_images)}")

        return JSONResponse(content={
            "uploaded_image": uploaded_image_str,  
            "similar_images": similar_images
        })

    except Exception as e:
        logging.error(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if _name_ == "_main_":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
