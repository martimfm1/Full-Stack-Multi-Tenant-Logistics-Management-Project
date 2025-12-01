"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { Tenant, User } from "@/lib/types/logistics"

interface TenantContextType {
  currentTenant: Tenant | null
  currentUser: User | null
  tenants: Tenant[]
  setCurrentTenant: (tenant: Tenant | null) => void
  setCurrentUser: (user: User | null) => void
  switchTenant: (tenantId: string) => void
  isAuthenticated: boolean
}

const TenantContext = createContext<TenantContextType | undefined>(undefined)

// Mock tenants para demonstração
const mockTenants: Tenant[] = [
  {
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
  },
  {
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
  },
]

export function TenantProvider({ children }: { children: ReactNode }) {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants)

  // Carregar tenant e usuário do localStorage na inicialização
  useEffect(() => {
    if (typeof window === "undefined") return

    // Usar função para evitar setState direto no effect
    const loadFromStorage = () => {
      const savedTenant = localStorage.getItem("currentTenant")
      const savedUser = localStorage.getItem("currentUser")
      const savedTenants = localStorage.getItem("tenants")

      if (savedTenant) {
        try {
          const tenant = JSON.parse(savedTenant)
          setCurrentTenant(tenant)
        } catch {
          console.error("Erro ao carregar tenant")
        }
      }

      if (savedUser) {
        try {
          const user = JSON.parse(savedUser)
          setCurrentUser(user)
        } catch {
          console.error("Erro ao carregar usuário")
        }
      }

      if (savedTenants) {
        try {
          const tenants = JSON.parse(savedTenants)
          setTenants(tenants)
        } catch {
          // Se não conseguir carregar, usar os mock tenants
          setTenants(mockTenants)
        }
      } else {
        // Inicializar com mock tenants se não houver salvos
        setTenants(mockTenants)
        localStorage.setItem("tenants", JSON.stringify(mockTenants))
      }
    }

    loadFromStorage()
  }, [])

  // Persistir mudanças no localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && currentTenant) {
      localStorage.setItem("currentTenant", JSON.stringify(currentTenant))
    }
  }, [currentTenant])

  useEffect(() => {
    if (typeof window !== "undefined" && currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    }
  }, [currentUser])

  const switchTenant = (tenantId: string) => {
    const tenant = tenants.find((t) => t.id === tenantId)
    if (tenant) {
      setCurrentTenant(tenant)
    }
  }

  const isAuthenticated = !!currentUser && !!currentTenant

  return (
    <TenantContext.Provider
      value={{
        currentTenant,
        currentUser,
        tenants,
        setCurrentTenant,
        setCurrentUser,
        switchTenant,
        isAuthenticated,
      }}
    >
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (context === undefined) {
    throw new Error("useTenant deve ser usado dentro de um TenantProvider")
  }
  return context
}

