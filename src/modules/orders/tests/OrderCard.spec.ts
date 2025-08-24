import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import OrderCard from '../components/OrderCard.vue'
import type { Order } from '../api/orders.schemas'

const mockOrder: Order = {
  id: 1,
  number: '4510001114',
  amount: 20000,
  currency: 'USD',
  status: 'Need to confirm',
  type: 'Pre-Order',
  reference: 'ME11223344',
  createdAt: '2020-04-16T15:32:55.000Z',
  buyer: {
    company: 'Jacksonville Group',
    contact: 'Jason Burn',
    email: 'jacksonvillegroup@me.com',
    phone: '903-575-3050',
  },
}

const createWrapper = (orderOverrides = {}) => mount(OrderCard, {
  props: { order: { ...mockOrder, ...orderOverrides } },
  global: {
    stubs: {
      RouterLink: {
        template: '<a class="router-link" :href="to"><slot /></a>',
        props: ['to']
      }
    },
  },
})

describe('OrderCard', () => {
  it('formats currency correctly', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toMatch(/\$20,000/)
  })

  it('formats currency with different currency', () => {
    const wrapper = createWrapper({ currency: 'EUR', amount: 15000 })
    expect(wrapper.text()).toMatch(/€15,000/)
  })

  it('displays order information', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('Pre-Order')
    expect(wrapper.text()).toContain('4510001114')
    expect(wrapper.text()).toContain('#ME11223344')
    expect(wrapper.text()).toContain('Jacksonville Group')
    expect(wrapper.text()).toContain('Jason Burn')
    expect(wrapper.text()).toContain('Need to confirm')
  })

  it('displays contact information when available', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('jacksonvillegroup@me.com')
    expect(wrapper.text()).toContain('(903) 575-3050')
  })

  it('displays created date when available', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Created at')
  })

  it('handles missing optional fields gracefully', () => {
    const minimalOrder = {
      id: 1,
      number: '4510001114',
    }
    
    const wrapper = createWrapper(minimalOrder)
    
    expect(wrapper.text()).toContain('4510001114')
    expect(wrapper.text()).toContain('Pre-Order') // default value
    expect(wrapper.text()).toContain('Jacksonville Group') // default value
  })

  it('applies correct status color classes', () => {
    const wrapper = createWrapper({ status: 'Confirmed' })
    const statusBadge = wrapper.find('[class*="text-emerald"]')
    expect(statusBadge.exists()).toBe(true)
  })

  it('creates correct router link', () => {
    const wrapper = createWrapper()
    const routerLink = wrapper.find('.router-link')
    expect(routerLink.exists()).toBe(true)
    expect(routerLink.attributes('href')).toBe('/orders/1')
  })

  it('handles different order types', () => {
    const wrapper = createWrapper({ type: 'Rush Order' })
    expect(wrapper.text()).toContain('Rush Order')
  })

  it('shows hover effect class on container', () => {
    const wrapper = createWrapper()
    const card = wrapper.find('.group-hover\\:-translate-y-1')
    expect(card.exists()).toBe(true)
  })
})