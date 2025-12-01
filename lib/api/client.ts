/**
 * Cliente API para comunicação com o backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

export interface ApiResponse<T> {
  data?: T
  error?: string
  details?: any
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

class ApiClient {
  private getToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem("authToken")
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken()
  
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    }
  
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        return {
          error: data.error || "Erro ao processar requisição",
          details: data.details,
        }
      }
  
      return { data }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Erro de conexão",
      }
    }
  }  

  // Orders
  async getOrders(params?: {
    page?: number
    limit?: number
    search?: string
    status?: string
  }) {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.search) queryParams.append("search", params.search)
    if (params?.status) queryParams.append("status", params.status)

    return this.request<any>(`/orders?${queryParams.toString()}`)
  }

  async getOrder(id: string) {
    return this.request<any>(`/orders/${id}`)
  }

  async createOrder(order: any) {
    return this.request<any>("/orders", {
      method: "POST",
      body: JSON.stringify(order),
    })
  }

  async updateOrder(id: string, updates: any) {
    return this.request<any>(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    })
  }

  async deleteOrder(id: string) {
    return this.request<any>(`/orders/${id}`, {
      method: "DELETE",
    })
  }

  // Deliveries
  async getDeliveries(params?: {
    page?: number
    limit?: number
    search?: string
    status?: string
  }) {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.search) queryParams.append("search", params.search)
    if (params?.status) queryParams.append("status", params.status)

    return this.request<any>(`/deliveries?${queryParams.toString()}`)
  }

  async createDelivery(delivery: any) {
    return this.request<any>("/deliveries", {
      method: "POST",
      body: JSON.stringify(delivery),
    })
  }

  // Customers
  async getCustomers(params?: {
    page?: number
    limit?: number
    search?: string
  }) {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.search) queryParams.append("search", params.search)

    return this.request<any>(`/customers?${queryParams.toString()}`)
  }

  async createCustomer(customer: any) {
    return this.request<any>("/customers", {
      method: "POST",
      body: JSON.stringify(customer),
    })
  }

  // Products
  async getProducts(params?: {
    page?: number
    limit?: number
    search?: string
  }) {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.search) queryParams.append("search", params.search)

    return this.request<any>(`/products?${queryParams.toString()}`)
  }

  async createProduct(product: any) {
    return this.request<any>("/products", {
      method: "POST",
      body: JSON.stringify(product),
    })
  }
}

export const apiClient = new ApiClient()

