"use client"

import { useLogistics } from "@/lib/store/logistics-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Route } from "lucide-react"

export default function RoutesPage() {
  const { state } = useLogistics()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rotas</h1>
          <p className="text-muted-foreground mt-2">
            Planeje e gerencie rotas de entrega
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Rota
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Rotas</CardTitle>
          <CardDescription>
            {state.routes.length} rota(s) cadastrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.routes.length === 0 ? (
            <div className="text-center py-12">
              <Route className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground">
                Nenhuma rota cadastrada ainda
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.routes.map((route) => (
                <div
                  key={route.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{route.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {route.deliveries.length} entrega(s)
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2 py-1 rounded-full bg-muted">
                      {route.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

