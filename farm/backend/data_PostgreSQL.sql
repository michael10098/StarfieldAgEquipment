-- Farm Customer Database Seed Script for PostgreSQL
-- Starfield Ag Equipment Customer Database

-- Begin transaction for atomic insertion
BEGIN;

-- ========================================
-- CUSTOMER 1: Henderson Family Farms, LLC
-- ========================================

INSERT INTO farm_customer (
  legal_name, dba, tax_number, years_in_operation, established_year, ownership_structure,
  primary_contact_name, primary_contact_role, primary_contact_phone, primary_contact_mobile, primary_contact_email,
  secondary_contact_name, secondary_contact_role, secondary_contact_phone, secondary_contact_mobile, secondary_contact_email,
  physical_street, physical_city, physical_state, physical_zip_code, physical_county,
  office_phone, mobile_phone, email, preferred_contact_method, preferred_contact_times,
  farm_category, total_acreage, owned_acreage, leased_acreage, secondary_operations, seasonal_schedule,
  full_time_employees, seasonal_employees,
  credit_rating, payment_terms, credit_limit, payment_history, annual_revenue_estimate,
  bank_name, bank_branch, bank_account_type,
  annual_maintenance_schedule, average_service_calls_per_year, last_service_date, upcoming_service, equipment_notes,
  account_manager, customer_tier, annual_purchase_volume_min, annual_purchase_volume_max,
  last_contact_date, last_contact_method, last_contact_notes, buying_patterns,
  growth_plans, technology_adoption, certifications, special_requirements, competitor_relationships, referral_potential, referral_notes,
  delivery_street, delivery_city, delivery_state, delivery_zip_code, site_access, preferred_delivery_windows, storage_capacity, special_handling,
  newsletter_subscribed, material_preferences, event_attendance_history, social_media_connections, product_interests, referral_source,
  safety_training_status, environmental_compliance_notes
) VALUES (
  'Henderson Family Farms, LLC', 'Henderson Farms', '42-1847562', 47, 1978, 'FAMILY_LLC',
  'Michael Henderson', 'Owner/Operator', '(641) 847-3921', '(641) 555-0142', 'mike@hendersonfarms.com',
  'Sarah Henderson', 'Farm Manager', '(641) 847-3921', '(641) 555-0143', 'sarah@hendersonfarms.com',
  '18420 County Road 52', 'Ackley', 'IA', '50601', 'Hardin',
  '(641) 847-3921', '(641) 555-0142', 'mike@hendersonfarms.com', 'MOBILE', 'Weekdays 7-9 AM or after 6 PM',
  'GRAIN_ROW_CROP', 800, 650, 150, 'Small cattle feedlot (50 head)', 'Planting April-May, Harvest September-November',
  2, 3,
  'A_MINUS', 'NET_45', 250000, 'Excellent - always pays within terms', 850000,
  'First National Bank of Ackley', 'Main Branch', 'Business Checking',
  true, 3, '2024-10-15', 'Annual winter maintenance scheduled', 'Well-maintained, proactive about servicing',
  'Jennifer Martinez', 'GOLD', 75000, 120000,
  '2024-11-06', 'MOBILE', 'Service follow-up, very satisfied with recent planter upgrade', 'Major purchases February-March, parts throughout season',
  'Negotiating lease on additional 200 acres for 2026', 'HIGH', '', 'Prefers equipment with extended warranties', 'Also purchases from local John Deere dealer', 'HIGH', 'Well-respected in county farm bureau',
  '18420 County Road 52', 'Ackley', 'IA', '50601', 'Good - paved county road, large equipment barn', 'Weekdays 8 AM - 4 PM', '5,000 sq ft equipment barn with concrete floor', 'None',
  true, 'EMAIL, TEXT', 'Annual customer appreciation event, 2 field days', 'Facebook', 'Precision agriculture, Fuel-efficient equipment', 'Family relationship since 1978',
  'Operator training completed 2023', 'No issues'
);

-- Crops for Henderson Family Farms
INSERT INTO crop (farm_customer_id, crop_type, acreage, notes) VALUES
  (1, 'Corn', 450, 'Primary crop'),
  (1, 'Soybeans', 350, 'Rotation crop');

-- Livestock for Henderson Family Farms
INSERT INTO livestock (farm_customer_id, livestock_type, head_count, notes) VALUES
  (1, 'Cattle Feedlot', 50, 'Small operation');

-- Production Metrics for Henderson Family Farms
INSERT INTO production_metric (farm_customer_id, product, quantity, unit) VALUES
  (1, 'Corn', 32000, 'bushels'),
  (1, 'Soybeans', 18000, 'bushels');

-- Equipment for Henderson Family Farms
INSERT INTO equipment_item (farm_customer_id, equipment_type, brand, model, year, condition, serial_number) VALUES
  (1, 'Tractor', 'John Deere', '8R', 2019, 'Excellent', 'JD8R2019001'),
  (1, 'Tractor', 'Case IH', 'Magnum', 2020, 'Excellent', 'CIH2020001'),
  (1, 'Combine', 'John Deere', 'S780', 2018, 'Good', 'JDS7802018001');

-- Purchases for Henderson Family Farms
INSERT INTO purchase (farm_customer_id, purchase_date, item, amount, purchase_order, notes) VALUES
  (1, '2023-03-15', 'Precision planter upgrade', 45000, 'PO-2023-001', 'GPS guidance system included'),
  (1, '2021-08-20', 'Grain cart', 28500, 'PO-2021-045', 'High capacity model'),
  (1, '2019-02-10', 'Tractor trade-in and purchase', 185000, 'PO-2019-012', 'Traded in 2015 model');

-- Warranties for Henderson Family Farms
INSERT INTO warranty (farm_customer_id, equipment_item_id, warranty_type, provider, start_date, end_date, coverage) 
SELECT 1, id, 'Extended', 'John Deere', '2019-02-10', '2025-02-10', 'Full coverage including powertrain'
FROM equipment_item WHERE farm_customer_id = 1 AND serial_number = 'JD8R2019001';

-- Replacement Cycles for Henderson Family Farms
INSERT INTO replacement_cycle (farm_customer_id, equipment_type, estimated_year, estimated_value, notes) VALUES
  (1, 'Combine', 2026, 400000, 'Considering upgrade to newer S-series');

-- Trade-ins for Henderson Family Farms
INSERT INTO trade_in (farm_customer_id, equipment, year, condition, estimated_value) VALUES
  (1, '2015 John Deere 7210R tractor', 2015, 'Good', 95000);

-- Insurance for Henderson Family Farms
INSERT INTO insurance_policy (farm_customer_id, insurance_type, provider, policy_number, expiration_date, coverage_amount) VALUES
  (1, 'Liability', 'Farm Bureau Insurance', 'FBI-2024-8472', '2025-12-31', 2000000);

-- Contracts for Henderson Family Farms
INSERT INTO contract (farm_customer_id, contract_type, contract_number, start_date, end_date, description) VALUES
  (1, 'Service Agreement', 'SA-2024-001', '2024-01-01', '2024-12-31', 'Annual maintenance and priority service');


-- ========================================
-- CUSTOMER 2: Riverside Agricultural Holdings, Inc.
-- ========================================

