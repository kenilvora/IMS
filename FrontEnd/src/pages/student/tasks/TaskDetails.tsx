import type React from "react";
import { useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  FileEdit,
  MessageSquare,
  Paperclip,
  Send,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import MainLayout from "@/components/main-layout";
import { NavLink, useNavigate, useParams } from "react-router-dom";

export default function TaskDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const taskId = params.id as string;
  const [comment, setComment] = useState("");

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
    comments: [
      {
        id: "com-001",
        author: "Dr. Sarah Johnson",
        role: "supervisor",
        date: "2025-02-21",
        text: "Please make sure to include screenshots of your work in the report. Also, focus on the challenges you faced and how you overcame them.",
      },
    ],
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the comment to the backend
    setComment("");
  };

  const handleMarkAsComplete = () => {
    // In a real app, this would update the task status in the backend
    navigate(`/student/internships/${task.internship.id}`);
  };

  return (
    <MainLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <NavLink to={`/student/internships/${task.internship.id}`}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </NavLink>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {task.title}
              </h1>
              <p className="text-muted-foreground">
                {task.internship.position} at {task.internship.company}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {task.status === "pending" && (
              <>
                <Button variant="outline" asChild>
                  <NavLink to={`/student/tasks/${taskId}/edit`}>
                    <FileEdit className="mr-2 h-4 w-4" /> Edit Task
                  </NavLink>
                </Button>
                <Button onClick={handleMarkAsComplete}>
                  <CheckCircle className="mr-2 h-4 w-4" /> Mark as Complete
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Description</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {task.description}
                    </p>
                  </div>
                  {task.attachments.length > 0 && (
                    <div>
                      <h3 className="font-medium">Attachments</h3>
                      <div className="mt-2 space-y-2">
                        {task.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center gap-2 p-2 rounded-md border border-gray-200 bg-gray-50"
                          >
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                {attachment.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {attachment.size}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
                <CardDescription>
                  Discuss this task with your supervisor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {task.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar>
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40`}
                        />
                        <AvatarFallback>
                          {comment.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {comment.role === "supervisor"
                              ? "Supervisor"
                              : "Student"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <form
                  onSubmit={handleSubmitComment}
                  className="w-full space-y-4"
                >
                  <Textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={!comment.trim()}>
                      <Send className="mr-2 h-4 w-4" /> Send Comment
                    </Button>
                  </div>
                </form>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Status</div>
                      <div
                        className={`text-sm ${
                          task.status === "pending"
                            ? "text-blue-600"
                            : "text-green-600"
                        }`}
                      >
                        {task.status === "pending" ? "Pending" : "Completed"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Due Date</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Internship</div>
                      <div className="text-sm text-muted-foreground">
                        {task.internship.company}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Supervisor</div>
                      <div className="text-sm text-muted-foreground">
                        {task.supervisor}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Comments</div>
                      <div className="text-sm text-muted-foreground">
                        {task.comments.length}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" asChild>
                  <NavLink to={`/student/tasks/${taskId}/submit`}>
                    Submit Task
                  </NavLink>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <NavLink to={`/student/internships/${task.internship.id}`}>
                    View Internship
                  </NavLink>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
