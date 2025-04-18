import {
  ArrowRight,
  Briefcase,
  Building,
  CheckCircle,
  Layers,
  RefreshCw,
  Users,
  XCircle,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/main-layout";
import { NavLink } from "react-router-dom";

export default function AdminDashboard() {
  // Dummy data for the dashboard
  const stats = {
    users: {
      total: 120,
      students: 100,
      supervisors: 15,
      admins: 5,
    },
    internships: {
      total: 85,
      ongoing: 35,
      completed: 50,
    },
    colleges: 4,
    departments: 12,
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
    },
    {
      id: "int-004",
      student: "Emily Johnson",
      company: "CloudNet Systems",
      position: "Backend Developer Intern",
      status: "ongoing",
      startDate: "2025-01-10",
      endDate: "2025-07-10",
    },
    {
      id: "int-005",
      student: "Michael Smith",
      company: "DataViz Analytics",
      position: "Data Science Intern",
      status: "ongoing",
      startDate: "2025-02-01",
      endDate: "2025-08-01",
    },
    {
      id: "int-002",
      student: "Sarah Williams",
      company: "DataSys Solutions",
      position: "Data Analyst Intern",
      status: "completed",
      startDate: "2024-06-01",
      endDate: "2024-12-01",
    },
    {
      id: "int-003",
      student: "David Brown",
      company: "InnovateTech",
      position: "Software Engineering Intern",
      status: "completed",
      startDate: "2023-12-01",
      endDate: "2024-05-01",
    },
  ];

  const collegeStats = [
    { name: "College of Engineering", students: 45, internships: 38 },
    { name: "School of Business", students: 30, internships: 25 },
    { name: "College of Arts & Sciences", students: 15, internships: 12 },
    { name: "School of Medicine", students: 10, internships: 10 },
  ];

  return (
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
              <Tabs defaultValue="all" className="w-[200px]">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInternships.map((internship) => (
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
                        {new Date(internship.startDate).toLocaleDateString()} -{" "}
                        {new Date(internship.endDate).toLocaleDateString()}
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
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <NavLink to="/admin/internships">
                  View All Internships <ArrowRight className="ml-2 h-4 w-4" />
                </NavLink>
              </Button>
            </CardFooter>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>College Statistics</CardTitle>
              <CardDescription>
                Internship distribution by college
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {collegeStats.map((college) => (
                  <div key={college.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{college.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {college.internships}/{college.students} students
                      </div>
                    </div>
                    <Progress
                      value={(college.internships / college.students) * 100}
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
                  <div className="text-2xl font-bold">85%</div>
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
                  <div className="text-2xl font-bold">5.2 mo</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Task Completion Rate</p>
                    <p className="text-xs text-muted-foreground">
                      Across all internships
                    </p>
                  </div>
                  <div className="text-2xl font-bold">78%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">System Uptime</p>
                    <p className="text-xs text-muted-foreground">
                      Last 30 days
                    </p>
                  </div>
                  <div className="text-2xl font-bold">99.9%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
