import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import NotFound from '../NotFound.vue'

const createWrapper = () => mount(NotFound, {
  global: {
    stubs: {
      RouterLink: {
        template: '<a class="router-link" :href="to"><slot /></a>',
        props: ['to']
      }
    }
  }
})

describe('NotFound', () => {
  it('renders correctly', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.exists()).toBe(true)
  })

  it('displays 404 heading', () => {
    const wrapper = createWrapper()
    
    const heading = wrapper.find('h1')
    expect(heading.exists()).toBe(true)
    expect(heading.text()).toBe('404')
  })

  it('displays "Page not found" message', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('Page not found')
  })

  it('provides link to orders page', () => {
    const wrapper = createWrapper()
    
    const routerLink = wrapper.find('.router-link')
    expect(routerLink.exists()).toBe(true)
    expect(routerLink.attributes('href')).toBe('/orders')
    expect(routerLink.text()).toContain('Go to Orders')
  })

  it('applies correct layout and styling', () => {
    const wrapper = createWrapper()
    
    // Should be full screen centered
    const container = wrapper.find('.min-h-screen')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('flex')
    expect(container.classes()).toContain('items-center')
    expect(container.classes()).toContain('justify-center')
    expect(container.classes()).toContain('bg-gray-50')
  })

  it('centers content properly', () => {
    const wrapper = createWrapper()
    
    const textCenter = wrapper.find('.text-center')
    expect(textCenter.exists()).toBe(true)
  })

  it('applies correct typography styles', () => {
    const wrapper = createWrapper()
    
    // Check 404 heading
    const h1 = wrapper.find('h1')
    expect(h1.classes()).toContain('text-4xl')
    expect(h1.classes()).toContain('font-bold')
    expect(h1.classes()).toContain('text-gray-900')
    expect(h1.classes()).toContain('mb-4')
    
    // Check "Page not found" text
    const description = wrapper.find('p')
    expect(description.classes()).toContain('text-xl')
    expect(description.classes()).toContain('text-gray-600')
    expect(description.classes()).toContain('mb-8')
  })

  it('styles the action button correctly', () => {
    const wrapper = createWrapper()
    
    const routerLink = wrapper.find('.router-link')
    expect(routerLink.classes()).toContain('px-6')
    expect(routerLink.classes()).toContain('py-3')
    expect(routerLink.classes()).toContain('bg-blue-600')
    expect(routerLink.classes()).toContain('text-white')
    expect(routerLink.classes()).toContain('rounded-md')
    expect(routerLink.classes()).toContain('hover:bg-blue-700')
    expect(routerLink.classes()).toContain('transition-colors')
  })

  it('has proper content hierarchy', () => {
    const wrapper = createWrapper()
    
    // Should have h1, p, and RouterLink in order
    const elements = wrapper.findAll('h1, p, a')
    expect(elements.length).toBeGreaterThanOrEqual(3)
  })

  it('uses semantic HTML structure', () => {
    const wrapper = createWrapper()
    
    // Should have proper heading hierarchy
    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBe(true)
    
    // Should have descriptive paragraph
    const p = wrapper.find('p')
    expect(p.exists()).toBe(true)
    
    // Should have actionable link
    const link = wrapper.find('.router-link')
    expect(link.exists()).toBe(true)
  })

  it('provides clear user guidance', () => {
    const wrapper = createWrapper()
    
    // Should clearly indicate this is a 404 error
    expect(wrapper.text()).toContain('404')
    
    // Should explain what happened
    expect(wrapper.text()).toContain('Page not found')
    
    // Should provide a way forward
    expect(wrapper.text()).toContain('Go to Orders')
  })

  it('maintains consistent spacing', () => {
    const wrapper = createWrapper()
    
    // Check for proper margin classes
    const h1 = wrapper.find('h1')
    expect(h1.classes()).toContain('mb-4')
    
    const p = wrapper.find('p')
    expect(p.classes()).toContain('mb-8')
  })

  it('handles full viewport height', () => {
    const wrapper = createWrapper()
    
    const container = wrapper.find('div')
    expect(container.classes()).toContain('min-h-screen')
  })

  it('uses appropriate color scheme', () => {
    const wrapper = createWrapper()
    
    // Background should be light gray
    const container = wrapper.find('.bg-gray-50')
    expect(container.exists()).toBe(true)
    
    // Text colors should provide good contrast
    const h1 = wrapper.find('.text-gray-900')
    expect(h1.exists()).toBe(true)
    
    const p = wrapper.find('.text-gray-600')
    expect(p.exists()).toBe(true)
  })

  it('works without router', () => {
    // Test that component doesn't crash if router isn't available
    const wrapper = mount(NotFound, {
      global: {
        stubs: ['RouterLink']
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('404')
  })
})