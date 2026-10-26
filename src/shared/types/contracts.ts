export type BagCategory = "all" | "tote" | "crossbody" | "wallet";

export interface ColorVariant {
  id: string;
  name: string;
  hex: string;
  image: string;
}

export interface HardwareOption {
  id: string;
  name: string;
  finish: "brass" | "palladium" | "black-pvd";
}

export interface BagDimensions {
  widthMm: number;
  heightMm: number;
  depthMm: number;
}

export interface Bag {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: BagCategory;
  priceEur: number;
  capacityLiters: number;
  weightGrams: number;
  dimensions: BagDimensions;
  leatherType: string;
  liningMaterial: string;
  hardwareOptions: HardwareOption[];
  colors: ColorVariant[];
  description: string;
  craftsmanshipNotes: string[];
  features: string[];
  inStock: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  images: string[];
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  id: string; // unique item id = `${bagId}-${colorId}-${hardwareId}-${monogram}`
  bagId: string;
  bagName: string;
  slug: string;
  color: ColorVariant;
  hardware: HardwareOption;
  monogram?: string;
  unitPriceEur: number;
  quantity: number;
  image: string;
}

export interface CartState {
  items: CartItem[];
  couponCode: string | null;
  discountPercent: number;
}

export interface CustomerCheckoutInput {
  email: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  shippingMethod: "standard" | "express" | "courier";
  paymentMethod: "card" | "apple_pay" | "stripe_bank" | "wire";
  stripeBankIban?: string;
  stripeBankHolder?: string;
  stripeBankBic?: string;
  monogramNotes?: string;
}

export interface ActionState<T = unknown> {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: T;
}

export interface FilterState {
  category: BagCategory;
  search: string;
  sortBy: "curated" | "price-asc" | "price-desc" | "capacity";
  maxPrice: number;
}

export interface OrderConfirmation {
  orderId: string;
  dateIso: string;
  customer: CustomerCheckoutInput;
  items: CartItem[];
  subtotalEur: number;
  discountEur: number;
  shippingEur: number;
  totalEur: number;
  estimatedDeliveryDate: string;
  stripePaymentDetails?: {
    stripePaymentIntentId: string;
    mandateReference: string;
    maskedIban: string;
    bankName: string;
    status: "processing" | "succeeded" | "authorized";
  };
}
