import { describe, it, expect } from 'vitest'
import { formatCurrency, formatPhone, formatDate, getStatusColor } from '../formatters'

describe('formatCurrency', () => {
  it('formats USD currency correctly', () => {
    expect(formatCurrency(20000, 'USD', { locale: 'en-US' })).toBe('$20,000')
    expect(formatCurrency(1000, 'USD', { locale: 'en-US' })).toBe('$1,000')
    expect(formatCurrency(0, 'USD', { locale: 'en-US' })).toBe('$0')
  })

  it('formats EUR currency correctly', () => {
    expect(formatCurrency(15000, 'EUR', { locale: 'en-US' })).toBe('€15,000')
  })

  it('handles different locales', () => {
    const result = formatCurrency(20000, 'USD', { locale: 'pt-BR' })
    expect(result).toContain('20')
    expect(result).toContain('000')
  })

  it('handles undefined values', () => {
    expect(formatCurrency(undefined)).toBe('')
    expect(formatCurrency(null as any)).toBe('')
  })

  it('handles zero values', () => {
    expect(formatCurrency(0)).toBe('$0')
  })

  it('handles negative values', () => {
    expect(formatCurrency(-5000, 'USD', { locale: 'en-US' })).toBe('-$5,000')
  })

  it('uses default parameters correctly', () => {
    expect(formatCurrency(10000)).toBe('$10,000')
  })

  it('handles decimal values', () => {
    expect(formatCurrency(1500.50, 'USD', { locale: 'en-US' })).toBe('$1,501')
  })
})

describe('formatPhone', () => {
  it('formats 10-digit US phone numbers correctly', () => {
    expect(formatPhone('9035753050')).toBe('(903) 575-3050')
    expect(formatPhone('1234567890')).toBe('(123) 456-7890')
  })

  it('handles phone numbers with existing formatting', () => {
    expect(formatPhone('(903) 575-3050')).toBe('(903) 575-3050')
    expect(formatPhone('903-575-3050')).toBe('(903) 575-3050')
    expect(formatPhone('903.575.3050')).toBe('(903) 575-3050')
  })

  it('handles phone numbers with mixed characters', () => {
    const result1 = formatPhone('903-575-3050 ext 123')
    expect(result1).toContain('903')
    expect(result1).toContain('575')
    expect(result1).toContain('3050')
    
    const result2 = formatPhone('+1 903 575 3050')
    expect(result2).toContain('903')
    expect(result2).toContain('575')
    expect(result2).toContain('3050')
  })

  it('returns original format for non-10-digit numbers', () => {
    expect(formatPhone('12345')).toBe('12345')
    expect(formatPhone('123-456-78901')).toBe('123-456-78901')
    expect(formatPhone('+55 11 99999-9999')).toBe('+55 11 99999-9999')
  })

  it('handles undefined and empty values', () => {
    expect(formatPhone(undefined)).toBe('')
    expect(formatPhone('')).toBe('')
    expect(formatPhone(null as any)).toBe('')
  })

  it('handles international numbers', () => {
    const result = formatPhone('+1-800-555-0199')
    expect(result).toContain('800')
    expect(result).toContain('555')
    expect(result).toContain('0199')
  })
})

describe('formatDate', () => {
  it('formats ISO date strings correctly', () => {
    const result = formatDate('2020-04-16T15:32:55.000Z')
    expect(result).toContain('2020')
    expect(result).toContain('04')
    expect(result).toContain('16')
  })

  it('handles different ISO formats', () => {
    const result1 = formatDate('2020-05-23T12:45:20.39Z')
    const result2 = formatDate('2020-01-01T00:00:00Z')
    
    // Check that dates are formatted (may vary by timezone)
    expect(result1).toContain('2020')
    expect(result2).toMatch(/20(19|20)/) // Account for timezone differences
  })

  it('handles date-only strings', () => {
    const result = formatDate('2020-12-25')
    expect(result).toContain('2020')
  })

  it('handles undefined and null values', () => {
    expect(formatDate(undefined)).toBe('')
    expect(formatDate(null as any)).toBe('')
    expect(formatDate('')).toBe('')
  })

  it('handles invalid date strings gracefully', () => {
    const result1 = formatDate('invalid-date')
    const result2 = formatDate('not-a-date')
    
    // Should return either the original string or a default fallback
    expect(typeof result1).toBe('string')
    expect(typeof result2).toBe('string')
    expect(result1.length).toBeGreaterThan(0)
    expect(result2.length).toBeGreaterThan(0)
  })

  it('handles edge case dates', () => {
    const result1 = formatDate('1970-01-01T00:00:00Z')
    const result2 = formatDate('2100-12-31T23:59:59Z')
    
    // Account for timezone differences around epoch
    expect(result1).toMatch(/(1969|1970)/)
    expect(result2).toContain('2100')
  })
})

describe('getStatusColor', () => {
  it('returns correct colors for confirmation statuses', () => {
    expect(getStatusColor('Need to confirm')).toBe('text-emerald-600')
    expect(getStatusColor('Confirmed')).toBe('text-emerald-600')
    expect(getStatusColor('need to confirm')).toBe('text-emerald-600')
    expect(getStatusColor('CONFIRMED')).toBe('text-emerald-600')
  })

  it('returns correct colors for processing statuses', () => {
    expect(getStatusColor('Processing')).toBe('text-yellow-600')
    expect(getStatusColor('In processing')).toBe('text-yellow-600')
    expect(getStatusColor('PROCESSING')).toBe('text-yellow-600')
  })

  it('returns correct colors for shipped statuses', () => {
    expect(getStatusColor('Shipped')).toBe('text-blue-600')
    expect(getStatusColor('Already shipped')).toBe('text-blue-600')
    expect(getStatusColor('SHIPPED')).toBe('text-blue-600')
  })

  it('returns correct colors for delivered statuses', () => {
    expect(getStatusColor('Delivered')).toBe('text-green-600')
    expect(getStatusColor('Successfully delivered')).toBe('text-green-600')
    expect(getStatusColor('DELIVERED')).toBe('text-green-600')
  })

  it('returns correct colors for cancelled statuses', () => {
    expect(getStatusColor('Cancelled')).toBe('text-red-600')
    expect(getStatusColor('Order cancelled')).toBe('text-red-600')
    expect(getStatusColor('CANCELLED')).toBe('text-red-600')
  })

  it('handles undefined and null values', () => {
    expect(getStatusColor(undefined)).toBe('text-gray-500')
    expect(getStatusColor(null as any)).toBe('text-gray-500')
    expect(getStatusColor('')).toBe('text-gray-500')
  })

  it('returns default color for unknown statuses', () => {
    expect(getStatusColor('Unknown Status')).toBe('text-emerald-600')
    expect(getStatusColor('Pending Review')).toBe('text-emerald-600')
    expect(getStatusColor('Custom Status')).toBe('text-emerald-600')
  })

  it('handles case sensitivity correctly', () => {
    expect(getStatusColor('confirm')).toBe('text-emerald-600')
    expect(getStatusColor('PROCESSING')).toBe('text-yellow-600')
    expect(getStatusColor('ShIpPeD')).toBe('text-blue-600')
  })

  it('handles partial matches correctly', () => {
    expect(getStatusColor('Ready to confirm shipment')).toBe('text-emerald-600')
    expect(getStatusColor('Currently processing order')).toBe('text-yellow-600')
    expect(getStatusColor('Item has been shipped')).toBe('text-blue-600')
    expect(getStatusColor('Package delivered safely')).toBe('text-green-600')
    expect(getStatusColor('Order was cancelled by user')).toBe('text-red-600')
  })
})