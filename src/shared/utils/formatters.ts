import { STATUS_COLORS, ORDER_STATUS } from '@/shared/constants'

const DEFAULT_LOCALE = 'en-US'
const DEFAULT_CURRENCY = 'USD'
const DEFAULT_EMPTY_VALUE = ''

interface CurrencyOptions {
  locale?: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

interface DateOptions {
  locale?: string
  showTime?: boolean
}

const isNullOrUndefined = (value: any): value is null | undefined => 
  value === null || value === undefined

export function formatCurrency(
  value?: number,
  currency = DEFAULT_CURRENCY,
  options: CurrencyOptions = {}
): string {
  if (isNullOrUndefined(value)) return DEFAULT_EMPTY_VALUE
  
  const {
    locale = DEFAULT_LOCALE,
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value)
}

interface PhonePattern {
  pattern: RegExp
  format: string
  length?: number
  minLength?: number
  maxLength?: number
}

const PHONE_PATTERNS: Record<string, PhonePattern> = {
  US: {
    pattern: /^(\d{3})(\d{3})(\d{4})$/,
    format: '($1) $2-$3',
    length: 10,
  },
  BR: {
    pattern: /^(\d{2})(\d{4,5})(\d{4})$/,
    format: '($1) $2-$3',
    minLength: 10,
    maxLength: 11,
  },
}

export function formatPhone(phone?: string, countryCode = 'US'): string {
  if (!phone) return DEFAULT_EMPTY_VALUE
  
  const cleaned = phone.replace(/\D/g, '')
  const pattern = PHONE_PATTERNS[countryCode as keyof typeof PHONE_PATTERNS]
  
  if (!pattern) return phone
  
  if ('length' in pattern && pattern.length && cleaned.length === pattern.length) {
    return cleaned.replace(pattern.pattern, pattern.format)
  }
  
  if ('minLength' in pattern && 'maxLength' in pattern && pattern.minLength && pattern.maxLength) {
    if (cleaned.length >= pattern.minLength && cleaned.length <= pattern.maxLength) {
      return cleaned.replace(pattern.pattern, pattern.format)
    }
  }
  
  return phone
}

export function formatDate(
  dateString?: string,
  options: DateOptions = {}
): string {
  if (!dateString) return DEFAULT_EMPTY_VALUE
  
  const { locale = DEFAULT_LOCALE, showTime = true } = options
  
  try {
    const date = new Date(dateString)
    
    if (isNaN(date.getTime())) {
      return dateString
    }
    
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }
    
    if (showTime) {
      dateOptions.hour = '2-digit'
      dateOptions.minute = '2-digit'
    }
    
    return date.toLocaleDateString(locale, dateOptions)
  } catch {
    return dateString
  }
}

export function getStatusColor(status?: string): string {
  if (!status) return STATUS_COLORS.default
  
  const statusLower = status.toLowerCase()
  
  for (const [, value] of Object.entries(ORDER_STATUS)) {
    if (statusLower.includes(value)) {
      return STATUS_COLORS[value as keyof typeof STATUS_COLORS] || STATUS_COLORS.default
    }
  }
  
  return STATUS_COLORS.default
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

export function capitalizeFirst(text: string): string {
  if (!text) return DEFAULT_EMPTY_VALUE
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export function formatPercentage(value: number, decimals = 2): string {
  if (isNullOrUndefined(value)) return DEFAULT_EMPTY_VALUE
  return `${value.toFixed(decimals)}%`
}