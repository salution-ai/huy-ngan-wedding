export type ServiceType = "website" | "mobile" | "consulting" | "integration" | "business"

export interface PricingFeature {
  title: string
  description?: string
  tooltip?: string
  isShowInCard?: boolean // Thêm trường này để kiểm soát việc hiển thị trong card view
}

export interface PricingPlan {
  id: string
  type: "Standard" | "Pro" | "Enterprise"
  name: string
  description: string
  price: number | string
  billingPeriod?: string
  persona: string
  features: PricingFeature[]
}

export interface PricingData {
  website: PricingPlan[]
  mobile: PricingPlan[]
  consulting: PricingPlan[]
  integration: PricingPlan[]
  business: PricingPlan[]
}
