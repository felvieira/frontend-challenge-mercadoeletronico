<template>
  <RouterLink 
    :to="`/orders/${order.id}`" 
    class="block group"
  >
    <article class="order-card__container">
      <div class="order-card__wrapper">
        <div class="order-card__accent" />
        
        <div class="order-card__content">
          <header class="order-card__header">
            <div class="order-card__header-main">
              <div class="order-card__badges">
                <OrderBadge 
                  :type="order.type || 'Pre-Order'" 
                  variant="primary" 
                />
                <h2 class="order-card__number">
                  {{ order.number }}
                </h2>
              </div>
              <p class="order-card__reference">
                #{{ order.reference || 'ME11223344' }}
              </p>
            </div>
            
            <div class="order-card__header-side">
              <div class="order-card__amount">
                {{ formattedAmount }}
              </div>
              <OrderBadge 
                :type="order.status || 'Need to confirm'" 
                :variant="statusVariant" 
              />
            </div>
          </header>

          <section class="order-card__buyer">
            <ContactInfo 
              :icon="UserIcon"
              :primary="buyerCompany"
              :secondary="buyerContact"
            />
            
            <ContactInfo 
              v-if="order.buyer?.email"
              :icon="EnvelopeIcon"
              :primary="order.buyer.email"
            />
            
            <ContactInfo 
              v-if="order.buyer?.phone"
              :icon="PhoneIcon"
              :primary="formattedPhone"
            />

            <ContactInfo 
              v-if="order.createdAt"
              :icon="ClockIcon"
              :primary="`Created at ${formattedDate}`"
              class="order-card__buyer-footer"
            />
          </section>
        </div>
      </div>
    </article>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  ClockIcon 
} from '@heroicons/vue/24/outline'
import type { Order } from '../api/orders.schemas'
import { formatCurrency, formatPhone, formatDate } from '@/shared/utils/formatters'
import OrderBadge from './OrderBadge.vue'
import ContactInfo from '@/shared/components/ContactInfo.vue'

interface Props {
  order: Order
}

const props = defineProps<Props>()

const formattedAmount = computed(() => 
  formatCurrency(props.order.amount, props.order.currency)
)

const formattedPhone = computed(() => 
  props.order.buyer?.phone ? formatPhone(props.order.buyer.phone) : ''
)

const formattedDate = computed(() => 
  props.order.createdAt ? formatDate(props.order.createdAt) : ''
)

const buyerCompany = computed(() => 
  props.order.buyer?.company || 'Jacksonville Group'
)

const buyerContact = computed(() => 
  props.order.buyer?.contact || 'Jason Burn'
)

const statusVariant = computed(() => {
  const status = props.order.status?.toLowerCase() || ''
  if (status.includes('confirm')) return 'success'
  if (status.includes('processing')) return 'warning'
  if (status.includes('shipped')) return 'info'
  if (status.includes('delivered')) return 'success'
  if (status.includes('cancelled')) return 'danger'
  return 'default'
})
</script>

<style scoped>


.order-card__container {
  @apply overflow-hidden bg-white rounded-lg shadow transition-all duration-200;
  @apply hover:shadow-lg group-hover:-translate-y-1;
}

.order-card__wrapper {
  @apply flex;
}

.order-card__accent {
  @apply w-2 bg-blue-600 flex-shrink-0;
}

.order-card__content {
  @apply flex-1 p-4 sm:p-6;
}

.order-card__header {
  @apply flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3 sm:gap-4;
}

.order-card__header-main {
  @apply min-w-0 flex-1;
}

.order-card__badges {
  @apply flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2;
}

.order-card__number {
  @apply text-xl sm:text-2xl font-bold text-gray-900 break-all;
}

.order-card__reference {
  @apply text-sm text-gray-500;
}

.order-card__header-side {
  @apply text-left sm:text-right shrink-0;
}

.order-card__amount {
  @apply text-xl sm:text-2xl font-bold text-gray-900 mb-1;
}

.order-card__buyer {
  @apply space-y-2;
}

.order-card__buyer-footer {
  @apply mt-3 pt-3 border-t border-gray-200;
}
</style>