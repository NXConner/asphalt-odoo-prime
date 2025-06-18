
import { useState } from "react";
import { Plus, Search, Phone, Mail, MapPin, Building } from "lucide-react";

export const CRMModule = () => {
  const [activeTab, setActiveTab] = useState("customers");

  const customers = [
    {
      id: 1,
      name: "Richmond Shopping Center",
      contact: "Maria Rodriguez",
      email: "maria.rodriguez@richmondsc.com",
      phone: "(804) 555-0123",
      address: "1234 Broad Street, Richmond, VA 23220",
      type: "Commercial",
      lastProject: "Parking Lot Resurfacing",
      value: "$245,000"
    },
    {
      id: 2,
      name: "Virginia Department of Transportation",
      contact: "James Wilson",
      email: "j.wilson@vdot.virginia.gov",
      phone: "(804) 555-0456",
      address: "1401 E Broad St, Richmond, VA 23219",
      type: "Government",
      lastProject: "Highway 64 Repair",
      value: "$1,250,000"
    },
    {
      id: 3,
      name: "Henrico County Schools",
      contact: "Sarah Johnson",
      email: "sarah.johnson@henrico.k12.va.us",
      phone: "(804) 555-0789",
      address: "3820 Nine Mile Rd, Richmond, VA 23223",
      type: "Government",
      lastProject: "School Parking Lot Sealcoating",
      value: "$85,000"
    }
  ];

  const leads = [
    {
      id: 1,
      name: "Metro Business Park",
      contact: "David Chen",
      email: "d.chen@metrobp.com",
      phone: "(804) 555-0321",
      service: "Asphalt Paving",
      estimatedValue: "$180,000",
      stage: "Proposal Sent",
      probability: 75
    },
    {
      id: 2,
      name: "Riverside Shopping Plaza",
      contact: "Lisa Thompson",
      email: "lisa@riversideplaza.com", 
      phone: "(804) 555-0654",
      service: "Sealcoating & Line Striping",
      estimatedValue: "$45,000",
      stage: "Initial Contact",
      probability: 25
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Customer Relations</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("customers")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "customers"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Customers
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "leads"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Leads
          </button>
        </nav>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {activeTab === "customers" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Building size={14} className="mr-1" />
                          {customer.contact}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center mb-1">
                          <Mail size={14} className="mr-2 text-gray-400" />
                          {customer.email}
                        </div>
                        <div className="flex items-center mb-1">
                          <Phone size={14} className="mr-2 text-gray-400" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-2 text-gray-400" />
                          <span className="text-xs">{customer.address}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        customer.type === "Commercial" 
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                        {customer.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.lastProject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {customer.value}
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
      )}

      {activeTab === "leads" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Requested
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Est. Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Probability
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.contact}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center mb-1">
                          <Mail size={14} className="mr-2 text-gray-400" />
                          {lead.email}
                        </div>
                        <div className="flex items-center">
                          <Phone size={14} className="mr-2 text-gray-400" />
                          {lead.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        lead.stage === "Proposal Sent" 
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {lead.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {lead.estimatedValue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${lead.probability}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{lead.probability}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Follow Up</button>
                      <button className="text-green-600 hover:text-green-900">Convert</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
