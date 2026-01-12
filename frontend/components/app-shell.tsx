"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { cn } from "@/lib/utils"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const pathname = usePathname()

  // Hide shell on login page
  const isLoginPage = pathname === "/login"

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    } else {
      setDarkMode(prefersDark)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  if (isLoginPage) {
    return (
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-background text-foreground">{children}</div>
      </div>
    )
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <TopNav darkMode={darkMode} setDarkMode={setDarkMode} />
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
