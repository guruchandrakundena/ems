"use client"

import { useState } from "react"
import { Search, Plus, Download, Upload, MoreHorizontal, Eye, Edit, Trash2, Mail, Phone, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Drawer } from "@/components/ui/slide-drawer"
import { Modal } from "@/components/ui/modal"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

const employees = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 234-567-8901",
    role: "Senior Developer",
    department: "Engineering",
    type: "Full-Time",
    location: "Onshore",
    status: "Active",
    skills: ["React", "Node.js", "AWS"],
    joinDate: "2022-03-15",
    manager: "Jane Doe",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    phone: "+1 234-567-8902",
    role: "Project Manager",
    department: "Management",
    type: "Full-Time",
    location: "Onshore",
    status: "Active",
    skills: ["Agile", "Scrum", "JIRA"],
    joinDate: "2021-06-20",
    manager: "Mike Wilson",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@company.com",
    phone: "+1 234-567-8903",
    role: "DevOps Engineer",
    department: "Engineering",
    type: "Contract",
    location: "Offshore",
    status: "Active",
    skills: ["Docker", "Kubernetes", "CI/CD"],
    joinDate: "2023-01-10",
    manager: "Jane Doe",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@company.com",
    phone: "+1 234-567-8904",
    role: "UX Designer",
    department: "Design",
    type: "Full-Time",
    location: "Onshore",
    status: "Active",
    skills: ["Figma", "UI/UX", "Prototyping"],
    joinDate: "2022-08-05",
    manager: "Lisa Wong",
  },
  {
    id: 5,
    name: "Raj Patel",
    email: "raj.patel@company.com",
    phone: "+1 234-567-8905",
    role: "Backend Developer",
    department: "Engineering",
    type: "Contract",
    location: "Offshore",
    status: "On Bench",
    skills: ["Python", "Django", "PostgreSQL"],
    joinDate: "2022-11-12",
    manager: "Jane Doe",
  },
  {
    id: 6,
    name: "Lisa Wong",
    email: "lisa.wong@company.com",
    phone: "+1 234-567-8906",
    role: "QA Engineer",
    department: "Quality",
    type: "Full-Time",
    location: "Onshore",
    status: "Active",
    skills: ["Selenium", "Jest", "Cypress"],
    joinDate: "2021-09-01",
    manager: "Mike Wilson",
  },
  {
    id: 7,
    name: "David Kim",
    email: "david.kim@company.com",
    phone: "+1 234-567-8907",
    role: "Full Stack Developer",
    department: "Engineering",
    type: "Full-Time",
    location: "Offshore",
    status: "Active",
    skills: ["Vue.js", "Laravel", "MySQL"],
    joinDate: "2023-04-18",
    manager: "Jane Doe",
  },
  {
    id: 8,
    name: "Anna Martinez",
    email: "anna.m@company.com",
    phone: "+1 234-567-8908",
    role: "Data Analyst",
    department: "Analytics",
    type: "Contract",
    location: "Onshore",
    status: "On Bench",
    skills: ["SQL", "Tableau", "Python"],
    joinDate: "2022-07-22",
    manager: "Lisa Wong",
  },
]

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [selectedEmployee, setSelectedEmployee] = useState<(typeof employees)[0] | null>(null)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [addStep, setAddStep] = useState(1)

  const { visibleLocations, canDelete, isAdmin } = useAuth()

  const filteredEmployees = employees.filter((emp) => {
    // Role-based location filtering
    if (!visibleLocations.includes(emp.location)) {
      return false
    }

    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || emp.status === statusFilter
    const matchesType = typeFilter === "all" || emp.type === typeFilter
    const matchesLocation = locationFilter === "all" || emp.location === locationFilter
    return matchesSearch && matchesStatus && matchesType && matchesLocation
  })

  return (
    <div className="space-y-6 animate-fade-slide-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Employee Directory</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isAdmin ? "Manage and view all employees" : `Viewing ${visibleLocations.join(" & ")} employees only`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            size="sm"
            className="rounded-xl bg-primary-accent hover:bg-primary-accent/90 text-white btn-ripple"
            onClick={() => {
              setAddModalOpen(true)
              setAddStep(1)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-xl input-glow"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 rounded-xl">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Bench">On Bench</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32 rounded-xl">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-Time">Full-Time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
              {visibleLocations.length > 1 && (
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-32 rounded-xl">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {visibleLocations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Employee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow
                  key={employee.id}
                  className="row-highlight cursor-pointer"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary-accent/10 text-primary-accent text-xs font-medium">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{employee.name}</p>
                        <p className="text-xs text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{employee.role}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{employee.department}</TableCell>
                  <TableCell>
                    <Badge
                      variant={employee.type === "Full-Time" ? "default" : "secondary"}
                      className="rounded-full text-xs"
                    >
                      {employee.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{employee.location}</TableCell>
                  <TableCell>
                    <Badge
                      className={`rounded-full text-xs ${
                        employee.status === "Active"
                          ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                          : "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20"
                      }`}
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {employee.skills.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="outline" className="rounded-full text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {employee.skills.length > 2 && (
                        <Badge variant="outline" className="rounded-full text-xs">
                          +{employee.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuItem onClick={() => setSelectedEmployee(employee)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        {canDelete && (
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Employee Details Drawer */}
      <Drawer
        open={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        title="Employee Details"
        width="w-[600px]"
      >
        {selectedEmployee && (
          <div className="p-4 space-y-6">
            {/* Profile Header */}
            <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl animate-fade-slide-up">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary-accent/10 text-primary-accent text-xl font-medium">
                  {selectedEmployee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedEmployee.name}</h3>
                    <p className="text-muted-foreground">{selectedEmployee.role}</p>
                  </div>
                  <Badge
                    className={cn(
                      "rounded-full",
                      selectedEmployee.status === "Active"
                        ? "bg-green-500/10 text-green-600"
                        : "bg-yellow-500/10 text-yellow-600",
                    )}
                  >
                    {selectedEmployee.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {selectedEmployee.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {selectedEmployee.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="w-full justify-start bg-muted/50 rounded-xl p-1">
                <TabsTrigger value="personal" className="rounded-lg">
                  Personal
                </TabsTrigger>
                <TabsTrigger value="employment" className="rounded-lg">
                  Employment
                </TabsTrigger>
                <TabsTrigger value="skills" className="rounded-lg">
                  Skills
                </TabsTrigger>
                <TabsTrigger value="assignments" className="rounded-lg">
                  Assignments
                </TabsTrigger>
                <TabsTrigger value="activity" className="rounded-lg">
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-4 space-y-4 tab-content-enter">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">Full Name</p>
                    <p className="font-medium">{selectedEmployee.name}</p>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedEmployee.email}</p>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedEmployee.phone}</p>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-medium">{selectedEmployee.location}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="employment" className="mt-4 space-y-4 tab-content-enter">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="font-medium">{selectedEmployee.department}</p>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">Employment Type</p>
                    <p className="font-medium">{selectedEmployee.type}</p>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">Join Date</p>
                    <p className="font-medium">{selectedEmployee.joinDate}</p>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">Manager</p>
                    <p className="font-medium">{selectedEmployee.manager}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="skills" className="mt-4 tab-content-enter">
                <div className="flex flex-wrap gap-2">
                  {selectedEmployee.skills.map((skill, i) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="rounded-full px-3 py-1 text-sm animate-fade-slide-up"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="assignments" className="mt-4 tab-content-enter">
                <div className="p-4 border border-border rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary-accent/10 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-primary-accent" />
                    </div>
                    <div>
                      <p className="font-medium">Current Project</p>
                      <p className="text-sm text-muted-foreground">E-Commerce Platform - Acme Corp</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-4 tab-content-enter">
                <div className="space-y-3">
                  {[
                    { action: "Project assignment updated", date: "2026-01-08" },
                    { action: "Skills profile updated", date: "2026-01-05" },
                    { action: "Performance review completed", date: "2025-12-15" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/20 animate-fade-slide-up"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <span className="text-sm">{item.action}</span>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-border">
              <Button variant="outline" className="flex-1 rounded-xl bg-transparent">
                <Edit className="h-4 w-4 mr-2" />
                Edit Employee
              </Button>
              {canDelete && (
                <Button variant="destructive" className="rounded-xl">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        )}
      </Drawer>

      {/* Add Employee Modal */}
      <Modal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title={`Add Employee - Step ${addStep} of 3`}
        size="lg"
      >
        <div className="space-y-6">
          {addStep === 1 && (
            <div className="space-y-4 animate-fade-slide-up">
              <p className="text-sm text-muted-foreground">Personal Information</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input className="rounded-xl input-glow" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input className="rounded-xl input-glow" placeholder="Enter last name" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input className="rounded-xl input-glow" type="email" placeholder="Enter email" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input className="rounded-xl input-glow" type="tel" placeholder="Enter phone" />
                </div>
              </div>
            </div>
          )}

          {addStep === 2 && (
            <div className="space-y-4 animate-fade-slide-up">
              <p className="text-sm text-muted-foreground">Employment Details</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="quality">Quality</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input className="rounded-xl input-glow" placeholder="Enter role" />
                </div>
                <div className="space-y-2">
                  <Label>Employment Type</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {visibleLocations.map((loc) => (
                        <SelectItem key={loc} value={loc.toLowerCase()}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {addStep === 3 && (
            <div className="space-y-4 animate-fade-slide-up">
              <p className="text-sm text-muted-foreground">Skills & Additional Info</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Skills (comma separated)</Label>
                  <Input className="rounded-xl input-glow" placeholder="React, Node.js, AWS..." />
                </div>
                <div className="space-y-2">
                  <Label>Manager</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jane-doe">Jane Doe</SelectItem>
                      <SelectItem value="mike-wilson">Mike Wilson</SelectItem>
                      <SelectItem value="lisa-wong">Lisa Wong</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input className="rounded-xl input-glow" type="date" />
                </div>
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="flex gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  step <= addStep ? "bg-primary-accent" : "bg-muted",
                )}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              className="rounded-xl bg-transparent"
              onClick={() => {
                if (addStep > 1) setAddStep(addStep - 1)
                else setAddModalOpen(false)
              }}
            >
              {addStep === 1 ? "Cancel" : "Back"}
            </Button>
            <Button
              className="rounded-xl bg-primary-accent hover:bg-primary-accent/90 text-white btn-ripple"
              onClick={() => {
                if (addStep < 3) setAddStep(addStep + 1)
                else setAddModalOpen(false)
              }}
            >
              {addStep === 3 ? "Create Employee" : "Next"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
