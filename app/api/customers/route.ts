import { NextRequest, NextResponse } from "next/server"
import { validateAuth } from "@/lib/api/middleware"
import { createCustomerSchema, paginationSchema, filterSchema } from "@/lib/api/validation"
import { customersDb } from "@/lib/api/db"
import { Customer } from "@/lib/types/logistics"

// GET /api/customers - Listar clientes
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
    })

    let customers = customersDb.findAll(auth.tenant.id)

    // Aplicar filtros
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      customers = customers.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.email.toLowerCase().includes(searchLower) ||
          (c.document && c.document.includes(searchLower))
      )
    }

    // Paginação
    const total = customers.length
    const start = (pagination.page - 1) * pagination.limit
    const end = start + pagination.limit
    const paginatedCustomers = customers.slice(start, end)

    return NextResponse.json({
      data: paginatedCustomers,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    })
  } catch (error) {
    console.error("Erro ao listar clientes:", error)
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}

// POST /api/customers - Criar cliente
export async function POST(request: NextRequest) {
  try {
    const auth = validateAuth(request)
    if (auth.error || !auth.user || !auth.tenant) {
      return NextResponse.json({ error: auth.error || "Não autenticado" }, { status: 401 })
    }

    const body = await request.json()
    const validated = createCustomerSchema.parse(body)

    const customer: Customer = {
      id: crypto.randomUUID(),
      tenantId: auth.tenant.id,
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      document: validated.document,
      address: validated.address,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const created = customersDb.create(customer)

    return NextResponse.json(created, { status: 201 })
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Erro ao criar cliente:", error)
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}

