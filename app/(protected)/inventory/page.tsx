"use client"

import { useLogistics } from "@/lib/store/logistics-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Warehouse } from "lucide-react"

export default function InventoryPage() {
  const { state } = useLogistics()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estoque</h1>
          <p className="text-muted-foreground mt-2">
            Controle de inventário e produtos
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Produtos</CardTitle>
            <CardDescription>
              {state.products.length} produto(s) cadastrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {state.products.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhum produto cadastrado
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {state.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        SKU: {product.sku}
                      </p>
                    </div>
                    <p className="font-medium">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Armazéns</CardTitle>
            <CardDescription>
              {state.warehouses.length} armazém(ns) cadastrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {state.warehouses.length === 0 ? (
              <div className="text-center py-8">
                <Warehouse className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  Nenhum armazém cadastrado
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {state.warehouses.map((warehouse) => (
                  <div
                    key={warehouse.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{warehouse.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {warehouse.code}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

