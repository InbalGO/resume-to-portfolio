import React from 'react';
import { Download, Mail, Briefcase, GraduationCap, Code } from 'lucide-react';

const Portfolio = ({ data }) => {
  if (!data) return null;

  const handleExport = () => {
    const htmlContent = document.documentElement.outerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name ? data.name.replace(/\s+/g, '_') : 'portfolio'}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="flex justify-end mt-4">
        <button 
          onClick={handleExport}
          className="glass flex items-center gap-2 px-4 py-2 hover:bg-white/40 transition-colors text-primary font-medium"
        >
          <Download className="w-5 h-5" />
          Export HTML
        </button>
      </div>

      <header className="glass p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">{data.name || "Anonymous Professional"}</h1>
          {data.contact && (
            <p className="flex items-center gap-2 mt-4 text-gray-600 justify-center sm:justify-start">
              <Mail className="w-4 h-4" /> {data.contact}
            </p>
          )}
        </div>
      </header>

      {data.summary && (
        <section className="glass p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
             Profile
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {data.summary}
          </p>
        </section>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {data.experience && data.experience.length > 0 && (
            <section className="glass p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" /> Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="border-l-2 border-primary/30 pl-4 py-1">
                    <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-gray-600 mt-2 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {data.education && data.education.length > 0 && (
            <section className="glass p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-primary" /> Education
              </h2>
              <ul className="space-y-4">
                 {data.education.map((edu, idx) => (
                   <li key={idx} className="flex items-start gap-3">
                     <span className="w-2 h-2 mt-2 bg-secondary rounded-full flex-shrink-0" />
                     <span className="text-gray-700 text-lg">{edu}</span>
                   </li>
                 ))}
              </ul>
            </section>
          )}
        </div>

        <div className="space-y-8">
          {data.skills && data.skills.length > 0 && (
            <section className="glass p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Code className="w-6 h-6 text-primary" /> Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span key={idx} className="bg-white/50 backdrop-blur px-3 py-1.5 rounded-lg text-gray-800 font-medium border border-white/40 shadow-sm text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
