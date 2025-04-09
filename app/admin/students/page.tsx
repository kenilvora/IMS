import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Filter, Mail, Plus, Search, UserPlus } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";

export default function AdminStudents() {
  return (
    <DashboardLayout
      userType="admin"
      userName="Admin User"
      userRole="System Administrator"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Student Management
            </h1>
            <p className="text-muted-foreground">
              Add, edit, and manage student records
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="w-full sm:w-[240px] pl-8"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-1">
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Student</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>
                    Add a new student to the system
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Enter first name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Enter last name" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="student@university.edu"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="student-id">Student ID</Label>
                      <Input id="student-id" placeholder="e.g., CS2023001" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="department">Department</Label>
                      <select
                        id="department"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select Department</option>
                        <option value="computer-science">
                          Computer Science
                        </option>
                        <option value="business-admin">
                          Business Administration
                        </option>
                        <option value="electrical-engineering">
                          Electrical Engineering
                        </option>
                        <option value="psychology">Psychology</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="year">Year</Label>
                      <select
                        id="year"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select Year</option>
                        <option value="1">Year 1</option>
                        <option value="2">Year 2</option>
                        <option value="3">Year 3</option>
                        <option value="4">Year 4</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="supervisor">Assign Supervisor</Label>
                      <select
                        id="supervisor"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select Supervisor</option>
                        <option value="dr-sarah-williams">
                          Dr. Sarah Williams
                        </option>
                        <option value="prof-robert-johnson">
                          Prof. Robert Johnson
                        </option>
                        <option value="dr-james-peterson">
                          Dr. James Peterson
                        </option>
                        <option value="dr-emily-chen">Dr. Emily Chen</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <select
                        id="status"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="on-leave">On Leave</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter any additional information about the student"
                    />
                  </div>
                </div>
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" className="sm:w-auto w-full">
                    Cancel
                  </Button>
                  <Button className="sm:w-auto w-full gap-1">
                    <Plus className="h-4 w-4" />
                    Add Student
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Students</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="grid divide-y">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Alex Johnson"
                        />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Alex Johnson</p>
                        <p className="text-sm text-muted-foreground">
                          Computer Science, Year 3
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge>Active</Badge>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Emily Chen"
                        />
                        <AvatarFallback>EC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Emily Chen</p>
                        <p className="text-sm text-muted-foreground">
                          Computer Science, Year 4
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge>Active</Badge>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Michael Brown"
                        />
                        <AvatarFallback>MB</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Michael Brown</p>
                        <p className="text-sm text-muted-foreground">
                          Computer Science, Year 3
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge>Active</Badge>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Sophia Lee"
                        />
                        <AvatarFallback>SL</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Sophia Lee</p>
                        <p className="text-sm text-muted-foreground">
                          Computer Science, Year 4
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge
                        variant="outline"
                        className="text-green-500 border-green-200 bg-green-50"
                      >
                        Completed
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="David Wilson"
                        />
                        <AvatarFallback>DW</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">David Wilson</p>
                        <p className="text-sm text-muted-foreground">
                          Computer Science, Year 3
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge
                        variant="outline"
                        className="text-green-500 border-green-200 bg-green-50"
                      >
                        Completed
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-4">
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 248 students
                </div>
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

          <TabsContent value="active" className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="grid divide-y">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Alex Johnson"
                        />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Alex Johnson</p>
                        <p className="text-sm text-muted-foreground">
                          Computer Science, Year 3
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge>Active</Badge>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Emily Chen"
                        />
                        <AvatarFallback>EC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Emily Chen</p>
                        <p className="text-sm text-muted-foreground">
                          Computer Science, Year 4
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge>Active</Badge>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Michael Brown"
                        />
                        <AvatarFallback>MB</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Michael Brown</p>
                        <p className="text-sm text-muted-foreground">
                          Computer Science, Year 3
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge>Active</Badge>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-4">
                <div className="text-sm text-muted-foreground">
                  Showing 3 of 156 active students
                </div>
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

          <TabsContent value="inactive" className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="grid divide-y">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Sophia Lee"
                        />
                        <AvatarFallback>SL</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Sophia Lee</p>
                        <p className="text-sm text-muted-foreground">
                          Computer Science, Year 4
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge
                        variant="outline"
                        className="text-green-500 border-green-200 bg-green-50"
                      >
                        Completed
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="David Wilson"
                        />
                        <AvatarFallback>DW</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">David Wilson</p>
                        <p className="text-sm text-muted-foreground">
                          Computer Science, Year 3
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <Badge
                        variant="outline"
                        className="text-green-500 border-green-200 bg-green-50"
                      >
                        Completed
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Email</span>
                        </Button>
                        <Button size="sm" className="h-8">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-4">
                <div className="text-sm text-muted-foreground">
                  Showing 2 of 92 inactive students
                </div>
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
  );
}
