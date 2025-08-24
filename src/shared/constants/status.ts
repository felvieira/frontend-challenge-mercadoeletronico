export const ORDER_STATUS = {
  CONFIRM: 'confirm',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const

export const STATUS_COLORS = {
  [ORDER_STATUS.CONFIRM]: 'border-emerald-600 text-emerald-600',
  [ORDER_STATUS.PROCESSING]: 'border-yellow-600 text-yellow-600',
  [ORDER_STATUS.SHIPPED]: 'border-blue-600 text-blue-600',
  [ORDER_STATUS.DELIVERED]: 'border-green-600 text-green-600',
  [ORDER_STATUS.CANCELLED]: 'border-red-600 text-red-600',
  default: 'border-gray-500 text-gray-500',
} as const

export type OrderStatusType = typeof ORDER_STATUS[keyof typeof ORDER_STATUS]