"use client"

import { useToast } from "./use-toast"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./toast"
import { CheckCircle, AlertCircle } from "lucide-react"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, type, variant }) => (
        <Toast key={id} variant={variant} onOpenChange={() => dismiss(id)}>
          <div className="flex items-start gap-2">
            {type === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
            {type === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
