<template>
  <div class="loading-skeleton">
    <div 
      v-for="i in count" 
      :key="i" 
      class="loading-skeleton__item"
      :class="itemClass"
    >
      <div 
        v-if="showAvatar"
        class="loading-skeleton__avatar"
      />
      <div class="loading-skeleton__content">
        <div 
          v-for="line in lines"
          :key="line"
          class="loading-skeleton__line"
          :class="getLineClass(line)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  count?: number
  lines?: number
  showAvatar?: boolean
  variant?: 'card' | 'list' | 'table'
  itemClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  count: 3,
  lines: 3,
  showAvatar: false,
  variant: 'card',
  itemClass: ''
})

const getLineClass = (lineNumber: number) => {
  const baseClass = 'loading-skeleton__line'
  
  if (lineNumber === 1) return `${baseClass}--title`
  if (lineNumber === props.lines) return `${baseClass}--short`
  
  return baseClass
}
</script>

<style scoped>
.loading-skeleton {
  @apply space-y-4;
}

.loading-skeleton__item {
  @apply bg-white rounded-lg p-4 shadow animate-pulse;
}

.loading-skeleton__item--list {
  @apply flex items-center space-x-4;
}

.loading-skeleton__avatar {
  @apply w-12 h-12 bg-gray-200 rounded-full flex-shrink-0;
}

.loading-skeleton__content {
  @apply space-y-2 flex-1;
}

.loading-skeleton__line {
  @apply h-4 bg-gray-200 rounded;
}

.loading-skeleton__line--title {
  @apply h-6 w-3/4;
}

.loading-skeleton__line--short {
  @apply w-1/2;
}

@media (prefers-reduced-motion: reduce) {
  .loading-skeleton__item {
    animation: none;
  }
}
</style>