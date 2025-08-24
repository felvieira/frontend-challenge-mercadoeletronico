<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
      <div class="mb-4 sm:mb-6">
        <RouterLink 
          to="/orders" 
          class="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon class="h-4 w-4 mr-2" />
          Back to Orders
        </RouterLink>
      </div>

      <ErrorState
        v-if="error"
        title="Failed to load order details"
        message="Please try again later."
        @retry="refetch"
      />

      <template v-else-if="isLoading">
        <div class="space-y-6 sm:space-y-8">
          <div class="h-40 sm:h-48 w-full bg-gray-200 animate-pulse rounded-lg" />
          <div class="h-48 sm:h-64 w-full bg-gray-200 animate-pulse rounded-lg" />
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div class="h-48 sm:h-64 bg-gray-200 animate-pulse rounded-lg" />
            <div class="h-48 sm:h-64 bg-gray-200 animate-pulse rounded-lg" />
            <div class="h-48 sm:h-64 bg-gray-200 animate-pulse rounded-lg" />
          </div>
        </div>
      </template>

      <div
        v-else-if="data"
        class="space-y-6 sm:space-y-8"
      >
        <OrderHeader :order="data" />
        
        <SupplierCard :supplier="data.supplier" />

        <div>
          <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <MapPinIcon class="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            Addresses
          </h2>
          <AddressesGrid :addresses="data.addresses" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeftIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import { useOrder } from '../composables/useOrders'
import OrderHeader from '../components/OrderHeader.vue'
import SupplierCard from '../components/SupplierCard.vue'
import AddressesGrid from '../components/AddressesGrid.vue'
import ErrorState from '@/shared/components/ErrorState.vue'

interface Props {
  id?: string
}

const props = defineProps<Props>()

const orderId = computed(() => props.id ? parseInt(props.id, 10) : 1)
const { data, isLoading, error, refetch } = useOrder(orderId.value)
</script>