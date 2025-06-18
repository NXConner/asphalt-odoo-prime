
import { Bell, Search, User, Settings } from "lucide-react";

interface TopBarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const TopBar = ({ sidebarCollapsed, setSidebarCollapsed }: TopBarProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search customers, projects, equipment..."
            className="pl-10 pr-4 py-2 w-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </button>
        
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings size={20} />
        </button>
        
        <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">John Anderson</p>
            <p className="text-xs text-gray-500">Operations Manager</p>
          </div>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};
