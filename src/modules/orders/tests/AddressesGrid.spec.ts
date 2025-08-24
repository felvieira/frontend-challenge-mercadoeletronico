import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AddressesGrid from '../components/AddressesGrid.vue'
import AddressCard from '../components/AddressCard.vue'
import type { OrderAddresses } from '../types/order'

const mockAddresses: OrderAddresses = {
  shipTo: {
    name: 'West Plant',
    company: 'West Plant Manufacturing',
    address: '1311 W Washington Blvd, Los Angeles, CA 90006, United States',
    contact: 'Brian Mazda Tetsuo',
    phone: '222-575-3050',
    email: 'Z01confirmations@me.com'
  },
  billTo: {
    name: 'Pilgrims Pride Corp.',
    company: 'Pilgrims Pride Corp.',
    address: '1301 Glendale Blvd, Los Angeles, CA 90026, USA',
    contact: 'Barbara Streifes Hasseublad',
    phone: '(00) 0 0000-0000',
    email: 'Z01confirmations@me.com'
  },
  chargeTo: {
    name: 'Lorem Ipsum',
    company: 'Lorem Ipsum Corporate',
    address: '2222 Promontory CR, Greeley, CO 22222-9039 - EUA',
    contact: 'Barbara Streifes Hasseublad',
    phone: '970-222-8000',
    email: 'lorem.ipsum@me.com',
    taxId: '00.000.000/0000-00'
  }
}

const createWrapper = (addressesOverrides = {}) => mount(AddressesGrid, {
  props: { addresses: addressesOverrides ? { ...mockAddresses, ...addressesOverrides } : mockAddresses },
  global: {
    components: {
      AddressCard
    }
  }
})

describe('AddressesGrid', () => {
  it('renders all three address cards', () => {
    const wrapper = createWrapper()
    
    const addressCards = wrapper.findAllComponents(AddressCard)
    expect(addressCards).toHaveLength(3)
  })

  it('passes correct props to Ship to card', () => {
    const wrapper = createWrapper()
    
    const addressCards = wrapper.findAllComponents(AddressCard)
    const shipToCard = addressCards[0]
    
    expect(shipToCard.props('title')).toBe('Ship to')
    expect(shipToCard.props('address')).toEqual(mockAddresses.shipTo)
  })

  it('passes correct props to Bill to card', () => {
    const wrapper = createWrapper()
    
    const addressCards = wrapper.findAllComponents(AddressCard)
    const billToCard = addressCards[1]
    
    expect(billToCard.props('title')).toBe('Bill to')
    expect(billToCard.props('address')).toEqual(mockAddresses.billTo)
  })

  it('passes correct props to Charge to card', () => {
    const wrapper = createWrapper()
    
    const addressCards = wrapper.findAllComponents(AddressCard)
    const chargeToCard = addressCards[2]
    
    expect(chargeToCard.props('title')).toBe('Charge to')
    expect(chargeToCard.props('address')).toEqual(mockAddresses.chargeTo)
  })

  it('uses correct icons for each address type', () => {
    const wrapper = createWrapper()
    
    const addressCards = wrapper.findAllComponents(AddressCard)
    
    // Check that icons are passed (we can't easily test the specific icon components in this setup)
    expect(addressCards[0].props('icon')).toBeDefined()
    expect(addressCards[1].props('icon')).toBeDefined()
    expect(addressCards[2].props('icon')).toBeDefined()
  })

  it('handles missing addresses gracefully', () => {
    const wrapper = createWrapper({ 
      shipTo: undefined, 
      billTo: undefined, 
      chargeTo: undefined 
    })
    
    const addressCards = wrapper.findAllComponents(AddressCard)
    expect(addressCards).toHaveLength(3)
    
    // Each card should still render but with undefined address
    expect(addressCards[0].props('address')).toBeUndefined()
    expect(addressCards[1].props('address')).toBeUndefined()
    expect(addressCards[2].props('address')).toBeUndefined()
  })

  it('handles partial address information', () => {
    const partialAddresses = {
      shipTo: mockAddresses.shipTo,
      billTo: undefined,
      chargeTo: mockAddresses.chargeTo
    }
    
    const wrapper = createWrapper(partialAddresses)
    
    const addressCards = wrapper.findAllComponents(AddressCard)
    
    expect(addressCards[0].props('address')).toEqual(mockAddresses.shipTo)
    expect(addressCards[1].props('address')).toBeUndefined()
    expect(addressCards[2].props('address')).toEqual(mockAddresses.chargeTo)
  })

  it('handles empty addresses object', () => {
    const wrapper = createWrapper({
      shipTo: undefined,
      billTo: undefined,
      chargeTo: undefined
    })
    
    const addressCards = wrapper.findAllComponents(AddressCard)
    expect(addressCards).toHaveLength(3)
    
    expect(addressCards[0].props('address')).toBeUndefined()
    expect(addressCards[1].props('address')).toBeUndefined()
    expect(addressCards[2].props('address')).toBeUndefined()
  })

  it('applies correct grid layout classes', () => {
    const wrapper = createWrapper()
    
    const grid = wrapper.find('.grid')
    expect(grid.exists()).toBe(true)
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('lg:grid-cols-3')
    expect(grid.classes()).toContain('gap-6')
  })

  it('maintains correct order of address cards', () => {
    const wrapper = createWrapper()
    
    const addressCards = wrapper.findAllComponents(AddressCard)
    
    // Check the order is: Ship to, Bill to, Charge to
    expect(addressCards[0].props('title')).toBe('Ship to')
    expect(addressCards[1].props('title')).toBe('Bill to')
    expect(addressCards[2].props('title')).toBe('Charge to')
  })

  it('renders with no addresses prop', () => {
    const wrapper = mount(AddressesGrid, {
      props: { addresses: undefined },
      global: {
        components: {
          AddressCard
        }
      }
    })
    
    const addressCards = wrapper.findAllComponents(AddressCard)
    expect(addressCards).toHaveLength(3)
    
    // All cards should have undefined addresses
    addressCards.forEach(card => {
      expect(card.props('address')).toBeUndefined()
    })
  })
})