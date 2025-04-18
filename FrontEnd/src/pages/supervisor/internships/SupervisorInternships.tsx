import { useState } from "react";

import {
  ArrowUpDown,
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

export default function SupervisorInternships() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dummy data for internships
  const internships = [
    {
      id: "int-001",
      student: {
        id: "user-001",
        name: "John Doe",
        email: "john.doe@university.edu",
      },
      company: "TechCorp Inc.",
      position: "Frontend Developer Intern",
      status: "ongoing",
      startDate: "2025-01-15",
      endDate: "2025-06-15",
      tasks: {
        total: 8,
        completed: 4,
      },
    },
    {
      id: "int-004",
      student: {
        id: "user-002",
        name: "Emily Johnson",
        email: "emily.johnson@university.edu",
      },
      company: "CloudNet Systems",
      position: "Backend Developer Intern",
      status: "ongoing",
      startDate: "2025-01-10",
      endDate: "2025-07-10",
      tasks: {
        total: 10,
        completed: 3,
      },
    },
    {
      id: "int-005",
      student: {
        id: "user-003",
        name: "Michael Smith",
        email: "michael.smith@university.edu",
      },
      company: "DataViz Analytics",
      position: "Data Science Intern",
      status: "ongoing",
      startDate: "2025-02-01",
      endDate: "2025-08-01",
      tasks: {
        total: 12,
        completed: 2,
      },
    },
    {
      id: "int-002",
      student: {
        id: "user-004",
        name: "Sarah Williams",
        email: "sarah.williams@university.edu",
      },
      company: "DataSys Solutions",
      position: "Data Analyst Intern",
      status: "completed",
      startDate: "2024-06-01",
      endDate: "2024-12-01",
      tasks: {
        total: 10,
        completed: 10,
      },
    },
    {
      id: "int-003",
      student: {
        id: "user-005",
        name: "David Brown",
        email: "david.brown@university.edu",
      },
      company: "InnovateTech",
      position: "Software Engineering Intern",
      status: "completed",
      startDate: "2023-12-01",
      endDate: "2024-05-01",
      tasks: {
        total: 12,
        completed: 12,
      },
    },
  ];

  // Filter internships based on status and search query
  const filteredInternships = internships.filter((internship) => {
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

  return (
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
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
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
                    <TableHead>Student</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Company
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
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
                    filteredInternships.map((internship) => (
                      <TableRow key={internship.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32`}
                              />
                              <AvatarFallback>
                                {internship.student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
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
                          {new Date(internship.startDate).toLocaleDateString()}{" "}
                          - {new Date(internship.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {internship.status === "ongoing" ? (
                            <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full w-fit">
                              <RefreshCw className="mr-1 h-3 w-3" />
                              Ongoing
                            </div>
                          ) : internship.status === "completed" ? (
                            <div className="flex items-center text-sm text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full w-fit">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Completed
                            </div>
                          ) : (
                            <div className="flex items-center text-sm text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full w-fit">
                              <XCircle className="mr-1 h-3 w-3" />
                              Terminated
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {internship.tasks.completed}/{internship.tasks.total}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <NavLink
                              to={`/supervisor/internships/${internship.id}`}
                            >
                              View Details
                            </NavLink>
                          </Button>
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
