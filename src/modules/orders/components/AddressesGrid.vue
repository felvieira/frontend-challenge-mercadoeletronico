<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <AddressCard
      title="Ship to"
      :address="addresses?.shipTo"
      :icon="TruckIcon"
    />
    <AddressCard
      title="Bill to"
      :address="addresses?.billTo"
      :icon="DocumentTextIcon"
    />
    <AddressCard
      title="Charge to"
      :address="addresses?.chargeTo"
      :icon="CreditCardIcon"
    />
  </div>
</template>

<script setup lang="ts">
import { 
  TruckIcon,
  DocumentTextIcon,
  CreditCardIcon
} from '@heroicons/vue/24/outline'
import AddressCard from './AddressCard.vue'
import type { OrderAddresses } from '../types/order'

interface Props {
  addresses?: OrderAddresses
}

defineProps<Props>()
</script>