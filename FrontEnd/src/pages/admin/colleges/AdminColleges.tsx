import { useEffect, useState } from "react";
import { Building, Layers, Plus, Search, Users } from "lucide-react";
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
import toast from "react-hot-toast";
import { apiConnector } from "@/services/apiConnector";
import Spinner from "@/components/Spinner";

type College = {
  id: string;
  name: string;
  departments: number;
  students: number;
  supervisors: number;
  internships: number;
};

export default function AdminColleges() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dummy data for colleges
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter colleges based on search query
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const res = await apiConnector(
          "GET",
          `${import.meta.env.VITE_API_URL}/college/getFullCollegeDetails`
        );

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        setColleges(res.data.data);
        setFilteredColleges(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch colleges");
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  useEffect(() => {
    const filtered = colleges.filter((college) =>
      college.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredColleges(filtered);
  }, [searchQuery]);

  return loading ? (
    <Spinner />
  ) : (
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

            <div className="rounded-md border max-h-[calc(100vh-340px)] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>College Name</TableHead>
                    <TableHead>Departments</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Supervisors</TableHead>
                    <TableHead>Total Internships</TableHead>
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
