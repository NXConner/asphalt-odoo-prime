
import { useState } from "react";
import { Truck, Wrench, Calendar, AlertCircle, CheckCircle } from "lucide-react";

export const EquipmentModule = () => {
  const equipment = [
    {
      id: "EQ-001",
      name: "Asphalt Paver CAT AP1055F",
      type: "Paver",
      status: "Active",
      location: "Richmond Mall Project",
      lastMaintenance: "2024-01-05",
      nextMaintenance: "2024-02-05",
      hoursUsed: 1250,
      maxHours: 2000,
      operator: "Mike Johnson"
    },
    {
      id: "EQ-002", 
      name: "Roller Dynapac CA2500PD",
      type: "Compactor",
      status: "Maintenance",
      location: "Shop - Bay 2",
      lastMaintenance: "2024-01-15",
      nextMaintenance: "2024-01-20",
      hoursUsed: 890,
      maxHours: 1500,
      operator: "Sarah Williams"
    },
    {
      id: "EQ-003",
      name: "Dump Truck Mack GU713",
      type: "Transport",
      status: "Active",
      location: "Highway 64 Project",
      lastMaintenance: "2023-12-20",
      nextMaintenance: "2024-01-20",
      hoursUsed: 2100,
      maxHours: 3000,
      operator: "David Rodriguez"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Equipment Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <Truck size={20} />
          <span>Add Equipment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Equipment</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <Truck className="text-blue-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">18</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Maintenance</p>
              <p className="text-2xl font-bold text-yellow-600">4</p>
            </div>
            <Wrench className="text-yellow-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Needs Attention</p>
              <p className="text-2xl font-bold text-red-600">2</p>
            </div>
            <AlertCircle className="text-red-500" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Equipment Fleet</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equipment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Operator
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {equipment.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">ID: {item.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.type === "Paver" 
                        ? "bg-blue-100 text-blue-800"
                        : item.type === "Compactor"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {item.status === "Active" ? (
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                      ) : item.status === "Maintenance" ? (
                        <Wrench className="text-yellow-500 mr-2" size={16} />
                      ) : (
                        <AlertCircle className="text-red-500 mr-2" size={16} />
                      )}
                      <span className={`text-sm ${
                        item.status === "Active" 
                          ? "text-green-800"
                          : item.status === "Maintenance"
                          ? "text-yellow-800"
                          : "text-red-800"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(item.hoursUsed / item.maxHours) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">
                          {item.hoursUsed}/{item.maxHours}h
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2 text-gray-400" />
                      <div>
                        <div className="text-xs">Next: {item.nextMaintenance}</div>
                        <div className="text-xs text-gray-500">Last: {item.lastMaintenance}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.operator}
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
