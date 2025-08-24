<template>
  <span :class="badgeClasses">
    {{ type }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type: string
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'sm'
})

const badgeClasses = computed(() => {
  const base = 'inline-flex items-center rounded-full font-medium'
  
  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  }
  
  const variants = {
    primary: 'bg-blue-600 text-white',
    success: 'border border-emerald-600 text-emerald-600 bg-white',
    warning: 'border border-yellow-600 text-yellow-600 bg-white',
    danger: 'border border-red-600 text-red-600 bg-white',
    info: 'border border-blue-600 text-blue-600 bg-white',
    default: 'border border-gray-500 text-gray-500 bg-white'
  }
  
  return [
    base,
    sizes[props.size],
    variants[props.variant]
  ].join(' ')
})
</script>