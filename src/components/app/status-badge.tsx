import type { IssueStatus } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ClipboardList, ThumbsUp, Wrench, CheckCircle2 } from 'lucide-react';

interface StatusBadgeProps {
  status: IssueStatus;
  className?: string;
}

const statusConfig = {
  Reported: {
    label: 'Reported',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-700',
    icon: <ClipboardList size={14} className="mr-1.5" />,
  },
  Acknowledged: {
    label: 'Acknowledged',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700',
    icon: <ThumbsUp size={14} className="mr-1.5" />,
  },
  'In-Progress': {
    label: 'In Progress',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700',
    icon: <Wrench size={14} className="mr-1.5 animate-spin-slow" />,
  },
  Resolved: {
    label: 'Resolved',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300 dark:border-green-700',
    icon: <CheckCircle2 size={14} className="mr-1.5" />,
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge
      variant="outline"
      className={cn(
        'flex items-center capitalize transition-colors !border',
        config.color,
        className
      )}
    >
      {config.icon}
      {config.label}
    </Badge>
  );
}
