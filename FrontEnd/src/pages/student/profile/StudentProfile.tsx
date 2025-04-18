import type React from "react";
import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainLayout from "@/components/main-layout";

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState("personal");

  // Dummy data for the student profile
  const profile = {
    id: "user-001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    college: "College of Engineering",
    department: "Computer Science",
    studentId: "CS2025001",
    year: "3rd Year",
    semester: "Spring 2025",
    bio: "Computer Science student with a passion for web development and UI/UX design. Looking for opportunities to apply my skills in real-world projects.",
    skills: "JavaScript, React, TypeScript, HTML, CSS, Git, UI/UX Design",
    interests: "Web Development, Mobile App Development, Machine Learning",
    address: "123 University Ave, Apt 4B, College Town, CT 12345",
    socialLinks: {
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
      portfolio: "johndoe.dev",
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to the backend
    // Show success message
  };

  return (
    <MainLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and settings
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <Card className="md:w-80 h-fit">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={`/placeholder.svg?height=96&width=96`} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {profile.email}
                  </p>
                </div>
                <div className="w-full text-center">
                  <p className="text-sm font-medium">{profile.department}</p>
                  <p className="text-sm text-muted-foreground">
                    {profile.college}
                  </p>
                </div>
                <Button className="w-full" variant="outline">
                  Change Photo
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      id="personal-form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            defaultValue={profile.firstName}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            defaultValue={profile.lastName}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue={profile.email}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            defaultValue={profile.phone}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" defaultValue={profile.address} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            rows={4}
                            defaultValue={profile.bio}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="skills">Skills</Label>
                          <Textarea
                            id="skills"
                            rows={3}
                            defaultValue={profile.skills}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="interests">Interests</Label>
                          <Textarea
                            id="interests"
                            rows={3}
                            defaultValue={profile.interests}
                          />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" form="personal-form">
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="academic" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Information</CardTitle>
                    <CardDescription>
                      Update your academic details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      id="academic-form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="studentId">Student ID</Label>
                          <Input
                            id="studentId"
                            defaultValue={profile.studentId}
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="year">Year</Label>
                          <Select
                            defaultValue={profile.year
                              .toLowerCase()
                              .replace(" ", "-")}
                          >
                            <SelectTrigger id="year">
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
                          <Label htmlFor="semester">Semester</Label>
                          <Select defaultValue="spring-2025">
                            <SelectTrigger id="semester">
                              <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fall-2024">
                                Fall 2024
                              </SelectItem>
                              <SelectItem value="spring-2025">
                                Spring 2025
                              </SelectItem>
                              <SelectItem value="summer-2025">
                                Summer 2025
                              </SelectItem>
                              <SelectItem value="fall-2025">
                                Fall 2025
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="college">College</Label>
                          <Select defaultValue="engineering">
                            <SelectTrigger id="college">
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
                          <Label htmlFor="department">Department</Label>
                          <Select defaultValue="computer-science">
                            <SelectTrigger id="department">
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
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" form="academic-form">
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Update your password and security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      id="security-form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">
                            Current Password
                          </Label>
                          <Input
                            id="current-password"
                            type="password"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            Confirm New Password
                          </Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            required
                          />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" form="security-form">
                      Update Password
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
