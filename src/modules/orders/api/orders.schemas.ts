import { z } from 'zod'

export const OrderBuyerSchema = z.object({
  company: z.string().optional(),
  contact: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
}).partial()

export const OrderSupplierSchema = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
  taxId: z.string().optional(),
  address: z.string().optional(),
  contact: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  status: z.string().optional(),
}).partial()

export const OrderAddressSchema = z.object({
  name: z.string().optional(),
  company: z.string().optional(),
  address: z.string().optional(),
  contact: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  taxId: z.string().optional(),
}).partial()

export const OrderAddressesSchema = z.object({
  shipTo: OrderAddressSchema.optional(),
  billTo: OrderAddressSchema.optional(),
  chargeTo: OrderAddressSchema.optional(),
}).partial()

export const OrderSchema = z.object({
  id: z.number().optional(),
  number: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  currency: z.string().default('USD'),
  amount: z.number().optional(),
  createdAt: z.string().optional(),
  reference: z.string().optional(),
  buyer: OrderBuyerSchema.optional(),
  supplier: OrderSupplierSchema.optional(),
  addresses: OrderAddressesSchema.optional(),
}).passthrough()

export type Order = z.infer<typeof OrderSchema>