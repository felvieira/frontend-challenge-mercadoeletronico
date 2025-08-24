import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { handleAxiosError, logError } from '@/shared/services/errorHandler'

const DEFAULT_TIMEOUT = 15000
const DEFAULT_RETRY_COUNT = 3
const DEFAULT_RETRY_DELAY = 1000

interface RetryConfig {
  retries?: number
  retryDelay?: number
  retryCondition?: (error: AxiosError) => boolean
}

function createHttpClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: DEFAULT_TIMEOUT,
  })
  
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      
      if (import.meta.env.DEV) {
        console.log(`[HTTP] ${config.method?.toUpperCase()} ${config.url}`, config.data)
      }
      
      return config
    },
    (error) => {
      logError(error, 'HTTP Request Interceptor')
      return Promise.reject(handleAxiosError(error))
    }
  )
  
  instance.interceptors.response.use(
    (response) => {
      if (import.meta.env.DEV) {
        console.log(`[HTTP] Response ${response.config.url}`, response.data)
      }
      return response
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: number }
      
      if (!originalRequest) {
        return Promise.reject(handleAxiosError(error))
      }
      
      const retryConfig: RetryConfig = originalRequest.retryConfig || {}
      const {
        retries = 0,
        retryDelay = DEFAULT_RETRY_DELAY,
        retryCondition = (err: AxiosError) => {
          return !err.response || (err.response.status >= 500 && err.response.status < 600)
        }
      } = retryConfig
      
      originalRequest._retry = originalRequest._retry || 0
      
      if (originalRequest._retry < retries && retryCondition(error)) {
        originalRequest._retry++
        
        await new Promise(resolve => setTimeout(resolve, retryDelay * originalRequest._retry!))
        
        return instance(originalRequest)
      }
      
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken')
        window.location.href = '/login'
      }
      
      // Log error but don't reject for 404s to allow fallback to work
      if (error.response?.status !== 404) {
        logError(error, `HTTP Response Error - ${error.config?.url}`)
      }
      
      return Promise.reject(handleAxiosError(error))
    }
  )
  
  return instance
}

export const http = createHttpClient()

export async function httpGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await http.get<T>(url, config)
  return response.data
}

export async function httpPost<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  const response = await http.post<T>(url, data, config)
  return response.data
}

export async function httpPut<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  const response = await http.put<T>(url, data, config)
  return response.data
}

export async function httpDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await http.delete<T>(url, config)
  return response.data
}

export async function httpPatch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  const response = await http.patch<T>(url, data, config)
  return response.data
}