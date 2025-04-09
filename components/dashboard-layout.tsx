"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  ChevronDown,
  ClipboardList,
  FileText,
  Home,
  LogOut,
  Settings,
  User,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type NavItem = {
  title: string
  href: string
  icon: React.ElementType
}

type Props = {
  children: React.ReactNode
  userType: "student" | "supervisor" | "admin"
  userName: string
  userRole: string
}

export default function DashboardLayout({ children, userType, userName, userRole }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()

  const studentNavItems: NavItem[] = [
    { title: "Dashboard", href: "/student/dashboard", icon: Home },
    { title: "Internship Details", href: "/student/internship", icon: Briefcase },
    { title: "Tasks", href: "/student/tasks", icon: ClipboardList },
    { title: "Final Report", href: "/student/report", icon: FileText },
    { title: "Profile", href: "/student/profile", icon: User },
  ]

  const supervisorNavItems: NavItem[] = [
    { title: "Dashboard", href: "/supervisor/dashboard", icon: Home },
    { title: "Students", href: "/supervisor/students", icon: Users },
    { title: "Task Tracker", href: "/supervisor/tasks", icon: ClipboardList },
    { title: "Reports Review", href: "/supervisor/reports", icon: FileText },
    { title: "Profile", href: "/supervisor/profile", icon: User },
  ]

  const adminNavItems: NavItem[] = [
    { title: "Dashboard", href: "/admin/dashboard", icon: Home },
    { title: "Students", href: "/admin/students", icon: Users },
    { title: "Internships", href: "/admin/internships", icon: Briefcase },
    { title: "Departments", href: "/admin/departments", icon: Building2 },
    { title: "Supervisors", href: "/admin/supervisors", icon: BookOpen },
    { title: "Reports", href: "/admin/reports", icon: BarChart3 },
    { title: "Settings", href: "/admin/settings", icon: Settings },
  ]

  const navItems =
    userType === "student" ? studentNavItems : userType === "supervisor" ? supervisorNavItems : adminNavItems

  const basePath = `/${userType}`

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 flex-col hidden md:flex",
          isSidebarOpen ? "w-64" : "w-20",
          "bg-white border-r border-slate-200 transition-all duration-300",
        )}
      >
        <div className="flex items-center h-16 px-4 border-b border-slate-200">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold text-slate-800">IMS</h1>
          ) : (
            <div className="w-full flex justify-center">
              <span className="text-xl font-bold text-slate-800">IMS</span>
            </div>
          )}
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <ChevronDown className={cn("h-4 w-4 transition-transform", !isSidebarOpen && "rotate-90")} />
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                <item.icon className="h-4 w-4" />
                {isSidebarOpen && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-slate-200 p-4">
          <div className={cn("flex items-center gap-3", !isSidebarOpen && "flex-col")}>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={userName} />
              <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-slate-900 truncate">{userName}</p>
                <p className="text-xs text-slate-500 truncate">{userRole}</p>
              </div>
            )}
            {isSidebarOpen && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden border-b bg-white">
        <div className="flex items-center h-16 px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex items-center h-16 px-6 border-b">
                <h1 className="text-xl font-bold text-slate-800">IMS</h1>
              </div>
              <nav className="grid gap-1 p-4">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
              <div className="border-t border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt={userName} />
                    <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-slate-900 truncate">{userName}</p>
                    <p className="text-xs text-slate-500 truncate">{userRole}</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold text-slate-800">IMS</h1>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userName} />
                    <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-300",
          "md:pl-[var(--sidebar-width)]",
          isSidebarOpen ? "md:pl-64" : "md:pl-20",
        )}
      >
        <div className="container mx-auto p-4 md:p-6 max-w-7xl">{children}</div>
      </main>
    </div>
  )
}
