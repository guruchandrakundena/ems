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
  CheckCircle2,
  Clock,
  AlertCircle,
  Send,
  ChevronRight,
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

const onboardingItems = [
  {
    id: 1,
    employeeName: "Alex Thompson",
    email: "alex.t@company.com",
    department: "Engineering",
    startDate: "2026-01-15",
    stage: "IT Setup",
    progress: 60,
    tasks: [
      { name: "HR Documentation", completed: true },
      { name: "IT Equipment", completed: true },
      { name: "System Access", completed: false },
      { name: "Team Introduction", completed: false },
      { name: "Training", completed: false },
    ],
  },
  {
    id: 2,
    employeeName: "Maria Garcia",
    email: "maria.g@company.com",
    department: "Design",
    startDate: "2026-01-20",
    stage: "Documentation",
    progress: 20,
    tasks: [
      { name: "HR Documentation", completed: true },
      { name: "IT Equipment", completed: false },
      { name: "System Access", completed: false },
      { name: "Team Introduction", completed: false },
      { name: "Training", completed: false },
    ],
  },
  {
    id: 3,
    employeeName: "Kevin Park",
    email: "kevin.p@company.com",
    department: "Analytics",
    startDate: "2026-01-08",
    stage: "Training",
    progress: 80,
    tasks: [
      { name: "HR Documentation", completed: true },
      { name: "IT Equipment", completed: true },
      { name: "System Access", completed: true },
      { name: "Team Introduction", completed: true },
      { name: "Training", completed: false },
    ],
  },
  {
    id: 4,
    employeeName: "Sarah Mitchell",
    email: "sarah.m@company.com",
    department: "Quality",
    startDate: "2026-01-25",
    stage: "Not Started",
    progress: 0,
    tasks: [
      { name: "HR Documentation", completed: false },
      { name: "IT Equipment", completed: false },
      { name: "System Access", completed: false },
      { name: "Team Introduction", completed: false },
      { name: "Training", completed: false },
    ],
  },
]

