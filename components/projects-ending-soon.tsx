"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowRight, AlertTriangle, AlertCircle, Download, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Modal } from "@/components/ui/modal"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const projectsData = [
  { employee: "Sarah Johnson", client: "Acme Corp", role: "Senior Developer", endDate: "2026-01-15", daysRemaining: 6 },
  {
    employee: "Michael Chen",
    client: "TechFlow Inc",
    role: "Project Manager",
    endDate: "2026-01-18",
    daysRemaining: 9,
  },
  { employee: "Emily Davis", client: "GlobalTech", role: "UX Designer", endDate: "2026-02-01", daysRemaining: 23 },
  { employee: "James Wilson", client: "DataSys", role: "DevOps Engineer", endDate: "2026-01-12", daysRemaining: 3 },
  { employee: "Lisa Anderson", client: "CloudNine", role: "Full Stack Dev", endDate: "2026-02-05", daysRemaining: 27 },
  { employee: "Tom Harris", client: "FinanceHub", role: "Backend Dev", endDate: "2026-01-20", daysRemaining: 11 },
  { employee: "Anna Martinez", client: "HealthTech", role: "Data Analyst", endDate: "2026-01-25", daysRemaining: 16 },
  { employee: "Kevin Lee", client: "RetailPro", role: "Frontend Dev", endDate: "2026-02-10", daysRemaining: 32 },
]

function getAlertStatus(daysRemaining: number) {
  if (daysRemaining <= 7) {
    return { color: "text-red-500", bg: "bg-red-500/10", icon: AlertTriangle, label: "Critical" }
  } else if (daysRemaining <= 30) {
    return { color: "text-yellow-500", bg: "bg-yellow-500/10", icon: AlertCircle, label: "Warning" }
  }
  return { color: "text-green-500", bg: "bg-green-500/10", icon: null, label: "OK" }
}

export function ProjectsEndingSoon() {
  const [modalOpen, setModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredData = projectsData.filter((project) => {
    const matchesSearch =
      project.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase())

    const status = getAlertStatus(project.daysRemaining)
    const matchesStatus = statusFilter === "all" || status.label.toLowerCase() === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <>
      <Card className="bg-card border border-border animate-fade-slide-up">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
          <CardTitle className="text-base font-semibold">Projects Ending Soon</CardTitle>
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
                <TableHead className="text-xs text-muted-foreground font-medium">End Date</TableHead>
                <TableHead className="text-xs text-muted-foreground font-medium text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectsData.slice(0, 5).map((project, index) => {
                const status = getAlertStatus(project.daysRemaining)
                return (
                  <TableRow key={index} className="border-border row-highlight cursor-pointer">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground text-sm">{project.employee}</p>
                        <p className="text-xs text-muted-foreground">{project.role}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{project.client}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{project.endDate}</TableCell>
                    <TableCell className="text-right">
                      <div
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium",
                          status.bg,
                          status.color,
                        )}
                      >
                        {status.icon && <status.icon className="h-3 w-3" />}
                        {project.daysRemaining}d
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Full View Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Projects Ending Soon" size="xl">
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employee or client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-xl"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="ok">OK</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Table */}
          <div className="border border-border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Employee</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead className="text-right">Days Remaining</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((project, index) => {
                  const status = getAlertStatus(project.daysRemaining)
                  return (
                    <TableRow
                      key={index}
                      className="row-highlight animate-fade-slide-up"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <TableCell className="font-medium">{project.employee}</TableCell>
                      <TableCell>{project.client}</TableCell>
                      <TableCell className="text-muted-foreground">{project.role}</TableCell>
                      <TableCell>{project.endDate}</TableCell>
                      <TableCell className="text-right">
                        <Badge className={cn("rounded-full", status.bg, status.color)}>
                          {status.icon && <status.icon className="h-3 w-3 mr-1" />}
                          {project.daysRemaining} days
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </Modal>
    </>
  )
}
