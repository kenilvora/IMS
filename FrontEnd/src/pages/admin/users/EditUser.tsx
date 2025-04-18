import type React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/main-layout";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id as string;
  const [showPassword, setShowPassword] = useState(false);

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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to the backend
    navigate(`/admin/users/${userId}`);
  };

  return (
    <MainLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit User</h1>
          <p className="text-muted-foreground">Update user information</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              Update the details for {user.firstName} {user.lastName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={user.role} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="student" disabled={user.role !== "student"}>
                  Student
                </TabsTrigger>
                <TabsTrigger
                  value="supervisor"
                  disabled={user.role !== "supervisor"}
                >
                  Supervisor
                </TabsTrigger>
                <TabsTrigger value="admin" disabled={user.role !== "admin"}>
                  Admin
                </TabsTrigger>
              </TabsList>

              <form id="edit-user-form" onSubmit={handleSubmit}>
                <TabsContent value="student">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="student-first-name">First Name</Label>
                        <Input
                          id="student-first-name"
                          defaultValue={user.firstName}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-last-name">Last Name</Label>
                        <Input
                          id="student-last-name"
                          defaultValue={user.lastName}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-email">Email</Label>
                        <Input
                          id="student-email"
                          type="email"
                          defaultValue={user.email}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-phone">Phone</Label>
                        <Input
                          id="student-phone"
                          type="tel"
                          defaultValue={user.phone}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-id">Student ID</Label>
                        <Input
                          id="student-id"
                          defaultValue={user.studentId}
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-address">Address</Label>
                        <Input
                          id="student-address"
                          defaultValue={user.address}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-college">College</Label>
                        <Select defaultValue="engineering">
                          <SelectTrigger id="student-college">
                            <SelectValue placeholder="Select college" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engineering">
                              College of Engineering
                            </SelectItem>
                            <SelectItem value="business">
                              School of Business
                            </SelectItem>
                            <SelectItem value="arts">
                              College of Arts & Sciences
                            </SelectItem>
                            <SelectItem value="medicine">
                              School of Medicine
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-department">Department</Label>
                        <Select defaultValue="computer-science">
                          <SelectTrigger id="student-department">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="computer-science">
                              Computer Science
                            </SelectItem>
                            <SelectItem value="electrical">
                              Electrical Engineering
                            </SelectItem>
                            <SelectItem value="mechanical">
                              Mechanical Engineering
                            </SelectItem>
                            <SelectItem value="civil">
                              Civil Engineering
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-year">Year</Label>
                        <Select defaultValue="3rd-year">
                          <SelectTrigger id="student-year">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1st-year">1st Year</SelectItem>
                            <SelectItem value="2nd-year">2nd Year</SelectItem>
                            <SelectItem value="3rd-year">3rd Year</SelectItem>
                            <SelectItem value="4th-year">4th Year</SelectItem>
                            <SelectItem value="5th-year">5th Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-status">Status</Label>
                        <Select defaultValue="active">
                          <SelectTrigger id="student-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-password">
                        Reset Password (leave blank to keep current)
                      </Label>
                      <div className="relative">
                        <Input
                          id="student-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit" form="edit-user-form">
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
