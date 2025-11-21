// amplify/data/resource.ts
// Starfield Ag Equipment - Farm Customer Management System

import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  // Main Farm Customer Model
  FarmCustomer: a.model({
    // Tab 1: Company Information
    legalName: a.string().required(),
    dba: a.string(),
    taxId: a.string().required(),
    yearsInOperation: a.integer().required(),
    establishedYear: a.integer().required(),
    ownershipStructure: a.enum([
      'SOLE_PROPRIETOR',
      'FAMILY_LLC',
      'PARTNERSHIP',
      'CORPORATION',
      'S_CORP',
      'LIMITED_PARTNERSHIP'
    ]),
    
    primaryContactName: a.string().required(),
    primaryContactRole: a.string().required(),
    primaryContactPhone: a.string(),
    primaryContactMobile: a.string(),
    primaryContactEmail: a.email().required(),
    
    secondaryContactName: a.string(),
    secondaryContactRole: a.string(),
    secondaryContactPhone: a.string(),
    secondaryContactMobile: a.string(),
    secondaryContactEmail: a.email(),
    
    // Tab 2: Contact & Address
    physicalStreet: a.string().required(),
    physicalCity: a.string().required(),
    physicalState: a.string().required(),
    physicalZipCode: a.string().required(),
    physicalCounty: a.string(),
    
    mailingStreet: a.string(),
    mailingCity: a.string(),
    mailingState: a.string(),
    mailingZipCode: a.string(),
    
    officePhone: a.string(),
    mobilePhone: a.string(),
    email: a.email().required(),
    preferredContactMethod: a.enum(['PHONE', 'MOBILE', 'EMAIL', 'TEXT', 'MAIL']),
    preferredContactTimes: a.string(),
    
    // Tab 3: Farm Operations
    farmCategory: a.enum([
      'GRAIN_ROW_CROP',
      'LIVESTOCK',
      'SPECIALTY_DIVERSIFIED',
      'REGIONAL_MIXED'
    ]),
    totalAcreage: a.integer().required(),
    ownedAcreage: a.integer().required(),
    leasedAcreage: a.integer().required(),
    secondaryOperations: a.string(),
    seasonalSchedule: a.string().required(),
    fullTimeEmployees: a.integer().required(),
    seasonalEmployees: a.integer().required(),
    
    // Tab 4: Financial Information
    creditRating: a.enum([
      'AAA',
      'AA',
      'A_PLUS',
      'A',
      'A_MINUS',
      'BBB_PLUS',
      'BBB',
      'BBB_MINUS',
      'BB',
      'B',
      'C'
    ]),
    paymentTerms: a.enum([
      'NET_15',
      'NET_30',
      'NET_45',
      'NET_60',
      'NET_90',
      'SEASONAL_PAY',
      'CASH_ON_DELIVERY'
    ]),
    creditLimit: a.float().required(),
    paymentHistory: a.string().required(),
    annualRevenueEstimate: a.float().required(),
    bankName: a.string().required(),
    bankBranch: a.string(),
    bankAccountType: a.string(),
    
    // Tab 5: Equipment & Service
    annualMaintenanceSchedule: a.boolean().required(),
    averageServiceCallsPerYear: a.integer().required(),
    lastServiceDate: a.date(),
    upcomingService: a.string(),
    equipmentNotes: a.string(),
    
    // Tab 6: Sales & Relationship
    accountManager: a.string().required(),
    customerTier: a.enum(['BRONZE', 'SILVER', 'GOLD', 'PLATINUM']),
    annualPurchaseVolumeMin: a.float().required(),
    annualPurchaseVolumeMax: a.float().required(),
    lastContactDate: a.date(),
    lastContactMethod: a.enum(['PHONE', 'MOBILE', 'EMAIL', 'TEXT', 'MAIL']),
    lastContactNotes: a.string(),
    buyingPatterns: a.string().required(),
    
    // Tab 7: Strategic Planning
    growthPlans: a.string(),
    technologyAdoption: a.enum(['LOW', 'MEDIUM', 'MEDIUM_HIGH', 'HIGH', 'VERY_HIGH']),
    certifications: a.string().array(),
    specialRequirements: a.string(),
    competitorRelationships: a.string(),
    referralPotential: a.enum(['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']),
    referralNotes: a.string(),
    
    // Tab 8: Logistics & Delivery
    deliveryStreet: a.string(),
    deliveryCity: a.string(),
    deliveryState: a.string(),
    deliveryZipCode: a.string(),
    siteAccess: a.string().required(),
    preferredDeliveryWindows: a.string().required(),
    storageCapacity: a.string().required(),
    specialHandling: a.string(),
    
    // Tab 9: Marketing & Preferences
    newsletterSubscribed: a.boolean().required(),
    materialPreferences: a.string().array(),
    eventAttendanceHistory: a.string(),
    socialMediaConnections: a.string().array(),
    productInterests: a.string().array(),
    referralSource: a.string().required(),
    
    // Tab 10: Compliance & Legal
    safetyTrainingStatus: a.string(),
    environmentalComplianceNotes: a.string(),
    
    // Relationships
    crops: a.hasMany('Crop', 'farmCustomerId'),
    livestock: a.hasMany('Livestock', 'farmCustomerId'),
    productionMetrics: a.hasMany('ProductionMetric', 'farmCustomerId'),
    equipment: a.hasMany('Equipment', 'farmCustomerId'),
    purchases: a.hasMany('Purchase', 'farmCustomerId'),
    warranties: a.hasMany('Warranty', 'farmCustomerId'),
    replacementCycles: a.hasMany('ReplacementCycle', 'farmCustomerId'),
    tradeIns: a.hasMany('TradeIn', 'farmCustomerId'),
    insurance: a.hasMany('Insurance', 'farmCustomerId'),
    contracts: a.hasMany('Contract', 'farmCustomerId'),
    leases: a.hasMany('Lease', 'farmCustomerId'),
  })
  .authorization((allow) => [
    allow.owner(),
    allow.group('Admins'),
    allow.group('SalesTeam').to(['read', 'update'])
  ]),

  // Related Models
  
  Crop: a.model({
    farmCustomerId: a.id().required(),
    customer: a.belongsTo('FarmCustomer', 'farmCustomerId'),
    cropType: a.string().required(),
    acreage: a.integer().required(),
    notes: a.string(),
  })
  .authorization((allow) => [
    allow.owner(),
    allow.group('Admins'),
    allow.group('SalesTeam')
  ]),

  Livestock: a.model({
    farmCustomerId: a.id().required(),
    customer: a.belongsTo('FarmCustomer', 'farmCustomerId'),
    livestockType: a.string().required(),
    headCount: a.integer().required(),
    notes: a.string(),
  })
  .authorization((allow) => [allow.owner(), allow.group('Admins'), allow.group('SalesTeam')]),

  ProductionMetric: a.model({
    farmCustomerId: a.id().required(),
    customer: a.belongsTo('FarmCustomer', 'farmCustomerId'),
    product: a.string().required(),
    quantity: a.float().required(),
    unit: a.string().required(),
  })
  .authorization((allow) => [allow.owner(), allow.group('Admins'), allow.group('SalesTeam')]),

  Equipment: a.model({
    farmCustomerId: a.id().required(),
    customer: a.belongsTo('FarmCustomer', 'farmCustomerId'),
    equipmentType: a.string().required(),
    brand: a.string().required(),
    model: a.string(),
    year: a.integer(),
    condition: a.string(),
    serialNumber: a.string(),
  })
  .authorization((allow) => [allow.owner(), allow.group('Admins'), allow.group('SalesTeam')]),

  Purchase: a.model({
    farmCustomerId: a.id().required(),
    customer: a.belongsTo('FarmCustomer', 'farmCustomerId'),
    purchaseDate: a.date().required(),
    item: a.string().required(),
    amount: a.float().required(),
    purchaseOrder: a.string(),
    notes: a.string(),
  })
  .authorization((allow) => [allow.owner(), allow.group('Admins'), allow.group('SalesTeam')]),

  Warranty: a.model({
    farmCustomerId: a.id().required(),
    customer: a.belongsTo('FarmCustomer', 'farmCustomerId'),
    equipmentId: a.string().required(),
    warrantyType: a.string().required(),
    provider: a.string().required(),
    startDate: a.date().required(),
    endDate: a.date().required(),
    coverage: a.string().required(),
  })
  .authorization((allow) => [allow.owner(), allow.group('Admins'), allow.group('SalesTeam')]),

  ReplacementCycle: a.model({
    farmCustomerId: a.id().required(),
    customer: a.belongsTo('FarmCustomer', 'farmCustomerId'),
    equipmentType: a.string().required(),
    estimatedYear: a.integer().required(),
    estimatedValue: a.float(),
    notes: a.string(),
  })
  .authorization((allow) => [allow.owner(), allow.group('Admins'), allow.group('SalesTeam')]),

  TradeIn: a.model({
    farmCustomerId: a.id().required(),
    customer: a.belongsTo('FarmCustomer', 'farmCustomerId'),
    equipment: a.string().required(),
    year: a.integer(),
    condition: a.string(),
    estimatedValue: a.float(),
  })
  .authorization((allow) => [allow.owner(), allow.group('Admins'), allow.group('SalesTeam')]),

  Insurance: a.model({
    farmCustomerId: a.id().required(),
    customer: a.belongsTo('FarmCustomer', 'farmCustomerId'),
    insuranceType: a.string().required(),
    provider: a.string().required(),
    policyNumber: a.string().required(),
    expirationDate: a.date().required(),
    coverageAmount: a.float(),
  })
  .authorization((allow) => [allow.owner(), allow.group('Admins'), allow.group('SalesTeam')]),

  Contract: a.model({
    farmCustomerId: a.id().required(),
    customer: a.belongsTo('FarmCustomer', 'farmCustomerId'),
    contractType: a.string().required(),
    contractNumber: a.string(),
    startDate: a.date().required(),
    endDate: a.date(),
    description: a.string(),
  })
  .authorization((allow) => [allow.owner(), allow.group('Admins'), allow.group('SalesTeam')]),

  Lease: a.model({
    farmCustomerId: a.id().required(),
    customer: a.belongsTo('FarmCustomer', 'farmCustomerId'),
    equipmentType: a.string().required(),
    leaseNumber: a.string().required(),
    monthlyPayment: a.float().required(),
    startDate: a.date().required(),
    endDate: a.date().required(),
    terms: a.string(),
  })
  .authorization((allow) => [allow.owner(), allow.group('Admins'), allow.group('SalesTeam')]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
