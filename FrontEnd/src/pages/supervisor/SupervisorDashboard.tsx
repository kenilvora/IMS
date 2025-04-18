import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  FileText,
  GraduationCap,
  RefreshCw,
  Users,
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
import MainLayout from "@/components/main-layout";
import { NavLink } from "react-router-dom";

export default function SupervisorDashboard() {
  // Dummy data for the dashboard
  const stats = {
    students: 5,
    internships: {
      total: 8,
      ongoing: 3,
      completed: 5,
    },
    tasks: {
      total: 42,
      completed: 28,
      pending: 14,
    },
  };

  const recentInternships = [
    {
      id: "int-001",
      student: "John Doe",
      company: "TechCorp Inc.",
      position: "Frontend Developer Intern",
      status: "ongoing",
      startDate: "2025-01-15",
      endDate: "2025-06-15",
      progress: 45,
      tasks: {
        total: 8,
        completed: 4,
      },
    },
    {
      id: "int-004",
      student: "Emily Johnson",
      company: "CloudNet Systems",
      position: "Backend Developer Intern",
      status: "ongoing",
      startDate: "2025-01-10",
      endDate: "2025-07-10",
      progress: 30,
      tasks: {
        total: 10,
        completed: 3,
      },
    },
    {
      id: "int-005",
      student: "Michael Smith",
      company: "DataViz Analytics",
      position: "Data Science Intern",
      status: "ongoing",
      startDate: "2025-02-01",
      endDate: "2025-08-01",
      progress: 20,
      tasks: {
        total: 12,
        completed: 2,
      },
    },
  ];

  const recentTasks = [
    {
      id: "task-005",
      title: "Weekly Progress Report",
      student: "John Doe",
      internship: "TechCorp Inc.",
      dueDate: "2025-02-28",
      status: "pending",
    },
    {
      id: "task-011",
      title: "Database Schema Design",
      student: "Emily Johnson",
      internship: "CloudNet Systems",
      dueDate: "2025-02-25",
      status: "pending",
    },
    {
      id: "task-012",
      title: "API Integration",
      student: "Emily Johnson",
      internship: "CloudNet Systems",
      dueDate: "2025-03-05",
      status: "pending",
    },
    {
      id: "task-013",
      title: "Data Cleaning Script",
      student: "Michael Smith",
      internship: "DataViz Analytics",
      dueDate: "2025-02-20",
      status: "pending",
    },
  ];

  return (
    <MainLayout role="supervisor">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Supervisor Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, Dr. Sarah! Here&apos;s an overview of your supervised
            internships.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.students}</div>
              <p className="text-xs text-muted-foreground">
                Students under your supervision
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Internships</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.internships.total}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.internships.ongoing} ongoing,{" "}
                {stats.internships.completed} completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.tasks.completed}/{stats.tasks.total}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.tasks.pending} pending tasks remaining
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((stats.tasks.completed / stats.tasks.total) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Overall task completion rate
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Ongoing Internships</CardTitle>
              <CardDescription>
                Currently active internships under your supervision
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInternships.map((internship) => (
                  <div key={internship.id} className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{internship.student}</div>
                        <div className="text-sm text-muted-foreground">
                          {internship.position} at {internship.company}
                        </div>
                      </div>
                      <div className="flex items-center">
                        {internship.status === "ongoing" ? (
                          <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                            <RefreshCw className="mr-1 h-3 w-3" />
                            Ongoing
                          </div>
                        ) : internship.status === "completed" ? (
                          <div className="flex items-center text-sm text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Completed
                          </div>
                        ) : (
                          <div className="flex items-center text-sm text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full">
                            <XCircle className="mr-1 h-3 w-3" />
                            Terminated
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-muted-foreground">
                        {new Date(internship.startDate).toLocaleDateString()} -{" "}
                        {new Date(internship.endDate).toLocaleDateString()}
                      </div>
                      <div className="text-muted-foreground">
                        Tasks: {internship.tasks.completed}/
                        {internship.tasks.total}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div>Progress</div>
                        <div>{internship.progress}%</div>
                      </div>
                      <Progress value={internship.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <NavLink to="/supervisor/internships">
                  View All Internships <ArrowRight className="ml-2 h-4 w-4" />
                </NavLink>
              </Button>
            </CardFooter>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Tasks</CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start justify-between"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{task.title}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-3 w-3" />
                        {task.student}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Briefcase className="mr-1 h-3 w-3" />
                        {task.internship}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-sm font-medium">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Due date
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                        asChild
                      >
                        <NavLink to={`/supervisor/tasks/${task.id}`}>
                          Review
                        </NavLink>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <NavLink to="/supervisor/tasks">
                  View All Tasks <ArrowRight className="ml-2 h-4 w-4" />
                </NavLink>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
