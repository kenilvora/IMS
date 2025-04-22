import type React from "react";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  ArrowLeft,
  Briefcase,
  Calendar1,
  Building,
  CalendarIcon,
  CheckCircle,
  Clock,
  FileEdit,
  FileText,
  Mail,
  Plus,
  RefreshCw,
  User,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MainLayout from "@/components/main-layout";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { apiConnector } from "@/services/apiConnector";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { MdPendingActions } from "react-icons/md";

type Internship = {
  id: string;
  company: string;
  position: string;
  department: string;
  supervisor: string;
  supervisorEmail: string;
  faculty: string;
  status: string;
  startDate: string;
  endDate: string;
  progress: number;
  description: string;
  skills: string;
  tasks: {
    total: number;
    completed: number;
  };
  approval: "Pending" | "Approved" | "Rejected";
};

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
};

export default function InternshipDetails() {
  const params = useParams();
  const internshipId = params.id as string;

  const navigate = useNavigate();

  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);

  // Dummy data for the internship details
  const [internship, setInternship] = useState<Internship>({} as Internship);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const [deadLine, setDeadLine] = useState<Date>();

  useEffect(() => {
    const fetchInternshipDetails = async () => {
      setLoading(true);
      try {
        const res = await apiConnector(
          "GET",
          `${
            import.meta.env.VITE_API_URL
          }/internship/getInternship/${internshipId}`
        );

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        setInternship(res.data.internship);
        setTasks(res.data.tasks);
      } catch (error) {
        toast.error("Failed to fetch internship details");
      } finally {
        setLoading(false);
      }
    };

    fetchInternshipDetails();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!deadLine) {
      toast.error("Please select a deadline");
      return;
    }

    if (!taskData.status) {
      toast.error("Please select a status");
      return;
    }

    setLoading(true);
    try {
      const res = await apiConnector(
        "POST",
        `${import.meta.env.VITE_API_URL}/internship/addTask/${internshipId}`,
        {
          ...taskData,
          deadline: deadLine,
        }
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      toast.success("Task added successfully");
      navigate("/student/tasks");
    } catch (error) {
      const errMsg = (error as any).response.data.message;
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <MainLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <NavLink to="/student/internships">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </NavLink>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {internship.position}
              </h1>
              <p className="text-muted-foreground">{internship.company}</p>
            </div>
          </div>
          {internship.status === "OnGoing" && (
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" asChild>
                <NavLink to={`/student/internships/edit/${internshipId}`}>
                  <FileEdit className="mr-2 h-4 w-4" /> Edit Internship
                </NavLink>
              </Button>

              <Dialog
                open={isAddTaskDialogOpen}
                onOpenChange={setIsAddTaskDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="h-[550px]">
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>Add New Task</DialogTitle>
                      <DialogDescription>
                        Create a new task for your internship
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="task-title">Task Title*</Label>
                        <Input
                          id="task-title"
                          placeholder="Enter task title"
                          required
                          value={taskData.title}
                          onChange={(e) => {
                            e.preventDefault();
                            setTaskData((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }));
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="task-description">Description*</Label>
                        <Textarea
                          id="task-description"
                          placeholder="Describe the task in detail..."
                          rows={3}
                          required
                          value={taskData.description}
                          onChange={(e) => {
                            e.preventDefault();
                            setTaskData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }));
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>DeadLine*</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {deadLine
                                ? format(deadLine, "PPP")
                                : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={deadLine}
                              onSelect={setDeadLine}
                              required
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Task Status*</Label>
                        <Select
                          required
                          value={taskData.status}
                          onValueChange={(value) => {
                            setTaskData((prev) => ({
                              ...prev,
                              status: value,
                            }));
                          }}
                        >
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsAddTaskDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Add Task</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Internship Details
                  {internship.approval === "Pending" ? (
                    <div className="flex items-center text-sm text-yellow-600 bg-yellow-50 px-2.5 py-1.5 rounded-full w-fit">
                      <MdPendingActions className="mr-1 h-3 w-3" />
                      Pending Approval by {internship.faculty}
                    </div>
                  ) : internship.approval === "Approved" ? (
                    <div className="flex items-center text-sm text-green-600 bg-green-50 px-2.5 py-1.5 rounded-full w-fit">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Approved by {internship.faculty}
                    </div>
                  ) : (
                    <div className="flex items-center text-sm text-red-600 bg-red-50 px-2.5 py-1.5 rounded-full w-fit">
                      <XCircle className="mr-1 h-3 w-3" />
                      Rejected by {internship.faculty}
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Description</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {internship.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Skills</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {internship.skills}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Progress</h3>
                    <div className="flex items-center justify-between text-sm">
                      <div>Overall Completion</div>
                      <div>{internship.progress}%</div>
                    </div>
                    <Progress value={internship.progress} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <div>Tasks Completed</div>
                      <div>
                        {internship.tasks.completed}/{internship.tasks.total}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>
                  Manage and track your internship tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Tasks</TabsTrigger>
                    <TabsTrigger value="Pending">Pending</TabsTrigger>
                    <TabsTrigger value="Completed">Completed</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tasks.map((task) => (
                            <TableRow key={task.id}>
                              <TableCell>
                                <div className="font-medium">{task.title}</div>
                                <div className="text-sm text-muted-foreground">
                                  {task.description.substring(0, 60)}...
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
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" asChild>
                                  <NavLink to={`/student/tasks/${task.id}`}>
                                    View Details
                                  </NavLink>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  <TabsContent value="Pending">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tasks
                            .filter((task) => task.status === "Pending")
                            .map((task) => (
                              <TableRow key={task.id}>
                                <TableCell>
                                  <div className="font-medium">
                                    {task.title}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {task.description.substring(0, 60)}...
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full w-fit">
                                    <Clock className="mr-1 h-3 w-3" />
                                    Pending
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" asChild>
                                    <NavLink to={`/student/tasks/${task.id}`}>
                                      View Details
                                    </NavLink>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  <TabsContent value="Completed">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tasks
                            .filter((task) => task.status === "Completed")
                            .map((task) => (
                              <TableRow key={task.id}>
                                <TableCell>
                                  <div className="font-medium">
                                    {task.title}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {task.description.substring(0, 60)}...
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center text-sm text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full w-fit">
                                    <CheckCircle className="mr-1 h-3 w-3" />
                                    Completed
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" asChild>
                                    <NavLink to={`/student/tasks/${task.id}`}>
                                      View Details
                                    </NavLink>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <NavLink to="/student/tasks">View All Tasks</NavLink>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Internship Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Building className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Company</div>
                      <div className="text-sm text-muted-foreground">
                        {internship.company}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Position</div>
                      <div className="text-sm text-muted-foreground">
                        {internship.position}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Department</div>
                      <div className="text-sm text-muted-foreground">
                        {internship.department}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Supervisor</div>
                      <div className="text-sm text-muted-foreground">
                        {internship.supervisor}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Supervisor Email</div>
                      <div className="text-sm text-muted-foreground">
                        {internship.supervisorEmail}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar1 className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(internship.startDate).toLocaleDateString()} -{" "}
                        {new Date(internship.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    {internship.status === "OnGoing" ? (
                      <RefreshCw className="h-4 w-4 text-blue-600 mt-0.5" />
                    ) : internship.status === "Completed" ? (
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <div className="font-medium">Status</div>
                      <div
                        className={`text-sm ${
                          internship.status === "OnGoing"
                            ? "text-blue-600"
                            : internship.status === "Completed"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {internship.status.charAt(0).toUpperCase() +
                          internship.status.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Offer Letter
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Internship Agreement
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Project Brief
                  </Button>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
