
import { useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, FileText, CreditCard } from "lucide-react";

export const FinanceModule = () => {
  const financialData = [
    {
      month: "January 2024",
      revenue: 847250,
      expenses: 623180,
      profit: 224070,
      projectsCompleted: 8
    },
    {
      month: "December 2023", 
      revenue: 792340,
      expenses: 598250,
      profit: 194090,
      projectsCompleted: 7
    },
    {
      month: "November 2023",
      revenue: 698500,
      expenses: 534200,
      profit: 164300,
      projectsCompleted: 6
    }
  ];

  const recentInvoices = [
    {
      id: "INV-2024-001",
      customer: "Richmond Shopping Center",
      project: "Parking Lot Resurfacing",
      amount: 245000,
      status: "Paid",
      dueDate: "2024-01-15",
      paidDate: "2024-01-10"
    },
    {
      id: "INV-2024-002",
      customer: "Virginia DOT",
      project: "Highway 64 Repair",
      amount: 485000,
      status: "Pending",
      dueDate: "2024-01-30",
      paidDate: null
    },
    {
      id: "INV-2024-003",
      customer: "Henrico County Schools",
      project: "School Sealcoating",
      amount: 85000,
      status: "Paid",
      dueDate: "2024-01-05",
      paidDate: "2024-01-03"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Financial Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <FileText size={20} />
          <span>Generate Invoice</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(financialData[0].revenue)}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-sm text-green-500 ml-1">+6.9%</span>
              </div>
            </div>
            <DollarSign className="text-green-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(financialData[0].expenses)}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="text-red-500" size={16} />
                <span className="text-sm text-red-500 ml-1">+4.2%</span>
              </div>
            </div>
            <CreditCard className="text-red-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(financialData[0].profit)}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-sm text-green-500 ml-1">+15.4%</span>
              </div>
            </div>
            <TrendingUp className="text-blue-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Profit Margin</p>
              <p className="text-2xl font-bold text-purple-600">26.4%</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-sm text-green-500 ml-1">+2.1%</span>
              </div>
            </div>
            <TrendingUp className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Monthly Financial Overview</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {financialData.map((data, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-900">{data.month}</h3>
                    <span className="text-sm text-gray-500">
                      {data.projectsCompleted} projects completed
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Revenue</p>
                      <p className="font-semibold text-green-600">
                        {formatCurrency(data.revenue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Expenses</p>
                      <p className="font-semibold text-red-600">
                        {formatCurrency(data.expenses)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Profit</p>
                      <p className="font-semibold text-blue-600">
                        {formatCurrency(data.profit)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(data.profit / data.revenue) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Profit Margin: {((data.profit / data.revenue) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Invoices</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{invoice.customer}</h3>
                      <p className="text-sm text-gray-600">{invoice.project}</p>
                      <p className="text-xs text-gray-500 mt-1">Invoice: {invoice.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        invoice.status === "Paid" 
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    <p>Due: {invoice.dueDate}</p>
                    {invoice.paidDate && <p>Paid: {invoice.paidDate}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-to-Date Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">$2.8M</p>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">$2.1M</p>
            <p className="text-sm text-gray-600">Total Expenses</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">$745K</p>
            <p className="text-sm text-gray-600">Net Profit</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">26.6%</p>
            <p className="text-sm text-gray-600">Avg Profit Margin</p>
          </div>
        </div>
      </div>
    </div>
  );
};
