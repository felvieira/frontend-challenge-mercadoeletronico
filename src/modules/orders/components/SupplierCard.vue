<template>
  <div v-if="supplier" class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200">
      <h3 class="text-base sm:text-lg font-semibold flex items-center gap-2">
        <BuildingOfficeIcon class="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
        Supplier
      </h3>
    </div>
    
    <div class="p-4 sm:p-6 space-y-3 sm:space-y-4">
      <div class="flex items-start justify-between">
        <div class="min-w-0 flex-1">
          <h3 class="font-semibold text-gray-900 text-base sm:text-lg break-words">
            {{ supplier.name || 'Motion Industries INC' }}
          </h3>
          <div v-if="supplier.code" class="flex items-center gap-2 mt-1">
            <HashtagIcon class="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
            <span class="text-xs sm:text-sm text-blue-600 font-medium">{{ supplier.code }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div class="space-y-3">
          <div v-if="supplier.taxId" class="flex items-start gap-3">
            <HashtagIcon class="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <div class="text-sm text-gray-500">CNPJ</div>
              <div class="font-medium">{{ supplier.taxId }}</div>
            </div>
          </div>

          <div v-if="supplier.address" class="flex items-start gap-3">
            <MapPinIcon class="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <div class="text-sm text-gray-500">Address</div>
              <div class="font-medium">{{ supplier.address }}</div>
            </div>
          </div>

          <div v-if="supplier.contact" class="flex items-start gap-3">
            <UserIcon class="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <div class="text-sm text-gray-500">Contact</div>
              <div class="font-medium">{{ supplier.contact }}</div>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <div v-if="supplier.email" class="flex items-start gap-3">
            <EnvelopeIcon class="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <div class="text-sm text-gray-500">Email</div>
              <div class="font-medium">{{ supplier.email }}</div>
            </div>
          </div>

          <div v-if="supplier.phone" class="flex items-start gap-3">
            <PhoneIcon class="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <div class="text-sm text-gray-500">Phone</div>
              <div class="font-medium">{{ formatPhone(supplier.phone) }}</div>
            </div>
          </div>

          <div v-if="supplier.fax" class="flex items-start gap-3">
            <PhoneIcon class="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <div class="text-sm text-gray-500">Fax</div>
              <div class="font-medium">{{ formatPhone(supplier.fax) }}</div>
            </div>
          </div>
        </div>
      </div>

      <div 
        v-if="supplier.createdAt || supplier.updatedAt || supplier.status" 
        class="pt-4 border-t border-gray-200"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div v-if="supplier.createdAt" class="flex items-center gap-2">
            <CalendarIcon class="h-4 w-4 text-gray-400" />
            <span class="text-gray-500">Created: {{ formatDate(supplier.createdAt) }}</span>
          </div>
          
          <div v-if="supplier.updatedAt" class="flex items-center gap-2">
            <CalendarIcon class="h-4 w-4 text-gray-400" />
            <span class="text-gray-500">Updated: {{ formatDate(supplier.updatedAt) }}</span>
          </div>
          
          <div v-if="supplier.status" class="flex items-center gap-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-green-200 text-green-800 bg-green-50">
              {{ supplier.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  BuildingOfficeIcon,
  MapPinIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  HashtagIcon
} from '@heroicons/vue/24/outline'
import type { OrderSupplier } from '../types/order'
import { formatDate, formatPhone } from '@/shared/utils/formatters'

interface Props {
  supplier?: OrderSupplier
}

defineProps<Props>()
</script>