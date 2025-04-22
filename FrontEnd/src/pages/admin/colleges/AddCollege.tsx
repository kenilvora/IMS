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
import MainLayout from "@/components/main-layout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { apiConnector } from "@/services/apiConnector";

export default function AddCollege() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await apiConnector(
        "POST",
        `${import.meta.env.VITE_API_URL}/college/addCollege`,
        data
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("College added successfully");
      navigate("/admin/colleges");
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
          <h1 className="text-2xl font-bold tracking-tight">Add College</h1>
          <p className="text-muted-foreground">
            Create a new college in the system
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="">
            <CardHeader>
              <CardTitle>College Information</CardTitle>
              <CardDescription>
                Enter the details for the new college
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">College Name*</Label>
                  <Input
                    id="name"
                    placeholder="e.g. College of Engineering"
                    required
                    {...register("name")}
                    type="text"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="code">College Code*</Label>
                  <Input
                    id="code"
                    placeholder="e.g. COE"
                    required
                    {...register("code")}
                    type="text"
                  />
                </div>
                <div className="space-y- md:col-span-2">
                  <Label htmlFor="dean">Dean</Label>
                  <Input
                    id="dean"
                    placeholder="e.g. Dr. Jane Smith"
                    {...register("dean")}
                    type="text"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. engineering@university.edu"
                    required
                    {...register("email")}
                  />
                </div>
                <div className="space-y-2  md:col-span-2">
                  <Label htmlFor="phone">Phone*</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g. +1 (555) 123-4567"
                    required
                    {...register("phone")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address*</Label>
                  <Input
                    id="address"
                    placeholder="e.g. 123 University Ave, College Town, CT 12345"
                    required
                    {...register("address")}
                    type="text"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="e.g. https://engineering.university.edu"
                    {...register("website")}
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
              <Button type="submit">Add College</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </MainLayout>
  );
}
