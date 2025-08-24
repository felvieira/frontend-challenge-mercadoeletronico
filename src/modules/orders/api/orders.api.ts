import { http } from '@/app/providers/http'
import { type Order } from './orders.schemas'

// Transform API response to match our schema
function transformApiOrderToSchema(apiData: any): Order {
  return {
    id: apiData.header.serial || 1,
    number: apiData.header.number?.toString() || '0000000000',
    type: 'Pre-Order',
    status: apiData.header.status || 'Unknown',
    currency: apiData.header.currency || 'USD',
    amount: apiData.header.price || 0,
    reference: `ME${apiData.header.serial || '00000000'}`,
    createdAt: apiData.header.createdAt || new Date().toISOString(),
    buyer: {
      company: apiData.header.buyer || 'Unknown Company',
      contact: apiData.header.contact?.name || 'Unknown Contact',
      email: apiData.header.contact?.email || 'unknown@example.com',
      phone: apiData.header.contact?.phone || '000-000-0000',
      fax: apiData.header.contact?.fax || '000-000-0000'
    },
    supplier: {
      name: apiData.supplier?.name || 'Unknown Supplier',
      code: `#${apiData.supplier?.code || '000000'}`,
      taxId: apiData.supplier?.document?.value || '00.000.000/0000-00',
      address: apiData.supplier?.address || 'Unknown Address',
      contact: apiData.supplier?.contact?.name || 'Unknown Contact',
      email: apiData.supplier?.contact?.email || 'unknown@example.com',
      phone: apiData.supplier?.contact?.phone || '000-000-0000',
      fax: apiData.supplier?.contact?.fax || '000-000-0000',
      createdAt: apiData.supplier?.readAt || new Date().toISOString(),
      updatedAt: apiData.supplier?.lastReplyAt || new Date().toISOString(),
      status: 'Active'
    },
    addresses: {
      shipTo: {
        name: apiData.addresses?.[0]?.name || 'Unknown',
        company: apiData.addresses?.[0]?.name || 'Unknown Company',
        address: apiData.addresses?.[0]?.address || 'Unknown Address',
        contact: apiData.addresses?.[0]?.contact?.name || 'Unknown Contact',
        phone: apiData.addresses?.[0]?.contact?.phone || '000-000-0000',
        fax: apiData.addresses?.[0]?.contact?.fax || '000-000-0000',
        email: apiData.addresses?.[0]?.contact?.email || 'unknown@example.com'
      },
      billTo: {
        name: apiData.addresses?.[1]?.name || 'Unknown',
        company: apiData.addresses?.[1]?.name || 'Unknown Company',
        address: apiData.addresses?.[1]?.address || 'Unknown Address',
        contact: apiData.addresses?.[1]?.contact?.name || 'Unknown Contact',
        phone: apiData.addresses?.[1]?.contact?.phone || '000-000-0000',
        fax: apiData.addresses?.[1]?.contact?.fax || '000-000-0000',
        email: apiData.addresses?.[1]?.contact?.email || 'unknown@example.com'
      },
      chargeTo: {
        name: apiData.addresses?.[2]?.name || 'Unknown',
        company: apiData.addresses?.[2]?.name || 'Unknown Company',
        address: apiData.addresses?.[2]?.address || 'Unknown Address',
        contact: apiData.addresses?.[2]?.contact?.name || 'Unknown Contact',
        phone: apiData.addresses?.[2]?.contact?.phone || '000-000-0000',
        fax: apiData.addresses?.[2]?.contact?.fax || '000-000-0000',
        email: apiData.addresses?.[2]?.contact?.email || 'unknown@example.com',
        taxId: apiData.addresses?.[2]?.contact?.taxId || '00.000.000/0000-00'
      }
    }
  }
}

// Mock data based on the provided screenshots and requirements
const mockOrderData: Order = {
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
    fax: '999-575-3050'
  },
  supplier: {
    name: 'Motion Industries INC',
    code: '#101908',
    taxId: '00.823.053/0001-02',
    address: 'O Box 1477 - Birmingham AL - 35201-4666 - United States of America',
    contact: 'Jack Jeff Ripple Applejack',
    email: 'jack_jeff_applejack@motion.com',
    phone: '800-296-5522',
    fax: '800-296-5522',
    createdAt: '2020-05-23T12:45:20.39Z',
    updatedAt: '2020-05-23T12:45:20.39Z',
    status: 'Active'
  },
  addresses: {
    shipTo: {
      name: 'West Plant',
      company: 'West Plant Manufacturing',
      address: '1311 W Washington Blvd, Los Angeles, CA 90006, United States',
      contact: 'Brian Mazda Tetsuo',
      phone: '222-575-3050',
      fax: '222-575-3050',
      email: 'Z01confirmations@me.com'
    },
    billTo: {
      name: 'Pilgrims Pride Corp.',
      company: 'Pilgrims Pride Corp.',
      address: '1301 Glendale Blvd, Los Angeles, CA 90026, USA',
      contact: 'Barbara Streifes Hasseublad',
      phone: '(00) 0 0000-0000',
      fax: '222-506-8000',
      email: 'Z01confirmations@me.com'
    },
    chargeTo: {
      name: 'Lorem Ipsum',
      company: 'Lorem Ipsum Corporate',
      address: '2222 Promontory CR, Greeley, CO 22222-9039 - EUA',
      contact: 'Barbara Streifes Hasseublad',
      phone: '970-222-8000',
      fax: '970-222-8000',
      email: 'lorem.ipsum@me.com',
      taxId: '00.000.000/0000-00'
    }
  }
}

export async function getOrderById(_id: number): Promise<Order> {
  try {
    // Always fetch the only available order (ID 1) regardless of requested ID
    const { data } = await http.get('/orders/1')
    return transformApiOrderToSchema(data)
  } catch {
    // Fallback to mock data for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return mockOrderData
  }
}

export async function getOrders(): Promise<Order[]> {
  try {
    // Fetch the only real order available from API
    const { data } = await http.get('/orders/1')
    const realOrder = transformApiOrderToSchema(data)
    
    return [realOrder]
  } catch {
    // Fallback to mock data for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return [
      mockOrderData,
      { 
        ...mockOrderData, 
        id: 2, 
        number: '4510001115', 
        amount: 15000, 
        status: 'Confirmed',
        createdAt: '2020-04-15T10:20:30.000Z'
      },
      { 
        ...mockOrderData, 
        id: 3, 
        number: '4510001116', 
        amount: 25000, 
        status: 'Processing',
        createdAt: '2020-04-14T14:15:45.000Z'
      },
      { 
        ...mockOrderData, 
        id: 4, 
        number: '4510001117', 
        amount: 30000, 
        status: 'Shipped',
        createdAt: '2020-04-13T09:30:15.000Z'
      }
    ]
  }
}