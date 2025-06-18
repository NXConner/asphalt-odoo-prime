
import { 
  Home, 
  Users, 
  FolderOpen, 
  Package, 
  Truck, 
  UserCheck, 
  Shield, 
  DollarSign, 
  Menu,
  Building2,
  Route,
  Paintbrush,
  Minus
} from "lucide-react";

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar = ({ activeModule, setActiveModule, collapsed, setCollapsed }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "crm", label: "Customer Relations", icon: Users },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "equipment", label: "Equipment", icon: Truck },
    { id: "employees", label: "Employees", icon: UserCheck },
    { id: "compliance", label: "Compliance", icon: Shield },
    { id: "finance", label: "Finance", icon: DollarSign },
  ];

  const asphaltServices = [
    { id: "paving", label: "Asphalt Paving", icon: Building2 },
    { id: "repair", label: "Pavement Repair", icon: Route },
    { id: "sealcoating", label: "Sealcoating", icon: Paintbrush },
    { id: "striping", label: "Line Striping", icon: Minus },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 z-30 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-blue-400">AsphaltPro ERP</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <nav className="mt-6">
        <div className="px-4">
          {!collapsed && (
            <h2 className="text-xs uppercase text-slate-400 font-semibold mb-3">
              Main Modules
            </h2>
          )}
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center px-3 py-2 mb-1 rounded-lg transition-colors ${
                activeModule === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </button>
          ))}
        </div>

        <div className="px-4 mt-8">
          {!collapsed && (
            <h2 className="text-xs uppercase text-slate-400 font-semibold mb-3">
              Asphalt Services
            </h2>
          )}
          {asphaltServices.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveModule(service.id)}
              className={`w-full flex items-center px-3 py-2 mb-1 rounded-lg transition-colors ${
                activeModule === service.id
                  ? 'bg-green-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <service.icon size={20} />
              {!collapsed && <span className="ml-3">{service.label}</span>}
            </button>
          ))}
        </div>
      </nav>

      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400">Virginia DOT Certified</p>
            <p className="text-sm font-semibold text-green-400">Compliant System</p>
          </div>
        </div>
      )}
    </div>
  );
};