INSERT INTO farm_customer (
  legal_name, dba, tax_number, years_in_operation, established_year, ownership_structure,
  primary_contact_name, primary_contact_role, primary_contact_phone, primary_contact_mobile, primary_contact_email,
  secondary_contact_name, secondary_contact_role, secondary_contact_phone, secondary_contact_mobile, secondary_contact_email,
  physical_street, physical_city, physical_state, physical_zip_code, physical_county,
  mailing_street, mailing_city, mailing_state, mailing_zip_code,
  office_phone, mobile_phone, email, preferred_contact_method, preferred_contact_times,
  farm_category, total_acreage, owned_acreage, leased_acreage, secondary_operations, seasonal_schedule,
  full_time_employees, seasonal_employees,
  credit_rating, payment_terms, credit_limit, payment_history, annual_revenue_estimate,
  bank_name, bank_branch, bank_account_type,
  annual_maintenance_schedule, average_service_calls_per_year, last_service_date, upcoming_service, equipment_notes,
  account_manager, customer_tier, annual_purchase_volume_min, annual_purchase_volume_max,
  last_contact_date, last_contact_method, last_contact_notes, buying_patterns,
  growth_plans, technology_adoption, certifications, special_requirements, competitor_relationships, referral_potential, referral_notes,
  delivery_street, delivery_city, delivery_state, delivery_zip_code, site_access, preferred_delivery_windows, storage_capacity, special_handling,
  newsletter_subscribed, material_preferences, event_attendance_history, social_media_connections, product_interests, referral_source,
  safety_training_status, environmental_compliance_notes
) VALUES (
  'Riverside Agricultural Holdings, Inc.', 'Riverside Farms', '48-2934716', 62, 1963, 'S_CORP',
  'Robert Jameson', 'CEO', '(785) 462-7733', '(785) 555-0198', 'rjameson@riversideag.com',
  'David Jameson', 'Operations Manager', '(785) 462-7733', '(785) 555-0199', 'djameson@riversideag.com',
  '8845 Highway 24', 'Colby', 'KS', '67701', 'Thomas',
  'PO Box 892', 'Colby', 'KS', '67701',
  '(785) 462-7733', '(785) 555-0198', 'rjameson@riversideag.com', 'EMAIL', 'Office hours 8 AM - 5 PM',
  'GRAIN_ROW_CROP', 1200, 1200, 0, 'Custom harvesting services', 'Wheat harvest June-July, barley harvest July-August',
  4, 6,
  'A_PLUS', 'NET_30', 400000, 'Excellent - early pay discount user', 1400000,
  'Commerce Bank of Kansas', 'Colby Branch', 'Business Checking',
  true, 8, '2024-11-13', 'Pre-season equipment check scheduled for spring', 'Fleet is well-maintained, operates custom harvesting business',
  'Marcus Thompson', 'PLATINUM', 180000, 250000,
  '2024-11-13', 'EMAIL', 'Parts order for combine maintenance', 'Major purchases December-January, regular parts orders',
  'Expanding custom harvesting to 3-state region', 'VERY_HIGH', 'Commercial Applicator License', 'Fast parts delivery for custom harvesting season', 'Exclusive relationship with our dealership', 'VERY_HIGH', 'Refers custom harvesting clients regularly',
  '8845 Highway 24', 'Colby', 'KS', '67701', 'Excellent - highway access, large commercial-grade shop', 'Flexible scheduling, 24-hour advance notice', '12,000 sq ft heated shop, multiple equipment bays', 'Can accept semi-truck deliveries',
  true, 'EMAIL', 'VIP customer events, trade shows, 4 field demonstrations', 'Facebook, LinkedIn', 'High-efficiency equipment, Automation, Fleet management', 'Long-term relationship since 1963',
  'All operators certified annually', 'EPA compliance for commercial operations'
);

-- Crops for Riverside Agricultural Holdings
INSERT INTO crop (farm_customer_id, crop_type, acreage, notes) VALUES
  (2, 'Winter Wheat', 700, 'Primary crop'),
  (2, 'Barley', 500, 'Secondary crop');

-- Production Metrics for Riverside Agricultural Holdings
INSERT INTO production_metric (farm_customer_id, product, quantity, unit) VALUES
  (2, 'Wheat', 50000, 'bushels'),
  (2, 'Barley', 35000, 'bushels');

-- Equipment for Riverside Agricultural Holdings
INSERT INTO equipment_item (farm_customer_id, equipment_type, brand, model, year, condition, serial_number) VALUES
  (2, 'Tractor', 'Case IH', 'Magnum', 2020, 'Excellent', 'CIH2020002'),
  (2, 'Tractor', 'Case IH', 'Steiger', 2019, 'Excellent', 'CIH2019001'),
  (2, 'Tractor', 'New Holland', 'T9', 2021, 'Excellent', 'NH2021001'),
  (2, 'Combine', 'Case IH', 'Axial-Flow 9250', 2024, 'New', 'CIH9250-2024'),
  (2, 'Combine', 'Case IH', 'Axial-Flow 8250', 2022, 'Excellent', 'CIH8250-2022');

-- Purchases for Riverside Agricultural Holdings
INSERT INTO purchase (farm_customer_id, purchase_date, item, amount, purchase_order, notes) VALUES
  (2, '2024-01-20', 'Second combine harvester', 385000, 'PO-2024-003', 'For custom harvesting expansion'),
  (2, '2022-07-15', 'High-capacity grain cart', 42000, 'PO-2022-028', 'Increased capacity needed'),
  (2, '2020-03-05', 'Tractor and air seeder package', 215000, 'PO-2020-008', 'Complete seeding system');

-- Warranties for Riverside Agricultural Holdings
INSERT INTO warranty (farm_customer_id, equipment_item_id, warranty_type, provider, start_date, end_date, coverage) 
SELECT 2, id, 'Full Coverage', 'Case IH', '2024-01-20', '2027-01-20', 'Comprehensive warranty including parts and labor'
FROM equipment_item WHERE farm_customer_id = 2 AND serial_number = 'CIH9250-2024';

-- Replacement Cycles for Riverside Agricultural Holdings
INSERT INTO replacement_cycle (farm_customer_id, equipment_type, estimated_year, estimated_value, notes) VALUES
  (2, 'Tractor', 2025, 250000, 'Regular 3-4 year replacement cycle');

-- Trade-ins for Riverside Agricultural Holdings
INSERT INTO trade_in (farm_customer_id, equipment, year, condition, estimated_value) VALUES
  (2, '2016 Case IH Magnum 280', 2016, 'Good', 125000);

-- Insurance for Riverside Agricultural Holdings
INSERT INTO insurance_policy (farm_customer_id, insurance_type, provider, policy_number, expiration_date, coverage_amount) VALUES
  (2, 'Commercial Liability', 'Kansas Farm Bureau', 'KFB-2024-9281', '2025-06-30', 5000000),
  (2, 'Fleet Insurance', 'Kansas Farm Bureau', 'KFB-2024-9282', '2025-06-30', 3000000);

-- Contracts for Riverside Agricultural Holdings
INSERT INTO contract (farm_customer_id, contract_type, contract_number, start_date, end_date, description) VALUES
  (2, 'Master Service Agreement', 'MSA-2024-002', '2024-01-01', '2026-12-31', 'Priority service and volume purchase discounts'),
  (2, 'Volume Purchase Agreement', 'VPA-2024-001', '2024-01-01', '2024-12-31', 'Tiered pricing based on annual volume');

-- Leases for Riverside Agricultural Holdings
INSERT INTO lease (farm_customer_id, equipment_type, lease_number, monthly_payment, start_date, end_date, terms) VALUES
  (2, 'Grain Trucks', 'LEASE-2023-045', 3500, '2023-06-01', '2028-05-31', '60-month lease with purchase option');


