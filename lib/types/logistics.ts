/**
 * Tipos e interfaces para o sistema de gestão logística multi-tenant
 */

// ==================== TENANT ====================
export interface Tenant {
  id: string
  name: string
  slug: string
  email: string
  phone?: string
  address?: Address
  settings: TenantSettings
  createdAt: Date
  updatedAt: Date
}

export interface TenantSettings {
  timezone: string
  currency: string
  language: string
  logo?: string
}

// ==================== USUÁRIO ====================
export interface User {
  id: string
  tenantId: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type UserRole = "admin" | "manager" | "operator" | "viewer"

// ==================== ENDEREÇO ====================
export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }
}

// ==================== CLIENTE ====================
export interface Customer {
  id: string
  tenantId: string
  name: string
  email: string
  phone?: string
  document?: string // CPF/CNPJ
  address?: Address
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// ==================== FORNECEDOR ====================
export interface Supplier {
  id: string
  tenantId: string
  name: string
  email: string
  phone?: string
  document?: string // CNPJ
  address?: Address
  contactPerson?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// ==================== TRANSPORTADORA ====================
export interface Carrier {
  id: string
  tenantId: string
  name: string
  document: string // CNPJ
  email: string
  phone: string
  address?: Address
  serviceTypes: CarrierServiceType[]
  rating?: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type CarrierServiceType = "standard" | "express" | "same_day" | "freight"

// ==================== PRODUTO ====================
export interface Product {
  id: string
  tenantId: string
  sku: string
  name: string
  description?: string
  category?: string
  unit: ProductUnit
  weight?: number // em kg
  dimensions?: {
    length: number // em cm
    width: number
    height: number
  }
  price: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type ProductUnit = "unit" | "kg" | "m" | "m2" | "m3" | "l"

// ==================== ESTOQUE ====================
export interface Inventory {
  id: string
  tenantId: string
  productId: string
  warehouseId: string
  quantity: number
  reservedQuantity: number
  minStock: number
  maxStock: number
  lastUpdated: Date
}

export interface Warehouse {
  id: string
  tenantId: string
  name: string
  code: string
  address: Address
  capacity?: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// ==================== PEDIDO ====================
export interface Order {
  id: string
  tenantId: string
  orderNumber: string
  customerId: string
  status: OrderStatus
  items: OrderItem[]
  shippingAddress: Address
  billingAddress?: Address
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  notes?: string
  createdAt: Date
  updatedAt: Date
  shippedAt?: Date
  deliveredAt?: Date
}

export interface OrderItem {
  id: string
  productId: string
  quantity: number
  unitPrice: number
  total: number
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "ready_to_ship"
  | "shipped"
  | "in_transit"
  | "delivered"
  | "cancelled"
  | "returned"

// ==================== ENTREGA ====================
export interface Delivery {
  id: string
  tenantId: string
  orderId: string
  carrierId: string
  trackingNumber: string
  status: DeliveryStatus
  estimatedDelivery?: Date
  actualDelivery?: Date
  origin: Address
  destination: Address
  route?: Route
  events: DeliveryEvent[]
  createdAt: Date
  updatedAt: Date
}

export type DeliveryStatus =
  | "pending"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "failed"
  | "returned"

export interface DeliveryEvent {
  id: string
  type: DeliveryEventType
  description: string
  location?: string
  timestamp: Date
  userId?: string
}

export type DeliveryEventType =
  | "created"
  | "picked_up"
  | "in_transit"
  | "arrived_at_facility"
  | "out_for_delivery"
  | "delivery_attempted"
  | "delivered"
  | "failed"
  | "returned"

// ==================== ROTA ====================
export interface Route {
  id: string
  tenantId: string
  name: string
  carrierId: string
  vehicleId?: string
  driverId?: string
  deliveries: string[] // IDs das entregas
  startLocation: Address
  endLocation: Address
  estimatedDuration?: number // em minutos
  actualDuration?: number
  distance?: number // em km
  status: RouteStatus
  startedAt?: Date
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export type RouteStatus = "planned" | "in_progress" | "completed" | "cancelled"

// ==================== RELATÓRIOS ====================
export interface LogisticsMetrics {
  tenantId: string
  period: {
    start: Date
    end: Date
  }
  orders: {
    total: number
    byStatus: Record<OrderStatus, number>
    revenue: number
  }
  deliveries: {
    total: number
    byStatus: Record<DeliveryStatus, number>
    averageDeliveryTime: number // em horas
    onTimeRate: number // porcentagem
  }
  inventory: {
    totalProducts: number
    lowStockItems: number
    totalValue: number
  }
}

// ==================== FILTROS E PAGINAÇÃO ====================
export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface FilterParams {
  search?: string
  status?: string
  dateFrom?: Date
  dateTo?: Date
  tenantId?: string
}

