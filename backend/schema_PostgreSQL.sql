CREATE TABLE IF NOT EXISTS farm_customer (
  id SERIAL PRIMARY KEY,
  legal_name TEXT NOT NULL,
  dba TEXT,
  tax_number TEXT NOT NULL,
  years_in_operation INTEGER NOT NULL,
  established_year INTEGER NOT NULL,
  ownership_structure TEXT,
  primary_contact_name TEXT NOT NULL,
  primary_contact_role TEXT NOT NULL,
  primary_contact_phone TEXT,
  primary_contact_mobile TEXT,
  primary_contact_email TEXT NOT NULL,
  secondary_contact_name TEXT,
  secondary_contact_role TEXT,
  secondary_contact_phone TEXT,
  secondary_contact_mobile TEXT,
  secondary_contact_email TEXT,
  physical_street TEXT NOT NULL,
  physical_city TEXT NOT NULL,
  physical_state TEXT NOT NULL,
  physical_zip_code TEXT NOT NULL,
  physical_county TEXT,
  mailing_street TEXT,
  mailing_city TEXT,
  mailing_state TEXT,
  mailing_zip_code TEXT,
  office_phone TEXT,
  mobile_phone TEXT,
  email TEXT NOT NULL,
  preferred_contact_method TEXT,
  preferred_contact_times TEXT,
  farm_category TEXT,
  total_acreage INTEGER NOT NULL,
  owned_acreage INTEGER NOT NULL,
  leased_acreage INTEGER NOT NULL,
  secondary_operations TEXT,
  seasonal_schedule TEXT NOT NULL,
  full_time_employees INTEGER NOT NULL,
  seasonal_employees INTEGER NOT NULL,
  credit_rating TEXT,
  payment_terms TEXT,
  credit_limit DOUBLE PRECISION NOT NULL,
  payment_history TEXT NOT NULL,
  annual_revenue_estimate DOUBLE PRECISION NOT NULL,
  bank_name TEXT NOT NULL,
  bank_branch TEXT,
  bank_account_type TEXT,
  annual_maintenance_schedule INTEGER NOT NULL DEFAULT 0,
  average_service_calls_per_year INTEGER NOT NULL,
  last_service_date DATE,
  upcoming_service TEXT,
  equipment_notes TEXT,
  account_manager TEXT NOT NULL,
  customer_tier TEXT,
  annual_purchase_volume_min DOUBLE PRECISION NOT NULL,
  annual_purchase_volume_max DOUBLE PRECISION NOT NULL,
  last_contact_date DATE,
  last_contact_method TEXT,
  last_contact_notes TEXT,
  buying_patterns TEXT NOT NULL,
  growth_plans TEXT,
  technology_adoption TEXT,
  certifications TEXT,
  special_requirements TEXT,
  competitor_relationships TEXT,
  referral_potential TEXT,
  referral_notes TEXT,
  delivery_street TEXT,
  delivery_city TEXT,
  delivery_state TEXT,
  delivery_zip_code TEXT,
  site_access TEXT NOT NULL,
  preferred_delivery_windows TEXT NOT NULL,
  storage_capacity TEXT NOT NULL,
  special_handling TEXT,
  newsletter_subscribed INTEGER NOT NULL DEFAULT 0,
  material_preferences TEXT,
  event_attendance_history TEXT,
  social_media_connections TEXT,
  product_interests TEXT,
  referral_source TEXT NOT NULL,
  safety_training_status TEXT,
  environmental_compliance_notes TEXT
);
CREATE TABLE IF NOT EXISTS crop (
  id SERIAL PRIMARY KEY,
  farm_customer_id INTEGER NOT NULL REFERENCES farm_customer(id) ON DELETE CASCADE,
  crop_type TEXT NOT NULL,
  acreage INTEGER NOT NULL,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_crop_customer ON crop(farm_customer_id);
CREATE TABLE IF NOT EXISTS livestock (
  id SERIAL PRIMARY KEY,
  farm_customer_id INTEGER NOT NULL REFERENCES farm_customer(id) ON DELETE CASCADE,
  livestock_type TEXT NOT NULL,
  head_count INTEGER NOT NULL,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_livestock_customer ON livestock(farm_customer_id);
CREATE TABLE IF NOT EXISTS production_metric (
  id SERIAL PRIMARY KEY,
  farm_customer_id INTEGER NOT NULL REFERENCES farm_customer(id) ON DELETE CASCADE,
  product TEXT NOT NULL,
  quantity DOUBLE PRECISION NOT NULL,
  unit TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_prodmetric_customer ON production_metric(farm_customer_id);
CREATE TABLE IF NOT EXISTS equipment_item (
  id SERIAL PRIMARY KEY,
  farm_customer_id INTEGER NOT NULL REFERENCES farm_customer(id) ON DELETE CASCADE,
  equipment_type TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT,
  year INTEGER,
  condition TEXT,
  serial_number TEXT
);

CREATE INDEX IF NOT EXISTS idx_equipment_item_customer ON equipment_item(farm_customer_id);
CREATE TABLE IF NOT EXISTS purchase (
  id SERIAL PRIMARY KEY,
  farm_customer_id INTEGER NOT NULL REFERENCES farm_customer(id) ON DELETE CASCADE,
  purchase_date DATE NOT NULL,
  item TEXT NOT NULL,
  amount DOUBLE PRECISION NOT NULL,
  purchase_order TEXT,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_purchase_customer ON purchase(farm_customer_id);
CREATE TABLE IF NOT EXISTS warranty (
  id SERIAL PRIMARY KEY,
  farm_customer_id INTEGER NOT NULL REFERENCES farm_customer(id) ON DELETE CASCADE,
  equipment_item_id INTEGER NOT NULL REFERENCES equipment_item(id) ON DELETE CASCADE,
  warranty_type TEXT NOT NULL,
  provider TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  coverage TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_warranty_customer ON warranty(farm_customer_id);
CREATE TABLE IF NOT EXISTS replacement_cycle (
  id SERIAL PRIMARY KEY,
  farm_customer_id INTEGER NOT NULL REFERENCES farm_customer(id) ON DELETE CASCADE,
  equipment_type TEXT NOT NULL,
  estimated_year INTEGER NOT NULL,
  estimated_value DOUBLE PRECISION,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_replacement_cycle_customer ON replacement_cycle(farm_customer_id);
CREATE TABLE IF NOT EXISTS trade_in (
  id SERIAL PRIMARY KEY,
  farm_customer_id INTEGER NOT NULL REFERENCES farm_customer(id) ON DELETE CASCADE,
  equipment TEXT NOT NULL,
  year INTEGER,
  condition TEXT,
  estimated_value DOUBLE PRECISION
);

CREATE INDEX IF NOT EXISTS idx_trade_in_customer ON trade_in(farm_customer_id);
CREATE TABLE IF NOT EXISTS insurance_policy (
  id SERIAL PRIMARY KEY,
  farm_customer_id INTEGER NOT NULL REFERENCES farm_customer(id) ON DELETE CASCADE,
  insurance_type TEXT NOT NULL,
  provider TEXT NOT NULL,
  policy_number TEXT NOT NULL,
  expiration_date DATE NOT NULL,
  coverage_amount DOUBLE PRECISION
);

CREATE INDEX IF NOT EXISTS idx_insurance_policy_customer ON insurance_policy(farm_customer_id);
CREATE TABLE IF NOT EXISTS contract (
  id SERIAL PRIMARY KEY,
  farm_customer_id INTEGER NOT NULL REFERENCES farm_customer(id) ON DELETE CASCADE,
  contract_type TEXT NOT NULL,
  contract_number TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT
);

CREATE INDEX IF NOT EXISTS idx_contract_customer ON contract(farm_customer_id);
CREATE TABLE IF NOT EXISTS lease (
  id SERIAL PRIMARY KEY,
  farm_customer_id INTEGER NOT NULL REFERENCES farm_customer(id) ON DELETE CASCADE,
  equipment_type TEXT NOT NULL,
  lease_number TEXT NOT NULL,
  monthly_payment DOUBLE PRECISION NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  terms TEXT
);

CREATE INDEX IF NOT EXISTS idx_lease_customer ON lease(farm_customer_id);
