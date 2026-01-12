"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowRight, TrendingUp, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { Modal } from "@/components/ui/modal"

const extensionsData = [
  {
    employee: "Jessica Miller",
    client: "FinanceHub",
    oldEndDate: "2025-12-31",
    newEndDate: "2026-03-31",
    extensionMonths: 3,
    approvedDate: "2025-12-20",
  },
  {
    employee: "Robert Taylor",
    client: "HealthTech",
    oldEndDate: "2026-01-15",
    newEndDate: "2026-07-15",
    extensionMonths: 6,
    approvedDate: "2025-12-28",
  },
  {
    employee: "Amanda White",
    client: "RetailPro",
    oldEndDate: "2025-12-20",
    newEndDate: "2026-06-20",
    extensionMonths: 6,
    approvedDate: "2025-12-10",
  },
  {
    employee: "Daniel Harris",
    client: "LogiSmart",
    oldEndDate: "2026-01-01",
    newEndDate: "2026-04-01",
    extensionMonths: 3,
    approvedDate: "2025-12-25",
  },
  {
    employee: "Nicole Martinez",
    client: "EduLearn",
    oldEndDate: "2025-12-15",
    newEndDate: "2026-12-15",
    extensionMonths: 12,
    approvedDate: "2025-12-05",
  },
  {
    employee: "Chris Thompson",
    client: "MediaFlow",
    oldEndDate: "2026-01-10",
    newEndDate: "2026-04-10",
    extensionMonths: 3,
    approvedDate: "2026-01-02",
  },
]

export function RecentExtensions() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Card className="bg-card border border-border animate-fade-slide-up">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
          <CardTitle className="text-base font-semibold">Recent Extensions</CardTitle>
          <Button
            variant="link"
            size="sm"
            className="text-primary-accent hover:text-primary-accent/80 p-0 h-auto btn-ripple"
            onClick={() => setModalOpen(true)}
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs text-muted-foreground font-medium">Employee</TableHead>
                <TableHead className="text-xs text-muted-foreground font-medium">Client</TableHead>
                <TableHead className="text-xs text-muted-foreground font-medium">Old End Date</TableHead>
                <TableHead className="text-xs text-muted-foreground font-medium">New End Date</TableHead>
                <TableHead className="text-xs text-muted-foreground font-medium text-right">Extension</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {extensionsData.slice(0, 5).map((extension, index) => (
                <TableRow key={index} className="border-border row-highlight cursor-pointer">
                  <TableCell className="font-medium text-foreground text-sm">{extension.employee}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{extension.client}</TableCell>
                  <TableCell className="text-sm text-muted-foreground line-through opacity-60">
                    {extension.oldEndDate}
                  </TableCell>
                  <TableCell className="text-sm text-foreground font-medium">{extension.newEndDate}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={cn(
                        "text-xs font-medium",
                        extension.extensionMonths >= 6
                          ? "bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20"
                          : "bg-primary-accent/10 text-primary-accent hover:bg-primary-accent/20",
                      )}
                    >
                      <TrendingUp className="mr-1 h-3 w-3" />+{extension.extensionMonths}mo
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Timeline Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Recent Extensions Timeline" size="lg">
        <div className="space-y-4">
          {extensionsData.map((extension, index) => (
            <div
              key={index}
              className="relative pl-8 pb-6 border-l-2 border-border last:border-l-0 last:pb-0 animate-fade-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-accent border-4 border-background" />

              <div className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{extension.employee}</p>
                    <p className="text-sm text-muted-foreground">{extension.client}</p>
                  </div>
                  <Badge
                    className={cn(
                      "text-xs font-medium",
                      extension.extensionMonths >= 6
                        ? "bg-green-500/10 text-green-600"
                        : "bg-primary-accent/10 text-primary-accent",
                    )}
                  >
                    <TrendingUp className="mr-1 h-3 w-3" />+{extension.extensionMonths} months
                  </Badge>
                </div>

                <div className="mt-3 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="line-through text-muted-foreground">{extension.oldEndDate}</span>
                    <span className="text-foreground font-medium">→ {extension.newEndDate}</span>
                  </div>
                </div>

                <p className="mt-2 text-xs text-muted-foreground">Approved on {extension.approvedDate}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}