-- ========================================
-- CUSTOMER 3: Prairie View Farms LLC
-- ========================================

INSERT INTO farm_customer (
  legal_name, dba, tax_number, years_in_operation, established_year, ownership_structure,
  primary_contact_name, primary_contact_role, primary_contact_phone, primary_contact_mobile, primary_contact_email,
  secondary_contact_name, secondary_contact_role, secondary_contact_phone, secondary_contact_mobile, secondary_contact_email,
  physical_street, physical_city, physical_state, physical_zip_code, physical_county,
  office_phone, mobile_phone, email, preferred_contact_method, preferred_contact_times,
  farm_category, total_acreage, owned_acreage, leased_acreage, secondary_operations, seasonal_schedule,
  full_time_employees, seasonal_employees,
  credit_rating, payment_terms, credit_limit, payment_history, annual_revenue_estimate,
  bank_name, bank_branch, bank_account_type,
  annual_maintenance_schedule, average_service_calls_per_year, last_service_date, upcoming_service, equipment_notes,
  account_manager, customer_tier, annual_purchase_volume_min, annual_purchase_volume_max,
  last_contact_date, last_contact_method, last_contact_notes, buying_patterns,
  growth_plans, technology_adoption, certifications, special_requirements, competitor_relationships, referral_potential, referral_notes,
  delivery_street, delivery_city, delivery_state, delivery_zip_code, site_access, preferred_delivery_windows, storage_capacity, special_handling,
  newsletter_subscribed, material_preferences, event_attendance_history, social_media_connections, product_interests, referral_source,
  safety_training_status, environmental_compliance_notes
) VALUES (
  'Prairie View Farms LLC', 'Prairie View', '47-3821945', 35, 1990, 'FAMILY_LLC',
  'James Liu', 'Managing Partner', '(402) 765-4412', '(402) 555-0223', 'james@prairieviewne.com',
  'Thomas Liu', 'Field Operations', '(402) 765-4412', '(402) 555-0224', 'thomas@prairieviewne.com',
  '12670 Road 330', 'Polk', 'NE', '68654', 'Polk',
  '(402) 765-4412', '(402) 555-0223', 'james@prairieviewne.com', 'TEXT', 'Calls after 7 PM',
  'GRAIN_ROW_CROP', 650, 550, 100, 'None', 'Continuous planting/harvest April-November',
  3, 2,
  'BBB_PLUS', 'NET_60', 175000, 'Good - occasional delays (5-10 days) during harvest', 625000,
  'Farmers & Merchants Bank of Polk', 'Main Branch', 'Business Checking',
  true, 5, '2024-10-28', 'Winter equipment checkup', 'Mix of new and used equipment, cost-conscious buyers',
  'Jennifer Martinez', 'SILVER', 35000, 65000,
  '2024-10-30', 'TEXT', 'Parts inquiry for grain trailer', 'Prefers late-season purchases, open to used equipment',
  'Modest expansion, focusing on efficiency over size', 'MEDIUM', '', 'Flexible financing options important', 'Shops multiple dealers for best pricing', 'MEDIUM', 'Conservative with recommendations',
  '12670 Road 330', 'Polk', 'NE', '68654', 'Good - gravel road, adequate equipment storage', 'Weekends or after 6 PM weekdays', '3,000 sq ft pole barn', 'Limited unloading equipment',
  true, 'MAIL, PHONE', 'Occasional - 1-2 events per year', '', 'Value-oriented equipment, Used options', 'Responded to direct mail campaign in 2018',
  'Self-trained operators', 'No issues'
);

-- Crops for Prairie View Farms
INSERT INTO crop (farm_customer_id, crop_type, acreage, notes) VALUES
  (3, 'Corn', 300, 'Primary crop'),
  (3, 'Soybeans', 250, 'Rotation crop'),
  (3, 'Wheat', 100, 'Cover crop');

-- Production Metrics for Prairie View Farms
INSERT INTO production_metric (farm_customer_id, product, quantity, unit) VALUES
  (3, 'Corn', 24000, 'bushels'),
  (3, 'Soybeans', 14500, 'bushels'),
  (3, 'Wheat', 5500, 'bushels');

-- Equipment for Prairie View Farms
INSERT INTO equipment_item (farm_customer_id, equipment_type, brand, model, year, condition, serial_number) VALUES
  (3, 'Tractor', 'Kubota', 'M7', 2018, 'Good', 'KUB2018001'),
  (3, 'Tractor', 'John Deere', '6M', 2015, 'Fair', 'JD6M2015001'),
  (3, 'Combine', 'John Deere', '9600', 1998, 'Fair', 'JD9600-1998');

-- Purchases for Prairie View Farms
INSERT INTO purchase (farm_customer_id, purchase_date, item, amount, purchase_order, notes) VALUES
  (3, '2023-11-10', 'Used grain trailer', 18500, 'PO-2023-089', 'Good value on used equipment'),
  (3, '2021-09-15', 'Tractor attachments and precision guidance system', 32000, 'PO-2021-067', 'GPS upgrade'),
  (3, '2018-04-20', 'Kubota tractor', 89000, 'PO-2018-023', 'New tractor purchase');

-- Replacement Cycles for Prairie View Farms
INSERT INTO replacement_cycle (farm_customer_id, equipment_type, estimated_year, estimated_value, notes) VALUES
  (3, 'Combine', 2026, 150000, 'Planning upgrade within 2 years, considering used options');

-- Trade-ins for Prairie View Farms
INSERT INTO trade_in (farm_customer_id, equipment, year, condition, estimated_value) VALUES
  (3, '1998 John Deere 9600 combine', 1998, 'Fair', 25000);

-- Insurance for Prairie View Farms
INSERT INTO insurance_policy (farm_customer_id, insurance_type, provider, policy_number, expiration_date, coverage_amount) VALUES
  (3, 'Liability', 'State Farm', 'SF-2024-7293', '2025-08-31', 1000000);


-- ========================================
-- CUSTOMER 4: Meadowbrook Grain Company
-- ========================================

