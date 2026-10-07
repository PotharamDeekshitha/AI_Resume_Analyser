import {
  GraduationCap,
  Brain,
  FileCheck,
  Code,
  FolderGit2,
  Award,
  Briefcase,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react';
import Card from '@/components/Card';

const tips = [
  {
    icon: GraduationCap,
    title: 'For Students',
    color: 'text-blue-600 bg-blue-50',
    items: [
      { heading: 'How to write projects', text: 'Use the STAR method: describe the Situation, Task, Action, and Result. Include technologies used and measurable outcomes.' },
      { heading: 'How to list skills', text: 'Group skills by category (Programming, AI/ML, Tools). Only list skills you can confidently discuss in an interview.' },
      { heading: 'How to write internships', text: 'Start with action verbs. Quantify your impact: "Developed X that improved Y by Z%." Focus on what you achieved, not just what you did.' },
      { heading: 'How to describe certifications', text: 'Include the full certification name, issuing organization, and date. Add a one-line summary of what you learned.' },
    ],
  },
  {
    icon: Brain,
    title: 'For AIML Students',
    color: 'text-violet-600 bg-violet-50',
    items: [
      { heading: 'Important technical skills', text: 'Python, Machine Learning, Deep Learning, NLP, Scikit-learn, TensorFlow/PyTorch, SQL, and Git are the most in-demand skills for AIML roles.' },
      { heading: 'AI/ML project examples', text: 'Build a sentiment analyzer, image classifier, chatbot, recommendation system, or time-series predictor. Document your model architecture and accuracy metrics.' },
      { heading: 'GitHub tips', text: 'Pin your best 6 repositories. Write clear README files with setup instructions, screenshots, and results. Use meaningful commit messages.' },
      { heading: 'Portfolio tips', text: 'Create a simple website showcasing 3-4 projects with descriptions, tech stack, and live demos. Include links to your GitHub and LinkedIn.' },
    ],
  },
  {
    icon: FileCheck,
    title: 'ATS Tips',
    color: 'text-emerald-600 bg-emerald-50',
    items: [
      { heading: 'Use standard headings', text: 'Stick to conventional section names: Education, Experience, Skills, Projects, Certifications. ATS systems look for these keywords.' },
      { heading: 'Avoid excessive graphics', text: 'ATS systems cannot read images, charts, or complex layouts. Keep formatting simple and text-based for maximum compatibility.' },
      { heading: 'Use relevant keywords', text: 'Mirror the language from the job description. If the posting says "Machine Learning," use that exact phrase, not just "ML."' },
      { heading: 'Keep formatting consistent', text: 'Use the same font, bullet style, and spacing throughout. Avoid tables, text boxes, and columns that ATS systems struggle to parse.' },
    ],
  },
];

export default function ResumeTipsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">Resume Tips</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Resume Tips & Best Practices</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Practical advice for crafting a resume that gets noticed by recruiters and passes ATS systems.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {tips.map((section) => (
            <Card key={section.title} className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.color}`}>
                  <section.icon className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.heading} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <h3 className="text-sm font-semibold text-slate-900 mb-1.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      {item.heading}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed pl-6">{item.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Code, tip: 'Show, don\'t tell. Use metrics and numbers to prove your impact.' },
            { icon: FolderGit2, tip: 'Link your GitHub and portfolio. Let recruiters see your code.' },
            { icon: Award, tip: 'List relevant certifications with dates and issuing organizations.' },
            { icon: Briefcase, tip: 'Tailor your resume for each job application. One size doesn\'t fit all.' },
          ].map((item) => (
            <Card key={item.tip} className="p-4 flex items-start gap-3" hover>
              <item.icon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600 leading-relaxed">{item.tip}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
