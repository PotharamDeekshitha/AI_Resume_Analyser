interface ProgressBarProps {
  label: string;
  value: number;
  max?: number;
  colorClass?: string;
}

export default function ProgressBar({ label, value, max = 100, colorClass = 'bg-blue-600' }: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-semibold text-slate-900">{percentage}%</span>
      </div>
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClass} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
