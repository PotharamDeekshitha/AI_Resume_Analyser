import { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Lightbulb, ArrowRight } from 'lucide-react';
import Card from '@/components/Card';
import type { ImprovementSuggestion } from '@/types';

export default function Suggestions({ suggestions }: { suggestions: ImprovementSuggestion[] }) {
  const [expanded, setExpanded] = useState<string | null>(suggestions[0]?.id || null);
  const [improved, setImproved] = useState<Set<string>>(new Set());

  const toggleImprove = (id: string) => {
    setImproved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-5">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-semibold text-slate-900">AI Improvement Suggestions</h3>
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion) => {
          const isOpen = expanded === suggestion.id;
          const isImproved = improved.has(suggestion.id);
          return (
            <div key={suggestion.id} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : suggestion.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-600 font-semibold text-sm">
                      {suggestion.section.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{suggestion.section}</p>
                    <p className="text-xs text-slate-500">{suggestion.problem}</p>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Why it matters</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{suggestion.whyItMatters}</p>
                  </div>

                  {suggestion.currentText && (
                    <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg">
                      <p className="text-xs font-semibold text-rose-600 mb-1">Current</p>
                      <p className="text-sm text-slate-700 italic">"{suggestion.currentText}"</p>
                    </div>
                  )}

                  {suggestion.improvedText && (
                    <div className={`p-3 border rounded-lg transition-colors ${
                      isImproved ? 'bg-emerald-50 border-emerald-200' : 'bg-emerald-50/50 border-emerald-100'
                    }`}>
                      <p className="text-xs font-semibold text-emerald-600 mb-1">
                        {isImproved ? 'Improved' : 'Suggested'}
                      </p>
                      <p className="text-sm text-slate-700">"{suggestion.improvedText}"</p>
                    </div>
                  )}

                  {!suggestion.improvedText && (
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                      <p className="text-xs font-semibold text-blue-600 mb-1">Suggestion</p>
                      <p className="text-sm text-slate-700">{suggestion.suggestion}</p>
                    </div>
                  )}

                  {suggestion.improvedText && (
                    <button
                      onClick={() => toggleImprove(suggestion.id)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {isImproved ? 'Revert' : 'Improve with AI'}
                      {isImproved && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
