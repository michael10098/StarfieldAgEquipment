// types/farmCustomer.ts
// Type definitions for Starfield Ag Equipment Farm Customer Management System
// Uses Amplify-generated types from Schema

import { Schema } from '../amplify/data/resource';

// Export Amplify-generated types
export type FarmCustomer = Schema['FarmCustomer']['type'];
export type Crop = Schema['Crop']['type'];
export type Livestock = Schema['Livestock']['type'];
export type ProductionMetric = Schema['ProductionMetric']['type'];
export type Equipment = Schema['Equipment']['type'];
export type Purchase = Schema['Purchase']['type'];
export type Warranty = Schema['Warranty']['type'];
export type ReplacementCycle = Schema['ReplacementCycle']['type'];
export type TradeIn = Schema['TradeIn']['type'];
export type Insurance = Schema['Insurance']['type'];
export type Contract = Schema['Contract']['type'];
export type Lease = Schema['Lease']['type'];

// Enums (keep these for convenience in your code, but they match schema)
export enum OwnershipStructure {
  SOLE_PROPRIETOR = 'SOLE_PROPRIETOR',
  FAMILY_LLC = 'FAMILY_LLC',
  PARTNERSHIP = 'PARTNERSHIP',
  CORPORATION = 'CORPORATION',
  S_CORP = 'S_CORP',
  LIMITED_PARTNERSHIP = 'LIMITED_PARTNERSHIP'
}

export enum ContactMethod {
  PHONE = 'PHONE',
  MOBILE = 'MOBILE',
  EMAIL = 'EMAIL',
  TEXT = 'TEXT',
  MAIL = 'MAIL'
}

export enum FarmCategory {
  GRAIN_ROW_CROP = 'GRAIN_ROW_CROP',
  LIVESTOCK = 'LIVESTOCK',
  SPECIALTY_DIVERSIFIED = 'SPECIALTY_DIVERSIFIED',
  REGIONAL_MIXED = 'REGIONAL_MIXED'
}

export enum CreditRating {
  AAA = 'AAA',
  AA = 'AA',
  A_PLUS = 'A_PLUS',
  A = 'A',
  A_MINUS = 'A_MINUS',
  BBB_PLUS = 'BBB_PLUS',
  BBB = 'BBB',
  BBB_MINUS = 'BBB_MINUS',
  BB = 'BB',
  B = 'B',
  C = 'C'
}

export enum PaymentTerms {
  NET_15 = 'NET_15',
  NET_30 = 'NET_30',
  NET_45 = 'NET_45',
  NET_60 = 'NET_60',
  NET_90 = 'NET_90',
  SEASONAL_PAY = 'SEASONAL_PAY',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY'
}

export enum CustomerTier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM'
}

export enum AdoptionLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  MEDIUM_HIGH = 'MEDIUM_HIGH',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH'
}

export enum ReferralPotential {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH'
}

// Utility types for forms and operations
export type FarmCustomerFormData = Omit<FarmCustomer, 'id' | 'createdAt' | 'updatedAt' | 'owner'>;
export type FarmCustomerUpdate = Partial<FarmCustomer> & { id: string };

// Type for listing/table views (minimal fields)
export interface FarmCustomerListItem {
  id: string;
  legalName: string;
  dba?: string | null;
  primaryContactName: string;
  email: string;
  customerTier?: string | null;
  totalAcreage: number;
  accountManager: string;
  lastContactDate?: string | null;
  createdAt?: string;
}