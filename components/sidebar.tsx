"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, FolderKanban, BarChart3, Settings, ChevronRight, Shield } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/lib/auth-context"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Employees", href: "/employees" },
  { icon: FolderKanban, label: "Work Management", href: "/work-management" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Shield, label: "User Management", href: "/admin/users", adminOnly: true },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar({ open, setOpen }: SidebarProps) {
  const [mounted, setMounted] = useState(false)
  const [showText, setShowText] = useState(open)
  const pathname = usePathname()
  const { isAdmin } = useAuth()

  useEffect(() => {
    setMounted(true)
    const savedState = localStorage.getItem("sidebar-open")
    if (savedState !== null) {
      const isOpen = savedState === "true"
      setOpen(isOpen)
      setShowText(isOpen)
    }
  }, [setOpen])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("sidebar-open", String(open))
    }
  }, [open, mounted])

  useEffect(() => {
    if (open) {
      // When expanding: show text after width animation starts
      const timer = setTimeout(() => setShowText(true), 150)
      return () => clearTimeout(timer)
    } else {
      // When collapsing: hide text immediately
      setShowText(false)
    }
  }, [open])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const visibleNavItems = navItems.filter((item) => !item.adminOnly || isAdmin)

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border z-40 flex flex-col theme-transition",
          "transition-all duration-300 ease-in-out",
          open ? "w-60" : "w-16",
        )}
      >
        <div className="p-3 flex justify-end">
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "p-1.5 rounded-lg bg-primary-accent/10 text-primary-accent hover:bg-primary-accent/20 transition-colors",
              "flex items-center justify-center",
            )}
          >
            <ChevronRight className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")} />
          </button>
        </div>

        <nav className="flex-1 py-2 px-2 space-y-1">
          {visibleNavItems.map((item, index) => {
            const active = isActive(item.href)

            const NavLink = (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative group",
                  active
                    ? "bg-primary-accent text-white shadow-lg shadow-primary-accent/25"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0 transition-all duration-200 icon-hover",
                    active ? "text-white" : "group-hover:text-foreground",
                  )}
                />
                <span
                  className={cn(
                    "font-medium text-sm whitespace-nowrap transition-all duration-200",
                    showText && open
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 absolute pointer-events-none",
                  )}
                >
                  {item.label}
                </span>
                {active && !open && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white rounded-full" />
                )}
              </Link>
            )

            if (!open) {
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>{NavLink}</TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return NavLink
          })}
        </nav>
      </aside>
    </TooltipProvider>
  )
}
