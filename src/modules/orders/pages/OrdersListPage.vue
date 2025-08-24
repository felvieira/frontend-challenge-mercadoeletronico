<template>
  <div class="orders-page">
    <div class="orders-page__container">
      <header class="orders-page__header">
        <div class="orders-page__title-group">
          <ShoppingCartIcon class="orders-page__icon" />
          <h1 class="orders-page__title">
            Orders
          </h1>
        </div>
        <p class="orders-page__subtitle">
          Manage and track your orders
        </p>
      </header>

      <ErrorState
        v-if="error"
        title="Failed to load orders"
        message="Please try again later."
        class="orders-page__error"
        @retry="refetch"
      />

      <main class="orders-page__content">
        <LoadingSkeleton
          v-if="isLoading"
          :count="4"
          class="orders-page__grid"
        />
        
        <div
          v-else-if="data && data.length > 0"
          class="orders-page__grid"
        >
          <OrderCard
            v-for="order in data"
            :key="`order-${order.id}`"
            :order="order"
            class="orders-page__card"
          />
        </div>

        <EmptyState
          v-else-if="!isLoading && (!data || data.length === 0)"
          :icon="ShoppingCartIcon"
          title="No orders found"
          message="There are no orders to display at the moment."
          class="orders-page__empty"
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { useOrders } from '../composables/useOrders'
import OrderCard from '../components/OrderCard.vue'
import ErrorState from '@/shared/components/ErrorState.vue'
import LoadingSkeleton from '@/shared/components/LoadingSkeleton.vue'
import EmptyState from '@/shared/components/EmptyState.vue'

const { data, isLoading, error, refetch } = useOrders()
</script>

<style scoped>
.orders-page {
  @apply min-h-screen bg-gray-50;
}

.orders-page__container {
  @apply container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl;
}

.orders-page__header {
  @apply mb-6 sm:mb-8;
}

.orders-page__title-group {
  @apply flex items-center gap-2 sm:gap-3 mb-2;
}

.orders-page__icon {
  @apply h-6 w-6 sm:h-8 sm:w-8 text-blue-600;
}

.orders-page__title {
  @apply text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900;
}

.orders-page__subtitle {
  @apply text-base sm:text-lg lg:text-xl text-gray-600;
}

.orders-page__error {
  @apply mb-6;
}

.orders-page__content {
  @apply min-h-0;
}

.orders-page__grid {
  @apply grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6;
}

.orders-page__card {
  @apply transform transition-transform duration-200;
}

.orders-page__empty {
  @apply py-16;
}
</style>