INSERT INTO farm_customer (
  legal_name, dba, tax_number, years_in_operation, established_year, ownership_structure,
  primary_contact_name, primary_contact_role, primary_contact_phone, primary_contact_mobile, primary_contact_email,
  secondary_contact_name, secondary_contact_role, secondary_contact_phone, secondary_contact_mobile, secondary_contact_email,
  physical_street, physical_city, physical_state, physical_zip_code, physical_county,
  office_phone, mobile_phone, email, preferred_contact_method, preferred_contact_times,
  farm_category, total_acreage, owned_acreage, leased_acreage, secondary_operations, seasonal_schedule,
  full_time_employees, seasonal_employees,
  credit_rating, payment_terms, credit_limit, payment_history, annual_revenue_estimate,
  bank_name, bank_branch, bank_account_type,
  annual_maintenance_schedule, average_service_calls_per_year, last_service_date, upcoming_service, equipment_notes,
  account_manager, customer_tier, annual_purchase_volume_min, annual_purchase_volume_max,
  last_contact_date, last_contact_method, last_contact_notes, buying_patterns,
  growth_plans, technology_adoption, certifications, special_requirements, competitor_relationships, referral_potential, referral_notes,
  delivery_street, delivery_city, delivery_state, delivery_zip_code, site_access, preferred_delivery_windows, storage_capacity, special_handling,
  newsletter_subscribed, material_preferences, event_attendance_history, social_media_connections, product_interests, referral_source,
  safety_training_status, environmental_compliance_notes
) VALUES (
  'Meadowbrook Grain Company, Inc.', 'Meadowbrook Farms', '36-4729183', 28, 1997, 'CORPORATION',
  'Patricia Anderson', 'President', '(815) 269-5581', '(815) 555-0267', 'patricia@meadowbrookgrain.com',
  'Kevin Anderson', 'VP Operations', '(815) 269-5581', '(815) 555-0268', 'kevin@meadowbrookgrain.com',
  '6234 East 2100 North Road', 'Danforth', 'IL', '60930', 'Iroquois',
  '(815) 269-5581', '(815) 555-0267', 'patricia@meadowbrookgrain.com', 'EMAIL', 'Email preferred, phone for urgent matters',
  'GRAIN_ROW_CROP', 900, 700, 200, 'On-farm grain storage and drying', 'Year-round operations with peak harvest September-November',
  3, 4,
  'A', 'NET_30', 300000, 'Excellent - uses seasonal payment plan effectively', 950000,
  'First Farmers Bank & Trust', 'Danforth Branch', 'Business Checking',
  true, 6, '2024-11-15', 'Scheduled maintenance program in place', 'Invests in technology upgrades, excellent maintenance',
  'Marcus Thompson', 'GOLD', 95000, 140000,
  '2024-11-15', 'EMAIL', 'Seasonal payment setup completed', 'Strategic purchases pre-season, technology upgrades mid-year',
  'Adding on-farm grain storage capacity, potential land purchase', 'HIGH', 'Certified Grain Handler', 'Priority service during harvest season', 'Loyal to dealership, occasional parts from other sources', 'HIGH', 'Active in Illinois Farm Bureau, grain co-op board member',
  '6234 East 2100 North Road', 'Danforth', 'IL', '60930', 'Excellent - paved road, commercial grain facility on-site', 'Weekdays 7 AM - 5 PM, 48-hour notice preferred', '8,000 sq ft climate-controlled shop, multiple grain bins', 'Loading dock available',
  true, 'EMAIL, TEXT', 'Regular attendee at field days, customer appreciation events, winter seminars', 'Facebook, Instagram', 'Precision agriculture, Grain handling equipment, Efficiency technology', 'Trade show contact, became customer in 2016',
  'Annual safety certifications for all employees', 'EPA grain facility compliance, dust control systems'
);

-- Crops for Meadowbrook Grain
INSERT INTO crop (farm_customer_id, crop_type, acreage, notes) VALUES
  (4, 'Corn', 400, 'Primary crop'),
  (4, 'Soybeans', 350, 'Rotation crop'),
  (4, 'Winter Wheat', 150, 'Cover crop');

-- Production Metrics for Meadowbrook Grain
INSERT INTO production_metric (farm_customer_id, product, quantity, unit) VALUES
  (4, 'Corn', 36000, 'bushels'),
  (4, 'Soybeans', 20500, 'bushels'),
  (4, 'Wheat', 8000, 'bushels');

-- Equipment for Meadowbrook Grain
INSERT INTO equipment_item (farm_customer_id, equipment_type, brand, model, year, condition, serial_number) VALUES
  (4, 'Tractor', 'John Deere', '8R', 2019, 'Excellent', 'JD8R2019002'),
  (4, 'Tractor', 'Case IH', 'Magnum', 2020, 'Excellent', 'CIH2020003'),
  (4, 'Tractor', 'Versatile', 'DeltaTrack', 2021, 'Excellent', 'VERS2021001'),
  (4, 'Combine', 'John Deere', 'S770', 2022, 'Excellent', 'JDS7702022001'),
  (4, 'Grain Dryer', 'GSI', '2000', 2024, 'New', 'GSI2024001');

-- Purchases for Meadowbrook Grain
INSERT INTO purchase (farm_customer_id, purchase_date, item, amount, purchase_order, notes) VALUES
  (4, '2024-08-10', 'Grain dryer system upgrade', 65000, 'PO-2024-052', 'Increased capacity for on-farm storage'),
  (4, '2022-06-15', 'Combine guidance and automation package', 42000, 'PO-2022-034', 'Advanced automation features'),
  (4, '2020-03-20', 'Case IH Magnum tractor', 168000, 'PO-2020-015', 'New tractor purchase');

-- Warranties for Meadowbrook Grain
INSERT INTO warranty (farm_customer_id, equipment_item_id, warranty_type, provider, start_date, end_date, coverage) 
SELECT 4, id, 'Extended', 'GSI', '2024-08-10', '2029-08-10', 'Full parts and labor coverage'
FROM equipment_item WHERE farm_customer_id = 4 AND serial_number = 'GSI2024001';

INSERT INTO warranty (farm_customer_id, equipment_item_id, warranty_type, provider, start_date, end_date, coverage) 
SELECT 4, id, 'Extended', 'John Deere', '2022-06-15', '2027-06-15', 'Powertrain and electronics'
FROM equipment_item WHERE farm_customer_id = 4 AND serial_number = 'JDS7702022001';

-- Replacement Cycles for Meadowbrook Grain
INSERT INTO replacement_cycle (farm_customer_id, equipment_type, estimated_year, estimated_value, notes) VALUES
  (4, 'Combine', 2027, 450000, 'Considering second combine for efficiency');

-- Trade-ins for Meadowbrook Grain
INSERT INTO trade_in (farm_customer_id, equipment, year, condition, estimated_value) VALUES
  (4, '2014 John Deere 8310R tractor', 2014, 'Good', 110000);

-- Insurance for Meadowbrook Grain
INSERT INTO insurance_policy (farm_customer_id, insurance_type, provider, policy_number, expiration_date, coverage_amount) VALUES
  (4, 'Commercial Farm Liability', 'Illinois Farm Bureau','IFB-2024-5182', '2025-09-30', 3000000),
