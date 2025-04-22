import {
  ArrowLeft,
  Briefcase,
  Building,
  FileEdit,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MainLayout from "@/components/main-layout";
import { NavLink, useParams } from "react-router-dom";

export default function StudentDetails() {
  const params = useParams();
  const userId = params.id as string;

  // Dummy data for the user details
  const user = {
    id: "user-001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    role: "student",
    college: "College of Engineering",
    department: "Computer Science",
    studentId: "CS2025001",
    year: "3rd Year",
    semester: "Spring 2025",
    address: "123 University Ave, Apt 4B, College Town, CT 12345",
    status: "active",
    createdAt: "2024-09-01",
    lastLogin: "2025-02-15",
  };

  // Dummy data for internships
  const internships = [
    {
      id: "int-001",
      company: "TechCorp Inc.",
      position: "Frontend Developer Intern",
      supervisor: "Dr. Sarah Johnson",
      status: "ongoing",
      startDate: "2025-01-15",
      endDate: "2025-06-15",
    },
    {
      id: "int-002",
      company: "DataSys Solutions",
      position: "Data Analyst Intern",
      supervisor: "Dr. Michael Brown",
      status: "completed",
      startDate: "2024-06-01",
      endDate: "2024-12-01",
    },
  ];

  return (
    <MainLayout role="supervisor">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <NavLink to={`/supervisor/internships/${userId}`}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </NavLink>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-muted-foreground">
                {user.role === "student"
                  ? "Student"
                  : user.role === "supervisor"
                  ? "Supervisor"
                  : "Admin"}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <NavLink to={`/admin/users/${userId}/edit`}>
                <FileEdit className="mr-2 h-4 w-4" /> Edit User
              </NavLink>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 w-full">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={`/placeholder.svg?height=96&width=96`} />
                    <AvatarFallback>
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <div className="w-full text-center">
                    <p className="text-sm font-medium">{user.department}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.college}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-sm text-muted-foreground">
                        {user.phone}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-sm text-muted-foreground">
                        {user.address}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Role</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {user.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Student ID</div>
                      <div className="text-sm text-muted-foreground">
                        {user.studentId}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">College</div>
                      <div className="text-sm text-muted-foreground">
                        {user.college}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Department</div>
                      <div className="text-sm text-muted-foreground">
                        {user.department}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="internships">Internships</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Personal Information
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Full Name</span>
                            <span className="text-sm font-medium">
                              {user.firstName} {user.lastName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Email</span>
                            <span className="text-sm font-medium">
                              {user.email}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Phone</span>
                            <span className="text-sm font-medium">
                              {user.phone}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Address</span>
                            <span className="text-sm font-medium">
                              {user.address}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Academic Information
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Student ID</span>
                            <span className="text-sm font-medium">
                              {user.studentId}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">College</span>
                            <span className="text-sm font-medium">
                              {user.college}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Department</span>
                            <span className="text-sm font-medium">
                              {user.department}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Year</span>
                            <span className="text-sm font-medium">
                              {user.year}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Semester</span>
                            <span className="text-sm font-medium">
                              {user.semester}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Account Information
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Status</span>
                            <span className="text-sm font-medium capitalize">
                              {user.status}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Created At</span>
                            <span className="text-sm font-medium">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Last Login</span>
                            <span className="text-sm font-medium">
                              {new Date(user.lastLogin).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="internships">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Supervisor</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {internships.length === 0 ? (
                            <TableRow>
                              <TableCell
                                colSpan={6}
                                className="h-24 text-center"
                              >
                                No internships found.
                              </TableCell>
                            </TableRow>
                          ) : (
                            internships.map((internship) => (
                              <TableRow key={internship.id}>
                                <TableCell>{internship.company}</TableCell>
                                <TableCell>{internship.position}</TableCell>
                                <TableCell>{internship.supervisor}</TableCell>
                                <TableCell>
                                  {new Date(
                                    internship.startDate
                                  ).toLocaleDateString()}{" "}
                                  -{" "}
                                  {new Date(
                                    internship.endDate
                                  ).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                  <div
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                      internship.status === "ongoing"
                                        ? "bg-blue-50 text-blue-600"
                                        : "bg-green-50 text-green-600"
                                    }`}
                                  >
                                    {internship.status.charAt(0).toUpperCase() +
                                      internship.status.slice(1)}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" asChild>
                                    <NavLink
                                      to={`/admin/internships/${internship.id}`}
                                    >
                                      View
                                    </NavLink>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  <TabsContent value="activity">
                    <div className="space-y-4">
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Logged in</p>
                            <p className="text-sm text-muted-foreground">
                              User logged in to the system
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(user.lastLogin).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Added new internship</p>
                            <p className="text-sm text-muted-foreground">
                              Added internship at {internships[0].company}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(
                              internships[0].startDate
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Account created</p>
                            <p className="text-sm text-muted-foreground">
                              User account was created
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(user.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
