import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, BookOpen, Building2, Download, FileText, PieChart, Plus, Users } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function AdminDashboard() {
  return (
    <DashboardLayout userType="admin" userName="Admin User" userRole="System Administrator">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage all aspects of the internship program</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248</div>
              <p className="text-xs text-muted-foreground">+12% from last semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Internships</CardTitle>
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
                className="text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">92 completed this year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Across 3 faculties</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Supervisors</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">8 new this semester</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Internship Statistics</CardTitle>
              <CardDescription>Overview of internship data for the current year</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                <div className="flex h-full items-center justify-center">
                  <BarChart className="h-16 w-16 text-slate-200" />
                  <p className="text-sm text-muted-foreground ml-2">Internship statistics chart would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
              <CardDescription>Students per department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <div className="flex h-full items-center justify-center">
                  <PieChart className="h-16 w-16 text-slate-200" />
                  <p className="text-sm text-muted-foreground ml-2">Department distribution chart would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex justify-between">
              <div>
                <CardTitle>Recent Students</CardTitle>
                <CardDescription>Recently added students</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Rachel Green" />
                    <AvatarFallback>RG</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Rachel Green</p>
                    <p className="text-sm text-muted-foreground">Computer Science, Year 3</p>
                  </div>
                  <Badge className="ml-auto">New</Badge>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="James Wilson" />
                    <AvatarFallback>JW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">James Wilson</p>
                    <p className="text-sm text-muted-foreground">Electrical Engineering, Year 4</p>
                  </div>
                  <Badge className="ml-auto">New</Badge>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Emma Thompson" />
                    <AvatarFallback>ET</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Emma Thompson</p>
                    <p className="text-sm text-muted-foreground">Business Administration, Year 2</p>
                  </div>
                  <Badge className="ml-auto">New</Badge>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Daniel Lee" />
                    <AvatarFallback>DL</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Daniel Lee</p>
                    <p className="text-sm text-muted-foreground">Computer Science, Year 3</p>
                  </div>
                  <Badge className="ml-auto">New</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between">
              <div>
                <CardTitle>Recent Internships</CardTitle>
                <CardDescription>Recently added internship opportunities</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Software Developer Intern</p>
                    <Badge variant="outline">Tech</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">TechNova Solutions • Added 2 days ago</p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Marketing Assistant</p>
                    <Badge variant="outline">Marketing</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Global Media Inc. • Added 3 days ago</p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Data Analyst Intern</p>
                    <Badge variant="outline">Finance</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">FinTech Solutions • Added 5 days ago</p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">UX/UI Design Intern</p>
                    <Badge variant="outline">Design</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Creative Studios • Added 1 week ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between">
              <div>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Plus className="h-4 w-4" />
                  Add New Student
                </Button>

                <Button className="w-full justify-start gap-2" variant="outline">
                  <Plus className="h-4 w-4" />
                  Add New Internship
                </Button>

                <Button className="w-full justify-start gap-2" variant="outline">
                  <Plus className="h-4 w-4" />
                  Add New Supervisor
                </Button>

                <Button className="w-full justify-start gap-2" variant="outline">
                  <FileText className="h-4 w-4" />
                  Generate Reports
                </Button>

                <Button className="w-full justify-start gap-2" variant="outline">
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="departments">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">System Overview</h2>
              <TabsList>
                <TabsTrigger value="departments">Departments</TabsTrigger>
                <TabsTrigger value="supervisors">Supervisors</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="departments" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Computer Science</p>
                        <p className="text-sm text-muted-foreground">Faculty of Engineering</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge>68 Students</Badge>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Business Administration</p>
                        <p className="text-sm text-muted-foreground">Faculty of Business</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge>52 Students</Badge>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Electrical Engineering</p>
                        <p className="text-sm text-muted-foreground">Faculty of Engineering</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge>45 Students</Badge>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Psychology</p>
                        <p className="text-sm text-muted-foreground">Faculty of Arts & Sciences</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge>38 Students</Badge>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="supervisors" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Sarah Williams" />
                          <AvatarFallback>SW</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Dr. Sarah Williams</p>
                          <p className="text-sm text-muted-foreground">Computer Science Department</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge>12 Students</Badge>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Prof. Robert Johnson" />
                          <AvatarFallback>RJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Prof. Robert Johnson</p>
                          <p className="text-sm text-muted-foreground">Business Administration Department</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge>10 Students</Badge>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. James Peterson" />
                          <AvatarFallback>JP</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Dr. James Peterson</p>
                          <p className="text-sm text-muted-foreground">Electrical Engineering Department</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge>8 Students</Badge>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Emily Chen" />
                          <AvatarFallback>EC</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Dr. Emily Chen</p>
                          <p className="text-sm text-muted-foreground">Psychology Department</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge>7 Students</Badge>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
