"use client"

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react"
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
} from "@/lib/types/logistics"
import { useTenant } from "./tenant-context"
import { apiClient } from "@/lib/api/client"

// ==================== STATE ====================
interface LogisticsState {
  orders: Order[]
  deliveries: Delivery[]
  customers: Customer[]
  suppliers: Supplier[]
  carriers: Carrier[]
  products: Product[]
  inventory: Inventory[]
  warehouses: Warehouse[]
  routes: Route[]
  isLoading: boolean
  error: string | null
}

const initialState: LogisticsState = {
  orders: [],
  deliveries: [],
  customers: [],
  suppliers: [],
  carriers: [],
  products: [],
  inventory: [],
  warehouses: [],
  routes: [],
  isLoading: false,
  error: null,
}

// ==================== ACTIONS ====================
type LogisticsAction =
  // Orders
  | { type: "SET_ORDERS"; payload: Order[] }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "UPDATE_ORDER"; payload: Order }
  | { type: "DELETE_ORDER"; payload: string }
  // Deliveries
  | { type: "SET_DELIVERIES"; payload: Delivery[] }
  | { type: "ADD_DELIVERY"; payload: Delivery }
  | { type: "UPDATE_DELIVERY"; payload: Delivery }
  | { type: "DELETE_DELIVERY"; payload: string }
  // Customers
  | { type: "SET_CUSTOMERS"; payload: Customer[] }
  | { type: "ADD_CUSTOMER"; payload: Customer }
  | { type: "UPDATE_CUSTOMER"; payload: Customer }
  | { type: "DELETE_CUSTOMER"; payload: string }
  // Suppliers
  | { type: "SET_SUPPLIERS"; payload: Supplier[] }
  | { type: "ADD_SUPPLIER"; payload: Supplier }
  | { type: "UPDATE_SUPPLIER"; payload: Supplier }
  | { type: "DELETE_SUPPLIER"; payload: string }
  // Carriers
  | { type: "SET_CARRIERS"; payload: Carrier[] }
  | { type: "ADD_CARRIER"; payload: Carrier }
  | { type: "UPDATE_CARRIER"; payload: Carrier }
  | { type: "DELETE_CARRIER"; payload: string }
  // Products
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: string }
  // Inventory
  | { type: "SET_INVENTORY"; payload: Inventory[] }
  | { type: "UPDATE_INVENTORY"; payload: Inventory }
  // Warehouses
  | { type: "SET_WAREHOUSES"; payload: Warehouse[] }
  | { type: "ADD_WAREHOUSE"; payload: Warehouse }
  | { type: "UPDATE_WAREHOUSE"; payload: Warehouse }
  | { type: "DELETE_WAREHOUSE"; payload: string }
  // Routes
  | { type: "SET_ROUTES"; payload: Route[] }
  | { type: "ADD_ROUTE"; payload: Route }
  | { type: "UPDATE_ROUTE"; payload: Route }
  | { type: "DELETE_ROUTE"; payload: string }
  // Loading & Error
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }

