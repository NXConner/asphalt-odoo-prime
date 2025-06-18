
import { useState } from "react";
import { Plus, Calendar, MapPin, DollarSign, Users, Clock } from "lucide-react";

export const ProjectsModule = () => {
  const projects = [
    {
      id: "P-2024-001",
      name: "Richmond Mall Parking Lot Resurfacing",
      customer: "Richmond Shopping Center",
      type: "Asphalt Paving",
      status: "In Progress",
      startDate: "2024-01-02",
      endDate: "2024-01-15",
      budget: "$245,000",
      spent: "$158,000",
      completion: 65,
      crew: "Team Alpha",
      location: "1234 Broad Street, Richmond, VA"
    },
    {
      id: "P-2024-002",
      name: "Highway 64 Repair Section A",
      customer: "Virginia DOT",
      type: "Pavement Repair",
      status: "Planning",
      startDate: "2024-02-01",
      endDate: "2024-03-15",
      budget: "$1,250,000",
      spent: "$0",
      completion: 15,
      crew: "Team Beta",
      location: "Highway 64, Mile Marker 187-195"
    },
    {
      id: "P-2024-003",
      name: "School District Sealcoating",
      customer: "Henrico County Schools",
      type: "Sealcoating",
      status: "Completed",
      startDate: "2023-12-01",
      endDate: "2023-12-20",
      budget: "$85,000",
      spent: "$82,500",
      completion: 100,
      crew: "Team Gamma",
      location: "Multiple School Locations"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Projects</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
          <p className="text-sm text-gray-500">+2 from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Budget</h3>
          <p className="text-3xl font-bold text-green-600">$2.8M</p>
          <p className="text-sm text-gray-500">Across all projects</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">On Schedule</h3>
          <p className="text-3xl font-bold text-yellow-600">89%</p>
          <p className="text-sm text-gray-500">Projects on track</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timeline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{project.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {project.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      project.type === "Asphalt Paving" 
                        ? "bg-blue-100 text-blue-800"
                        : project.type === "Pavement Repair"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}>
                      {project.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      project.status === "Completed" 
                        ? "bg-green-100 text-green-800"
                        : project.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2 text-gray-400" />
                      <div>
                        <div>{project.startDate}</div>
                        <div className="text-xs text-gray-500">to {project.endDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <DollarSign size={14} className="mr-1 text-gray-400" />
                      <div>
                        <div className="font-medium">{project.budget}</div>
                        <div className="text-xs text-gray-500">Spent: {project.spent}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{project.completion}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
