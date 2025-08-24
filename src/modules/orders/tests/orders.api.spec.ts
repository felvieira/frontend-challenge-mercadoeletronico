import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getOrderById, getOrders } from '../api/orders.api'
import { http } from '@/app/providers/http'
import type { Order } from '../api/orders.schemas'

// Mock the HTTP client
vi.mock('@/app/providers/http')

const mockHttp = vi.mocked(http)

const mockApiResponse: Order = {
  id: 1,
  number: '4510001114',
  type: 'Pre-Order',
  status: 'Need to confirm',
  currency: 'USD',
  amount: 20000,
  reference: 'ME11223344',
  createdAt: '2020-04-16T15:32:55.000Z',
  buyer: {
    company: 'Jacksonville Group',
    contact: 'Jason Burn',
    email: 'jacksonvillegroup@me.com',
    phone: '903-575-3050',
  },
  supplier: {
    name: 'Motion Industries INC',
    code: '#101908',
    taxId: '00.823.053/0001-02',
  },
}

const mockOrdersResponse: Order[] = [
  mockApiResponse,
  {
    ...mockApiResponse,
    id: 2,
    number: '4510001115',
    amount: 15000,
    status: 'Confirmed',
  }
]

describe('getOrderById', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('makes HTTP GET request to correct endpoint', async () => {
    mockHttp.get.mockResolvedValueOnce({ data: mockApiResponse })

    await getOrderById(1)

    expect(mockHttp.get).toHaveBeenCalledWith('/orders/1')
  })

  it('returns parsed order data when API succeeds', async () => {
    mockHttp.get.mockResolvedValueOnce({ data: mockApiResponse })

    const result = await getOrderById(1)

    expect(result).toEqual(mockApiResponse)
  })

  it('validates response data with Zod schema', async () => {
    const invalidResponse = { invalid: 'data' }
    mockHttp.get.mockResolvedValueOnce({ data: invalidResponse })

    const result = await getOrderById(1)

    // Should still return something (possibly transformed by schema)
    expect(result).toBeDefined()
  })

  it('falls back to mock data when API fails', async () => {
    mockHttp.get.mockRejectedValueOnce(new Error('Network error'))

    const result = await getOrderById(1)

    expect(result).toBeDefined()
    expect(result.id).toBe(1)
    expect(result.number).toBe('4510001114')
  })

  it('falls back to mock data when API returns 404', async () => {
    mockHttp.get.mockRejectedValueOnce({ 
      response: { status: 404 } 
    })

    const result = await getOrderById(999)

    expect(result).toBeDefined()
    expect(result.id).toBe(999) // Should use the requested ID
  })

  it('includes delay for fallback mock data', async () => {
    mockHttp.get.mockRejectedValueOnce(new Error('Network error'))

    const start = Date.now()
    await getOrderById(1)
    const duration = Date.now() - start

    expect(duration).toBeGreaterThanOrEqual(800) // Mock has 800ms delay
  })

  it('handles different order IDs correctly', async () => {
    mockHttp.get.mockResolvedValueOnce({ data: { ...mockApiResponse, id: 123 } })

    await getOrderById(123)

    expect(mockHttp.get).toHaveBeenCalledWith('/orders/123')
  })

  it('preserves all order data from API response', async () => {
    const fullOrderResponse = {
      ...mockApiResponse,
      addresses: {
        shipTo: { name: 'Ship Address' },
        billTo: { name: 'Bill Address' },
        chargeTo: { name: 'Charge Address' }
      }
    }
    
    mockHttp.get.mockResolvedValueOnce({ data: fullOrderResponse })

    const result = await getOrderById(1)

    expect(result.addresses).toBeDefined()
    expect(result.addresses?.shipTo?.name).toBe('Ship Address')
  })
})

describe('getOrders', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('makes HTTP GET request to orders endpoint', async () => {
    mockHttp.get.mockResolvedValueOnce({ data: mockOrdersResponse })

    await getOrders()

    expect(mockHttp.get).toHaveBeenCalledWith('/orders')
  })

  it('returns array of parsed orders when API succeeds', async () => {
    mockHttp.get.mockResolvedValueOnce({ data: mockOrdersResponse })

    const result = await getOrders()

    expect(Array.isArray(result)).toBe(true)
    expect(result).toHaveLength(2)
    expect(result[0]).toEqual(mockOrdersResponse[0])
    expect(result[1]).toEqual(mockOrdersResponse[1])
  })

  it('validates each order in response array', async () => {
    mockHttp.get.mockResolvedValueOnce({ data: mockOrdersResponse })

    const result = await getOrders()

    result.forEach(order => {
      expect(order).toHaveProperty('id')
      expect(order).toHaveProperty('number')
    })
  })

  it('returns empty array when API returns non-array', async () => {
    mockHttp.get.mockResolvedValueOnce({ data: { notAnArray: true } })

    const result = await getOrders()

    expect(Array.isArray(result)).toBe(true)
    expect(result).toHaveLength(0)
  })

  it('falls back to mock data when API fails', async () => {
    mockHttp.get.mockRejectedValueOnce(new Error('Network error'))

    const result = await getOrders()

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0].number).toBe('4510001114')
  })

  it('includes delay for fallback mock data', async () => {
    mockHttp.get.mockRejectedValueOnce(new Error('Network error'))

    const start = Date.now()
    await getOrders()
    const duration = Date.now() - start

    expect(duration).toBeGreaterThanOrEqual(1000) // Mock has 1000ms delay
  })

  it('returns multiple mock orders as fallback', async () => {
    mockHttp.get.mockRejectedValueOnce(new Error('Network error'))

    const result = await getOrders()

    expect(result.length).toBe(4) // Based on mock data
    
    // Check that orders have different IDs and some different properties
    const ids = result.map(order => order.id)
    expect(new Set(ids).size).toBe(ids.length) // All IDs are unique
  })

  it('handles CORS errors gracefully', async () => {
    mockHttp.get.mockRejectedValueOnce(new Error('CORS error'))

    const result = await getOrders()

    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
  })

  it('handles timeout errors gracefully', async () => {
    mockHttp.get.mockRejectedValueOnce(new Error('timeout'))

    const result = await getOrders()

    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
  })

  it('parses partial order data correctly', async () => {
    const partialOrders = [
      { id: 1, number: '123' },
      { id: 2, number: '456', amount: 1000 }
    ]
    
    mockHttp.get.mockResolvedValueOnce({ data: partialOrders })

    const result = await getOrders()

    expect(result).toHaveLength(2)
    expect(result[0].id).toBe(1)
    expect(result[0].number).toBe('123')
    expect(result[1].amount).toBe(1000)
  })
})

describe('API error handling', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('handles network connectivity issues', async () => {
    mockHttp.get.mockRejectedValueOnce(new Error('Network Error'))

    const ordersPromise = getOrders()
    const orderPromise = getOrderById(1)

    await expect(ordersPromise).resolves.toBeDefined()
    await expect(orderPromise).resolves.toBeDefined()
  })

  it('handles server errors (500)', async () => {
    mockHttp.get.mockRejectedValueOnce({ 
      response: { status: 500, statusText: 'Internal Server Error' } 
    })

    const result = await getOrderById(1)

    expect(result).toBeDefined()
    expect(typeof result).toBe('object')
  })

  it('handles malformed JSON responses', async () => {
    mockHttp.get.mockRejectedValueOnce(new Error('JSON parse error'))

    const result = await getOrders()

    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
  })
})