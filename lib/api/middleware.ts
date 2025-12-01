import { NextRequest } from "next/server"
import { User, Tenant } from "@/lib/types/logistics"

export interface AuthRequest extends NextRequest {
  user?: User
  tenant?: Tenant
}

/**
 * Middleware para validar autenticação e tenant
 */
export function validateAuth(request: NextRequest): {
  user: User | null
  tenant: Tenant | null
  error: string | null
} {
  const authHeader = request.headers.get("authorization")
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      user: null,
      tenant: null,
      error: "Token de autenticação não fornecido",
    }
  }

  const token = authHeader.replace("Bearer ", "")

  // Em produção, validar JWT real
  // Por enquanto, usar token mock
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString())
    
    // Mock de validação - em produção, validar com JWT
    if (decoded.userId && decoded.tenantId) {
      // Buscar usuário e tenant (mock)
      const user = getMockUser(decoded.userId)
      const tenant = getMockTenant(decoded.tenantId)

      if (!user || !tenant) {
        return {
          user: null,
          tenant: null,
          error: "Usuário ou tenant não encontrado",
        }
      }

      if (user.tenantId !== tenant.id) {
        return {
          user: null,
          tenant: null,
          error: "Usuário não pertence ao tenant especificado",
        }
      }

      return {
        user,
        tenant,
        error: null,
      }
    }

    return {
      user: null,
      tenant: null,
      error: "Token inválido",
    }
  } catch {
    return {
      user: null,
      tenant: null,
      error: "Token inválido",
    }
  }
}

/**
 * Validar tenantId na requisição
 */
export function validateTenant(
  request: NextRequest,
  tenant: Tenant | null
): { valid: boolean; error: string | null } {
  const tenantIdParam = request.nextUrl.searchParams.get("tenantId")

  if (!tenant) {
    return {
      valid: false,
      error: "Tenant não autenticado",
    }
  }

  // Se tenantId for fornecido, deve corresponder ao tenant autenticado
  if (tenantIdParam && tenantIdParam !== tenant.id) {
    return {
      valid: false,
      error: "Acesso negado: tenantId não corresponde ao tenant autenticado",
    }
  }

  return {
    valid: true,
    error: null,
  }
}

/**
 * Criar token mock (em produção, usar JWT real)
 */
export function createMockToken(userId: string, tenantId: string): string {
  const payload = {
    userId,
    tenantId,
    iat: Date.now(),
  }
  return Buffer.from(JSON.stringify(payload)).toString("base64")
}

// Buscar dados da database em memória
import { usersDb, tenantsDb } from "./db"

function getMockUser(userId: string): User | null {
  return usersDb.findById(userId) || null
}

function getMockTenant(tenantId: string): Tenant | null {
  return tenantsDb.findById(tenantId) || null
}

