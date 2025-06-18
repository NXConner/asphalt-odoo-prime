
import { useState } from "react";
import { Package, AlertTriangle, TrendingDown, Plus } from "lucide-react";

export const InventoryModule = () => {
  const materials = [
    {
      id: 1,
      name: "Hot Mix Asphalt (HMA)",
      category: "Asphalt",
      currentStock: 245,
      unit: "tons",
      minStock: 100,
      maxStock: 500,
      cost: "$85.50",
      supplier: "Virginia Asphalt Supply",
      lastOrdered: "2024-01-10"
    },
    {
      id: 2,
      name: "Crack Sealant",
      category: "Sealants",
      currentStock: 25,
      unit: "gallons",
      minStock: 50,
      maxStock: 200,
      cost: "$12.75",
      supplier: "SealMaster Corp",
      lastOrdered: "2024-01-05"
    },
    {
      id: 3,
      name: "Road Paint (Yellow)",
      category: "Striping",
      currentStock: 45,
      unit: "gallons",
      minStock: 30,
      maxStock: 100,
      cost: "$28.90",
      supplier: "Traffic Paint Solutions",
      lastOrdered: "2024-01-08"
    },
    {
      id: 4,
      name: "Aggregate Base",
      category: "Base Materials",
      currentStock: 180,
      unit: "tons",
      minStock: 75,
      maxStock: 300,
      cost: "$22.00",
      supplier: "Richmond Quarry",
      lastOrdered: "2024-01-12"
    }
  ];

  const lowStockItems = materials.filter(item => item.currentStock <= item.minStock);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>Add Material</span>
        </button>
      </div>

      {/* Alert for low stock */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="text-red-500" size={20} />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Low Stock Alert</h3>
              <p className="text-sm text-red-700">
                {lowStockItems.length} item(s) are running low and need to be reordered.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{materials.length}</p>
            </div>
            <Package className="text-blue-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-red-600">{lowStockItems.length}</p>
            </div>
            <AlertTriangle className="text-red-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inventory Value</p>
              <p className="text-2xl font-bold text-green-600">$485K</p>
            </div>
            <TrendingDown className="text-green-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Suppliers</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <Package className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Materials Inventory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Material
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materials.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{material.name}</div>
                    <div className="text-sm text-gray-500">Last ordered: {material.lastOrdered}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      material.category === "Asphalt" 
                        ? "bg-gray-100 text-gray-800"
                        : material.category === "Sealants"
                        ? "bg-blue-100 text-blue-800"
                        : material.category === "Striping"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}>
                      {material.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-medium">{material.currentStock} {material.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            material.currentStock <= material.minStock 
                              ? "bg-red-500" 
                              : material.currentStock <= material.minStock * 1.5
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{ 
                            width: `${Math.min((material.currentStock / material.maxStock) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                      <span className={`text-xs ${
                        material.currentStock <= material.minStock 
                          ? "text-red-600" 
                          : "text-gray-600"
                      }`}>
                        {material.currentStock <= material.minStock ? "Low" : "OK"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {material.cost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {material.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Reorder</button>
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
