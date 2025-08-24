import { AxiosError } from 'axios'

export interface ErrorInfo {
  message: string
  code?: string
  details?: unknown
  timestamp: Date
}

export class AppError extends Error {
  public code?: string
  public details?: unknown
  public timestamp: Date
  
  constructor(message: string, code?: string, details?: unknown) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.details = details
    this.timestamp = new Date()
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', details)
    this.name = 'ValidationError'
  }
}

export class NetworkError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'NETWORK_ERROR', details)
    this.name = 'NetworkError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'NOT_FOUND', details)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'UNAUTHORIZED', details)
    this.name = 'UnauthorizedError'
  }
}

const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  TIMEOUT: 'Request timeout. Please try again.',
  NOT_FOUND: 'Resource not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION: 'Validation error. Please check your input.',
  UNKNOWN: 'An unexpected error occurred. Please try again.',
  SERVER: 'Server error. Please try again later.',
} as const

export function handleAxiosError(error: AxiosError): AppError {
  if (!error.response) {
    if (error.code === 'ECONNABORTED') {
      return new NetworkError(ERROR_MESSAGES.TIMEOUT, error)
    }
    return new NetworkError(ERROR_MESSAGES.NETWORK, error)
  }
  
  const status = error.response.status
  const data = error.response.data as any
  const message = data?.message || error.message
  
  switch (status) {
    case 400:
      return new ValidationError(message || ERROR_MESSAGES.VALIDATION, data)
    case 401:
      return new UnauthorizedError(message || ERROR_MESSAGES.UNAUTHORIZED, data)
    case 404:
      return new NotFoundError(message || ERROR_MESSAGES.NOT_FOUND, data)
    case 500:
    case 502:
    case 503:
      return new AppError(message || ERROR_MESSAGES.SERVER, 'SERVER_ERROR', data)
    default:
      return new AppError(message || ERROR_MESSAGES.UNKNOWN, `HTTP_${status}`, data)
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

export function getErrorMessage(error: unknown): string {
  if (isAppError(error)) {
    return error.message
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  if (typeof error === 'string') {
    return error
  }
  
  return ERROR_MESSAGES.UNKNOWN
}

export function logError(error: unknown, context?: string): void {
  const timestamp = new Date().toISOString()
  const errorInfo = {
    timestamp,
    context,
    error: isAppError(error) ? {
      message: error.message,
      code: error.code,
      details: error.details,
    } : {
      message: getErrorMessage(error),
      raw: error,
    }
  }
  
  console.error('[ERROR]', errorInfo)
}