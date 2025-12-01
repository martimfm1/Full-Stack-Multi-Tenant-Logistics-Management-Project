/**
 * Database em Memória - Compartilhada entre todas as requisições
 * Em produção, substituir por banco de dados real (PostgreSQL, MongoDB, etc.)
 */

import {
  Order,
  Delivery,
  Customer,
  Supplier,
  Carrier,
  Product,
  Inventory,
  Warehouse,
  Route,
  Tenant,
  User,
} from "@/lib/types/logistics"

// Database global em memória
// Esta instância é compartilhada entre todas as requisições
const database: {
  users: User[]
  tenants: Tenant[]
  orders: Order[]
  deliveries: Delivery[]
  customers: Customer[]
  suppliers: Supplier[]
  carriers: Carrier[]
  products: Product[]
  inventory: Inventory[]
  warehouses: Warehouse[]
  routes: Route[]
} = {
  users: [],
  tenants: [],
  orders: [],
  deliveries: [],
  customers: [],
  suppliers: [],
  carriers: [],
  products: [],
  inventory: [],
  warehouses: [],
  routes: [],
}

// Inicializar dados de exemplo
function initializeDatabase() {
  // Verificar se já foi inicializado
  if (database.tenants.length > 0) {
    return
  }

  // Tenants
  const tenant1: Tenant = {
    id: "tenant-1",
    name: "Empresa Logística ABC",
    slug: "empresa-abc",
    email: "contato@empresaabc.com",
    phone: "+55 11 99999-9999",
    settings: {
      timezone: "America/Sao_Paulo",
      currency: "BRL",
      language: "pt-BR",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const tenant2: Tenant = {
    id: "tenant-2",
    name: "Transportes XYZ",
    slug: "transportes-xyz",
    email: "contato@transportesxyz.com",
    phone: "+55 11 88888-8888",
    settings: {
      timezone: "America/Sao_Paulo",
      currency: "BRL",
      language: "pt-BR",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  database.tenants = [tenant1, tenant2]

  // Users
  const user1: User = {
    id: "user-1",
    tenantId: "tenant-1",
    email: "admin@empresa1.com",
    name: "Admin Empresa 1",
    role: "admin",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const user2: User = {
    id: "user-2",
    tenantId: "tenant-2",
    email: "admin@empresa2.com",
    name: "Admin Empresa 2",
    role: "admin",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  database.users = [user1, user2]

  // Clientes de exemplo
  const customer1: Customer = {
    id: "customer-1",
    tenantId: "tenant-1",
    name: "João Silva",
    email: "joao@example.com",
    phone: "+55 11 98765-4321",
    document: "123.456.789-00",
    address: {
      street: "Rua das Flores",
      number: "123",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234567",
      country: "Brasil",
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  database.customers = [customer1]

  // Produtos de exemplo
  const product1: Product = {
    id: "product-1",
    tenantId: "tenant-1",
    sku: "PROD-001",
    name: "Notebook Dell Inspiron",
    description: "Notebook Dell Inspiron 15 3000",
    category: "Eletrônicos",
    unit: "unit",
    weight: 2.5,
    dimensions: {
      length: 35,
      width: 25,
      height: 2,
    },
    price: 3500.0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const product2: Product = {
    id: "product-2",
    tenantId: "tenant-1",
    sku: "PROD-002",
    name: "Mouse Logitech",
    description: "Mouse sem fio Logitech MX Master",
    category: "Periféricos",
    unit: "unit",
    weight: 0.15,
    price: 450.0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  database.products = [product1, product2]

  // Armazéns de exemplo
  const warehouse1: Warehouse = {
    id: "warehouse-1",
    tenantId: "tenant-1",
    name: "Armazém Central SP",
    code: "WH-SP-001",
    address: {
      street: "Av. Paulista",
      number: "1000",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310100",
      country: "Brasil",
    },
    capacity: 10000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  database.warehouses = [warehouse1]

  // Transportadoras de exemplo
  const carrier1: Carrier = {
    id: "carrier-1",
    tenantId: "tenant-1",
    name: "Transportadora Express",
    document: "12.345.678/0001-90",
    email: "contato@express.com",
    phone: "+55 11 3333-4444",
    address: {
      street: "Rua dos Transportes",
      number: "500",
      neighborhood: "Industrial",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234567",
      country: "Brasil",
    },
    serviceTypes: ["standard", "express"],
    rating: 4.5,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  database.carriers = [carrier1]

  // Estoque inicial
  const inventory1: Inventory = {
    id: "inventory-1",
    tenantId: "tenant-1",
    productId: "product-1",
    warehouseId: "warehouse-1",
    quantity: 50,
    reservedQuantity: 0,
    minStock: 10,
    maxStock: 100,
    lastUpdated: new Date(),
  }

  const inventory2: Inventory = {
    id: "inventory-2",
    tenantId: "tenant-1",
    productId: "product-2",
    warehouseId: "warehouse-1",
    quantity: 200,
    reservedQuantity: 0,
    minStock: 50,
    maxStock: 500,
    lastUpdated: new Date(),
  }

  database.inventory = [inventory1, inventory2]
}

// Inicializar database na primeira importação
initializeDatabase()

// ==================== USERS ====================
export const usersDb = {
  findAll: () => database.users,
  findById: (id: string) => database.users.find((u) => u.id === id),
  findByEmail: (email: string) => database.users.find((u) => u.email === email),
  findByTenant: (tenantId: string) => database.users.filter((u) => u.tenantId === tenantId),
  create: (user: User) => {
    database.users.push(user)
    return user
  },
  update: (id: string, updates: Partial<User>) => {
    const index = database.users.findIndex((u) => u.id === id)
    if (index === -1) return null
    database.users[index] = {
      ...database.users[index],
      ...updates,
      updatedAt: new Date(),
    }
    return database.users[index]
  },
  delete: (id: string) => {
    const index = database.users.findIndex((u) => u.id === id)
    if (index === -1) return false
    database.users.splice(index, 1)
    return true
  },
}

// ==================== TENANTS ====================
export const tenantsDb = {
  findAll: () => database.tenants,
  findById: (id: string) => database.tenants.find((t) => t.id === id),
  findBySlug: (slug: string) => database.tenants.find((t) => t.slug === slug),
  create: (tenant: Tenant) => {
    database.tenants.push(tenant)
    return tenant
  },
  update: (id: string, updates: Partial<Tenant>) => {
    const index = database.tenants.findIndex((t) => t.id === id)
    if (index === -1) return null
    database.tenants[index] = {
      ...database.tenants[index],
      ...updates,
      updatedAt: new Date(),
    }
    return database.tenants[index]
  },
  delete: (id: string) => {
    const index = database.tenants.findIndex((t) => t.id === id)
    if (index === -1) return false
    database.tenants.splice(index, 1)
    return true
  },
}

// ==================== ORDERS ====================
export const ordersDb = {
  findAll: (tenantId: string) => {
    return database.orders.filter((order) => order.tenantId === tenantId)
  },
  findById: (id: string, tenantId: string) => {
    return database.orders.find(
      (order) => order.id === id && order.tenantId === tenantId
    )
  },
  create: (order: Order) => {
    database.orders.push(order)
    return order
  },
  update: (id: string, tenantId: string, updates: Partial<Order>) => {
    const index = database.orders.findIndex(
      (order) => order.id === id && order.tenantId === tenantId
    )
    if (index === -1) return null
    database.orders[index] = {
      ...database.orders[index],
      ...updates,
      updatedAt: new Date(),
    }
    return database.orders[index]
  },
  delete: (id: string, tenantId: string) => {
    const index = database.orders.findIndex(
      (order) => order.id === id && order.tenantId === tenantId
    )
    if (index === -1) return false
    database.orders.splice(index, 1)
    return true
  },
}

// ==================== DELIVERIES ====================
export const deliveriesDb = {
  findAll: (tenantId: string) => {
    return database.deliveries.filter((delivery) => delivery.tenantId === tenantId)
  },
  findById: (id: string, tenantId: string) => {
    return database.deliveries.find(
      (delivery) => delivery.id === id && delivery.tenantId === tenantId
    )
  },
  create: (delivery: Delivery) => {
    database.deliveries.push(delivery)
    return delivery
  },
  update: (id: string, tenantId: string, updates: Partial<Delivery>) => {
    const index = database.deliveries.findIndex(
      (delivery) => delivery.id === id && delivery.tenantId === tenantId
    )
    if (index === -1) return null
    database.deliveries[index] = {
      ...database.deliveries[index],
      ...updates,
      updatedAt: new Date(),
    }
    return database.deliveries[index]
  },
  delete: (id: string, tenantId: string) => {
    const index = database.deliveries.findIndex(
      (delivery) => delivery.id === id && delivery.tenantId === tenantId
    )
    if (index === -1) return false
    database.deliveries.splice(index, 1)
    return true
  },
}

// ==================== CUSTOMERS ====================
export const customersDb = {
  findAll: (tenantId: string) => {
    return database.customers.filter((customer) => customer.tenantId === tenantId)
  },
  findById: (id: string, tenantId: string) => {
    return database.customers.find(
      (customer) => customer.id === id && customer.tenantId === tenantId
    )
  },
  create: (customer: Customer) => {
    database.customers.push(customer)
    return customer
  },
  update: (id: string, tenantId: string, updates: Partial<Customer>) => {
    const index = database.customers.findIndex(
      (customer) => customer.id === id && customer.tenantId === tenantId
    )
    if (index === -1) return null
    database.customers[index] = {
      ...database.customers[index],
      ...updates,
      updatedAt: new Date(),
    }
    return database.customers[index]
  },
  delete: (id: string, tenantId: string) => {
    const index = database.customers.findIndex(
      (customer) => customer.id === id && customer.tenantId === tenantId
    )
    if (index === -1) return false
    database.customers.splice(index, 1)
    return true
  },
}

// ==================== PRODUCTS ====================
export const productsDb = {
  findAll: (tenantId: string) => {
    return database.products.filter((product) => product.tenantId === tenantId)
  },
  findById: (id: string, tenantId: string) => {
    return database.products.find(
      (product) => product.id === id && product.tenantId === tenantId
    )
  },
  create: (product: Product) => {
    database.products.push(product)
    return product
  },
  update: (id: string, tenantId: string, updates: Partial<Product>) => {
    const index = database.products.findIndex(
      (product) => product.id === id && product.tenantId === tenantId
    )
    if (index === -1) return null
    database.products[index] = {
      ...database.products[index],
      ...updates,
      updatedAt: new Date(),
    }
    return database.products[index]
  },
  delete: (id: string, tenantId: string) => {
    const index = database.products.findIndex(
      (product) => product.id === id && product.tenantId === tenantId
    )
    if (index === -1) return false
    database.products.splice(index, 1)
    return true
  },
}

// ==================== WAREHOUSES ====================
export const warehousesDb = {
  findAll: (tenantId: string) => {
    return database.warehouses.filter((warehouse) => warehouse.tenantId === tenantId)
  },
  findById: (id: string, tenantId: string) => {
    return database.warehouses.find(
      (warehouse) => warehouse.id === id && warehouse.tenantId === tenantId
    )
  },
  create: (warehouse: Warehouse) => {
    database.warehouses.push(warehouse)
    return warehouse
  },
  update: (id: string, tenantId: string, updates: Partial<Warehouse>) => {
    const index = database.warehouses.findIndex(
      (warehouse) => warehouse.id === id && warehouse.tenantId === tenantId
    )
    if (index === -1) return null
    database.warehouses[index] = {
      ...database.warehouses[index],
      ...updates,
      updatedAt: new Date(),
    }
    return database.warehouses[index]
  },
  delete: (id: string, tenantId: string) => {
    const index = database.warehouses.findIndex(
      (warehouse) => warehouse.id === id && warehouse.tenantId === tenantId
    )
    if (index === -1) return false
    database.warehouses.splice(index, 1)
    return true
  },
}

// ==================== CARRIERS ====================
export const carriersDb = {
  findAll: (tenantId: string) => {
    return database.carriers.filter((carrier) => carrier.tenantId === tenantId)
  },
  findById: (id: string, tenantId: string) => {
    return database.carriers.find(
      (carrier) => carrier.id === id && carrier.tenantId === tenantId
    )
  },
  create: (carrier: Carrier) => {
    database.carriers.push(carrier)
    return carrier
  },
  update: (id: string, tenantId: string, updates: Partial<Carrier>) => {
    const index = database.carriers.findIndex(
      (carrier) => carrier.id === id && carrier.tenantId === tenantId
    )
    if (index === -1) return null
    database.carriers[index] = {
      ...database.carriers[index],
      ...updates,
      updatedAt: new Date(),
    }
    return database.carriers[index]
  },
  delete: (id: string, tenantId: string) => {
    const index = database.carriers.findIndex(
      (carrier) => carrier.id === id && carrier.tenantId === tenantId
    )
    if (index === -1) return false
    database.carriers.splice(index, 1)
    return true
  },
}

// ==================== INVENTORY ====================
export const inventoryDb = {
  findAll: (tenantId: string) => {
    return database.inventory.filter((inv) => inv.tenantId === tenantId)
  },
  findByProductAndWarehouse: (
    productId: string,
    warehouseId: string,
    tenantId: string
  ) => {
    return database.inventory.find(
      (inv) =>
        inv.productId === productId &&
        inv.warehouseId === warehouseId &&
        inv.tenantId === tenantId
    )
  },
  create: (inventory: Inventory) => {
    database.inventory.push(inventory)
    return inventory
  },
  update: (id: string, tenantId: string, updates: Partial<Inventory>) => {
    const index = database.inventory.findIndex(
      (inv) => inv.id === id && inv.tenantId === tenantId
    )
    if (index === -1) return null
    database.inventory[index] = {
      ...database.inventory[index],
      ...updates,
      lastUpdated: new Date(),
    }
    return database.inventory[index]
  },
}

// ==================== ROUTES ====================
export const routesDb = {
  findAll: (tenantId: string) => {
    return database.routes.filter((route) => route.tenantId === tenantId)
  },
  findById: (id: string, tenantId: string) => {
    return database.routes.find(
      (route) => route.id === id && route.tenantId === tenantId
    )
  },
  create: (route: Route) => {
    database.routes.push(route)
    return route
  },
  update: (id: string, tenantId: string, updates: Partial<Route>) => {
    const index = database.routes.findIndex(
      (route) => route.id === id && route.tenantId === tenantId
    )
    if (index === -1) return null
    database.routes[index] = {
      ...database.routes[index],
      ...updates,
      updatedAt: new Date(),
    }
    return database.routes[index]
  },
  delete: (id: string, tenantId: string) => {
    const index = database.routes.findIndex(
      (route) => route.id === id && route.tenantId === tenantId
    )
    if (index === -1) return false
    database.routes.splice(index, 1)
    return true
  },
}
