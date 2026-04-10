"use client"

import type React from "react"

import { useState, useEffect } from "react"

type ToastType = "success" | "error" | "info" | "warning"

interface ToastOptions {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

interface Toast extends ToastOptions {
  id: string
  type: ToastType
}

// Custom event for toast
const createToastEvent = (toast: Toast) => {
  return new CustomEvent("toast", { detail: toast })
}

// Helper functions to create different types of toasts
const createSuccessToast = (message: string, options?: ToastOptions) => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    type: "success" as ToastType,
    title: options?.title || "Success",
    description: message,
    variant: options?.variant || "default",
    duration: options?.duration || 3000,
  }
}

const createErrorToast = (message: string, options?: ToastOptions) => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    type: "error" as ToastType,
    title: options?.title || "Error",
    description: message,
    variant: options?.variant || "destructive",
    duration: options?.duration || 5000,
  }
}

// Toast function to dispatch events
export const toast = {
  success: (message: string, options?: ToastOptions) => {
    const toast = createSuccessToast(message, options)
    document.dispatchEvent(createToastEvent(toast))
    return toast
  },
  error: (message: string, options?: ToastOptions) => {
    const toast = createErrorToast(message, options)
    document.dispatchEvent(createToastEvent(toast))
    return toast
  },
}

// Hook to use toast in components
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const handleToast = (event: Event) => {
      const toast = (event as CustomEvent<Toast>).detail
      setToasts((prev) => [...prev, toast])

      // Auto dismiss
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id))
      }, toast.duration || 3000)
    }

    document.addEventListener("toast", handleToast)
    return () => {
      document.removeEventListener("toast", handleToast)
    }
  }, [])

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return { toasts, dismiss }
}

// Provider component for toast context
export function ToastProvider({ children }: { children: React.ReactNode }) {
  return children
}
