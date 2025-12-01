"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTenant } from "@/lib/store/tenant-context"
import { Package2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { setCurrentUser, setCurrentTenant } = useTenant()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer login")
      }

      // Salvar dados do usuário e tenant
      setCurrentUser(data.user)
      setCurrentTenant(data.tenant)
      
      // Salvar token para uso nas requisições API
      if (typeof window !== "undefined" && data.token) {
        localStorage.setItem("authToken", data.token)
      }
      
      // Salvar tenants no localStorage se ainda não estiverem salvos
      if (typeof window !== "undefined") {
        const savedTenants = localStorage.getItem("tenants")
        if (!savedTenants) {
          // Em produção, isso viria da API
          const allTenants = [
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
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
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
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ]
          localStorage.setItem("tenants", JSON.stringify(allTenants))
        }
      }

      // Redirecionar para dashboard
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Package2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">LogisticaPro</CardTitle>
          <CardDescription>
            Sistema de Gestão Logística Multi-Tenant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>

            <div className="text-sm text-muted-foreground text-center pt-4 border-t">
              <p className="mb-2">Credenciais de teste:</p>
              <p>admin@empresa1.com / qualquer senha</p>
              <p>admin@empresa2.com / qualquer senha</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

