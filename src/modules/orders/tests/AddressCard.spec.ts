import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AddressCard from '../components/AddressCard.vue'
import type { OrderAddress } from '../types/order'
import { TruckIcon, DocumentTextIcon } from '@heroicons/vue/24/outline'

const mockAddress: OrderAddress = {
  name: 'West Plant',
  company: 'West Plant Manufacturing',
  address: '1311 W Washington Blvd, Los Angeles, CA 90006, United States',
  contact: 'Brian Mazda Tetsuo',
  phone: '222-575-3050',
  fax: '222-575-3050',
  email: 'Z01confirmations@me.com',
  taxId: '00.000.000/0000-00'
}

const createWrapper = (props = {}) => mount(AddressCard, {
  props: {
    title: 'Ship to',
    address: mockAddress,
    icon: TruckIcon,
    ...props
  },
})

describe('AddressCard', () => {
  it('renders with title and icon', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('Ship to')
    expect(wrapper.find('[class*="text-blue-600"]').exists()).toBe(true)
  })

  it('displays all address information when available', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('West Plant')
    expect(wrapper.text()).toContain('West Plant Manufacturing')
    expect(wrapper.text()).toContain('1311 W Washington Blvd, Los Angeles')
    expect(wrapper.text()).toContain('Brian Mazda Tetsuo')
    expect(wrapper.text()).toContain('Z01confirmations@me.com')
    expect(wrapper.text()).toContain('(222) 575-3050')
    expect(wrapper.text()).toContain('00.000.000/0000-00')
  })

  it('shows "No information available" when address is not provided', () => {
    const wrapper = createWrapper({ address: undefined })
    
    expect(wrapper.text()).toContain('No information available')
    expect(wrapper.text()).not.toContain('Company')
  })

  it('shows "No information available" when address is null', () => {
    const wrapper = createWrapper({ address: null })
    
    expect(wrapper.text()).toContain('No information available')
  })

  it('displays field labels correctly', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('Company')
    expect(wrapper.text()).toContain('Address')
    expect(wrapper.text()).toContain('Contact')
    expect(wrapper.text()).toContain('Email')
    expect(wrapper.text()).toContain('Phone')
    expect(wrapper.text()).toContain('Fax')
    expect(wrapper.text()).toContain('Tax ID')
  })

  it('handles partial address information', () => {
    const partialAddress = {
      name: 'Test Location',
      company: 'Test Company'
      // missing other fields
    }
    
    const wrapper = createWrapper({ address: partialAddress })
    
    expect(wrapper.text()).toContain('Test Location')
    expect(wrapper.text()).toContain('Test Company')
    expect(wrapper.text()).not.toContain('Email')
    expect(wrapper.text()).not.toContain('Phone')
  })

  it('uses different icons correctly', () => {
    const wrapper = createWrapper({ 
      title: 'Bill to',
      icon: DocumentTextIcon 
    })
    
    expect(wrapper.text()).toContain('Bill to')
    // Icon should be rendered (though we can't easily test the specific icon in this setup)
  })

  it('uses default icon when none provided', () => {
    const wrapper = mount(AddressCard, {
      props: {
        title: 'Test Address',
        address: mockAddress
        // no icon provided, should use default MapPinIcon
      },
    })
    
    expect(wrapper.text()).toContain('Test Address')
  })

  it('formats phone numbers correctly', () => {
    const wrapper = createWrapper()
    
    // Check if phone number is displayed
    expect(wrapper.text()).toContain('222')
    expect(wrapper.text()).toContain('575')
    expect(wrapper.text()).toContain('3050')
  })

  it('handles empty address fields gracefully', () => {
    const addressWithEmptyFields = {
      name: '',
      company: 'Test Company',
      address: '',
      contact: undefined,
      phone: null,
      email: ''
    }
    
    const wrapper = createWrapper({ address: addressWithEmptyFields })
    
    expect(wrapper.text()).toContain('Test Company')
    expect(wrapper.text()).not.toContain('Contact:')
    expect(wrapper.text()).not.toContain('Phone:')
    expect(wrapper.text()).not.toContain('Email:')
  })

  it('has proper card structure', () => {
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

  it('applies responsive padding correctly', () => {
    const wrapper = createWrapper()
    
    const header = wrapper.find('.px-4')
    expect(header.classes()).toContain('sm:px-6')
    
    const content = wrapper.find('.p-4')
    expect(content.classes()).toContain('sm:p-6')
  })

  it('shows icons for each field type', () => {
    const wrapper = createWrapper()
    
    // Check that icons are present by looking for icon-related classes
    expect(wrapper.find('[class*="h-4"]').exists()).toBe(true)
    expect(wrapper.find('[class*="w-4"]').exists()).toBe(true)
    expect(wrapper.find('[class*="text-gray-400"]').exists()).toBe(true)
  })
})