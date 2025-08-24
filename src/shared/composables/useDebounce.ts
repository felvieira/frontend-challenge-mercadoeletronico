import { ref, customRef, Ref } from 'vue'

export function useDebounce<T>(value: Ref<T>, delay = 300) {
  let timeout: NodeJS.Timeout | undefined
  
  return customRef<T>((track, trigger) => {
    return {
      get() {
        track()
        return value.value
      },
      set(newValue: T) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value.value = newValue
          trigger()
        }, delay)
      }
    }
  })
}

export function useDebouncedValue<T>(initialValue: T, delay = 300) {
  const value = ref<T>(initialValue)
  const debouncedValue = useDebounce(value, delay)
  
  return {
    value,
    debouncedValue
  }
}

export function useDebouncedFunction<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300
): T {
  let timeout: NodeJS.Timeout | undefined
  
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout)
    
    return new Promise((resolve) => {
      timeout = setTimeout(() => {
        resolve(fn(...args))
      }, delay)
    })
  }) as T
}