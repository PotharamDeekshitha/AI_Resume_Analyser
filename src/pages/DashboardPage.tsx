import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Target,
  Zap,
  AlertCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  TrendingUp,
  Award,
  ClipboardList,
  FileText,
  Layers,
  Briefcase,
} from 'lucide-react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import Card from '@/components/Card';
import CircularProgress from '@/components/CircularProgress';
import ProgressBar from '@/components/ProgressBar';
import SkillBadge from '@/components/SkillBadge';
import SummaryGenerator from '@/components/dashboard/SummaryGenerator';
import Suggestions from '@/components/dashboard/Suggestions';
import SkillGap from '@/components/dashboard/SkillGap';
import { useAnalysis } from '@/context/AnalysisContext';

export default function DashboardPage() {
  const { result } = useAnalysis();
  const navigate = useNavigate();
  const [showRoadmap, setShowRoadmap] = useState(false);

  useEffect(() => {
    if (!result) navigate('/analyzer');
  }, [result, navigate]);

  if (!result) return null;

  const scoreData = [
    { metric: 'Content', value: result.scoreBreakdown.contentQuality },
    { metric: 'Skills', value: result.scoreBreakdown.skills },
    { metric: 'Keywords', value: result.scoreBreakdown.keywords },
    { metric: 'Structure', value: result.scoreBreakdown.structure },
    { metric: 'Impact', value: result.scoreBreakdown.impact },
  ];

  const skillDistData = result.skillCategories.map((cat) => ({
    name: cat.name,
    count: cat.skills.length,
  }));

  const jobMatchData = [
    { name: 'Matched', value: result.jobMatch.matched.length, color: '#10b981' },
    { name: 'Missing', value: result.jobMatch.missing.length, color: '#f43f5e' },
  ];

  const completedCount = result.checklist.filter((c) => c.completed).length;

  const sectionIcons: Record<string, typeof FileText> = {
    'Contact Information': FileText,
    'Professional Summary': FileText,
    Education: Award,
    Skills: Layers,
    Projects: Briefcase,
    Experience: TrendingUp,
    Certifications: Award,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Your Resume Analysis</h1>
          <p className="mt-2 text-slate-600">
            Analysis of <span className="font-medium text-slate-800">{result.fileName}</span> ({result.fileSize})
            {result.hasJobDescription && ' with job description comparison'}
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-slate-500">Resume Score</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">
              {result.resumeScore}<span className="text-lg text-slate-400">/100</span>
            </p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <p className="text-sm text-slate-500">ATS Compatibility</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{result.atsCompatibility}%</p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
                <Target className="w-5 h-5 text-violet-600" />
              </div>
            </div>
            <p className="text-sm text-slate-500">Skill Match</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{result.skillMatch}%</p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-rose-600" />
              </div>
            </div>
            <p className="text-sm text-slate-500">Missing Skills</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{result.missingSkillsCount}</p>
          </Card>
        </div>

        {/* Resume Score Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 lg:col-span-1 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Overall Resume Score</h3>
            <CircularProgress
              value={result.resumeScore}
              max={100}
              size={160}
              strokeWidth={12}
              colorClass="text-blue-600"
            />
            <p className="mt-4 text-sm text-slate-500 text-center">
              {result.resumeScore >= 80 ? 'Excellent! Your resume is strong.' :
               result.resumeScore >= 60 ? 'Good, but there\'s room for improvement.' :
               'Needs significant improvement. Check suggestions below.'}
            </p>
          </Card>

          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-900 mb-5">Score Breakdown</h3>
            <div className="space-y-4">
              <ProgressBar label="Content Quality" value={result.scoreBreakdown.contentQuality} colorClass="bg-blue-500" />
              <ProgressBar label="Skills" value={result.scoreBreakdown.skills} colorClass="bg-violet-500" />
              <ProgressBar label="Keywords" value={result.scoreBreakdown.keywords} colorClass="bg-emerald-500" />
              <ProgressBar label="Structure" value={result.scoreBreakdown.structure} colorClass="bg-amber-500" />
              <ProgressBar label="Impact" value={result.scoreBreakdown.impact} colorClass="bg-rose-500" />
            </div>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-5">Resume Score Breakdown</h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={scoreData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: '#64748b' }} />
                <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-5">Skill Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={skillDistData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} angle={-15} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Skills Analysis */}
        <Card className="p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <Layers className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900">Detected Skills</h3>
            <span className="text-sm text-slate-400">({result.detectedSkills.length} skills found)</span>
          </div>

          {result.detectedSkills.length > 0 ? (
            <div className="space-y-5">
              {result.skillCategories.map((category) => (
                <div key={category.name}>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">{category.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skillName) => {
                      const skill = result.detectedSkills.find((s) => s.name === skillName);
                      return skill ? <SkillBadge key={skillName} skill={skill} /> : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No skills detected in your resume. Try adding a skills section.</p>
          )}
        </Card>

        {/* Skill Gap Analysis */}
        <div className="mb-8">
          <SkillGap
            youHave={result.skillGap.youHave}
            missing={result.skillGap.missing}
            recommended={result.skillGap.recommended}
            roadmap={result.roadmap}
            onGenerateRoadmap={() => setShowRoadmap(true)}
            showRoadmap={showRoadmap}
          />
        </div>

        {/* Job Match Score */}
        {result.hasJobDescription && (
          <Card className="p-6 mb-8">
            <div className="flex items-center gap-2 mb-5">
              <Target className="w-5 h-5 text-violet-600" />
              <h3 className="text-lg font-semibold text-slate-900">Resume ↔ Job Match</h3>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center">
                <CircularProgress
                  value={result.jobMatch.percentage}
                  size={140}
                  strokeWidth={10}
                  colorClass="text-violet-600"
                />
                <p className="mt-3 text-sm font-medium text-slate-700">{result.jobMatch.percentage}% Match</p>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-emerald-700 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Matched Keywords ({result.jobMatch.matched.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.jobMatch.matched.length > 0 ? result.jobMatch.matched.map((kw) => (
                      <span key={kw} className="px-2.5 py-1 text-sm font-medium bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
                        {kw}
                      </span>
                    )) : <span className="text-sm text-slate-400">No matched keywords</span>}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-rose-700 mb-2 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    Missing Keywords ({result.jobMatch.missing.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.jobMatch.missing.length > 0 ? result.jobMatch.missing.map((kw) => (
                      <span key={kw} className="px-2.5 py-1 text-sm font-medium bg-rose-50 text-rose-700 rounded-md border border-rose-200">
                        {kw}
                      </span>
                    )) : <span className="text-sm text-slate-400">No missing keywords</span>}
                  </div>
                </div>

                {/* Match Chart */}
                <div className="pt-2">
                  <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={jobMatchData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} allowDecimals={false} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} width={80} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                        {jobMatchData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* AI Suggestions */}
        <div className="mb-8">
          <Suggestions suggestions={result.suggestions} />
        </div>

        {/* Summary Generator */}
        <div className="mb-8">
          <SummaryGenerator summary={result.professionalSummary} />
        </div>

        {/* ATS Analysis */}
        <Card className="p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-semibold text-slate-900">ATS Compatibility Check</h3>
            </div>
            <div className="group relative">
              <Info className="w-4 h-4 text-slate-400 cursor-help" />
              <div className="absolute left-0 top-6 hidden group-hover:block z-10 w-64 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-lg">
                ATS (Applicant Tracking System) is software used by employers to automatically scan and filter resumes based on keywords, formatting, and content.
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              {result.atsChecks.map((check) => (
                <div key={check.label} className="flex items-center gap-2.5">
                  {check.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${check.passed ? 'text-slate-700' : 'text-slate-500'}`}>
                    {check.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl">
              <CircularProgress
                value={result.atsScore}
                size={100}
                strokeWidth={8}
                colorClass="text-emerald-500"
              />
              <p className="mt-2 text-sm font-medium text-slate-700">{result.atsScore}% ATS Friendly</p>
            </div>
          </div>
        </Card>

        {/* Resume Section Analysis */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-5">Resume Section Analysis</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.resumeSections.map((section) => {
              const Icon = sectionIcons[section.name] || FileText;
              return (
                <div key={section.name} className="p-4 border border-slate-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-semibold text-slate-900">{section.name}</span>
                    </div>
                    {section.status === 'good' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    {section.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                    {section.status === 'missing' && <XCircle className="w-4 h-4 text-rose-400" />}
                  </div>
                  <div className="mb-2">
                    {section.status === 'good' && <span className="text-xs font-medium text-emerald-600">Good</span>}
                    {section.status === 'warning' && <span className="text-xs font-medium text-amber-600">Needs Improvement</span>}
                    {section.status === 'missing' && <span className="text-xs font-medium text-rose-500">Missing</span>}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{section.message}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Improvement Checklist */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">Your Improvement Checklist</h3>
            </div>
            <span className="text-sm font-medium text-slate-500">
              {completedCount} / {result.checklist.length} completed
            </span>
          </div>

          <div className="mb-4">
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-1000"
                style={{ width: `${(completedCount / result.checklist.length) * 100}%` }}
              />
            </div>
          </div>

          <ul className="space-y-2">
            {result.checklist.map((item, index) => (
              <li key={index} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  item.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'
                }`}>
                  {item.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${item.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Back to Analyzer */}
        <div className="text-center pb-8">
          <button
            onClick={() => navigate('/analyzer')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-700 font-medium border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Analyze Another Resume
          </button>
        </div>
      </div>
    </div>
  );
}
