"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  Truck,
  Users,
  Warehouse,
  Route,
  BarChart3,
  Settings,
} from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Pedidos",
    href: "/orders",
    icon: Package,
  },
  {
    title: "Entregas",
    href: "/deliveries",
    icon: Truck,
  },
  {
    title: "Clientes",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Estoque",
    href: "/inventory",
    icon: Warehouse,
  },
  {
    title: "Rotas",
    href: "/routes",
    icon: Route,
  },
  {
    title: "Relatórios",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Configurações",
    href: "/settings",
    icon: Settings,
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}

