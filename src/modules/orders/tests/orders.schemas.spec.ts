import { describe, it, expect } from 'vitest'
import { 
  OrderBuyerSchema, 
  OrderSupplierSchema, 
  OrderAddressSchema, 
  OrderAddressesSchema, 
  OrderSchema 
} from '../api/orders.schemas'

describe('OrderBuyerSchema', () => {
  it('validates valid buyer data', () => {
    const validBuyer = {
      company: 'Test Company',
      contact: 'John Doe',
      email: 'john@test.com',
      phone: '123-456-7890',
      fax: '123-456-7891'
    }

    const result = OrderBuyerSchema.parse(validBuyer)
    expect(result).toEqual(validBuyer)
  })

  it('accepts partial buyer data', () => {
    const partialBuyer = {
      company: 'Test Company'
    }

    const result = OrderBuyerSchema.parse(partialBuyer)
    expect(result).toEqual(partialBuyer)
  })

  it('accepts empty buyer object', () => {
    const emptyBuyer = {}

    const result = OrderBuyerSchema.parse(emptyBuyer)
    expect(result).toEqual(emptyBuyer)
  })

  it('validates email format', () => {
    const invalidEmail = {
      email: 'not-an-email'
    }

    expect(() => OrderBuyerSchema.parse(invalidEmail)).toThrow()
  })

  it('accepts valid email formats', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.co.uk',
      'user+tag@domain.com'
    ]

    validEmails.forEach(email => {
      const buyer = { email }
      const result = OrderBuyerSchema.parse(buyer)
      expect(result.email).toBe(email)
    })
  })
})

describe('OrderSupplierSchema', () => {
  it('validates complete supplier data', () => {
    const validSupplier = {
      name: 'Motion Industries INC',
      code: '#101908',
      taxId: '00.823.053/0001-02',
      address: 'Birmingham AL',
      contact: 'John Smith',
      email: 'john@motion.com',
      phone: '800-296-5522',
      fax: '800-296-5522',
      createdAt: '2020-05-23T12:45:20.39Z',
      updatedAt: '2020-05-23T12:45:20.39Z',
      status: 'Active'
    }

    const result = OrderSupplierSchema.parse(validSupplier)
    expect(result).toEqual(validSupplier)
  })

  it('accepts minimal supplier data', () => {
    const minimalSupplier = {
      name: 'Test Supplier'
    }

    const result = OrderSupplierSchema.parse(minimalSupplier)
    expect(result).toEqual(minimalSupplier)
  })

  it('validates email format in supplier', () => {
    const supplierWithInvalidEmail = {
      name: 'Test',
      email: 'invalid-email'
    }

    expect(() => OrderSupplierSchema.parse(supplierWithInvalidEmail)).toThrow()
  })
})

describe('OrderAddressSchema', () => {
  it('validates complete address data', () => {
    const validAddress = {
      name: 'West Plant',
      company: 'West Plant Manufacturing',
      address: '1311 W Washington Blvd, Los Angeles, CA 90006',
      contact: 'Brian Mazda',
      email: 'brian@westplant.com',
      phone: '222-575-3050',
      fax: '222-575-3050',
      taxId: '00.000.000/0000-00'
    }

    const result = OrderAddressSchema.parse(validAddress)
    expect(result).toEqual(validAddress)
  })

  it('accepts partial address data', () => {
    const partialAddress = {
      name: 'Office',
      address: 'Main Street 123'
    }

    const result = OrderAddressSchema.parse(partialAddress)
    expect(result).toEqual(partialAddress)
  })

  it('validates email format in address', () => {
    const addressWithInvalidEmail = {
      name: 'Test',
      email: 'not-valid-email'
    }

    expect(() => OrderAddressSchema.parse(addressWithInvalidEmail)).toThrow()
  })
})

