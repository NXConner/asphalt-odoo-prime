
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Dashboard } from "@/components/Dashboard";
import { CRMModule } from "@/components/CRMModule";
import { ProjectsModule } from "@/components/ProjectsModule";
import { InventoryModule } from "@/components/InventoryModule";
import { EquipmentModule } from "@/components/EquipmentModule";
import { EmployeesModule } from "@/components/EmployeesModule";
import { ComplianceModule } from "@/components/ComplianceModule";
import { FinanceModule } from "@/components/FinanceModule";
import { EstimatesModule } from "@/components/EstimatesModule";
import { SchedulingModule } from "@/components/SchedulingModule";
import { QualityControlModule } from "@/components/QualityControlModule";
import { MaterialsModule } from "@/components/MaterialsModule";

const Index = () => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderActiveModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard />;
      case "crm":
        return <CRMModule />;
      case "projects":
        return <ProjectsModule />;
      case "inventory":
        return <InventoryModule />;
      case "equipment":
        return <EquipmentModule />;
      case "employees":
        return <EmployeesModule />;
      case "compliance":
        return <ComplianceModule />;
      case "finance":
        return <FinanceModule />;
      case "estimates":
        return <EstimatesModule />;
      case "scheduling":
        return <SchedulingModule />;
      case "quality":
        return <QualityControlModule />;
      case "materials":
        return <MaterialsModule />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <TopBar 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        <main className="p-6">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
};

export default Index;
