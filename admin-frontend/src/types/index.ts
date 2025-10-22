export interface Category {
  id?: number;
  name: string;
  description?: string;
  slug?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductSize {
  size: string;
  stock: number;
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  category?: Category;
  images?: ProductImage[];
  stock?: number; // Estoque total (calculado)
  sku?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  sizes?: ProductSize[]; // Array com tamanho e quantidade
  colors?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductImage {
  id?: number;
  productId?: number;
  url: string;
  alt?: string;
  isPrimary?: boolean;
  order?: number;
}

export interface Address {
  id?: number;
  customerId?: number;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface Customer {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  birthDate?: string;
  isActive?: boolean;
  addresses?: Address[];
  totalOrders?: number;
  totalSpent?: number;
  lastOrderDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum OrderStatus {
  Pending = 'pending',
  Paid = 'paid',
  Processing = 'processing',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
}

export interface OrderItem {
  id?: number;
  orderId?: number;
  productId: number;
  product?: Product;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export interface Order {
  id?: number;
  customerId: number;
  customer?: Customer;
  items: OrderItem[];
  subtotal: number;
  discount?: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentMethod?: string;
  shippingAddress?: Address;
  trackingCode?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum CouponType {
  Percentage = 'percentage',
  Fixed = 'fixed',
}

export interface Coupon {
  id?: number;
  code: string;
  description?: string;
  type: CouponType;
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usageCount?: number;
  validFrom?: string;
  validUntil?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Banner {
  id?: number;
  title: string;
  imageUrl: string;
  link?: string;
  description?: string;
  order: number;
  isActive?: boolean;
  validFrom?: string;
  validUntil?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SalesReport {
  date: string;
  orders: number;
  revenue: number;
  customers: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface StoreSettings {
  id?: number;
  storeName: string;
  storeDescription?: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  pixKey?: string;
  currency: string;
  language: string;
  timezone: string;
  maintenanceMode: boolean;
  allowGuestCheckout: boolean;
  termsOfServiceUrl?: string;
  privacyPolicyUrl?: string;
  shippingMessage?: string;
  headerMessage?: string;
  footerMessage?: string;
  updatedAt?: string;
}
