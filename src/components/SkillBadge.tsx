import type { Skill } from '@/types';

const levelStyles: Record<Skill['level'], string> = {
  Strong: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Intermediate: 'bg-amber-50 text-amber-700 border-amber-200',
  Basic: 'bg-slate-50 text-slate-600 border-slate-200',
};

export default function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${levelStyles[skill.level]}`}
    >
      {skill.name}
      <span className="text-xs opacity-70">· {skill.level}</span>
    </span>
  );
}
