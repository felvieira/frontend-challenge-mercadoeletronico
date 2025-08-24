import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import LoadingSpinner from '../LoadingSpinner.vue'

describe('LoadingSpinner', () => {
  it('renders correctly', () => {
    const wrapper = mount(LoadingSpinner)
    
    expect(wrapper.exists()).toBe(true)
  })

  it('displays spinner with correct structure', () => {
    const wrapper = mount(LoadingSpinner)
    
    // Should have outer container
    const container = wrapper.find('.flex')
    expect(container.exists()).toBe(true)
    
    // Should have spinner element
    const spinner = wrapper.find('.animate-spin')
    expect(spinner.exists()).toBe(true)
  })

  it('applies correct CSS classes to container', () => {
    const wrapper = mount(LoadingSpinner)
    
    const container = wrapper.find('.flex')
    expect(container.classes()).toContain('flex')
    expect(container.classes()).toContain('justify-center')
    expect(container.classes()).toContain('items-center')
    expect(container.classes()).toContain('p-8')
  })

  it('applies correct CSS classes to spinner', () => {
    const wrapper = mount(LoadingSpinner)
    
    const spinner = wrapper.find('.animate-spin')
    expect(spinner.classes()).toContain('animate-spin')
    expect(spinner.classes()).toContain('rounded-full')
    expect(spinner.classes()).toContain('h-8')
    expect(spinner.classes()).toContain('w-8')
    expect(spinner.classes()).toContain('border-b-2')
    expect(spinner.classes()).toContain('border-blue-600')
  })

  it('has proper dimensions', () => {
    const wrapper = mount(LoadingSpinner)
    
    const spinner = wrapper.find('.animate-spin')
    expect(spinner.classes()).toContain('h-8')
    expect(spinner.classes()).toContain('w-8')
  })

  it('uses blue color theme', () => {
    const wrapper = mount(LoadingSpinner)
    
    const spinner = wrapper.find('.animate-spin')
    expect(spinner.classes()).toContain('border-blue-600')
  })

  it('is centered properly', () => {
    const wrapper = mount(LoadingSpinner)
    
    const container = wrapper.find('div')
    expect(container.classes()).toContain('justify-center')
    expect(container.classes()).toContain('items-center')
  })

  it('has adequate padding', () => {
    const wrapper = mount(LoadingSpinner)
    
    const container = wrapper.find('div')
    expect(container.classes()).toContain('p-8')
  })

  it('is a single div with spinner inside', () => {
    const wrapper = mount(LoadingSpinner)
    
    const divs = wrapper.findAll('div')
    expect(divs).toHaveLength(2) // Container + spinner
  })

  it('has no text content', () => {
    const wrapper = mount(LoadingSpinner)
    
    expect(wrapper.text().trim()).toBe('')
  })

  it('renders as a visual loading indicator', () => {
    const wrapper = mount(LoadingSpinner)
    
    // Should have spinning animation
    const spinner = wrapper.find('.animate-spin')
    expect(spinner.exists()).toBe(true)
    
    // Should be round (border-radius via rounded-full)
    expect(spinner.classes()).toContain('rounded-full')
  })

  it('maintains consistent appearance', () => {
    // Test that multiple instances render identically
    const wrapper1 = mount(LoadingSpinner)
    const wrapper2 = mount(LoadingSpinner)
    
    expect(wrapper1.html()).toBe(wrapper2.html())
  })

  it('has semantic structure for loading state', () => {
    const wrapper = mount(LoadingSpinner)
    
    // Container should be properly structured for accessibility
    const container = wrapper.find('.flex')
    expect(container.exists()).toBe(true)
    
    // Visual spinner should be present
    const spinner = wrapper.find('.animate-spin')
    expect(spinner.exists()).toBe(true)
  })
})