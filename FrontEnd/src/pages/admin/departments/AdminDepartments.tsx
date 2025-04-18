import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/main-layout";
import { NavLink } from "react-router-dom";

export default function AdminDepartments() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dummy data for departments
  const departments = [
    {
      id: "dep-001",
      name: "Computer Science",
      college: "College of Engineering",
      students: 45,
      supervisors: 8,
      internships: 38,
      status: "active",
    },
    {
      id: "dep-002",
      name: "Electrical Engineering",
      college: "College of Engineering",
      students: 35,
      supervisors: 6,
      internships: 30,
      status: "active",
    },
    {
      id: "dep-003",
      name: "Mechanical Engineering",
      college: "College of Engineering",
      students: 40,
      supervisors: 7,
      internships: 32,
      status: "active",
    },
    {
      id: "dep-004",
      name: "Marketing",
      college: "School of Business",
      students: 30,
      supervisors: 5,
      internships: 25,
      status: "active",
    },
    {
      id: "dep-005",
      name: "Finance",
      college: "School of Business",
      students: 25,
      supervisors: 4,
      internships: 20,
      status: "active",
    },
    {
      id: "dep-006",
      name: "Psychology",
      college: "College of Arts & Sciences",
      students: 15,
      supervisors: 3,
      internships: 12,
      status: "active",
    },
    {
      id: "dep-007",
      name: "Biology",
      college: "College of Arts & Sciences",
      students: 20,
      supervisors: 4,
      internships: 15,
      status: "active",
    },
    {
      id: "dep-008",
      name: "Medicine",
      college: "School of Medicine",
      students: 10,
      supervisors: 4,
      internships: 10,
      status: "active",
    },
    {
      id: "dep-009",
      name: "Law",
      college: "School of Law",
      students: 0,
      supervisors: 0,
      internships: 0,
      status: "inactive",
    },
  ];

  // Filter departments based on search query
  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      department.college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Departments</h1>
            <p className="text-muted-foreground">
              Manage all departments in the system
            </p>
          </div>
          <Button asChild>
            <NavLink to="/admin/departments/add">
              <Plus className="mr-2 h-4 w-4" /> Add Department
            </NavLink>
          </Button>
        </div>

        <Card className="">
          <CardHeader>
            <CardTitle>Department List</CardTitle>
            <CardDescription>
              View and manage all departments in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search departments..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {filteredDepartments.map((department) => (
                <div
                  key={department.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h2 className="text-lg font-semibold">{department.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {department.college}
                    </p>
                    <p className="text-sm">
                      Students: {department.students}, Supervisors:{" "}
                      {department.supervisors}, Internships:{" "}
                      {department.internships}
                    </p>
                    <p
                      className={`text-sm ${
                        department.status === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      Status: {department.status}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button asChild variant="outline" size="sm">
                      <NavLink to={`/admin/departments/edit/${department.id}`}>
                        Edit
                      </NavLink>
                    </Button>
                  </div>
                </div>
              ))}
              {filteredDepartments.length === 0 && (
                <p className="text-center text-muted-foreground">
                  No departments found.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
