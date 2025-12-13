import { Tables } from './supabase.types';

// Types from your database
export type FarmCustomer = Tables<'farm_customer'>;
export type Crop = Tables<'crop'>;
export type Contract = Tables<'contract'>;
export type EquipmentItem = Tables<'equipment_item'>;
export type InsurancePolicy = Tables<'insurance_policy'>;
export type Lease = Tables<'lease'>;
export type Livestock = Tables<'livestock'>;
export type ProductionMetric = Tables<'production_metric'>;
export type Purchase = Tables<'purchase'>;
export type ReplacementCycle = Tables<'replacement_cycle'>;
export type TradeIn = Tables<'trade_in'>;
export type Warranty = Tables<'warranty'>;

// ✅ New type for farm customer with all relations
export type FarmCustomerWithRelations = FarmCustomer & {
  crop: Crop[];
  contract: Contract[];
  equipment_item: EquipmentItem[];
  insurance_policy: InsurancePolicy[];
  lease: Lease[];
  livestock: Livestock[];
  production_metric: ProductionMetric[];
  purchase: Purchase[];
  replacement_cycle: ReplacementCycle[];
  trade_in: TradeIn[];
  warranty: Warranty[];
};
