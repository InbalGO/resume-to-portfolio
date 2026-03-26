from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(0, 10, 'Alex E2E Demo - Resume', 0, 1, 'C')

def create_resume():
    pdf = PDF()
    pdf.add_page()
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, "Email: alex@example.com | Phone: 555-1234\n\nSummary\nThis is a dummy summary for a dummy resume.\n\nExperience\nSoftware Engineer at Tech Corp. Did some cool stuff with React and FastAPI.\n\nEducation\nB.S. Computer Science\n\nSkills\nPython, React, Vite, Tailwind CSS")
    pdf.output("sample_resume.pdf")

if __name__ == '__main__':
    create_resume()
