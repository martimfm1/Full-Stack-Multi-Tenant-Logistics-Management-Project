import { NextRequest, NextResponse } from "next/server"
import { validateAuth } from "@/lib/api/middleware"
import { createOrderSchema, updateOrderSchema, paginationSchema, filterSchema } from "@/lib/api/validation"
import { ordersDb } from "@/lib/api/db"
import { Order, OrderItem } from "@/lib/types/logistics"

// GET /api/orders - Listar pedidos
export async function GET(request: NextRequest) {
  try {
    const auth = validateAuth(request)
    if (auth.error || !auth.user || !auth.tenant) {
      return NextResponse.json({ error: auth.error || "Não autenticado" }, { status: 401 })
    }

    const { searchParams } = request.nextUrl
    const pagination = paginationSchema.parse({
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
    })
    const filters = filterSchema.parse({
      search: searchParams.get("search"),
      status: searchParams.get("status"),
      dateFrom: searchParams.get("dateFrom"),
      dateTo: searchParams.get("dateTo"),
    })

    let orders = ordersDb.findAll(auth.tenant.id)

    // Aplicar filtros
    if (filters.status) {
      orders = orders.filter((o) => o.status === filters.status)
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      orders = orders.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(searchLower) ||
          o.customerId.toLowerCase().includes(searchLower)
      )
    }
    if (filters.dateFrom) {
      const dateFrom = new Date(filters.dateFrom)
      orders = orders.filter((o) => new Date(o.createdAt) >= dateFrom)
    }
    if (filters.dateTo) {
      const dateTo = new Date(filters.dateTo)
      orders = orders.filter((o) => new Date(o.createdAt) <= dateTo)
    }

    // Paginação
    const total = orders.length
    const start = (pagination.page - 1) * pagination.limit
    const end = start + pagination.limit
    const paginatedOrders = orders.slice(start, end)

    return NextResponse.json({
      data: paginatedOrders,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    })
  } catch (error) {
    console.error("Erro ao listar pedidos:", error)
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}

// POST /api/orders - Criar pedido
export async function POST(request: NextRequest) {
  try {
    const auth = validateAuth(request)
    if (auth.error || !auth.user || !auth.tenant) {
      return NextResponse.json({ error: auth.error || "Não autenticado" }, { status: 401 })
    }

    const body = await request.json()
    const validated = createOrderSchema.parse(body)

    // Calcular totais
    const items: OrderItem[] = validated.items.map((item, index) => ({
      id: crypto.randomUUID(),
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.quantity * item.unitPrice,
    }))

    const subtotal = items.reduce((sum, item) => sum + item.total, 0)
    const shippingCost = 0 // Calcular baseado em regras de negócio
    const tax = subtotal * 0.1 // 10% de imposto (exemplo)
    const total = subtotal + shippingCost + tax

    // Gerar número do pedido
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    const order: Order = {
      id: crypto.randomUUID(),
      tenantId: auth.tenant.id,
      orderNumber,
      customerId: validated.customerId,
      status: "pending",
      items,
      shippingAddress: validated.shippingAddress,
      billingAddress: validated.billingAddress,
      subtotal,
      shippingCost,
      tax,
      total,
      notes: validated.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const created = ordersDb.create(order)

    return NextResponse.json(created, { status: 201 })
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Erro ao criar pedido:", error)
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}

