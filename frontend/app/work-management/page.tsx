"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Eye,
  MoreHorizontal,
  Users,
  Calendar,
  Building2,
  FolderKanban,
  Edit,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Drawer } from "@/components/ui/slide-drawer"
import { Modal } from "@/components/ui/modal"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const projects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    client: "RetailCorp",
    startDate: "2024-01-15",
    endDate: "2025-06-30",
    status: "Active",
    teamSize: 8,
    allocation: 85,
    team: ["John Smith", "Sarah Johnson", "Mike Chen"],
    skills: ["React", "Node.js", "AWS"],
  },
  {
    id: 2,
    name: "Mobile Banking App",
    client: "FinanceFirst",
    startDate: "2024-03-01",
    endDate: "2025-03-31",
    status: "Active",
    teamSize: 12,
    allocation: 92,
    team: ["Emily Davis", "Raj Patel", "Lisa Wong"],
    skills: ["React Native", "Java", "PostgreSQL"],
  },
  {
    id: 3,
    name: "Healthcare Portal",
    client: "MedTech Inc",
    startDate: "2024-06-01",
    endDate: "2025-02-28",
    status: "At Risk",
    teamSize: 6,
    allocation: 75,
    team: ["David Kim", "Anna Martinez"],
    skills: ["Vue.js", "Python", "MongoDB"],
  },
  {
    id: 4,
    name: "Inventory System",
    client: "LogiCorp",
    startDate: "2024-09-15",
    endDate: "2025-05-15",
    status: "Active",
    teamSize: 5,
    allocation: 60,
    team: ["Tom Harris", "Kevin Lee"],
    skills: ["Angular", "C#", ".NET"],
  },
  {
    id: 5,
    name: "CRM Integration",
    client: "SalesForce Pro",
    startDate: "2024-11-01",
    endDate: "2025-04-30",
    status: "On Hold",
    teamSize: 4,
    allocation: 0,
    team: ["Sophie Wang"],
    skills: ["Salesforce", "Python", "API"],
  },
  {
    id: 6,
    name: "Data Analytics Dashboard",
    client: "DataDriven Co",
    startDate: "2025-01-01",
    endDate: "2025-07-31",
    status: "Active",
    teamSize: 7,
    allocation: 88,
    team: ["James Brown", "Rachel Brown"],
    skills: ["Python", "Tableau", "SQL"],
  },
]

const clients = [
  {
    id: 1,
    name: "RetailCorp",
    industry: "Retail",
    status: "Active",
    projects: 3,
    contact: "John Doe",
    email: "john@retailcorp.com",
    revenue: "$2.5M",
  },
  {
    id: 2,
    name: "FinanceFirst",
    industry: "Finance",
    status: "Active",
    projects: 2,
    contact: "Jane Smith",
    email: "jane@financefirst.com",
    revenue: "$4.2M",
  },
  {
    id: 3,
    name: "MedTech Inc",
    industry: "Healthcare",
    status: "Active",
    projects: 1,
    contact: "Bob Wilson",
    email: "bob@medtech.com",
    revenue: "$1.8M",
  },
  {
    id: 4,
    name: "LogiCorp",
    industry: "Logistics",
    status: "Active",
    projects: 2,
    contact: "Alice Brown",
    email: "alice@logicorp.com",
    revenue: "$1.2M",
  },
  {
    id: 5,
    name: "SalesForce Pro",
    industry: "Technology",
    status: "Inactive",
    projects: 1,
    contact: "Charlie Davis",
    email: "charlie@salesforcepro.com",
    revenue: "$0.8M",
  },
  {
    id: 6,
    name: "DataDriven Co",
    industry: "Analytics",
    status: "Active",
    projects: 1,
    contact: "Diana Lee",
    email: "diana@datadriven.com",
    revenue: "$1.5M",
  },
]

