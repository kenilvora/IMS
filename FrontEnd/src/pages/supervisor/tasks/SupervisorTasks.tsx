import { useEffect, useState } from "react";

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
import toast from "react-hot-toast";
import { apiConnector } from "@/services/apiConnector";
import Spinner from "@/components/Spinner";

type Task = {
  id: string;
  title: string;
  description: string;
  student: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  internship: {
    id: string;
    company: string;
  };
  dueDate: string;
  status: "Pending" | "Completed";
};

export default function SupervisorTasks() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(true);

  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await apiConnector(
          "GET",
          `${
            import.meta.env.VITE_API_URL
          }/internship/getAllTasksUnderSupervisor`
        );

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        setTasks(res.data.data);
        setFilteredTasks(res.data.data);
        setTotalPages(Math.ceil(res.data.data.length / 10)); // Assuming 10 tasks per page
        setCurrPage(1); // Reset current page to 1 after fetching tasks
      } catch (error) {
        toast.error("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const fiiltered = tasks.filter((task) => {
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.internship.company
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });

    setFilteredTasks(fiiltered);
  }, [searchQuery, statusFilter]);

  return loading ? (
    <Spinner />
  ) : (
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
                    <SelectItem value="Pending">Pending</SelectItem>
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
                                src={task.student.image}
                                alt={task.student.name}
                              />
                              <AvatarFallback>
                                {task.student.name.charAt(0)}
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
                          {task.status === "Completed" ? (
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
