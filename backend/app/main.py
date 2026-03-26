from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.parser import extract_text_from_pdf
from app.gemini import parse_resume_with_gemini

app = FastAPI(title="Resume API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Must be PDF.")

    try:
        content = await file.read()
        extracted_text = extract_text_from_pdf(content)
        parsed_data = parse_resume_with_gemini(extracted_text)
        return parsed_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
