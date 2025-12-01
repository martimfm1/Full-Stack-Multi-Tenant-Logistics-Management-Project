import { NextRequest, NextResponse } from "next/server"
import { validateAuth } from "@/lib/api/middleware"
import { createProductSchema, paginationSchema, filterSchema } from "@/lib/api/validation"
import { productsDb } from "@/lib/api/db"
import { Product } from "@/lib/types/logistics"

// GET /api/products - Listar produtos
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

    let products = productsDb.findAll(auth.tenant.id)

    // Aplicar filtros
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.sku.toLowerCase().includes(searchLower) ||
          (p.description && p.description.toLowerCase().includes(searchLower))
      )
    }

    // Paginação
    const total = products.length
    const start = (pagination.page - 1) * pagination.limit
    const end = start + pagination.limit
    const paginatedProducts = products.slice(start, end)

    return NextResponse.json({
      data: paginatedProducts,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    })
  } catch (error) {
    console.error("Erro ao listar produtos:", error)
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}

// POST /api/products - Criar produto
export async function POST(request: NextRequest) {
  try {
    const auth = validateAuth(request)
    if (auth.error || !auth.user || !auth.tenant) {
      return NextResponse.json({ error: auth.error || "Não autenticado" }, { status: 401 })
    }

    const body = await request.json()
    const validated = createProductSchema.parse(body)

    const product: Product = {
      id: crypto.randomUUID(),
      tenantId: auth.tenant.id,
      sku: validated.sku,
      name: validated.name,
      description: validated.description,
      category: validated.category,
      unit: validated.unit,
      weight: validated.weight,
      dimensions: validated.dimensions,
      price: validated.price,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const created = productsDb.create(product)

    return NextResponse.json(created, { status: 201 })
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Erro ao criar produto:", error)
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}

