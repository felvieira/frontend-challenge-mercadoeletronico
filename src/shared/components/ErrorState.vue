<template>
  <div class="flex flex-col items-center justify-center p-8 text-center">
    <div class="text-red-500 mb-4">
      <ExclamationTriangleIcon class="h-12 w-12" />
    </div>
    <h3 class="text-lg font-medium text-gray-900 mb-2">
      {{ title || 'Something went wrong' }}
    </h3>
    <p class="text-gray-600 mb-4">
      {{ message || 'Please try again later.' }}
    </p>
    <button
      v-if="showRetry"
      @click="$emit('retry')"
      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
      Try Again
    </button>
  </div>
</template>

<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

interface Props {
  title?: string
  message?: string
  showRetry?: boolean
}

withDefaults(defineProps<Props>(), {
  showRetry: true
})

defineEmits<{
  retry: []
}>()
</script>