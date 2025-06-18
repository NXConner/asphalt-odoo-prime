
import { useState } from "react";
import { 
  Home, 
  Users, 
  FolderOpen, 
  Package, 
  Truck, 
  UserCheck, 
  Shield, 
  DollarSign,
  Calculator,
  Calendar,
  CheckCircle2,
  Warehouse,
  ChevronDown,
  ChevronRight,
  Menu,
  Building2,
  FileText,
  Clock,
  Settings,
  BarChart3,
  Briefcase,
  Mail,
  Phone,
  MessageSquare,
  BookOpen,
  Award,
  MapPin,
  Clipboard,
  FileSpreadsheet,
  PieChart,
  Target,
  Wrench,
  HelpCircle,
  Bell,
  Camera,
  Zap,
  Globe,
  CreditCard,
  Archive,
  Coffee,
  Car,
  TrendingUp
} from "lucide-react";

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar = ({ activeModule, setActiveModule, collapsed, setCollapsed }: SidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['sales', 'operations', 'hr']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const menuSections = [
    {
      id: 'main',
      title: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
      ]
    },
    {
      id: 'sales',
      title: 'Sales & CRM',
      items: [
        { id: 'crm', label: 'CRM', icon: Users },
        { id: 'estimates', label: 'Estimates & Quotes', icon: Calculator },
        { id: 'opportunities', label: 'Opportunities', icon: Target },
        { id: 'customers', label: 'Customers', icon: Building2 },
        { id: 'marketing', label: 'Marketing', icon: Mail },
        { id: 'social', label: 'Social Marketing', icon: MessageSquare },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'surveys', label: 'Surveys', icon: Clipboard },
      ]
    },
    {
      id: 'operations',
      title: 'Operations',
      items: [
        { id: 'projects', label: 'Projects', icon: FolderOpen },
        { id: 'scheduling', label: 'Scheduling', icon: Calendar },
        { id: 'quality', label: 'Quality Control', icon: CheckCircle2 },
        { id: 'materials', label: 'Materials', icon: Warehouse },
        { id: 'inventory', label: 'Inventory', icon: Package },
        { id: 'equipment', label: 'Equipment', icon: Truck },
        { id: 'maintenance', label: 'Maintenance', icon: Wrench },
        { id: 'fleet', label: 'Fleet Management', icon: Car },
        { id: 'field_service', label: 'Field Service', icon: MapPin },
        { id: 'barcode', label: 'Barcode Scanning', icon: Camera },
      ]
    },
    {
      id: 'finance',
      title: 'Finance & Accounting',
      items: [
        { id: 'finance', label: 'Finance', icon: DollarSign },
        { id: 'invoicing', label: 'Invoicing', icon: FileText },
        { id: 'accounting', label: 'Accounting', icon: FileSpreadsheet },
        { id: 'expenses', label: 'Expenses', icon: CreditCard },
        { id: 'purchase', label: 'Purchase Orders', icon: Briefcase },
        { id: 'subscriptions', label: 'Subscriptions', icon: Clock },
        { id: 'payroll', label: 'Payroll', icon: DollarSign },
        { id: 'reports', label: 'Financial Reports', icon: PieChart },
      ]
    },
    {
      id: 'hr',
      title: 'Human Resources',
      items: [
        { id: 'employees', label: 'Employees', icon: UserCheck },
        { id: 'recruitment', label: 'Recruitment', icon: Users },
        { id: 'timesheets', label: 'Timesheets', icon: Clock },
        { id: 'time_off', label: 'Time Off', icon: Coffee },
        { id: 'appraisals', label: 'Appraisals', icon: Award },
        { id: 'skills', label: 'Skills Management', icon: BookOpen },
        { id: 'referrals', label: 'Employee Referrals', icon: Users },
        { id: 'contracts', label: 'Contracts', icon: FileText },
        { id: 'attendance', label: 'Attendance', icon: Clock },
        { id: 'training', label: 'Training & eLearning', icon: BookOpen },
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance & Safety',
      items: [
        { id: 'compliance', label: 'Compliance', icon: Shield },
        { id: 'safety', label: 'Safety Management', icon: Shield },
        { id: 'documents', label: 'Documents', icon: Archive },
        { id: 'sign', label: 'Digital Signatures', icon: FileText },
        { id: 'approvals', label: 'Approvals', icon: CheckCircle2 },
        { id: 'helpdesk', label: 'Helpdesk', icon: HelpCircle },
        { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
      ]
    },
    {
      id: 'communication',
      title: 'Communication',
      items: [
        { id: 'discuss', label: 'Team Chat', icon: MessageSquare },
        { id: 'voip', label: 'VoIP', icon: Phone },
        { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
        { id: 'email', label: 'Email Marketing', icon: Mail },
        { id: 'sms', label: 'SMS Marketing', icon: Phone },
        { id: 'live_chat', label: 'Live Chat', icon: MessageSquare },
        { id: 'appointments', label: 'Appointments', icon: Calendar },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
      ]
    },
    {
      id: 'technology',
      title: 'Technology & Apps',
      items: [
        { id: 'website', label: 'Website Builder', icon: Globe },
        { id: 'ecommerce', label: 'eCommerce', icon: Package },
        { id: 'pos', label: 'Point of Sale', icon: DollarSign },
        { id: 'manufacturing', label: 'Manufacturing', icon: Settings },
        { id: 'plm', label: 'Product Lifecycle', icon: Zap },
        { id: 'iot', label: 'Internet of Things', icon: Zap },
        { id: 'studio', label: 'App Builder Studio', icon: Settings },
        { id: 'automation', label: 'Marketing Automation', icon: Zap },
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics & Reporting',
      items: [
        { id: 'analytics', label: 'Business Analytics', icon: BarChart3 },
        { id: 'dashboards', label: 'Custom Dashboards', icon: PieChart },
        { id: 'planning', label: 'Resource Planning', icon: Calendar },
        { id: 'forecasting', label: 'Forecasting', icon: TrendingUp },
      ]
    }
  ];

  const isItemActive = (itemId: string) => activeModule === itemId;

  const MenuItem = ({ item, depth = 0 }: { item: any; depth?: number }) => {
    const Icon = item.icon;
    const isActive = isItemActive(item.id);
    
    return (
      <button
        onClick={() => setActiveModule(item.id)}
        className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${
          isActive 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        } ${depth > 0 ? 'pl-8' : ''}`}
        style={{ paddingLeft: collapsed ? '1rem' : `${1 + depth * 0.5}rem` }}
      >
        <Icon size={18} className="flex-shrink-0" />
        {!collapsed && (
          <span className="text-sm font-medium truncate">{item.label}</span>
        )}
      </button>
    );
  };

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-white shadow-lg transition-all duration-300 fixed left-0 top-0 h-full z-40 overflow-y-auto`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-gray-900">BusinessOS</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="py-4">
        {menuSections.map((section) => (
          <div key={section.id} className="mb-2">
            {!collapsed && section.title && (
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:bg-gray-50"
              >
                <span>{section.title}</span>
                {expandedSections.includes(section.id) ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>
            )}
            
            {(collapsed || expandedSections.includes(section.id)) && (
              <div className="space-y-1">
                {section.items.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="text-xs text-gray-500 text-center">
            BusinessOS v1.0
            <br />
            Asphalt Industry Edition
          </div>
        </div>
      )}
    </div>
  );
};
