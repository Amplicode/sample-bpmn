// Potentially useful TypeScript interfaces

interface Policyholder {
    id: number
    name: string
}

interface PolicyType {
    id: number
    name: string
}

export interface Policy {
    id: number
    caseDescription?: string
    insurancePremium: number
    insuranceSum: number
    policyType: PolicyType
    policyholder: Policyholder
}

export interface Claim {
    id: number
    timestamp: string
    description?: string
    policy: Policy
}