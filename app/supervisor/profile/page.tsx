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

export default function SupervisorProfile() {
  return (
    <DashboardLayout userType="supervisor" userName="Dr. Sarah Williams" userRole="Computer Science Department">
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
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Dr. Sarah Williams" />
                  <AvatarFallback className="text-2xl">SW</AvatarFallback>
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
                    <Label htmlFor="title">Title</Label>
                    <select
                      id="title"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option>Dr.</option>
                      <option>Prof.</option>
                      <option>Mr.</option>
                      <option>Mrs.</option>
                      <option>Ms.</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="faculty-id">Faculty ID</Label>
                    <Input id="faculty-id" defaultValue="CS-FAC-2015-042" readOnly />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="Sarah" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Williams" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="sarah.williams@university.edu" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="(555) 987-6543" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">Office Address</Label>
                  <Textarea id="address" defaultValue="Computer Science Building, Room 305, University Campus" />
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
                <CardTitle>Contact Preferences</CardTitle>
                <CardDescription>Set your communication preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications about student submissions
                      </p>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="email-notifications"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive text messages for urgent matters</p>
                    </div>
                    <div>
                      <input type="checkbox" id="sms-notifications" className="h-4 w-4 rounded border-gray-300" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-digest">Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">Receive a weekly summary of student activities</p>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="weekly-digest"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Preferences</Button>
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
                  <Badge className="ml-auto">Associate Professor</Badge>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" defaultValue="Associate Professor" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="join-date">Joined University</Label>
                    <Input id="join-date" defaultValue="September 2015" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue="Computer Science" readOnly />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="faculty">Faculty</Label>
                    <Input id="faculty" defaultValue="Engineering" readOnly />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="specialization">Specialization/Research Areas</Label>
                  <Textarea
                    id="specialization"
                    defaultValue="Machine Learning, Computer Vision, Software Engineering"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="education">Education</Label>
                  <Textarea
                    id="education"
                    defaultValue="Ph.D. in Computer Science, Stanford University (2012)
M.S. in Computer Science, MIT (2008)
B.S. in Computer Engineering, UC Berkeley (2006)"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supervision Information</CardTitle>
                <CardDescription>Details about your supervision capacity and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="max-students">Maximum Students</Label>
                    <Input id="max-students" type="number" defaultValue="15" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="current-students">Current Students</Label>
                    <Input id="current-students" defaultValue="12" readOnly />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="supervision-areas">Supervision Areas</Label>
                  <Textarea
                    id="supervision-areas"
                    defaultValue="Software Development, Data Science, Machine Learning, Web Technologies, Mobile App Development"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="industry-connections">Industry Connections</Label>
                  <Textarea
                    id="industry-connections"
                    defaultValue="TechNova Solutions, FinTech Solutions, Global Media Inc., Creative Studios"
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
                    <div className="bg-green-100 p-2 rounded-full">
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
                        className="text-green-600"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Your account is protected with an additional security layer
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                    Enabled
                  </Badge>
                </div>
                <Button variant="outline">Manage Two-Factor Authentication</Button>
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
                          MacBook Pro • University City, CA • Started 3 hours ago
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
                        <p className="font-medium">iPhone 13 Pro</p>
                        <p className="text-xs text-muted-foreground">University City, CA • Last active 1 day ago</p>
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
