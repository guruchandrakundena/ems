"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Search, Moon, Sun, Monitor, User, Settings, LogOut, Lock, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { useTheme, type ThemeMode } from "@/lib/theme-context"
import { Badge } from "@/components/ui/badge"

export function TopNav() {
  const router = useRouter()
  const { user, setUser } = useAuth()
  const { theme, setTheme, resolvedTheme } = useTheme()

  const handleLogout = () => {
    router.push("/login")
  }

  const handleRoleChange = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role })
    }
  }

  const ThemeIcon = theme === "system" ? Monitor : resolvedTheme === "dark" ? Moon : Sun

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border h-16 flex items-center px-4 lg:px-6 gap-4 theme-transition">
      <Link href="/" className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-accent to-primary-accent/80 flex items-center justify-center shadow-lg shadow-primary-accent/20">
          <span className="text-white font-bold text-sm">DFZ</span>
        </div>
        <div className="hidden md:block">
          <h1 className="font-semibold text-foreground text-sm">Employee Management</h1>
          <p className="text-xs text-muted-foreground">Resource Management & Tracking</p>
        </div>
      </Link>

      <div className="flex-1 max-w-md mx-auto hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees, clients, projects..."
            className="pl-9 bg-muted/30 border-border/50 focus:border-primary-accent focus:ring-primary-accent/20 rounded-xl h-10 input-glow"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl"
            >
              <ThemeIcon className="h-5 w-5 icon-hover" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl w-40">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={theme} onValueChange={(v) => setTheme(v as ThemeMode)}>
              <DropdownMenuRadioItem value="light" className="rounded-lg">
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark" className="rounded-lg">
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="system" className="rounded-lg">
                <Monitor className="mr-2 h-4 w-4" />
                System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl"
        >
          <Bell className="h-5 w-5 icon-hover" />
          <span className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center rounded-full bg-primary-accent text-white text-[10px] font-bold">
            5
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 rounded-xl hover:bg-muted">
              <Avatar className="h-8 w-8 border-2 border-primary-accent/20">
                <AvatarImage src="/professional-avatar.png" />
                <AvatarFallback className="bg-primary-accent text-white text-xs font-bold">
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "SV"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm font-medium">{user?.name || "User"}</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 rounded-full">
                  {user?.role || "Admin"}
                </Badge>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden lg:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user?.name}</span>
                <span className="text-xs text-muted-foreground font-normal">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuLabel className="text-xs text-muted-foreground">Switch Role (Demo)</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={user?.role || "Admin"}
              onValueChange={(v) => handleRoleChange(v as UserRole)}
            >
              <DropdownMenuRadioItem value="Admin" className="rounded-lg text-sm">
                Admin
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Onshore HR Manager" className="rounded-lg text-sm">
                Onshore HR Manager
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Offshore HR Manager" className="rounded-lg text-sm">
                Offshore HR Manager
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-lg">
              <User className="mr-2 h-4 w-4" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg">
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg" asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive rounded-lg" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
