import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, FileText, ListTodo } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function StudentDashboard() {
  return (
    <DashboardLayout userType="student" userName="Alex Johnson" userRole="Computer Science, Year 3">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Alex! Here's an overview of your internship.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Days Remaining</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">Out of 90 days total</p>
              <Progress className="mt-2" value={53} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12/20</div>
              <p className="text-xs text-muted-foreground">60% completion rate</p>
              <Progress className="mt-2" value={60} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <ListTodo className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 due this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Report Status</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Draft</div>
              <p className="text-xs text-muted-foreground">Due in 30 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Current Internship</CardTitle>
              <CardDescription>Details about your ongoing internship</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Company</p>
                  <p className="text-xl font-bold">TechNova Solutions</p>
                </div>
                <Badge>Active</Badge>
              </div>

              <div>
                <p className="text-sm font-medium">Position</p>
                <p>Junior Software Developer</p>
              </div>

              <div>
                <p className="text-sm font-medium">Duration</p>
                <p>May 15, 2023 - August 15, 2023 (90 days)</p>
              </div>

              <div>
                <p className="text-sm font-medium">Supervisor</p>
                <p>Dr. Sarah Williams (University)</p>
                <p>Mr. James Peterson (Company)</p>
              </div>

              <div className="pt-2">
                <Button variant="outline">View Full Details</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Task Approved</p>
                    <p className="text-sm text-muted-foreground">Your "Database Design" task was approved</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">New Task Assigned</p>
                    <p className="text-sm text-muted-foreground">API Integration task due in 5 days</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
                  <div>
                    <p className="text-sm font-medium">Weekly Report Submitted</p>
                    <p className="text-sm text-muted-foreground">Week 5 progress report submitted</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-red-500" />
                  <div>
                    <p className="text-sm font-medium">Task Deadline Approaching</p>
                    <p className="text-sm text-muted-foreground">"Frontend Implementation" due tomorrow</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="upcoming">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Tasks</h2>
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">API Integration</p>
                        <p className="text-sm text-muted-foreground">Integrate payment gateway API</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">Due in 5 days</Badge>
                        <Button size="sm">Mark Complete</Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Frontend Implementation</p>
                        <p className="text-sm text-muted-foreground">Implement user dashboard UI</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                          Due Tomorrow
                        </Badge>
                        <Button size="sm">Mark Complete</Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Documentation</p>
                        <p className="text-sm text-muted-foreground">Create API documentation</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">Due in 10 days</Badge>
                        <Button size="sm">Mark Complete</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Database Design</p>
                        <p className="text-sm text-muted-foreground">Design database schema for user management</p>
                      </div>
                      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                        Completed
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">User Authentication</p>
                        <p className="text-sm text-muted-foreground">Implement login and registration</p>
                      </div>
                      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                        Completed
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Code Review</p>
                        <p className="text-sm text-muted-foreground">Participate in team code review</p>
                      </div>
                      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                        Completed
                      </Badge>
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
