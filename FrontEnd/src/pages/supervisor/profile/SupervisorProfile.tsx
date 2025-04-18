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

export default function SupervisorProfile() {
  const [activeTab, setActiveTab] = useState("personal");

  // Dummy data for the supervisor profile
  const profile = {
    id: "user-005",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 987-6543",
    college: "College of Engineering",
    department: "Computer Science",
    facultyId: "FAC2025005",
    position: "Associate Professor",
    office: "Engineering Building, Room 305",
    officeHours: "Monday, Wednesday: 2:00 PM - 4:00 PM",
    bio: "Associate Professor of Computer Science with expertise in software engineering, web development, and human-computer interaction. Passionate about mentoring students and helping them succeed in their internships and careers.",
    expertise:
      "Software Engineering, Web Development, Human-Computer Interaction, User Experience Design",
    research:
      "Software quality, developer productivity, educational technology",
    address: "456 Faculty Row, College Town, CT 12345",
    socialLinks: {
      linkedin: "linkedin.com/in/sarahjohnson",
      researchGate: "researchgate.net/profile/Sarah_Johnson",
      website: "sarahjohnson.edu",
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to the backend
    // Show success message
  };

  return (
    <MainLayout role="supervisor">
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
                  <AvatarFallback>SJ</AvatarFallback>
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
                  <p className="text-sm font-medium">{profile.position}</p>
                  <p className="text-sm text-muted-foreground">
                    {profile.department}
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
                          <Label htmlFor="expertise">Areas of Expertise</Label>
                          <Textarea
                            id="expertise"
                            rows={3}
                            defaultValue={profile.expertise}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="research">Research Interests</Label>
                          <Textarea
                            id="research"
                            rows={3}
                            defaultValue={profile.research}
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
                          <Label htmlFor="facultyId">Faculty ID</Label>
                          <Input
                            id="facultyId"
                            defaultValue={profile.facultyId}
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Position</Label>
                          <Select defaultValue="associate-professor">
                            <SelectTrigger id="position">
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="assistant-professor">
                                Assistant Professor
                              </SelectItem>
                              <SelectItem value="associate-professor">
                                Associate Professor
                              </SelectItem>
                              <SelectItem value="professor">
                                Professor
                              </SelectItem>
                              <SelectItem value="adjunct-professor">
                                Adjunct Professor
                              </SelectItem>
                              <SelectItem value="lecturer">Lecturer</SelectItem>
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
                        <div className="space-y-2">
                          <Label htmlFor="office">Office</Label>
                          <Input id="office" defaultValue={profile.office} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="officeHours">Office Hours</Label>
                          <Input
                            id="officeHours"
                            defaultValue={profile.officeHours}
                          />
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
