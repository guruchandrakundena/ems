"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, FolderKanban } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const clientData = {
  id: 1,
  name: "RetailCorp",
  industry: "Retail",
  status: "Active",
  contact: "John Doe",
  email: "john@retailcorp.com",
  phone: "+1 (555) 987-6543",
  address: "456 Commerce Ave, New York, NY 10001",
  since: "2022-06-15",
  projects: [
    { id: 1, name: "E-Commerce Platform", status: "Active", startDate: "2024-01-15", endDate: "2025-06-30" },
    { id: 2, name: "Inventory Management", status: "Completed", startDate: "2023-03-01", endDate: "2024-01-14" },
    { id: 3, name: "Mobile App", status: "Planning", startDate: "2025-02-01", endDate: "2025-12-31" },
  ],
}

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 rounded-full">{status}</Badge>
      case "Completed":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 rounded-full">{status}</Badge>
      case "Planning":
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 rounded-full">{status}</Badge>
      default:
        return <Badge className="rounded-full">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl" asChild>
          <Link href="/clients">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-foreground">{clientData.name}</h1>
            <Badge className="bg-green-500/10 text-green-600 rounded-full">{clientData.status}</Badge>
          </div>
          <p className="text-muted-foreground text-sm mt-1">{clientData.industry}</p>
        </div>
        <Button size="sm" className="rounded-xl bg-primary-accent hover:bg-primary-accent/90 text-white">
          <Edit className="h-4 w-4 mr-2" />
          Edit Client
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border/50 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Primary Contact</p>
              <p className="font-medium">{clientData.contact}</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{clientData.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{clientData.phone}</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span>{clientData.address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Client since {clientData.since}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-primary-accent" />
              Linked Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Project Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientData.projects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-muted/20">
                    <TableCell>
                      <Link href={`/projects/${project.id}`} className="font-medium hover:text-primary-accent">
                        {project.name}
                      </Link>
                    </TableCell>
                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                    <TableCell>{project.startDate}</TableCell>
                    <TableCell>{project.endDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
