"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Edit, Trash2, Mail, Phone, MapPin, Calendar, Briefcase, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

const employeeData = {
  id: 1,
  name: "John Smith",
  email: "john.smith@company.com",
  phone: "+1 (555) 123-4567",
  role: "Senior Developer",
  department: "Engineering",
  type: "Full-Time",
  location: "Onshore",
  status: "Active",
  joinDate: "2022-03-15",
  address: "123 Main St, San Francisco, CA 94102",
  skills: ["React", "Node.js", "AWS", "TypeScript", "PostgreSQL"],
  certifications: ["AWS Solutions Architect", "Google Cloud Professional"],
  manager: "Sarah Johnson",
  assignments: [
    {
      project: "E-Commerce Platform",
      client: "RetailCorp",
      role: "Lead Developer",
      startDate: "2024-01-15",
      endDate: "2025-06-30",
      allocation: 80,
    },
    {
      project: "Mobile App v2",
      client: "TechStart",
      role: "Senior Developer",
      startDate: "2023-06-01",
      endDate: "2024-01-14",
      allocation: 100,
    },
  ],
  activities: [
    { action: "Assignment updated", date: "2025-01-05", details: "Moved to E-Commerce Platform project" },
    { action: "Skills updated", date: "2024-12-15", details: "Added AWS certification" },
    { action: "Performance review", date: "2024-11-30", details: "Annual review completed" },
  ],
}

export default function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl" asChild>
          <Link href="/employees">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-foreground">Employee Details</h1>
          <p className="text-muted-foreground text-sm mt-1">View and manage employee information</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl text-destructive hover:text-destructive bg-transparent"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button size="sm" className="rounded-xl bg-primary-accent hover:bg-primary-accent/90 text-white" asChild>
            <Link href={`/employees/${id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-24 w-24 border-4 border-primary-accent/20">
              <AvatarFallback className="bg-primary-accent text-white text-2xl font-bold">
                {employeeData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-foreground">{employeeData.name}</h2>
                  <Badge
                    className={`rounded-full ${
                      employeeData.status === "Active"
                        ? "bg-green-500/10 text-green-600"
                        : "bg-yellow-500/10 text-yellow-600"
                    }`}
                  >
                    {employeeData.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  {employeeData.role} • {employeeData.department}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{employeeData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{employeeData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{employeeData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {employeeData.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="bg-muted/50 rounded-xl p-1">
          <TabsTrigger value="personal" className="rounded-lg">
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="employment" className="rounded-lg">
            Employment
          </TabsTrigger>
          <TabsTrigger value="skills" className="rounded-lg">
            Skills & Certifications
          </TabsTrigger>
          <TabsTrigger value="assignments" className="rounded-lg">
            Assignment History
          </TabsTrigger>
          <TabsTrigger value="activity" className="rounded-lg">
            Activity Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{employeeData.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p className="font-medium">{employeeData.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-medium">{employeeData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{employeeData.address}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employment">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Employment Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Job Title</p>
                <p className="font-medium">{employeeData.role}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium">{employeeData.department}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Employment Type</p>
                <p className="font-medium">{employeeData.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Work Location</p>
                <p className="font-medium">{employeeData.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Join Date</p>
                <p className="font-medium">{employeeData.joinDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reports To</p>
                <p className="font-medium">{employeeData.manager}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Skills & Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-3">Technical Skills</p>
                <div className="flex flex-wrap gap-2">
                  {employeeData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="rounded-full px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-3">Certifications</p>
                <div className="space-y-2">
                  {employeeData.certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary-accent" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Assignment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employeeData.assignments.map((assignment, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
                    <div className="h-10 w-10 rounded-full bg-primary-accent/10 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-primary-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{assignment.project}</h4>
                        <Badge variant="outline" className="rounded-full">
                          {assignment.allocation}%
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {assignment.client} • {assignment.role}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {assignment.startDate} — {assignment.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employeeData.activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary-accent mt-2" />
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
