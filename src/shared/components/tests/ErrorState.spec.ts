import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ErrorState from '../ErrorState.vue'

const createWrapper = (props = {}) => mount(ErrorState, {
  props: {
    title: 'Test Error',
    message: 'Test error message',
    showRetry: true,
    ...props
  },
})

describe('ErrorState', () => {
  it('renders with default props', () => {
    const wrapper = mount(ErrorState)
    
    expect(wrapper.text()).toContain('Something went wrong')
    expect(wrapper.text()).toContain('Please try again later.')
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('displays custom title and message', () => {
    const wrapper = createWrapper({
      title: 'Custom Error Title',
      message: 'Custom error message here'
    })
    
    expect(wrapper.text()).toContain('Custom Error Title')
    expect(wrapper.text()).toContain('Custom error message here')
  })

  it('shows retry button by default', () => {
    const wrapper = createWrapper()
    
    const retryButton = wrapper.find('button')
    expect(retryButton.exists()).toBe(true)
    expect(retryButton.text()).toContain('Try Again')
  })

  it('hides retry button when showRetry is false', () => {
    const wrapper = createWrapper({ showRetry: false })
    
    const retryButton = wrapper.find('button')
    expect(retryButton.exists()).toBe(false)
  })

  it('emits retry event when retry button is clicked', async () => {
    const wrapper = createWrapper()
    
    const retryButton = wrapper.find('button')
    await retryButton.trigger('click')
    
    expect(wrapper.emitted('retry')).toBeTruthy()
    expect(wrapper.emitted('retry')).toHaveLength(1)
  })

  it('displays error icon', () => {
    const wrapper = createWrapper()
    
    // Check for icon by looking for the red icon container
    const iconContainer = wrapper.find('.text-red-500')
    expect(iconContainer.exists()).toBe(true)
    
    // Check for icon dimensions
    const icon = wrapper.find('.h-12.w-12')
    expect(icon.exists()).toBe(true)
  })

  it('applies correct styling classes', () => {
    const wrapper = createWrapper()
    
    // Check main container
    const container = wrapper.find('.flex')
    expect(container.classes()).toContain('flex-col')
    expect(container.classes()).toContain('items-center')
    expect(container.classes()).toContain('justify-center')
    
    // Check icon styling
    const iconContainer = wrapper.find('.text-red-500')
    expect(iconContainer.exists()).toBe(true)
    
    // Check title styling
    const title = wrapper.find('h3')
    expect(title.classes()).toContain('text-lg')
    expect(title.classes()).toContain('font-medium')
    expect(title.classes()).toContain('text-gray-900')
    
    // Check button styling
    const button = wrapper.find('button')
    expect(button.classes()).toContain('px-4')
    expect(button.classes()).toContain('py-2')
    expect(button.classes()).toContain('bg-blue-600')
  })

  it('handles empty title gracefully', () => {
    const wrapper = createWrapper({ title: '' })
    
    expect(wrapper.text()).toContain('Something went wrong') // Default title
  })

  it('handles empty message gracefully', () => {
    const wrapper = createWrapper({ message: '' })
    
    expect(wrapper.text()).toContain('Please try again later.') // Default message
  })

  it('handles undefined title and message', () => {
    const wrapper = createWrapper({ 
      title: undefined, 
      message: undefined 
    })
    
    expect(wrapper.text()).toContain('Something went wrong')
    expect(wrapper.text()).toContain('Please try again later.')
  })

  it('is accessible with proper semantic elements', () => {
    const wrapper = createWrapper()
    
    // Should have heading
    const heading = wrapper.find('h3')
    expect(heading.exists()).toBe(true)
    
    // Should have paragraph for message
    const message = wrapper.find('p')
    expect(message.exists()).toBe(true)
    
    // Button should have proper attributes
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
  })

  it('can be used without any props', () => {
    const wrapper = mount(ErrorState)
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Something went wrong')
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('maintains consistent spacing', () => {
    const wrapper = createWrapper()
    
    // Check for proper spacing classes
    expect(wrapper.find('.p-8').exists()).toBe(true)
    expect(wrapper.find('.text-center').exists()).toBe(true)
    expect(wrapper.find('.mb-4').exists()).toBe(true)
    expect(wrapper.find('.mb-2').exists()).toBe(true)
  })

  it('supports long error messages', () => {
    const longMessage = 'This is a very long error message that should wrap properly and still maintain good readability and spacing within the error state component.'
    
    const wrapper = createWrapper({ message: longMessage })
    
    expect(wrapper.text()).toContain(longMessage)
  })

  it('supports long error titles', () => {
    const longTitle = 'This is a Very Long Error Title That Should Display Properly'
    
    const wrapper = createWrapper({ title: longTitle })
    
    expect(wrapper.text()).toContain(longTitle)
  })
})