"use client"

import { useLogistics } from "@/lib/store/logistics-context"
import { useTenant } from "@/lib/store/tenant-context"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { MetricsCard } from "@/components/dashboard/metrics-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Package,
  Truck,
  Users,
  CheckCircle2,
  DollarSign,
  Warehouse,
  TrendingUp,
  AlertTriangle,
  Clock,
  BarChart3,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { state } = useLogistics()
  const { isAuthenticated, currentTenant } = useTenant()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  // Calcular métricas de pedidos
  const totalOrders = state.orders.length
  const pendingOrders = state.orders.filter((o) => o.status === "pending").length
  const confirmedOrders = state.orders.filter((o) => o.status === "confirmed").length
  const processingOrders = state.orders.filter((o) => o.status === "processing").length
  const shippedOrders = state.orders.filter((o) => o.status === "shipped").length
  const deliveredOrders = state.orders.filter((o) => o.status === "delivered").length
  const cancelledOrders = state.orders.filter((o) => o.status === "cancelled").length

  // Calcular receita
  const totalRevenue = state.orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + o.total, 0)
  
  const pendingRevenue = state.orders
    .filter((o) => o.status !== "cancelled" && o.status !== "delivered")
    .reduce((sum, o) => sum + o.total, 0)

  // Métricas de entregas
  const totalDeliveries = state.deliveries.length
  const pendingDeliveries = state.deliveries.filter((d) => d.status === "pending").length
  const inTransitDeliveries = state.deliveries.filter((d) => d.status === "in_transit").length
  const outForDelivery = state.deliveries.filter((d) => d.status === "out_for_delivery").length
  const deliveredDeliveries = state.deliveries.filter((d) => d.status === "delivered").length

  // Métricas de estoque
  const totalProducts = state.products.length
  const totalInventory = state.inventory.reduce((sum, inv) => sum + inv.quantity, 0)
  const lowStockItems = state.inventory.filter(
    (inv) => inv.quantity <= inv.minStock
  ).length

  // Métricas gerais
  const totalCustomers = state.customers.length
  const totalCarriers = state.carriers.length
  const totalWarehouses = state.warehouses.length

  // Taxa de conclusão
  const completionRate =
    totalOrders > 0 ? (deliveredOrders / totalOrders) * 100 : 0

  // Pedidos recentes (últimos 5)
  const recentOrders = [...state.orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  // Entregas ativas
  const activeDeliveries = state.deliveries
    .filter((d) => d.status !== "delivered" && d.status !== "failed" && d.status !== "returned")
    .slice(0, 5)

  // Status de pedidos para gráfico
  const orderStatusData = [
    { status: "Pendente", count: pendingOrders, color: "bg-yellow-500" },
    { status: "Confirmado", count: confirmedOrders, color: "bg-blue-500" },
    { status: "Processando", count: processingOrders, color: "bg-purple-500" },
    { status: "Enviado", count: shippedOrders, color: "bg-indigo-500" },
    { status: "Entregue", count: deliveredOrders, color: "bg-green-500" },
    { status: "Cancelado", count: cancelledOrders, color: "bg-red-500" },
  ].filter((item) => item.count > 0)

  const maxOrderStatus = Math.max(...orderStatusData.map((d) => d.count), 1)

  // Status de entregas para gráfico
  const deliveryStatusData = [
    { status: "Pendente", count: pendingDeliveries, color: "bg-yellow-500" },
    { status: "Em Trânsito", count: inTransitDeliveries, color: "bg-blue-500" },
    { status: "Saiu para Entrega", count: outForDelivery, color: "bg-purple-500" },
    { status: "Entregue", count: deliveredDeliveries, color: "bg-green-500" },
  ].filter((item) => item.count > 0)

  const maxDeliveryStatus = Math.max(...deliveryStatusData.map((d) => d.count), 1)

  const getStatusBadgeClass = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      processing: "bg-purple-100 text-purple-800",
      ready_to_ship: "bg-indigo-100 text-indigo-800",
      shipped: "bg-cyan-100 text-cyan-800",
      in_transit: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      out_for_delivery: "bg-purple-100 text-purple-800",
      failed: "bg-red-100 text-red-800",
    }
    return statusMap[status] || "bg-gray-100 text-gray-800"
  }

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: "Pendente",
      confirmed: "Confirmado",
      processing: "Processando",
      ready_to_ship: "Pronto para Envio",
      shipped: "Enviado",
      in_transit: "Em Trânsito",
      delivered: "Entregue",
      cancelled: "Cancelado",
      out_for_delivery: "Saiu para Entrega",
      failed: "Falhou",
    }
    return statusMap[status] || status
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Bem-vindo, {currentTenant?.name} - Visão geral do seu sistema logístico
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/reports">
              <BarChart3 className="h-4 w-4 mr-2" />
              Relatórios
            </Link>
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Total de Pedidos"
          value={totalOrders}
          description={`${pendingOrders} pendentes`}
          icon={Package}
          trend={totalOrders > 0 ? { value: 12, isPositive: true } : undefined}
        />
        <MetricsCard
          title="Receita Total"
          value={new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalRevenue)}
          description={`${new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(pendingRevenue)} pendente`}
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricsCard
          title="Entregas Ativas"
          value={inTransitDeliveries + outForDelivery}
          description={`${totalDeliveries} total`}
          icon={Truck}
        />
        <MetricsCard
          title="Taxa de Conclusão"
          value={`${completionRate.toFixed(1)}%`}
          description={`${deliveredOrders} de ${totalOrders} entregues`}
          icon={CheckCircle2}
          trend={completionRate > 80 ? { value: 5, isPositive: true } : undefined}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Clientes"
          value={totalCustomers}
          description="cadastrados"
          icon={Users}
        />
        <MetricsCard
          title="Produtos"
          value={totalProducts}
          description={`${totalInventory} em estoque`}
          icon={Package}
        />
        <MetricsCard
          title="Armazéns"
          value={totalWarehouses}
          description="ativos"
          icon={Warehouse}
        />
        <MetricsCard
          title="Transportadoras"
          value={totalCarriers}
          description="cadastradas"
          icon={Truck}
        />
      </div>

      {/* Alerts */}
      {lowStockItems > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <p className="font-medium text-yellow-900">
                  {lowStockItems} produto(s) com estoque baixo
                </p>
                <p className="text-sm text-yellow-700">
                  Verifique o estoque para evitar rupturas
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/inventory">Ver Estoque</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts and Lists */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Status de Pedidos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Status de Pedidos
            </CardTitle>
            <CardDescription>Distribuição por status</CardDescription>
          </CardHeader>
          <CardContent>
            {orderStatusData.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Nenhum pedido ainda
              </p>
            ) : (
              <div className="space-y-3">
                {orderStatusData.map((item) => (
                  <div key={item.status} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.status}</span>
                      <span className="font-medium">{item.count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all`}
                        style={{
                          width: `${(item.count / maxOrderStatus) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status de Entregas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Status de Entregas
            </CardTitle>
            <CardDescription>Distribuição por status</CardDescription>
          </CardHeader>
          <CardContent>
            {deliveryStatusData.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Nenhuma entrega ainda
              </p>
            ) : (
              <div className="space-y-3">
                {deliveryStatusData.map((item) => (
                  <div key={item.status} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.status}</span>
                      <span className="font-medium">{item.count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all`}
                        style={{
                          width: `${(item.count / maxDeliveryStatus) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Estoque */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Warehouse className="h-5 w-5" />
              Resumo de Estoque
            </CardTitle>
            <CardDescription>Visão geral do inventário</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total de Produtos</span>
                <span className="font-semibold">{totalProducts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Unidades em Estoque</span>
                <span className="font-semibold">{totalInventory}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Itens com Estoque Baixo</span>
                <span
                  className={`font-semibold ${lowStockItems > 0 ? "text-yellow-600" : "text-green-600"}`}
                >
                  {lowStockItems}
                </span>
              </div>
              {lowStockItems > 0 && (
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/inventory">Ver Detalhes</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Pedidos Recentes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pedidos Recentes</CardTitle>
                <CardDescription>Últimos pedidos criados</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/orders">Ver Todos</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-sm text-muted-foreground">
                  Nenhum pedido ainda
                </p>
                <Button variant="outline" size="sm" className="mt-4" asChild>
                  <Link href="/orders">Criar Primeiro Pedido</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/orders/${order.id}`}
                    className="block p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{order.orderNumber}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(order.status)}`}
                          >
                            {getStatusLabel(order.status)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(order.total)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.items.length} item(s)
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Entregas em Andamento */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Entregas em Andamento</CardTitle>
                <CardDescription>Status das entregas ativas</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/deliveries">Ver Todas</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {activeDeliveries.length === 0 ? (
              <div className="text-center py-8">
                <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-sm text-muted-foreground">
                  Nenhuma entrega em andamento
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeDeliveries.map((delivery) => (
                  <Link
                    key={delivery.id}
                    href={`/deliveries/${delivery.id}`}
                    className="block p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{delivery.trackingNumber}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(delivery.status)}`}
                          >
                            {getStatusLabel(delivery.status)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {delivery.destination.city}, {delivery.destination.state}
                        </p>
                        {delivery.estimatedDelivery && (
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Previsto:{" "}
                            {new Date(delivery.estimatedDelivery).toLocaleDateString("pt-BR")}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
