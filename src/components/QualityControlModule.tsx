
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, XCircle, AlertTriangle, Camera, FileText, Plus, Search } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const QualityControlModule = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCheck, setSelectedCheck] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch quality checks
  const { data: qualityChecks = [], isLoading } = useQuery({
    queryKey: ['quality-checks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quality_checks')
        .select(`
          *,
          project:projects(name, location),
          inspector:employees(contact:contacts(first_name, last_name))
        `)
        .order('check_date', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch projects for dropdown
  const { data: projects = [] } = useQuery({
    queryKey: ['active-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .in('status', ['in_progress', 'planning']);
      if (error) throw error;
      return data;
    }
  });

  // Fetch inspectors (employees)
  const { data: inspectors = [] } = useQuery({
    queryKey: ['inspectors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('*, contact:contacts(first_name, last_name)')
        .eq('status', 'active');
      if (error) throw error;
      return data;
    }
  });

  // Create quality check mutation
  const createQualityCheck = useMutation({
    mutationFn: async (checkData: any) => {
      const { data, error } = await supabase
        .from('quality_checks')
        .insert(checkData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quality-checks'] });
      setShowCreateForm(false);
      toast({ title: "Quality check created successfully!" });
    }
  });

  const getStatusIcon = (passed: boolean | null, status: string) => {
    if (status === 'pending') return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    if (passed === true) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (passed === false) return <XCircle className="w-5 h-5 text-red-500" />;
    return <AlertTriangle className="w-5 h-5 text-gray-400" />;
  };

  const getStatusColor = (passed: boolean | null, status: string) => {
    if (status === 'pending') return 'bg-yellow-100 text-yellow-800';
    if (passed === true) return 'bg-green-100 text-green-800';
    if (passed === false) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const CreateQualityCheckForm = () => {
    const [formData, setFormData] = useState({
      project_id: '',
      inspector_id: '',
      check_type: '',
      location: '',
      notes: '',
      test_results: {}
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createQualityCheck.mutate({
        ...formData,
        check_date: new Date().toISOString().split('T')[0],
        status: 'pending'
      });
    };

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Quality Inspection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Project</label>
                <Select value={formData.project_id} onValueChange={(value) => setFormData({...formData, project_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Inspector</label>
                <Select value={formData.inspector_id} onValueChange={(value) => setFormData({...formData, inspector_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select inspector" />
                  </SelectTrigger>
                  <SelectContent>
                    {inspectors.map((inspector) => (
                      <SelectItem key={inspector.id} value={inspector.id}>
                        {inspector.contact?.first_name} {inspector.contact?.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Check Type</label>
                <Select value={formData.check_type} onValueChange={(value) => setFormData({...formData, check_type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select check type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asphalt_thickness">Asphalt Thickness</SelectItem>
                    <SelectItem value="compaction_test">Compaction Test</SelectItem>
                    <SelectItem value="temperature_check">Temperature Check</SelectItem>
                    <SelectItem value="surface_smoothness">Surface Smoothness</SelectItem>
                    <SelectItem value="joint_inspection">Joint Inspection</SelectItem>
                    <SelectItem value="material_quality">Material Quality</SelectItem>
                    <SelectItem value="final_inspection">Final Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Specific location on site"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Detailed inspection notes..."
                rows={3}
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit" disabled={createQualityCheck.isPending}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Create Inspection
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
    return <div className="p-6">Loading quality checks...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quality Control</h1>
          <p className="text-gray-600">Manage inspections, testing, and compliance checks</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Inspection
        </Button>
      </div>

      {/* Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Passed Inspections</p>
                <p className="text-2xl font-bold text-green-600">
                  {qualityChecks.filter(check => check.passed === true).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed Inspections</p>
                <p className="text-2xl font-bold text-red-600">
                  {qualityChecks.filter(check => check.passed === false).length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Inspections</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {qualityChecks.filter(check => check.status === 'pending').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pass Rate</p>
                <p className="text-2xl font-bold">
                  {qualityChecks.length > 0 
                    ? Math.round((qualityChecks.filter(check => check.passed === true).length / qualityChecks.length) * 100)
                    : 0
                  }%
                </p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {showCreateForm && <CreateQualityCheckForm />}

      {/* Quality Checks List */}
      <div className="space-y-4">
        {qualityChecks.map((check) => (
          <Card key={check.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(check.passed, check.status)}
                    <h3 className="font-semibold text-lg">{check.check_type?.replace('_', ' ').toUpperCase()}</h3>
                    <Badge className={getStatusColor(check.passed, check.status)}>
                      {check.passed === true ? 'Passed' : check.passed === false ? 'Failed' : 'Pending'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                      <span className="font-medium">Project:</span> {check.project?.name || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Inspector:</span> {check.inspector?.contact?.first_name} {check.inspector?.contact?.last_name}
                    </div>
                    <div>
                      <span className="font-medium">Date:</span> {new Date(check.check_date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {check.location && (
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Location:</span> {check.location}
                    </div>
                  )}
                  
                  {check.notes && (
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{check.notes}</p>
                  )}
                  
                  {check.corrective_actions && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-3">
                      <h4 className="font-medium text-yellow-800 mb-1">Corrective Actions Required:</h4>
                      <p className="text-sm text-yellow-700">{check.corrective_actions}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Camera className="w-3 h-3 mr-1" />
                    Photos
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="w-3 h-3 mr-1" />
                    Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {qualityChecks.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quality checks yet</h3>
            <p className="text-gray-600 mb-4">Start your first quality inspection to ensure project standards.</p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Inspection
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
