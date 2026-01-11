"use client"

import { useState } from "react"
import { Download, BarChart3, Users, TrendingUp, Target, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("last-30")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Reports</h1>
          <p className="text-muted-foreground text-sm mt-1">Analytics and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40 rounded-xl">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7">Last 7 Days</SelectItem>
              <SelectItem value="last-30">Last 30 Days</SelectItem>
              <SelectItem value="last-90">Last 90 Days</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      <Tabs defaultValue="utilization" className="space-y-6">
        <TabsList className="bg-muted/50 rounded-xl p-1 flex-wrap">
          <TabsTrigger value="utilization" className="rounded-lg">
            Utilization
          </TabsTrigger>
          <TabsTrigger value="bench" className="rounded-lg">
            Bench
          </TabsTrigger>
          <TabsTrigger value="location" className="rounded-lg">
            Location Split
          </TabsTrigger>
          <TabsTrigger value="employment" className="rounded-lg">
            Employment Type
          </TabsTrigger>
          <TabsTrigger value="skills" className="rounded-lg">
            Skills Gap
          </TabsTrigger>
          <TabsTrigger value="forecast" className="rounded-lg">
            Forecast
          </TabsTrigger>
        </TabsList>

        <TabsContent value="utilization" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">87%</p>
                    <p className="text-xs text-muted-foreground">Overall Utilization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary-accent/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-xs text-muted-foreground">Billable Resources</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-xs text-muted-foreground">Non-Billable</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">90%</p>
                    <p className="text-xs text-muted-foreground">Target</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Utilization by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { dept: "Engineering", utilization: 92 },
                  { dept: "Design", utilization: 85 },
                  { dept: "Quality", utilization: 78 },
                  { dept: "Analytics", utilization: 88 },
                  { dept: "Management", utilization: 65 },
                ].map((item) => (
                  <div key={item.dept} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.dept}</span>
                      <span className="font-medium">{item.utilization}%</span>
                    </div>
                    <Progress value={item.utilization} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bench" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">On Bench</p>
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
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-xs text-muted-foreground">{"> 30 Days"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary-accent/10 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-primary-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">18</p>
                    <p className="text-xs text-muted-foreground">Avg Days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Bench Resources</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Days on Bench</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Raj Patel", role: "Backend Developer", skills: "Python, Django", days: 45 },
                    { name: "Anna Martinez", role: "Data Analyst", skills: "SQL, Tableau", days: 32 },
                    { name: "Tom Wilson", role: "Frontend Developer", skills: "React, Vue", days: 15 },
                    { name: "Sara Lee", role: "QA Engineer", skills: "Selenium, Jest", days: 8 },
                  ].map((person, i) => (
                    <TableRow key={i} className="hover:bg-muted/20">
                      <TableCell className="font-medium">{person.name}</TableCell>
                      <TableCell>{person.role}</TableCell>
                      <TableCell className="text-muted-foreground">{person.skills}</TableCell>
                      <TableCell>
                        <span className={person.days > 30 ? "text-red-600 font-medium" : ""}>{person.days} days</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Location Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary-accent/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-accent">65%</span>
                    </div>
                    <div>
                      <p className="font-medium">Onshore</p>
                      <p className="text-sm text-muted-foreground">117 employees</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-blue-600">35%</span>
                    </div>
                    <div>
                      <p className="font-medium">Offshore</p>
                      <p className="text-sm text-muted-foreground">63 employees</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">By Department</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead>Department</TableHead>
                      <TableHead>Onshore</TableHead>
                      <TableHead>Offshore</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { dept: "Engineering", onshore: 45, offshore: 35 },
                      { dept: "Design", onshore: 12, offshore: 3 },
                      { dept: "Quality", onshore: 8, offshore: 15 },
                      { dept: "Analytics", onshore: 10, offshore: 5 },
                    ].map((item, i) => (
                      <TableRow key={i} className="hover:bg-muted/20">
                        <TableCell className="font-medium">{item.dept}</TableCell>
                        <TableCell>{item.onshore}</TableCell>
                        <TableCell>{item.offshore}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employment" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Employment Type Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-green-600">72%</span>
                    </div>
                    <div>
                      <p className="font-medium">Full-Time</p>
                      <p className="text-sm text-muted-foreground">130 employees</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-yellow-600">28%</span>
                    </div>
                    <div>
                      <p className="font-medium">Contract</p>
                      <p className="text-sm text-muted-foreground">50 employees</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Contract Expirations</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead>Period</TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead>Action Needed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { period: "Next 30 days", count: 5, action: "Urgent" },
                      { period: "31-60 days", count: 8, action: "Review" },
                      { period: "61-90 days", count: 12, action: "Plan" },
                    ].map((item, i) => (
                      <TableRow key={i} className="hover:bg-muted/20">
                        <TableCell className="font-medium">{item.period}</TableCell>
                        <TableCell>{item.count}</TableCell>
                        <TableCell>
                          <span
                            className={
                              item.action === "Urgent"
                                ? "text-red-600"
                                : item.action === "Review"
                                  ? "text-yellow-600"
                                  : "text-muted-foreground"
                            }
                          >
                            {item.action}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Skills Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { skill: "React", required: 25, available: 22, gap: -3 },
                  { skill: "Python", required: 15, available: 12, gap: -3 },
                  { skill: "AWS", required: 20, available: 18, gap: -2 },
                  { skill: "DevOps", required: 10, available: 8, gap: -2 },
                  { skill: "Machine Learning", required: 8, available: 4, gap: -4 },
                  { skill: "Node.js", required: 18, available: 20, gap: 2 },
                ].map((item) => (
                  <div key={item.skill} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{item.skill}</span>
                        <span className={`text-sm ${item.gap < 0 ? "text-red-600" : "text-green-600"}`}>
                          {item.gap > 0 ? "+" : ""}
                          {item.gap}
                        </span>
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>Required: {item.required}</span>
                        <span>Available: {item.available}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Project End Forecast</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Month</TableHead>
                    <TableHead>Projects Ending</TableHead>
                    <TableHead>Resources Released</TableHead>
                    <TableHead>Planned Starts</TableHead>
                    <TableHead>Net Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { month: "February 2025", ending: 2, released: 12, starts: 1, impact: -4 },
                    { month: "March 2025", ending: 1, released: 8, starts: 2, impact: 6 },
                    { month: "April 2025", ending: 1, released: 4, starts: 1, impact: 2 },
                    { month: "May 2025", ending: 2, released: 10, starts: 0, impact: -10 },
                    { month: "June 2025", ending: 1, released: 8, starts: 3, impact: 15 },
                  ].map((item, i) => (
                    <TableRow key={i} className="hover:bg-muted/20">
                      <TableCell className="font-medium">{item.month}</TableCell>
                      <TableCell>{item.ending}</TableCell>
                      <TableCell>{item.released}</TableCell>
                      <TableCell>{item.starts}</TableCell>
                      <TableCell>
                        <span className={item.impact < 0 ? "text-red-600" : "text-green-600"}>
                          {item.impact > 0 ? "+" : ""}
                          {item.impact}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
