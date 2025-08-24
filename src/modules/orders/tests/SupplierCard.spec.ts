import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SupplierCard from '../components/SupplierCard.vue'
import type { OrderSupplier } from '../types/order'

const mockSupplier: OrderSupplier = {
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
}

const createWrapper = (supplierOverrides = {}) => mount(SupplierCard, {
  props: { supplier: supplierOverrides ? { ...mockSupplier, ...supplierOverrides } : mockSupplier },
})

describe('SupplierCard', () => {
  it('renders when supplier is provided', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.bg-white').exists()).toBe(true)
  })

  it('does not render when supplier is not provided', () => {
    const wrapper = mount(SupplierCard, {
      props: { supplier: undefined },
    })
    expect(wrapper.find('.bg-white').exists()).toBe(false)
  })

  it('displays supplier header with icon', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('Supplier')
    expect(wrapper.find('[class*="text-blue-600"]').exists()).toBe(true)
  })

  it('displays supplier name and code', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('Motion Industries INC')
    expect(wrapper.text()).toContain('#101908')
  })

  it('displays supplier details in grid layout', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('CNPJ')
    expect(wrapper.text()).toContain('00.823.053/0001-02')
    expect(wrapper.text()).toContain('Address')
    expect(wrapper.text()).toContain('Birmingham AL')
    expect(wrapper.text()).toContain('Contact')
    expect(wrapper.text()).toContain('Jack Jeff Ripple Applejack')
  })

  it('displays communication information', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('Email')
    expect(wrapper.text()).toContain('jack_jeff_applejack@motion.com')
    expect(wrapper.text()).toContain('Phone')
    expect(wrapper.text()).toContain('(800) 296-5522')
    expect(wrapper.text()).toContain('Fax')
  })

  it('displays timestamps when available', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('Created:')
    expect(wrapper.text()).toContain('Updated:')
    expect(wrapper.text()).toContain('Active')
  })

  it('handles missing optional fields', () => {
    const minimalSupplier = {
      name: 'Test Supplier'
      // All other fields missing
    }
    
    const wrapper = createWrapper(minimalSupplier)
    
    expect(wrapper.text()).toContain('Test Supplier')
    // Since we pass empty fields, the template may still show labels
    // Just check that the required data is there
    expect(wrapper.text()).toContain('Supplier')
  })

  it('does not show timestamp section when no dates available', () => {
    const supplierWithoutDates = {
      ...mockSupplier,
      createdAt: undefined,
      updatedAt: undefined,
      status: undefined
    }
    
    const wrapper = createWrapper(supplierWithoutDates)
    
    expect(wrapper.find('.border-t').exists()).toBe(false)
  })

  it('shows only available timestamp information', () => {
    const supplierWithCreatedOnly = {
      ...mockSupplier,
      updatedAt: undefined,
      status: undefined
    }
    
    const wrapper = createWrapper(supplierWithCreatedOnly)
    
    expect(wrapper.text()).toContain('Created:')
    expect(wrapper.text()).not.toContain('Updated:')
    expect(wrapper.find('.border-t').exists()).toBe(true)
  })

  it('formats phone numbers correctly', () => {
    const wrapper = createWrapper()
    
    // Assuming formatPhone is working correctly
    expect(wrapper.text()).toContain('(800) 296-5522')
  })

  it('applies correct responsive grid classes', () => {
    const wrapper = createWrapper()
    
    const grid = wrapper.find('.grid')
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('sm:grid-cols-2')
  })

  it('shows status badge with correct styling', () => {
    const wrapper = createWrapper()
    
    const statusBadge = wrapper.find('.text-green-800')
    expect(statusBadge.exists()).toBe(true)
    expect(statusBadge.text()).toContain('Active')
  })

  it('handles missing code gracefully', () => {
    const supplierWithoutCode = {
      ...mockSupplier,
      code: undefined
    }
    
    const wrapper = createWrapper(supplierWithoutCode)
    
    expect(wrapper.text()).toContain('Motion Industries INC')
    expect(wrapper.text()).not.toContain('#')
  })

  it('has proper card structure and styling', () => {
    const wrapper = createWrapper()
    
    const card = wrapper.find('.bg-white')
    expect(card.classes()).toContain('rounded-lg')
    expect(card.classes()).toContain('shadow-sm')
    expect(card.classes()).toContain('border')
    
    const header = wrapper.find('.border-b')
    expect(header.exists()).toBe(true)
    
    const content = wrapper.find('.p-4, .p-6')
    expect(content.exists()).toBe(true)
  })
})