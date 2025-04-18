import { useState } from "react";
import {
  ArrowUpDown,
  Building,
  CheckCircle,
  Layers,
  Plus,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MainLayout from "@/components/main-layout";
import { NavLink } from "react-router-dom";

export default function AdminColleges() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dummy data for colleges
  const colleges = [
    {
      id: "col-001",
      name: "College of Engineering",
      departments: 5,
      students: 45,
      supervisors: 8,
      internships: 38,
      status: "active",
    },
    {
      id: "col-002",
      name: "School of Business",
      departments: 4,
      students: 30,
      supervisors: 5,
      internships: 25,
      status: "active",
    },
    {
      id: "col-003",
      name: "College of Arts & Sciences",
      departments: 8,
      students: 15,
      supervisors: 3,
      internships: 12,
      status: "active",
    },
    {
      id: "col-004",
      name: "School of Medicine",
      departments: 3,
      students: 10,
      supervisors: 4,
      internships: 10,
      status: "active",
    },
    {
      id: "col-005",
      name: "School of Law",
      departments: 2,
      students: 0,
      supervisors: 0,
      internships: 0,
      status: "inactive",
    },
  ];

  // Filter colleges based on search query
  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleDeleteClick = (collegeId: string) => {
  //   setCollegeToDelete(collegeId);
  //   setIsDeleteDialogOpen(true);
  // };

  // const handleDeleteConfirm = () => {
  //   // In a real app, this would delete the college from the backend
  //   setIsDeleteDialogOpen(false);
  //   setCollegeToDelete(null);
  // };

  return (
    <MainLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Colleges</h1>
            <p className="text-muted-foreground">
              Manage all colleges in the system
            </p>
          </div>
          <Button asChild>
            <NavLink to="/admin/colleges/add">
              <Plus className="mr-2 h-4 w-4" /> Add College
            </NavLink>
          </Button>
        </div>

        <Card className="">
          <CardHeader>
            <CardTitle>College List</CardTitle>
            <CardDescription>
              View and manage all colleges in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search colleges..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className="flex items-center">
                        College Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Departments</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Supervisors</TableHead>
                    <TableHead>Internships</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredColleges.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No colleges found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredColleges.map((college) => (
                      <TableRow key={college.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-blue-600" />
                            <div className="font-medium">{college.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Layers className="h-4 w-4 text-muted-foreground" />
                            {college.departments}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {college.students}
                          </div>
                        </TableCell>
                        <TableCell>{college.supervisors}</TableCell>
                        <TableCell>{college.internships}</TableCell>
                        <TableCell>
                          {college.status === "active" ? (
                            <div className="flex items-center text-sm text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full w-fit">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Active
                            </div>
                          ) : (
                            <div className="flex items-center text-sm text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full w-fit">
                              <XCircle className="mr-1 h-3 w-3" />
                              Inactive
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
