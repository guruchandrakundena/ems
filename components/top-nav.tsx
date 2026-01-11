"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Search, Moon, Sun, User, Settings, LogOut, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TopNavProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

export function TopNav({ darkMode, setDarkMode }: TopNavProps) {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border h-16 flex items-center px-4 lg:px-6 gap-4">
      <Link href="/" className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-accent to-primary-accent/80 flex items-center justify-center shadow-lg shadow-primary-accent/20">
          <span className="text-white font-bold text-sm">HR</span>
        </div>
        <div className="hidden md:block">
          <h1 className="font-semibold text-foreground text-sm">HR Management</h1>
          <p className="text-xs text-muted-foreground">Resource Management & Tracking</p>
        </div>
      </Link>

      <div className="flex-1 max-w-md mx-auto hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees, clients, projects..."
            className="pl-9 bg-muted/30 border-border/50 focus:border-primary-accent focus:ring-primary-accent/20 rounded-xl h-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 ml-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center rounded-full bg-primary-accent text-white text-[10px] font-bold">
            5
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 rounded-xl hover:bg-muted">
              <Avatar className="h-8 w-8 border-2 border-primary-accent/20">
                <AvatarImage src="/professional-avatar.png" />
                <AvatarFallback className="bg-primary-accent text-white text-xs font-bold">SV</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl">
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
