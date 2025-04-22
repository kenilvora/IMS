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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { apiConnector } from "@/services/apiConnector";

type Stats = {
  students: number;
  internships: {
    total: number;
    ongoing: number;
    completed: number;
  };
  tasks: {
    total: number;
    completed: number;
    pending: number;
  };
};

type Internship = {
  id: string;
  student: string;
  company: string;
  position: string;
  status: "OnGoing" | "Completed";
  startDate: string;
  endDate: string;
  progress: number;
  tasks: {
    total: number;
    completed: number;
  };
  approval: "Pending" | "Approved" | "Rejected";
};

type Task = {
  id: string;
  title: string;
  student: string;
  internship: string;
  dueDate: string;
  status: "Pending" | "Completed";
};

export default function SupervisorDashboard() {
  // Dummy data for the dashboard
  const [stats, setStats] = useState<Stats>({} as Stats);

  const [recentInternships, setRecentInternships] = useState<Internship[]>([]);

  const [recentTasks, setRecentTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiConnector(
          "GET",
          `${import.meta.env.VITE_API_URL}/dashboard/supervisor`
        );

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        setStats(res.data.stats);
        setRecentInternships(res.data.internships);
        setRecentTasks(res.data.tasks);
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
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
                {recentInternships.length === 0 ? (
                  <div className="flex items-center justify-center space-x-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    <p className="text-sm text-muted-foreground">
                      No ongoing internships
                    </p>
                  </div>
                ) : (
                  recentInternships.map((internship) => (
                    <div
                      key={internship.id}
                      className="flex flex-col space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            {internship.student}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {internship.position} at {internship.company}
                          </div>
                        </div>
                        <div className="flex items-center">
                          {internship.status === "OnGoing" ? (
                            <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                              <RefreshCw className="mr-1 h-3 w-3" />
                              Ongoing
                            </div>
                          ) : (
                            <div className="flex items-center text-sm text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Completed
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-muted-foreground">
                          {new Date(internship.startDate).toLocaleDateString()}{" "}
                          - {new Date(internship.endDate).toLocaleDateString()}
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
                  ))
                )}
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
                {recentTasks.length === 0 ? (
                  <div className="flex items-center justify-center space-x-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    <p className="text-sm text-muted-foreground">
                      No recent tasks
                    </p>
                  </div>
                ) : (
                  recentTasks.map((task) => (
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
                  ))
                )}
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
