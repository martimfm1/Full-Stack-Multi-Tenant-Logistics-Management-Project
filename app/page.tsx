"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTenant } from "@/lib/store/tenant-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Package,
  Truck,
  BarChart3,
  Users,
  Warehouse,
  Route,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Globe,
} from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated } = useTenant()

  // Se estiver autenticado, redirecionar para dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  // Se não estiver autenticado, mostrar landing page
  if (isAuthenticated) {
    return null // Ou um loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">LogisticaPro</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/login">
              <Button>Começar Agora</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Sistema Multi-Tenant Completo
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Gestão Logística
            <span className="text-primary"> Inteligente</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sistema completo e realista de gestão logística multi-tenant.
            Gerencie pedidos, entregas, estoque e rotas de forma eficiente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Acessar Sistema
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Funcionalidades Completas
          </h2>
          <p className="text-muted-foreground text-lg">
            Tudo que você precisa para gerenciar sua logística
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Gestão de Pedidos</CardTitle>
              <CardDescription>
                Controle completo do ciclo de vida dos pedidos, do recebimento à entrega
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Rastreamento de Entregas</CardTitle>
              <CardDescription>
                Acompanhe entregas em tempo real com atualizações de status e localização
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Warehouse className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Controle de Estoque</CardTitle>
              <CardDescription>
                Gerencie inventário, produtos e armazéns com alertas de estoque baixo
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Route className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Otimização de Rotas</CardTitle>
              <CardDescription>
                Planeje e otimize rotas de entrega para máxima eficiência
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Gestão de Clientes</CardTitle>
              <CardDescription>
                Mantenha um cadastro completo de clientes com histórico de pedidos
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Relatórios e Analytics</CardTitle>
              <CardDescription>
                Dashboards com métricas e relatórios detalhados para tomada de decisão
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Por que escolher o LogisticaPro?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Multi-Tenant Seguro</h3>
                  <p className="text-muted-foreground text-sm">
                    Isolamento completo de dados por organização com segurança garantida
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Performance Otimizada</h3>
                  <p className="text-muted-foreground text-sm">
                    Interface rápida e responsiva com gestão de estado eficiente
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Design Moderno</h3>
                  <p className="text-muted-foreground text-sm">
                    Interface intuitiva e limpa com componentes coerentes e acessíveis
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Gestão de Estado Previsível</h3>
                  <p className="text-muted-foreground text-sm">
                    Arquitetura robusta com Context API e padrões de design testados
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="p-8">
            <CardHeader>
              <CardTitle className="text-2xl mb-2">Estatísticas do Sistema</CardTitle>
              <CardDescription>
                Métricas que demonstram a eficiência da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Organizações Ativas</p>
                  <p className="text-2xl font-bold">2+</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Módulos Disponíveis</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                  <p className="text-2xl font-bold">99.9%</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Pronto para começar?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Acesse o sistema e descubra como podemos transformar sua gestão logística
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Acessar Sistema
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <span className="font-semibold">LogisticaPro</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Sistema de Gestão Logística Multi-Tenant © 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
