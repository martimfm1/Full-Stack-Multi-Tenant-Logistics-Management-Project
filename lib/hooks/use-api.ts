"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api/client"
import { useTenant } from "@/lib/store/tenant-context"

export function useApiData<T>(
  fetchFn: () => Promise<{ data?: T; error?: string }>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const result = await fetchFn()
        if (cancelled) return

        if (result.error) {
          setError(result.error)
        } else {
          setData(result.data || null)
        }
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return { data, loading, error, refetch: () => fetchFn() }
}

export function useOrders() {
  const { currentTenant } = useTenant()
  return useApiData(
    () => apiClient.getOrders(),
    [currentTenant?.id]
  )
}

export function useDeliveries() {
  const { currentTenant } = useTenant()
  return useApiData(
    () => apiClient.getDeliveries(),
    [currentTenant?.id]
  )
}

export function useCustomers() {
  const { currentTenant } = useTenant()
  return useApiData(
    () => apiClient.getCustomers(),
    [currentTenant?.id]
  )
}

export function useProducts() {
  const { currentTenant } = useTenant()
  return useApiData(
    () => apiClient.getProducts(),
    [currentTenant?.id]
  )
}

