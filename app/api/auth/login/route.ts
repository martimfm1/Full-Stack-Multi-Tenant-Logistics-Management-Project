import { NextRequest, NextResponse } from "next/server"
import { createMockToken } from "@/lib/api/middleware"
import { usersDb, tenantsDb } from "@/lib/api/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      )
    }

    // Buscar usuário na database em memória
    const user = usersDb.findByEmail(email)
    if (!user) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      )
    }

    // Verificar se usuário está ativo
    if (!user.isActive) {
      return NextResponse.json(
        { error: "Usuário inativo" },
        { status: 403 }
      )
    }

    // Buscar tenant do usuário na database
    const tenant = tenantsDb.findById(user.tenantId)
    if (!tenant) {
      return NextResponse.json(
        { error: "Tenant não encontrado" },
        { status: 404 }
      )
    }

    // Em produção, verificar senha com hash (bcrypt, argon2, etc.)
    // Por enquanto, aceita qualquer senha para demo
    // TODO: Implementar verificação de senha
    // const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    // if (!isValidPassword) {
    //   return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
    // }

    // Criar token
    const token = createMockToken(user.id, tenant.id)

    return NextResponse.json({
      user: {
        id: user.id,
        tenantId: user.tenantId,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      tenant: {
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
        email: tenant.email,
        phone: tenant.phone,
        settings: tenant.settings,
        createdAt: tenant.createdAt,
        updatedAt: tenant.updatedAt,
      },
      token,
    })
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}
