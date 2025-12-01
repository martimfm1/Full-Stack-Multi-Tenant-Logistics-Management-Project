import { z } from "zod"

// Schemas de validação usando Zod

export const addressSchema = z.object({
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  zipCode: z.string().min(8, "CEP inválido"),
  country: z.string().default("Brasil"),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
})

export const orderItemSchema = z.object({
  productId: z.string().min(1, "ID do produto é obrigatório"),
  quantity: z.number().positive("Quantidade deve ser positiva"),
  unitPrice: z.number().nonnegative("Preço unitário deve ser positivo"),
})

export const createOrderSchema = z.object({
  customerId: z.string().min(1, "ID do cliente é obrigatório"),
  items: z.array(orderItemSchema).min(1, "Pelo menos um item é obrigatório"),
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional(),
  notes: z.string().optional(),
})

export const updateOrderSchema = z.object({
  status: z
    .enum([
      "pending",
      "confirmed",
      "processing",
      "ready_to_ship",
      "shipped",
      "in_transit",
      "delivered",
      "cancelled",
      "returned",
    ])
    .optional(),
  notes: z.string().optional(),
})

export const createDeliverySchema = z.object({
  orderId: z.string().min(1, "ID do pedido é obrigatório"),
  carrierId: z.string().min(1, "ID da transportadora é obrigatório"),
  trackingNumber: z.string().min(1, "Número de rastreamento é obrigatório"),
  origin: addressSchema,
  destination: addressSchema,
  estimatedDelivery: z.string().datetime().optional(),
})

export const createCustomerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  document: z.string().optional(),
  address: addressSchema.optional(),
})

export const createProductSchema = z.object({
  sku: z.string().min(1, "SKU é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  category: z.string().optional(),
  unit: z.enum(["unit", "kg", "m", "m2", "m3", "l"]),
  weight: z.number().positive().optional(),
  dimensions: z
    .object({
      length: z.number().positive(),
      width: z.number().positive(),
      height: z.number().positive(),
    })
    .optional(),
  price: z.number().nonnegative("Preço deve ser positivo"),
})

export const createWarehouseSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  code: z.string().min(1, "Código é obrigatório"),
  address: addressSchema,
  capacity: z.number().positive().optional(),
})

export const createCarrierSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  document: z.string().min(1, "CNPJ é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  address: addressSchema.optional(),
  serviceTypes: z.array(
    z.enum(["standard", "express", "same_day", "freight"])
  ),
})

export const createRouteSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  carrierId: z.string().min(1, "ID da transportadora é obrigatório"),
  vehicleId: z.string().optional(),
  driverId: z.string().optional(),
  deliveries: z.array(z.string()).min(1, "Pelo menos uma entrega é obrigatória"),
  startLocation: addressSchema,
  endLocation: addressSchema,
})

export const updateInventorySchema = z.object({
  productId: z.string().min(1, "ID do produto é obrigatório"),
  warehouseId: z.string().min(1, "ID do armazém é obrigatório"),
  quantity: z.number().int("Quantidade deve ser um número inteiro"),
  minStock: z.number().int().optional(),
  maxStock: z.number().int().optional(),
})

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
})

export const filterSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
})

