import {
  ArrowRight,
  Briefcase,
  Building,
  CheckCircle,
  Layers,
  RefreshCw,
  Users,
  FileText,
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
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { apiConnector } from "@/services/apiConnector";

type Stats = {
  users: {
    total: number;
    students: number;
    supervisors: number;
    admins: number;
  };
  internships: {
    total: number;
    ongoing: number;
    completed: number;
  };
  colleges: number;
  departments: number;
};

type RecentInternship = {
  id: string;
  student: string;
  company: string;
  position: string;
  status: string;
  startDate: string;
  endDate: string;
};

type DepartmentStats = {
  name: string;
  students: number;
  internships: number;
};

type SystemMetrics = {
  studentParticipationRate: number;
  averageInternshipDuration: string;
  taskCompletionRate: number;
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<Stats>({} as Stats);

  const [recentInternships, setRecentInternships] = useState<
    RecentInternship[]
  >([]);

  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[]>([]);

  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>(
    {} as SystemMetrics
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await apiConnector(
          "GET",
          `${import.meta.env.VITE_API_URL}/dashboard/admin`
        );

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        setStats(res.data.stats);
        setRecentInternships(res.data.recentInternships);
        setDepartmentStats(res.data.departmentStats);
        setSystemMetrics(res.data.systemMetrics);
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
    <MainLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Admin! Here&apos;s an overview of the internship
            system.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.users.students} students, {stats.users.supervisors}{" "}
                supervisors, {stats.users.admins} admins
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
              <CardTitle className="text-sm font-medium">Colleges</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.colleges}</div>
              <p className="text-xs text-muted-foreground">
                Registered educational institutions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.departments}</div>
              <p className="text-xs text-muted-foreground">
                Across all colleges
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Internships</CardTitle>
                <CardDescription>
                  Overview of the latest internships
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInternships.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground py-4">
                    No recent internships available
                  </div>
                ) : (
                  recentInternships.map((internship) => (
                    <div
                      key={internship.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium">{internship.student}</div>
                        <div className="text-sm text-muted-foreground">
                          {internship.position} at {internship.company}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(internship.startDate).toLocaleDateString()}{" "}
                          - {new Date(internship.endDate).toLocaleDateString()}
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
                  ))
                )}
              </div>
            </CardContent>
            {recentInternships.length > 0 && (
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <NavLink to="/admin/internships">
                    View All Internships <ArrowRight className="ml-2 h-4 w-4" />
                  </NavLink>
                </Button>
              </CardFooter>
            )}
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Department Internship Statistics</CardTitle>
              <CardDescription>
                Internship distribution by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((department) => (
                  <div key={department.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{department.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {department.internships}/{department.students} students
                      </div>
                    </div>
                    <Progress
                      value={
                        (department.internships / department.students) * 100
                      }
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <NavLink to="/admin/colleges">Manage Colleges</NavLink>
              </Button>
              <Button variant="outline" asChild>
                <NavLink to="/admin/departments">Manage Departments</NavLink>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button
                className="h-auto py-4 flex flex-col items-center justify-center"
                asChild
              >
                <NavLink to="/admin/users/add">
                  <Users className="h-6 w-6 mb-2" />
                  <span>Add User</span>
                </NavLink>
              </Button>
              <Button
                className="h-auto py-4 flex flex-col items-center justify-center"
                asChild
              >
                <NavLink to="/admin/colleges/add">
                  <Building className="h-6 w-6 mb-2" />
                  <span>Add College</span>
                </NavLink>
              </Button>
              <Button
                className="h-auto py-4 flex flex-col items-center justify-center"
                asChild
              >
                <NavLink to="/admin/departments/add">
                  <Layers className="h-6 w-6 mb-2" />
                  <span>Add Department</span>
                </NavLink>
              </Button>
              <Button
                className="h-auto py-4 flex flex-col items-center justify-center"
                asChild
              >
                <NavLink to="/admin/reports">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Generate Reports</span>
                </NavLink>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>
                Current system status and metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Student Participation Rate
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Students with at least one internship
                    </p>
                  </div>
                  <div className="text-2xl font-bold">
                    {systemMetrics.studentParticipationRate}%
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Average Internship Duration
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Across all completed internships
                    </p>
                  </div>
                  <div className="text-2xl font-bold">
                    {systemMetrics.averageInternshipDuration} mo
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Task Completion Rate</p>
                    <p className="text-xs text-muted-foreground">
                      Across all internships
                    </p>
                  </div>
                  <div className="text-2xl font-bold">
                    {systemMetrics.taskCompletionRate}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
