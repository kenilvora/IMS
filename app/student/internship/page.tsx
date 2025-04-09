import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building, Download, FileText, MapPin, Phone, Upload } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function InternshipDetails() {
  return (
    <DashboardLayout userType="student" userName="Alex Johnson" userRole="Computer Science, Year 3">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Internship Details</h1>
          <p className="text-muted-foreground">Complete information about your current internship</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>TechNova Solutions</CardTitle>
                    <CardDescription>Junior Software Developer</CardDescription>
                  </div>
                  <Badge>Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium">Duration</h3>
                    <p>May 15, 2023 - August 15, 2023 (90 days)</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Status</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={53} className="h-2" />
                      <span className="text-sm">53%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Description</h3>
                  <p className="mt-1 text-sm">
                    As a Junior Software Developer intern at TechNova Solutions, you will be working with the
                    development team on building and maintaining web applications. You will gain hands-on experience
                    with modern web technologies, agile development practices, and professional software engineering
                    workflows.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium">Company Supervisor</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="James Peterson" />
                        <AvatarFallback>JP</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Mr. James Peterson</p>
                        <p className="text-xs text-muted-foreground">Senior Developer</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">University Supervisor</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah Williams" />
                        <AvatarFallback>SW</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Dr. Sarah Williams</p>
                        <p className="text-xs text-muted-foreground">Computer Science Department</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Skills Being Developed</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">React.js</Badge>
                    <Badge variant="secondary">Node.js</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">MongoDB</Badge>
                    <Badge variant="secondary">Git</Badge>
                    <Badge variant="secondary">Agile</Badge>
                    <Badge variant="secondary">UI/UX</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Tracker</CardTitle>
                <CardDescription>Track your internship milestones and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Orientation & Onboarding</h3>
                      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                        Completed
                      </Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Initial Project Setup</h3>
                      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                        Completed
                      </Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Core Feature Development</h3>
                      <Badge variant="outline">In Progress</Badge>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Testing & Documentation</h3>
                      <Badge variant="outline">Not Started</Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Final Presentation</h3>
                      <Badge variant="outline">Not Started</Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Important files related to your internship</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Internship Agreement</p>
                        <p className="text-xs text-muted-foreground">PDF • 2.4 MB • Uploaded May 10, 2023</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Weekly Report Template</p>
                        <p className="text-xs text-muted-foreground">DOCX • 1.1 MB • Uploaded May 15, 2023</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Project Specifications</p>
                        <p className="text-xs text-muted-foreground">PDF • 3.7 MB • Uploaded May 20, 2023</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full gap-2">
                      <Upload className="h-4 w-4" />
                      Upload New Document
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-md">
                    <Building className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">TechNova Solutions</p>
                    <p className="text-xs text-muted-foreground">Software Development</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm">123 Tech Park, Innovation Street, San Francisco, CA 94103</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">(555) 123-4567</p>
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
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <p className="text-sm">info@technova.example</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    Visit Company Website
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certificate Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 border border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
                  <FileText className="h-8 w-8 text-slate-400 mb-2" />
                  <p className="font-medium">Certificate Not Available</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Will be issued upon successful completion of internship
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">Estimated availability: August 20, 2023</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Monday</p>
                    <p className="text-sm font-medium">9:00 AM - 5:00 PM</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Tuesday</p>
                    <p className="text-sm font-medium">9:00 AM - 5:00 PM</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Wednesday</p>
                    <p className="text-sm font-medium">9:00 AM - 5:00 PM</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Thursday</p>
                    <p className="text-sm font-medium">9:00 AM - 5:00 PM</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Friday</p>
                    <p className="text-sm font-medium">9:00 AM - 1:00 PM</p>
                  </div>
                  <div className="pt-2 border-t mt-2">
                    <p className="text-sm font-medium">Total: 36 hours/week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
