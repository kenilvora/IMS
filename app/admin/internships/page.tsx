import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Building2, Calendar, Filter, Plus, Search, Users } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";

export default function AdminInternships() {
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
              Internship Management
            </h1>
            <p className="text-muted-foreground">
              Add, edit, and manage internship opportunities
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search internships..."
                className="w-full sm:w-[240px] pl-8"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Internship</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Internship</DialogTitle>
                  <DialogDescription>
                    Create a new internship opportunity
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Internship Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Software Developer Intern"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Company name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="City, State" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input id="start-date" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input id="end-date" type="date" />
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
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select Category</option>
                        <option value="tech">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="marketing">Marketing</option>
                        <option value="design">Design</option>
                        <option value="research">Research</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the internship opportunity"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="List the requirements for this internship"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="skills">Skills</Label>
                    <Input
                      id="skills"
                      placeholder="e.g., JavaScript, React, Node.js (comma separated)"
                    />
                  </div>
                </div>
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" className="sm:w-auto w-full">
                    Cancel
                  </Button>
                  <Button className="sm:w-auto w-full gap-1">
                    <Plus className="h-4 w-4" />
                    Create Internship
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Internships</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="grid divide-y">
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">
                            Software Developer Intern
                          </h3>
                          <Badge>Active</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            TechNova Solutions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">May 15 - Aug 15, 2023</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">8 students assigned</p>
                      </div>
                      <div>
                        <Badge variant="outline">Tech</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Marketing Assistant</h3>
                          <Badge>Active</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Global Media Inc.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">Jun 1 - Aug 31, 2023</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">5 students assigned</p>
                      </div>
                      <div>
                        <Badge variant="outline">Marketing</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Data Analyst Intern</h3>
                          <Badge>Active</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            FinTech Solutions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">May 1 - Jul 31, 2023</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">6 students assigned</p>
                      </div>
                      <div>
                        <Badge variant="outline">Finance</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">UX/UI Design Intern</h3>
                          <Badge variant="outline">Upcoming</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Creative Studios
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">Sep 1 - Nov 30, 2023</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">0 students assigned</p>
                      </div>
                      <div>
                        <Badge variant="outline">Design</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Research Assistant</h3>
                          <Badge
                            variant="outline"
                            className="text-green-500 border-green-200 bg-green-50"
                          >
                            Completed
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            University Research Lab
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">Jan 15 - Apr 15, 2023</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">4 students assigned</p>
                      </div>
                      <div>
                        <Badge variant="outline">Research</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-4">
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 156 internships
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
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">
                            Software Developer Intern
                          </h3>
                          <Badge>Active</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            TechNova Solutions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">May 15 - Aug 15, 2023</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">8 students assigned</p>
                      </div>
                      <div>
                        <Badge variant="outline">Tech</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Marketing Assistant</h3>
                          <Badge>Active</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Global Media Inc.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">Jun 1 - Aug 31, 2023</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">5 students assigned</p>
                      </div>
                      <div>
                        <Badge variant="outline">Marketing</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-4">
                <div className="text-sm text-muted-foreground">
                  Showing 2 of 64 active internships
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

          <TabsContent value="upcoming" className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="grid divide-y">
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">UX/UI Design Intern</h3>
                          <Badge variant="outline">Upcoming</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Creative Studios
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">Sep 1 - Nov 30, 2023</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">0 students assigned</p>
                      </div>
                      <div>
                        <Badge variant="outline">Design</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-4">
                <div className="text-sm text-muted-foreground">
                  Showing 1 of 12 upcoming internships
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
