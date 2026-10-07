import type {
  AnalysisResult,
  Skill,
  SkillCategory,
  ImprovementSuggestion,
  ResumeSection,
  ChecklistItem,
  RoadmapStep,
  AtsCheck,
} from '@/types';
import { SKILL_DATABASE, findSkillInText, getSkillCategory, ALL_SKILLS } from './skillsDatabase';

const SECTION_PATTERNS: { name: string; patterns: string[] }[] = [
  { name: 'Contact Information', patterns: ['email', 'phone', '@', 'linkedin', 'github', 'address'] },
  { name: 'Professional Summary', patterns: ['summary', 'objective', 'profile', 'about me', 'career objective'] },
  { name: 'Education', patterns: ['education', 'university', 'college', 'b.tech', 'bachelor', 'master', 'degree', 'gpa', 'cgpa'] },
  { name: 'Skills', patterns: ['skills', 'technical skills', 'technologies', 'programming languages', 'tools'] },
  { name: 'Projects', patterns: ['project', 'projects', 'project experience'] },
  { name: 'Experience', patterns: ['experience', 'work experience', 'internship', 'employment', 'professional experience'] },
  { name: 'Certifications', patterns: ['certification', 'certifications', 'certificate', 'certified', 'coursera', 'udemy'] },
];

function detectSections(text: string): ResumeSection[] {
  const lowerText = text.toLowerCase();
  return SECTION_PATTERNS.map(({ name, patterns }) => {
    const found = patterns.some((p) => lowerText.includes(p));
    if (found) {
      return {
        name,
        status: 'good' as const,
        message: getSectionMessage(name, 'good', text),
      };
    } else {
      return {
        name,
        status: 'missing' as const,
        message: `No ${name.toLowerCase()} section was detected in your resume. Adding one will improve your resume's completeness.`,
      };
    }
  });
}

function getSectionMessage(name: string, status: string, text: string): string {
  const lowerText = text.toLowerCase();
  const messages: Record<string, string> = {
    'Contact Information': 'Your contact information is clearly visible, which is essential for recruiters to reach you.',
    'Professional Summary': 'A professional summary was found. Make sure it is concise (2-3 lines) and highlights your key strengths.',
    Education: 'Your education section is present with relevant institution and degree information.',
    Skills: 'Your skills section was detected. Ensure it is well-organized by category for easy scanning.',
    Projects: 'Your project descriptions contain relevant technical keywords, but adding measurable outcomes could improve them.',
    Experience: 'Work experience or internships were detected. Use action verbs and quantify achievements where possible.',
    Certifications: 'Certifications were found. These add credibility and show commitment to continuous learning.',
  };
  return messages[name] || `${name} section detected in your resume.`;
}

function determineSkillLevel(skill: string, text: string): Skill['level'] {
  const lowerText = text.toLowerCase();
  const lowerSkill = skill.toLowerCase();
  const occurrences = (lowerText.match(new RegExp(lowerSkill, 'g')) || []).length;

  if (occurrences >= 3) return 'Strong';
  if (occurrences >= 1) return 'Intermediate';
  return 'Basic';
}

function buildSkillCategories(detectedSkills: Set<string>, text: string): SkillCategory[] {
  const categories: SkillCategory[] = SKILL_DATABASE.map((cat) => ({
    name: cat.name,
    skills: cat.skills.filter((s: string) => detectedSkills.has(s)),
  }));

  return categories.filter((cat) => cat.skills.length > 0);
}

function calculateScoreBreakdown(text: string, detectedSkills: Set<string>, hasJobDescription: boolean) {
  const textLength = text.length;
  const wordCount = text.split(/\s+/).length;
  const hasNumbers = /\d+/.test(text);
  const hasActionVerbs = /(developed|built|created|implemented|designed|achieved|improved|led|managed|optimized)/i.test(text);

  const contentQuality = Math.min(100, Math.round((wordCount / 300) * 40 + (hasNumbers ? 30 : 15) + (hasActionVerbs ? 30 : 15)));
  const skillsScore = Math.min(100, Math.round(detectedSkills.size * 8 + 20));
  const keywords = Math.min(100, Math.round(detectedSkills.size * 7 + 25));
  const structure = detectSections(text).filter((s) => s.status === 'good').length;
  const structureScore = Math.round((structure / 7) * 100);
  const impact = Math.min(100, Math.round((hasNumbers ? 50 : 20) + (hasActionVerbs ? 30 : 15) + 20));

  return {
    contentQuality: Math.max(40, contentQuality),
    skills: Math.max(40, skillsScore),
    keywords: Math.max(40, keywords),
    structure: Math.max(40, structureScore),
    impact: Math.max(35, impact),
  };
}

