import type React from "react";
import { useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Clock,
  GraduationCap,
  MessageSquare,
  Paperclip,
  Send,
  ThumbsDown,
  ThumbsUp,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MainLayout from "@/components/main-layout";
import { NavLink, useNavigate } from "react-router-dom";

export default function SupervisorTaskReview() {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Dummy data for the task details
  const task = {
    id: "task-005",
    title: "Weekly Progress Report",
    description:
      "Submit a weekly progress report detailing tasks completed, challenges faced, and plans for the next week. The report should include a summary of your work, any blockers or issues you encountered, and your goals for the upcoming week. Please use the provided template and submit it by the end of the week.",
    student: {
      id: "user-001",
      name: "John Doe",
      email: "john.doe@university.edu",
      department: "Computer Science",
    },
    internship: {
      id: "int-001",
      company: "TechCorp Inc.",
      position: "Frontend Developer Intern",
    },
    dueDate: "2025-02-28",
    status: "pending",
    attachments: [
      {
        id: "att-001",
        name: "Progress Report Template.docx",
        size: "24 KB",
        type: "document",
      },
      {
        id: "att-002",
        name: "Weekly_Report_Week5.pdf",
        size: "1.2 MB",
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
      {
        id: "com-002",
        author: "John Doe",
        role: "student",
        date: "2025-02-22",
        text: "Thank you for the feedback. I've updated the report to include screenshots and added more details about the challenges I faced.",
      },
    ],
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the comment to the backend
    setComment("");
  };

  const handleApproveTask = () => {
    // In a real app, this would update the task status in the backend
    setIsApproveDialogOpen(false);
    navigate("/supervisor/tasks");
  };

  const handleRejectTask = () => {
    // In a real app, this would update the task status in the backend
    setIsRejectDialogOpen(false);
    navigate("/supervisor/tasks");
  };

  return (
    <MainLayout role="supervisor">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <NavLink to="/supervisor/tasks">
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
            <Dialog
              open={isApproveDialogOpen}
              onOpenChange={setIsApproveDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <ThumbsUp className="mr-2 h-4 w-4" /> Approve Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Approve Task</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to approve this task? This will mark
                    the task as completed.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsApproveDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleApproveTask}>Approve</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isRejectDialogOpen}
              onOpenChange={setIsRejectDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline">
                  <ThumbsDown className="mr-2 h-4 w-4" /> Request Revisions
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request Revisions</DialogTitle>
                  <DialogDescription>
                    Please provide feedback on what needs to be revised in this
                    task.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Textarea
                    placeholder="Enter your feedback here..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={5}
                  />
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsRejectDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleRejectTask}
                    disabled={!rejectionReason.trim()}
                  >
                    Send Feedback
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                  Discuss this task with the student
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
                <CardTitle>Student Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={`/placeholder.svg?height=80&width=80`} />
                    <AvatarFallback>
                      {task.student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{task.student.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {task.student.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Department</div>
                      <div className="text-sm text-muted-foreground">
                        {task.student.department}
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
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <NavLink to={`/supervisor/students/${task.student.id}`}>
                    View Student Profile
                  </NavLink>
                </Button>
              </CardFooter>
            </Card>

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
                  <NavLink to={`/supervisor/internships/${task.internship.id}`}>
                    View Internship
                  </NavLink>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <NavLink to="/supervisor/tasks">View All Tasks</NavLink>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
