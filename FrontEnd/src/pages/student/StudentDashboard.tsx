import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  Clock,
  FileText,
  Plus,
  RefreshCw,
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

export default function StudentDashboard() {
  // Dummy data for the dashboard
  const stats = {
    total: 3,
    ongoing: 1,
    completed: 2,
    tasks: {
      total: 12,
      completed: 8,
      pending: 4,
    },
  };

  const recentInternships = [
    {
      id: "int-001",
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
      id: "int-002",
      company: "DataSys Solutions",
      position: "Data Analyst Intern",
      status: "completed",
      startDate: "2024-06-01",
      endDate: "2024-12-01",
      progress: 100,
      tasks: {
        total: 10,
        completed: 10,
      },
    },
    {
      id: "int-003",
      company: "InnovateTech",
      position: "Software Engineering Intern",
      status: "completed",
      startDate: "2023-12-01",
      endDate: "2024-05-01",
      progress: 100,
      tasks: {
        total: 12,
        completed: 12,
      },
    },
  ];

  const upcomingTasks = [
    {
      id: "task-001",
      title: "Weekly Progress Report",
      internship: "TechCorp Inc.",
      dueDate: "2025-02-28",
      status: "pending",
    },
    {
      id: "task-002",
      title: "Frontend Feature Implementation",
      internship: "TechCorp Inc.",
      dueDate: "2025-03-05",
      status: "pending",
    },
    {
      id: "task-003",
      title: "Code Review Meeting",
      internship: "TechCorp Inc.",
      dueDate: "2025-03-10",
      status: "pending",
    },
    {
      id: "task-004",
      title: "UI/UX Design Feedback",
      internship: "TechCorp Inc.",
      dueDate: "2025-03-15",
      status: "pending",
    },
  ];

  return (
    <MainLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, John! Here&apos;s an overview of your internships.
            </p>
          </div>
          <Button asChild>
            <NavLink to="/student/internships/add">
              <Plus className="mr-2 h-4 w-4" /> Add Internship
            </NavLink>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Internships
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Across {recentInternships.length} different companies
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ongoing</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.ongoing}</div>
              <p className="text-xs text-muted-foreground">
                Currently active internships
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">
                Successfully finished internships
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
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>My Internships</CardTitle>
              <CardDescription>
                Overview of your recent internships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInternships.map((internship) => (
                  <div key={internship.id} className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{internship.company}</div>
                        <div className="text-sm text-muted-foreground">
                          {internship.position}
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
                <NavLink to="/student/internships">
                  View All Internships <ArrowRight className="ml-2 h-4 w-4" />
                </NavLink>
              </Button>
            </CardFooter>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start justify-between"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{task.title}</p>
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
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <NavLink to="/student/tasks">
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
