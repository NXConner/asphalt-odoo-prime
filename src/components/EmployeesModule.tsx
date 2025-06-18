
import { useState } from "react";
import { Users, UserPlus, Phone, Mail, Calendar } from "lucide-react";

export const EmployeesModule = () => {
  const employees = [
    {
      id: 1,
      name: "Mike Johnson",
      position: "Senior Paver Operator",
      department: "Operations",
      email: "mike.johnson@asphaltpro.com",
      phone: "(804) 555-0101",
      hireDate: "2020-03-15",
      certification: "Virginia DOT Certified",
      currentProject: "Richmond Mall Parking Lot",
      status: "Active"
    },
    {
      id: 2,
      name: "Sarah Williams",
      position: "Compactor Operator",
      department: "Operations", 
      email: "sarah.williams@asphaltpro.com",
      phone: "(804) 555-0102",
      hireDate: "2021-07-22",
      certification: "OSHA 30-Hour",
      currentProject: "Shop Maintenance",
      status: "Active"
    },
    {
      id: 3,
      name: "David Rodriguez",
      position: "CDL Truck Driver",
      department: "Transportation",
      email: "david.rodriguez@asphaltpro.com", 
      phone: "(804) 555-0103",
      hireDate: "2019-11-08",
      certification: "CDL Class A",
      currentProject: "Highway 64 Repair",
      status: "Active"
    },
    {
      id: 4,
      name: "Jessica Chen",
      position: "Project Manager",
      department: "Management",
      email: "jessica.chen@asphaltpro.com",
      phone: "(804) 555-0104", 
      hireDate: "2018-05-12",
      certification: "PMP Certified",
      currentProject: "Multiple Projects",
      status: "Active"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <UserPlus size={20} />
          <span>Add Employee</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">47</p>
            </div>
            <Users className="text-blue-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Operations</p>
              <p className="text-2xl font-bold text-green-600">32</p>
            </div>
            <Users className="text-green-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Management</p>
              <p className="text-2xl font-bold text-purple-600">8</p>
            </div>
            <Users className="text-purple-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Administration</p>
              <p className="text-2xl font-bold text-orange-600">7</p>
            </div>
            <Users className="text-orange-500" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Employee Directory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Assignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hire Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="flex items-center mb-1">
                        <Mail size={14} className="mr-2 text-gray-400" />
                        {employee.email}
                      </div>
                      <div className="flex items-center">
                        <Phone size={14} className="mr-2 text-gray-400" />
                        {employee.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {employee.certification}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.currentProject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2 text-gray-400" />
                      {employee.hireDate}
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
