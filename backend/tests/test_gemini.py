import pytest
from unittest.mock import patch, MagicMock
from app.gemini import parse_resume_with_gemini

def test_parse_resume_with_gemini_success():
    mock_response = MagicMock()
    mock_response.text = '{"name": "John Doe", "skills": ["Python"], "experience": ["Dev"]}'
    
    with patch("app.gemini.genai.GenerativeModel") as MockModel:
        mock_instance = MockModel.return_value
        mock_instance.generate_content.return_value = mock_response
        
        result = parse_resume_with_gemini("dummy resume text")
        
        assert isinstance(result, dict)
        assert result["name"] == "John Doe"
        assert "Python" in result["skills"]

def test_parse_resume_with_gemini_failure():
    with patch("app.gemini.genai.GenerativeModel") as MockModel:
        mock_instance = MockModel.return_value
        mock_instance.generate_content.side_effect = Exception("API Error")
        
        with pytest.raises(ValueError, match="Failed to parse with Gemini"):
            parse_resume_with_gemini("dummy resume text")
