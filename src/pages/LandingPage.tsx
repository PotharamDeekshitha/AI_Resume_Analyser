import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Search,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Zap,
  Shield,
  TrendingUp,
  FileSearch,
  Layers,
} from 'lucide-react';

const features = [
  {
    icon: FileSearch,
    title: 'Resume Analysis',
    description: 'Analyze structure, content, skills, and keywords to understand how your resume performs.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: Target,
    title: 'Skill Gap Detection',
    description: 'Identify missing skills based on your target job description and get a personalized roadmap.',
    color: 'text-violet-600 bg-violet-50',
  },
  {
    icon: Sparkles,
    title: 'AI Improvements',
    description: 'Get actionable suggestions to improve every section of your resume with specific examples.',
    color: 'text-emerald-600 bg-emerald-50',
  },
];

const stats = [
  { label: 'Skills Tracked', value: '120+' },
  { label: 'Skill Categories', value: '6' },
  { label: 'Analysis Points', value: '15+' },
  { label: 'ATS Checks', value: '6' },
];

const howItWorks = [
  { step: '01', title: 'Upload Your Resume', description: 'Drag and drop your PDF or DOCX resume file.', icon: FileText },
  { step: '02', title: 'Add Target Job', description: 'Paste a job description to compare your skills against.', icon: Search },
  { step: '03', title: 'Get AI Analysis', description: 'Receive a detailed dashboard with scores and suggestions.', icon: BarChart3 },
  { step: '04', title: 'Improve & Repeat', description: 'Follow the checklist and roadmap to strengthen your resume.', icon: TrendingUp },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">AI-Powered Resume Intelligence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
                Turn Your Resume Into Your{' '}
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Career Advantage
                </span>
              </h1>

              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                Analyze your resume with AI, discover skill gaps, improve your content,
                and understand how well your resume matches your target job.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('/analyzer')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                >
                  <Sparkles className="w-5 h-5" />
                  Analyze My Resume
                </button>
                <button
                  onClick={() => navigate('/analyzer?demo=true')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-700 font-medium border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  Try Demo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  No sign-up needed
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  PDF & DOCX support
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Private & secure
                </div>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-slate-900">Resume Analysis</span>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Complete</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Resume Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full w-[78%] bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
                      </div>
                      <span className="text-sm font-bold text-slate-900">78</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">ATS Compatibility</span>
                    <span className="text-sm font-bold text-emerald-600">82%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Skill Match</span>
                    <span className="text-sm font-bold text-amber-600">76%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Missing Skills</span>
                    <span className="text-sm font-bold text-rose-600">6</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-4 h-4 text-violet-500" />
                    <span className="text-sm font-medium text-slate-700">Detected Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'ML', 'NLP', 'SQL', 'Git', 'React'].map((s) => (
                      <span key={s} className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-slate-200 p-3 hidden sm:block">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Improvement</p>
                    <p className="text-sm font-bold text-slate-900">+22% Score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              AI-Powered Resume Intelligence
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Three powerful tools that work together to transform your resume from good to outstanding.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">How It Works</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Four simple steps to a stronger resume.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item) => (
              <div key={item.step} className="relative bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-slate-200">{item.step}</span>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1.5">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-blue-600 to-violet-600 rounded-3xl p-10 sm:p-14 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <Shield className="w-12 h-12 text-white mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Improve Your Resume?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                Upload your resume and get an instant AI-powered analysis with actionable recommendations.
              </p>
              <button
                onClick={() => navigate('/analyzer')}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                Start Analyzing Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
