"use client"

import { KPICards } from "@/components/kpi-cards"
import { ProjectsEndingSoon } from "@/components/projects-ending-soon"
import { BenchResources } from "@/components/bench-resources"
import { RecentExtensions } from "@/components/recent-extensions"

export function DashboardContent() {
  return (
    <>
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
    </>
  )
}
