import { useNavigate } from 'react-router-dom';
import { Target, ArrowRight, FileSearch, TrendingUp, GraduationCap } from 'lucide-react';
import Card from '@/components/Card';
import { useAnalysis } from '@/context/AnalysisContext';

const features = [
  {
    icon: FileSearch,
    title: 'Identify What You Have',
    description: 'AI scans your resume and identifies all the skills you already possess, organized by category.',
  },
  {
    icon: Target,
    title: 'Find What\'s Missing',
    description: 'Compare your skills against any job description to instantly see which skills you need to develop.',
  },
  {
    icon: TrendingUp,
    title: 'Track Your Progress',
    description: 'Get a personalized learning roadmap that guides you week by week toward closing skill gaps.',
  },
];

const skillCategories = [
  { name: 'Programming', skills: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript'], color: 'text-blue-600 bg-blue-50' },
  { name: 'AI / ML', skills: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'TensorFlow', 'PyTorch', 'Scikit-learn'], color: 'text-violet-600 bg-violet-50' },
  { name: 'Data', skills: ['SQL', 'Excel', 'Pandas', 'NumPy', 'Power BI', 'Tableau'], color: 'text-emerald-600 bg-emerald-50' },
  { name: 'Web', skills: ['HTML', 'CSS', 'React', 'Node.js', 'Next.js', 'Django'], color: 'text-amber-600 bg-amber-50' },
  { name: 'Cloud', skills: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'], color: 'text-rose-600 bg-rose-50' },
  { name: 'Tools', skills: ['Git', 'GitHub', 'VS Code', 'Jupyter', 'Postman'], color: 'text-slate-600 bg-slate-100' },
];

export default function SkillGapPage() {
  const navigate = useNavigate();
  const { result } = useAnalysis();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100 mb-4">
            <Target className="w-3.5 h-3.5 text-violet-600" />
            <span className="text-xs font-medium text-violet-700">Skill Gap Detection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Skill Gap Analysis</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Identify the skills you have, the skills you need, and get a personalized roadmap to close the gap.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6" hover>
              <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Skill Database */}
        <Card className="p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-900">Skills We Track</h2>
          </div>
          <p className="text-sm text-slate-600 mb-6">
            Our database covers 120+ skills across 6 categories. Upload your resume to see which ones you have.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories.map((cat) => (
              <div key={cat.name} className="p-4 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.color}`}>
                    <span className="text-xs font-bold">{cat.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">{cat.name}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 text-xs font-medium bg-slate-50 text-slate-600 rounded-md border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <Card className="p-8 text-center">
          {result ? (
            <>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Your Analysis Is Ready</h2>
              <p className="text-slate-600 mb-6">View your skill gap results from your last analysis.</p>
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
              >
                View My Results
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Ready to Find Your Skill Gaps?</h2>
              <p className="text-slate-600 mb-6">Upload your resume and paste a job description to get started.</p>
              <button
                onClick={() => navigate('/analyzer')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
              >
                Analyze My Resume
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
