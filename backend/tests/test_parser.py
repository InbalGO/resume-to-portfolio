import os
import pytest
from app.parser import extract_text_from_pdf

def test_extract_text_from_pdf_success(tmp_path):
    # Testing logic: Create a dummy PDF and pass it to extract_text_from_pdf
    # For a unit test without a real PDF, we can use pypdf to create an empty one
    from pypdf import PdfWriter
    
    test_pdf = tmp_path / "test.pdf"
    writer = PdfWriter()
    writer.add_blank_page(width=100, height=100)
    with open(test_pdf, "wb") as f:
        writer.write(f)
    
    with open(test_pdf, "rb") as f:
        content = f.read()
        
    extracted_text = extract_text_from_pdf(content)
    assert isinstance(extracted_text, str)

def test_extract_text_from_invalid_pdf():
    # If the bytes are not a valid PDF, it should raise an exception or return empty
    with pytest.raises(Exception):
         extract_text_from_pdf(b"invalid pdf bytes")
