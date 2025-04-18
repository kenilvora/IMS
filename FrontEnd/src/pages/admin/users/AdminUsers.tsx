import { useState } from "react";
import {
  ArrowUpDown,
  CheckCircle,
  ChevronDown,
  Download,
  Eye,
  FileEdit,
  GraduationCap,
  Plus,
  Search,
  Settings,
  Users,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainLayout from "@/components/main-layout";
import { NavLink } from "react-router-dom";

export default function AdminUsers() {
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Dummy data for users
  const users = [
    {
      id: "user-001",
      name: "John Doe",
      email: "john.doe@university.edu",
      role: "student",
      college: "College of Engineering",
      department: "Computer Science",
      status: "active",
    },
    {
      id: "user-002",
      name: "Emily Johnson",
      email: "emily.johnson@university.edu",
      role: "student",
      college: "College of Engineering",
      department: "Electrical Engineering",
      status: "active",
    },
    {
      id: "user-003",
      name: "Michael Smith",
      email: "michael.smith@university.edu",
      role: "student",
      college: "School of Business",
      department: "Marketing",
      status: "active",
    },
    {
      id: "user-004",
      name: "Sarah Williams",
      email: "sarah.williams@university.edu",
      role: "student",
      college: "College of Arts & Sciences",
      department: "Psychology",
      status: "inactive",
    },
    {
      id: "user-005",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      role: "supervisor",
      college: "College of Engineering",
      department: "Computer Science",
      status: "active",
    },
    {
      id: "user-006",
      name: "Dr. Michael Brown",
      email: "michael.brown@university.edu",
      role: "supervisor",
      college: "School of Business",
      department: "Finance",
      status: "active",
    },
    {
      id: "user-007",
      name: "Dr. Emily Chen",
      email: "emily.chen@university.edu",
      role: "supervisor",
      college: "College of Engineering",
      department: "Software Engineering",
      status: "active",
    },
    {
      id: "user-008",
      name: "Admin User",
      email: "admin@university.edu",
      role: "admin",
      college: "University Administration",
      department: "IT Services",
      status: "active",
    },
  ];

  // Filter users based on role and search query
  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRole && matchesSearch;
  });

  return (
    <MainLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground">
              Manage all users in the system
            </p>
          </div>
          <Button asChild>
            <NavLink to="/admin/users/add">
              <Plus className="mr-2 h-4 w-4" /> Add User
            </NavLink>
          </Button>
        </div>

        <Card className="">
          <CardHeader>
            <CardTitle>User List</CardTitle>
            <CardDescription>
              View and manage all users in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-[180px]">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="student">Students</SelectItem>
                    <SelectItem value="supervisor">Supervisors</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-[180px]">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Export <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" /> Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" /> Export as PDF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Role
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32`}
                              />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {user.role === "student" ? (
                            <div className="flex items-center">
                              <GraduationCap className="mr-2 h-4 w-4 text-blue-600" />
                              Student
                            </div>
                          ) : user.role === "supervisor" ? (
                            <div className="flex items-center">
                              <Users className="mr-2 h-4 w-4 text-green-600" />
                              Supervisor
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Settings className="mr-2 h-4 w-4 text-purple-600" />
                              Admin
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{user.college}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          {user.status === "active" ? (
                            <div className="flex items-center text-sm text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full w-fit">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Active
                            </div>
                          ) : (
                            <div className="flex items-center text-sm text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full w-fit">
                              <XCircle className="mr-1 h-3 w-3" />
                              Inactive
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <NavLink to={`/admin/users/${user.id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </NavLink>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <NavLink to={`/admin/users/${user.id}/edit`}>
                                <FileEdit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </NavLink>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this user? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
