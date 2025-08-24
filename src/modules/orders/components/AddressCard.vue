<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200">
      <h3 class="text-base sm:text-lg font-semibold flex items-center gap-2">
        <component
          :is="icon"
          class="h-4 w-4 sm:h-5 sm:w-5 text-blue-600"
        />
        {{ title }}
      </h3>
    </div>
    
    <div class="p-4 sm:p-6">
      <div
        v-if="!address"
        class="text-gray-500"
      >
        No information available
      </div>
      
      <div
        v-else
        class="space-y-3 sm:space-y-4"
      >
        <div v-if="address.name">
          <h3 class="font-semibold text-gray-900">
            {{ address.name }}
          </h3>
        </div>

        <div
          v-if="address.company"
          class="flex items-start gap-3"
        >
          <BuildingOfficeIcon class="h-4 w-4 text-gray-400 mt-0.5" />
          <div>
            <div class="text-sm text-gray-500">
              Company
            </div>
            <div class="font-medium">
              {{ address.company }}
            </div>
          </div>
        </div>

        <div
          v-if="address.address"
          class="flex items-start gap-3"
        >
          <MapPinIcon class="h-4 w-4 text-gray-400 mt-0.5" />
          <div>
            <div class="text-sm text-gray-500">
              Address
            </div>
            <div class="font-medium">
              {{ address.address }}
            </div>
          </div>
        </div>

        <div
          v-if="address.contact"
          class="flex items-start gap-3"
        >
          <UserIcon class="h-4 w-4 text-gray-400 mt-0.5" />
          <div>
            <div class="text-sm text-gray-500">
              Contact
            </div>
            <div class="font-medium">
              {{ address.contact }}
            </div>
          </div>
        </div>

        <div
          v-if="address.email"
          class="flex items-start gap-3"
        >
          <EnvelopeIcon class="h-4 w-4 text-gray-400 mt-0.5" />
          <div>
            <div class="text-sm text-gray-500">
              Email
            </div>
            <div class="font-medium">
              {{ address.email }}
            </div>
          </div>
        </div>

        <div
          v-if="address.phone"
          class="flex items-start gap-3"
        >
          <PhoneIcon class="h-4 w-4 text-gray-400 mt-0.5" />
          <div>
            <div class="text-sm text-gray-500">
              Phone
            </div>
            <div class="font-medium">
              {{ formatPhone(address.phone) }}
            </div>
          </div>
        </div>

        <div
          v-if="address.fax"
          class="flex items-start gap-3"
        >
          <PhoneIcon class="h-4 w-4 text-gray-400 mt-0.5" />
          <div>
            <div class="text-sm text-gray-500">
              Fax
            </div>
            <div class="font-medium">
              {{ formatPhone(address.fax) }}
            </div>
          </div>
        </div>

        <div
          v-if="address.taxId"
          class="flex items-start gap-3"
        >
          <HashtagIcon class="h-4 w-4 text-gray-400 mt-0.5" />
          <div>
            <div class="text-sm text-gray-500">
              Tax ID
            </div>
            <div class="font-medium">
              {{ address.taxId }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  MapPinIcon,
  BuildingOfficeIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  HashtagIcon
} from '@heroicons/vue/24/outline'
import type { OrderAddress } from '../types/order'
import { formatPhone } from '@/shared/utils/formatters'

interface Props {
  title: string
  address?: OrderAddress
  icon?: any
}

withDefaults(defineProps<Props>(), {
  icon: () => MapPinIcon
})
</script>