export default function WorkManagementPage() {
  const [activeTab, setActiveTab] = useState("projects")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [selectedClient, setSelectedClient] = useState<(typeof clients)[0] | null>(null)
  const [selectedOnboarding, setSelectedOnboarding] = useState<(typeof onboardingItems)[0] | null>(null)

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

  const filteredOnboarding = onboardingItems.filter(
    (item) =>
      item.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()),
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

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case "Not Started":
        return <Badge className="bg-gray-500/10 text-gray-600 hover:bg-gray-500/20 rounded-full">{stage}</Badge>
      case "Documentation":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 rounded-full">{stage}</Badge>
      case "IT Setup":
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 rounded-full">{stage}</Badge>
      case "Training":
        return <Badge className="bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 rounded-full">{stage}</Badge>
      case "Completed":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 rounded-full">{stage}</Badge>
      default:
        return <Badge className="rounded-full">{stage}</Badge>
    }
  }

  return (
    <div className="space-y-6 animate-fade-slide-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Work Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage projects, clients, and employee onboarding</p>
        </div>
        <Button size="sm" className="rounded-xl bg-primary-accent hover:bg-primary-accent/90 text-white btn-ripple">
          <Plus className="h-4 w-4 mr-2" />
          {activeTab === "projects" ? "New Project" : activeTab === "clients" ? "Add Client" : "New Onboarding"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <TabsList className="bg-muted/50 rounded-xl p-1">
            <TabsTrigger value="projects" className="rounded-lg px-4 data-[state=active]:bg-card">
              <FolderKanban className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="clients" className="rounded-lg px-4 data-[state=active]:bg-card">
              <Building2 className="h-4 w-4 mr-2" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="onboarding" className="rounded-lg px-4 data-[state=active]:bg-card">
              <UserPlus className="h-4 w-4 mr-2" />
              Onboarding
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
        <TabsContent value="projects" className="space-y-6 tab-content-enter">
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
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
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
                    <AlertCircle className="h-5 w-5 text-red-600" />
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
        <TabsContent value="clients" className="space-y-6 tab-content-enter">
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
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
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

        <TabsContent value="onboarding" className="space-y-6 tab-content-enter">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-border/50 card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary-accent/10 flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-primary-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{onboardingItems.length}</p>
                    <p className="text-xs text-muted-foreground">Total Onboarding</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {onboardingItems.filter((i) => i.progress > 0 && i.progress < 100).length}
                    </p>
                    <p className="text-xs text-muted-foreground">In Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gray-500/10 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{onboardingItems.filter((i) => i.progress === 0).length}</p>
                    <p className="text-xs text-muted-foreground">Not Started</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{onboardingItems.filter((i) => i.progress === 100).length}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Onboarding Table */}
          <Card className="border-border/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOnboarding.map((item) => (
                    <TableRow
                      key={item.id}
                      className="row-highlight cursor-pointer"
                      onClick={() => setSelectedOnboarding(item)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary-accent/10 text-primary-accent text-xs font-medium">
                              {item.employeeName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{item.employeeName}</p>
                            <p className="text-xs text-muted-foreground">{item.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>{item.startDate}</TableCell>
                      <TableCell>{getStageBadge(item.stage)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 w-32">
                          <Progress value={item.progress} className="h-2" />
                          <span className="text-xs text-muted-foreground">{item.progress}%</span>
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
                            <DropdownMenuItem onClick={() => setSelectedOnboarding(item)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              Resend Notification
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Mark Complete
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

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Resource Allocation</span>
                <span className="font-medium">{selectedProject.allocation}%</span>
              </div>
              <Progress value={selectedProject.allocation} className="h-3" />
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Team Members</h4>
              <div className="space-y-2">
                {selectedProject.team.map((member, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-muted/20">
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
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="rounded-full">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Client Details Modal */}
      <Modal open={!!selectedClient} onClose={() => setSelectedClient(null)} title="Client Details">
        {selectedClient && (
          <div className="space-y-6">
            <div className="p-4 bg-muted/30 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{selectedClient.name}</h3>
                  <Badge variant="outline" className="rounded-full">
                    {selectedClient.industry}
                  </Badge>
                </div>
                {getStatusBadge(selectedClient.status)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted/20 rounded-lg">
                <p className="text-xs text-muted-foreground">Contact Person</p>
                <p className="font-medium">{selectedClient.contact}</p>
              </div>
              <div className="p-3 bg-muted/20 rounded-lg">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium">{selectedClient.email}</p>
              </div>
              <div className="p-3 bg-muted/20 rounded-lg">
                <p className="text-xs text-muted-foreground">Active Projects</p>
                <p className="font-medium">{selectedClient.projects}</p>
              </div>
              <div className="p-3 bg-muted/20 rounded-lg">
                <p className="text-xs text-muted-foreground">Total Revenue</p>
                <p className="font-medium text-primary-accent">{selectedClient.revenue}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Onboarding Details Drawer */}
      <Drawer
        open={!!selectedOnboarding}
        onClose={() => setSelectedOnboarding(null)}
        title="Onboarding Details"
        width="w-[500px]"
      >
        {selectedOnboarding && (
          <div className="p-4 space-y-6">
            <div className="p-4 bg-muted/30 rounded-xl animate-fade-slide-up">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary-accent/10 text-primary-accent text-lg font-medium">
                    {selectedOnboarding.employeeName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedOnboarding.employeeName}</h3>
                  <p className="text-muted-foreground">{selectedOnboarding.email}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="rounded-full">
                      {selectedOnboarding.department}
                    </Badge>
                    {getStageBadge(selectedOnboarding.stage)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium">{selectedOnboarding.progress}%</span>
              </div>
              <Progress value={selectedOnboarding.progress} className="h-3" />
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Onboarding Tasks</h4>
              <div className="space-y-2">
                {selectedOnboarding.tasks.map((task, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/20 animate-fade-slide-up"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                      )}
                      <span className={task.completed ? "text-muted-foreground line-through" : ""}>{task.name}</span>
                    </div>
                    {!task.completed && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs rounded-lg">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 rounded-xl bg-transparent"
                onClick={() => setSelectedOnboarding(null)}
              >
                <Send className="h-4 w-4 mr-2" />
                Resend Notification
              </Button>
              <Button className="flex-1 rounded-xl bg-primary-accent hover:bg-primary-accent/90 text-white">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark Complete
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
