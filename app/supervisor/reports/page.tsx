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
import { CheckCircle2, Download, FileText, Filter, Search } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function SupervisorReports() {
  return (
    <DashboardLayout userType="supervisor" userName="Dr. Sarah Williams" userRole="Computer Science Department">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reports Review</h1>
            <p className="text-muted-foreground">Review and provide feedback on student reports</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search reports..." className="w-full sm:w-[240px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
            <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
            <TabsTrigger value="all">All Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="grid divide-y">
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Final Internship Report</h3>
                          <Badge>Pending Review</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="David Wilson" />
                            <AvatarFallback className="text-xs">DW</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">David Wilson</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Submitted 1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">Review</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Review Final Report</DialogTitle>
                              <DialogDescription>Review and provide feedback on this report</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                              <div>
                                <div className="flex items-center justify-between">
                                  <h3 className="text-lg font-semibold">Final Internship Report</h3>
                                  <Badge>Pending Review</Badge>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src="/placeholder.svg?height=24&width=24" alt="David Wilson" />
                                    <AvatarFallback className="text-xs">DW</AvatarFallback>
                                  </Avatar>
                                  <p className="text-sm text-muted-foreground">David Wilson</p>
                                  <span className="text-sm text-muted-foreground">•</span>
                                  <p className="text-sm text-muted-foreground">Submitted 1 day ago</p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Report Summary</h4>
                                <div className="bg-slate-50 p-4 rounded-md text-sm">
                                  <p>
                                    This report details my internship experience at TechNova Solutions as a Junior
                                    Software Developer from May 15 to August 15, 2023. During this period, I worked on
                                    developing and maintaining web applications using modern technologies such as
                                    React.js, Node.js, and MongoDB.
                                  </p>
                                  <p className="mt-2">
                                    The report covers my learning journey, challenges faced, skills developed, and
                                    contributions to the company's projects. It also includes reflections on how this
                                    internship has prepared me for my future career in software development.
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Report Preview</h4>
                                <div className="border rounded-md h-[300px] flex items-center justify-center bg-white">
                                  <div className="text-center">
                                    <FileText className="h-12 w-12 text-slate-300 mx-auto mb-2" />
                                    <p className="text-sm text-muted-foreground">
                                      Preview not available. Please download the report to view.
                                    </p>
                                    <Button variant="outline" size="sm" className="mt-2 gap-1">
                                      <Download className="h-3.5 w-3.5" />
                                      Download Report
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                  <h4 className="text-sm font-medium">Evaluation Criteria</h4>
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm">Content Quality (40%)</p>
                                      <select className="text-sm border rounded-md h-8 px-2">
                                        <option>Select score</option>
                                        <option>Excellent (35-40)</option>
                                        <option>Good (30-34)</option>
                                        <option>Satisfactory (25-29)</option>
                                        <option>Needs Improvement (0-24)</option>
                                      </select>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm">Structure & Organization (20%)</p>
                                      <select className="text-sm border rounded-md h-8 px-2">
                                        <option>Select score</option>
                                        <option>Excellent (18-20)</option>
                                        <option>Good (15-17)</option>
                                        <option>Satisfactory (12-14)</option>
                                        <option>Needs Improvement (0-11)</option>
                                      </select>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm">Critical Analysis (25%)</p>
                                      <select className="text-sm border rounded-md h-8 px-2">
                                        <option>Select score</option>
                                        <option>Excellent (22-25)</option>
                                        <option>Good (19-21)</option>
                                        <option>Satisfactory (15-18)</option>
                                        <option>Needs Improvement (0-14)</option>
                                      </select>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm">Writing Quality (15%)</p>
                                      <select className="text-sm border rounded-md h-8 px-2">
                                        <option>Select score</option>
                                        <option>Excellent (13-15)</option>
                                        <option>Good (11-12)</option>
                                        <option>Satisfactory (9-10)</option>
                                        <option>Needs Improvement (0-8)</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <h4 className="text-sm font-medium">Overall Assessment</h4>
                                  <select className="w-full text-sm border rounded-md h-8 px-2">
                                    <option>Select grade</option>
                                    <option>A (90-100%)</option>
                                    <option>B (80-89%)</option>
                                    <option>C (70-79%)</option>
                                    <option>D (60-69%)</option>
                                    <option>F (Below 60%)</option>
                                  </select>
                                  <div className="pt-2">
                                    <h4 className="text-sm font-medium">Final Score</h4>
                                    <Input placeholder="0" type="number" min="0" max="100" />
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Detailed Feedback</h4>
                                <Textarea
                                  placeholder="Provide detailed feedback on this report..."
                                  className="min-h-[150px]"
                                />
                              </div>
                            </div>
                            <DialogFooter className="flex flex-col sm:flex-row gap-2">
                              <Button variant="outline" className="sm:w-auto w-full">
                                Save as Draft
                              </Button>
                              <Button className="sm:w-auto w-full gap-1">
                                <CheckCircle2 className="h-4 w-4" />
                                Submit Review
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Final internship report detailing experience, skills developed, and project contributions at
                        TechNova Solutions.
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Mid-term Progress Report</h3>
                          <Badge>Pending Review</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Emily Chen" />
                            <AvatarFallback className="text-xs">EC</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">Emily Chen</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Submitted 1 week ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Mid-term progress report outlining completed tasks, ongoing projects, and goals for the
                        remainder of the internship.
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Weekly Status Report</h3>
                          <Badge>Pending Review</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Alex Johnson" />
                            <AvatarFallback className="text-xs">AJ</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">Alex Johnson</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Submitted 2 weeks ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Weekly status report for Week 5 of internship, covering completed tasks, challenges, and plans
                        for the next week.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-4">
                <div className="text-sm text-muted-foreground">Showing 3 of 3 pending reports</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="reviewed" className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="grid divide-y">
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Final Internship Report</h3>
                          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                            Reviewed
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="James Wilson" />
                            <AvatarFallback className="text-xs">JW</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">James Wilson</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Reviewed 2 weeks ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                        <Button size="sm">View Feedback</Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Final internship report detailing experience at FinTech Solutions as a Data Analyst Intern.
                      </p>
                    </div>
                    <div className="mt-2 bg-slate-50 p-3 rounded-md">
                      <p className="text-sm font-medium">Your Feedback:</p>
                      <p className="text-sm mt-1">
                        Excellent report with comprehensive analysis and reflection. The report demonstrates a deep
                        understanding of the industry and the technical skills required. Grade: A (92%)
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Project Proposal</h3>
                          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                            Reviewed
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Michael Brown" />
                            <AvatarFallback className="text-xs">MB</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">Michael Brown</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Reviewed 3 weeks ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                        <Button size="sm">View Feedback</Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Project proposal for developing a customer analytics dashboard during the internship.
                      </p>
                    </div>
                    <div className="mt-2 bg-slate-50 p-3 rounded-md">
                      <p className="text-sm font-medium">Your Feedback:</p>
                      <p className="text-sm mt-1">
                        Well-structured proposal with clear objectives and timeline. The technical approach is sound,
                        but consider adding more details about the data sources and potential challenges. Grade: B+
                        (88%)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-4">
                <div className="text-sm text-muted-foreground">Showing 2 of 8 reviewed reports</div>
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
                  {/* Combined list of all reports would appear here */}
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Final Internship Report</h3>
                          <Badge>Pending Review</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="David Wilson" />
                            <AvatarFallback className="text-xs">DW</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">David Wilson</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Submitted 1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Final internship report detailing experience, skills developed, and project contributions at
                        TechNova Solutions.
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Final Internship Report</h3>
                          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                            Reviewed
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="James Wilson" />
                            <AvatarFallback className="text-xs">JW</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">James Wilson</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Reviewed 2 weeks ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                        <Button size="sm">View Feedback</Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Final internship report detailing experience at FinTech Solutions as a Data Analyst Intern.
                      </p>
                    </div>
                    <div className="mt-2 bg-slate-50 p-3 rounded-md">
                      <p className="text-sm font-medium">Your Feedback:</p>
                      <p className="text-sm mt-1">
                        Excellent report with comprehensive analysis and reflection. The report demonstrates a deep
                        understanding of the industry and the technical skills required. Grade: A (92%)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-4">
                <div className="text-sm text-muted-foreground">Showing 2 of 11 reports</div>
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
