interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
}

interface CacheOptions {
  ttl?: number
  maxSize?: number
  storage?: 'memory' | 'localStorage' | 'sessionStorage'
}

const DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes
const DEFAULT_MAX_SIZE = 100

class CacheManager<T = any> {
  private cache = new Map<string, CacheItem<T>>()
  private readonly ttl: number
  private readonly maxSize: number
  private readonly storage: 'memory' | 'localStorage' | 'sessionStorage'
  
  constructor(options: CacheOptions = {}) {
    this.ttl = options.ttl || DEFAULT_TTL
    this.maxSize = options.maxSize || DEFAULT_MAX_SIZE
    this.storage = options.storage || 'memory'
    
    if (this.storage !== 'memory') {
      this.loadFromStorage()
    }
  }
  
  private isExpired(item: CacheItem<T>): boolean {
    return Date.now() - item.timestamp > item.ttl
  }
  
  private cleanup(): void {
    const now = Date.now()
    
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key)
      }
    }
    
    if (this.cache.size > this.maxSize) {
      const sortedEntries = Array.from(this.cache.entries()).sort(
        ([, a], [, b]) => a.timestamp - b.timestamp
      )
      
      const itemsToRemove = this.cache.size - this.maxSize
      for (let i = 0; i < itemsToRemove; i++) {
        this.cache.delete(sortedEntries[i][0])
      }
    }
    
    if (this.storage !== 'memory') {
      this.saveToStorage()
    }
  }
  
  private getStorageKey(): string {
    return `cache_${this.constructor.name}`
  }
  
  private loadFromStorage(): void {
    try {
      const storage = this.storage === 'localStorage' ? localStorage : sessionStorage
      const data = storage.getItem(this.getStorageKey())
      
      if (data) {
        const parsed = JSON.parse(data)
        this.cache = new Map(parsed)
        this.cleanup()
      }
    } catch (error) {
      console.warn('Failed to load cache from storage:', error)
    }
  }
  
  private saveToStorage(): void {
    try {
      const storage = this.storage === 'localStorage' ? localStorage : sessionStorage
      const data = JSON.stringify(Array.from(this.cache.entries()))
      storage.setItem(this.getStorageKey(), data)
    } catch (error) {
      console.warn('Failed to save cache to storage:', error)
    }
  }
  
  set(key: string, data: T, customTTL?: number): void {
    const ttl = customTTL || this.ttl
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    }
    
    this.cache.set(key, item)
    this.cleanup()
  }
  
  get(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }
    
    if (this.isExpired(item)) {
      this.cache.delete(key)
      if (this.storage !== 'memory') {
        this.saveToStorage()
      }
      return null
    }
    
    return item.data
  }
  
  has(key: string): boolean {
    const item = this.cache.get(key)
    return item !== undefined && !this.isExpired(item)
  }
  
  delete(key: string): boolean {
    const deleted = this.cache.delete(key)
    if (deleted && this.storage !== 'memory') {
      this.saveToStorage()
    }
    return deleted
  }
  
  clear(): void {
    this.cache.clear()
    if (this.storage !== 'memory') {
      const storage = this.storage === 'localStorage' ? localStorage : sessionStorage
      storage.removeItem(this.getStorageKey())
    }
  }
  
  size(): number {
    return this.cache.size
  }
  
  keys(): string[] {
    return Array.from(this.cache.keys())
  }
  
  getStats() {
    let expired = 0
    let valid = 0
    
    for (const item of this.cache.values()) {
      if (this.isExpired(item)) {
        expired++
      } else {
        valid++
      }
    }
    
    return {
      total: this.cache.size,
      valid,
      expired,
      maxSize: this.maxSize,
      usage: (this.cache.size / this.maxSize) * 100,
    }
  }
}

export const memoryCache = new CacheManager({ storage: 'memory' })
export const sessionCache = new CacheManager({ storage: 'sessionStorage' })
export const persistentCache = new CacheManager({ storage: 'localStorage', ttl: 24 * 60 * 60 * 1000 })

export function createCache<T>(options?: CacheOptions): CacheManager<T> {
  return new CacheManager<T>(options)
}

export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  cache: CacheManager<T> = memoryCache,
  ttl?: number
): Promise<T> {
  const cached = cache.get(key)
  if (cached !== null) {
    return cached
  }
  
  const data = await fetcher()
  cache.set(key, data, ttl)
  
  return data
}