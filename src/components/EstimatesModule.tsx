
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calculator, FileText, Send, DollarSign, Calendar, User } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const EstimatesModule = () => {
  const [selectedEstimate, setSelectedEstimate] = useState<any>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch estimates
  const { data: estimates = [], isLoading } = useQuery({
    queryKey: ['estimates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('estimates')
        .select(`
          *,
          contact:contacts(first_name, last_name, company:companies(name)),
          project:projects(name),
          estimate_items(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch contacts for dropdown
  const { data: contacts = [] } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*, company:companies(name)')
        .eq('is_customer', true);
      if (error) throw error;
      return data;
    }
  });

  // Create estimate mutation
  const createEstimate = useMutation({
    mutationFn: async (estimateData: any) => {
      const { data, error } = await supabase
        .from('estimates')
        .insert(estimateData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estimates'] });
      setShowCreateForm(false);
      toast({ title: "Estimate created successfully!" });
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CreateEstimateForm = () => {
    const [formData, setFormData] = useState({
      contact_id: '',
      estimate_number: `EST-${Date.now()}`,
      name: '',
      description: '',
      valid_until: '',
      terms_conditions: 'Payment due within 30 days'
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createEstimate.mutate(formData);
    };

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Estimate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Customer</label>
                <Select value={formData.contact_id} onValueChange={(value) => setFormData({...formData, contact_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map((contact) => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.first_name} {contact.last_name} - {contact.company?.name || 'Individual'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Estimate Number</label>
                <Input 
                  value={formData.estimate_number}
                  onChange={(e) => setFormData({...formData, estimate_number: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Project Name</label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Driveway Paving - Main Street"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Detailed description of work to be performed..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Valid Until</label>
                <Input 
                  type="date"
                  value={formData.valid_until}
                  onChange={(e) => setFormData({...formData, valid_until: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Terms & Conditions</label>
                <Input 
                  value={formData.terms_conditions}
                  onChange={(e) => setFormData({...formData, terms_conditions: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button type="submit" disabled={createEstimate.isPending}>
                <Calculator className="w-4 h-4 mr-2" />
                Create Estimate
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
    return <div className="p-6">Loading estimates...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Estimates & Quotes</h1>
          <p className="text-gray-600">Manage project estimates and send quotes to customers</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Estimate
        </Button>
      </div>

      {showCreateForm && <CreateEstimateForm />}

      {/* Estimates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {estimates.map((estimate) => (
          <Card key={estimate.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedEstimate(estimate)}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{estimate.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{estimate.estimate_number}</p>
                </div>
                <Badge className={getStatusColor(estimate.status)}>
                  {estimate.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{estimate.contact?.first_name} {estimate.contact?.last_name}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span>${estimate.total_amount?.toLocaleString() || '0.00'}</span>
                </div>
                
                {estimate.valid_until && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Valid until {new Date(estimate.valid_until).toLocaleDateString()}</span>
                  </div>
                )}
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <FileText className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Send className="w-3 h-3 mr-1" />
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {estimates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No estimates yet</h3>
            <p className="text-gray-600 mb-4">Create your first estimate to get started with quoting customers.</p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Estimate
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
