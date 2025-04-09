import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, CheckCircle2, Clock, FileText, Filter, Plus, Upload } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function StudentTasks() {
  return (
    <DashboardLayout userType="student" userName="Alex Johnson" userRole="Computer Science, Year 3">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">Manage and track your internship tasks</p>
          </div>

          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  New Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                  <DialogDescription>Create a new task to track your internship progress</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="task-title">Task Title</Label>
                    <Input id="task-title" placeholder="Enter task title" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="task-description">Description</Label>
                    <Textarea id="task-description" placeholder="Describe the task and requirements" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="task-deadline">Deadline</Label>
                      <Input id="task-deadline" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="task-priority">Priority</Label>
                      <select
                        id="task-priority"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">Sort by:</p>
              <select className="text-sm border-none focus:ring-0">
                <option>Due Date</option>
                <option>Priority</option>
                <option>Recently Added</option>
              </select>
            </div>
          </div>

          <TabsContent value="all" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>API Integration</CardTitle>
                    <CardDescription>Integrate payment gateway API</CardDescription>
                  </div>
                  <Badge>Pending</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Due in 5 days (Jul 15, 2023)</p>
                    </div>
                    <div className="flex items-center gap-2">
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
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m15 9-6 6" />
                        <path d="m9 9 6 6" />
                      </svg>
                      <p className="text-sm">Priority: High</p>
                    </div>
                  </div>

                  <p className="text-sm">
                    Integrate the Stripe payment gateway API into the checkout flow. Implement both test and production
                    environments, and ensure proper error handling.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="gap-1">
                  <Upload className="h-4 w-4" />
                  Upload Proof
                </Button>
                <Button className="gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Mark as Complete
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Frontend Implementation</CardTitle>
                    <CardDescription>Implement user dashboard UI</CardDescription>
                  </div>
                  <Badge className="bg-red-500">Urgent</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Due tomorrow (Jul 11, 2023)</p>
                    </div>
                    <div className="flex items-center gap-2">
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
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m15 9-6 6" />
                        <path d="m9 9 6 6" />
                      </svg>
                      <p className="text-sm">Priority: High</p>
                    </div>
                  </div>

                  <p className="text-sm">
                    Implement the user dashboard UI according to the provided design mockups. Ensure responsive design
                    and cross-browser compatibility.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="gap-1">
                  <Upload className="h-4 w-4" />
                  Upload Proof
                </Button>
                <Button className="gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Mark as Complete
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Documentation</CardTitle>
                    <CardDescription>Create API documentation</CardDescription>
                  </div>
                  <Badge>Pending</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Due in 10 days (Jul 20, 2023)</p>
                    </div>
                    <div className="flex items-center gap-2">
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
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m15 9-6 6" />
                        <path d="m9 9 6 6" />
                      </svg>
                      <p className="text-sm">Priority: Medium</p>
                    </div>
                  </div>

                  <p className="text-sm">
                    Create comprehensive documentation for the API endpoints. Include request/response examples, error
                    codes, and authentication requirements.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="gap-1">
                  <Upload className="h-4 w-4" />
                  Upload Proof
                </Button>
                <Button className="gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Mark as Complete
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Database Design</CardTitle>
                    <CardDescription>Design database schema for user management</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                    Completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Completed on Jul 5, 2023</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Feedback received</p>
                    </div>
                  </div>

                  <p className="text-sm">
                    Design the database schema for user management, including tables for users, roles, permissions, and
                    authentication.
                  </p>

                  <div className="bg-slate-50 p-3 rounded-md border">
                    <p className="text-sm font-medium">Supervisor Feedback:</p>
                    <p className="text-sm mt-1">
                      Great work on the database schema. The design is well-normalized and accounts for future
                      scalability. Consider adding indexes for frequently queried fields.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1">
                  <FileText className="h-4 w-4" />
                  View Submission
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="mt-4 space-y-4">
            {/* Similar content as "all" tab but only showing pending tasks */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>API Integration</CardTitle>
                    <CardDescription>Integrate payment gateway API</CardDescription>
                  </div>
                  <Badge>Pending</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Due in 5 days (Jul 15, 2023)</p>
                    </div>
                    <div className="flex items-center gap-2">
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
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m15 9-6 6" />
                        <path d="m9 9 6 6" />
                      </svg>
                      <p className="text-sm">Priority: High</p>
                    </div>
                  </div>

                  <p className="text-sm">
                    Integrate the Stripe payment gateway API into the checkout flow. Implement both test and production
                    environments, and ensure proper error handling.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="gap-1">
                  <Upload className="h-4 w-4" />
                  Upload Proof
                </Button>
                <Button className="gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Mark as Complete
                </Button>
              </CardFooter>
            </Card>

            {/* More pending tasks... */}
          </TabsContent>

          <TabsContent value="completed" className="mt-4 space-y-4">
            {/* Similar content as "all" tab but only showing completed tasks */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Database Design</CardTitle>
                    <CardDescription>Design database schema for user management</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                    Completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Completed on Jul 5, 2023</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Feedback received</p>
                    </div>
                  </div>

                  <p className="text-sm">
                    Design the database schema for user management, including tables for users, roles, permissions, and
                    authentication.
                  </p>

                  <div className="bg-slate-50 p-3 rounded-md border">
                    <p className="text-sm font-medium">Supervisor Feedback:</p>
                    <p className="text-sm mt-1">
                      Great work on the database schema. The design is well-normalized and accounts for future
                      scalability. Consider adding indexes for frequently queried fields.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1">
                  <FileText className="h-4 w-4" />
                  View Submission
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Authentication</CardTitle>
                    <CardDescription>Implement login and registration</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                    Completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Completed on Jun 28, 2023</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Feedback received</p>
                    </div>
                  </div>

                  <p className="text-sm">
                    Implement user authentication including login, registration, password reset, and email verification.
                  </p>

                  <div className="bg-slate-50 p-3 rounded-md border">
                    <p className="text-sm font-medium">Supervisor Feedback:</p>
                    <p className="text-sm mt-1">
                      Authentication implementation is solid. Good job implementing proper security practices. Consider
                      adding two-factor authentication in the future.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1">
                  <FileText className="h-4 w-4" />
                  View Submission
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
