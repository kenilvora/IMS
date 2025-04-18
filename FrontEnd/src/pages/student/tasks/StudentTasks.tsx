import { useState } from "react";

import {
  ArrowUpDown,
  Briefcase,
  CheckCircle,
  ChevronDown,
  Clock,
  Download,
  Eye,
  FileEdit,
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
import MainLayout from "@/components/main-layout";
import { NavLink } from "react-router-dom";

export default function StudentTasks() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dummy data for tasks
  const tasks = [
    {
      id: "task-001",
      title: "Onboarding and Environment Setup",
      description:
        "Set up development environment, get familiar with the codebase, and complete onboarding tasks.",
      internship: "TechCorp Inc.",
      internshipId: "int-001",
      dueDate: "2025-01-20",
      status: "completed",
    },
    {
      id: "task-002",
      title: "UI Component Implementation",
      description:
        "Implement the new dashboard card components as per the design specifications.",
      internship: "TechCorp Inc.",
      internshipId: "int-001",
      dueDate: "2025-02-05",
      status: "completed",
    },
    {
      id: "task-003",
      title: "Bug Fixes for Mobile View",
      description: "Fix reported bugs in the mobile view of the application.",
      internship: "TechCorp Inc.",
      internshipId: "int-001",
      dueDate: "2025-02-20",
      status: "completed",
    },
    {
      id: "task-004",
      title: "Accessibility Improvements",
      description:
        "Improve accessibility of the application by implementing ARIA attributes and keyboard navigation.",
      internship: "TechCorp Inc.",
      internshipId: "int-001",
      dueDate: "2025-03-10",
      status: "completed",
    },
    {
      id: "task-005",
      title: "Weekly Progress Report",
      description:
        "Submit a weekly progress report detailing tasks completed, challenges faced, and plans for the next week.",
      internship: "TechCorp Inc.",
      internshipId: "int-001",
      dueDate: "2025-02-28",
      status: "pending",
    },
    {
      id: "task-006",
      title: "Frontend Feature Implementation",
      description:
        "Implement the new user profile page with edit functionality.",
      internship: "TechCorp Inc.",
      internshipId: "int-001",
      dueDate: "2025-03-05",
      status: "pending",
    },
    {
      id: "task-007",
      title: "Code Review Meeting",
      description:
        "Participate in the code review meeting to discuss your implementations and receive feedback.",
      internship: "TechCorp Inc.",
      internshipId: "int-001",
      dueDate: "2025-03-10",
      status: "pending",
    },
    {
      id: "task-008",
      title: "UI/UX Design Feedback",
      description:
        "Provide feedback on the new design mockups for the upcoming features.",
      internship: "TechCorp Inc.",
      internshipId: "int-001",
      dueDate: "2025-03-15",
      status: "pending",
    },
    {
      id: "task-009",
      title: "Final Project Presentation",
      description:
        "Prepare and deliver a presentation on your internship project to the team.",
      internship: "DataSys Solutions",
      internshipId: "int-002",
      dueDate: "2024-11-25",
      status: "completed",
    },
    {
      id: "task-010",
      title: "Documentation Update",
      description:
        "Update the project documentation with your contributions and findings.",
      internship: "DataSys Solutions",
      internshipId: "int-002",
      dueDate: "2024-11-30",
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
      task.internship.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <MainLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">
              Manage and track all your internship tasks
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Task List</CardTitle>
            <CardDescription>
              View and manage all your tasks across internships
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
                    <TableHead>Internship</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
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
                          <div className="flex items-center">
                            <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                            {task.internship}
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
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <NavLink to={`/student/tasks/${task.id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </NavLink>
                            </Button>
                            {task.status === "pending" && (
                              <Button variant="ghost" size="icon" asChild>
                                <NavLink to={`/student/tasks/${task.id}/edit`}>
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
