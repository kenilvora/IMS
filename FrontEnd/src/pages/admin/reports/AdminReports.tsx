import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Printer } from "lucide-react";
import MainLayout from "@/components/main-layout";

export default function AdminReports() {
  const [reportType, setReportType] = useState("internships");
  const [timeframe, setTimeframe] = useState("yearly");

  // Dummy data for internships by college
  const internshipsByCollege = [
    { name: "Engineering", value: 38 },
    { name: "Business", value: 25 },
    { name: "Arts & Sciences", value: 12 },
    { name: "Medicine", value: 10 },
  ];

  // Dummy data for internships by month
  const internshipsByMonth = [
    { name: "Jan", count: 4 },
    { name: "Feb", count: 3 },
    { name: "Mar", count: 5 },
    { name: "Apr", count: 7 },
    { name: "May", count: 12 },
    { name: "Jun", count: 15 },
    { name: "Jul", count: 10 },
    { name: "Aug", count: 8 },
    { name: "Sep", count: 6 },
    { name: "Oct", count: 4 },
    { name: "Nov", count: 3 },
    { name: "Dec", count: 8 },
  ];

  // Dummy data for student participation
  const studentParticipation = [
    { name: "With Internships", value: 85 },
    { name: "Without Internships", value: 15 },
  ];

  // Dummy data for task completion
  const taskCompletion = [
    { name: "Completed", value: 78 },
    { name: "Pending", value: 22 },
  ];

  // Colors for pie charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const handleGenerateReport = () => {
    // In a real app, this would generate and download the report
    console.log(`Generating ${reportType} report for ${timeframe} timeframe`);
  };

  const handlePrintReport = () => {
    // In a real app, this would print the current report
    window.print();
  };

  return (
    <MainLayout role="admin">
      <div className="space-y-6 ">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Generate and view system reports
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handlePrintReport}>
              <Printer className="mr-2 h-4 w-4" /> Print Report
            </Button>
            <Button onClick={handleGenerateReport}>
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Report Type
            </label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internships">Internships Report</SelectItem>
                <SelectItem value="students">Students Report</SelectItem>
                <SelectItem value="supervisors">Supervisors Report</SelectItem>
                <SelectItem value="colleges">Colleges Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Timeframe</label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Internships by College</CardTitle>
                  <CardDescription>
                    Distribution of internships across colleges
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={internshipsByCollege}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {internshipsByCollege.map((_entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Internships by Month</CardTitle>
                  <CardDescription>
                    Monthly distribution of internships
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={internshipsByMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Internships" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Participation</CardTitle>
                  <CardDescription>
                    Percentage of students with internships
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={studentParticipation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        <Cell fill="#0088FE" />
                        <Cell fill="#FF8042" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Task Completion Rate</CardTitle>
                  <CardDescription>
                    Percentage of completed tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskCompletion}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        <Cell fill="#00C49F" />
                        <Cell fill="#FFBB28" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Reports</CardTitle>
                <CardDescription>
                  View and download detailed reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="font-medium">Internship Summary Report</p>
                        <p className="text-sm text-muted-foreground">
                          Detailed summary of all internships in the system
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </div>
                  <div className="border rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="font-medium">
                          Student Participation Report
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Detailed report on student participation in
                          internships
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </div>
                  <div className="border rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="font-medium">
                          Supervisor Activity Report
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Detailed report on supervisor activities and reviews
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </div>
                  <div className="border rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="font-medium">
                          College Performance Report
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Detailed report on college-wise internship performance
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Generate Custom Report</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Advanced analytics and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-4">
                      <p className="text-sm text-muted-foreground">
                        Total Internships
                      </p>
                      <p className="text-2xl font-bold">85</p>
                      <p className="text-xs text-green-600">
                        ↑ 12% from last year
                      </p>
                    </div>
                    <div className="border rounded-md p-4">
                      <p className="text-sm text-muted-foreground">
                        Average Duration
                      </p>
                      <p className="text-2xl font-bold">5.2 months</p>
                      <p className="text-xs text-green-600">
                        ↑ 0.3 months from last year
                      </p>
                    </div>
                    <div className="border rounded-md p-4">
                      <p className="text-sm text-muted-foreground">
                        Completion Rate
                      </p>
                      <p className="text-2xl font-bold">92%</p>
                      <p className="text-xs text-green-600">
                        ↑ 5% from last year
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Key Insights</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-green-500 h-2 w-2 mt-1.5" />
                        <span>
                          Engineering students have the highest internship
                          participation rate at 85%, followed by Business at
                          75%.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-green-500 h-2 w-2 mt-1.5" />
                        <span>
                          Summer months (May-August) account for 45% of all
                          internships throughout the year.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-green-500 h-2 w-2 mt-1.5" />
                        <span>
                          Students with at least one internship have a 35%
                          higher job placement rate after graduation.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-green-500 h-2 w-2 mt-1.5" />
                        <span>
                          The average task completion rate has improved by 8%
                          compared to the previous academic year.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Recommendations</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-blue-500 h-2 w-2 mt-1.5" />
                        <span>
                          Increase outreach to Arts & Sciences departments to
                          improve their internship participation rates.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-blue-500 h-2 w-2 mt-1.5" />
                        <span>
                          Develop more year-round internship opportunities to
                          reduce the seasonal concentration.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-blue-500 h-2 w-2 mt-1.5" />
                        <span>
                          Implement additional supervisor training to improve
                          task review turnaround time.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Export Analytics Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
