"use client"
import Link from "next/link"
import { Plus, Eye, Mail, CheckCircle2, XCircle, Clock, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const onboardingData = [
  {
    id: 1,
    name: "Alex Turner",
    startDate: "2025-01-20",
    status: "Pending",
    itNotified: true,
    completedDate: null,
    daysPending: 5,
  },
  {
    id: 2,
    name: "Maria Garcia",
    startDate: "2025-01-15",
    status: "In Progress",
    itNotified: true,
    completedDate: null,
    daysPending: 10,
  },
  {
    id: 3,
    name: "James Wilson",
    startDate: "2025-01-10",
    status: "Completed",
    itNotified: true,
    completedDate: "2025-01-09",
    daysPending: 0,
  },
  {
    id: 4,
    name: "Sophie Chen",
    startDate: "2025-02-01",
    status: "Pending",
    itNotified: false,
    completedDate: null,
    daysPending: 2,
  },
  {
    id: 5,
    name: "David Brown",
    startDate: "2025-01-08",
    status: "Completed",
    itNotified: true,
    completedDate: "2025-01-07",
    daysPending: 0,
  },
]

export default function OnboardingStatusPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 rounded-full">{status}</Badge>
      case "In Progress":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 rounded-full">{status}</Badge>
      default:
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 rounded-full">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Onboarding Status</h1>
          <p className="text-muted-foreground text-sm mt-1">Track new hire onboarding progress</p>
        </div>
        <Button size="sm" className="rounded-xl bg-primary-accent hover:bg-primary-accent/90 text-white" asChild>
          <Link href="/onboarding/new">
            <Plus className="h-4 w-4 mr-2" />
            New Onboarding
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary-accent/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">5.7</p>
                <p className="text-xs text-muted-foreground">Avg Days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">All Onboardings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Name</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IT Notified</TableHead>
                <TableHead>Completed Date</TableHead>
                <TableHead>Days Pending</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {onboardingData.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/20">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.startDate}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    {item.itNotified ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </TableCell>
                  <TableCell>{item.completedDate || "—"}</TableCell>
                  <TableCell>
                    {item.daysPending > 0 ? (
                      <span className={item.daysPending > 7 ? "text-destructive" : ""}>{item.daysPending} days</span>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Resend Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Mark Complete
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancel
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
    </div>
  )
}
