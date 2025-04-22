import { useEffect, useState } from "react";
import {
  ChevronDown,
  Download,
  Eye,
  FileEdit,
  GraduationCap,
  Plus,
  Search,
  Settings,
  Users,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainLayout from "@/components/main-layout";
import { NavLink } from "react-router-dom";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { apiConnector } from "@/services/apiConnector";

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  college: string;
  department: string;
};

export default function AdminUsers() {
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await apiConnector(
          "GET",
          `${import.meta.env.VITE_API_URL}/auth/allUsers`
        );

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        setUsers(res.data.data);
        setFilteredUsers(res.data.data);
        if (res.data.data.length === 0) {
          setTotalPages(1);
        } else {
          setTotalPages(Math.ceil(res.data.data.length / 10));
        }
      } catch (error) {
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesRole && matchesSearch;
    });

    setFilteredUsers(filtered);
    setTotalPages(Math.ceil(filtered.length / 10));
    setCurrPage(1);
  }, [roleFilter, searchQuery]);

  return loading ? (
    <Spinner />
  ) : (
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

        <Card>
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
                    <SelectItem value="Student">Students</SelectItem>
                    <SelectItem value="Supervisor">Supervisors</SelectItem>
                    <SelectItem value="Admin">Admins</SelectItem>
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

            <div className="rounded-md border max-h-[calc(100vh-340px)] overflow-y-auto">
              <Table>
                <TableHeader className="">
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Department</TableHead>
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
                    filteredUsers
                      .slice((currPage - 1) * 10, currPage * 10)
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={user.image} alt={user.name} />
                                <AvatarFallback>
                                  {user.name.charAt(0)}
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
                            {user.role === "Student" ? (
                              <div className="flex items-center">
                                <GraduationCap className="mr-2 h-4 w-4 text-blue-600" />
                                Student
                              </div>
                            ) : user.role === "Supervisor" ? (
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

            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={currPage === 1}
                  onClick={() => setCurrPage(currPage - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  disabled={currPage === totalPages}
                  onClick={() => setCurrPage(currPage + 1)}
                >
                  Next
                </Button>
              </div>
              <div>
                Page {currPage} of {totalPages}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
