import { useEffect, useState } from "react";
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
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { apiConnector } from "@/services/apiConnector";

type Department = {
  id: string;
  name: string;
  college: string;
  students: number;
  supervisors: number;
  internships: number;
};

export default function AdminDepartments() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dummy data for departments
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>(
    []
  );

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await apiConnector(
          "GET",
          `${import.meta.env.VITE_API_URL}/college/getFullDepartmentDetails`
        );

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        setDepartments(res.data.data);
        setFilteredDepartments(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch departments");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const filtered = departments.filter(
      (department) =>
        department.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        department.college.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredDepartments(filtered);
  }, [searchQuery]);

  return loading ? (
    <Spinner />
  ) : (
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
