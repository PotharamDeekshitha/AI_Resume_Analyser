import { Check, X, AlertTriangle, ArrowRight, GraduationCap, Clock, Wrench } from 'lucide-react';
import Card from '@/components/Card';
import type { RoadmapStep } from '@/types';

const difficultyColors: Record<RoadmapStep['difficulty'], string> = {
  Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Intermediate: 'bg-amber-50 text-amber-700 border-amber-200',
  Advanced: 'bg-rose-50 text-rose-700 border-rose-200',
};

interface SkillGapProps {
  youHave: string[];
  missing: string[];
  recommended: { skill: string; action: string }[];
  roadmap: RoadmapStep[];
  onGenerateRoadmap: () => void;
  showRoadmap: boolean;
}

export default function SkillGap({ youHave, missing, recommended, roadmap, onGenerateRoadmap, showRoadmap }: SkillGapProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-slate-900">Skill Gap Analysis</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* You Have */}
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
            <h4 className="text-sm font-semibold text-emerald-700 mb-3 flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              You Have
            </h4>
            <ul className="space-y-2">
              {youHave.length > 0 ? youHave.map((skill) => (
                <li key={skill} className="text-sm text-slate-700 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  {skill}
                </li>
              )) : <li className="text-sm text-slate-400">No skills detected</li>}
            </ul>
          </div>

          {/* Missing */}
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
            <h4 className="text-sm font-semibold text-rose-700 mb-3 flex items-center gap-1.5">
              <X className="w-4 h-4" />
              Missing
            </h4>
            <ul className="space-y-2">
              {missing.length > 0 ? missing.map((skill) => (
                <li key={skill} className="text-sm text-slate-700 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                  {skill}
                </li>
              )) : <li className="text-sm text-slate-400">No missing skills</li>}
            </ul>
          </div>

          {/* Recommended */}
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <h4 className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-1.5">
              <ArrowRight className="w-4 h-4" />
              Recommended
            </h4>
            <ul className="space-y-2">
              {recommended.length > 0 ? recommended.map((rec) => (
                <li key={rec.skill} className="text-sm text-slate-700 flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                  {rec.action}
                </li>
              )) : <li className="text-sm text-slate-400">All caught up!</li>}
            </ul>
          </div>
        </div>

        <button
          onClick={onGenerateRoadmap}
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <GraduationCap className="w-4 h-4" />
          Generate Learning Roadmap
        </button>
      </Card>

      {/* Roadmap */}
      {showRoadmap && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap className="w-5 h-5 text-violet-600" />
            <h3 className="text-lg font-semibold text-slate-900">Personalized Learning Roadmap</h3>
          </div>

          <div className="space-y-3">
            {roadmap.map((step, index) => (
              <div key={step.week} className="relative flex gap-4">
                {/* Timeline line */}
                {index < roadmap.length - 1 && (
                  <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-slate-200" />
                )}

                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                    {step.week}
                  </div>
                </div>

                <div className="flex-1 pb-6">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-slate-900">Week {step.week}: {step.title}</h4>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${difficultyColors[step.difficulty]}`}>
                        {step.difficulty}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Wrench className="w-3 h-3" />
                        {step.skill}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {step.estimatedTime}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      <span className="font-medium text-slate-700">Project: </span>
                      {step.suggestedProject}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
