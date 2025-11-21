export const OwnershipStructure = {
    SOLE_PROPRIETOR: "SOLE_PROPRIETOR",
    FAMILY_LLC: "FAMILY_LLC",
    PARTNERSHIP: "PARTNERSHIP",
    CORPORATION: "CORPORATION",
    S_CORP: "S_CORP",
    LIMITED_PARTNERSHIP: "LIMITED_PARTNERSHIP",
} as const;

export const PreferredContactMethod = {
    PHONE: "PHONE",
    MOBILE: "MOBILE",
    EMAIL: "EMAIL",
    TEXT: "TEXT",
    MAIL: "MAIL",
} as const;

export const FarmCategory = {
    GRAIN_ROW_CROP: "GRAIN_ROW_CROP",
    LIVESTOCK: "LIVESTOCK",
    SPECIALTY_DIVERSIFIED: "SPECIALTY_DIVERSIFIED",
    REGIONAL_MIXED: "REGIONAL_MIXED",
} as const;

export const CreditRating = {
    AAA: 'AAA',
    AA: 'AA',
    A_PLUS: 'A_PLUS',
    A: 'A',
    A_MINUS: 'A_MINUS',
    BBB_PLUS: 'BBB_PLUS',
    BBB: 'BBB',
    BBB_MINUS: 'BBB_MINUS',
    BB: 'BB',
    B: 'B',
    C: 'C'
} as const;

export const PaymentTerms = {
    NET_15: 'NET_15',
    NET_30: 'NET_30',
    NET_45: 'NET_45',
    NET_60: 'NET_60',
    NET_90: 'NET_90',
    SEASONAL_PAY: 'SEASONAL_PAY',
    CASH_ON_DELIVERY: 'CASH_ON_DELIVERY'
} as const;

export const CustomerTier = {
    BRONZE: 'BRONZE',
    SILVER: 'SILVER',
    GOLD: 'GOLD',
    PLATINUM: 'PLATINUM'
} as const;

export const TechnologyAdoption = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    MEDIUM_HIGH: 'MEDIUM_HIGH',
    HIGH: 'HIGH',
    VERY_HIGH: 'VERY_HIGH'
} as const;

export const ReferralPotential = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    VERY_HIGH: 'VERY_HIGH'
} as const;