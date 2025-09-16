import { cn } from "@/lib/utils";
import type { AgentStatus } from "@/lib/stores/agent-store";

interface StatusChipProps {
  status: AgentStatus;
  className?: string;
}

const statusConfig = {
  'Available': {
    label: 'Tersedia',
    className: 'status-available',
    dotColor: 'bg-green-500'
  },
  'On Call': {
    label: 'Telepon',
    className: 'status-on-call',
    dotColor: 'bg-primary'
  },
  'ACW': {
    label: 'ACW',
    className: 'status-acw', 
    dotColor: 'bg-amber-500'
  },
  'Break': {
    label: 'Istirahat',
    className: 'status-break',
    dotColor: 'bg-gray-500'
  },
  'Offline': {
    label: 'Offline',
    className: 'status-offline',
    dotColor: 'bg-red-500'
  }
};

export function StatusChip({ status, className }: StatusChipProps) {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border",
      config.className,
      className
    )}>
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dotColor)} />
      {config.label}
    </span>
  );
}