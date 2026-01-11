"use client"
import { User, Building2, Users, Mail, Cog, FileText, Save, Sun, Moon, Monitor, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"
import { useTheme, type ThemeMode } from "@/lib/theme-context"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const { user, isAdmin } = useAuth()
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-6 animate-fade-slide-up">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account and system settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-muted/50 rounded-xl p-1 flex-wrap">
          <TabsTrigger value="profile" className="rounded-lg">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="appearance" className="rounded-lg">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          {isAdmin && (
            <>
              <TabsTrigger value="company" className="rounded-lg">
                <Building2 className="h-4 w-4 mr-2" />
                Company
              </TabsTrigger>
              <TabsTrigger value="departments" className="rounded-lg">
                <Users className="h-4 w-4 mr-2" />
                Departments
              </TabsTrigger>
              <TabsTrigger value="email" className="rounded-lg">
                <Mail className="h-4 w-4 mr-2" />
                Email Templates
              </TabsTrigger>
              <TabsTrigger value="system" className="rounded-lg">
                <Cog className="h-4 w-4 mr-2" />
                System
              </TabsTrigger>
              <TabsTrigger value="audit" className="rounded-lg">
                <FileText className="h-4 w-4 mr-2" />
                Audit Logs
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="profile" className="space-y-6 tab-content-enter">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary-accent text-white text-xl font-bold">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "SV"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={user?.name?.split(" ")[0] || "Satya"} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={user?.name?.split(" ")[1] || "Verma"} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email || "satya@company.com"}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="rounded-xl" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="rounded-xl bg-primary-accent hover:bg-primary-accent/90 text-white btn-ripple">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Change Password</CardTitle>
              <CardDescription>Update your password for security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" className="rounded-xl" />
              </div>
              <div className="flex justify-end">
                <Button className="rounded-xl bg-primary-accent hover:bg-primary-accent/90 text-white btn-ripple">
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6 tab-content-enter">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Appearance Settings</CardTitle>
              <CardDescription>Customize how the application looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">Theme</Label>
                <p className="text-sm text-muted-foreground">Select your preferred appearance mode</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "light" as ThemeMode, icon: Sun, label: "Light", desc: "Light background with dark text" },
                    { value: "dark" as ThemeMode, icon: Moon, label: "Dark", desc: "Dark background with light text" },
                    {
                      value: "system" as ThemeMode,
                      icon: Monitor,
                      label: "System",
                      desc: "Follows your system preference",
                    },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value)}
                      className={cn(
                        "flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 card-hover",
                        theme === option.value
                          ? "border-primary-accent bg-primary-accent/5"
                          : "border-border hover:border-primary-accent/50",
                      )}
                    >
                      <div
                        className={cn(
                          "h-12 w-12 rounded-xl flex items-center justify-center transition-colors",
                          theme === option.value ? "bg-primary-accent text-white" : "bg-muted text-muted-foreground",
                        )}
                      >
                        <option.icon className="h-6 w-6" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{option.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">{option.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reduced Motion</p>
                  <p className="text-sm text-muted-foreground">Minimize animations throughout the interface</p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">High Contrast</p>
                  <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin-only tabs */}
        {isAdmin && (
          <>
            <TabsContent value="company" className="space-y-6 tab-content-enter">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Company Information</CardTitle>
                  <CardDescription>Manage your company details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" defaultValue="DataFactz Inc." className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select defaultValue="technology">
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        defaultValue="123 Tech Street, San Francisco, CA 94102"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" defaultValue="https://datafactz.com" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="pst">
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                          <SelectItem value="est">Eastern Time (EST)</SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button className="rounded-xl bg-primary-accent hover:bg-primary-accent/90 text-white btn-ripple">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="departments" className="space-y-6 tab-content-enter">
              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Departments</CardTitle>
                    <CardDescription>Manage company departments</CardDescription>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-xl bg-primary-accent hover:bg-primary-accent/90 text-white btn-ripple"
                  >
                    Add Department
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Engineering", "Design", "Quality Assurance", "Analytics", "Management", "Human Resources"].map(
                      (dept, i) => (
                        <div
                          key={dept}
                          className="flex items-center justify-between p-3 rounded-xl bg-muted/30 animate-fade-slide-up"
                          style={{ animationDelay: `${i * 50}ms` }}
                        >
                          <span className="font-medium">{dept}</span>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="rounded-lg">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-lg text-destructive">
                              Delete
                            </Button>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email" className="space-y-6 tab-content-enter">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Email Templates</CardTitle>
                  <CardDescription>Customize system email notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Welcome Email", desc: "Sent to new employees" },
                      { name: "Onboarding Notification", desc: "Sent to IT team" },
                      { name: "Project Assignment", desc: "Sent when assigned to project" },
                      { name: "Contract Expiry", desc: "Reminder before contract ends" },
                      { name: "Password Reset", desc: "Password reset link" },
                    ].map((template, i) => (
                      <div
                        key={template.name}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/30 animate-fade-slide-up"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-xs text-muted-foreground">{template.desc}</p>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
                          Edit Template
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-6 tab-content-enter">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">System Configuration</CardTitle>
                  <CardDescription>Configure system-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive email alerts for important events</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-logout</p>
                      <p className="text-sm text-muted-foreground">Automatically logout after inactivity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Session Timeout (minutes)</Label>
                    <Select defaultValue="30">
                      <SelectTrigger className="rounded-xl w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audit" className="space-y-6 tab-content-enter">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Audit Logs</CardTitle>
                  <CardDescription>View system activity history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { action: "User login", user: "admin@company.com", time: "2026-01-11 14:32:00" },
                      { action: "Employee created", user: "hr@company.com", time: "2026-01-11 12:15:00" },
                      { action: "Project updated", user: "admin@company.com", time: "2026-01-11 10:45:00" },
                      { action: "Settings changed", user: "admin@company.com", time: "2026-01-10 16:20:00" },
                      { action: "User role updated", user: "admin@company.com", time: "2026-01-10 14:10:00" },
                    ].map((log, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/30 animate-fade-slide-up"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-xs text-muted-foreground">{log.user}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
}
