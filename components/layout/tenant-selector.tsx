"use client"

import { useTenant } from "@/lib/store/tenant-context"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChevronDown, Building2 } from "lucide-react"
import { useState } from "react"

export function TenantSelector() {
  const { currentTenant, tenants, switchTenant } = useTenant()
  const [isOpen, setIsOpen] = useState(false)

  if (!currentTenant) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Selecione uma Organização</CardTitle>
          <CardDescription>
            Você precisa selecionar uma organização para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tenants.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhuma organização disponível. Entre em contato com o administrador.
            </p>
          ) : (
            <div className="space-y-2">
              {tenants.map((tenant) => (
                <Button
                  key={tenant.id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => switchTenant(tenant.id)}
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  {tenant.name}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          <span className="font-medium">{currentTenant.name}</span>
        </div>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && tenants.length > 1 && (
        <Card className="absolute top-full mt-2 w-full z-50">
          <CardContent className="p-2">
            <div className="space-y-1">
              {tenants.map((tenant) => (
                <Button
                  key={tenant.id}
                  variant={tenant.id === currentTenant.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    switchTenant(tenant.id)
                    setIsOpen(false)
                  }}
                >
                  {tenant.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