function generateSuggestions(text: string, detectedSkills: Set<string>, missingSkills: string[]): ImprovementSuggestion[] {
  const suggestions: ImprovementSuggestion[] = [];
  const lowerText = text.toLowerCase();

  if (lowerText.includes('made a') || lowerText.includes('did a') || lowerText.includes('worked on a project')) {
    suggestions.push({
      id: 'improve-projects',
      section: 'Projects',
      problem: 'Vague project descriptions',
      whyItMatters: 'Recruiters and ATS systems look for specific technologies, methodologies, and quantifiable outcomes in project descriptions. Vague descriptions make it hard to assess your actual skills.',
      suggestion: 'Use the STAR method (Situation, Task, Action, Result) and include specific technologies and measurable outcomes.',
      currentText: 'Made a machine learning project.',
      improvedText: 'Developed a machine learning classification model using Python and Scikit-learn to predict customer churn, achieving 87% accuracy and reducing false positives by 23%.',
    });
  } else {
    suggestions.push({
      id: 'improve-projects',
      section: 'Projects',
      problem: 'Project descriptions lack measurable outcomes',
      whyItMatters: 'Quantifiable results demonstrate the real-world impact of your work and help you stand out from other candidates.',
      suggestion: 'Add specific metrics, technologies used, and outcomes achieved for each project.',
      currentText: 'Built a web application using React.',
      improvedText: 'Developed a responsive web application using React and TypeScript that served 500+ daily users, reducing page load time by 40% through code splitting and lazy loading.',
    });
  }

  if (lowerText.includes('summary') || lowerText.includes('objective')) {
    suggestions.push({
      id: 'improve-summary',
      section: 'Professional Summary',
      problem: 'Generic professional summary',
      whyItMatters: 'Your summary is the first thing recruiters read. A generic summary fails to highlight your unique value proposition and technical strengths.',
      suggestion: 'Include your specialization, key technical skills, years of experience (or academic level), and one notable achievement.',
      currentText: 'I am a student looking for opportunities in technology.',
      improvedText: 'Second-year B.Tech AIML student with hands-on experience in Python, machine learning, and data analysis. Built 5+ AI projects including an NLP-based sentiment analyzer and a computer vision model achieving 92% accuracy.',
    });
  } else {
    suggestions.push({
      id: 'improve-summary',
      section: 'Professional Summary',
      problem: 'Missing or weak professional summary',
      whyItMatters: 'A professional summary at the top of your resume immediately tells recruiters who you are and what value you bring.',
      suggestion: 'Add a 2-3 line summary highlighting your background, key skills, and career goals.',
      currentText: '(No summary found)',
      improvedText: 'Motivated B.Tech AIML student with strong foundations in Python, machine learning, and data analysis. Passionate about building AI-powered applications that solve real-world problems.',
    });
  }

  if (missingSkills.length > 0) {
    suggestions.push({
      id: 'improve-skills',
      section: 'Skills',
      problem: `Missing ${missingSkills.length} skills relevant to your target role`,
      whyItMatters: 'Missing key skills from your resume can cause ATS systems to filter you out, even if you have relevant experience. Including these skills (if you have them) significantly improves your match rate.',
      suggestion: `Add these skills to your resume if you have experience with them: ${missingSkills.slice(0, 5).join(', ')}. If you don't have experience yet, consider learning them through projects or courses.`,
    });
  }

  if (!/(developed|built|created|implemented|designed|achieved|improved|led|managed|optimized|deployed|trained)/i.test(text)) {
    suggestions.push({
      id: 'improve-experience',
      section: 'Experience',
      problem: 'Weak action verbs in experience section',
      whyItMatters: 'Strong action verbs make your experience more impactful and help ATS systems identify your contributions. Passive or weak descriptions reduce the perceived value of your work.',
      suggestion: 'Start each bullet point with a strong action verb: Developed, Implemented, Designed, Optimized, Achieved, Led, etc.',
      currentText: 'Was responsible for working on the backend.',
      improvedText: 'Designed and implemented a RESTful backend API using Node.js and Express, handling 10,000+ daily requests with 99.9% uptime.',
    });
  } else {
    suggestions.push({
      id: 'improve-experience',
      section: 'Experience',
      problem: 'Experience descriptions could be more quantified',
      whyItMatters: 'Numbers and metrics provide concrete evidence of your impact and make your experience more credible and impressive.',
      suggestion: 'Add quantifiable results: team sizes, performance improvements, user counts, time saved, etc.',
      currentText: 'Developed features for the application.',
      improvedText: 'Developed 15+ core features for a web application serving 2,000+ users, improving user engagement by 35% and reducing bug reports by 40%.',
    });
  }

  return suggestions;
}

