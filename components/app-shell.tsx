"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()

  // Hide shell on login page
  const isLoginPage = pathname === "/login"

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  if (isLoginPage) {
    return (
      <div className={resolvedTheme}>
        <div className="min-h-screen bg-background text-foreground theme-transition">{children}</div>
      </div>
    )
  }

  return (
    <div className={resolvedTheme}>
      <div className="min-h-screen bg-background text-foreground theme-transition">
        <TopNav />
        <div className="flex">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          <main className={cn("flex-1 transition-all duration-300 ease-in-out p-6", sidebarOpen ? "ml-60" : "ml-16")}>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
