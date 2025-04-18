import type React from "react";
import { useState } from "react";
import { BookOpen, Eye, EyeOff } from "lucide-react";
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
import { NavLink, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (role: string, e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/verify-otp?role=${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-900">
              Internship Management System
            </h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="supervisor">Supervisor</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <TabsContent value="student">
                <form onSubmit={(e) => handleSignup("student", e)}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
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
                      <Label htmlFor="student-college">College</Label>
                      <Select defaultValue="engineering">
                        <SelectTrigger>
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
                        <SelectTrigger>
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
                    <div className="space-y-2">
                      <Label htmlFor="student-confirm-password">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="student-confirm-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Sign up as Student
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="supervisor">
                <form onSubmit={(e) => handleSignup("supervisor", e)}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
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
                      <Label htmlFor="supervisor-college">College</Label>
                      <Select defaultValue="engineering">
                        <SelectTrigger>
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
                      <Label htmlFor="supervisor-department">Department</Label>
                      <Select defaultValue="computer-science">
                        <SelectTrigger>
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
                    <div className="space-y-2">
                      <Label htmlFor="supervisor-confirm-password">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="supervisor-confirm-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Sign up as Supervisor
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={(e) => handleSignup("admin", e)}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
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
                      <Label htmlFor="admin-role">Admin Role</Label>
                      <Select defaultValue="system">
                        <SelectTrigger>
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
                    <div className="space-y-2">
                      <Label htmlFor="admin-confirm-password">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="admin-confirm-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Sign up as Admin
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Log in
              </NavLink>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
