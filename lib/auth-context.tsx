"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "Admin" | "Onshore HR Manager" | "Offshore HR Manager"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  isAdmin: boolean
  isOnshoreManager: boolean
  isOffshoreManager: boolean
  canDelete: boolean
  visibleLocations: string[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const defaultUser: User = {
  id: "1",
  name: "Satya Verma",
  email: "satya@company.com",
  role: "Admin",
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Load user from localStorage or set default
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      setUser(defaultUser)
    }
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user))
    }
  }, [user])

  const isAdmin = user?.role === "Admin"
  const isOnshoreManager = user?.role === "Onshore HR Manager"
  const isOffshoreManager = user?.role === "Offshore HR Manager"
  const canDelete = isAdmin

  const visibleLocations = isAdmin
    ? ["Onshore", "Offshore"]
    : isOnshoreManager
      ? ["Onshore"]
      : isOffshoreManager
        ? ["Offshore"]
        : []

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAdmin,
        isOnshoreManager,
        isOffshoreManager,
        canDelete,
        visibleLocations,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