export default function WorkManagementPage() {
  const [activeTab, setActiveTab] = useState("projects")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [selectedClient, setSelectedClient] = useState<(typeof clients)[0] | null>(null)

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 rounded-full">{status}</Badge>
      case "At Risk":
        return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20 rounded-full">{status}</Badge>
      case "On Hold":
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 rounded-full">{status}</Badge>
      case "Inactive":
        return <Badge className="bg-gray-500/10 text-gray-600 hover:bg-gray-500/20 rounded-full">{status}</Badge>
      default:
        return <Badge className="rounded-full">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6 animate-fade-slide-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Work Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage projects and client relationships</p>
        </div>
        <Button size="sm" className="rounded-xl bg-primary-accent hover:bg-primary-accent/90 text-white btn-ripple">
          <Plus className="h-4 w-4 mr-2" />
          {activeTab === "projects" ? "New Project" : "Add Client"}
        </Button>
      </div>

      {/* Tab Switcher */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <TabsList className="bg-muted/50 rounded-xl p-1">
            <TabsTrigger value="projects" className="rounded-lg px-6">
              <FolderKanban className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="clients" className="rounded-lg px-6">
              <Building2 className="h-4 w-4 mr-2" />
              Clients
            </TabsTrigger>
          </TabsList>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-xl input-glow"
            />
          </div>
        </div>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6 animate-fade-slide-up">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-border/50 card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary-accent/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{projects.length}</p>
                    <p className="text-xs text-muted-foreground">Total Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{projects.filter((p) => p.status === "Active").length}</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{projects.filter((p) => p.status === "At Risk").length}</p>
                    <p className="text-xs text-muted-foreground">At Risk</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{projects.reduce((acc, p) => acc + p.teamSize, 0)}</p>
                    <p className="text-xs text-muted-foreground">Total Assigned</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Table */}
          <Card className="border-border/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Project Name</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Team Size</TableHead>
                    <TableHead>Allocation</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow
                      key={project.id}
                      className="row-highlight cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.client}</TableCell>
                      <TableCell>{project.startDate}</TableCell>
                      <TableCell>{project.endDate}</TableCell>
                      <TableCell>{getStatusBadge(project.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {project.teamSize}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 w-24">
                          <Progress value={project.allocation} className="h-2" />
                          <span className="text-xs text-muted-foreground">{project.allocation}%</span>
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
                            <DropdownMenuItem onClick={() => setSelectedProject(project)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients" className="space-y-6 animate-fade-slide-up">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border/50 card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary-accent/10 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{clients.length}</p>
                    <p className="text-xs text-muted-foreground">Total Clients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{clients.filter((c) => c.status === "Active").length}</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <FolderKanban className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{clients.reduce((acc, c) => acc + c.projects, 0)}</p>
                    <p className="text-xs text-muted-foreground">Total Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clients Table */}
          <Card className="border-border/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Client Name</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow
                      key={client.id}
                      className="row-highlight cursor-pointer"
                      onClick={() => setSelectedClient(client)}
                    >
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="rounded-full">
                          {client.industry}
                        </Badge>
                      </TableCell>
                      <TableCell>{client.contact}</TableCell>
                      <TableCell className="text-muted-foreground">{client.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <FolderKanban className="h-4 w-4 text-muted-foreground" />
                          {client.projects}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(client.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl">
                            <DropdownMenuItem onClick={() => setSelectedClient(client)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Project Details Drawer */}
      <Drawer
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title="Project Details"
        width="w-[600px]"
      >
        {selectedProject && (
          <div className="p-4 space-y-6">
            {/* Header */}
            <div className="p-4 bg-muted/30 rounded-xl animate-fade-slide-up">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{selectedProject.name}</h3>
                  <p className="text-muted-foreground">{selectedProject.client}</p>
                </div>
                {getStatusBadge(selectedProject.status)}
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {selectedProject.startDate} - {selectedProject.endDate}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {selectedProject.teamSize} members
                </span>
              </div>
            </div>

            {/* Allocation */}
            <div className="space-y-2 animate-fade-slide-up stagger-1" style={{ animationFillMode: "backwards" }}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Resource Allocation</span>
                <span className="font-medium">{selectedProject.allocation}%</span>
              </div>
              <Progress value={selectedProject.allocation} className="h-3" />
            </div>

            {/* Team Members */}
            <div className="space-y-3 animate-fade-slide-up stagger-2" style={{ animationFillMode: "backwards" }}>
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Team Members</h4>
                <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Assign
                </Button>
              </div>
              {selectedProject.team.map((member, i) => (
                <div
                  key={member}
                  className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg animate-fade-slide-up"
                  style={{ animationDelay: `${(i + 3) * 50}ms` }}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary-accent/10 text-primary-accent text-xs">
                      {member
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{member}</span>
                </div>
              ))}
            </div>

            {/* Required Skills */}
            <div className="space-y-3 animate-fade-slide-up stagger-3" style={{ animationFillMode: "backwards" }}>
              <h4 className="font-medium">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.skills.map((skill, i) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="rounded-full animate-fade-slide-up"
                    style={{ animationDelay: `${(i + 5) * 50}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Client Details Modal */}
      <Modal open={!!selectedClient} onClose={() => setSelectedClient(null)} title="Client Details" size="lg">
        {selectedClient && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl animate-fade-slide-up">
              <div className="h-16 w-16 rounded-xl bg-primary-accent/10 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedClient.name}</h3>
                    <Badge variant="outline" className="mt-1 rounded-full">
                      {selectedClient.industry}
                    </Badge>
                  </div>
                  {getStatusBadge(selectedClient.status)}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>Contact: {selectedClient.contact}</p>
                  <p>Email: {selectedClient.email}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="p-4 bg-muted/20 rounded-xl animate-fade-slide-up stagger-1"
                style={{ animationFillMode: "backwards" }}
              >
                <p className="text-2xl font-bold">{selectedClient.projects}</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
              <div
                className="p-4 bg-muted/20 rounded-xl animate-fade-slide-up stagger-2"
                style={{ animationFillMode: "backwards" }}
              >
                <p className="text-2xl font-bold">{selectedClient.revenue}</p>
                <p className="text-sm text-muted-foreground">Revenue</p>
              </div>
            </div>

            {/* Associated Projects */}
            <div className="space-y-3 animate-fade-slide-up stagger-3" style={{ animationFillMode: "backwards" }}>
              <h4 className="font-medium">Associated Projects</h4>
              {projects
                .filter((p) => p.client === selectedClient.name)
                .map((project, i) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 bg-muted/20 rounded-lg animate-fade-slide-up"
                    style={{ animationDelay: `${(i + 4) * 50}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <FolderKanban className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{project.name}</span>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>
                ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
