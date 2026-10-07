import { useState, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  X,
  Sparkles,
  Loader2,
  AlertCircle,
  Briefcase,
  SkipForward,
  Play,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { extractTextFromFile, formatFileSize } from '@/lib/textExtraction';
import { analyzeResume, SAMPLE_RESUME_TEXT, SAMPLE_JOB_DESCRIPTION } from '@/lib/analyzer';
import { useAnalysis } from '@/context/AnalysisContext';

type UploadStatus = 'idle' | 'uploading' | 'uploaded' | 'error';
type AnalysisPhase = 'idle' | 'extracting' | 'analyzing' | 'scoring';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function AnalyzerPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setResult } = useAnalysis();

  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisPhase, setAnalysisPhase] = useState<AnalysisPhase>('idle');
  const [jobDescription, setJobDescription] = useState('');
  const [showJobSection, setShowJobSection] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((selectedFile: File) => {
    setError('');
    const ext = selectedFile.name.toLowerCase();
    if (!ext.endsWith('.pdf') && !ext.endsWith('.docx')) {
      setError('Invalid file type. Please upload a PDF or DOCX file.');
      setUploadStatus('error');
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File is too large. Maximum size is 10 MB.');
      setUploadStatus('error');
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setFileSize(formatFileSize(selectedFile.size));
    setUploadStatus('uploading');

    setTimeout(() => {
      setUploadStatus('uploaded');
      setShowJobSection(true);
    }, 800);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  }, [handleFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const removeFile = () => {
    setFile(null);
    setFileName('');
    setFileSize('');
    setUploadStatus('idle');
    setShowJobSection(false);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const runAnalysis = async (text: string, fName: string, fSize: string, jobDesc?: string) => {
    setIsAnalyzing(true);
    setAnalysisPhase('extracting');
    await new Promise((r) => setTimeout(r, 800));
    setAnalysisPhase('analyzing');
    await new Promise((r) => setTimeout(r, 1000));
    setAnalysisPhase('scoring');
    const result = analyzeResume(text, fName, fSize, jobDesc);
    await new Promise((r) => setTimeout(r, 700));
    setResult(result);
    navigate('/dashboard');
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a resume file first.');
      return;
    }
    try {
      const text = await extractTextFromFile(file);
      if (text.trim().length < 20) {
        setError('The uploaded file appears to be empty or corrupted. Please try a different file.');
        setUploadStatus('error');
        setIsAnalyzing(false);
        return;
      }
      const jobDesc = jobDescription.trim().length > 50 ? jobDescription.trim() : undefined;
      await runAnalysis(text, fileName, fileSize, jobDesc);
    } catch {
      setError('Could not read the file. The file may be corrupted or password-protected.');
      setUploadStatus('error');
      setIsAnalyzing(false);
    }
  };

  const handleDemo = async () => {
    setFileName('sample_resume.pdf');
    setFileSize('245 KB');
    setUploadStatus('uploaded');
    setShowJobSection(true);
    setJobDescription(SAMPLE_JOB_DESCRIPTION);
    await runAnalysis(SAMPLE_RESUME_TEXT, 'sample_resume.pdf', '245 KB', SAMPLE_JOB_DESCRIPTION);
  };

  // Auto-trigger demo if query param present
  if (searchParams.get('demo') === 'true' && !isAnalyzing && !file) {
    handleDemo();
  }

  const phaseLabels: Record<AnalysisPhase, string> = {
    idle: '',
    extracting: 'Extracting text from your resume...',
    analyzing: 'Detecting skills and analyzing content...',
    scoring: 'Calculating scores and generating recommendations...',
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">AI Resume Analyzer</h1>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
            Upload your resume and let AI identify strengths, weaknesses, skills, and improvement opportunities.
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="mb-6 flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 leading-relaxed">
            Your resume is processed only for analysis. Do not upload sensitive personal documents
            that you do not want processed.
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {uploadStatus !== 'uploaded' && !isAnalyzing && (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 sm:p-14 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-50 flex items-center justify-center">
                <UploadCloud className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-lg font-semibold text-slate-900">Drop your resume here</p>
              <p className="text-sm text-slate-500 mt-1">Supports PDF and DOCX files (max 10 MB)</p>
              <button className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                <UploadCloud className="w-4 h-4" />
                Upload Resume
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-start gap-3 p-4 bg-rose-50 border border-rose-100 rounded-xl">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-rose-800">{error}</p>
            </div>
          )}

          {/* Uploaded File Info */}
          {uploadStatus === 'uploaded' && !isAnalyzing && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-emerald-200">
                    <FileText className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{fileName}</p>
                    <p className="text-xs text-slate-500">{fileSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Uploaded
                  </span>
                  <button onClick={removeFile} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Job Description Section */}
              {showJobSection && (
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-violet-600" />
                    <h3 className="text-lg font-semibold text-slate-900">Compare With Your Target Job</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Paste the job description to identify the skills and keywords you are missing.
                  </p>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste job description here..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                  />
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAnalyze}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      <Sparkles className="w-5 h-5" />
                      Analyze Job Match
                    </button>
                    <button
                      onClick={() => {
                        setJobDescription('');
                        handleAnalyze();
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-700 font-medium border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <SkipForward className="w-5 h-5" />
                      Skip and analyze resume only
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Analyzing State */}
          {isAnalyzing && (
            <div className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <p className="text-lg font-semibold text-slate-900">Analyzing your resume...</p>
              <p className="text-sm text-slate-500 mt-2">{phaseLabels[analysisPhase]}</p>
              <div className="mt-6 max-w-xs mx-auto space-y-2">
                {(['extracting', 'analyzing', 'scoring'] as AnalysisPhase[]).map((phase, i) => {
                  const phases = ['extracting', 'analyzing', 'scoring'];
                  const currentIdx = phases.indexOf(analysisPhase);
                  const isActive = phases.indexOf(phase) === currentIdx;
                  const isDone = phases.indexOf(phase) < currentIdx;
                  return (
                    <div key={phase} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        isDone ? 'bg-emerald-100 text-emerald-600' :
                        isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> :
                         isActive ? <Loader2 className="w-4 h-4 animate-spin" /> : i + 1}
                      </div>
                      <span className={`text-sm ${isActive ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                        {phaseLabels[phase]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Demo Button */}
        {!isAnalyzing && uploadStatus !== 'uploaded' && (
          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-slate-50 text-sm text-slate-400">or</span>
              </div>
            </div>
            <button
              onClick={handleDemo}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-700 font-medium border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-colors"
            >
              <Play className="w-4 h-4 text-violet-600" />
              Try with Sample Resume
            </button>
            <p className="mt-2 text-xs text-slate-400">
              Load a sample AIML student resume and see realistic analysis results
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
