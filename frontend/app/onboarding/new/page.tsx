"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Monitor, Mail, Calendar, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

const equipmentChecklist = [
  { id: "laptop", label: "Laptop" },
  { id: "monitor", label: "External Monitor" },
  { id: "keyboard", label: "Keyboard & Mouse" },
  { id: "headset", label: "Headset" },
  { id: "badge", label: "Access Badge" },
  { id: "phone", label: "Desk Phone" },
]

export default function NewOnboardingPage() {
  const router = useRouter()
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])

  const toggleEquipment = (id: string) => {
    setSelectedEquipment((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/onboarding/status")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl" asChild>
          <Link href="/onboarding/status">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-foreground">Onboard New Hire</h1>
          <p className="text-muted-foreground text-sm mt-1">Set up IT and equipment for a new employee</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary-accent" />
              Employee Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="employeeName">Employee Name *</Label>
              <Input id="employeeName" placeholder="John Smith" className="rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailToCreate">Email to Create *</Label>
              <Input id="emailToCreate" placeholder="john.smith@company.com" className="rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Input id="department" placeholder="Engineering" className="rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manager">Manager *</Label>
              <Input id="manager" placeholder="Sarah Johnson" className="rounded-xl" required />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary-accent" />
              Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input id="startDate" type="date" className="rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orientation">Orientation Date</Label>
              <Input id="orientation" type="date" className="rounded-xl" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary-accent" />
              Equipment Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {equipmentChecklist.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={item.id}
                    checked={selectedEquipment.includes(item.id)}
                    onCheckedChange={() => toggleEquipment(item.id)}
                  />
                  <Label htmlFor={item.id} className="cursor-pointer font-normal">
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary-accent" />
              IT Notification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="itEmail">IT Team Email *</Label>
              <Input id="itEmail" type="email" defaultValue="it@company.com" className="rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any special requirements or notes for IT..."
                className="rounded-xl min-h-24"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" className="rounded-xl bg-transparent" asChild>
            <Link href="/onboarding/status">Cancel</Link>
          </Button>
          <Button type="submit" className="rounded-xl bg-primary-accent hover:bg-primary-accent/90 text-white">
            <Save className="h-4 w-4 mr-2" />
            Create Onboarding
          </Button>
        </div>
      </form>
    </div>
  )
}
