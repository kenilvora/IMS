import type React from "react";
import { useState } from "react";
import { CalendarIcon, Paperclip } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import MainLayout from "@/components/main-layout";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTask() {
  const navigate = useNavigate();
  const params = useParams();
  const taskId = params.id as string;

  // Dummy data for the task details
  const task = {
    id: "task-005",
    title: "Weekly Progress Report",
    description:
      "Submit a weekly progress report detailing tasks completed, challenges faced, and plans for the next week. The report should include a summary of your work, any blockers or issues you encountered, and your goals for the upcoming week. Please use the provided template and submit it by the end of the week.",
    internship: {
      id: "int-001",
      company: "TechCorp Inc.",
      position: "Frontend Developer Intern",
    },
    supervisor: "Dr. Sarah Johnson",
    dueDate: "2025-02-28",
    status: "pending",
    attachments: [
      {
        id: "att-001",
        name: "Progress Report Template.docx",
        size: "24 KB",
        type: "document",
      },
    ],
  };

  const [dueDate, setDueDate] = useState<Date>(new Date(task.dueDate));
  // @ts-ignore
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to the backend
    navigate(`/student/tasks/${taskId}`);
  };

  return (
    <MainLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Task</h1>
          <p className="text-muted-foreground">
            Update the details of your task
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Task Information</CardTitle>
              <CardDescription>
                Update the information about your task
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  placeholder="Enter task title"
                  defaultValue={task.title}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the task in detail..."
                  defaultValue={task.description}
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={(day) => day && setDueDate(day)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments</Label>
                <div className="mt-2 space-y-2">
                  {task.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center gap-2 p-2 rounded-md border border-gray-200 bg-gray-50"
                    >
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {attachment.size}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" type="button">
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <Input
                    id="attachments"
                    type="file"
                    onChange={(e) => setFiles(e.target.files)}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload additional files related to this task.
                  </p>
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
              <Button type="submit">Update Task</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </MainLayout>
  );
}
