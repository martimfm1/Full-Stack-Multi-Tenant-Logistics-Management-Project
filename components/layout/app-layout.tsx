"use client"

import { ReactNode } from "react"
import { MainNav } from "./main-nav"
import { TenantSelector } from "./tenant-selector"
import { useTenant } from "@/lib/store/tenant-context"
import { Package2, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { currentUser, currentTenant, setCurrentUser, setCurrentTenant } = useTenant()

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentTenant(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser")
      localStorage.removeItem("currentTenant")
    }
  }

  if (!currentTenant || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          <TenantSelector />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r bg-card p-6">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <Package2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">LogisticaPro</span>
          </div>

          {/* Tenant Selector */}
          <div className="mb-6">
            <TenantSelector />
          </div>

          {/* Navigation */}
          <div className="flex-1">
            <MainNav />
          </div>

          {/* User Info */}
          <div className="mt-auto pt-6 border-t">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}