describe('OrderAddressesSchema', () => {
  it('validates complete addresses structure', () => {
    const validAddresses = {
      shipTo: {
        name: 'Ship Location',
        address: 'Ship Address'
      },
      billTo: {
        name: 'Bill Location',
        address: 'Bill Address'
      },
      chargeTo: {
        name: 'Charge Location',
        address: 'Charge Address'
      }
    }

    const result = OrderAddressesSchema.parse(validAddresses)
    expect(result).toEqual(validAddresses)
  })

  it('accepts partial addresses structure', () => {
    const partialAddresses = {
      shipTo: {
        name: 'Ship Location'
      }
    }

    const result = OrderAddressesSchema.parse(partialAddresses)
    expect(result).toEqual(partialAddresses)
  })

  it('accepts empty addresses object', () => {
    const emptyAddresses = {}

    const result = OrderAddressesSchema.parse(emptyAddresses)
    expect(result).toEqual(emptyAddresses)
  })
})

describe('OrderSchema', () => {
  it('validates complete order data', () => {
    const validOrder = {
      id: 1,
      number: '4510001114',
      type: 'Pre-Order',
      status: 'Need to confirm',
      currency: 'USD',
      amount: 20000,
      createdAt: '2020-04-16T15:32:55.000Z',
      reference: 'ME11223344',
      buyer: {
        company: 'Jacksonville Group',
        contact: 'Jason Burn',
        email: 'jason@jacksonville.com',
        phone: '903-575-3050'
      },
      supplier: {
        name: 'Motion Industries INC',
        code: '#101908'
      },
      addresses: {
        shipTo: {
          name: 'West Plant',
          address: 'Los Angeles, CA'
        }
      }
    }

    const result = OrderSchema.parse(validOrder)
    expect(result).toEqual(validOrder)
  })

  it('accepts minimal order data', () => {
    const minimalOrder = {
      id: 1,
      number: '123456'
    }

    const result = OrderSchema.parse(minimalOrder)
    expect(result).toEqual({
      ...minimalOrder,
      currency: 'USD' // Default value
    })
  })

  it('applies default currency when not provided', () => {
    const orderWithoutCurrency = {
      id: 1,
      amount: 1000
    }

    const result = OrderSchema.parse(orderWithoutCurrency)
    expect(result.currency).toBe('USD')
  })

  it('preserves provided currency', () => {
    const orderWithEUR = {
      id: 1,
      amount: 1000,
      currency: 'EUR'
    }

    const result = OrderSchema.parse(orderWithEUR)
    expect(result.currency).toBe('EUR')
  })

  it('accepts empty order object', () => {
    const emptyOrder = {}

    const result = OrderSchema.parse(emptyOrder)
    expect(result.currency).toBe('USD') // Default value applied
  })

  it('passes through unknown fields due to passthrough()', () => {
    const orderWithExtraFields = {
      id: 1,
      number: '123',
      customField: 'custom value',
      anotherField: { nested: 'data' }
    }

    const result = OrderSchema.parse(orderWithExtraFields)
    expect(result.customField).toBe('custom value')
    expect(result.anotherField).toEqual({ nested: 'data' })
  })

  it('validates nested buyer email', () => {
    const orderWithInvalidBuyerEmail = {
      id: 1,
      buyer: {
        email: 'invalid-email'
      }
    }

    expect(() => OrderSchema.parse(orderWithInvalidBuyerEmail)).toThrow()
  })

  it('validates nested supplier email', () => {
    const orderWithInvalidSupplierEmail = {
      id: 1,
      supplier: {
        email: 'invalid-email'
      }
    }

    expect(() => OrderSchema.parse(orderWithInvalidSupplierEmail)).toThrow()
  })

  it('validates nested address emails', () => {
    const orderWithInvalidAddressEmail = {
      id: 1,
      addresses: {
        shipTo: {
          email: 'invalid-email'
        }
      }
    }

    expect(() => OrderSchema.parse(orderWithInvalidAddressEmail)).toThrow()
  })

  it('handles null values gracefully', () => {
    const orderWithNulls = {
      id: 1
      // All other fields are undefined/missing
    }

    const result = OrderSchema.parse(orderWithNulls)
    expect(result.currency).toBe('USD')
    expect(result.id).toBe(1)
  })

  it('handles undefined values gracefully', () => {
    const orderWithUndefined = {
      id: 1,
      number: undefined,
      buyer: undefined,
      supplier: undefined,
      addresses: undefined
    }

    const result = OrderSchema.parse(orderWithUndefined)
    expect(result.currency).toBe('USD')
  })
})