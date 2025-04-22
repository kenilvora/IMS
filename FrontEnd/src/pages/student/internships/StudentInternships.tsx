import { useEffect, useState } from "react";

import {
  CheckCircle,
  ChevronDown,
  Download,
  Eye,
  FileEdit,
  Plus,
  RefreshCw,
  Search,
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
import MainLayout from "@/components/main-layout";
import { NavLink } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { apiConnector } from "@/services/apiConnector";
import toast from "react-hot-toast";
import { MdPendingActions } from "react-icons/md";

type Internship = {
  id: string;
  company: string;
  position: string;
  supervisor: string;
  status: "OnGoing" | "Completed";
  startDate: string;
  endDate: string;
  tasks: {
    total: number;
    completed: number;
  };
  approval: "Pending" | "Approved" | "Rejected";
};

export default function StudentInternships() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [internships, setInternships] = useState<Internship[]>([]);

  const [filteredInternships, setFilteredInternships] = useState<Internship[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await apiConnector(
          "GET",
          `${import.meta.env.VITE_API_URL}/internship/getAllInternships`
        );

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        setInternships(res.data.data);
        setFilteredInternships(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch internships");
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  useEffect(() => {
    const filtered = internships.filter((internship: Internship) => {
      const matchesStatus =
        statusFilter === "all" ||
        internship.status.toLowerCase() === statusFilter;
      const matchesSearch =
        internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.supervisor.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });

    setFilteredInternships(filtered);
  }, [statusFilter, searchQuery]);

  return loading ? (
    <Spinner />
  ) : (
    <MainLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              My Internships
            </h1>
            <p className="text-muted-foreground">
              Manage and track all your internships
            </p>
          </div>
          <Button asChild>
            <NavLink to="/student/internships/add">
              <Plus className="mr-2 h-4 w-4" /> Add Internship
            </NavLink>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Internship List</CardTitle>
            <CardDescription>
              View and manage all your internships
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search internships..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-[180px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="OnGoing">Ongoing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
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
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Supervisor</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Approval Status</TableHead>
                    <TableHead>Tasks</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInternships.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No internships found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInternships.map((internship, i) => (
                      <TableRow key={internship.id}>
                        <TableCell className="font-medium">{i + 1}</TableCell>
                        <TableCell>{internship.company}</TableCell>
                        <TableCell>{internship.position}</TableCell>
                        <TableCell>{internship.supervisor}</TableCell>
                        <TableCell>
                          {new Date(internship.startDate).toLocaleDateString()}{" "}
                          - {new Date(internship.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {internship.status === "OnGoing" ? (
                            <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full w-fit">
                              <RefreshCw className="mr-1 h-3 w-3" />
                              Ongoing
                            </div>
                          ) : (
                            <div className="flex items-center text-sm text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full w-fit">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Completed
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {internship.approval === "Pending" ? (
                            <div className="flex items-center text-sm text-yellow-600 bg-yellow-50 px-2.5 py-0.5 rounded-full w-fit">
                              <MdPendingActions className="mr-1 h-3 w-3" />
                              Pending
                            </div>
                          ) : internship.approval === "Approved" ? (
                            <div className="flex items-center text-sm text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full w-fit">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Approved
                            </div>
                          ) : (
                            <div className="flex items-center text-sm text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full w-fit">
                              <XCircle className="mr-1 h-3 w-3" />
                              Rejected
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {internship.tasks.completed}/{internship.tasks.total}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <NavLink
                                to={`/student/internships/${internship.id}`}
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </NavLink>
                            </Button>
                            {internship.status === "OnGoing" && (
                              <Button variant="ghost" size="icon" asChild>
                                <NavLink
                                  to={`/student/internships/edit/${internship.id}`}
                                >
                                  <FileEdit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </NavLink>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
