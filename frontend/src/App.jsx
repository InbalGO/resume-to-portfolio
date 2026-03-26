import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import Portfolio from './components/Portfolio';

function App() {
  const [portfolioData, setPortfolioData] = useState(null);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="text-center mb-12">
           {!portfolioData && <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-sm mb-4">Resume to Portfolio</h1>}
        </header>
        
        {!portfolioData ? (
          <UploadForm onUploadSuccess={setPortfolioData} />
        ) : (
          <div className="space-y-8 animate-fade-in-up">
            <button 
              onClick={() => setPortfolioData(null)}
              className="glass px-6 py-2 text-primary font-medium hover:bg-white/40 mb-4 transition-all"
            >
              &larr; Upload Another Resume
            </button>
            <Portfolio data={portfolioData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
