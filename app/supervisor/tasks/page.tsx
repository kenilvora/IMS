import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Download, Filter, Search, X } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function SupervisorTasks() {
  return (
    <DashboardLayout userType="supervisor" userName="Dr. Sarah Williams" userRole="Computer Science Department">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Task Tracker</h1>
            <p className="text-muted-foreground">Review and manage student tasks</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search tasks..." className="w-full sm:w-[240px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="grid divide-y">
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">API Integration</h3>
                          <Badge>Pending Review</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Alex Johnson" />
                            <AvatarFallback className="text-xs">AJ</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">Alex Johnson</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Submitted 2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Review Task Submission</DialogTitle>
                              <DialogDescription>Review and provide feedback on this task</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                              <div>
                                <div className="flex items-center justify-between">
                                  <h3 className="text-lg font-semibold">API Integration</h3>
                                  <Badge>Pending Review</Badge>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Alex Johnson" />
                                    <AvatarFallback className="text-xs">AJ</AvatarFallback>
                                  </Avatar>
                                  <p className="text-sm text-muted-foreground">Alex Johnson</p>
                                  <span className="text-sm text-muted-foreground">•</span>
                                  <p className="text-sm text-muted-foreground">Submitted 2 hours ago</p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Task Description</h4>
                                <p className="text-sm">
                                  Integrate the Stripe payment gateway API into the checkout flow. Implement both test
                                  and production environments, and ensure proper error handling.
                                </p>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Student Submission</h4>
                                <div className="bg-slate-50 p-4 rounded-md text-sm">
                                  <p>
                                    I've successfully integrated the Stripe payment gateway API into the checkout flow.
                                    The implementation includes both test and production environments with proper error
                                    handling. I've also added comprehensive logging for debugging purposes.
                                  </p>
                                  <p className="mt-2">Key features implemented:</p>
                                  <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>Secure payment processing</li>
                                    <li>Error handling with user-friendly messages</li>
                                    <li>Test mode toggle for development</li>
                                    <li>Webhook integration for payment events</li>
                                  </ul>
                                  <p className="mt-2">
                                    The code has been tested with various payment scenarios and edge cases.
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Attached Files</h4>
                                <div className="flex items-center justify-between p-3 border rounded-md">
                                  <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 p-2 rounded-md">
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
                                        className="text-blue-600"
                                      >
                                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <path d="M12 18v-6" />
                                        <path d="m9 15 3 3 3-3" />
                                      </svg>
                                    </div>
                                    <div>
                                      <p className="font-medium">stripe-integration.zip</p>
                                      <p className="text-xs text-muted-foreground">2.4 MB • Uploaded 2 hours ago</p>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="icon">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Your Feedback</h4>
                                <Textarea
                                  placeholder="Provide feedback on this task submission..."
                                  className="min-h-[100px]"
                                />
                              </div>
                            </div>
                            <DialogFooter className="flex flex-col sm:flex-row gap-2">
                              <Button variant="outline" className="sm:w-auto w-full gap-1">
                                <X className="h-4 w-4" />
                                Reject
                              </Button>
                              <Button className="sm:w-auto w-full gap-1">
                                <CheckCircle2 className="h-4 w-4" />
                                Approve
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Integrate the Stripe payment gateway API into the checkout flow. Implement both test and
                        production environments, and ensure proper error handling.
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Frontend Implementation</h3>
                          <Badge>Pending Review</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Emily Chen" />
                            <AvatarFallback className="text-xs">EC</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">Emily Chen</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Submitted yesterday</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Implement the user dashboard UI according to the provided design mockups. Ensure responsive
                        design and cross-browser compatibility.
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Database Schema Design</h3>
                          <Badge>Pending Review</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Michael Brown" />
                            <AvatarFallback className="text-xs">MB</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">Michael Brown</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Submitted 3 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Design the database schema for user management, including tables for users, roles, permissions,
                        and authentication.
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">User Authentication</h3>
                          <Badge>Pending Review</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Sophia Lee" />
                            <AvatarFallback className="text-xs">SL</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">Sophia Lee</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Submitted 5 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Implement user authentication including login, registration, password reset, and email
                        verification.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-4">
                <div className="text-sm text-muted-foreground">Showing 4 of 7 pending tasks</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="approved" className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="grid divide-y">
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Code Review</h3>
                          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                            Approved
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Alex Johnson" />
                            <AvatarFallback className="text-xs">AJ</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">Alex Johnson</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Approved 1 week ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Participate in team code review session and provide feedback on the authentication module.
                      </p>
                    </div>
                    <div className="mt-2 bg-slate-50 p-3 rounded-md">
                      <p className="text-sm font-medium">Your Feedback:</p>
                      <p className="text-sm mt-1">
                        Excellent participation in the code review. Alex provided valuable insights and identified
                        several potential security issues that were subsequently fixed.
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Weekly Status Report</h3>
                          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                            Approved
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Emily Chen" />
                            <AvatarFallback className="text-xs">EC</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">Emily Chen</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Approved 2 weeks ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Submit weekly status report detailing progress, challenges, and plans for the next week.
                      </p>
                    </div>
                    <div className="mt-2 bg-slate-50 p-3 rounded-md">
                      <p className="text-sm font-medium">Your Feedback:</p>
                      <p className="text-sm mt-1">
                        Comprehensive report with clear metrics and well-defined goals for the upcoming week. Keep up
                        the good work!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-4">
                <div className="text-sm text-muted-foreground">Showing 2 of 15 approved tasks</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="rejected" className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="grid divide-y">
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">UI Component Library</h3>
                          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                            Rejected
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Michael Brown" />
                            <AvatarFallback className="text-xs">MB</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">Michael Brown</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Rejected 3 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Create a reusable UI component library based on the design system provided by the design team.
                      </p>
                    </div>
                    <div className="mt-2 bg-red-50 p-3 rounded-md">
                      <p className="text-sm font-medium">Your Feedback:</p>
                      <p className="text-sm mt-1">
                        The components don't follow the design system specifications. Please review the design
                        documentation and ensure all components match the required styles and behaviors. Also, add
                        proper documentation for each component.
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Performance Optimization</h3>
                          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                            Rejected
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Rachel Green" />
                            <AvatarFallback className="text-xs">RG</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">Rachel Green</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Rejected 1 week ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Optimize the application performance by reducing load times and improving rendering efficiency.
                      </p>
                    </div>
                    <div className="mt-2 bg-red-50 p-3 rounded-md">
                      <p className="text-sm font-medium">Your Feedback:</p>
                      <p className="text-sm mt-1">
                        The optimization attempts didn't result in significant performance improvements. The page load
                        time is still above our target threshold. Please focus on image optimization, code splitting,
                        and reducing unnecessary re-renders in React components.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-4">
                <div className="text-sm text-muted-foreground">Showing 2 of 3 rejected tasks</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
