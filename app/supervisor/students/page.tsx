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
import { Filter, Mail, Phone, Search } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function SupervisorStudents() {
  return (
    <DashboardLayout userType="supervisor" userName="Dr. Sarah Williams" userRole="Computer Science Department">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Students</h1>
            <p className="text-muted-foreground">Manage and monitor your assigned students</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search students..." className="w-full sm:w-[240px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Students</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="grid divide-y">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex Johnson" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Alex Johnson</p>
                        <p className="text-sm text-muted-foreground">Computer Science, Year 3</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge>Active</Badge>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="h-8">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Student Details</DialogTitle>
                              <DialogDescription>Detailed information about Alex Johnson</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Alex Johnson" />
                                  <AvatarFallback className="text-xl">AJ</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-xl font-semibold">Alex Johnson</h3>
                                  <p className="text-muted-foreground">Computer Science, Year 3</p>
                                  <div className="flex items-center gap-4 mt-1">
                                    <Badge>Active</Badge>
                                    <p className="text-sm">Student ID: CS2021035</p>
                                  </div>
                                </div>
                              </div>

                              <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Contact Information</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-muted-foreground" />
                                      <p className="text-sm">alex.johnson@university.edu</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Phone className="h-4 w-4 text-muted-foreground" />
                                      <p className="text-sm">(555) 123-4567</p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Internship Details</h4>
                                  <div className="space-y-2">
                                    <p className="text-sm">
                                      <span className="font-medium">Company:</span> TechNova Solutions
                                    </p>
                                    <p className="text-sm">
                                      <span className="font-medium">Position:</span> Junior Software Developer
                                    </p>
                                    <p className="text-sm">
                                      <span className="font-medium">Duration:</span> May 15 - Aug 15, 2023
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium mb-2">Progress Overview</h4>
                                <div className="grid gap-4 sm:grid-cols-3">
                                  <div className="bg-slate-50 p-3 rounded-md text-center">
                                    <p className="text-2xl font-bold">53%</p>
                                    <p className="text-xs text-muted-foreground">Overall Progress</p>
                                  </div>
                                  <div className="bg-slate-50 p-3 rounded-md text-center">
                                    <p className="text-2xl font-bold">12/20</p>
                                    <p className="text-xs text-muted-foreground">Tasks Completed</p>
                                  </div>
                                  <div className="bg-slate-50 p-3 rounded-md text-center">
                                    <p className="text-2xl font-bold">Draft</p>
                                    <p className="text-xs text-muted-foreground">Report Status</p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium mb-2">Notes</h4>
                                <Textarea
                                  placeholder="Add notes about this student..."
                                  defaultValue="Alex is making good progress with his internship. He's particularly strong in frontend development and has shown initiative in taking on additional tasks."
                                />
                              </div>
                            </div>
                            <DialogFooter className="flex flex-col sm:flex-row gap-2">
                              <Button variant="outline" className="sm:w-auto w-full">
                                View Full Profile
                              </Button>
                              <Button className="sm:w-auto w-full">Save Notes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Emily Chen" />
                        <AvatarFallback>EC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Emily Chen</p>
                        <p className="text-sm text-muted-foreground">Computer Science, Year 4</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge>Active</Badge>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Michael Brown" />
                        <AvatarFallback>MB</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Michael Brown</p>
                        <p className="text-sm text-muted-foreground">Computer Science, Year 3</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge>Active</Badge>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Rachel Green" />
                        <AvatarFallback>RG</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Rachel Green</p>
                        <p className="text-sm text-muted-foreground">Computer Science, Year 3</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge>Active</Badge>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-4">
                <div className="text-sm text-muted-foreground">Showing 4 of 8 active students</div>
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

          <TabsContent value="completed" className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="grid divide-y">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sophia Lee" />
                        <AvatarFallback>SL</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Sophia Lee</p>
                        <p className="text-sm text-muted-foreground">Computer Science, Year 4</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                        Completed
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="David Wilson" />
                        <AvatarFallback>DW</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">David Wilson</p>
                        <p className="text-sm text-muted-foreground">Computer Science, Year 3</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                        Completed
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="James Wilson" />
                        <AvatarFallback>JW</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">James Wilson</p>
                        <p className="text-sm text-muted-foreground">Computer Science, Year 4</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                        Completed
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-4">
                <div className="text-sm text-muted-foreground">Showing 3 of 4 completed students</div>
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

          <TabsContent value="all" className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="grid divide-y">
                  {/* Combined list of all students would appear here */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex Johnson" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Alex Johnson</p>
                        <p className="text-sm text-muted-foreground">Computer Science, Year 3</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge>Active</Badge>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sophia Lee" />
                        <AvatarFallback>SL</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Sophia Lee</p>
                        <p className="text-sm text-muted-foreground">Computer Science, Year 4</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                        Completed
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-4">
                <div className="text-sm text-muted-foreground">Showing 2 of 12 students</div>
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
