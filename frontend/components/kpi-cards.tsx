"use client"

import { useState } from "react"
import { Users, Globe, Clock, UserCheck, CalendarClock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { Modal } from "@/components/ui/modal"

const kpiData = [
  {
    label: "Total Active Employees",
    sublabel: "Active workforce",
    value: "150",
    numericValue: 150,
    icon: Users,
    borderColor: "border-l-primary-accent",
    iconBg: "bg-primary-accent/10",
    iconColor: "text-primary-accent",
    breakdown: [
      { label: "Engineering", value: 65 },
      { label: "Design", value: 20 },
      { label: "Management", value: 25 },
      { label: "Quality", value: 20 },
      { label: "Analytics", value: 20 },
    ],
  },
  {
    label: "Onshore / Offshore",
    sublabel: "Location split",
    value: "80 / 70",
    numericValue: 150,
    icon: Globe,
    borderColor: "border-l-blue-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    breakdown: [
      { label: "Onshore - US", value: 50 },
      { label: "Onshore - EU", value: 30 },
      { label: "Offshore - India", value: 45 },
      { label: "Offshore - Other", value: 25 },
    ],
  },
  {
    label: "Bench Resources",
    sublabel: "Available now",
    value: "12",
    numericValue: 12,
    icon: Clock,
    borderColor: "border-l-yellow-500",
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-500",
    breakdown: [
      { label: "< 7 days", value: 3 },
      { label: "7-14 days", value: 4 },
      { label: "15-30 days", value: 3 },
      { label: "> 30 days", value: 2 },
    ],
  },
  {
    label: "Full-Time / Contract",
    sublabel: "Employment type",
    value: "100 / 50",
    numericValue: 150,
    icon: UserCheck,
    borderColor: "border-l-green-500",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
    breakdown: [
      { label: "Full-Time Onshore", value: 60 },
      { label: "Full-Time Offshore", value: 40 },
      { label: "Contract Onshore", value: 20 },
      { label: "Contract Offshore", value: 30 },
    ],
  },
  {
    label: "Projects Ending",
    sublabel: "This month",
    value: "8",
    numericValue: 8,
    icon: CalendarClock,
    borderColor: "border-l-red-500",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
    breakdown: [
      { label: "Next 7 days", value: 3 },
      { label: "8-14 days", value: 2 },
      { label: "15-21 days", value: 2 },
      { label: "22-30 days", value: 1 },
    ],
  },
]

export function KPICards() {
  const [selectedKPI, setSelectedKPI] = useState<(typeof kpiData)[0] | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiData.map((kpi, index) => (
          <Card
            key={index}
            onClick={() => setSelectedKPI(kpi)}
            className={cn(
              "bg-card border border-border card-hover cursor-pointer group overflow-hidden",
              "border-l-4",
              kpi.borderColor,
              "animate-fade-slide-up",
              `stagger-${index + 1}`,
            )}
            style={{ animationFillMode: "backwards" }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-foreground group-hover:text-primary-accent transition-colors">
                    {kpi.value.includes("/") ? kpi.value : <AnimatedNumber value={kpi.numericValue} duration={1200} />}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground">{kpi.label}</p>
                </div>
                <div className={cn("p-2.5 rounded-xl icon-hover", kpi.iconBg)}>
                  <kpi.icon className={cn("h-5 w-5", kpi.iconColor)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* KPI Detail Modal */}
      <Modal open={!!selectedKPI} onClose={() => setSelectedKPI(null)} title={selectedKPI?.label} size="sm">
        {selectedKPI && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
              <div className={cn("p-4 rounded-xl", selectedKPI.iconBg)}>
                <selectedKPI.icon className={cn("h-8 w-8", selectedKPI.iconColor)} />
              </div>
              <div>
                <p className="text-3xl font-bold">{selectedKPI.value}</p>
                <p className="text-sm text-muted-foreground">{selectedKPI.sublabel}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Breakdown</p>
              {selectedKPI.breakdown.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-muted/20 rounded-lg animate-fade-slide-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <span className="text-sm">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
