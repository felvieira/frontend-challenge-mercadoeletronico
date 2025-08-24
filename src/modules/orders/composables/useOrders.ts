import { useQuery } from '@tanstack/vue-query'
import { getOrders, getOrderById } from '../api/orders.api'

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    staleTime: 60_000,
    retry: 1,
  })
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrderById(id),
    staleTime: 60_000,
    retry: 1,
  })
}