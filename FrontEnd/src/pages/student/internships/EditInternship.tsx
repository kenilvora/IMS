import type React from "react";
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
import { useNavigate, useParams } from "react-router-dom";

export default function EditInternship() {
  const navigate = useNavigate();
  const params = useParams();
  const internshipId = params.id as string;

  // Dummy data for the internship details
  const internship = {
    id: "int-001",
    company: "TechCorp Inc.",
    position: "Frontend Developer Intern",
    department: "Engineering",
    supervisor: "Dr. Sarah Johnson",
    supervisorEmail: "sarah.johnson@techcorp.com",
    location: "San Francisco, CA",
    status: "ongoing",
    startDate: "2025-01-15",
    endDate: "2025-06-15",
    description:
      "Working on the frontend development team to build responsive and accessible user interfaces for the company's main product. Responsibilities include implementing UI components, fixing bugs, and collaborating with designers and backend developers.",
    skills: "React, TypeScript, CSS, Accessibility, Git, Agile methodologies",
  };

  const [startDate, setStartDate] = useState<Date>(
    new Date(internship.startDate)
  );
  const [endDate, setEndDate] = useState<Date>(new Date(internship.endDate));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to the backend
    navigate(`/student/internships/${internshipId}`);
  };

  return (
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
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    placeholder="e.g. TechCorp Inc."
                    defaultValue={internship.company}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    placeholder="e.g. Frontend Developer Intern"
                    defaultValue={internship.position}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supervisor">Supervisor Name</Label>
                  <Input
                    id="supervisor"
                    placeholder="e.g. Dr. Sarah Johnson"
                    defaultValue={internship.supervisor}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supervisor-email">Supervisor Email</Label>
                  <Input
                    id="supervisor-email"
                    type="email"
                    placeholder="e.g. sarah.johnson@company.com"
                    defaultValue={internship.supervisorEmail}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
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
                        onSelect={(date) => date && setStartDate(date)}
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
                        onSelect={(date) => date && setEndDate(date)}
                        initialFocus
                        disabled={(date) =>
                          startDate ? date < startDate : false
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g. San Francisco, CA"
                    defaultValue={internship.location}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select defaultValue={internship.department.toLowerCase()}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your internship role, responsibilities, and objectives..."
                  defaultValue={internship.description}
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Textarea
                  id="skills"
                  placeholder="List the skills you expect to develop during this internship..."
                  defaultValue={internship.skills}
                  rows={3}
                  required
                />
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
