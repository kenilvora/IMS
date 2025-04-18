import {
  ArrowLeft,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainLayout from "@/components/main-layout";
import { NavLink } from "react-router-dom";

export default function SupervisorInternshipDetails() {
  // Dummy data for the internship details
  const internship = {
    id: "int-001",
    student: {
      id: "user-001",
      name: "John Doe",
      email: "john.doe@university.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      year: "3rd Year",
    },
    company: "TechCorp Inc.",
    position: "Frontend Developer Intern",
    department: "Engineering",
    location: "San Francisco, CA",
    status: "ongoing",
    startDate: "2025-01-15",
    endDate: "2025-06-15",
    progress: 45,
    description:
      "Working on the frontend development team to build responsive and accessible user interfaces for the company's main product. Responsibilities include implementing UI components, fixing bugs, and collaborating with designers and backend developers.",
    skills: "React, TypeScript, CSS, Accessibility, Git, Agile methodologies",
    tasks: {
      total: 8,
      completed: 4,
    },
  };

  // Dummy data for tasks
  const tasks = [
    {
      id: "task-001",
      title: "Onboarding and Environment Setup",
      description:
        "Set up development environment, get familiar with the codebase, and complete onboarding tasks.",
      dueDate: "2025-01-20",
      status: "completed",
      comments: [
        {
          author: "Dr. Sarah Johnson",
          date: "2025-01-21",
          text: "Great job setting up quickly. Let me know if you have any questions about the codebase.",
        },
      ],
    },
    {
      id: "task-002",
      title: "UI Component Implementation",
      description:
        "Implement the new dashboard card components as per the design specifications.",
      dueDate: "2025-02-05",
      status: "completed",
      comments: [
        {
          author: "Dr. Sarah Johnson",
          date: "2025-02-06",
          text: "The components look great and match the design perfectly. Good work on making them responsive.",
        },
      ],
    },
    {
      id: "task-003",
      title: "Bug Fixes for Mobile View",
      description: "Fix reported bugs in the mobile view of the application.",
      dueDate: "2025-02-20",
      status: "completed",
      comments: [
        {
          author: "Dr. Sarah Johnson",
          date: "2025-02-21",
          text: "All bugs have been fixed successfully. Your attention to detail is impressive.",
        },
      ],
    },
    {
      id: "task-004",
      title: "Accessibility Improvements",
      description:
        "Improve accessibility of the application by implementing ARIA attributes and keyboard navigation.",
      dueDate: "2025-03-10",
      status: "completed",
      comments: [
        {
          author: "Dr. Sarah Johnson",
          date: "2025-03-11",
          text: "Great improvements to accessibility. The application is now much more usable for everyone.",
        },
      ],
    },
    {
      id: "task-005",
      title: "Weekly Progress Report",
      description:
        "Submit a weekly progress report detailing tasks completed, challenges faced, and plans for the next week.",
      dueDate: "2025-02-28",
      status: "pending",
      comments: [],
    },
    {
      id: "task-006",
      title: "Frontend Feature Implementation",
      description:
        "Implement the new user profile page with edit functionality.",
      dueDate: "2025-03-05",
      status: "pending",
      comments: [],
    },
    {
      id: "task-007",
      title: "Code Review Meeting",
      description:
        "Participate in the code review meeting to discuss your implementations and receive feedback.",
      dueDate: "2025-03-10",
      status: "pending",
      comments: [],
    },
    {
      id: "task-008",
      title: "UI/UX Design Feedback",
      description:
        "Provide feedback on the new design mockups for the upcoming features.",
      dueDate: "2025-03-15",
      status: "pending",
      comments: [],
    },
  ];

  return (
    <MainLayout role="supervisor">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <NavLink to="/supervisor/internships">
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
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Internship Details</CardTitle>
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
                  Review and manage student tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Tasks</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
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
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  <TabsContent value="pending">
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
                            .filter((task) => task.status === "pending")
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
                                    <NavLink
                                      to={`/supervisor/tasks/${task.id}`}
                                    >
                                      Review
                                    </NavLink>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  <TabsContent value="completed">
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
                            .filter((task) => task.status === "completed")
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
                                    <NavLink
                                      to={`/supervisor/tasks/${task.id}`}
                                    >
                                      Review
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
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={`/placeholder.svg?height=80&width=80`} />
                    <AvatarFallback>
                      {internship.student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">
                      {internship.student.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {internship.student.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Department</div>
                      <div className="text-sm text-muted-foreground">
                        {internship.student.department}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Year</div>
                      <div className="text-sm text-muted-foreground">
                        {internship.student.year}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">
                        {internship.student.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-sm text-muted-foreground">
                        {internship.student.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <NavLink to={`/supervisor/students/${internship.student.id}`}>
                    View Student Profile
                  </NavLink>
                </Button>
              </CardFooter>
            </Card>

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
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-sm text-muted-foreground">
                        {internship.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(internship.startDate).toLocaleDateString()} -{" "}
                        {new Date(internship.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    {internship.status === "ongoing" ? (
                      <RefreshCw className="h-4 w-4 text-blue-600 mt-0.5" />
                    ) : internship.status === "completed" ? (
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <div className="font-medium">Status</div>
                      <div
                        className={`text-sm ${
                          internship.status === "ongoing"
                            ? "text-blue-600"
                            : internship.status === "completed"
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

            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Internship Agreement
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Project Brief
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Evaluation Form
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