(4, 'Grain Storage Insurance', 'Illinois Farm Bureau', 'IFB-2024-5183', '2025-09-30', 1500000);
-- Contracts for Meadowbrook Grain
INSERT INTO contract (farm_customer_id, contract_type, contract_number, start_date, end_date, description) VALUES
(4, 'Master Purchase Agreement', 'MPA-2024-003', '2024-01-01', '2025-12-31', 'Volume pricing and seasonal payment options'),
(4, 'Seasonal Payment Contract', 'SPC-2024-015', '2024-01-01', '2024-12-31', 'Deferred payment until post-harvest');
-- Leases for Meadowbrook Grain
INSERT INTO lease (farm_customer_id, equipment_type, lease_number, monthly_payment, start_date, end_date, terms) VALUES
(4, 'Parts Inventory', 'CONSIGN-2024-001', 0, '2024-01-01', '2024-12-31', 'Consignment inventory agreement');
-- ========================================
-- CUSTOMER 5: Triple R Ranch
-- ========================================
INSERT INTO farm_customer (
legal_name, dba, tax_number, years_in_operation, established_year, ownership_structure,
primary_contact_name, primary_contact_role, primary_contact_phone, primary_contact_mobile, primary_contact_email,
secondary_contact_name, secondary_contact_role, secondary_contact_phone, secondary_contact_mobile, secondary_contact_email,
physical_street, physical_city, physical_state, physical_zip_code, physical_county,
mailing_street, mailing_city, mailing_state, mailing_zip_code,
office_phone, mobile_phone, email, preferred_contact_method, preferred_contact_times,
farm_category, total_acreage, owned_acreage, leased_acreage, secondary_operations, seasonal_schedule,
full_time_employees, seasonal_employees,
credit_rating, payment_terms, credit_limit, payment_history, annual_revenue_estimate,
bank_name, bank_branch, bank_account_type,
annual_maintenance_schedule, average_service_calls_per_year, last_service_date, upcoming_service, equipment_notes,
account_manager, customer_tier, annual_purchase_volume_min, annual_purchase_volume_max,
last_contact_date, last_contact_method, last_contact_notes, buying_patterns,
growth_plans, technology_adoption, certifications, special_requirements, competitor_relationships, referral_potential, referral_notes,
delivery_street, delivery_city, delivery_state, delivery_zip_code, site_access, preferred_delivery_windows, storage_capacity, special_handling,
newsletter_subscribed, material_preferences, event_attendance_history, social_media_connections, product_interests, referral_source,
safety_training_status, environmental_compliance_notes
) VALUES (
'Triple R Ranch Limited Partnership', 'Triple R Ranch', '81-5847291', 54, 1971, 'LIMITED_PARTNERSHIP',
'Russell Roberts III', 'General Partner', '(406) 232-8891', '(406) 555-0334', 'rusty@triplerranchmontana.com',
'Rebecca Roberts', 'Ranch Manager', '(406) 232-8891', '(406) 555-0335', 'rebecca@triplerranchmontana.com',
'28450 Lazy River Road', 'Miles City', 'MT', '59301', 'Custer',
'PO Box 1847', 'Miles City', 'MT', '59301',
'(406) 232-8891', '(406) 555-0334', 'rusty@triplerranchmontana.com', 'MOBILE', 'Available most times',
'LIVESTOCK', 2400, 2400, 0, 'Hay production (alfalfa and grass hay), some contract grazing', 'Calving February-April, hay harvest June-August, cattle sales October-November',
5, 3,
'A', 'NET_45', 350000, 'Excellent - pays consistently after cattle sales', 1200000,
'Stockman Bank of Montana', 'Miles City Branch', 'Ranch Operating Account',
true, 9, '2024-11-13', 'Winter equipment preparation', 'Hard use conditions, regular wear items needed',
'David Chen', 'GOLD', 85000, 125000,
'2024-11-13', 'MOBILE', 'Parts order for baler repair', 'Major purchases November-December, parts/repairs throughout year',
'Expanding herd to 600 head, adding rotational grazing infrastructure', 'MEDIUM', 'Beef Quality Assurance (BQA)', 'Equipment must handle rough terrain, reliable in remote conditions', 'Uses multiple dealers for parts availability', 'HIGH', 'Well-known in regional ranching community',
'28450 Lazy River Road', 'Miles City', 'MT', '59301', 'Challenging - gravel roads, can be impassable in spring', 'Dry weather preferred, coordinate delivery windows', '4,500 sq ft equipment barn, open implement storage', 'Customer can provide tractor for unloading large items',
true, 'PHONE, TEXT', 'Attends ranch equipment demos, cattlemen''s association meetings', 'Facebook', 'Livestock equipment, Hay machinery, Durable utility tractors', 'Long-term relationship since 1990s',
'Ranch hands trained in equipment operation', 'Grazing permits and water rights documentation current'
);
-- Crops for Triple R Ranch
INSERT INTO crop (farm_customer_id, crop_type, acreage, notes) VALUES
(5, 'Alfalfa Hay', 400, 'For livestock feed'),
(5, 'Grass Hay', 200, 'For livestock feed');
-- Livestock for Triple R Ranch
INSERT INTO livestock (farm_customer_id, livestock_type, head_count, notes) VALUES
(5, 'Beef Cattle (Cow-Calf)', 500, 'Primary operation');
-- Production Metrics for Triple R Ranch
INSERT INTO production_metric (farm_customer_id, product, quantity, unit) VALUES
(5, 'Calves', 450, 'head'),
(5, 'Hay', 1800, 'tons');
-- Equipment for Triple R Ranch
INSERT INTO equipment_item (farm_customer_id, equipment_type, brand, model, year, condition, serial_number) VALUES
(5, 'Tractor', 'New Holland', 'T6', 2023, 'Excellent', 'NH2023001'),
(5, 'Tractor', 'Kubota', 'M135GX', 2021, 'Good', 'KUB2021001'),
(5, 'Tractor', 'Ford', '7710', 1988, 'Fair', 'FORD1988001'),
(5, 'Baler', 'New Holland', 'BigBaler', 2022, 'Good', 'NHBB2022001'),
(5, 'Mower', 'Kuhn', 'FC', 2020, 'Good', 'KUHN2020001');
-- Purchases for Triple R Ranch
INSERT INTO purchase (farm_customer_id, purchase_date, item, amount, purchase_order, notes) VALUES
(5, '2023-12-05', 'New Holland T6 tractor', 92000, 'PO-2023-092', 'Replacement for aging equipment'),
(5, '2022-11-20', 'Large square baler', 78000, 'PO-2022-081', 'Upgraded baling capacity'),
(5, '2020-07-10', 'Hay mower-conditioner', 38500, 'PO-2020-056', 'New mowing equipment'),
(5, '2019-10-15', 'Cattle squeeze chute and handling system', 24000, 'PO-2019-078', 'Improved cattle handling');
-- Warranties for Triple R Ranch
INSERT INTO warranty (farm_customer_id, equipment_item_id, warranty_type, provider, start_date, end_date, coverage)
SELECT 5, id, 'Extended', 'New Holland', '2023-12-05', '2028-12-05', 'Full powertrain and hydraulics'
FROM equipment_item WHERE farm_customer_id = 5 AND serial_number = 'NH2023001';
INSERT INTO warranty (farm_customer_id, equipment_item_id, warranty_type, provider, start_date, end_date, coverage)
SELECT 5, id, 'Extended', 'New Holland', '2022-11-20', '2027-11-20', 'Full coverage'
FROM equipment_item WHERE farm_customer_id = 5 AND serial_number = 'NHBB2022001';
-- Replacement Cycles for Triple R Ranch
INSERT INTO replacement_cycle (farm_customer_id, equipment_type, estimated_year, estimated_value, notes) VALUES
(5, 'Tractor', 2026, 95000, 'Replacing older Ford tractors');
-- Trade-ins for Triple R Ranch
INSERT INTO trade_in (farm_customer_id, equipment, year, condition, estimated_value) VALUES
(5, '1985 Ford 7710 tractor', 1985, 'Fair', 12000),
(5, 'Older hay rake', 2005, 'Poor', 3000);
-- Insurance for Triple R Ranch
INSERT INTO insurance_policy (farm_customer_id, insurance_type, provider, policy_number, expiration_date, coverage_amount) VALUES
(5, 'Ranch Liability', 'Montana Farm Bureau', 'MFB-2024-3847', '2025-12-31', 2500000),
(5, 'Equipment Insurance', 'Montana Farm Bureau', 'MFB-2024-3848', '2025-12-31', 800000);
-- Contracts for Triple R Ranch
INSERT INTO contract (farm_customer_id, contract_type, contract_number, start_date, end_date, description) VALUES
(5, 'Service Agreement', 'SA-2024-008', '2024-01-01', '2024-12-31', 'Priority service for remote location');
-- ========================================
-- CUSTOMER 6: Cloverdale Dairy Farms
-- ========================================
INSERT INTO farm_customer (
legal_name, dba, tax_number, years_in_operation, established_year, ownership_structure,
primary_contact_name, primary_contact_role, primary_contact_phone, primary_contact_mobile, primary_contact_email,
secondary_contact_name, secondary_contact_role, secondary_contact_phone, secondary_contact_mobile, secondary_contact_email,
physical_street, physical_city, physical_state, physical_zip_code, physical_county,
office_phone, mobile_phone, email, preferred_contact_method, preferred_contact_times,
farm_category, total_acreage, owned_acreage, leased_acreage, secondary_operations, seasonal_schedule,
full_time_employees, seasonal_employees,
credit_rating, payment_terms, credit_limit, payment_history, annual_revenue_estimate,
bank_name, bank_branch, bank_account_type,
annual_maintenance_schedule, average_service_calls_per_year, last_service_date, upcoming_service, equipment_notes,
account_manager, customer_tier, annual_purchase_volume_min, annual_purchase_volume_max,
last_contact_date, last_contact_method, last_contact_notes, buying_patterns,
growth_plans, technology_adoption, certifications, special_requirements, competitor_relationships, referral_potential, referral_notes,
delivery_street, delivery_city, delivery_state, delivery_zip_code, site_access, preferred_delivery_windows, storage_capacity, special_handling,
newsletter_subscribed, material_preferences, event_attendance_history, social_media_connections, product_interests, referral_source,
safety_training_status, environmental_compliance_notes
) VALUES (
'Cloverdale Dairy Farms, LLC', 'Cloverdale Dairy', '39-7285614', 68, 1957, 'FAMILY_LLC',
'Daniel Krueger', 'Managing Partner', '(715) 384-6729', '(715) 555-0401', 'dan@cloverdaledairy.com',
'Emily Krueger-Williams', 'Operations Manager', '(715) 384-6729', '(715) 555-0402', 'emily@cloverdaledairy.com',
'14825 Dairy Lane', 'Marshfield', 'WI', '54449', 'Wood',
'(715) 384-6729', '(715) 555-0401', 'dan@cloverdaledairy.com', 'EMAIL', 'Email during business hours, emergency mobile',
'LIVESTOCK', 950, 950, 0, 'Feed crop production (corn silage, alfalfa, small grains)', 'Year-round milking 3x daily, crop season April-October',
8, 2,
'BBB', 'NET_60', 225000, 'Good - occasional extensions requested during low milk price periods', 1100000,
'Associated Bank', 'Marshfield Branch', 'Dairy Operating Account',
true, 14, '2024-11-06', 'TMR mixer wagon scheduled maintenance', 'High hours on equipment, daily use conditions',
'Jennifer Martinez', 'SILVER', 55000, 85000,
'2024-11-06', 'MOBILE', 'Service call for mixer wagon hydraulics', 'Purchases when necessary, price-sensitive, considers used equipment',
'Focus on efficiency over expansion, possible robotic milking system in 3-5 years', 'MEDIUM', 'FARM Certified, Wisconsin DATCP Certified', 'Equipment uptime critical for daily operations, flexible financing important', 'Shops multiple dealers for best value', 'MEDIUM', 'Active in dairy cooperative',
'14825 Dairy Lane', 'Marshfield', 'WI', '54449', 'Good - paved road, large farm complex', 'Weekdays 8 AM - 3 PM (avoid milking times: 4-7 AM, 12-2 PM, 4-7 PM)', '6,000 sq ft equipment barn, crowded', 'May need assistance unloading',
true, 'EMAIL, PHONE', 'Sporadic - attends when schedule permits', 'Facebook', 'Dairy-specific equipment, Feed handling, Manure management', 'Dairy cooperative referral in 2015',
'All employees trained in equipment and animal handling', 'Nutrient management plan on file, manure storage compliance current'
);
-- Crops for Cloverdale Dairy
INSERT INTO crop (farm_customer_id, crop_type, acreage, notes) VALUES
(6, 'Corn Silage', 400, 'Feed for dairy cattle'),
(6, 'Alfalfa', 350, 'Feed for dairy cattle'),
(6, 'Small Grains', 100, 'Feed supplement');
-- Livestock for Cloverdale Dairy
INSERT INTO livestock (farm_customer_id, livestock_type, head_count, notes) VALUES
(6, 'Dairy Cattle (Holstein/Jersey)', 200, 'Milking 3x daily');
-- Production Metrics for Cloverdale Dairy
INSERT INTO production_metric (farm_customer_id, product, quantity, unit) VALUES
(6, 'Milk', 4200000, 'pounds');
-- Equipment for Cloverdale Dairy
INSERT INTO equipment_item (farm_customer_id, equipment_type, brand, model, year, condition, serial_number) VALUES
(6, 'Tractor', 'John Deere', '6M', 2019, 'Good', 'JD6M2019001'),
(6, 'Tractor', 'Case IH', 'Farmall', 2017, 'Good', 'CIHFARM2017'),
(6, 'Tractor', 'Massey Ferguson', '5710', 1992, 'Fair', 'MF1992001'),
(6, 'TMR Mixer Wagon', 'Roto-Mix', '620', 2024, 'New', 'RM2024001'),
(6, 'Manure Spreader', 'Kuhn Knight', '8124', 2022, 'Good', 'KK2022001'),
(6, 'Skid Steer', 'Bobcat', 'S650', 2021, 'Good', 'BOB2021001');
-- Purchases for Cloverdale Dairy
INSERT INTO purchase (farm_customer_id, purchase_date, item, amount, purchase_order, notes) VALUES
(6, '2024-09-15', 'TMR mixer wagon upgrade', 45000, 'PO-2024-078', 'Replaced aging mixer'),
(6, '2022-05-10', 'Manure spreader with injection system', 52000, 'PO-2022-042', 'Environmental compliance upgrade'),
(6, '2021-07-20', 'Skid steer loader', 38500, 'PO-2021-058', 'For daily barn cleaning'),
(6, '2019-03-15', 'Forage harvester head', 28000, 'PO-2019-021', 'Silage equipment upgrade');
-- Warranties for Cloverdale Dairy
INSERT INTO warranty (farm_customer_id, equipment_item_id, warranty_type, provider, start_date, end_date, coverage)
SELECT 6, id, 'Standard', 'Roto-Mix', '2024-09-15', '2026-09-15', 'Parts and labor'
FROM equipment_item WHERE farm_customer_id = 6 AND serial_number = 'RM2024001';
-- Replacement Cycles for Cloverdale Dairy
INSERT INTO replacement_cycle (farm_customer_id, equipment_type, estimated_year, estimated_value, notes) VALUES
(6, 'Tractor', 2026, 85000, 'Needs tractor replacement, timing depends on milk prices');
-- Trade-ins for Cloverdale Dairy
INSERT INTO trade_in (farm_customer_id, equipment, year, condition, estimated_value) VALUES
(6, '1990s Massey Ferguson tractor', 1992, 'Fair', 15000),
(6, 'Older mixer wagon', 2010, 'Poor', 8000);
-- Insurance for Cloverdale Dairy
INSERT INTO insurance_policy (farm_customer_id, insurance_type, provider, policy_number, expiration_date, coverage_amount) VALUES
(6, 'Commercial Dairy Liability', 'Rural Mutual Insurance', 'RMI-2024-6291', '2025-11-30', 3000000);
-- Contracts for Cloverdale Dairy
INSERT INTO contract (farm_customer_id, contract_type, contract_number, start_date, end_date, description) VALUES
(6, 'Extended Warranty', 'EW-2024-045', '2024-09-15', '2027-09-15', 'TMR mixer wagon extended coverage');
-- ========================================
-- CUSTOMER 7: Sunset Hills Livestock
-- ========================================
INSERT INTO farm_customer (
legal_name, dba, tax_number, years_in_operation, established_year, ownership_structure,
primary_contact_name, primary_contact_role, primary_contact_phone, primary_contact_mobile, primary_contact_email,
secondary_contact_name, secondary_contact_role, secondary_contact_phone, secondary_contact_mobile, secondary_contact_email,
physical_street, physical_city, physical_state, physical_zip_code, physical_county,
office_phone, mobile_phone, email, preferred_contact_method, preferred_contact_times,
farm_category, total_acreage, owned_acreage, leased_acreage, secondary_operations, seasonal_schedule,
full_time_employees, seasonal_employees,
credit_rating, payment_terms, credit_limit, payment_history, annual_revenue_estimate,
bank_name, bank_branch, bank_account_type,
annual_maintenance_schedule, average_service_calls_per_year, last_service_date, upcoming_service, equipment_notes,
account_manager, customer_tier, annual_purchase_volume_min, annual_purchase_volume_max,
last_contact_date, last_contact_method, last_contact_notes, buying_patterns,
growth_plans, technology_adoption, certifications, special_requirements, competitor_relationships, referral_potential, referral_notes,
delivery_street, delivery_city, delivery_state, delivery_zip_code, site_access, preferred_delivery_windows, storage_capacity, special_handling,
newsletter_subscribed, material_preferences, event_attendance_history, social_media_connections, product_interests, referral_source,
safety_training_status, environmental_compliance_notes
) VALUES (
'Sunset Hills Livestock, Inc.', 'Sunset Hills Farm', '43-8152936', 41, 1984, 'S_CORP',
'Raymond Cooper', 'President', '(573) 796-4423', '(573) 555-0478', 'ray@sunsethillslivestock.com',
'Marcus Cooper', 'Livestock Manager', '(573) 796-4423', '(573) 555-0479', 'marcus@sunsethillslivestock.com',
'9870 State Route J', 'California', 'MO', '65018', 'Moniteau',
'(573) 796-4423', '(573) 555-0478', 'ray@sunsethillslivestock.com', 'MOBILE', 'Mobile call or text anytime',
'LIVESTOCK', 650, 500, 150, 'Feed grain production (corn and soybeans for feed)', 'Year-round livestock operations, crop season April-November',
6, 2,
'A_MINUS', 'NET_30', 280000, 'Excellent - consistent monthly livestock sale revenue', 1800000,
'Central Bank of the Midwest', 'California Branch', 'Business Operating Account',
true, 7, '2024-11-16', 'Winter preparation scheduled', 'Well-maintained, focus on livestock handling efficiency',
'David Chen', 'GOLD', 95000, 135000,
'2024-11-16', 'EMAIL', 'Quote request for replacement equipment', 'Strategic purchases in winter, immediate needs as they arise',
'Expanding hog finishing capacity by 400 head, modernizing facilities', 'MEDIUM_HIGH', 'Pork Quality Assurance Plus (PQA+)', 'Fast parts delivery during livestock emergencies', 'Primary dealer relationship with company, occasional parts from others', 'HIGH', 'Missouri Cattlemen''s Association member, well-connected',
'9870 State Route J', 'California', 'MO', '65018', 'Good - gravel road, large equipment areas', 'Weekdays preferred, flexible timing', '7,500 sq ft equipment barn and livestock facilities', 'Can assist with unloading',
true, 'TEXT, EMAIL', 'Regular - attends livestock equipment demos, cattlemen''s meetings', 'Facebook, Instagram', 'Livestock handling equipment, Feed equipment, Animal welfare technology', 'Cattlemen''s association referral in 2018',
'Comprehensive employee training program', 'CAFO permit compliance current'
);
-- Crops for Sunset Hills Livestock
INSERT INTO crop (farm_customer_id, crop_type, acreage, notes) VALUES
(7, 'Corn', 200, 'For livestock feed'),
(7, 'Soybeans', 150, 'For livestock feed supplement');
-- Livestock for Sunset Hills Livestock
INSERT INTO livestock (farm_customer_id, livestock_type, head_count, notes) VALUES
(7, 'Beef Cattle', 300, 'Finishing operation'),
(7, 'Hogs', 800, 'Finishing operation');
-- Production Metrics for Sunset Hills Livestock
INSERT INTO production_metric (farm_customer_id, product, quantity, unit) VALUES
(7, 'Finished Cattle', 250, 'head per year'),
(7, 'Market Hogs', 1600, 'head per year');
-- Equipment for Sunset Hills Livestock
INSERT INTO equipment_item (farm_customer_id, equipment_type, brand, model, year, condition, serial_number) VALUES
(7, 'Tractor', 'Case IH', 'Magnum', 2022, 'Excellent', 'CIH2022004'),
(7, 'Tractor', 'Kubota', 'M7', 2022, 'Excellent', 'KUB2022001'),
(7, 'Tractor', 'International', '986', 1982, 'Fair', 'IH1982001'),
(7, 'Feed Mixer-Grinder', 'Roto-Grind', '1090', 2024, 'New', 'RG2024001'),
(7, 'Livestock Trailer', 'EBY', 'Maverick', 2023, 'Excellent', 'EBY2023001');
-- Purchases for Sunset Hills Livestock
INSERT INTO purchase (farm_customer_id, purchase_date, item, amount, purchase_order, notes) VALUES
(7, '2024-08-20', 'Feed mixer-grinder upgrade', 58000, 'PO-2024-065', 'Increased capacity for expanded operation'),
(7, '2023-06-15', 'Livestock trailer', 32000, 'PO-2023-051', 'For improved transport efficiency'),
(7, '2022-04-10', 'Kubota M7 tractor', 105000, 'PO-2022-028', 'New tractor for feed operations'),
(7, '2020-09-25', 'Cattle chute and sorting system', 35000, 'PO-2020-072', 'Modernized handling facility');
-- Warranties for Sunset Hills Livestock
INSERT INTO warranty (farm_customer_id, equipment_item_id, warranty_type, provider, start_date, end_date, coverage)
SELECT 7, id, 'Extended', 'Roto-Grind', '2024-08-20', '2029-08-20', 'Full parts and labor'
FROM equipment_item WHERE farm_customer_id = 7 AND serial_number = 'RG2024001';
INSERT INTO warranty (farm_customer_id, equipment_item_id, warranty_type, provider, start_date, end_date, coverage)
SELECT 7, id, 'Extended', 'Case IH', '2022-04-10', '2027-04-10', 'Powertrain coverage'
FROM equipment_item WHERE farm_customer_id = 7 AND serial_number = 'CIH2022004';
-- Replacement Cycles for Sunset Hills Livestock
INSERT INTO replacement_cycle (farm_customer_id, equipment_type, estimated_year, estimated_value, notes) VALUES
(7, 'Hog Facilities Equipment', 2026, 150000, 'Expansion of hog finishing capacity');
-- Trade-ins for Sunset Hills Livestock
INSERT INTO trade_in (farm_customer_id, equipment, year, condition, estimated_value) VALUES
(7, '1980s International tractor', 1982, 'Fair', 8000),
(7, 'Older feed grinder', 2015, 'Fair', 15000);
-- Insurance for Sunset Hills Livestock
INSERT INTO insurance_policy (farm_customer_id, insurance_type, provider, policy_number, expiration_date, coverage_amount) VALUES
(7, 'Livestock Operation Liability', 'Missouri Farm Bureau', 'MOFB-2024-4729', '2025-10-31', 3500000);
-- Contracts for Sunset Hills Livestock
INSERT INTO contract (farm_customer_id, contract_type, contract_number, start_date, end_date, description) VALUES
(7, 'Service Agreement', 'SA-2024-012', '2024-01-01', '2024-12-31', 'Priority service for livestock operations');
-- ========================================
-- CUSTOMER 8: Heritage Valley Ranch
-- ========================================

