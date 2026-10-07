export interface Skill {
  name: string;
  category: string;
  level: 'Strong' | 'Intermediate' | 'Basic';
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SkillGapItem {
  skill: string;
  status: 'have' | 'missing' | 'recommended';
}

export interface ImprovementSuggestion {
  id: string;
  section: string;
  problem: string;
  whyItMatters: string;
  suggestion: string;
  currentText?: string;
  improvedText?: string;
}

export interface ResumeSection {
  name: string;
  status: 'good' | 'warning' | 'missing';
  message: string;
}

export interface ChecklistItem {
  text: string;
  completed: boolean;
}

export interface RoadmapStep {
  week: number;
  title: string;
  skill: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  suggestedProject: string;
}

export interface AtsCheck {
  label: string;
  passed: boolean;
}

export interface AnalysisResult {
  resumeScore: number;
  atsCompatibility: number;
  skillMatch: number;
  missingSkillsCount: number;
  scoreBreakdown: {
    contentQuality: number;
    skills: number;
    keywords: number;
    structure: number;
    impact: number;
  };
  detectedSkills: Skill[];
  skillCategories: SkillCategory[];
  skillGap: {
    youHave: string[];
    missing: string[];
    recommended: { skill: string; action: string }[];
  };
  jobMatch: {
    percentage: number;
    matched: string[];
    missing: string[];
  };
  suggestions: ImprovementSuggestion[];
  professionalSummary: string;
  atsChecks: AtsCheck[];
  atsScore: number;
  resumeSections: ResumeSection[];
  checklist: ChecklistItem[];
  roadmap: RoadmapStep[];
  extractedText: string;
  fileName: string;
  fileSize: string;
  hasJobDescription: boolean;
}
