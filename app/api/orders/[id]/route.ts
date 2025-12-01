import { NextRequest, NextResponse } from "next/server"
import { validateAuth } from "@/lib/api/middleware"
import { updateOrderSchema } from "@/lib/api/validation"
import { ordersDb } from "@/lib/api/db"

// GET /api/orders/[id] - Obter pedido específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = validateAuth(request)
    if (auth.error || !auth.user || !auth.tenant) {
      return NextResponse.json({ error: auth.error || "Não autenticado" }, { status: 401 })
    }

    const { id } = await params
    const order = ordersDb.findById(id, auth.tenant.id)

    if (!order) {
      return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Erro ao obter pedido:", error)
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}

// PUT /api/orders/[id] - Atualizar pedido
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = validateAuth(request)
    if (auth.error || !auth.user || !auth.tenant) {
      return NextResponse.json({ error: auth.error || "Não autenticado" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const validated = updateOrderSchema.parse(body)

    const updated = ordersDb.update(id, auth.tenant.id, validated)

    if (!updated) {
      return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Erro ao atualizar pedido:", error)
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}

// DELETE /api/orders/[id] - Deletar pedido
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = validateAuth(request)
    if (auth.error || !auth.user || !auth.tenant) {
      return NextResponse.json({ error: auth.error || "Não autenticado" }, { status: 401 })
    }

    const { id } = await params
    const deleted = ordersDb.delete(id, auth.tenant.id)

    if (!deleted) {
      return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ message: "Pedido deletado com sucesso" })
  } catch (error) {
    console.error("Erro ao deletar pedido:", error)
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}

