"use client"

import { useLogistics } from "@/lib/store/logistics-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Truck } from "lucide-react"

export default function DeliveriesPage() {
  const { state } = useLogistics()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Entregas</h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe e gerencie todas as entregas
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Entrega
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Entregas</CardTitle>
          <CardDescription>
            {state.deliveries.length} entrega(s) cadastrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.deliveries.length === 0 ? (
            <div className="text-center py-12">
              <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground">
                Nenhuma entrega cadastrada ainda
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.deliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{delivery.trackingNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {delivery.destination.city}, {delivery.destination.state}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2 py-1 rounded-full bg-muted">
                      {delivery.status}
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

