<template>
  <div class="contact-info">
    <component 
      :is="icon" 
      v-if="icon"
      class="contact-info__icon" 
    />
    <div class="contact-info__content">
      <span class="contact-info__primary">
        {{ primary }}
      </span>
      <span
        v-if="secondary"
        class="contact-info__secondary"
      >
        ({{ secondary }})
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FunctionalComponent } from 'vue'

interface Props {
  icon?: FunctionalComponent
  primary: string
  secondary?: string
}

defineProps<Props>()
</script>

<style scoped>
.contact-info {
  @apply flex items-start gap-2 text-sm;
}

.contact-info__icon {
  @apply h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0;
}

.contact-info__content {
  @apply min-w-0 flex-1;
}

.contact-info__primary {
  @apply break-words text-gray-700;
}

.contact-info__secondary {
  @apply text-gray-500 ml-2;
}
</style>