import { useState } from 'react';
import { Copy, Check, RefreshCw, Sparkles } from 'lucide-react';
import Card from '@/components/Card';

interface SummaryGeneratorProps {
  summary: string;
}

export default function SummaryGenerator({ summary }: SummaryGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const [currentSummary, setCurrentSummary] = useState(summary);
  const [regenerating, setRegenerating] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => {
      const variations = [
        summary,
        `Results-driven AIML student with proven expertise in Python, machine learning, and data analysis. Demonstrated success building AI-powered applications with measurable impact, seeking to leverage technical skills in a challenging internship role.`,
        `Dedicated B.Tech AIML student passionate about transforming data into actionable insights. Skilled in Python, ML frameworks, and web technologies, with a track record of delivering projects that combine analytical rigor with practical problem-solving.`,
        `Ambitious AI/ML engineering student with a strong foundation in Python, NLP, and deep learning. Experienced in building end-to-end ML pipelines and deploying models to production. Eager to contribute to impactful AI initiatives.`,
      ];
      const next = variations[Math.floor(Math.random() * variations.length)];
      setCurrentSummary(next);
      setRegenerating(false);
    }, 1200);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-violet-600" />
        <h3 className="text-lg font-semibold text-slate-900">AI-Generated Professional Summary</h3>
      </div>

      <div className="p-4 bg-violet-50 border border-violet-100 rounded-xl">
        {regenerating ? (
          <div className="flex items-center gap-2 text-slate-500">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm">Generating new summary...</span>
          </div>
        ) : (
          <p className="text-slate-700 leading-relaxed">{currentSummary}</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={handleRegenerate}
          disabled={regenerating}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-700 text-sm font-medium border border-slate-200 hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className="w-4 h-4" />
          Regenerate
        </button>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Summary'}
        </button>
      </div>
    </Card>
  );
}
