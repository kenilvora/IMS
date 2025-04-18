import { useState } from "react";

import {
  ArrowUpDown,
  Briefcase,
  CheckCircle,
  ChevronDown,
  Clock,
  Download,
  Search,
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

export default function SupervisorTasks() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dummy data for tasks
  const tasks = [
    {
      id: "task-005",
      title: "Weekly Progress Report",
      description:
        "Submit a weekly progress report detailing tasks completed, challenges faced, and plans for the next week.",
      student: {
        id: "user-001",
        name: "John Doe",
        email: "john.doe@university.edu",
      },
      internship: {
        id: "int-001",
        company: "TechCorp Inc.",
      },
      dueDate: "2025-02-28",
      status: "pending",
    },
    {
      id: "task-006",
      title: "Frontend Feature Implementation",
      description:
        "Implement the new user profile page with edit functionality.",
      student: {
        id: "user-001",
        name: "John Doe",
        email: "john.doe@university.edu",
      },
      internship: {
        id: "int-001",
        company: "TechCorp Inc.",
      },
      dueDate: "2025-03-05",
      status: "pending",
    },
    {
      id: "task-011",
      title: "Database Schema Design",
      description:
        "Design the database schema for the new user management system.",
      student: {
        id: "user-002",
        name: "Emily Johnson",
        email: "emily.johnson@university.edu",
      },
      internship: {
        id: "int-004",
        company: "CloudNet Systems",
      },
      dueDate: "2025-02-25",
      status: "pending",
    },
    {
      id: "task-012",
      title: "API Integration",
      description: "Integrate the payment gateway API with the backend system.",
      student: {
        id: "user-002",
        name: "Emily Johnson",
        email: "emily.johnson@university.edu",
      },
      internship: {
        id: "int-004",
        company: "CloudNet Systems",
      },
      dueDate: "2025-03-05",
      status: "pending",
    },
    {
      id: "task-013",
      title: "Data Cleaning Script",
      description:
        "Write a script to clean and preprocess the customer data for analysis.",
      student: {
        id: "user-003",
        name: "Michael Smith",
        email: "michael.smith@university.edu",
      },
      internship: {
        id: "int-005",
        company: "DataViz Analytics",
      },
      dueDate: "2025-02-20",
      status: "pending",
    },
    {
      id: "task-001",
      title: "Onboarding and Environment Setup",
      description:
        "Set up development environment, get familiar with the codebase, and complete onboarding tasks.",
      student: {
        id: "user-001",
        name: "John Doe",
        email: "john.doe@university.edu",
      },
      internship: {
        id: "int-001",
        company: "TechCorp Inc.",
      },
      dueDate: "2025-01-20",
      status: "completed",
    },
    {
      id: "task-002",
      title: "UI Component Implementation",
      description:
        "Implement the new dashboard card components as per the design specifications.",
      student: {
        id: "user-001",
        name: "John Doe",
        email: "john.doe@university.edu",
      },
      internship: {
        id: "int-001",
        company: "TechCorp Inc.",
      },
      dueDate: "2025-02-05",
      status: "completed",
    },
  ];

  // Filter tasks based on status and search query
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.internship.company.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <MainLayout role="supervisor">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">
              Review and manage student tasks
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Task List</CardTitle>
            <CardDescription>
              View and manage all tasks from your supervised students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tasks..."
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
                    <SelectItem value="pending">Pending</SelectItem>
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
                    <TableHead>
                      <div className="flex items-center">
                        Task
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Internship</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No tasks found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {task.description.substring(0, 60)}...
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32`}
                              />
                              <AvatarFallback>
                                {task.student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {task.student.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {task.student.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                            {task.internship.company}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(task.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {task.status === "completed" ? (
                            <div className="flex items-center text-sm text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full w-fit">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Completed
                            </div>
                          ) : (
                            <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full w-fit">
                              <Clock className="mr-1 h-3 w-3" />
                              Pending
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <NavLink to={`/supervisor/tasks/${task.id}`}>
                              Review
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
