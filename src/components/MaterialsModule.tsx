
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, AlertTriangle, Plus, Truck, BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const MaterialsModule = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch products/materials
  const { data: materials = [], isLoading } = useQuery({
    queryKey: ['materials', selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          supplier:contacts(first_name, last_name, company:companies(name))
        `)
        .eq('is_active', true);
      
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }
      
      const { data, error } = await query.order('name');
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch suppliers
  const { data: suppliers = [] } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*, company:companies(name)')
        .eq('is_vendor', true);
      if (error) throw error;
      return data;
    }
  });

  // Create material mutation
  const createMaterial = useMutation({
    mutationFn: async (materialData: any) => {
      const { data, error } = await supabase
        .from('products')
        .insert(materialData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] });
      setShowCreateForm(false);
      toast({ title: "Material added successfully!" });
    }
  });

  const getStockStatus = (current: number, minimum: number) => {
    if (current <= 0) return { status: 'out_of_stock', color: 'bg-red-100 text-red-800', text: 'Out of Stock' };
    if (current <= minimum) return { status: 'low_stock', color: 'bg-yellow-100 text-yellow-800', text: 'Low Stock' };
    return { status: 'in_stock', color: 'bg-green-100 text-green-800', text: 'In Stock' };
  };

  const categories = ['all', 'asphalt', 'aggregate', 'equipment', 'tools', 'safety', 'other'];

  const CreateMaterialForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      sku: '',
      category: 'asphalt',
      unit_of_measure: 'tons',
      cost_price: '',
      sale_price: '',
      quantity_on_hand: '',
      minimum_stock: '',
      maximum_stock: '',
      supplier_id: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createMaterial.mutate({
        ...formData,
        cost_price: parseFloat(formData.cost_price) || 0,
        sale_price: parseFloat(formData.sale_price) || 0,
        quantity_on_hand: parseFloat(formData.quantity_on_hand) || 0,
        minimum_stock: parseFloat(formData.minimum_stock) || 0,
        maximum_stock: parseFloat(formData.maximum_stock) || null
      });
    };

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Material
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Material Name</label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Hot Mix Asphalt"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">SKU</label>
                <Input 
                  value={formData.sku}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  placeholder="HMA-001"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asphalt">Asphalt</SelectItem>
                    <SelectItem value="aggregate">Aggregate</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="tools">Tools</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">Unit of Measure</label>
                <Select value={formData.unit_of_measure} onValueChange={(value) => setFormData({...formData, unit_of_measure: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tons">Tons</SelectItem>
                    <SelectItem value="cubic_yards">Cubic Yards</SelectItem>
                    <SelectItem value="gallons">Gallons</SelectItem>
                    <SelectItem value="each">Each</SelectItem>
                    <SelectItem value="feet">Feet</SelectItem>
                    <SelectItem value="square_feet">Square Feet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Cost Price</label>
                <Input 
                  type="number"
                  step="0.01"
                  value={formData.cost_price}
                  onChange={(e) => setFormData({...formData, cost_price: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Sale Price</label>
                <Input 
                  type="number"
                  step="0.01"
                  value={formData.sale_price}
                  onChange={(e) => setFormData({...formData, sale_price: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Supplier</label>
                <Select value={formData.supplier_id} onValueChange={(value) => setFormData({...formData, supplier_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.company?.name || `${supplier.first_name} ${supplier.last_name}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Current Stock</label>
                <Input 
                  type="number"
                  step="0.001"
                  value={formData.quantity_on_hand}
                  onChange={(e) => setFormData({...formData, quantity_on_hand: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Minimum Stock</label>
                <Input 
                  type="number"
                  step="0.001"
                  value={formData.minimum_stock}
                  onChange={(e) => setFormData({...formData, minimum_stock: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Maximum Stock</label>
                <Input 
                  type="number"
                  step="0.001"
                  value={formData.maximum_stock}
                  onChange={(e) => setFormData({...formData, maximum_stock: e.target.value})}
                  placeholder="Optional"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button type="submit" disabled={createMaterial.isPending}>
                <Package className="w-4 h-4 mr-2" />
                Add Material
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return <div className="p-6">Loading materials...</div>;
  }

  const lowStockItems = materials.filter(material => 
    material.quantity_on_hand <= material.minimum_stock
  );

  const totalInventoryValue = materials.reduce((total, material) => 
    total + (material.quantity_on_hand * material.cost_price), 0
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Materials & Inventory</h1>
          <p className="text-gray-600">Manage materials, stock levels, and supplier relationships</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setShowCreateForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Material
          </Button>
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold">{materials.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStockItems.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inventory Value</p>
                <p className="text-2xl font-bold">${totalInventoryValue.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Suppliers</p>
                <p className="text-2xl font-bold">{suppliers.length}</p>
              </div>
              <Truck className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {showCreateForm && <CreateMaterialForm />}

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="w-5 h-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700 mb-3">The following items are running low on stock:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {lowStockItems.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-white rounded px-3 py-2">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gray-600">
                    {item.quantity_on_hand} {item.unit_of_measure}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => {
          const stockStatus = getStockStatus(material.quantity_on_hand, material.minimum_stock);
          
          return (
            <Card key={material.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{material.name}</CardTitle>
                    <p className="text-sm text-gray-600">{material.sku}</p>
                  </div>
                  <Badge className={stockStatus.color}>
                    {stockStatus.text}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{material.category?.replace('_', ' ')}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current Stock:</span>
                    <span className="font-medium">
                      {material.quantity_on_hand} {material.unit_of_measure}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Unit Cost:</span>
                    <span className="font-medium">${material.cost_price}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Unit Price:</span>
                    <span className="font-medium">${material.sale_price}</span>
                  </div>
                  
                  {material.supplier && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Supplier:</span>
                      <span className="font-medium text-xs">
                        {material.supplier.company?.name || `${material.supplier.first_name} ${material.supplier.last_name}`}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Reorder
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      History
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {materials.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No materials yet</h3>
            <p className="text-gray-600 mb-4">Add your first material to start managing inventory.</p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Material
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
