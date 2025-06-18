
import { useState } from "react";
import { Shield, CheckCircle, AlertTriangle, FileText, Calendar } from "lucide-react";

export const ComplianceModule = () => {
  const complianceItems = [
    {
      id: 1,
      title: "Virginia DOT Material Specifications",
      category: "Materials",
      status: "Compliant",
      lastReview: "2024-01-10",
      nextReview: "2024-04-10",
      description: "All asphalt materials meet VDOT specifications for Highway use"
    },
    {
      id: 2,
      title: "OSHA Safety Training Records",
      category: "Safety",
      status: "Compliant",
      lastReview: "2024-01-05",
      nextReview: "2024-02-05",
      description: "Employee safety training certificates up to date"
    },
    {
      id: 3,
      title: "Environmental Impact Assessment",
      category: "Environmental",
      status: "Needs Review",
      lastReview: "2023-11-15",
      nextReview: "2024-01-20",
      description: "Quarterly environmental compliance review required"
    },
    {
      id: 4,
      title: "Equipment Inspection Certificates",
      category: "Equipment",
      status: "Compliant",
      lastReview: "2024-01-12",
      nextReview: "2024-03-12",
      description: "All heavy machinery inspected and certified"
    }
  ];

  const regulations = [
    {
      title: "Virginia Department of Transportation Standards",
      sections: [
        "Section 205 - Aggregate Base Course",
        "Section 215 - Asphalt Concrete",
        "Section 401 - Hot Mix Asphalt Pavement"
      ]
    },
    {
      title: "Federal Highway Administration Guidelines",
      sections: [
        "Quality Assurance Program",
        "Materials Acceptance Protocol", 
        "Construction Inspection Standards"
      ]
    },
    {
      title: "Virginia Environmental Regulations",
      sections: [
        "Air Quality Standards",
        "Stormwater Management",
        "Waste Material Disposal"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Compliance Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <FileText size={20} />
          <span>Generate Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <Shield className="text-blue-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliant</p>
              <p className="text-2xl font-bold text-green-600">21</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Needs Review</p>
              <p className="text-2xl font-bold text-yellow-600">3</p>
            </div>
            <AlertTriangle className="text-yellow-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliance Score</p>
              <p className="text-2xl font-bold text-green-600">96%</p>
            </div>
            <Shield className="text-green-500" size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Compliance Status</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {complianceItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.status === "Compliant" 
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {item.status}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Calendar size={12} className="mr-1" />
                          Next review: {item.nextReview}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {item.status === "Compliant" ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <AlertTriangle className="text-yellow-500" size={20} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regulations Reference */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Applicable Regulations</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {regulations.map((regulation, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-900 mb-3">{regulation.title}</h3>
                  <ul className="space-y-2">
                    {regulation.sections.map((section, sIndex) => (
                      <li key={sIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" />
                        {section}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Virginia DOT Compliance Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <Shield className="text-blue-500 mt-1 mr-3" size={20} />
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Virginia DOT Certified System</h3>
            <p className="text-blue-800 mt-2">
              This AsphaltPro ERP system maintains compliance with all Virginia Department of Transportation 
              standards and federal highway administration guidelines. All project documentation, material 
              specifications, and quality control procedures are automatically tracked for regulatory compliance.
            </p>
            <div className="mt-4 flex space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <CheckCircle size={12} className="mr-1" />
                VDOT Approved
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle size={12} className="mr-1" />
                FHWA Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
