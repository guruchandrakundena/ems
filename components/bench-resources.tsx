"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowRight, UserPlus, Search, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Drawer } from "@/components/ui/slide-drawer"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const benchData = [
  {
    employee: "Alex Turner",
    skills: ["React", "Node.js", "TypeScript"],
    availableSince: "2025-12-15",
    daysOnBench: 25,
    role: "Senior Developer",
    location: "Onshore",
  },
  {
    employee: "Maria Garcia",
    skills: ["Java", "Spring Boot", "AWS"],
    availableSince: "2025-12-28",
    daysOnBench: 12,
    role: "Backend Developer",
    location: "Offshore",
  },
  {
    employee: "David Kim",
    skills: ["Python", "Django", "ML"],
    availableSince: "2025-11-20",
    daysOnBench: 50,
    role: "Data Engineer",
    location: "Offshore",
  },
  {
    employee: "Rachel Brown",
    skills: ["Angular", "C#", ".NET"],
    availableSince: "2026-01-02",
    daysOnBench: 7,
    role: "Full Stack Dev",
    location: "Onshore",
  },
  {
    employee: "Kevin Lee",
    skills: ["React", "GraphQL", "Node.js"],
    availableSince: "2025-12-01",
    daysOnBench: 39,
    role: "Frontend Dev",
    location: "Onshore",
  },
  {
    employee: "Sophie Wang",
    skills: ["Vue.js", "Python", "PostgreSQL"],
    availableSince: "2025-12-20",
    daysOnBench: 20,
    role: "Full Stack Dev",
    location: "Offshore",
  },
  {
    employee: "James Brown",
    skills: ["DevOps", "Kubernetes", "AWS"],
    availableSince: "2026-01-05",
    daysOnBench: 4,
    role: "DevOps Engineer",
    location: "Onshore",
  },
]

const allSkills = [...new Set(benchData.flatMap((r) => r.skills))]

export function BenchResources() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [skillFilter, setSkillFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  const filteredData = benchData.filter((resource) => {
    const matchesSearch = resource.employee.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSkill = skillFilter === "all" || resource.skills.includes(skillFilter)
    const matchesLocation = locationFilter === "all" || resource.location === locationFilter

    return matchesSearch && matchesSkill && matchesLocation
  })

  return (
    <>
      <Card className="bg-card border border-border animate-fade-slide-up">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
          <CardTitle className="text-base font-semibold">Bench Resources</CardTitle>
          <Button
            variant="link"
            size="sm"
            className="text-primary-accent hover:text-primary-accent/80 p-0 h-auto btn-ripple"
            onClick={() => setDrawerOpen(true)}
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs text-muted-foreground font-medium">Employee</TableHead>
                <TableHead className="text-xs text-muted-foreground font-medium">Skills</TableHead>
                <TableHead className="text-xs text-muted-foreground font-medium text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {benchData.slice(0, 5).map((resource, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    "border-border row-highlight cursor-pointer",
                    resource.daysOnBench > 30 && "bg-red-500/5",
                  )}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="font-medium text-foreground text-sm">{resource.employee}</p>
                        <p className="text-xs text-muted-foreground">
                          {resource.availableSince}
                          {resource.daysOnBench > 30 && (
                            <span className="ml-2 text-red-500 font-medium">({resource.daysOnBench}d)</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {resource.skills.slice(0, 3).map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground font-normal"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs text-primary-accent hover:text-primary-accent/80 hover:bg-primary-accent/10"
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
                      Assign
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Full View Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Bench Resources" width="w-[600px]">
        <div className="p-4 space-y-4">
          {/* Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-xl"
              />
            </div>
            <div className="flex gap-2">
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="flex-1 rounded-xl">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  {allSkills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="flex-1 rounded-xl">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Onshore">Onshore</SelectItem>
                  <SelectItem value="Offshore">Offshore</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* List */}
          <div className="space-y-3">
            {filteredData.map((resource, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 border border-border rounded-xl animate-fade-slide-up row-highlight",
                  resource.daysOnBench > 30 && "border-l-4 border-l-red-500",
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{resource.employee}</p>
                    <p className="text-sm text-muted-foreground">{resource.role}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resource.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge
                      className={cn(
                        "rounded-full",
                        resource.daysOnBench > 30
                          ? "bg-red-500/10 text-red-500"
                          : resource.daysOnBench > 14
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-green-500/10 text-green-500",
                      )}
                    >
                      {resource.daysOnBench} days
                    </Badge>
                    <p className="text-xs text-muted-foreground">{resource.location}</p>
                    <Button
                      size="sm"
                      className="mt-2 rounded-xl bg-primary-accent hover:bg-primary-accent/90 text-white"
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
                      Assign
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  )
}
