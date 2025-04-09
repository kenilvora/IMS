import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bell, FileText, Users } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function SupervisorDashboard() {
  return (
    <DashboardLayout userType="supervisor" userName="Dr. Sarah Williams" userRole="Computer Science Department">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Supervisor Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your assigned students</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Across 3 departments</p>
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
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">4 completed this year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 due this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks to Review</CardTitle>
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
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                <path d="m9 14 2 2 4-4" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Submitted in the last 7 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Student Overview</CardTitle>
              <CardDescription>Status of your assigned students</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex Johnson" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Alex Johnson</p>
                      <p className="text-sm text-muted-foreground">Computer Science, Year 3</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge>Active</Badge>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Emily Chen" />
                      <AvatarFallback>EC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Emily Chen</p>
                      <p className="text-sm text-muted-foreground">Computer Science, Year 4</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge>Active</Badge>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Michael Brown" />
                      <AvatarFallback>MB</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Michael Brown</p>
                      <p className="text-sm text-muted-foreground">Computer Science, Year 3</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge>Active</Badge>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sophia Lee" />
                      <AvatarFallback>SL</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Sophia Lee</p>
                      <p className="text-sm text-muted-foreground">Computer Science, Year 4</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                      Completed
                    </Badge>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="David Wilson" />
                      <AvatarFallback>DW</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">David Wilson</p>
                      <p className="text-sm text-muted-foreground">Computer Science, Year 3</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                      Completed
                    </Badge>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4 text-center">
                <Button variant="outline">View All Students</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
              <CardDescription>Important notifications requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <Bell className="h-4 w-4 text-red-500" />
                <AlertTitle className="text-red-500">Urgent: Report Review Required</AlertTitle>
                <AlertDescription className="text-sm">
                  Emily Chen's final report is due for review within 48 hours.
                </AlertDescription>
              </Alert>

              <Alert className="border-yellow-200 bg-yellow-50">
                <Bell className="h-4 w-4 text-yellow-500" />
                <AlertTitle className="text-yellow-500">Task Approval Pending</AlertTitle>
                <AlertDescription className="text-sm">
                  Alex Johnson has 3 tasks awaiting your approval.
                </AlertDescription>
              </Alert>

              <Alert className="border-blue-200 bg-blue-50">
                <Bell className="h-4 w-4 text-blue-500" />
                <AlertTitle className="text-blue-500">Internship Ending Soon</AlertTitle>
                <AlertDescription className="text-sm">
                  Michael Brown's internship ends in 2 weeks. Schedule final evaluation.
                </AlertDescription>
              </Alert>

              <Alert>
                <Bell className="h-4 w-4" />
                <AlertTitle>New Student Assigned</AlertTitle>
                <AlertDescription className="text-sm">
                  You have been assigned as the supervisor for Rachel Green.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="tasks">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Recent Activity</h2>
              <TabsList>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="tasks" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">API Integration</p>
                        <p className="text-sm text-muted-foreground">Submitted by Alex Johnson • 2 hours ago</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Frontend Implementation</p>
                        <p className="text-sm text-muted-foreground">Submitted by Emily Chen • Yesterday</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Database Schema Design</p>
                        <p className="text-sm text-muted-foreground">Submitted by Michael Brown • 3 days ago</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">User Authentication</p>
                        <p className="text-sm text-muted-foreground">Submitted by Sophia Lee • 5 days ago</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Final Internship Report</p>
                        <p className="text-sm text-muted-foreground">Submitted by David Wilson • 1 day ago</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Mid-term Progress Report</p>
                        <p className="text-sm text-muted-foreground">Submitted by Emily Chen • 1 week ago</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Weekly Status Report</p>
                        <p className="text-sm text-muted-foreground">Submitted by Alex Johnson • 2 weeks ago</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Project Proposal</p>
                        <p className="text-sm text-muted-foreground">Submitted by Michael Brown • 3 weeks ago</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                        <Button size="sm">Review</Button>
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
