import { ref, computed } from 'vue'

export interface LoadingState {
  isLoading: boolean
  error: Error | null
  hasError: boolean
}

export function useLoadingState(initialLoading = false) {
  const isLoading = ref(initialLoading)
  const error = ref<Error | null>(null)
  
  const hasError = computed(() => error.value !== null)
  
  const setLoading = (loading: boolean) => {
    isLoading.value = loading
    if (loading) {
      error.value = null
    }
  }
  
  const setError = (err: Error | null) => {
    error.value = err
    isLoading.value = false
  }
  
  const reset = () => {
    isLoading.value = false
    error.value = null
  }
  
  const withLoading = async <T>(fn: () => Promise<T>): Promise<T | undefined> => {
    try {
      setLoading(true)
      const result = await fn()
      setLoading(false)
      return result
    } catch (err) {
      setError(err as Error)
      return undefined
    }
  }
  
  return {
    isLoading,
    error,
    hasError,
    setLoading,
    setError,
    reset,
    withLoading,
  }
}