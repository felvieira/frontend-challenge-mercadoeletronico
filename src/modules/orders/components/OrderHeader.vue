<template>
  <div class="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
    <div class="flex">
      <!-- Blue accent bar -->
      <div class="w-2 bg-blue-600 rounded-l-lg mr-4 sm:mr-6 -ml-4 sm:-ml-6" />
      
      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
          <div class="min-w-0 flex-1">
            <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white w-fit">
                {{ order.type || 'Pre-Order' }}
              </span>
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 break-all">
                {{ order.number }}
              </h1>
            </div>
            <p class="text-gray-500 text-sm">
              #{{ order.reference || 'ME11223344' }}
            </p>
          </div>
          
          <div class="text-left sm:text-right shrink-0">
            <div class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {{ formatCurrency(order.amount, order.currency) }}
            </div>
            <span 
              :class="[
                'inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-sm sm:text-base font-medium border w-fit',
                getStatusColor(order.status),
                'bg-white'
              ]"
            >
              {{ order.status || 'Need to confirm' }}
            </span>
          </div>
        </div>

        <!-- Buyer info -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <UserIcon class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mt-0.5" />
              <div class="min-w-0">
                <div class="font-medium text-gray-900 break-words">
                  {{ order.buyer?.company || 'Jacksonville Group' }}
                </div>
                <div class="text-sm text-gray-500">
                  ({{ order.buyer?.contact || 'Jason Burn' }})
                </div>
              </div>
            </div>
            
            <div
              v-if="order.buyer?.email"
              class="flex items-start gap-3"
            >
              <EnvelopeIcon class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mt-0.5" />
              <span class="text-sm text-gray-500 break-all">{{ order.buyer.email }}</span>
            </div>
            
            <div
              v-if="order.buyer?.phone"
              class="flex items-start gap-3"
            >
              <PhoneIcon class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mt-0.5" />
              <span class="text-sm text-gray-500">{{ formatPhone(order.buyer.phone) }}</span>
            </div>
          </div>

          <div
            v-if="order.createdAt"
            class="flex items-start gap-3 sm:justify-start"
          >
            <ClockIcon class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mt-0.5" />
            <span class="text-sm text-gray-500">
              Created at {{ formatDate(order.createdAt) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  ClockIcon 
} from '@heroicons/vue/24/outline'
import type { Order } from '../api/orders.schemas'
import { formatCurrency, formatPhone, formatDate, getStatusColor } from '@/shared/utils/formatters'

interface Props {
  order: Order
}

defineProps<Props>()
</script>