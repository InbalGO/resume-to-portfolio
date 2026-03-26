import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UploadForm from './UploadForm';

describe('UploadForm', () => {
  it('renders a file input and a submit button', () => {
    render(<UploadForm onUploadSuccess={() => {}} />);
    expect(screen.getByLabelText(/upload pdf/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate portfolio/i })).toBeInTheDocument();
  });

  it('calls onUploadSuccess when a file is uploaded', async () => {
    const mockOnUploadSuccess = vi.fn();
    // We mock fetch for the API call
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ name: 'Test User' }),
      })
    );

    render(<UploadForm onUploadSuccess={mockOnUploadSuccess} />);
    const input = screen.getByLabelText(/upload pdf/i);
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });
    
    // Simulate user selecting a file
    fireEvent.change(input, { target: { files: [file] } });
    
    // Simulate form submission
    const button = screen.getByRole('button', { name: /generate portfolio/i });
    fireEvent.click(button);
    
    // Await the fetch and callback
    await new Promise((r) => setTimeout(r, 100));
    
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/api/upload', expect.any(Object));
    expect(mockOnUploadSuccess).toHaveBeenCalledWith({ name: 'Test User' });
  });
});
