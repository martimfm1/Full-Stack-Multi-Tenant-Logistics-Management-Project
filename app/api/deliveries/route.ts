import { NextRequest, NextResponse } from "next/server"
import { validateAuth } from "@/lib/api/middleware"
import { createDeliverySchema, paginationSchema, filterSchema } from "@/lib/api/validation"
import { deliveriesDb } from "@/lib/api/db"
import { Delivery, DeliveryEvent } from "@/lib/types/logistics"

// GET /api/deliveries - Listar entregas
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
    })

    let deliveries = deliveriesDb.findAll(auth.tenant.id)

    // Aplicar filtros
    if (filters.status) {
      deliveries = deliveries.filter((d) => d.status === filters.status)
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      deliveries = deliveries.filter(
        (d) =>
          d.trackingNumber.toLowerCase().includes(searchLower) ||
          d.orderId.toLowerCase().includes(searchLower)
      )
    }

    // Paginação
    const total = deliveries.length
    const start = (pagination.page - 1) * pagination.limit
    const end = start + pagination.limit
    const paginatedDeliveries = deliveries.slice(start, end)

    return NextResponse.json({
      data: paginatedDeliveries,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    })
  } catch (error) {
    console.error("Erro ao listar entregas:", error)
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}

// POST /api/deliveries - Criar entrega
export async function POST(request: NextRequest) {
  try {
    const auth = validateAuth(request)
    if (auth.error || !auth.user || !auth.tenant) {
      return NextResponse.json({ error: auth.error || "Não autenticado" }, { status: 401 })
    }

    const body = await request.json()
    const validated = createDeliverySchema.parse(body)

    const initialEvent: DeliveryEvent = {
      id: crypto.randomUUID(),
      type: "created",
      description: "Entrega criada",
      timestamp: new Date(),
      userId: auth.user.id,
    }

    const delivery: Delivery = {
      id: crypto.randomUUID(),
      tenantId: auth.tenant.id,
      orderId: validated.orderId,
      carrierId: validated.carrierId,
      trackingNumber: validated.trackingNumber,
      status: "pending",
      origin: validated.origin,
      destination: validated.destination,
      estimatedDelivery: validated.estimatedDelivery
        ? new Date(validated.estimatedDelivery)
        : undefined,
      events: [initialEvent],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const created = deliveriesDb.create(delivery)

    return NextResponse.json(created, { status: 201 })
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Erro ao criar entrega:", error)
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}

