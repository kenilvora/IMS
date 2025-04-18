import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Home,
  Briefcase,
  CheckSquare,
  User,
  LogOut,
  Users,
  Building,
  Layers,
  Settings,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import { apiConnector } from "@/services/apiConnector";

type MainLayoutProps = {
  children: React.ReactNode;
  role: "student" | "supervisor" | "admin";
};

type User = {
  firstName: string;
  lastName: string;
  email: string;
};

export default function MainLayout({ children, role }: MainLayoutProps) {
  const pathname = useLocation().pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const userDetails = Cookie.get("user")
      ? JSON.parse(Cookie.get("user")!)
      : null;
    if (userDetails) {
      setUser(userDetails);
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  const navigate = useNavigate();

  const studentNavItems = [
    { href: "/student", label: "Dashboard", icon: Home },
    { href: "/student/internships", label: "My Internships", icon: Briefcase },
    { href: "/student/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/student/profile", label: "Profile", icon: User },
  ];

  const supervisorNavItems = [
    { href: "/supervisor", label: "Dashboard", icon: Home },
    { href: "/supervisor/internships", label: "Internships", icon: Briefcase },
    { href: "/supervisor/profile", label: "Profile", icon: User },
  ];

  const adminNavItems = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/internships", label: "Internships", icon: Briefcase },
    { href: "/admin/colleges", label: "Colleges", icon: Building },
    { href: "/admin/departments", label: "Departments", icon: Layers },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const navItems =
    role === "student"
      ? studentNavItems
      : role === "supervisor"
      ? supervisorNavItems
      : adminNavItems;

  const roleLabel =
    role === "student"
      ? "Student"
      : role === "supervisor"
      ? "Supervisor"
      : "Administrator";

  const userName = user?.firstName + " " + user?.lastName;

  const userEmail = user?.email;

  const userImage = `https://api.dicebear.com/9.x/initials/svg?seed=${userName}`;

  const logOutHandler = async () => {
    try {
      const res = await apiConnector(
        "GET",
        `${import.meta.env.VITE_API_URL}/auth/logout`
      );

      if (!res.data.success) {
        toast.error("Error logging out");
        return;
      }

      Cookie.remove("token", {
        sameSite: "lax",
        secure: true,
      });
      Cookie.remove("user", {
        sameSite: "lax",
        secure: true,
      });
      localStorage.clear();
      navigate("/login", { replace: true });
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Error logging out");
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50 w-screen">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex border-r border-gray-200">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <div>
                <h1 className="font-bold text-blue-900">IMS</h1>
                <p className="text-xs text-gray-500">{roleLabel} Portal</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <NavLink to={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <SidebarSeparator />
            <div className="flex items-center gap-2 mt-2">
              <Avatar>
                <AvatarImage src={userImage} alt={userName} />
                <AvatarFallback>
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userName}</p>
                <p className="text-xs text-gray-500 truncate">{userEmail}</p>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Button variant="ghost" size="icon" onClick={logOutHandler}>
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Log out</span>
                </Button>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Mobile Header */}
        <div className="flex flex-col flex-1">
          <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-gray-200 md:hidden">
            <div className="flex items-center gap-2">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                  <div className="p-4 flex items-center gap-2 border-b">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                    <div>
                      <h1 className="font-bold text-blue-900">IMS</h1>
                      <p className="text-xs text-gray-500">
                        {roleLabel} Portal
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  <div className="py-4">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        className={`flex items-center gap-3 px-4 py-2 text-sm ${
                          pathname === item.href
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </NavLink>
                    ))}
                    <div className="border-t border-gray-200 mt-4 pt-4 px-4">
                      <button
                        className="flex items-center gap-3 py-2 text-sm text-gray-700"
                        onClick={logOutHandler}
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <BookOpen className="h-6 w-6 text-blue-600" />
              <h1 className="font-bold text-blue-900">IMS</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userImage} alt={userName} />
                      <AvatarFallback>
                        {userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {role === "admin" ? (
                    <DropdownMenuItem asChild>
                      <NavLink to="/admin/settings">Settings</NavLink>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild>
                      <NavLink to={`/${role}/profile`}>Profile</NavLink>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-full text-left"
                      onClick={logOutHandler}
                    >
                      Log out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-8 w-full overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
