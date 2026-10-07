import { FileText, Code, Brain, Database, Cpu, Cloud, Github, Linkedin } from 'lucide-react';
import Card from '@/components/Card';

const builtWith = [
  { icon: Code, name: 'Python', description: 'Core text processing and NLP pipeline' },
  { icon: Brain, name: 'NLP', description: 'Natural language processing for skill extraction' },
  { icon: Cpu, name: 'Machine Learning', description: 'Skill matching and scoring algorithms' },
  { icon: FileText, name: 'React', description: 'Modern responsive web interface' },
  { icon: Database, name: 'Supabase', description: 'Backend data persistence and auth' },
  { icon: Cloud, name: 'AI API', description: 'AI-powered improvement suggestions' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-sm">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">About ResumeAI</h1>
          <p className="mt-2 text-lg text-violet-600 font-medium">Analyze. Improve. Get Hired.</p>
        </div>

        {/* Description */}
        <Card className="p-8 mb-8">
          <p className="text-lg text-slate-700 leading-relaxed">
            ResumeAI is an AI-powered resume analysis platform designed to help students and job seekers
            understand how effectively their resume communicates their skills and experience.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Whether you're a second-year B.Tech student preparing for your first internship or a
            professional looking to switch careers, ResumeAI gives you actionable insights into your
            resume's strengths and weaknesses. Upload your resume, compare it against a target job
            description, and get a detailed analysis covering resume scoring, ATS compatibility, skill
            gap detection, and AI-generated improvement suggestions.
          </p>
        </Card>

        {/* What It Does */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">What It Does</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Extracts text from PDF and DOCX resumes',
              'Detects skills using NLP and keyword matching',
              'Compares your skills against job descriptions',
              'Calculates resume and ATS compatibility scores',
              'Identifies skill gaps and generates a learning roadmap',
              'Provides AI-powered suggestions for every section',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-slate-200">
                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Built With */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Built With</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {builtWith.map((tech) => (
              <Card key={tech.name} className="p-4" hover>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <tech.icon className="w-4.5 h-4.5 text-blue-600" />
                  </div>
                  <span className="font-semibold text-slate-900">{tech.name}</span>
                </div>
                <p className="text-sm text-slate-500">{tech.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <Card className="p-6 mb-8 bg-blue-50 border-blue-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Privacy First</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Your resume is processed only for analysis. We do not store, share, or expose uploaded
            resumes publicly. Do not upload sensitive personal documents that you do not want processed.
          </p>
        </Card>

        {/* Connect */}
        <div className="flex items-center justify-center gap-4">
          <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