// ==================== REDUCER ====================
function logisticsReducer(
  state: LogisticsState,
  action: LogisticsAction
): LogisticsState {
  switch (action.type) {
    // Orders
    case "SET_ORDERS":
      return { ...state, orders: action.payload }
    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload] }
    case "UPDATE_ORDER":
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload.id ? action.payload : o
        ),
      }
    case "DELETE_ORDER":
      return {
        ...state,
        orders: state.orders.filter((o) => o.id !== action.payload),
      }
    // Deliveries
    case "SET_DELIVERIES":
      return { ...state, deliveries: action.payload }
    case "ADD_DELIVERY":
      return { ...state, deliveries: [...state.deliveries, action.payload] }
    case "UPDATE_DELIVERY":
      return {
        ...state,
        deliveries: state.deliveries.map((d) =>
          d.id === action.payload.id ? action.payload : d
        ),
      }
    case "DELETE_DELIVERY":
      return {
        ...state,
        deliveries: state.deliveries.filter((d) => d.id !== action.payload),
      }
    // Customers
    case "SET_CUSTOMERS":
      return { ...state, customers: action.payload }
    case "ADD_CUSTOMER":
      return { ...state, customers: [...state.customers, action.payload] }
    case "UPDATE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      }
    case "DELETE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.filter((c) => c.id !== action.payload),
      }
    // Suppliers
    case "SET_SUPPLIERS":
      return { ...state, suppliers: action.payload }
    case "ADD_SUPPLIER":
      return { ...state, suppliers: [...state.suppliers, action.payload] }
    case "UPDATE_SUPPLIER":
      return {
        ...state,
        suppliers: state.suppliers.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      }
    case "DELETE_SUPPLIER":
      return {
        ...state,
        suppliers: state.suppliers.filter((s) => s.id !== action.payload),
      }
    // Carriers
    case "SET_CARRIERS":
      return { ...state, carriers: action.payload }
    case "ADD_CARRIER":
      return { ...state, carriers: [...state.carriers, action.payload] }
    case "UPDATE_CARRIER":
      return {
        ...state,
        carriers: state.carriers.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      }
    case "DELETE_CARRIER":
      return {
        ...state,
        carriers: state.carriers.filter((c) => c.id !== action.payload),
      }
    // Products
    case "SET_PRODUCTS":
      return { ...state, products: action.payload }
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] }
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      }
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      }
    // Inventory
    case "SET_INVENTORY":
      return { ...state, inventory: action.payload }
    case "UPDATE_INVENTORY":
      return {
        ...state,
        inventory: state.inventory.map((i) =>
          i.id === action.payload.id ? action.payload : i
        ),
      }
    // Warehouses
    case "SET_WAREHOUSES":
      return { ...state, warehouses: action.payload }
    case "ADD_WAREHOUSE":
      return { ...state, warehouses: [...state.warehouses, action.payload] }
    case "UPDATE_WAREHOUSE":
      return {
        ...state,
        warehouses: state.warehouses.map((w) =>
          w.id === action.payload.id ? action.payload : w
        ),
      }
    case "DELETE_WAREHOUSE":
      return {
        ...state,
        warehouses: state.warehouses.filter((w) => w.id !== action.payload),
      }
    // Routes
    case "SET_ROUTES":
      return { ...state, routes: action.payload }
    case "ADD_ROUTE":
      return { ...state, routes: [...state.routes, action.payload] }
    case "UPDATE_ROUTE":
      return {
        ...state,
        routes: state.routes.map((r) =>
          r.id === action.payload.id ? action.payload : r
        ),
      }
    case "DELETE_ROUTE":
      return {
        ...state,
        routes: state.routes.filter((r) => r.id !== action.payload),
      }
    // Loading & Error
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    default:
      return state
  }
}

// ==================== CONTEXT ====================
interface LogisticsContextType {
  state: LogisticsState
  // Orders
  setOrders: (orders: Order[]) => void
  addOrder: (orderData: Omit<Order, "id" | "createdAt" | "updatedAt" | "orderNumber" | "subtotal" | "shippingCost" | "tax" | "total">) => Promise<void>
  updateOrder: (order: Order) => void
  deleteOrder: (id: string) => void
  // Deliveries
  setDeliveries: (deliveries: Delivery[]) => void
  addDelivery: (delivery: Delivery) => void
  updateDelivery: (delivery: Delivery) => void
  deleteDelivery: (id: string) => void
  // Customers
  setCustomers: (customers: Customer[]) => void
  addCustomer: (customerData: Omit<Customer, "id" | "createdAt" | "updatedAt">) => Promise<void>
  updateCustomer: (customer: Customer) => void
  deleteCustomer: (id: string) => void
  // Suppliers
  setSuppliers: (suppliers: Supplier[]) => void
  addSupplier: (supplier: Supplier) => void
  updateSupplier: (supplier: Supplier) => void
  deleteSupplier: (id: string) => void
  // Carriers
  setCarriers: (carriers: Carrier[]) => void
  addCarrier: (carrier: Carrier) => void
  updateCarrier: (carrier: Carrier) => void
  deleteCarrier: (id: string) => void
  // Products
  setProducts: (products: Product[]) => void
  addProduct: (productData: Omit<Product, "id" | "createdAt" | "updatedAt">) => Promise<void>
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  // Inventory
  setInventory: (inventory: Inventory[]) => void
  updateInventory: (inventory: Inventory) => void
  // Warehouses
  setWarehouses: (warehouses: Warehouse[]) => void
  addWarehouse: (warehouse: Warehouse) => void
  updateWarehouse: (warehouse: Warehouse) => void
  deleteWarehouse: (id: string) => void
  // Routes
  setRoutes: (routes: Route[]) => void
  addRoute: (route: Route) => void
  updateRoute: (route: Route) => void
  deleteRoute: (id: string) => void
}

