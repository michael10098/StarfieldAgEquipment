import { generateClient } from "aws-amplify/api";
import { CreditRating, CustomerTier, FarmCategory, OwnershipStructure, PaymentTerms, PreferredContactMethod, ReferralPotential, TechnologyAdoption } from "./Types";
import { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();

// Helper function to handle API errors
async function handleApiCall<T>(
  promise: Promise<{ data: T | null; errors?: unknown[] }>,
  errorContext: string
): Promise<T> {
  const result = await promise;

  if (result.errors) {
    console.error(`Error in ${errorContext}:`, result.errors);
    throw new Error(`${errorContext} failed: ${JSON.stringify(result.errors)}`);
  }

  if (!result.data) {
    throw new Error(`${errorContext} returned no data`);
  }

  return result.data;
}

// Seed data based on the detailed farm customer profiles

const farmCustomersData = [
  // GRAIN & ROW CROP FARMS
  {
    // Tab 1: Company Information
    legalName: "Henderson Family Farms, LLC",
    dba: "Henderson Farms",
    taxId: "42-1847562",
    yearsInOperation: 47,
    establishedYear: 1978,
    ownershipStructure: OwnershipStructure.FAMILY_LLC,
    primaryContactName: "Michael Henderson",
    primaryContactRole: "Owner/Operator",
    primaryContactPhone: "(641) 847-3921",
    primaryContactMobile: "(641) 555-0142",
    primaryContactEmail: "mike@hendersonfarms.com",
    secondaryContactName: "Sarah Henderson",
    secondaryContactRole: "Farm Manager",
    secondaryContactPhone: "(641) 847-3921",
    secondaryContactMobile: "(641) 555-0143",
    secondaryContactEmail: "sarah@hendersonfarms.com",

    // Tab 2: Contact & Address
    physicalStreet: "18420 County Road 52",
    physicalCity: "Ackley",
    physicalState: "IA",
    physicalZipCode: "50601",
    physicalCounty: "Hardin",
    officePhone: "(641) 847-3921",
    mobilePhone: "(641) 555-0142",
    email: "mike@hendersonfarms.com",
    preferredContactMethod: PreferredContactMethod.EMAIL,
    preferredContactTimes: "Weekdays 7-9 AM or after 6 PM",

    // Tab 3: Farm Operations
    farmCategory: FarmCategory.GRAIN_ROW_CROP,
    totalAcreage: 800,
    ownedAcreage: 650,
    leasedAcreage: 150,
    secondaryOperations: "Small cattle feedlot (50 head)",
    seasonalSchedule: "Planting April-May, Harvest September-November",
    fullTimeEmployees: 2,
    seasonalEmployees: 3,

    // Tab 4: Financial Information
    creditRating: CreditRating.A_MINUS,
    paymentTerms: PaymentTerms.NET_45,
    creditLimit: 250000,
    paymentHistory: "Excellent - always pays within terms",
    annualRevenueEstimate: 850000,
    bankName: "First National Bank of Ackley",
    bankBranch: "Main Branch",
    bankAccountType: "Business Checking",

    // Tab 5: Equipment & Service
    annualMaintenanceSchedule: true,
    averageServiceCallsPerYear: 3,
    lastServiceDate: "2024-10-15",
    upcomingService: "Annual winter maintenance scheduled",
    equipmentNotes: "Well-maintained, proactive about servicing",

    // Tab 6: Sales & Relationship
    accountManager: "Jennifer Martinez",
    customerTier: CustomerTier.GOLD,
    annualPurchaseVolumeMin: 75000,
    annualPurchaseVolumeMax: 120000,
    lastContactDate: "2024-11-06",
    lastContactMethod: PreferredContactMethod.MOBILE,
    lastContactNotes: "Service follow-up, very satisfied with recent planter upgrade",
    buyingPatterns: "Major purchases February-March, parts throughout season",

    // Tab 7: Strategic Planning
    growthPlans: "Negotiating lease on additional 200 acres for 2026",
    technologyAdoption: TechnologyAdoption.HIGH,
    certifications: [],
    specialRequirements: "Prefers equipment with extended warranties",
    competitorRelationships: "Also purchases from local John Deere dealer",
    referralPotential: ReferralPotential.HIGH,
    referralNotes: "Well-respected in county farm bureau",

    // Tab 8: Logistics & Delivery
    deliveryStreet: "18420 County Road 52",
    deliveryCity: "Ackley",
    deliveryState: "IA",
    deliveryZipCode: "50601",
    siteAccess: "Good - paved county road, large equipment barn",
    preferredDeliveryWindows: "Weekdays 8 AM - 4 PM",
    storageCapacity: "5,000 sq ft equipment barn with concrete floor",
    specialHandling: "None",

    // Tab 9: Marketing & Preferences
    newsletterSubscribed: true,
    materialPreferences: ["EMAIL", "TEXT"],
    eventAttendanceHistory: "Annual customer appreciation event, 2 field days",
    socialMediaConnections: ["Facebook"],
    productInterests: ["Precision agriculture", "Fuel-efficient equipment"],
    referralSource: "Family relationship since 1978",

    // Tab 10: Compliance & Legal
    safetyTrainingStatus: "Operator training completed 2023",
    environmentalComplianceNotes: "No issues",

    // Related data
    crops: [
      { cropType: "Corn", acreage: 450, notes: "Primary crop" },
      { cropType: "Soybeans", acreage: 350, notes: "Rotation crop" }
    ],
    livestock: [
      { livestockType: "Cattle Feedlot", headCount: 50, notes: "Small operation" }
    ],
    productionMetrics: [
      { product: "Corn", quantity: 32000, unit: "bushels" },
      { product: "Soybeans", quantity: 18000, unit: "bushels" }
    ],
    equipment: [
      { equipmentType: "Tractor", brand: "John Deere", model: "8R", year: 2019, condition: "Excellent", serialNumber: "JD8R2019001" },
      { equipmentType: "Tractor", brand: "Case IH", model: "Magnum", year: 2020, condition: "Excellent", serialNumber: "CIH2020001" },
      { equipmentType: "Combine", brand: "John Deere", model: "S780", year: 2018, condition: "Good", serialNumber: "JDS7802018001" }
    ],
    purchases: [
      { purchaseDate: "2023-03-15", item: "Precision planter upgrade", amount: 45000, purchaseOrder: "PO-2023-001", notes: "GPS guidance system included" },
      { purchaseDate: "2021-08-20", item: "Grain cart", amount: 28500, purchaseOrder: "PO-2021-045", notes: "High capacity model" },
      { purchaseDate: "2019-02-10", item: "Tractor trade-in and purchase", amount: 185000, purchaseOrder: "PO-2019-012", notes: "Traded in 2015 model" }
    ],
    warranties: [
      { equipmentId: "JD8R2019001", warrantyType: "Extended", provider: "John Deere", startDate: "2019-02-10", endDate: "2025-02-10", coverage: "Full coverage including powertrain" }
    ],
    replacementCycles: [
      { equipmentType: "Combine", estimatedYear: 2026, estimatedValue: 400000, notes: "Considering upgrade to newer S-series" }
    ],
    tradeIns: [
      { equipment: "2015 John Deere 7210R tractor", year: 2015, condition: "Good", estimatedValue: 95000 }
    ],
    insurance: [
      { insuranceType: "Liability", provider: "Farm Bureau Insurance", policyNumber: "FBI-2024-8472", expirationDate: "2025-12-31", coverageAmount: 2000000 }
    ],
    contracts: [
      { contractType: "Service Agreement", contractNumber: "SA-2024-001", startDate: "2024-01-01", endDate: "2024-12-31", description: "Annual maintenance and priority service" }
    ],
    leases: []
  },

  {
    // Riverside Agricultural Holdings
    legalName: "Riverside Agricultural Holdings, Inc.",
    dba: "Riverside Farms",
    taxId: "48-2934716",
    yearsInOperation: 62,
    establishedYear: 1963,
    ownershipStructure: OwnershipStructure.S_CORP,
    primaryContactName: "Robert Jameson",
    primaryContactRole: "CEO",
    primaryContactPhone: "(785) 462-7733",
    primaryContactMobile: "(785) 555-0198",
    primaryContactEmail: "rjameson@riversideag.com",
    secondaryContactName: "David Jameson",
    secondaryContactRole: "Operations Manager",
    secondaryContactPhone: "(785) 462-7733",
    secondaryContactMobile: "(785) 555-0199",
    secondaryContactEmail: "djameson@riversideag.com",

    physicalStreet: "8845 Highway 24",
    physicalCity: "Colby",
    physicalState: "KS",
    physicalZipCode: "67701",
    physicalCounty: "Thomas",
    mailingStreet: "PO Box 892",
    mailingCity: "Colby",
    mailingState: "KS",
    mailingZipCode: "67701",
    officePhone: "(785) 462-7733",
    mobilePhone: "(785) 555-0198",
    email: "rjameson@riversideag.com",
    preferredContactMethod: PreferredContactMethod.EMAIL,
    preferredContactTimes: "Office hours 8 AM - 5 PM",

    farmCategory: FarmCategory.GRAIN_ROW_CROP,
    totalAcreage: 1200,
    ownedAcreage: 1200,
    leasedAcreage: 0,
    secondaryOperations: "Custom harvesting services",
    seasonalSchedule: "Wheat harvest June-July, barley harvest July-August",
    fullTimeEmployees: 4,
    seasonalEmployees: 6,

    creditRating: CreditRating.A_PLUS,
    paymentTerms: PaymentTerms.NET_30,
    creditLimit: 400000,
    paymentHistory: "Excellent - early pay discount user",
    annualRevenueEstimate: 1400000,
    bankName: "Commerce Bank of Kansas",
    bankBranch: "Colby Branch",
    bankAccountType: "Business Checking",

    annualMaintenanceSchedule: true,
    averageServiceCallsPerYear: 8,
    lastServiceDate: "2024-11-13",
    upcomingService: "Pre-season equipment check scheduled for spring",
    equipmentNotes: "Fleet is well-maintained, operates custom harvesting business",

    accountManager: "Marcus Thompson",
    customerTier: CustomerTier.PLATINUM,
    annualPurchaseVolumeMin: 180000,
    annualPurchaseVolumeMax: 250000,
    lastContactDate: "2024-11-13",
    lastContactMethod: PreferredContactMethod.EMAIL,
    lastContactNotes: "Parts order for combine maintenance",
    buyingPatterns: "Major purchases December-January, regular parts orders",

    growthPlans: "Expanding custom harvesting to 3-state region",
    technologyAdoption: TechnologyAdoption.VERY_HIGH,
    certifications: ["Commercial Applicator License"],
    specialRequirements: "Fast parts delivery for custom harvesting season",
    competitorRelationships: "Exclusive relationship with our dealership",
    referralPotential: ReferralPotential.VERY_HIGH,
    referralNotes: "Refers custom harvesting clients regularly",

    deliveryStreet: "8845 Highway 24",
    deliveryCity: "Colby",
    deliveryState: "KS",
    deliveryZipCode: "67701",
    siteAccess: "Excellent - highway access, large commercial-grade shop",
    preferredDeliveryWindows: "Flexible scheduling, 24-hour advance notice",
    storageCapacity: "12,000 sq ft heated shop, multiple equipment bays",
    specialHandling: "Can accept semi-truck deliveries",

    newsletterSubscribed: true,
    materialPreferences: ["EMAIL"],
    eventAttendanceHistory: "VIP customer events, trade shows, 4 field demonstrations",
    socialMediaConnections: ["Facebook", "LinkedIn"],
    productInterests: ["High-efficiency equipment", "Automation", "Fleet management"],
    referralSource: "Long-term relationship since 1963",

    safetyTrainingStatus: "All operators certified annually",
    environmentalComplianceNotes: "EPA compliance for commercial operations",

    crops: [
      { cropType: "Winter Wheat", acreage: 700, notes: "Primary crop" },
      { cropType: "Barley", acreage: 500, notes: "Secondary crop" }
    ],
    livestock: [],
    productionMetrics: [
      { product: "Wheat", quantity: 50000, unit: "bushels" },
      { product: "Barley", quantity: 35000, unit: "bushels" }
    ],
    equipment: [
      { equipmentType: "Tractor", brand: "Case IH", model: "Magnum", year: 2020, condition: "Excellent", serialNumber: "CIH2020002" },
      { equipmentType: "Tractor", brand: "Case IH", model: "Steiger", year: 2019, condition: "Excellent", serialNumber: "CIH2019001" },
      { equipmentType: "Tractor", brand: "New Holland", model: "T9", year: 2021, condition: "Excellent", serialNumber: "NH2021001" },
      { equipmentType: "Combine", brand: "Case IH", model: "Axial-Flow 9250", year: 2024, condition: "New", serialNumber: "CIH9250-2024" },
      { equipmentType: "Combine", brand: "Case IH", model: "Axial-Flow 8250", year: 2022, condition: "Excellent", serialNumber: "CIH8250-2022" }
    ],
    purchases: [
      { purchaseDate: "2024-01-20", item: "Second combine harvester", amount: 385000, purchaseOrder: "PO-2024-003", notes: "For custom harvesting expansion" },
      { purchaseDate: "2022-07-15", item: "High-capacity grain cart", amount: 42000, purchaseOrder: "PO-2022-028", notes: "Increased capacity needed" },
      { purchaseDate: "2020-03-05", item: "Tractor and air seeder package", amount: 215000, purchaseOrder: "PO-2020-008", notes: "Complete seeding system" }
    ],
    warranties: [
      { equipmentId: "CIH9250-2024", warrantyType: "Full Coverage", provider: "Case IH", startDate: "2024-01-20", endDate: "2027-01-20", coverage: "Comprehensive warranty including parts and labor" }
    ],
    replacementCycles: [
      { equipmentType: "Tractor", estimatedYear: 2025, estimatedValue: 250000, notes: "Regular 3-4 year replacement cycle" }
    ],
    tradeIns: [
      { equipment: "2016 Case IH Magnum 280", year: 2016, condition: "Good", estimatedValue: 125000 }
    ],
    insurance: [
      { insuranceType: "Commercial Liability", provider: "Kansas Farm Bureau", policyNumber: "KFB-2024-9281", expirationDate: "2025-06-30", coverageAmount: 5000000 },
      { insuranceType: "Fleet Insurance", provider: "Kansas Farm Bureau", policyNumber: "KFB-2024-9282", expirationDate: "2025-06-30", coverageAmount: 3000000 }
    ],
    contracts: [
      { contractType: "Master Service Agreement", contractNumber: "MSA-2024-002", startDate: "2024-01-01", endDate: "2026-12-31", description: "Priority service and volume purchase discounts" },
      { contractType: "Volume Purchase Agreement", contractNumber: "VPA-2024-001", startDate: "2024-01-01", endDate: "2024-12-31", description: "Tiered pricing based on annual volume" }
    ],
    leases: [
      { equipmentType: "Grain Trucks", leaseNumber: "LEASE-2023-045", monthlyPayment: 3500, startDate: "2023-06-01", endDate: "2028-05-31", terms: "60-month lease with purchase option" }
    ]
  },

  {
    // Prairie View Farms LLC
    legalName: "Prairie View Farms LLC",
    dba: "Prairie View",
    taxId: "47-3821945",
    yearsInOperation: 35,
    establishedYear: 1990,
    ownershipStructure: OwnershipStructure.FAMILY_LLC,
    primaryContactName: "James Liu",
    primaryContactRole: "Managing Partner",
    primaryContactPhone: "(402) 765-4412",
    primaryContactMobile: "(402) 555-0223",
    primaryContactEmail: "james@prairieviewne.com",
    secondaryContactName: "Thomas Liu",
    secondaryContactRole: "Field Operations",
    secondaryContactPhone: "(402) 765-4412",
    secondaryContactMobile: "(402) 555-0224",
    secondaryContactEmail: "thomas@prairieviewne.com",

    physicalStreet: "12670 Road 330",
    physicalCity: "Polk",
    physicalState: "NE",
    physicalZipCode: "68654",
    physicalCounty: "Polk",
    officePhone: "(402) 765-4412",
    mobilePhone: "(402) 555-0223",
    email: "james@prairieviewne.com",
    preferredContactMethod: PreferredContactMethod.TEXT,
    preferredContactTimes: "Calls after 7 PM",

    farmCategory: FarmCategory.GRAIN_ROW_CROP,
    totalAcreage: 650,
    ownedAcreage: 550,
    leasedAcreage: 100,
    secondaryOperations: "None",
    seasonalSchedule: "Continuous planting/harvest April-November",
    fullTimeEmployees: 3,
    seasonalEmployees: 2,

    creditRating: CreditRating.BBB_PLUS,
    paymentTerms: PaymentTerms.NET_60,
    creditLimit: 175000,
    paymentHistory: "Good - occasional delays (5-10 days) during harvest",
    annualRevenueEstimate: 625000,
    bankName: "Farmers & Merchants Bank of Polk",
    bankBranch: "Main Branch",
    bankAccountType: "Business Checking",

    annualMaintenanceSchedule: true,
    averageServiceCallsPerYear: 5,
    lastServiceDate: "2024-10-28",
    upcomingService: "Winter equipment checkup",
    equipmentNotes: "Mix of new and used equipment, cost-conscious buyers",

    accountManager: "Jennifer Martinez",
    customerTier: CustomerTier.SILVER,
    annualPurchaseVolumeMin: 35000,
    annualPurchaseVolumeMax: 65000,
    lastContactDate: "2024-10-30",
    lastContactMethod: PreferredContactMethod.TEXT,
    lastContactNotes: "Parts inquiry for grain trailer",
    buyingPatterns: "Prefers late-season purchases, open to used equipment",

    growthPlans: "Modest expansion, focusing on efficiency over size",
    technologyAdoption: TechnologyAdoption.MEDIUM,
    certifications: [],
    specialRequirements: "Flexible financing options important",
    competitorRelationships: "Shops multiple dealers for best pricing",
    referralPotential: ReferralPotential.MEDIUM,
    referralNotes: "Conservative with recommendations",

    deliveryStreet: "12670 Road 330",
    deliveryCity: "Polk",
    deliveryState: "NE",
    deliveryZipCode: "68654",
    siteAccess: "Good - gravel road, adequate equipment storage",
    preferredDeliveryWindows: "Weekends or after 6 PM weekdays",
    storageCapacity: "3,000 sq ft pole barn",
    specialHandling: "Limited unloading equipment",

    newsletterSubscribed: true,
    materialPreferences: ["MAIL", "PHONE"],
    eventAttendanceHistory: "Occasional - 1-2 events per year",
    socialMediaConnections: [],
    productInterests: ["Value-oriented equipment", "Used options"],
    referralSource: "Responded to direct mail campaign in 2018",

    safetyTrainingStatus: "Self-trained operators",
    environmentalComplianceNotes: "No issues",

    crops: [
      { cropType: "Corn", acreage: 300, notes: "Primary crop" },
      { cropType: "Soybeans", acreage: 250, notes: "Rotation crop" },
      { cropType: "Wheat", acreage: 100, notes: "Cover crop" }
    ],
    livestock: [],
    productionMetrics: [
      { product: "Corn", quantity: 24000, unit: "bushels" },
      { product: "Soybeans", quantity: 14500, unit: "bushels" },
      { product: "Wheat", quantity: 5500, unit: "bushels" }
    ],
    equipment: [
      { equipmentType: "Tractor", brand: "Kubota", model: "M7", year: 2018, condition: "Good", serialNumber: "KUB2018001" },
      { equipmentType: "Tractor", brand: "John Deere", model: "6M", year: 2015, condition: "Fair", serialNumber: "JD6M2015001" },
      { equipmentType: "Combine", brand: "John Deere", model: "9600", year: 1998, condition: "Fair", serialNumber: "JD9600-1998" }
    ],
    purchases: [
      { purchaseDate: "2023-11-10", item: "Used grain trailer", amount: 18500, purchaseOrder: "PO-2023-089", notes: "Good value on used equipment" },
      { purchaseDate: "2021-09-15", item: "Tractor attachments and precision guidance system", amount: 32000, purchaseOrder: "PO-2021-067", notes: "GPS upgrade" },
      { purchaseDate: "2018-04-20", item: "Kubota tractor", amount: 89000, purchaseOrder: "PO-2018-023", notes: "New tractor purchase" }
    ],
    warranties: [],
    replacementCycles: [
      { equipmentType: "Combine", estimatedYear: 2026, estimatedValue: 150000, notes: "Planning upgrade within 2 years, considering used options" }
    ],
    tradeIns: [
      { equipment: "1998 John Deere 9600 combine", year: 1998, condition: "Fair", estimatedValue: 25000 }
    ],
    insurance: [
      { insuranceType: "Liability", provider: "State Farm", policyNumber: "SF-2024-7293", expirationDate: "2025-08-31", coverageAmount: 1000000 }
    ],
    contracts: [],
    leases: []
  },

  {
    // Meadowbrook Grain Company
    legalName: "Meadowbrook Grain Company, Inc.",
    dba: "Meadowbrook Farms",
    taxId: "36-4729183",
    yearsInOperation: 28,
    establishedYear: 1997,
    ownershipStructure: OwnershipStructure.CORPORATION,
    primaryContactName: "Patricia Anderson",
    primaryContactRole: "President",
    primaryContactPhone: "(815) 269-5581",
    primaryContactMobile: "(815) 555-0267",
    primaryContactEmail: "patricia@meadowbrookgrain.com",
    secondaryContactName: "Kevin Anderson",
    secondaryContactRole: "VP Operations",
    secondaryContactPhone: "(815) 269-5581",
    secondaryContactMobile: "(815) 555-0268",
    secondaryContactEmail: "kevin@meadowbrookgrain.com",

    physicalStreet: "6234 East 2100 North Road",
    physicalCity: "Danforth",
    physicalState: "IL",
    physicalZipCode: "60930",
    physicalCounty: "Iroquois",
    officePhone: "(815) 269-5581",
    mobilePhone: "(815) 555-0267",
    email: "patricia@meadowbrookgrain.com",
    preferredContactMethod: PreferredContactMethod.EMAIL,
    preferredContactTimes: "Email preferred, phone for urgent matters",

    farmCategory: FarmCategory.GRAIN_ROW_CROP,
    totalAcreage: 900,
    ownedAcreage: 700,
    leasedAcreage: 200,
    secondaryOperations: "On-farm grain storage and drying",
    seasonalSchedule: "Year-round operations with peak harvest September-November",
    fullTimeEmployees: 3,
    seasonalEmployees: 4,

    creditRating: CreditRating.A,
    paymentTerms: PaymentTerms.NET_30,
    creditLimit: 300000,
    paymentHistory: "Excellent - uses seasonal payment plan effectively",
    annualRevenueEstimate: 950000,
    bankName: "First Farmers Bank & Trust",
    bankBranch: "Danforth Branch",
    bankAccountType: "Business Checking",

    annualMaintenanceSchedule: true,
    averageServiceCallsPerYear: 6,
    lastServiceDate: "2024-11-15",
    upcomingService: "Scheduled maintenance program in place",
    equipmentNotes: "Invests in technology upgrades, excellent maintenance",

    accountManager: "Marcus Thompson",
    customerTier: CustomerTier.GOLD,
    annualPurchaseVolumeMin: 95000,
    annualPurchaseVolumeMax: 140000,
    lastContactDate: "2024-11-15",
    lastContactMethod: PreferredContactMethod.EMAIL,
    lastContactNotes: "Seasonal payment setup completed",
    buyingPatterns: "Strategic purchases pre-season, technology upgrades mid-year",

    growthPlans: "Adding on-farm grain storage capacity, potential land purchase",
    technologyAdoption: TechnologyAdoption.HIGH,
    certifications: ["Certified Grain Handler"],
    specialRequirements: "Priority service during harvest season",
    competitorRelationships: "Loyal to dealership, occasional parts from other sources",
    referralPotential: ReferralPotential.HIGH,
    referralNotes: "Active in Illinois Farm Bureau, grain co-op board member",

    deliveryStreet: "6234 East 2100 North Road",
    deliveryCity: "Danforth",
    deliveryState: "IL",
    deliveryZipCode: "60930",
    siteAccess: "Excellent - paved road, commercial grain facility on-site",
    preferredDeliveryWindows: "Weekdays 7 AM - 5 PM, 48-hour notice preferred",
    storageCapacity: "8,000 sq ft climate-controlled shop, multiple grain bins",
    specialHandling: "Loading dock available",

    newsletterSubscribed: true,
    materialPreferences: ["EMAIL", "TEXT"],
    eventAttendanceHistory: "Regular attendee at field days, customer appreciation events, winter seminars",
    socialMediaConnections: ["Facebook", "Instagram"],
    productInterests: ["Precision agriculture", "Grain handling equipment", "Efficiency technology"],
    referralSource: "Trade show contact, became customer in 2016",

    safetyTrainingStatus: "Annual safety certifications for all employees",
    environmentalComplianceNotes: "EPA grain facility compliance, dust control systems",

    crops: [
      { cropType: "Corn", acreage: 400, notes: "Primary crop" },
      { cropType: "Soybeans", acreage: 350, notes: "Rotation crop" },
      { cropType: "Winter Wheat", acreage: 150, notes: "Cover crop" }
    ],
    livestock: [],
    productionMetrics: [
      { product: "Corn", quantity: 36000, unit: "bushels" },
      { product: "Soybeans", quantity: 20500, unit: "bushels" },
      { product: "Wheat", quantity: 8000, unit: "bushels" }
    ],
    equipment: [
      { equipmentType: "Tractor", brand: "John Deere", model: "8R", year: 2019, condition: "Excellent", serialNumber: "JD8R2019002" },
      { equipmentType: "Tractor", brand: "Case IH", model: "Magnum", year: 2020, condition: "Excellent", serialNumber: "CIH2020003" },
      { equipmentType: "Tractor", brand: "Versatile", model: "DeltaTrack", year: 2021, condition: "Excellent", serialNumber: "VERS2021001" },
      { equipmentType: "Combine", brand: "John Deere", model: "S770", year: 2022, condition: "Excellent", serialNumber: "JDS7702022001" },
      { equipmentType: "Grain Dryer", brand: "GSI", model: "2000", year: 2024, condition: "New", serialNumber: "GSI2024001" }
    ],
    purchases: [
      { purchaseDate: "2024-08-10", item: "Grain dryer system upgrade", amount: 65000, purchaseOrder: "PO-2024-052", notes: "Increased capacity for on-farm storage" },
      { purchaseDate: "2022-06-15", item: "Combine guidance and automation package", amount: 42000, purchaseOrder: "PO-2022-034", notes: "Advanced automation features" },
      { purchaseDate: "2020-03-20", item: "Case IH Magnum tractor", amount: 168000, purchaseOrder: "PO-2020-015", notes: "New tractor purchase" }
    ],
    warranties: [
      { equipmentId: "GSI2024001", warrantyType: "Extended", provider: "GSI", startDate: "2024-08-10", endDate: "2029-08-10", coverage: "Full parts and labor coverage" },
      { equipmentId: "JDS7702022001", warrantyType: "Extended", provider: "John Deere", startDate: "2022-06-15", endDate: "2027-06-15", coverage: "Powertrain and electronics" }
    ],
    replacementCycles: [
      { equipmentType: "Combine", estimatedYear: 2027, estimatedValue: 450000, notes: "Considering second combine for efficiency" }
    ],
    tradeIns: [
      { equipment: "2014 John Deere 8310R tractor", year: 2014, condition: "Good", estimatedValue: 110000 }
    ],
    insurance: [
      { insuranceType: "Commercial Farm Liability", provider: "Illinois Farm Bureau", policyNumber: "IFB-2024-5182", expirationDate: "2025-09-30", coverageAmount: 3000000 },
      { insuranceType: "Grain Storage Insurance", provider: "Illinois Farm Bureau", policyNumber: "IFB-2024-5183", expirationDate: "2025-09-30", coverageAmount: 1500000 }
    ],
    contracts: [
      { contractType: "Master Purchase Agreement", contractNumber: "MPA-2024-003", startDate: "2024-01-01", endDate: "2025-12-31", description: "Volume pricing and seasonal payment options" },
      { contractType: "Seasonal Payment Contract", contractNumber: "SPC-2024-015", startDate: "2024-01-01", endDate: "2024-12-31", description: "Deferred payment until post-harvest" }
    ],
    leases: [
      { equipmentType: "Parts Inventory", leaseNumber: "CONSIGN-2024-001", monthlyPayment: 0, startDate: "2024-01-01", endDate: "2024-12-31", terms: "Consignment inventory agreement" }
    ]
  },

  // LIVESTOCK OPERATIONS

  {
    // Triple R Ranch
    legalName: "Triple R Ranch Limited Partnership",
    dba: "Triple R Ranch",
    taxId: "81-5847291",
    yearsInOperation: 54,
    establishedYear: 1971,
    ownershipStructure: OwnershipStructure.LIMITED_PARTNERSHIP,
    primaryContactName: "Russell Roberts III",
    primaryContactRole: "General Partner",
    primaryContactPhone: "(406) 232-8891",
    primaryContactMobile: "(406) 555-0334",
    primaryContactEmail: "rusty@triplerranchmontana.com",
    secondaryContactName: "Rebecca Roberts",
    secondaryContactRole: "Ranch Manager",
    secondaryContactPhone: "(406) 232-8891",
    secondaryContactMobile: "(406) 555-0335",
    secondaryContactEmail: "rebecca@triplerranchmontana.com",

    physicalStreet: "28450 Lazy River Road",
    physicalCity: "Miles City",
    physicalState: "MT",
    physicalZipCode: "59301",
    physicalCounty: "Custer",
    mailingStreet: "PO Box 1847",
    mailingCity: "Miles City",
    mailingState: "MT",
    mailingZipCode: "59301",
    officePhone: "(406) 232-8891",
    mobilePhone: "(406) 555-0334",
    email: "rusty@triplerranchmontana.com",
    preferredContactMethod: PreferredContactMethod.MOBILE,
    preferredContactTimes: "Available most times",

    farmCategory: FarmCategory.LIVESTOCK,
    totalAcreage: 2400,
    ownedAcreage: 2400,
    leasedAcreage: 0,
    secondaryOperations: "Hay production (alfalfa and grass hay), some contract grazing",
    seasonalSchedule: "Calving February-April, hay harvest June-August, cattle sales October-November",
    fullTimeEmployees: 5,
    seasonalEmployees: 3,

    creditRating: CreditRating.A,
    paymentTerms: PaymentTerms.NET_45,
    creditLimit: 350000,
    paymentHistory: "Excellent - pays consistently after cattle sales",
    annualRevenueEstimate: 1200000,
    bankName: "Stockman Bank of Montana",
    bankBranch: "Miles City Branch",
    bankAccountType: "Ranch Operating Account",

    annualMaintenanceSchedule: true,
    averageServiceCallsPerYear: 9,
    lastServiceDate: "2024-11-13",
    upcomingService: "Winter equipment preparation",
    equipmentNotes: "Hard use conditions, regular wear items needed",

    accountManager: "David Chen",
    customerTier: CustomerTier.GOLD,
    annualPurchaseVolumeMin: 85000,
    annualPurchaseVolumeMax: 125000,
    lastContactDate: "2024-11-13",
    lastContactMethod: PreferredContactMethod.MOBILE,
    lastContactNotes: "Parts order for baler repair",
    buyingPatterns: "Major purchases November-December, parts/repairs throughout year",

    growthPlans: "Expanding herd to 600 head, adding rotational grazing infrastructure",
    technologyAdoption: TechnologyAdoption.MEDIUM,
    certifications: ["Beef Quality Assurance (BQA)"],
    specialRequirements: "Equipment must handle rough terrain, reliable in remote conditions",
    competitorRelationships: "Uses multiple dealers for parts availability",
    referralPotential: ReferralPotential.HIGH,
    referralNotes: "Well-known in regional ranching community",

    deliveryStreet: "28450 Lazy River Road",
    deliveryCity: "Miles City",
    deliveryState: "MT",
    deliveryZipCode: "59301",
    siteAccess: "Challenging - gravel roads, can be impassable in spring",
    preferredDeliveryWindows: "Dry weather preferred, coordinate delivery windows",
    storageCapacity: "4,500 sq ft equipment barn, open implement storage",
    specialHandling: "Customer can provide tractor for unloading large items",

    newsletterSubscribed: true,
    materialPreferences: ["PHONE", "TEXT"],
    eventAttendanceHistory: "Attends ranch equipment demos, cattlemen's association meetings",
    socialMediaConnections: ["Facebook"],
    productInterests: ["Livestock equipment", "Hay machinery", "Durable utility tractors"],
    referralSource: "Long-term relationship since 1990s",

    safetyTrainingStatus: "Ranch hands trained in equipment operation",
    environmentalComplianceNotes: "Grazing permits and water rights documentation current",

    crops: [
      { cropType: "Alfalfa Hay", acreage: 400, notes: "For livestock feed" },
      { cropType: "Grass Hay", acreage: 200, notes: "For livestock feed" }
    ],
    livestock: [
      { livestockType: "Beef Cattle (Cow-Calf)", headCount: 500, notes: "Primary operation" }
    ],
    productionMetrics: [
      { product: "Calves", quantity: 450, unit: "head" },
      { product: "Hay", quantity: 1800, unit: "tons" }
    ],
    equipment: [
      { equipmentType: "Tractor", brand: "New Holland", model: "T6", year: 2023, condition: "Excellent", serialNumber: "NH2023001" },
      { equipmentType: "Tractor", brand: "Kubota", model: "M135GX", year: 2021, condition: "Good", serialNumber: "KUB2021001" },
      { equipmentType: "Tractor", brand: "Ford", model: "7710", year: 1988, condition: "Fair", serialNumber: "FORD1988001" },
      { equipmentType: "Baler", brand: "New Holland", model: "BigBaler", year: 2022, condition: "Good", serialNumber: "NHBB2022001" },
      { equipmentType: "Mower", brand: "Kuhn", model: "FC", year: 2020, condition: "Good", serialNumber: "KUHN2020001" }
    ],
    purchases: [
      { purchaseDate: "2023-12-05", item: "New Holland T6 tractor", amount: 92000, purchaseOrder: "PO-2023-092", notes: "Replacement for aging equipment" },
      { purchaseDate: "2022-11-20", item: "Large square baler", amount: 78000, purchaseOrder: "PO-2022-081", notes: "Upgraded baling capacity" },
      { purchaseDate: "2020-07-10", item: "Hay mower-conditioner", amount: 38500, purchaseOrder: "PO-2020-056", notes: "New mowing equipment" },
      { purchaseDate: "2019-10-15", item: "Cattle squeeze chute and handling system", amount: 24000, purchaseOrder: "PO-2019-078", notes: "Improved cattle handling" }
    ],
    warranties: [
      { equipmentId: "NH2023001", warrantyType: "Extended", provider: "New Holland", startDate: "2023-12-05", endDate: "2028-12-05", coverage: "Full powertrain and hydraulics" },
      { equipmentId: "NHBB2022001", warrantyType: "Extended", provider: "New Holland", startDate: "2022-11-20", endDate: "2027-11-20", coverage: "Full coverage" }
    ],
    replacementCycles: [
      { equipmentType: "Tractor", estimatedYear: 2026, estimatedValue: 95000, notes: "Replacing older Ford tractors" }
    ],
    tradeIns: [
      { equipment: "1985 Ford 7710 tractor", year: 1985, condition: "Fair", estimatedValue: 12000 },
      { equipment: "Older hay rake", year: 2005, condition: "Poor", estimatedValue: 3000 }
    ],
    insurance: [
      { insuranceType: "Ranch Liability", provider: "Montana Farm Bureau", policyNumber: "MFB-2024-3847", expirationDate: "2025-12-31", coverageAmount: 2500000 },
      { insuranceType: "Equipment Insurance", provider: "Montana Farm Bureau", policyNumber: "MFB-2024-3848", expirationDate: "2025-12-31", coverageAmount: 800000 }
    ],
    contracts: [
      { contractType: "Service Agreement", contractNumber: "SA-2024-008", startDate: "2024-01-01", endDate: "2024-12-31", description: "Priority service for remote location" }
    ],
    leases: []
  },

  {
    // Cloverdale Dairy Farms
    legalName: "Cloverdale Dairy Farms, LLC",
    dba: "Cloverdale Dairy",
    taxId: "39-7285614",
    yearsInOperation: 68,
    establishedYear: 1957,
    ownershipStructure: OwnershipStructure.FAMILY_LLC,
    primaryContactName: "Daniel Krueger",
    primaryContactRole: "Managing Partner",
    primaryContactPhone: "(715) 384-6729",
    primaryContactMobile: "(715) 555-0401",
    primaryContactEmail: "dan@cloverdaledairy.com",
    secondaryContactName: "Emily Krueger-Williams",
    secondaryContactRole: "Operations Manager",
    secondaryContactPhone: "(715) 384-6729",
    secondaryContactMobile: "(715) 555-0402",
    secondaryContactEmail: "emily@cloverdaledairy.com",

    physicalStreet: "14825 Dairy Lane",
    physicalCity: "Marshfield",
    physicalState: "WI",
    physicalZipCode: "54449",
    physicalCounty: "Wood",
    officePhone: "(715) 384-6729",
    mobilePhone: "(715) 555-0401",
    email: "dan@cloverdaledairy.com",
    preferredContactMethod: PreferredContactMethod.EMAIL,
    preferredContactTimes: "Email during business hours, emergency mobile",

    farmCategory: FarmCategory.LIVESTOCK,
    totalAcreage: 950,
    ownedAcreage: 950,
    leasedAcreage: 0,
    secondaryOperations: "Feed crop production (corn silage, alfalfa, small grains)",
    seasonalSchedule: "Year-round milking 3x daily, crop season April-October",
    fullTimeEmployees: 8,
    seasonalEmployees: 2,

    creditRating: CreditRating.BBB,
    paymentTerms: PaymentTerms.NET_60,
    creditLimit: 225000,
    paymentHistory: "Good - occasional extensions requested during low milk price periods",
    annualRevenueEstimate: 1100000,
    bankName: "Associated Bank",
    bankBranch: "Marshfield Branch",
    bankAccountType: "Dairy Operating Account",

    annualMaintenanceSchedule: true,
    averageServiceCallsPerYear: 14,
    lastServiceDate: "2024-11-06",
    upcomingService: "TMR mixer wagon scheduled maintenance",
    equipmentNotes: "High hours on equipment, daily use conditions",

    accountManager: "Jennifer Martinez",
    customerTier: CustomerTier.SILVER,
    annualPurchaseVolumeMin: 55000,
    annualPurchaseVolumeMax: 85000,
    lastContactDate: "2024-11-06",
    lastContactMethod: PreferredContactMethod.MOBILE,
    lastContactNotes: "Service call for mixer wagon hydraulics",
    buyingPatterns: "Purchases when necessary, price-sensitive, considers used equipment",

    growthPlans: "Focus on efficiency over expansion, possible robotic milking system in 3-5 years",
    technologyAdoption: TechnologyAdoption.MEDIUM,
    certifications: ["FARM Certified", "Wisconsin DATCP Certified"],
    specialRequirements: "Equipment uptime critical for daily operations, flexible financing important",
    competitorRelationships: "Shops multiple dealers for best value",
    referralPotential: ReferralPotential.MEDIUM,
    referralNotes: "Active in dairy cooperative",

    deliveryStreet: "14825 Dairy Lane",
    deliveryCity: "Marshfield",
    deliveryState: "WI",
    deliveryZipCode: "54449",
    siteAccess: "Good - paved road, large farm complex",
    preferredDeliveryWindows: "Weekdays 8 AM - 3 PM (avoid milking times: 4-7 AM, 12-2 PM, 4-7 PM)",
    storageCapacity: "6,000 sq ft equipment barn, crowded",
    specialHandling: "May need assistance unloading",

    newsletterSubscribed: true,
    materialPreferences: ["EMAIL", "PHONE"],
    eventAttendanceHistory: "Sporadic - attends when schedule permits",
    socialMediaConnections: ["Facebook"],
    productInterests: ["Dairy-specific equipment", "Feed handling", "Manure management"],
    referralSource: "Dairy cooperative referral in 2015",

    safetyTrainingStatus: "All employees trained in equipment and animal handling",
    environmentalComplianceNotes: "Nutrient management plan on file, manure storage compliance current",

    crops: [
      { cropType: "Corn Silage", acreage: 400, notes: "Feed for dairy cattle" },
      { cropType: "Alfalfa", acreage: 350, notes: "Feed for dairy cattle" },
      { cropType: "Small Grains", acreage: 100, notes: "Feed supplement" }
    ],
    livestock: [
      { livestockType: "Dairy Cattle (Holstein/Jersey)", headCount: 200, notes: "Milking 3x daily" }
    ],
    productionMetrics: [
      { product: "Milk", quantity: 4200000, unit: "pounds" }
    ],
    equipment: [
      { equipmentType: "Tractor", brand: "John Deere", model: "6M", year: 2019, condition: "Good", serialNumber: "JD6M2019001" },
      { equipmentType: "Tractor", brand: "Case IH", model: "Farmall", year: 2017, condition: "Good", serialNumber: "CIHFARM2017" },
      { equipmentType: "Tractor", brand: "Massey Ferguson", model: "5710", year: 1992, condition: "Fair", serialNumber: "MF1992001" },
      { equipmentType: "TMR Mixer Wagon", brand: "Roto-Mix", model: "620", year: 2024, condition: "New", serialNumber: "RM2024001" },
      { equipmentType: "Manure Spreader", brand: "Kuhn Knight", model: "8124", year: 2022, condition: "Good", serialNumber: "KK2022001" },
      { equipmentType: "Skid Steer", brand: "Bobcat", model: "S650", year: 2021, condition: "Good", serialNumber: "BOB2021001" }
    ],
    purchases: [
      { purchaseDate: "2024-09-15", item: "TMR mixer wagon upgrade", amount: 45000, purchaseOrder: "PO-2024-078", notes: "Replaced aging mixer" },
      { purchaseDate: "2022-05-10", item: "Manure spreader with injection system", amount: 52000, purchaseOrder: "PO-2022-042", notes: "Environmental compliance upgrade" },
      { purchaseDate: "2021-07-20", item: "Skid steer loader", amount: 38500, purchaseOrder: "PO-2021-058", notes: "For daily barn cleaning" },
      { purchaseDate: "2019-03-15", item: "Forage harvester head", amount: 28000, purchaseOrder: "PO-2019-021", notes: "Silage equipment upgrade" }
    ],
    warranties: [
      { equipmentId: "RM2024001", warrantyType: "Standard", provider: "Roto-Mix", startDate: "2024-09-15", endDate: "2026-09-15", coverage: "Parts and labor" }
    ],
    replacementCycles: [
      { equipmentType: "Tractor", estimatedYear: 2026, estimatedValue: 85000, notes: "Needs tractor replacement, timing depends on milk prices" }
    ],
    tradeIns: [
      { equipment: "1990s Massey Ferguson tractor", year: 1992, condition: "Fair", estimatedValue: 15000 },
      { equipment: "Older mixer wagon", year: 2010, condition: "Poor", estimatedValue: 8000 }
    ],
    insurance: [
      { insuranceType: "Commercial Dairy Liability", provider: "Rural Mutual Insurance", policyNumber: "RMI-2024-6291", expirationDate: "2025-11-30", coverageAmount: 3000000 }
    ],
    contracts: [
      { contractType: "Extended Warranty", contractNumber: "EW-2024-045", startDate: "2024-09-15", endDate: "2027-09-15", description: "TMR mixer wagon extended coverage" }
    ],
    leases: []
  },

  {
    // Sunset Hills Livestock
    legalName: "Sunset Hills Livestock, Inc.",
    dba: "Sunset Hills Farm",
    taxId: "43-8152936",
    yearsInOperation: 41,
    establishedYear: 1984,
    ownershipStructure: OwnershipStructure.S_CORP,
    primaryContactName: "Raymond Cooper",
    primaryContactRole: "President",
    primaryContactPhone: "(573) 796-4423",
    primaryContactMobile: "(573) 555-0478",
    primaryContactEmail: "ray@sunsethillslivestock.com",
    secondaryContactName: "Marcus Cooper",
    secondaryContactRole: "Livestock Manager",
    secondaryContactPhone: "(573) 796-4423",
    secondaryContactMobile: "(573) 555-0479",
    secondaryContactEmail: "marcus@sunsethillslivestock.com",

    physicalStreet: "9870 State Route J",
    physicalCity: "California",
    physicalState: "MO",
    physicalZipCode: "65018",
    physicalCounty: "Moniteau",
    officePhone: "(573) 796-4423",
    mobilePhone: "(573) 555-0478",
    email: "ray@sunsethillslivestock.com",
    preferredContactMethod: PreferredContactMethod.MOBILE,
    preferredContactTimes: "Mobile call or text anytime",

    farmCategory: FarmCategory.LIVESTOCK,
    totalAcreage: 650,
    ownedAcreage: 500,
    leasedAcreage: 150,
    secondaryOperations: "Feed grain production (corn and soybeans for feed)",
    seasonalSchedule: "Year-round livestock operations, crop season April-November",
    fullTimeEmployees: 6,
    seasonalEmployees: 2,

    creditRating: CreditRating.A_MINUS,
    paymentTerms: PaymentTerms.NET_30,
    creditLimit: 280000,
    paymentHistory: "Excellent - consistent monthly livestock sale revenue",
    annualRevenueEstimate: 1800000,
    bankName: "Central Bank of the Midwest",
    bankBranch: "California Branch",
    bankAccountType: "Business Operating Account",

    annualMaintenanceSchedule: true,
    averageServiceCallsPerYear: 7,
    lastServiceDate: "2024-11-16",
    upcomingService: "Winter preparation scheduled",
    equipmentNotes: "Well-maintained, focus on livestock handling efficiency",

    accountManager: "David Chen",
    customerTier: CustomerTier.GOLD,
    annualPurchaseVolumeMin: 95000,
    annualPurchaseVolumeMax: 135000,
    lastContactDate: "2024-11-16",
    lastContactMethod: PreferredContactMethod.EMAIL,
    lastContactNotes: "Quote request for replacement equipment",
    buyingPatterns: "Strategic purchases in winter, immediate needs as they arise",

    growthPlans: "Expanding hog finishing capacity by 400 head, modernizing facilities",
    technologyAdoption: TechnologyAdoption.MEDIUM_HIGH,
    certifications: ["Pork Quality Assurance Plus (PQA+)"],
    specialRequirements: "Fast parts delivery during livestock emergencies",
    competitorRelationships: "Primary dealer relationship with company, occasional parts from others",
    referralPotential: ReferralPotential.HIGH,
    referralNotes: "Missouri Cattlemen's Association member, well-connected",

    deliveryStreet: "9870 State Route J",
    deliveryCity: "California",
    deliveryState: "MO",
    deliveryZipCode: "65018",
    siteAccess: "Good - gravel road, large equipment areas",
    preferredDeliveryWindows: "Weekdays preferred, flexible timing",
    storageCapacity: "7,500 sq ft equipment barn and livestock facilities",
    specialHandling: "Can assist with unloading",

    newsletterSubscribed: true,
    materialPreferences: ["TEXT", "EMAIL"],
    eventAttendanceHistory: "Regular - attends livestock equipment demos, cattlemen's meetings",
    socialMediaConnections: ["Facebook", "Instagram"],
    productInterests: ["Livestock handling equipment", "Feed equipment", "Animal welfare technology"],
    referralSource: "Cattlemen's association referral in 2018",

    safetyTrainingStatus: "Comprehensive employee training program",
    environmentalComplianceNotes: "CAFO permit compliance current",

    crops: [
      { cropType: "Corn", acreage: 200, notes: "For livestock feed" },
      { cropType: "Soybeans", acreage: 150, notes: "For livestock feed supplement" }
    ],
    livestock: [
      { livestockType: "Beef Cattle", headCount: 300, notes: "Finishing operation" },
      { livestockType: "Hogs", headCount: 800, notes: "Finishing operation" }
    ],
    productionMetrics: [
      { product: "Finished Cattle", quantity: 250, unit: "head per year" },
      { product: "Market Hogs", quantity: 1600, unit: "head per year" }
    ],
    equipment: [
      { equipmentType: "Tractor", brand: "Case IH", model: "Magnum", year: 2022, condition: "Excellent", serialNumber: "CIH2022004" },
      { equipmentType: "Tractor", brand: "Kubota", model: "M7", year: 2022, condition: "Excellent", serialNumber: "KUB2022001" },
      { equipmentType: "Tractor", brand: "International", model: "986", year: 1982, condition: "Fair", serialNumber: "IH1982001" },
      { equipmentType: "Feed Mixer-Grinder", brand: "Roto-Grind", model: "1090", year: 2024, condition: "New", serialNumber: "RG2024001" },
      { equipmentType: "Livestock Trailer", brand: "EBY", model: "Maverick", year: 2023, condition: "Excellent", serialNumber: "EBY2023001" }
    ],
    purchases: [
      { purchaseDate: "2024-08-20", item: "Feed mixer-grinder upgrade", amount: 58000, purchaseOrder: "PO-2024-065", notes: "Increased capacity for expanded operation" },
      { purchaseDate: "2023-06-15", item: "Livestock trailer", amount: 32000, purchaseOrder: "PO-2023-051", notes: "For improved transport efficiency" },
      { purchaseDate: "2022-04-10", item: "Kubota M7 tractor", amount: 105000, purchaseOrder: "PO-2022-028", notes: "New tractor for feed operations" },
      { purchaseDate: "2020-09-25", item: "Cattle chute and sorting system", amount: 35000, purchaseOrder: "PO-2020-072", notes: "Modernized handling facility" }
    ],
    warranties: [
      { equipmentId: "RG2024001", warrantyType: "Extended", provider: "Roto-Grind", startDate: "2024-08-20", endDate: "2029-08-20", coverage: "Full parts and labor" },
      { equipmentId: "CIH2022004", warrantyType: "Extended", provider: "Case IH", startDate: "2022-04-10", endDate: "2027-04-10", coverage: "Powertrain coverage" }
    ],
    replacementCycles: [
      { equipmentType: "Hog Facilities Equipment", estimatedYear: 2026, estimatedValue: 150000, notes: "Expansion of hog finishing capacity" }
    ],
    tradeIns: [
      { equipment: "1980s International tractor", year: 1982, condition: "Fair", estimatedValue: 8000 },
      { equipment: "Older feed grinder", year: 2015, condition: "Fair", estimatedValue: 15000 }
    ],
    insurance: [
      { insuranceType: "Livestock Operation Liability", provider: "Missouri Farm Bureau", policyNumber: "MOFB-2024-4729", expirationDate: "2025-10-31", coverageAmount: 3500000 }
    ],
    contracts: [
      { contractType: "Service Agreement", contractNumber: "SA-2024-012", startDate: "2024-01-01", endDate: "2024-12-31", description: "Priority service for livestock operations" }
    ],
    leases: []
  },

  {
    // Heritage Valley Ranch
    legalName: "Heritage Valley Ranch, LP",
    dba: "Heritage Valley",
    taxId: "75-9263841",
    yearsInOperation: 33,
    establishedYear: 1992,
    ownershipStructure: OwnershipStructure.LIMITED_PARTNERSHIP,
    primaryContactName: "Victoria Hayes",
    primaryContactRole: "General Partner",
    primaryContactPhone: "(830) 868-5531",
    primaryContactMobile: "(830) 555-0512",
    primaryContactEmail: "victoria@heritagevalleyranch.com",
    secondaryContactName: "James Martinez",
    secondaryContactRole: "Ranch Foreman",
    secondaryContactPhone: "(830) 868-5531",
    secondaryContactMobile: "(830) 555-0513",
    secondaryContactEmail: "james@heritagevalleyranch.com",

    physicalStreet: "16780 Ranch Road 2721",
    physicalCity: "Johnson City",
    physicalState: "TX",
    physicalZipCode: "78636",
    physicalCounty: "Blanco",
    officePhone: "(830) 868-5531",
    mobilePhone: "(830) 555-0512",
    email: "victoria@heritagevalleyranch.com",
    preferredContactMethod: PreferredContactMethod.EMAIL,
    preferredContactTimes: "Email preferred, available for calls 6-8 PM",

    farmCategory: FarmCategory.LIVESTOCK,
    totalAcreage: 750,
    ownedAcreage: 750,
    leasedAcreage: 0,
    secondaryOperations: "Agritourism (ranch tours, farm store), small hay production",
    seasonalSchedule: "Year-round grazing, calving spring and fall, processing year-round",
    fullTimeEmployees: 4,
    seasonalEmployees: 3,

    creditRating: CreditRating.A,
    paymentTerms: PaymentTerms.NET_30,
    creditLimit: 200000,
    paymentHistory: "Excellent - regular payments from diverse revenue streams",
    annualRevenueEstimate: 1600000,
    bankName: "Texas Hill Country Bank",
    bankBranch: "Johnson City Branch",
    bankAccountType: "Business Operating Account",

    annualMaintenanceSchedule: true,
    averageServiceCallsPerYear: 6,
    lastServiceDate: "2024-11-10",
    upcomingService: "Scheduled winter maintenance",
    equipmentNotes: "Focus on sustainable ranching equipment",

    accountManager: "David Chen",
    customerTier: CustomerTier.GOLD,
    annualPurchaseVolumeMin: 65000,
    annualPurchaseVolumeMax: 90000,
    lastContactDate: "2024-11-10",
    lastContactMethod: PreferredContactMethod.EMAIL,
    lastContactNotes: "Agritourism discussion at customer event",
    buyingPatterns: "Thoughtful purchases aligned with sustainable ranching practices",

    growthPlans: "Expanding direct-to-consumer sales, adding on-farm processing facility",
    technologyAdoption: TechnologyAdoption.MEDIUM,
    certifications: ["American Grassfed Association", "Certified Humane"],
    specialRequirements: "Interested in sustainable/regenerative agriculture equipment",
    competitorRelationships: "Loyal to dealers who understand sustainable agriculture",
    referralPotential: ReferralPotential.VERY_HIGH,
    referralNotes: "Visible in sustainable ag community, strong social media presence",

    deliveryStreet: "16780 Ranch Road 2721",
    deliveryCity: "Johnson City",
    deliveryState: "TX",
    deliveryZipCode: "78636",
    siteAccess: "Good - ranch road maintained, accessible for deliveries",
    preferredDeliveryWindows: "Weekdays 9 AM - 4 PM (farm store hours)",
    storageCapacity: "5,000 sq ft equipment barn, organized and well-maintained",
    specialHandling: "None",

    newsletterSubscribed: true,
    materialPreferences: ["EMAIL"],
    eventAttendanceHistory: "Frequent - attends sustainable ag events, field days, networking events",
    socialMediaConnections: ["Facebook", "Instagram", "YouTube"],
    productInterests: ["Regenerative agriculture equipment", "Pasture management tools", "Sustainable technology"],
    referralSource: "Sustainable agriculture conference 2019",

    safetyTrainingStatus: "All employees trained in equipment and livestock handling",
    environmentalComplianceNotes: "Certified sustainable ranching practices",

    crops: [
      { cropType: "Native Grass Pasture", acreage: 650, notes: "Rotational grazing" },
      { cropType: "Hay (mixed grass)", acreage: 100, notes: "Supplemental feed" }
    ],
    livestock: [
      { livestockType: "Grass-Fed Beef Cattle", headCount: 400, notes: "Direct-to-consumer sales" }
    ],
    productionMetrics: [
      { product: "Finished Beef", quantity: 250000, unit: "pounds" },
      { product: "Hay", quantity: 400, unit: "tons" }
    ],
    equipment: [
      { equipmentType: "Tractor", brand: "Kubota", model: "M7", year: 2021, condition: "Excellent", serialNumber: "KUB2021002" },
      { equipmentType: "Tractor", brand: "John Deere", model: "5E", year: 2020, condition: "Good", serialNumber: "JD5E2020001" },
      { equipmentType: "Compact Tractor", brand: "Kubota", model: "L3901", year: 2022, condition: "Excellent", serialNumber: "KUBL2022001" },
      { equipmentType: "UTV", brand: "Polaris", model: "Ranger", year: 2024, condition: "New", serialNumber: "POL2024001" },
      { equipmentType: "Hay Baler", brand: "Vermeer", model: "605M", year: 2022, condition: "Good", serialNumber: "VERM2022001" }
    ],
    purchases: [
      { purchaseDate: "2024-05-15", item: "UTV with sprayer attachment", amount: 28000, purchaseOrder: "PO-2024-038", notes: "For pasture management" },
      { purchaseDate: "2023-08-20", item: "Rotational grazing infrastructure equipment", amount: 18500, purchaseOrder: "PO-2023-067", notes: "Fencing and water system" },
      { purchaseDate: "2022-06-10", item: "Hay baler", amount: 52000, purchaseOrder: "PO-2022-049", notes: "For small hay production" },
      { purchaseDate: "2021-03-15", item: "Water system and trough equipment", amount: 15000, purchaseOrder: "PO-2021-024", notes: "Rotational grazing water access" }
    ],
    warranties: [],
    replacementCycles: [
      { equipmentType: "Pasture Management Equipment", estimatedYear: 2026, estimatedValue: 35000, notes: "Planning for expanded grazing infrastructure" }
    ],
    tradeIns: [
      { equipment: "Older compact tractor", year: 2010, condition: "Fair", estimatedValue: 12000 }
    ],
    insurance: [
      { insuranceType: "Ranch Liability", provider: "Texas Farm Bureau", policyNumber: "TXF-2024-8193", expirationDate: "2025-11-30", coverageAmount: 2500000 },
      { insuranceType: "Agritourism Liability", provider: "Texas Farm Bureau", policyNumber: "TXF-2024-8194", expirationDate: "2025-11-30", coverageAmount: 1000000 }
    ],
    contracts: [],
    leases: []
  }
];

// Function to seed the database
export async function seedDatabase() {
  console.log('Starting database seed for Starfield Ag Equipment...');

  for (const customerData of farmCustomersData) {
    try {
      console.log(`\n========================================`);
      console.log(`Creating customer: ${customerData.legalName}`);
      console.log(`========================================`);

      // Extract related data
      const {
        crops,
        livestock,
        productionMetrics,
        equipment,
        purchases,
        warranties,
        replacementCycles,
        tradeIns,
        insurance,
        contracts,
        leases,
        ...mainCustomerData
      } = customerData;

      // Create the main customer record
      console.log('  → Creating main customer record...');
      const customer = await handleApiCall(
        client.models.FarmCustomer.create(mainCustomerData),
        'Customer creation'
      );

      const customerId = customer.id;
      console.log(`  ✓ Created customer with ID: ${customerId}`);

      // Create related crops
      if (crops && crops.length > 0) {
        console.log(`  → Creating ${crops.length} crop records...`);
        for (const crop of crops) {
          await handleApiCall(
            client.models.Crop.create({
              farmCustomerId: customerId,
              ...crop
            }),
            'Crop creation'
          );
        }
        console.log(`  ✓ Created ${crops.length} crop records`);
      }

      // Create related livestock
      if (livestock && livestock.length > 0) {
        console.log(`  → Creating ${livestock.length} livestock records...`);
        for (const animal of livestock) {
          await handleApiCall(
            client.models.Livestock.create({
              farmCustomerId: customerId,
              ...animal
            }),
            'Livestock creation'
          );
        }
        console.log(`  ✓ Created ${livestock.length} livestock records`);
      }

      // Create production metrics
      if (productionMetrics && productionMetrics.length > 0) {
        console.log(`  → Creating ${productionMetrics.length} production metric records...`);
        for (const metric of productionMetrics) {
          await handleApiCall(
            client.models.ProductionMetric.create({
              farmCustomerId: customerId,
              ...metric
            }),
            'Production metric creation'
          );
        }
        console.log(`  ✓ Created ${productionMetrics.length} production metric records`);
      }

      // Create equipment records
      if (equipment && equipment.length > 0) {
        console.log(`  → Creating ${equipment.length} equipment records...`);
        for (const item of equipment) {
          await handleApiCall(
            client.models.Equipment.create({
              farmCustomerId: customerId,
              ...item
            }),
            'Equipment creation'
          );
        }
        console.log(`  ✓ Created ${equipment.length} equipment records`);
      }

      // Create purchase records
      if (purchases && purchases.length > 0) {
        console.log(`  → Creating ${purchases.length} purchase records...`);
        for (const purchase of purchases) {
          await handleApiCall(
            client.models.Purchase.create({
              farmCustomerId: customerId,
              ...purchase
            }),
            'Purchase creation'
          );
        }
        console.log(`  ✓ Created ${purchases.length} purchase records`);
      }

      // Create warranty records
      if (warranties && warranties.length > 0) {
        console.log(`  → Creating ${warranties.length} warranty records...`);
        for (const warranty of warranties) {
          await handleApiCall(
            client.models.Warranty.create({
              farmCustomerId: customerId,
              ...warranty
            }),
            'Warranty creation'
          );
        }
        console.log(`  ✓ Created ${warranties.length} warranty records`);
      }

      // Create replacement cycle records
      if (replacementCycles && replacementCycles.length > 0) {
        console.log(`  → Creating ${replacementCycles.length} replacement cycle records...`);
        for (const cycle of replacementCycles) {
          await handleApiCall(
            client.models.ReplacementCycle.create({
              farmCustomerId: customerId,
              ...cycle
            }),
            'Replacement cycle creation'
          );
        }
        console.log(`  ✓ Created ${replacementCycles.length} replacement cycle records`);
      }

      // Create trade-in records
      if (tradeIns && tradeIns.length > 0) {
        console.log(`  → Creating ${tradeIns.length} trade-in records...`);
        for (const tradeIn of tradeIns) {
          await handleApiCall(
            client.models.TradeIn.create({
              farmCustomerId: customerId,
              ...tradeIn
            }),
            'Trade-in creation'
          );
        }
        console.log(`  ✓ Created ${tradeIns.length} trade-in records`);
      }

      // Create insurance records
      if (insurance && insurance.length > 0) {
        console.log(`  → Creating ${insurance.length} insurance records...`);
        for (const policy of insurance) {
          await handleApiCall(
            client.models.Insurance.create({
              farmCustomerId: customerId,
              ...policy
            }),
            'Insurance creation'
          );
        }
        console.log(`  ✓ Created ${insurance.length} insurance records`);
      }

      // Create contract records
      if (contracts && contracts.length > 0) {
        console.log(`  → Creating ${contracts.length} contract records...`);
        for (const contract of contracts) {
          await handleApiCall(
            client.models.Contract.create({
              farmCustomerId: customerId,
              ...contract
            }),
            'Contract creation'
          );
        }
        console.log(`  ✓ Created ${contracts.length} contract records`);
      }

      // Create lease records
      if (leases && leases.length > 0) {
        console.log(`  → Creating ${leases.length} lease records...`);
        for (const lease of leases) {
          await handleApiCall(
            client.models.Lease.create({
              farmCustomerId: customerId,
              ...lease
            }),
            'Lease creation'
          );
        }
        console.log(`  ✓ Created ${leases.length} lease records`);
      }

      console.log(`\n✓✓✓ Successfully created all records for ${customerData.legalName} ✓✓✓\n`);

    } catch (error) {
      console.error(`\n✗✗✗ Error creating customer ${customerData.legalName}:`, error);
      console.error('Stopping seed process due to error.\n');
      throw error;
    }
  }

  console.log('\n========================================');
  console.log('Database seed completed successfully!');
  console.log(`Total customers created: ${farmCustomersData.length}`);
  console.log('========================================\n');
}

// Query function to verify data was created
export async function verifySeededData() {
  console.log('\nVerifying seeded data...\n');

  try {
    const { data: customers, errors } = await client.models.FarmCustomer.list();

    if (errors) {
      console.error('Error fetching customers:', errors);
      return;
    }

    console.log(`✓ Found ${customers?.length || 0} customers in database`);

    if (customers && customers.length > 0) {
      console.log('\nCustomers:');
      for (const customer of customers) {
        console.log(`  - ${customer.legalName} (${customer.farmCategory})`);
      }
    }

  } catch (error) {
    console.error('Error verifying data:', error);
  }
}

// Example usage script
export async function runSeedScript() {
  try {
    console.log('🌾 Starfield Ag Equipment - Database Seed Script 🌾\n');

    await seedDatabase();
    await verifySeededData();

    console.log('\n✅ Seed script completed successfully!\n');
  } catch (error) {
    console.error('\n❌ Seed script failed:', error);
    process.exit(1);
  }
}

// Export the data as well in case you need it
export { farmCustomersData };