INSERT INTO farm_customer (
  legal_name, dba, tax_number, years_in_operation, established_year, ownership_structure,
  primary_contact_name, primary_contact_role, primary_contact_phone, primary_contact_mobile, primary_contact_email,
  secondary_contact_name, secondary_contact_role, secondary_contact_phone, secondary_contact_mobile, secondary_contact_email,
  physical_street, physical_city, physical_state, physical_zip_code, physical_county,
  office_phone, mobile_phone, email, preferred_contact_method, preferred_contact_times,
  farm_category, total_acreage, owned_acreage, leased_acreage, secondary_operations, seasonal_schedule,
  full_time_employees, seasonal_employees,
  credit_rating, payment_terms, credit_limit, payment_history, annual_revenue_estimate,
  bank_name, bank_branch, bank_account_type,
  annual_maintenance_schedule, average_service_calls_per_year, last_service_date, upcoming_service, equipment_notes,
  account_manager, customer_tier, annual_purchase_volume_min, annual_purchase_volume_max,
  last_contact_date, last_contact_method, last_contact_notes, buying_patterns,
  growth_plans, technology_adoption, certifications, special_requirements, competitor_relationships, referral_potential, referral_notes,
  delivery_street, delivery_city, delivery_state, delivery_zip_code, site_access, preferred_delivery_windows, storage_capacity, special_handling,
  newsletter_subscribed, material_preferences, event_attendance_history, social_media_connections, product_interests, referral_source,
  safety_training_status, environmental_compliance_notes
) VALUES (
  'Heritage Valley Ranch, LP', 'Heritage Valley', '75-9263841', 33, 1992, 'LIMITED_PARTNERSHIP',
  'Victoria Hayes', 'General Partner', '(830) 868-5531', '(830) 555-0512', 'victoria@heritagevalleyranch.com',
  'James Martinez', 'Ranch Foreman', '(830) 868-5531', '(830) 555-0513', 'james@heritagevalleyranch.com',
  '16780 Ranch Road 2721', 'Johnson City', 'TX', '78636', 'Blanco',
  '(830) 868-5531', '(830) 555-0512', 'victoria@heritagevalleyranch.com', 'EMAIL', 'Email preferred, available for calls 6-8 PM',
  'LIVESTOCK', 750, 750, 0, 'Agritourism (ranch tours, farm store), small hay production', 'Year-round grazing, calving spring and fall, processing year-round',
  4, 3,
  'A', 'NET_30', 200000, 'Excellent - regular payments from diverse revenue streams', 1600000,
  'Texas Hill Country Bank', 'Johnson City Branch', 'Business Operating Account',
  1, 6, '2024-11-10', 'Scheduled winter maintenance', 'Focus on sustainable ranching equipment',
  'David Chen', 'GOLD', 65000, 90000,
  '2024-11-10', 'EMAIL', 'Agritourism discussion at customer event', 'Thoughtful purchases aligned with sustainable ranching practices',
  'Expanding direct-to-consumer sales, adding on-farm processing facility', 'MEDIUM', 'American Grassfed Association, Certified Humane', 'Interested in sustainable/regenerative agriculture equipment', 'Loyal to dealers who understand sustainable agriculture', 'VERY_HIGH', 'Visible in sustainable ag community, strong social media presence',
  '16780 Ranch Road 2721', 'Johnson City', 'TX', '78636', 'Good - ranch road maintained, accessible for deliveries', 'Weekdays 9 AM - 4 PM (farm store hours)', '5,000 sq ft equipment barn, organized and well-maintained', 'None',
  1, 'EMAIL', 'Frequent - attends sustainable ag events, field days, networking events', 'Facebook, Instagram, YouTube', 'Regenerative agriculture equipment, Pasture management tools, Sustainable technology', 'Sustainable agriculture conference 2019',
  'All employees trained in equipment and livestock handling', 'Certified sustainable ranching practices'
);

