
-- Core Business Tables
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  tax_id VARCHAR(50),
  website VARCHAR(255),
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enhanced Contacts/Customers Table
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  mobile VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  is_customer BOOLEAN DEFAULT true,
  is_vendor BOOLEAN DEFAULT false,
  is_employee BOOLEAN DEFAULT false,
  contact_type VARCHAR(50) DEFAULT 'customer',
  tags TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Sales & Opportunities
CREATE TABLE public.opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES public.contacts(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  stage VARCHAR(50) DEFAULT 'qualification',
  probability INTEGER DEFAULT 0,
  expected_revenue DECIMAL(12,2),
  expected_close_date DATE,
  priority VARCHAR(20) DEFAULT 'medium',
  source VARCHAR(100),
  assigned_to UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enhanced Projects Table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id UUID REFERENCES public.opportunities(id),
  contact_id UUID REFERENCES public.contacts(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  project_type VARCHAR(100),
  status VARCHAR(50) DEFAULT 'planning',
  start_date DATE,
  end_date DATE,
  budget DECIMAL(12,2),
  actual_cost DECIMAL(12,2) DEFAULT 0,
  completion_percentage INTEGER DEFAULT 0,
  location TEXT,
  coordinates POINT,
  site_conditions TEXT,
  special_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Estimates/Quotes
CREATE TABLE public.estimates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES public.contacts(id),
  project_id UUID REFERENCES public.projects(id),
  estimate_number VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  subtotal DECIMAL(12,2) DEFAULT 0,
  tax_amount DECIMAL(12,2) DEFAULT 0,
  total_amount DECIMAL(12,2) DEFAULT 0,
  valid_until DATE,
  terms_conditions TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Estimate Line Items
CREATE TABLE public.estimate_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  estimate_id UUID REFERENCES public.estimates(id) ON DELETE CASCADE,
  product_id UUID,
  description TEXT NOT NULL,
  quantity DECIMAL(10,3) DEFAULT 1,
  unit_price DECIMAL(10,2) DEFAULT 0,
  total_price DECIMAL(12,2) DEFAULT 0,
  unit_of_measure VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enhanced Inventory/Products
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sku VARCHAR(100) UNIQUE,
  product_type VARCHAR(50) DEFAULT 'material',
  category VARCHAR(100),
  unit_of_measure VARCHAR(20),
  cost_price DECIMAL(10,2) DEFAULT 0,
  sale_price DECIMAL(10,2) DEFAULT 0,
  quantity_on_hand DECIMAL(10,3) DEFAULT 0,
  minimum_stock DECIMAL(10,3) DEFAULT 0,
  maximum_stock DECIMAL(10,3),
  is_active BOOLEAN DEFAULT true,
  supplier_id UUID REFERENCES public.contacts(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Equipment Management
CREATE TABLE public.equipment (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  equipment_type VARCHAR(100),
  model VARCHAR(100),
  serial_number VARCHAR(100),
  purchase_date DATE,
  purchase_price DECIMAL(12,2),
  current_value DECIMAL(12,2),
  status VARCHAR(50) DEFAULT 'available',
  location VARCHAR(255),
  assigned_to UUID REFERENCES public.contacts(id),
  maintenance_schedule VARCHAR(100),
  last_maintenance DATE,
  next_maintenance DATE,
  hours_used DECIMAL(10,2) DEFAULT 0,
  fuel_type VARCHAR(50),
  license_plate VARCHAR(20),
  insurance_expiry DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Employees Extended
CREATE TABLE public.employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES public.contacts(id),
  employee_id VARCHAR(50) UNIQUE,
  department VARCHAR(100),
  position VARCHAR(100),
  hire_date DATE,
  employment_type VARCHAR(50) DEFAULT 'full_time',
  salary DECIMAL(12,2),
  hourly_rate DECIMAL(8,2),
  status VARCHAR(50) DEFAULT 'active',
  manager_id UUID REFERENCES public.employees(id),
  certifications TEXT[],
  skills TEXT[],
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Timesheets
CREATE TABLE public.timesheets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id),
  project_id UUID REFERENCES public.projects(id),
  date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  hours_worked DECIMAL(4,2),
  break_time DECIMAL(4,2) DEFAULT 0,
  overtime_hours DECIMAL(4,2) DEFAULT 0,
  description TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  approved_by UUID REFERENCES public.employees(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Invoices
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES public.contacts(id),
  project_id UUID REFERENCES public.projects(id),
  estimate_id UUID REFERENCES public.estimates(id),
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  issue_date DATE DEFAULT CURRENT_DATE,
  due_date DATE,
  subtotal DECIMAL(12,2) DEFAULT 0,
  tax_amount DECIMAL(12,2) DEFAULT 0,
  total_amount DECIMAL(12,2) DEFAULT 0,
  amount_paid DECIMAL(12,2) DEFAULT 0,
  balance_due DECIMAL(12,2) DEFAULT 0,
  payment_terms VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Purchase Orders
CREATE TABLE public.purchase_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES public.contacts(id),
  po_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  order_date DATE DEFAULT CURRENT_DATE,
  expected_date DATE,
  total_amount DECIMAL(12,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Expenses
CREATE TABLE public.expenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id),
  project_id UUID REFERENCES public.projects(id),
  category VARCHAR(100),
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  expense_date DATE DEFAULT CURRENT_DATE,
  receipt_url TEXT,
  status VARCHAR(50) DEFAULT 'submitted',
  approved_by UUID REFERENCES public.employees(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  reimbursed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Quality Control
CREATE TABLE public.quality_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id),
  inspector_id UUID REFERENCES public.employees(id),
  check_type VARCHAR(100),
  check_date DATE DEFAULT CURRENT_DATE,
  location TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  passed BOOLEAN,
  notes TEXT,
  corrective_actions TEXT,
  photos TEXT[],
  test_results JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Maintenance Records
CREATE TABLE public.maintenance_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  equipment_id UUID REFERENCES public.equipment(id),
  maintenance_type VARCHAR(100),
  description TEXT,
  performed_by UUID REFERENCES public.employees(id),
  performed_date DATE DEFAULT CURRENT_DATE,
  cost DECIMAL(10,2),
  parts_used TEXT[],
  hours_spent DECIMAL(4,2),
  next_service_date DATE,
  status VARCHAR(50) DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Documents
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_type VARCHAR(50),
  file_size INTEGER,
  related_to_type VARCHAR(50),
  related_to_id UUID,
  uploaded_by UUID REFERENCES public.employees(id),
  tags TEXT[],
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estimate_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timesheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quality_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (allowing all operations for now - you can customize these later)
CREATE POLICY "Allow all operations" ON public.companies FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.contacts FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.opportunities FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.projects FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.estimates FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.estimate_items FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.products FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.equipment FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.employees FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.timesheets FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.invoices FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.purchase_orders FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.expenses FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.quality_checks FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.maintenance_records FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.documents FOR ALL USING (true);
