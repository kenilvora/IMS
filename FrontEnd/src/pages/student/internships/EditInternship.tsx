import { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
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
import { useNavigate, useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import toast from "react-hot-toast";
import { apiConnector } from "@/services/apiConnector";
import Spinner from "@/components/Spinner";

type Internship = {
  companyName: string;
  companyEmail: string;
  position: string;
  description: string;
  supervisorName: string;
  supervisorEmail: string;
  startDate: Date;
  endDate: Date;
  department: string;
  skills: string;
  status: "OnGoing" | "Completed";
};

export default function EditInternship() {
  const navigate = useNavigate();
  const params = useParams();
  const internshipId = params.id as string;

  const [internship, setInternship] = useState<Internship>({} as Internship);
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  useEffect(() => {
    const fetchInternship = async () => {
      setLoading(true);
      try {
        const res = await apiConnector(
          "GET",
          `${
            import.meta.env.VITE_API_URL
          }/internship/getInternshipById/${internshipId}`
        );

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        setInternship(res.data.internship);
        setStartDate(new Date(res.data.internship.startDate));
        setEndDate(new Date(res.data.internship.endDate));
      } catch (error) {
        toast.error("Failed to fetch internship data");
      } finally {
        setLoading(false);
      }
    };
    fetchInternship();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiConnector(
        "PUT",
        `${
          import.meta.env.VITE_API_URL
        }/internship/updateInternship/${internshipId}`,
        {
          ...internship,
          startDate: startDate,
          endDate: endDate,
        }
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Internship updated successfully");
      navigate(-1);
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
          <h1 className="text-2xl font-bold tracking-tight">Edit Internship</h1>
          <p className="text-muted-foreground">
            Update the details of your internship
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Internship Information</CardTitle>
              <CardDescription>
                Update the information about your internship
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
                    value={internship.companyName}
                    onChange={(e) => {
                      setInternship({
                        ...internship,
                        companyName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">Company Email</Label>
                  <Input
                    id="companyEmail"
                    placeholder="e.g. info@gmail.com"
                    value={internship.companyEmail}
                    onChange={(e) => {
                      setInternship({
                        ...internship,
                        companyEmail: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position*</Label>
                  <Input
                    id="position"
                    placeholder="e.g. Frontend Developer Intern"
                    required
                    value={internship.position}
                    onChange={(e) => {
                      setInternship({
                        ...internship,
                        position: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department*</Label>
                  <Select
                    required
                    value={internship.department}
                    onValueChange={(value) => {
                      setInternship({
                        ...internship,
                        department: value,
                      });
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
                    value={internship.supervisorName}
                    onChange={(e) => {
                      setInternship({
                        ...internship,
                        supervisorName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supervisor-email">Supervisor Email*</Label>
                  <Input
                    id="supervisor-email"
                    type="email"
                    placeholder="e.g. sarah.johnson@company.com"
                    required
                    value={internship.supervisorEmail}
                    onChange={(e) => {
                      setInternship({
                        ...internship,
                        supervisorEmail: e.target.value,
                      });
                    }}
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
                  value={internship.description}
                  onChange={(e) => {
                    setInternship({
                      ...internship,
                      description: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills*</Label>
                <Textarea
                  id="skills"
                  placeholder="List the skills you expect to develop during this internship..."
                  rows={3}
                  required
                  value={internship.skills}
                  onChange={(e) => {
                    setInternship({
                      ...internship,
                      skills: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status of the Internship</Label>
                <Select
                  required
                  value={internship.status}
                  onValueChange={(value) => {
                    setInternship({
                      ...internship,
                      status: value as "OnGoing" | "Completed",
                    });
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
              <Button type="submit">Update Internship</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </MainLayout>
  );
}