-- Crops for Heritage Valley Ranch
INSERT INTO crop (farm_customer_id, crop_type, acreage, notes) VALUES
  (8, 'Native Grass Pasture', 650, 'Rotational grazing'),
  (8, 'Hay (mixed grass)', 100, 'Supplemental feed');

-- Livestock for Heritage Valley Ranch
INSERT INTO livestock (farm_customer_id, livestock_type, head_count, notes) VALUES
  (8, 'Grass-Fed Beef Cattle', 400, 'Direct-to-consumer sales');

-- Production Metrics for Heritage Valley Ranch
INSERT INTO production_metric (farm_customer_id, product, quantity, unit) VALUES
  (8, 'Finished Beef', 250000, 'pounds'),
  (8, 'Hay', 400, 'tons');

-- Equipment for Heritage Valley Ranch
INSERT INTO equipment_item (farm_customer_id, equipment_type, brand, model, year, condition, serial_number) VALUES
  (8, 'Tractor', 'Kubota', 'M7', 2021, 'Excellent', 'KUB2021002'),
  (8, 'Tractor', 'John Deere', '5E', 2020, 'Good', 'JD5E2020001'),
  (8, 'Compact Tractor', 'Kubota', 'L3901', 2022, 'Excellent', 'KUBL2022001'),
  (8, 'UTV', 'Polaris', 'Ranger', 2024, 'New', 'POL2024001'),
  (8, 'Hay Baler', 'Vermeer', '605M', 2022, 'Good', 'VERM2022001');

