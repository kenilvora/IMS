import { useEffect, useState } from "react";

import {
  CheckCircle,
  ChevronDown,
  Download,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainLayout from "@/components/main-layout";
import { NavLink } from "react-router-dom";
import { apiConnector } from "@/services/apiConnector";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { MdPendingActions } from "react-icons/md";

type Internship = {
  id: string;
  student: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  company: string;
  position: string;
  status: "OnGoing" | "Completed";
  startDate: string;
  endDate: string;
  tasks: {
    total: number;
    completed: number;
  };
  approval: "Pending" | "Approved" | "Rejected";
};

export default function SupervisorInternships() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dummy data for internships
  const [internships, setInternships] = useState<Internship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await apiConnector(
          "GET",
          `${
            import.meta.env.VITE_API_URL
          }/internship/getAllInternshipsForSupervisor`
        );

        if (!res.data.success) {
          throw new Error("Failed to fetch internships");
        }

        console.log(res.data.data);

        setInternships(res.data.data);
        setFilteredInternships(res.data.data);
        if (res.data.data.length === 0) {
          setTotalPages(1);
        } else {
          setTotalPages(Math.ceil(res.data.data.length / 10)); // Assuming 10 internships per page
        }
      } catch (error) {
        toast.error("Failed to fetch internships");
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  useEffect(() => {
    const filtered = internships.filter((internship) => {
      const matchesStatus =
        statusFilter === "all" || internship.status === statusFilter;
      const matchesSearch =
        internship.student.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.position.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });

    setFilteredInternships(filtered);
  }, [searchQuery, statusFilter]);

  // Filter internships based on status and search query

  return loading ? (
    <Spinner />
  ) : (
    <MainLayout role="supervisor">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Supervised Internships
            </h1>
            <p className="text-muted-foreground">
              Manage and track internships under your supervision
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Internship List</CardTitle>
            <CardDescription>
              View and manage all internships under your supervision
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

            <div className="rounded-md border max-h-[calc(100vh-340px)] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Position</TableHead>
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
                      <TableCell colSpan={7} className="h-24 text-center">
                        No internships found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInternships
                      .slice((currPage - 1) * 10, currPage * 10)
                      .map((internship) => (
                        <TableRow key={internship.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={internship.student.image}
                                  alt={internship.student.name}
                                />
                                <AvatarFallback>
                                  {internship.student.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {internship.student.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {internship.student.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{internship.company}</TableCell>
                          <TableCell>{internship.position}</TableCell>
                          <TableCell>
                            {new Date(
                              internship.startDate
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(internship.endDate).toLocaleDateString()}
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
                            {internship.tasks.completed}/
                            {internship.tasks.total}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <NavLink
                                to={`/supervisor/internships/${internship.id}`}
                              >
                                Take Action
                              </NavLink>
                            </Button>
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
