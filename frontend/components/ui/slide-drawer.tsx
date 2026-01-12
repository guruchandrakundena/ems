"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SlideDrawerProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  width?: string
}

export function Drawer({ open, onClose, children, title, width = "w-[500px]" }: SlideDrawerProps) {
  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 animate-in fade-in-0 duration-200" onClick={onClose} />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full bg-card border-l border-border shadow-2xl",
          "animate-slide-in-right",
          width,
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold">{title}</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-64px)]">{children}</div>
      </div>
    </div>
  )
}
