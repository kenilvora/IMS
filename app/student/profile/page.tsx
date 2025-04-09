import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Upload } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function StudentProfile() {
  return (
    <DashboardLayout userType="student" userName="Alex Johnson" userRole="Computer Science, Year 3">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>

        <Tabs defaultValue="personal">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Update your profile picture</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Alex Johnson" />
                  <AvatarFallback className="text-2xl">AJ</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">
                      Upload a new profile picture. JPG, GIF or PNG. Max size 1MB.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload New Image
                    </Button>
                    <Button variant="outline">Remove</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="Alex" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Johnson" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="alex.johnson@university.edu" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" defaultValue="123 Campus Drive, University Housing, Apt 4B" />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="University City" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue="CA" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input id="zip" defaultValue="94103" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How to reach you in case of emergency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="emergency-name">Emergency Contact Name</Label>
                    <Input id="emergency-name" defaultValue="Sarah Johnson" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="emergency-relation">Relationship</Label>
                    <Input id="emergency-relation" defaultValue="Mother" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="emergency-phone">Emergency Phone</Label>
                    <Input id="emergency-phone" type="tel" defaultValue="(555) 987-6543" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="emergency-email">Emergency Email</Label>
                    <Input id="emergency-email" type="email" defaultValue="sarah.johnson@example.com" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
                <CardDescription>Your academic details and department information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <Building2 className="h-8 w-8 text-slate-400" />
                  <div>
                    <p className="font-medium">Computer Science Department</p>
                    <p className="text-sm text-muted-foreground">Faculty of Engineering</p>
                  </div>
                  <Badge className="ml-auto">Year 3</Badge>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="student-id">Student ID</Label>
                    <Input id="student-id" defaultValue="CS2021035" readOnly />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="enrollment-year">Enrollment Year</Label>
                    <Input id="enrollment-year" defaultValue="2021" readOnly />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="program">Program</Label>
                    <Input id="program" defaultValue="Bachelor of Science in Computer Science" readOnly />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="expected-graduation">Expected Graduation</Label>
                    <Input id="expected-graduation" defaultValue="May 2025" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="academic-advisor">Academic Advisor</Label>
                  <div className="flex items-center gap-3 p-3 border rounded-md">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Michael Roberts" />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr. Michael Roberts</p>
                      <p className="text-sm text-muted-foreground">Computer Science Department</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="specialization">Specialization/Focus Area</Label>
                  <Input id="specialization" defaultValue="Software Engineering" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills & Interests</CardTitle>
                <CardDescription>Add skills and areas of interest for better internship matching</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="skills">Technical Skills</Label>
                  <Textarea
                    id="skills"
                    defaultValue="JavaScript, React, Node.js, Python, Java, SQL, Git, Docker"
                    placeholder="Enter your technical skills, separated by commas"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="interests">Areas of Interest</Label>
                  <Textarea
                    id="interests"
                    defaultValue="Web Development, Mobile App Development, Machine Learning, Cloud Computing"
                    placeholder="Enter your areas of interest, separated by commas"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="certifications">Certifications</Label>
                  <Textarea
                    id="certifications"
                    defaultValue="AWS Certified Developer, Microsoft Certified: Azure Fundamentals"
                    placeholder="Enter any certifications you have"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Update Password</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-200 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-slate-600"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Protect your account with an additional security layer
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                    Not Enabled
                  </Badge>
                </div>
                <Button>Enable Two-Factor Authentication</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Login Sessions</CardTitle>
                <CardDescription>Manage your active login sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-600"
                        >
                          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                          <line x1="12" x2="12.01" y1="18" y2="18" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-xs text-muted-foreground">
                          MacBook Pro • San Francisco, CA • Started 2 hours ago
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-slate-600"
                        >
                          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                          <line x1="12" x2="12.01" y1="18" y2="18" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">iPhone 13</p>
                        <p className="text-xs text-muted-foreground">San Francisco, CA • Last active 2 days ago</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Logout
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">
                  Logout from all devices
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
