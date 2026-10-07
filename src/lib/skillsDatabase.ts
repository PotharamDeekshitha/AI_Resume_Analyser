import type { SkillCategory } from '@/types';

export const SKILL_DATABASE: SkillCategory[] = [
  {
    name: 'Programming',
    skills: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript', 'Go', 'Rust', 'Kotlin', 'Swift', 'Ruby', 'PHP', 'R', 'MATLAB', 'Scala'],
  },
  {
    name: 'AI / ML',
    skills: ['Machine Learning', 'Deep Learning', 'NLP', 'Natural Language Processing', 'Computer Vision', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'Hugging Face', 'Transformers', 'Reinforcement Learning', 'GAN', 'LLM', 'Prompt Engineering'],
  },
  {
    name: 'Data',
    skills: ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Excel', 'Pandas', 'NumPy', 'Power BI', 'Tableau', 'Spark', 'Hadoop', 'Data Analysis', 'Data Visualization', 'Statistics', 'ETL', 'Snowflake', 'BigQuery'],
  },
  {
    name: 'Web',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'Next.js', 'Vue', 'Angular', 'Django', 'Flask', 'FastAPI', 'REST API', 'GraphQL', 'Tailwind', 'Bootstrap', 'Redux'],
  },
  {
    name: 'Cloud',
    skills: ['AWS', 'Azure', 'Google Cloud', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Terraform', 'Serverless', 'Lambda', 'EC2', 'S3', 'Vercel', 'Heroku'],
  },
  {
    name: 'Tools',
    skills: ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'Docker', 'VS Code', 'Jira', 'Postman', 'Linux', 'Bash', 'Shell', 'Anaconda', 'Jupyter', 'Google Colab', 'Figma'],
  },
];

export const ALL_SKILLS = SKILL_DATABASE.flatMap((cat) => cat.skills);

export const SKILL_ALIASES: Record<string, string> = {
  'natural language processing': 'NLP',
  'ml': 'Machine Learning',
  'dl': 'Deep Learning',
  'cv': 'Computer Vision',
  'scikit learn': 'Scikit-learn',
  'sklearn': 'Scikit-learn',
  'tf': 'TensorFlow',
  'pytorch': 'PyTorch',
  'gcp': 'Google Cloud',
  'nodejs': 'Node.js',
  'node js': 'Node.js',
  'reactjs': 'React',
  'nextjs': 'Next.js',
  'rest apis': 'REST API',
  'restful api': 'REST API',
  'k8s': 'Kubernetes',
  'js': 'JavaScript',
  'ts': 'TypeScript',
  'c++': 'C++',
  'c plus plus': 'C++',
  'powerbi': 'Power BI',
  'tableau software': 'Tableau',
  'google colab': 'Google Colab',
  'jupyter notebook': 'Jupyter',
  'vscode': 'VS Code',
  'visual studio code': 'VS Code',
  'github copilot': 'GitHub',
  'shell scripting': 'Shell',
  'bash scripting': 'Bash',
};

export const SKILL_NORMALIZED = ALL_SKILLS.reduce((acc, skill) => {
  const lower = skill.toLowerCase();
  if (!acc[lower]) acc[lower] = skill;
  return acc;
}, {} as Record<string, string>);

export function findSkillInText(text: string): Set<string> {
  const found = new Set<string>();
  const lowerText = text.toLowerCase();

  for (const skill of ALL_SKILLS) {
    const lower = skill.toLowerCase();
    if (lowerText.includes(lower)) {
      const canonical = SKILL_NORMALIZED[lower] || skill;
      found.add(canonical);
    }
  }

  for (const [alias, canonical] of Object.entries(SKILL_ALIASES)) {
    if (lowerText.includes(alias)) {
      found.add(canonical);
    }
  }

  return found;
}

export function getSkillCategory(skillName: string): string {
  for (const cat of SKILL_DATABASE) {
    if (cat.skills.some((s: string) => s.toLowerCase() === skillName.toLowerCase())) {
      return cat.name;
    }
  }
  return 'Other';
}