const LogisticsContext = createContext<LogisticsContextType | undefined>(
  undefined
)

export function LogisticsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(logisticsReducer, initialState)
  const { currentTenant, isAuthenticated } = useTenant()

  // Carregar dados da API quando o tenant mudar
  useEffect(() => {
    if (!isAuthenticated || !currentTenant) return

    async function loadData() {
      dispatch({ type: "SET_LOADING", payload: true })

      try {
        // Carregar todos os dados em paralelo
        const [ordersRes, deliveriesRes, customersRes, productsRes] = await Promise.all([
          apiClient.getOrders(),
          apiClient.getDeliveries(),
          apiClient.getCustomers(),
          apiClient.getProducts(),
        ])

        if (ordersRes.data) {
          dispatch({ type: "SET_ORDERS", payload: ordersRes.data.data || [] })
        }
        if (deliveriesRes.data) {
          dispatch({ type: "SET_DELIVERIES", payload: deliveriesRes.data.data || [] })
        }
        if (customersRes.data) {
          dispatch({ type: "SET_CUSTOMERS", payload: customersRes.data.data || [] })
        }
        if (productsRes.data) {
          dispatch({ type: "SET_PRODUCTS", payload: productsRes.data.data || [] })
        }
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error instanceof Error ? error.message : "Erro ao carregar dados",
        })
      } finally {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }

    loadData()
  }, [currentTenant?.id, isAuthenticated])

  // Filtrar dados por tenant
  const filterByTenant = <T extends { tenantId: string }>(items: T[]): T[] => {
    if (!currentTenant) return []
    return items.filter((item) => item.tenantId === currentTenant.id)
  }

  // Orders
  const setOrders = (orders: Order[]) => {
    dispatch({ type: "SET_ORDERS", payload: filterByTenant(orders) })
  }
  const addOrder = async (orderData: Omit<Order, "id" | "createdAt" | "updatedAt" | "orderNumber" | "subtotal" | "shippingCost" | "tax" | "total">) => {
    if (!currentTenant) return

    try {
      const result = await apiClient.createOrder(orderData)
      if (result.data) {
        dispatch({ type: "ADD_ORDER", payload: result.data })
      } else if (result.error) {
        dispatch({ type: "SET_ERROR", payload: result.error })
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Erro ao criar pedido",
      })
    }
  }
  const updateOrder = (order: Order) => {
    dispatch({ type: "UPDATE_ORDER", payload: order })
  }
  const deleteOrder = (id: string) => {
    dispatch({ type: "DELETE_ORDER", payload: id })
  }

  // Deliveries
  const setDeliveries = (deliveries: Delivery[]) => {
    dispatch({ type: "SET_DELIVERIES", payload: filterByTenant(deliveries) })
  }
  const addDelivery = (delivery: Delivery) => {
    if (currentTenant) {
      dispatch({ type: "ADD_DELIVERY", payload: { ...delivery, tenantId: currentTenant.id } })
    }
  }
  const updateDelivery = (delivery: Delivery) => {
    dispatch({ type: "UPDATE_DELIVERY", payload: delivery })
  }
  const deleteDelivery = (id: string) => {
    dispatch({ type: "DELETE_DELIVERY", payload: id })
  }

  // Customers
  const setCustomers = (customers: Customer[]) => {
    dispatch({ type: "SET_CUSTOMERS", payload: filterByTenant(customers) })
  }
  const addCustomer = async (customerData: Omit<Customer, "id" | "createdAt" | "updatedAt">) => {
    if (!currentTenant) return

    try {
      const result = await apiClient.createCustomer(customerData)
      if (result.data) {
        dispatch({ type: "ADD_CUSTOMER", payload: result.data })
      } else if (result.error) {
        dispatch({ type: "SET_ERROR", payload: result.error })
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Erro ao criar cliente",
      })
    }
  }
  const updateCustomer = (customer: Customer) => {
    dispatch({ type: "UPDATE_CUSTOMER", payload: customer })
  }
  const deleteCustomer = (id: string) => {
    dispatch({ type: "DELETE_CUSTOMER", payload: id })
  }

  // Suppliers
  const setSuppliers = (suppliers: Supplier[]) => {
    dispatch({ type: "SET_SUPPLIERS", payload: filterByTenant(suppliers) })
  }
  const addSupplier = (supplier: Supplier) => {
    if (currentTenant) {
      dispatch({ type: "ADD_SUPPLIER", payload: { ...supplier, tenantId: currentTenant.id } })
    }
  }
  const updateSupplier = (supplier: Supplier) => {
    dispatch({ type: "UPDATE_SUPPLIER", payload: supplier })
  }
  const deleteSupplier = (id: string) => {
    dispatch({ type: "DELETE_SUPPLIER", payload: id })
  }

  // Carriers
  const setCarriers = (carriers: Carrier[]) => {
    dispatch({ type: "SET_CARRIERS", payload: filterByTenant(carriers) })
  }
  const addCarrier = (carrier: Carrier) => {
    if (currentTenant) {
      dispatch({ type: "ADD_CARRIER", payload: { ...carrier, tenantId: currentTenant.id } })
    }
  }
  const updateCarrier = (carrier: Carrier) => {
    dispatch({ type: "UPDATE_CARRIER", payload: carrier })
  }
  const deleteCarrier = (id: string) => {
    dispatch({ type: "DELETE_CARRIER", payload: id })
  }

  // Products
  const setProducts = (products: Product[]) => {
    dispatch({ type: "SET_PRODUCTS", payload: filterByTenant(products) })
  }
  const addProduct = async (productData: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    if (!currentTenant) return

    try {
      const result = await apiClient.createProduct(productData)
      if (result.data) {
        dispatch({ type: "ADD_PRODUCT", payload: result.data })
      } else if (result.error) {
        dispatch({ type: "SET_ERROR", payload: result.error })
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Erro ao criar produto",
      })
    }
  }
  const updateProduct = (product: Product) => {
    dispatch({ type: "UPDATE_PRODUCT", payload: product })
  }
  const deleteProduct = (id: string) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id })
  }

  // Inventory
  const setInventory = (inventory: Inventory[]) => {
    dispatch({ type: "SET_INVENTORY", payload: filterByTenant(inventory) })
  }
  const updateInventory = (inventory: Inventory) => {
    dispatch({ type: "UPDATE_INVENTORY", payload: inventory })
  }

  // Warehouses
  const setWarehouses = (warehouses: Warehouse[]) => {
    dispatch({ type: "SET_WAREHOUSES", payload: filterByTenant(warehouses) })
  }
  const addWarehouse = (warehouse: Warehouse) => {
    if (currentTenant) {
      dispatch({ type: "ADD_WAREHOUSE", payload: { ...warehouse, tenantId: currentTenant.id } })
    }
  }
  const updateWarehouse = (warehouse: Warehouse) => {
    dispatch({ type: "UPDATE_WAREHOUSE", payload: warehouse })
  }
  const deleteWarehouse = (id: string) => {
    dispatch({ type: "DELETE_WAREHOUSE", payload: id })
  }

  // Routes
  const setRoutes = (routes: Route[]) => {
    dispatch({ type: "SET_ROUTES", payload: filterByTenant(routes) })
  }
  const addRoute = (route: Route) => {
    if (currentTenant) {
      dispatch({ type: "ADD_ROUTE", payload: { ...route, tenantId: currentTenant.id } })
    }
  }
  const updateRoute = (route: Route) => {
    dispatch({ type: "UPDATE_ROUTE", payload: route })
  }
  const deleteRoute = (id: string) => {
    dispatch({ type: "DELETE_ROUTE", payload: id })
  }

  return (
    <LogisticsContext.Provider
      value={{
        state,
        setOrders,
        addOrder,
        updateOrder,
        deleteOrder,
        setDeliveries,
        addDelivery,
        updateDelivery,
        deleteDelivery,
        setCustomers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        setSuppliers,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        setCarriers,
        addCarrier,
        updateCarrier,
        deleteCarrier,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        setInventory,
        updateInventory,
        setWarehouses,
        addWarehouse,
        updateWarehouse,
        deleteWarehouse,
        setRoutes,
        addRoute,
        updateRoute,
        deleteRoute,
      }}
    >
      {children}
    </LogisticsContext.Provider>
  )
}

export function useLogistics() {
  const context = useContext(LogisticsContext)
  if (context === undefined) {
    throw new Error("useLogistics deve ser usado dentro de um LogisticsProvider")
  }
  return context
}

