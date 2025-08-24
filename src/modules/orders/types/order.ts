export interface OrderBuyer {
  company?: string
  contact?: string
  email?: string
  phone?: string
  fax?: string
}

export interface OrderSupplier {
  name?: string
  code?: string
  taxId?: string
  address?: string
  contact?: string
  email?: string
  phone?: string
  fax?: string
  createdAt?: string
  updatedAt?: string
  status?: string
}

export interface OrderAddress {
  name?: string
  company?: string
  address?: string
  contact?: string
  email?: string
  phone?: string
  fax?: string
  taxId?: string
}

export interface OrderAddresses {
  shipTo?: OrderAddress
  billTo?: OrderAddress
  chargeTo?: OrderAddress
}

export interface Order {
  id?: number
  number?: string
  type?: string
  status?: string
  currency?: string
  amount?: number
  createdAt?: string
  reference?: string
  buyer?: OrderBuyer
  supplier?: OrderSupplier
  addresses?: OrderAddresses
}

export type OrderStatus = 'Need to confirm' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
export type OrderType = 'Pre-Order' | 'Order' | 'Rush Order'