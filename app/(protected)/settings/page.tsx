"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie as configurações do sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configurações Gerais</CardTitle>
          <CardDescription>
            Personalize as configurações da sua organização
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground">
              Módulo de configurações em desenvolvimento
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

