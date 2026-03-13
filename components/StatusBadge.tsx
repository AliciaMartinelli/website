interface StatusBadgeProps {
  status: string;
  color?: string;
  className?: string;
}

export default function StatusBadge({ status, color = 'bg-am-apricot/20 text-am-apricot', className = '' }: StatusBadgeProps) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${color} ${className}`}>
      {status}
    </span>
  );
}
