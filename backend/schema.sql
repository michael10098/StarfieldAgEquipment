PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS farm_customer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  credit_limit REAL NOT NULL,
  payment_history TEXT NOT NULL,
  annual_revenue_estimate REAL NOT NULL,
  bank_name TEXT NOT NULL,
  bank_branch TEXT,
  bank_account_type TEXT,
  annual_maintenance_schedule INTEGER NOT NULL DEFAULT 0,
  average_service_calls_per_year INTEGER NOT NULL,
  last_service_date TEXT,
  upcoming_service TEXT,
  equipment_notes TEXT,
  account_manager TEXT NOT NULL,
  customer_tier TEXT,
  annual_purchase_volume_min REAL NOT NULL,
  annual_purchase_volume_max REAL NOT NULL,
  last_contact_date TEXT,
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


-- CROPS ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS crop (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farm_customer_id INTEGER NOT NULL,
  crop_type TEXT NOT NULL,
  acreage INTEGER NOT NULL,
  notes TEXT,
  FOREIGN KEY(farm_customer_id) REFERENCES farm_customer(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_crop_customer ON crop(farm_customer_id);


-- LIVESTOCK --------------------------------------------------------

CREATE TABLE IF NOT EXISTS livestock (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farm_customer_id INTEGER NOT NULL,
  livestock_type TEXT NOT NULL,
  head_count INTEGER NOT NULL,
  notes TEXT,
  FOREIGN KEY(farm_customer_id) REFERENCES farm_customer(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_livestock_customer ON livestock(farm_customer_id);


-- PRODUCTION METRICS ----------------------------------------------

CREATE TABLE IF NOT EXISTS production_metric (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farm_customer_id INTEGER NOT NULL,
  product TEXT NOT NULL,
  quantity REAL NOT NULL,
  unit TEXT NOT NULL,
  FOREIGN KEY(farm_customer_id) REFERENCES farm_customer(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_prodmetric_customer ON production_metric(farm_customer_id);


-- EQUIPMENT --------------------------------------------------------

CREATE TABLE IF NOT EXISTS equipment_item (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farm_customer_id INTEGER NOT NULL,
  equipment_type TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT,
  year INTEGER,
  condition TEXT,
  serial_number TEXT,
  FOREIGN KEY(farm_customer_id) REFERENCES farm_customer(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_equipment_item_customer ON equipment_item(farm_customer_id);


-- PURCHASES --------------------------------------------------------

CREATE TABLE IF NOT EXISTS purchase (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farm_customer_id INTEGER NOT NULL,
  purchase_date TEXT NOT NULL,
  item TEXT NOT NULL,
  amount REAL NOT NULL,
  purchase_order TEXT,
  notes TEXT,
  FOREIGN KEY(farm_customer_id) REFERENCES farm_customer(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_purchase_customer ON purchase(farm_customer_id);


-- WARRANTIES -------------------------------------------------------

CREATE TABLE IF NOT EXISTS warranty (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farm_customer_id INTEGER NOT NULL,
  equipment_item_id INTEGER NOT NULL,
  warranty_type TEXT NOT NULL,
  provider TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  coverage TEXT NOT NULL,
  FOREIGN KEY(farm_customer_id) REFERENCES farm_customer(id) ON DELETE CASCADE,
  FOREIGN KEY(equipment_item_id) REFERENCES equipment_item(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_warranty_customer ON warranty(farm_customer_id);


-- REPLACEMENT CYCLES ----------------------------------------------

CREATE TABLE IF NOT EXISTS replacement_cycle (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farm_customer_id INTEGER NOT NULL,
  equipment_type TEXT NOT NULL,
  estimated_year INTEGER NOT NULL,
  estimated_value REAL,
  notes TEXT,
  FOREIGN KEY(farm_customer_id) REFERENCES farm_customer(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_replacement_cycle_customer ON replacement_cycle(farm_customer_id);


-- TRADE-INS --------------------------------------------------------

CREATE TABLE IF NOT EXISTS trade_in (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farm_customer_id INTEGER NOT NULL,
  equipment TEXT NOT NULL,
  year INTEGER,
  condition TEXT,
  estimated_value REAL,
  FOREIGN KEY(farm_customer_id) REFERENCES farm_customer(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_trade_in_customer ON trade_in(farm_customer_id);


-- INSURANCE --------------------------------------------------------

CREATE TABLE IF NOT EXISTS insurance_policy (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farm_customer_id INTEGER NOT NULL,
  insurance_type TEXT NOT NULL,
  provider TEXT NOT NULL,
  policy_number TEXT NOT NULL,
  expiration_date TEXT NOT NULL,
  coverage_amount REAL,
  FOREIGN KEY(farm_customer_id) REFERENCES farm_customer(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_insurance_policy_customer ON insurance_policy(farm_customer_id);


-- CONTRACTS --------------------------------------------------------

CREATE TABLE IF NOT EXISTS contract (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farm_customer_id INTEGER NOT NULL,
  contract_type TEXT NOT NULL,
  contract_number TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT,
  description TEXT,
  FOREIGN KEY(farm_customer_id) REFERENCES farm_customer(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_contract_customer ON contract(farm_customer_id);


-- LEASES -----------------------------------------------------------

CREATE TABLE IF NOT EXISTS lease (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farm_customer_id INTEGER NOT NULL,
  equipment_type TEXT NOT NULL,
  lease_number TEXT NOT NULL,
  monthly_payment REAL NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  terms TEXT,
  FOREIGN KEY(farm_customer_id) REFERENCES farm_customer(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_lease_customer ON lease(farm_customer_id);