-- Purchases for Heritage Valley Ranch
INSERT INTO purchase (farm_customer_id, purchase_date, item, amount, purchase_order, notes) VALUES
  (8, '2024-05-15', 'UTV with sprayer attachment', 28000, 'PO-2024-038', 'For pasture management'),
  (8, '2023-08-20', 'Rotational grazing infrastructure equipment', 18500, 'PO-2023-067', 'Fencing and water system'),
  (8, '2022-06-10', 'Hay baler', 52000, 'PO-2022-049', 'For small hay production'),
  (8, '2021-03-15', 'Water system and trough equipment', 15000, 'PO-2021-024', 'Rotational grazing water access');

-- Replacement Cycles for Heritage Valley Ranch
INSERT INTO replacement_cycle (farm_customer_id, equipment_type, estimated_year, estimated_value, notes) VALUES
  (8, 'Pasture Management Equipment', 2026, 35000, 'Planning for expanded grazing infrastructure');

-- Trade-ins for Heritage Valley Ranch
INSERT INTO trade_in (farm_customer_id, equipment, year, condition, estimated_value) VALUES
  (8, 'Older compact tractor', 2010, 'Fair', 12000);

-- Insurance for Heritage Valley Ranch
INSERT INTO insurance_policy (farm_customer_id, insurance_type, provider, policy_number, expiration_date, coverage_amount) VALUES
  (8, 'Ranch Liability', 'Texas Farm Bureau', 'TXF-2024-8193', '2025-11-30', 2500000),
  (8, 'Agritourism Liability', 'Texas Farm Bureau', 'TXF-2024-8194', '2025-11-30', 1000000);

-- Commit the transaction
COMMIT;
