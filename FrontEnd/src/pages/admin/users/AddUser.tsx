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
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to the backend
    navigate("/admin/users");
  };

  return (
    <MainLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add User</h1>
          <p className="text-muted-foreground">
            Create a new user account in the system
          </p>
        </div>

        <Card className="">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              Enter the details for the new user
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="student"
              onValueChange={setUserRole}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="supervisor">Supervisor</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <form id="add-user-form" onSubmit={handleSubmit}>
                <TabsContent value="student">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="student-first-name">First Name</Label>
                        <Input
                          id="student-first-name"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-last-name">Last Name</Label>
                        <Input
                          id="student-last-name"
                          placeholder="Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-email">Email</Label>
                        <Input
                          id="student-email"
                          type="email"
                          placeholder="john.doe@university.edu"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-id">Student ID</Label>
                        <Input
                          id="student-id"
                          placeholder="CS2025001"
                          required
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
                      <Label htmlFor="student-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="student-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
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

                <TabsContent value="supervisor">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-first-name">
                          First Name
                        </Label>
                        <Input
                          id="supervisor-first-name"
                          placeholder="Sarah"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-last-name">Last Name</Label>
                        <Input
                          id="supervisor-last-name"
                          placeholder="Johnson"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-email">Email</Label>
                        <Input
                          id="supervisor-email"
                          type="email"
                          placeholder="sarah.johnson@university.edu"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-id">Faculty ID</Label>
                        <Input
                          id="supervisor-id"
                          placeholder="FAC2025005"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-college">College</Label>
                        <Select defaultValue="engineering">
                          <SelectTrigger id="supervisor-college">
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
                        <Label htmlFor="supervisor-department">
                          Department
                        </Label>
                        <Select defaultValue="computer-science">
                          <SelectTrigger id="supervisor-department">
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
                        <Label htmlFor="supervisor-position">Position</Label>
                        <Select defaultValue="associate-professor">
                          <SelectTrigger id="supervisor-position">
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="assistant-professor">
                              Assistant Professor
                            </SelectItem>
                            <SelectItem value="associate-professor">
                              Associate Professor
                            </SelectItem>
                            <SelectItem value="professor">Professor</SelectItem>
                            <SelectItem value="adjunct-professor">
                              Adjunct Professor
                            </SelectItem>
                            <SelectItem value="lecturer">Lecturer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-status">Status</Label>
                        <Select defaultValue="active">
                          <SelectTrigger id="supervisor-status">
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
                      <Label htmlFor="supervisor-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="supervisor-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
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

                <TabsContent value="admin">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="admin-first-name">First Name</Label>
                        <Input
                          id="admin-first-name"
                          placeholder="Admin"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-last-name">Last Name</Label>
                        <Input
                          id="admin-last-name"
                          placeholder="User"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-email">Email</Label>
                        <Input
                          id="admin-email"
                          type="email"
                          placeholder="admin@university.edu"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-id">Admin ID</Label>
                        <Input
                          id="admin-id"
                          placeholder="ADM2025001"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-role">Admin Role</Label>
                        <Select defaultValue="system">
                          <SelectTrigger id="admin-role">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="system">
                              System Administrator
                            </SelectItem>
                            <SelectItem value="college">
                              College Administrator
                            </SelectItem>
                            <SelectItem value="department">
                              Department Administrator
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-status">Status</Label>
                        <Select defaultValue="active">
                          <SelectTrigger id="admin-status">
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
                      <Label htmlFor="admin-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="admin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
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
            <Button type="submit" form="add-user-form">
              Add {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
