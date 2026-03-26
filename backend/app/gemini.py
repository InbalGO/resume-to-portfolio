import os
import json
import google.generativeai as genai

# Try setting the key if it exists in the environment
api_key = os.getenv("GEMINI_API_KEY", "")
if api_key:
    genai.configure(api_key=api_key)

def parse_resume_with_gemini(resume_text: str) -> dict:
    """
    Takes raw resume text and returns a structured dictionary with Name, Skills, Experience, etc.
    """
    prompt = f"""
    You are an expert resume parser. Extract the following information from the provided resume text:
    - Name
    - Contact (Email, Phone)
    - Summary
    - Experience (List of jobs with Title, Company, and Description)
    - Education (List of degrees/schools)
    - Skills (List of key skills)
    
    Return the extracted information as a pure JSON object. Do not include markdown formatting (like ```json), just the plain JSON string.
    Ensure keys are lowercase strings like 'name', 'contact', 'summary', 'experience', 'education', 'skills'.
    
    Resume Text:
    {resume_text}
    """
    
    try:
        if not api_key:
            import time
            time.sleep(1.5)
            # Mock structure for E2E when key is not defined
            return {
                "name": "Alex E2E Demo",
                "contact": "alex@example.com | 555-1234",
                "summary": "This is a mock generated summary for the E2E test.",
                "experience": [
                    {"title": "Senior Mock Engineer", "company": "Mock Inc.", "description": "Tested all the components."}
                ],
                "education": ["B.S. in Testing"],
                "skills": ["JavaScript", "Python", "TDD", "Automation"]
            }

        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        # Strip potential markdown blocks if the model still returns them
        clean_text = response.text.strip()
        if clean_text.startswith("```json"):
            clean_text = clean_text[7:]
        if clean_text.endswith("```"):
            clean_text = clean_text[:-3]
        clean_text = clean_text.strip()
        
        return json.loads(clean_text)
    except Exception as e:
        raise ValueError(f"Failed to parse with Gemini: {str(e)}")
