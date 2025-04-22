import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import MainLayout from "@/components/main-layout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { apiConnector } from "@/services/apiConnector";

export default function AddInternship() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  const submitHandler = async (data: any) => {
    setLoading(true);
    try {
      if (!department || department === "") {
        toast.error("Please select a department");
        return;
      }
      if (!startDate) {
        toast.error("Please select a start date");
        return;
      }
      if (!endDate) {
        toast.error("Please select an end date");
        return;
      }

      const bodyData = {
        companyName: data.companyName,
        companyEmail: data.companyEmail,
        position: data.position,
        description: data.description,
        supervisorName: data.supervisorName,
        supervisorEmail: data.supervisorEmail,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        department: department,
        skills: data.skills,
        status: status,
      };

      const res = await apiConnector(
        "POST",
        `${import.meta.env.VITE_API_URL}/internship/addInternship`,
        bodyData
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Internship added successfully");
      navigate("/student/internships");
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
    <MainLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add Internship</h1>
          <p className="text-muted-foreground">
            Enter the details of your new internship
          </p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)}>
          <Card>
            <CardHeader>
              <CardTitle>Internship Information</CardTitle>
              <CardDescription>
                Provide the basic information about your internship
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name*</Label>
                  <Input
                    id="companyName"
                    placeholder="e.g. TechCorp Inc."
                    required
                    {...register("companyName")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">Company Email</Label>
                  <Input
                    id="companyEmail"
                    placeholder="e.g. info@gmail.com"
                    {...register("companyEmail")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position*</Label>
                  <Input
                    id="position"
                    placeholder="e.g. Frontend Developer Intern"
                    required
                    {...register("position")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department*</Label>
                  <Select
                    required
                    value={department}
                    onValueChange={(value) => {
                      setDepartment(value);
                    }}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="HR">Human Resources</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supervisor">Supervisor Name*</Label>
                  <Input
                    id="supervisor"
                    placeholder="e.g. Dr. Sarah Johnson"
                    required
                    {...register("supervisorName")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supervisor-email">Supervisor Email*</Label>
                  <Input
                    id="supervisor-email"
                    type="email"
                    placeholder="e.g. sarah.johnson@company.com"
                    required
                    {...register("supervisorEmail")}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date*</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        disabled={(date) =>
                          startDate ? date < startDate : false
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your internship role, responsibilities, and objectives..."
                  rows={5}
                  required
                  {...register("description")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills*</Label>
                <Textarea
                  id="skills"
                  placeholder="List the skills you expect to develop during this internship..."
                  rows={3}
                  required
                  {...register("skills")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status of the Internship</Label>
                <Select
                  required
                  value={status}
                  onValueChange={(value) => {
                    setStatus(value);
                  }}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OnGoing">On Going</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
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
              <Button type="submit">Add Internship</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </MainLayout>
  );
}
