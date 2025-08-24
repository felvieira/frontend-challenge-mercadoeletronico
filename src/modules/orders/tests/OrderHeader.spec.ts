import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import OrderHeader from '../components/OrderHeader.vue'
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

const createWrapper = (orderOverrides = {}) => mount(OrderHeader, {
  props: { order: { ...mockOrder, ...orderOverrides } },
})

describe('OrderHeader', () => {
  it('renders order header with all information', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('Pre-Order')
    expect(wrapper.text()).toContain('4510001114')
    expect(wrapper.text()).toContain('#ME11223344')
    expect(wrapper.text()).toContain('$20,000')
    expect(wrapper.text()).toContain('Need to confirm')
  })

  it('displays buyer information in grid layout', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('Jacksonville Group')
    expect(wrapper.text()).toContain('Jason Burn')
    expect(wrapper.text()).toContain('jacksonvillegroup@me.com')
    expect(wrapper.text()).toContain('(903) 575-3050')
  })

  it('shows created date when available', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Created at')
    expect(wrapper.text()).toMatch(/04\/16\/2020/)
  })

  it('handles missing created date', () => {
    const wrapper = createWrapper({ createdAt: undefined })
    expect(wrapper.text()).not.toContain('Created at')
  })

  it('displays correct header hierarchy', () => {
    const wrapper = createWrapper()
    const h1 = wrapper.find('h1')
    
    expect(h1.exists()).toBe(true)
    expect(h1.text()).toContain('4510001114')
    expect(h1.classes()).toContain('text-2xl')
    expect(h1.classes()).toContain('font-bold')
  })

  it('shows blue accent bar', () => {
    const wrapper = createWrapper()
    const accentBar = wrapper.find('.bg-blue-600')
    
    expect(accentBar.exists()).toBe(true)
    expect(accentBar.classes()).toContain('w-2')
  })

  it('applies responsive classes correctly', () => {
    const wrapper = createWrapper()
    
    // Check for responsive typography
    const title = wrapper.find('h1')
    expect(title.classes()).toContain('sm:text-3xl')
    
    // Check for responsive padding
    const container = wrapper.find('.p-4')
    expect(container.classes()).toContain('sm:p-6')
  })

  it('handles different currencies correctly', () => {
    const wrapper = createWrapper({ currency: 'EUR', amount: 15000 })
    expect(wrapper.text()).toContain('€15,000')
  })

  it('shows different order types', () => {
    const wrapper = createWrapper({ type: 'Rush Order' })
    expect(wrapper.text()).toContain('Rush Order')
  })

  it('handles missing optional buyer information', () => {
    const wrapper = createWrapper({ 
      buyer: { 
        company: 'Test Company' 
        // missing contact, email, phone
      } 
    })
    
    expect(wrapper.text()).toContain('Test Company')
    expect(wrapper.text()).not.toContain('@')
  })

  it('applies status color classes correctly', () => {
    const confirmedWrapper = createWrapper({ status: 'Confirmed' })
    expect(confirmedWrapper.find('[class*="text-emerald"]').exists()).toBe(true)
    
    const processingWrapper = createWrapper({ status: 'Processing' })
    expect(processingWrapper.find('[class*="text-yellow"]').exists()).toBe(true)
  })

  it('has proper card styling', () => {
    const wrapper = createWrapper()
    const card = wrapper.find('.bg-white')
    
    expect(card.exists()).toBe(true)
    expect(card.classes()).toContain('rounded-lg')
    expect(card.classes()).toContain('shadow-sm')
    expect(card.classes()).toContain('border')
  })
})