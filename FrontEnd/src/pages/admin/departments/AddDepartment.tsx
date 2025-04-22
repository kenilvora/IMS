import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MainLayout from "@/components/main-layout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { apiConnector } from "@/services/apiConnector";

type College = {
  id: string;
  name: string;
};

export default function AddDepartment() {
  const navigate = useNavigate();

  const [collegeId, setCollegeId] = useState("");

  const [colleges, setColleges] = useState<College[]>([]);

  const [loading, setLoading] = useState(true);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await apiConnector(
          "GET",
          `${import.meta.env.VITE_API_URL}/college/getCollegeList`
        );

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        setColleges(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch colleges");
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await apiConnector(
        "POST",
        `${import.meta.env.VITE_API_URL}/college/addDepartment/${collegeId}`,
        data
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      toast.success("Department added successfully");
      navigate("/admin/departments");
    } catch (error) {
      const errMsg = (error as any).response?.data?.message;
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <MainLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add Department</h1>
          <p className="text-muted-foreground">
            Create a new department in the system
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="">
            <CardHeader>
              <CardTitle>Department Information</CardTitle>
              <CardDescription>
                Enter the details for the new department
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">Department Name*</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Computer Science"
                    required
                    type="text"
                    {...register("name")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="code">Department Code*</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="e.g. CS"
                    required
                    {...register("code")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="college">College*</Label>
                  <Select
                    value={collegeId}
                    required
                    onValueChange={(value) => {
                      setCollegeId(value);
                    }}
                  >
                    <SelectTrigger id="college">
                      <SelectValue placeholder="Select college" />
                    </SelectTrigger>
                    <SelectContent>
                      {colleges.map((college) => (
                        <SelectItem
                          key={college.id}
                          value={college.id}
                          className="capitalize"
                        >
                          {college.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="head">Department Head</Label>
                  <Input
                    id="head"
                    type="text"
                    placeholder="e.g. Dr. John Smith"
                    {...register("head")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. cs@university.edu"
                    required
                    {...register("email")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone">Phone*</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g. +1 (555) 123-4567"
                    required
                    {...register("phone")}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Department</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </MainLayout>
  );
}
