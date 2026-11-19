import { Cpu, Mail, MessageSquare, PhoneCall, Send, Workflow } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceIconProps {
  name: ServiceItem['iconName'];
  className?: string;
}

export function ServiceIcon({ name, className = 'w-5 h-5' }: ServiceIconProps) {
  switch (name) {
    case 'MessageSquare':
      return <MessageSquare className={className} aria-hidden="true" />;
    case 'Send':
      return <Send className={className} aria-hidden="true" />;
    case 'Mail':
      return <Mail className={className} aria-hidden="true" />;
    case 'PhoneCall':
      return <PhoneCall className={className} aria-hidden="true" />;
    case 'Workflow':
      return <Workflow className={className} aria-hidden="true" />;
    case 'Cpu':
      return <Cpu className={className} aria-hidden="true" />;
  }
}
