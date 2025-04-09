import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, Info, Upload } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function StudentReport() {
  return (
    <DashboardLayout userType="student" userName="Alex Johnson" userRole="Computer Science, Year 3">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Final Report</h1>
          <p className="text-muted-foreground">Prepare and submit your internship final report</p>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Important Information</AlertTitle>
          <AlertDescription>
            Your final report is due by August 15, 2023. Please ensure you follow the report guidelines and include all
            required sections.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Status</CardTitle>
                <CardDescription>Track your report completion progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Overall Completion</p>
                    <p className="text-sm font-medium">25%</p>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <p className="text-sm">Introduction</p>
                      </div>
                      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                        Completed
                      </Badge>
                    </div>
                    <Progress value={100} className="h-1.5" />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <p className="text-sm">Company Overview</p>
                      </div>
                      <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                        In Progress
                      </Badge>
                    </div>
                    <Progress value={60} className="h-1.5" />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <p className="text-sm">Project Details</p>
                      </div>
                      <Badge variant="outline">Not Started</Badge>
                    </div>
                    <Progress value={0} className="h-1.5" />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <p className="text-sm">Skills Developed</p>
                      </div>
                      <Badge variant="outline">Not Started</Badge>
                    </div>
                    <Progress value={0} className="h-1.5" />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <p className="text-sm">Challenges & Solutions</p>
                      </div>
                      <Badge variant="outline">Not Started</Badge>
                    </div>
                    <Progress value={0} className="h-1.5" />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <p className="text-sm">Conclusion</p>
                      </div>
                      <Badge variant="outline">Not Started</Badge>
                    </div>
                    <Progress value={0} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Draft Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Guidelines</CardTitle>
                <CardDescription>Follow these guidelines for your final report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Format Requirements</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>12-point Times New Roman or Arial font</li>
                    <li>1.5 line spacing</li>
                    <li>1-inch margins on all sides</li>
                    <li>Page numbers in the bottom right corner</li>
                    <li>PDF format for submission</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Required Sections</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Title Page (Name, ID, Company, Duration)</li>
                    <li>Table of Contents</li>
                    <li>Introduction (1-2 pages)</li>
                    <li>Company Overview (2-3 pages)</li>
                    <li>Project Details (4-5 pages)</li>
                    <li>Skills Developed (2-3 pages)</li>
                    <li>Challenges & Solutions (2-3 pages)</li>
                    <li>Conclusion (1-2 pages)</li>
                    <li>References</li>
                    <li>Appendices (if applicable)</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Evaluation Criteria</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Content quality and relevance (40%)</li>
                    <li>Structure and organization (20%)</li>
                    <li>Critical analysis and reflection (25%)</li>
                    <li>Writing quality and clarity (15%)</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2">
                  <FileText className="h-4 w-4" />
                  Download Full Guidelines
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submission Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 border border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
                  <FileText className="h-8 w-8 text-slate-400 mb-2" />
                  <p className="font-medium">No Report Submitted</p>
                  <p className="text-sm text-muted-foreground mt-1">Upload your report when ready</p>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">Due date: August 15, 2023</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  <Upload className="h-4 w-4" />
                  Submit Final Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supervisor Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 border border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
                  <p className="text-sm text-muted-foreground">No feedback available yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Feedback will appear here after report submission
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Report Template</p>
                      <p className="text-xs text-muted-foreground">DOCX • 245 KB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
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
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Sample Report</p>
                      <p className="text-xs text-muted-foreground">PDF • 1.2 MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
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
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Citation Guide</p>
                      <p className="text-xs text-muted-foreground">PDF • 520 KB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
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
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
