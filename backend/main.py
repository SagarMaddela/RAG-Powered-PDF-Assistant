from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import shutil
from rag_utils import process_pdf, get_answer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        return JSONResponse(status_code=400, content={"error": "Only PDF files are allowed."})

    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)

    process_pdf(file_location)
    return {"message": "File uploaded and processed successfully."}

@app.post("/ask/")
async def ask_question(question: str = Form(...)):
    try:
        answer = get_answer(question)
        return {"answer": answer}
    except Exception as e:
        print(f"Error processing question: {e}")  # 👈 Add this
        return JSONResponse(status_code=500, content={"error": str(e)})
