import { ref, computed, onMounted, onUnmounted, Ref } from 'vue'

interface VirtualScrollOptions {
  itemHeight: number
  containerHeight: number
  buffer?: number
  overscan?: number
}

export function useVirtualScroll<T>(
  items: Ref<T[]>,
  options: VirtualScrollOptions
) {
  const {
    itemHeight,
    containerHeight,
    buffer = 5,
    overscan = 5
  } = options
  
  const scrollTop = ref(0)
  const containerRef = ref<HTMLElement>()
  
  const itemsPerView = Math.ceil(containerHeight / itemHeight)
  
  const visibleRange = computed(() => {
    const start = Math.floor(scrollTop.value / itemHeight)
    const end = start + itemsPerView
    
    return {
      start: Math.max(0, start - buffer),
      end: Math.min(items.value.length, end + buffer + overscan),
    }
  })
  
  const visibleItems = computed(() => {
    const { start, end } = visibleRange.value
    return items.value.slice(start, end).map((item, index) => ({
      item,
      index: start + index,
      top: (start + index) * itemHeight,
    }))
  })
  
  const totalHeight = computed(() => items.value.length * itemHeight)
  
  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement
    scrollTop.value = target.scrollTop
  }
  
  onMounted(() => {
    if (containerRef.value) {
      containerRef.value.addEventListener('scroll', handleScroll, { passive: true })
    }
  })
  
  onUnmounted(() => {
    if (containerRef.value) {
      containerRef.value.removeEventListener('scroll', handleScroll)
    }
  })
  
  return {
    containerRef,
    visibleItems,
    totalHeight,
    scrollTop,
  }
}

interface InfiniteScrollOptions {
  threshold?: number
  hasNextPage?: Ref<boolean>
  isFetchingNextPage?: Ref<boolean>
}

export function useInfiniteScroll(
  onLoadMore: () => Promise<void> | void,
  options: InfiniteScrollOptions = {}
) {
  const {
    threshold = 100,
    hasNextPage = ref(true),
    isFetchingNextPage = ref(false)
  } = options
  
  const containerRef = ref<HTMLElement>()
  const isLoading = ref(false)
  
  const handleScroll = async () => {
    if (!containerRef.value || isLoading.value || !hasNextPage.value) {
      return
    }
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.value
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - threshold
    
    if (isNearBottom && !isFetchingNextPage.value) {
      isLoading.value = true
      
      try {
        await onLoadMore()
      } catch (error) {
        console.error('Error loading more items:', error)
      } finally {
        isLoading.value = false
      }
    }
  }
  
  onMounted(() => {
    if (containerRef.value) {
      containerRef.value.addEventListener('scroll', handleScroll, { passive: true })
    }
  })
  
  onUnmounted(() => {
    if (containerRef.value) {
      containerRef.value.removeEventListener('scroll', handleScroll)
    }
  })
  
  return {
    containerRef,
    isLoading,
  }
}