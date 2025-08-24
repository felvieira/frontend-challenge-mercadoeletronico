<template>
  <div class="empty-state">
    <div class="empty-state__content">
      <component 
        :is="icon" 
        v-if="icon"
        class="empty-state__icon" 
      />
      <h3 class="empty-state__title">
        {{ title }}
      </h3>
      <p
        v-if="message"
        class="empty-state__message"
      >
        {{ message }}
      </p>
      
      <div
        v-if="$slots.actions"
        class="empty-state__actions"
      >
        <slot name="actions" />
      </div>
      
      <button
        v-else-if="actionText && actionHandler"
        class="empty-state__button"
        type="button"
        @click="actionHandler"
      >
        {{ actionText }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FunctionalComponent } from 'vue'

interface Props {
  icon?: FunctionalComponent
  title: string
  message?: string
  actionText?: string
  actionHandler?: () => void
}

defineProps<Props>()
</script>

<style scoped>
.empty-state {
  @apply text-center;
}

.empty-state__content {
  @apply max-w-md mx-auto;
}

.empty-state__icon {
  @apply h-16 w-16 text-gray-400 mx-auto mb-4;
}

.empty-state__title {
  @apply text-2xl font-semibold text-gray-900 mb-2;
}

.empty-state__message {
  @apply text-gray-600 mb-6;
}

.empty-state__actions {
  @apply mt-6;
}

.empty-state__button {
  @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md;
  @apply text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500;
  @apply transition-colors duration-200;
}

.empty-state__button:disabled {
  @apply bg-gray-300 cursor-not-allowed;
}
</style>