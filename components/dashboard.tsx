"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { KPICards } from "@/components/kpi-cards"
import { ProjectsEndingSoon } from "@/components/projects-ending-soon"
import { BenchResources } from "@/components/bench-resources"
import { RecentExtensions } from "@/components/recent-extensions"
import { cn } from "@/lib/utils"

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

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

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <TopNav darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          <main className={cn("flex-1 transition-all duration-300 ease-in-out p-6", sidebarOpen ? "ml-60" : "ml-16")}>
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">
                  Welcome <span className="text-primary-accent">Satya</span>
                </h1>
                <p className="text-muted-foreground text-sm mt-1">HR Management System Dashboard</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="px-3 py-1.5 bg-muted rounded-lg">12/10/2025</span>
                <span>—</span>
                <span className="px-3 py-1.5 bg-muted rounded-lg">01/09/2026</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">HR Overview</p>
            </div>

            <KPICards />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
              <ProjectsEndingSoon />
              <BenchResources />
            </div>

            <div className="mt-6">
              <RecentExtensions />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
