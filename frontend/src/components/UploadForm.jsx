import React, { useState } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';

const UploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
        setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
        setError('Please select a PDF file first.');
        return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:8000/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.detail || 'Failed to upload');
        }

        const data = await response.json();
        onUploadSuccess(data);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="glass max-w-md mx-auto p-8 text-center flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Transform Your Resume</h2>
      <p className="text-gray-600 mb-6 text-sm">Upload your PDF resume to instantly generate a stunning, professional portfolio website.</p>
      
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <label htmlFor="file-upload" className="cursor-pointer border-2 border-dashed border-primary/50 rounded-xl p-8 hover:bg-white/40 transition-colors w-full flex flex-col items-center justify-center gap-3">
          <UploadCloud className="w-12 h-12 text-primary" />
          <span className="text-gray-700 font-medium">{file ? file.name : "Select a PDF Resume"}</span>
          <input 
            id="file-upload"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
            aria-label="Upload PDF"
          />
        </label>
        
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        
        <button 
          type="submit"
          className="mt-6 w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={!file || loading}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Generate Portfolio"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
