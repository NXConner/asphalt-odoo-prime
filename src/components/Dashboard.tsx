
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  FolderOpen, 
  Truck,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

export const Dashboard = () => {
  const stats = [
    {
      title: "Monthly Revenue",
      value: "$847,250",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "green"
    },
    {
      title: "Active Projects",
      value: "23",
      change: "+3",
      trend: "up",
      icon: FolderOpen,
      color: "blue"
    },
    {
      title: "Total Customers",
      value: "1,247",
      change: "+47",
      trend: "up",
      icon: Users,
      color: "purple"
    },
    {
      title: "Equipment Utilization",
      value: "87%",
      change: "-2%",
      trend: "down",
      icon: Truck,
      color: "orange"
    }
  ];

  const recentProjects = [
    {
      id: "P-2024-001",
      name: "Richmond Mall Parking Lot",
      customer: "Richmond Shopping Center",
      status: "In Progress",
      completion: 65,
      dueDate: "2024-01-15"
    },
    {
      id: "P-2024-002", 
      name: "Highway 64 Repair Section A",
      customer: "Virginia DOT",
      status: "Planning",
      completion: 15,
      dueDate: "2024-02-01"
    },
    {
      id: "P-2024-003",
      name: "School District Sealcoating",
      customer: "Henrico County Schools",
      status: "Completed",
      completion: 100,
      dueDate: "2023-12-20"
    }
  ];

  const upcomingTasks = [
    {
      task: "Material delivery - Hot Mix Asphalt",
      project: "Richmond Mall Parking Lot",
      time: "9:00 AM",
      priority: "high"
    },
    {
      task: "Equipment inspection - Paver #3",
      project: "Equipment Maintenance",
      time: "11:30 AM", 
      priority: "medium"
    },
    {
      task: "Client meeting - Project proposal",
      project: "New Shopping Center",
      time: "2:00 PM",
      priority: "high"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="text-gray-500" size={20} />
          <span className="text-gray-600">Today: December 18, 2024</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === "up" ? (
                    <TrendingUp className="text-green-500" size={16} />
                  ) : (
                    <TrendingDown className="text-red-500" size={16} />
                  )}
                  <span className={`text-sm ml-1 ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <stat.icon className={`text-${stat.color}-600`} size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.customer}</p>
                    <div className="flex items-center mt-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{project.completion}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      project.status === "Completed" 
                        ? "bg-green-100 text-green-800"
                        : project.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {project.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Due: {project.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Clock className="text-gray-400 mt-0.5" size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">{task.task}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.priority === "high" 
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{task.project}</p>
                    <p className="text-xs text-blue-600 font-medium">{task.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Alert */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <CheckCircle className="text-green-500" size={20} />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Virginia DOT Compliance Status</h3>
            <p className="text-sm text-green-700">All current projects meet Virginia Department of Transportation standards and regulations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
