import { ref, onMounted, onUnmounted, Ref } from 'vue'

interface LazyLoadOptions {
  root?: HTMLElement | null
  rootMargin?: string
  threshold?: number | number[]
  loadingClass?: string
  loadedClass?: string
  errorClass?: string
}

const DEFAULT_OPTIONS: LazyLoadOptions = {
  root: null,
  rootMargin: '50px',
  threshold: 0.01,
  loadingClass: 'lazy-loading',
  loadedClass: 'lazy-loaded',
  errorClass: 'lazy-error',
}

export function useLazyLoad(options: LazyLoadOptions = {}) {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options }
  const observer = ref<IntersectionObserver | null>(null)
  const loadedImages = new Set<string>()
  
  const loadImage = (img: HTMLImageElement) => {
    const src = img.dataset.src
    const srcset = img.dataset.srcset
    
    if (!src) return
    
    img.classList.add(mergedOptions.loadingClass!)
    
    const tempImg = new Image()
    
    tempImg.onload = () => {
      img.src = src
      if (srcset) img.srcset = srcset
      
      img.classList.remove(mergedOptions.loadingClass!)
      img.classList.add(mergedOptions.loadedClass!)
      loadedImages.add(src)
      
      delete img.dataset.src
      delete img.dataset.srcset
    }
    
    tempImg.onerror = () => {
      img.classList.remove(mergedOptions.loadingClass!)
      img.classList.add(mergedOptions.errorClass!)
    }
    
    tempImg.src = src
    if (srcset) tempImg.srcset = srcset
  }
  
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        loadImage(img)
        observer.value?.unobserve(img)
      }
    })
  }
  
  const observe = (element: HTMLElement | Ref<HTMLElement | undefined>) => {
    const el = 'value' in element ? element.value : element
    if (!el) return
    
    const images = el.querySelectorAll<HTMLImageElement>('img[data-src]')
    
    if ('IntersectionObserver' in window) {
      if (!observer.value) {
        observer.value = new IntersectionObserver(handleIntersection, {
          root: mergedOptions.root,
          rootMargin: mergedOptions.rootMargin,
          threshold: mergedOptions.threshold,
        })
      }
      
      images.forEach(img => {
        if (img.dataset.src && !loadedImages.has(img.dataset.src)) {
          observer.value!.observe(img)
        }
      })
    } else {
      images.forEach(loadImage)
    }
  }
  
  const unobserve = () => {
    observer.value?.disconnect()
    observer.value = null
  }
  
  onUnmounted(() => {
    unobserve()
  })
  
  return {
    observe,
    unobserve,
    loadedImages,
  }
}

export function useLazyImage(
  imageRef: Ref<HTMLImageElement | undefined>,
  options: LazyLoadOptions = {}
) {
  const { observe, unobserve } = useLazyLoad(options)
  const isLoaded = ref(false)
  const hasError = ref(false)
  
  onMounted(() => {
    if (imageRef.value) {
      const img = imageRef.value
      
      img.addEventListener('load', () => {
        isLoaded.value = true
      })
      
      img.addEventListener('error', () => {
        hasError.value = true
      })
      
      observe(imageRef as Ref<HTMLElement>)
    }
  })
  
  return {
    isLoaded,
    hasError,
  }
}