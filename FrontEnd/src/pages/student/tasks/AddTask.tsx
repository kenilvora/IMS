import type React from "react";
import { useEffect, useState } from "react";
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
import { apiConnector } from "@/services/apiConnector";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";

type Internship = {
  id: string;
  company: string;
  position: string;
};

export default function AddTask() {
  const navigate = useNavigate();
  const [deadLine, setDeadLine] = useState<Date>();

  const [loading, setLoading] = useState(true);

  const [internships, setInternships] = useState<Internship[]>([]);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "",
    internshipId: "",
  });

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await apiConnector(
          "GET",
          `${import.meta.env.VITE_API_URL}/internship/getAllInternships`
        );

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        setInternships(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch internships");
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskData.internshipId) {
      toast.error("Please select an internship");
      return;
    }

    if (!deadLine) {
      toast.error("Please select a deadline");
      return;
    }

    if (!taskData.status) {
      toast.error("Please select a status");
      return;
    }

    setLoading(true);
    try {
      const res = await apiConnector(
        "POST",
        `${import.meta.env.VITE_API_URL}/internship/addTask/${
          taskData.internshipId
        }`,
        {
          ...taskData,
          deadline: deadLine,
        }
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      toast.success("Task added successfully");
      navigate("/student/tasks");
    } catch (error) {
      const errMsg = (error as any).response.data.message;
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
          <h1 className="text-2xl font-bold tracking-tight">Add Task</h1>
          <p className="text-muted-foreground">
            Enter the details of your new task
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Task Information</CardTitle>
              <CardDescription>
                Provide the basic information about your task
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="taskTitle">Task Title*</Label>
                <Input
                  id="taskTitle"
                  placeholder="e.g. Build a new feature"
                  required
                  value={taskData.title}
                  onChange={(e) => {
                    e.preventDefault();
                    setTaskData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taskDesc">Task Description*</Label>
                <Textarea
                  id="taskDesc"
                  placeholder="Describe the task in detail..."
                  rows={4}
                  required
                  value={taskData.description}
                  onChange={(e) => {
                    e.preventDefault();
                    setTaskData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="internshipDetail">Internship Details*</Label>
                <Select
                  required
                  value={taskData.internshipId}
                  onValueChange={(value) => {
                    setTaskData((prev) => ({
                      ...prev,
                      internshipId: value,
                    }));
                  }}
                >
                  <SelectTrigger id="internshipDetail">
                    <SelectValue placeholder="Select Internship" />
                  </SelectTrigger>
                  <SelectContent>
                    {internships.map((internship) => (
                      <SelectItem key={internship.id} value={internship.id}>
                        {`${internship.company} - ${internship.position}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>DeadLine*</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadLine ? format(deadLine, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={deadLine}
                      onSelect={setDeadLine}
                      required
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Task Status*</Label>
                <Select
                  required
                  value={taskData.status}
                  onValueChange={(value) => {
                    setTaskData((prev) => ({
                      ...prev,
                      status: value,
                    }));
                  }}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
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
              <Button type="submit">Add Task</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </MainLayout>
  );
}
