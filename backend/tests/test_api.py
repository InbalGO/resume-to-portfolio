import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
from app.main import app

client = TestClient(app)

@patch("app.main.extract_text_from_pdf")
@patch("app.main.parse_resume_with_gemini")
def test_upload_pdf_success(mock_gemini, mock_extractor):
    # Setup mock returns
    mock_extractor.return_value = "Mocked PDF text"
    mock_gemini.return_value = {
        "name": "Jane Smith",
        "skills": ["React"],
        "experience": [{"title": "Frontend Eng"}]
    }

    # We send a dummy file over multipart/form-data
    dummy_file = ("dummy.pdf", b"%PDF-1.4...", "application/pdf")
    response = client.post("/api/upload", files={"file": dummy_file})

    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Jane Smith"
    assert "React" in data["skills"]

def test_upload_invalid_file_type():
    dummy_file = ("dummy.txt", b"plain text", "text/plain")
    response = client.post("/api/upload", files={"file": dummy_file})
    assert response.status_code == 400
    assert "Invalid file type" in response.text
