import {
  FileText,
  User,
  CreditCard,
  CheckSquare,
  Bell,
  Calendar,
  FileClock,
  UserPlus,
  FileSignature,
  BarChart3,
  Settings,
  Mail,
  AlertTriangle,
  Clock
} from 'lucide-react';

/**
 * Icon registry to centralize all icon usage
 * Uses Lucide React icons for consistent styling
 */
const iconRegistry = {
  // Navigation icons
  dashboard: BarChart3,
  projects: FileText,
  clients: User,
  contracts: FileSignature,
  tasks: CheckSquare,
  payments: CreditCard,
  profile: Settings,
  
  // Feature icons
  notification: Bell,
  reminder: Clock,
  calendar: Calendar,
  progress: BarChart3,
  document: FileText,
  contract: FileSignature,
  report: FileClock,
  newUser: UserPlus,
  payment: CreditCard,
  warning: AlertTriangle,
  contact: Mail,
  
  // Get icon component by name
  getIcon: (name, props = {}) => {
    const IconComponent = iconRegistry[name];
    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in registry`);
      return null;
    }
    return <IconComponent {...props} />;
  }
};

export default iconRegistry; 