function generateProfessionalSummary(detectedSkills: Set<string>, text: string): string {
  const skillArray = Array.from(detectedSkills);
  const topSkills = skillArray.slice(0, 5);

  const lowerText = text.toLowerCase();
  let studentLevel = 'professional';
  if (lowerText.includes('b.tech') || lowerText.includes('btech') || lowerText.includes('bachelor')) {
    studentLevel = 'B.Tech student';
  } else if (lowerText.includes('master') || lowerText.includes('m.tech') || lowerText.includes('mtech')) {
    studentLevel = 'M.Tech student';
  } else if (lowerText.includes('student')) {
    studentLevel = 'student';
  }

  const aimlRelated = skillArray.some((s: string) =>
    ['Machine Learning', 'Deep Learning', 'NLP', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Computer Vision'].includes(s)
  );

  const specialization = aimlRelated ? 'AIML' : 'software development';

  const skillPhrase = topSkills.length > 0
    ? `with hands-on experience in ${topSkills.join(', ')}`
    : 'with a strong foundation in modern technologies';

  return `Motivated ${studentLevel} specializing in ${specialization}, ${skillPhrase}. Passionate about building practical AI-powered applications and solving real-world problems through data-driven solutions.`;
}

function generateAtsChecks(text: string, detectedSkills: Set<string>): { checks: AtsCheck[]; score: number } {
  const lowerText = text.toLowerCase();
  const checks: AtsCheck[] = [
    { label: 'Standard section headings', passed: /(education|experience|skills|projects|summary)/i.test(text) },
    { label: 'Relevant keywords', passed: detectedSkills.size >= 5 },
    { label: 'Contact information detected', passed: /@|phone|linkedin|github/i.test(text) },
    { label: 'Skills section detected', passed: /skills/i.test(text) },
    { label: 'Measurable achievements', passed: /\d+%|\d+\+|\d+ (users|projects|models|people|hours)/i.test(text) },
    { label: 'Keyword alignment', passed: detectedSkills.size >= 8 },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);

  return { checks, score };
}

function generateChecklist(text: string, detectedSkills: Set<string>, missingSkills: string[]): ChecklistItem[] {
  const lowerText = text.toLowerCase();
  return [
    { text: 'Add measurable project results', completed: /\d+%|\d+\+|\d+ (users|projects|models)/i.test(text) },
    { text: 'Add missing technical skills', completed: missingSkills.length === 0 },
    { text: 'Improve professional summary', completed: /(summary|objective|profile)/i.test(text) && text.length > 200 },
    { text: 'Add relevant keywords', completed: detectedSkills.size >= 8 },
    { text: 'Strengthen project descriptions', completed: /(developed|built|created|implemented|designed)/i.test(text) },
    { text: 'Improve ATS compatibility', completed: /(education|experience|skills|projects)/i.test(text) && detectedSkills.size >= 5 },
  ];
}

function generateRoadmap(missingSkills: string[]): RoadmapStep[] {
  if (missingSkills.length === 0) {
    return [
      { week: 1, title: 'Advanced Python + Data Structures', skill: 'Python', difficulty: 'Intermediate', estimatedTime: '10-15 hours', suggestedProject: 'Build a data structure visualization tool' },
      { week: 2, title: 'Advanced Machine Learning', skill: 'Machine Learning', difficulty: 'Advanced', estimatedTime: '15-20 hours', suggestedProject: 'Kaggle competition submission' },
      { week: 3, title: 'Deep Learning Specialization', skill: 'Deep Learning', difficulty: 'Advanced', estimatedTime: '20-25 hours', suggestedProject: 'Image classification with CNNs' },
      { week: 4, title: 'NLP Advanced Topics', skill: 'NLP', difficulty: 'Advanced', estimatedTime: '15-20 hours', suggestedProject: 'Build a chatbot with transformers' },
      { week: 5, title: 'Build a Capstone AI Project', skill: 'Full Stack AI', difficulty: 'Advanced', estimatedTime: '25-30 hours', suggestedProject: 'End-to-end AI application' },
      { week: 6, title: 'Deploy Your Project', skill: 'Deployment', difficulty: 'Intermediate', estimatedTime: '10-15 hours', suggestedProject: 'Deploy on cloud with CI/CD' },
    ];
  }

  const skillToStep: Record<string, { skill: string; difficulty: RoadmapStep['difficulty']; time: string; project: string }> = {
    'TensorFlow': { skill: 'TensorFlow', difficulty: 'Intermediate', time: '15-20 hours', project: 'Build an image classifier using TensorFlow' },
    'PyTorch': { skill: 'PyTorch', difficulty: 'Intermediate', time: '15-20 hours', project: 'Train a neural network with PyTorch' },
    'Docker': { skill: 'Docker', difficulty: 'Beginner', time: '8-12 hours', project: 'Containerize a Python application' },
    'AWS': { skill: 'AWS', difficulty: 'Intermediate', time: '15-20 hours', project: 'Deploy an ML model on AWS EC2' },
    'Azure': { skill: 'Azure', difficulty: 'Intermediate', time: '15-20 hours', project: 'Deploy a web app on Azure' },
    'NLP': { skill: 'NLP', difficulty: 'Intermediate', time: '12-18 hours', project: 'Build a sentiment analysis tool' },
    'Kubernetes': { skill: 'Kubernetes', difficulty: 'Advanced', time: '20-25 hours', project: 'Set up a K8s cluster for ML inference' },
    'Computer Vision': { skill: 'Computer Vision', difficulty: 'Intermediate', time: '15-20 hours', project: 'Object detection with OpenCV' },
    'Deep Learning': { skill: 'Deep Learning', difficulty: 'Advanced', time: '20-25 hours', project: 'Build a deep neural network from scratch' },
    'React': { skill: 'React', difficulty: 'Beginner', time: '10-15 hours', project: 'Build a dashboard with React' },
    'Node.js': { skill: 'Node.js', difficulty: 'Beginner', time: '10-15 hours', project: 'Build a REST API with Node.js' },
    'SQL': { skill: 'SQL', difficulty: 'Beginner', time: '8-12 hours', project: 'Design a database schema and query it' },
    'Power BI': { skill: 'Power BI', difficulty: 'Beginner', time: '8-12 hours', project: 'Create an interactive dashboard' },
    'Tableau': { skill: 'Tableau', difficulty: 'Beginner', time: '8-12 hours', project: 'Visualize a dataset with Tableau' },
  };

  const roadmap: RoadmapStep[] = [];
  const skillsToLearn = missingSkills.slice(0, 6);

  skillsToLearn.forEach((skill, index) => {
    const config = skillToStep[skill] || {
      skill,
      difficulty: 'Intermediate' as const,
      time: '10-15 hours',
      project: `Build a project using ${skill}`,
    };
    roadmap.push({
      week: index + 1,
      title: `Learn ${skill}`,
      skill: config.skill,
      difficulty: config.difficulty,
      estimatedTime: config.time,
      suggestedProject: config.project,
    });
  });

  roadmap.push({
    week: roadmap.length + 1,
    title: 'Build a Capstone AI Project',
    skill: 'Full Stack AI',
    difficulty: 'Advanced',
    estimatedTime: '25-30 hours',
    suggestedProject: 'Build an end-to-end AI application incorporating all learned skills',
  });

  roadmap.push({
    week: roadmap.length + 2,
    title: 'Deploy Your Project',
    skill: 'Deployment',
    difficulty: 'Intermediate',
    estimatedTime: '10-15 hours',
    suggestedProject: 'Deploy on cloud with CI/CD pipeline',
  });

  return roadmap;
}

export function analyzeResume(
  text: string,
  fileName: string,
  fileSize: string,
  jobDescription?: string
): AnalysisResult {
  const detectedSkills = findSkillInText(text);
  const skillArray = Array.from(detectedSkills);

  const skills: Skill[] = skillArray.map((name) => ({
    name,
    category: getSkillCategory(name),
    level: determineSkillLevel(name, text),
  }));

  const skillCategories = buildSkillCategories(detectedSkills, text);

  let jobMatch = { percentage: 0, matched: [] as string[], missing: [] as string[] };
  let missingSkills: string[] = [];

  if (jobDescription && jobDescription.trim().length > 50) {
    const jobSkills = findSkillInText(jobDescription);
    const matched = skillArray.filter((s: string) => jobSkills.has(s));
    const missing = Array.from(jobSkills).filter((s: string) => !detectedSkills.has(s));
    const percentage = jobSkills.size > 0
      ? Math.round((matched.length / jobSkills.size) * 100)
      : 0;

    jobMatch = { percentage, matched, missing };
    missingSkills = missing;
  } else {
    const recommendedSkills = ALL_SKILLS.filter((s: string) =>
      ['TensorFlow', 'Docker', 'NLP', 'AWS', 'Kubernetes', 'Deep Learning'].includes(s) && !detectedSkills.has(s)
    );
    missingSkills = recommendedSkills.slice(0, 4);
  }

  const scoreBreakdown = calculateScoreBreakdown(text, detectedSkills, !!jobDescription);
  const resumeScore = Math.round(
    (scoreBreakdown.contentQuality + scoreBreakdown.skills + scoreBreakdown.keywords + scoreBreakdown.structure + scoreBreakdown.impact) / 5
  );

  const atsResult = generateAtsChecks(text, detectedSkills);

  const skillGap = {
    youHave: skillArray.slice(0, 8),
    missing: missingSkills,
    recommended: missingSkills.map((s: string) => ({
      skill: s,
      action: getRecommendation(s),
    })),
  };

  const suggestions = generateSuggestions(text, detectedSkills, missingSkills);
  const professionalSummary = generateProfessionalSummary(detectedSkills, text);
  const resumeSections = detectSections(text);
  const checklist = generateChecklist(text, detectedSkills, missingSkills);
  const roadmap = generateRoadmap(missingSkills);

  return {
    resumeScore,
    atsCompatibility: atsResult.score,
    skillMatch: jobMatch.percentage,
    missingSkillsCount: missingSkills.length,
    scoreBreakdown,
    detectedSkills: skills,
    skillCategories,
    skillGap,
    jobMatch,
    suggestions,
    professionalSummary,
    atsChecks: atsResult.checks,
    atsScore: atsResult.score,
    resumeSections,
    checklist,
    roadmap,
    extractedText: text,
    fileName,
    fileSize,
    hasJobDescription: !!jobDescription && jobDescription.trim().length > 50,
  };
}

function getRecommendation(skill: string): string {
  const recs: Record<string, string> = {
    'TensorFlow': 'Learn TensorFlow',
    'Docker': 'Learn Docker basics',
    'NLP': 'Practice NLP projects',
    'AWS': 'Build an AWS deployment project',
    'Kubernetes': 'Learn container orchestration',
    'Deep Learning': 'Study neural network architectures',
    'PyTorch': 'Learn PyTorch',
    'Computer Vision': 'Practice CV projects with OpenCV',
    'React': 'Build a React web app',
    'Node.js': 'Build a Node.js backend API',
    'SQL': 'Practice SQL queries and database design',
  };
  return recs[skill] || `Learn ${skill}`;
}

export const SAMPLE_RESUME_TEXT = `John Doe
Email: john.doe@example.com | Phone: +91 9876543210 | LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe

PROFESSIONAL SUMMARY
Second-year B.Tech AIML student with foundational knowledge of Python, machine learning, data analysis, and web development. Passionate about building AI-powered applications and solving real-world problems.

EDUCATION
B.Tech in Artificial Intelligence and Machine Learning
XYZ Institute of Technology, 2023-2027
CGPA: 8.5/10

SKILLS
Programming: Python, Java, C
AI/ML: Machine Learning, NLP, Scikit-learn
Web: HTML, CSS, JavaScript
Tools: Git, GitHub, VS Code

PROJECTS
1. Sentiment Analysis using NLP
   - Built a sentiment analysis model using Python and Scikit-learn to classify movie reviews as positive or negative.
   - Achieved 85% accuracy on a dataset of 10,000 reviews.

2. Student Performance Predictor
   - Developed a machine learning model to predict student academic performance using Python.
   - Used Pandas and NumPy for data preprocessing and Scikit-learn for model training.

3. Personal Portfolio Website
   - Created a responsive portfolio website using HTML, CSS, and JavaScript.
   - Deployed on GitHub Pages with 500+ visitors.

EXPERIENCE
AI/ML Intern | Tech Solutions Pvt Ltd | Summer 2024
- Worked on data preprocessing and model training for a customer churn prediction project.
- Used Python, Pandas, and Scikit-learn to build and evaluate classification models.

CERTIFICATIONS
1. Machine Learning Specialization - Coursera (2024)
2. Python for Data Science - IBM (2023)
3. Deep Learning Fundamentals - Udemy (2024)`;

export const SAMPLE_JOB_DESCRIPTION = `We are looking for a Machine Learning Engineer to join our AI team.

Required Skills:
- Python programming
- Machine Learning and Deep Learning
- TensorFlow or PyTorch
- NLP and Natural Language Processing
- SQL and data analysis
- Docker for containerization
- AWS or cloud deployment experience
- Git version control

Responsibilities:
- Build and deploy ML models in production
- Work with NLP and computer vision pipelines
- Collaborate with the engineering team using Git and Docker
- Deploy models on AWS infrastructure

Nice to have:
- Kubernetes experience
- Computer Vision
- MLOps and CI/CD pipelines`;
