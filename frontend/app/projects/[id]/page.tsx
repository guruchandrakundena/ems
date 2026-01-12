"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Edit, Users, Calendar, DollarSign, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const projectData = {
  id: 1,
  name: "E-Commerce Platform",
  client: "RetailCorp",
  description:
    "Building a modern e-commerce platform with advanced features including real-time inventory, AI-powered recommendations, and seamless checkout experience.",
  startDate: "2024-01-15",
  endDate: "2025-06-30",
  status: "Active",
  budget: "$450,000",
  allocation: 85,
  requiredSkills: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
  team: [
    { name: "John Smith", role: "Lead Developer", allocation: 80 },
    { name: "Sarah Johnson", role: "Project Manager", allocation: 50 },
    { name: "Mike Chen", role: "DevOps Engineer", allocation: 100 },
    { name: "Emily Davis", role: "UX Designer", allocation: 60 },
    { name: "Lisa Wong", role: "QA Engineer", allocation: 80 },
  ],
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl" asChild>
          <Link href="/projects">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-foreground">{projectData.name}</h1>
            <Badge className="bg-green-500/10 text-green-600 rounded-full">{projectData.status}</Badge>
          </div>
          <p className="text-muted-foreground text-sm mt-1">{projectData.client}</p>
        </div>
        <Button size="sm" className="rounded-xl bg-primary-accent hover:bg-primary-accent/90 text-white">
          <Edit className="h-4 w-4 mr-2" />
          Edit Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary-accent/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary-accent" />
              </div>
              <div>
                <p className="text-sm font-medium">{projectData.startDate}</p>
                <p className="text-xs text-muted-foreground">Start Date</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{projectData.endDate}</p>
                <p className="text-xs text-muted-foreground">End Date</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{projectData.budget}</p>
                <p className="text-xs text-muted-foreground">Budget</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{projectData.team.length}</p>
                <p className="text-xs text-muted-foreground">Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Project Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{projectData.description}</p>
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Overall Allocation</p>
            <div className="flex items-center gap-3">
              <Progress value={projectData.allocation} className="flex-1 h-3" />
              <span className="text-sm font-medium">{projectData.allocation}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-primary-accent" />
            Required Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {projectData.requiredSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="rounded-full px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-primary-accent" />
            Team Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Team Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Allocation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectData.team.map((member, index) => (
                <TableRow key={index} className="hover:bg-muted/20">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary-accent/10 text-primary-accent text-xs">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 w-24">
                      <Progress value={member.allocation} className="h-2" />
                      <span className="text-xs">{member.allocation}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
