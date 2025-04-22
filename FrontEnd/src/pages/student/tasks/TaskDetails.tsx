import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  FileEdit,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/main-layout";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { apiConnector } from "@/services/apiConnector";

type Task = {
  id: string;
  title: string;
  description: string;
  internship: {
    id: string;
    company: string;
    position: string;
  };
  supervisor: string;
  dueDate: string;
  status: "Pending" | "Completed";
  attachments: Array<{
    name: string;
    url: string;
  }>;
  comments: Array<{
    author: string;
    role: "Supervisor" | "Student";
    date: string;
    text: string;
  }>;
};

export default function TaskDetails() {
  const params = useParams();
  const internshipId = params.internshipId as string;
  const taskId = params.taskId as string;
  const navigate = useNavigate();
  // const [comment, setComment] = useState("");

  const [task, setTask] = useState<Task>({} as Task);
  const [loading, setLoading] = useState(true);

  const fetchTaskDetails = async () => {
    setLoading(true);
    try {
      const res = await apiConnector(
        "GET",
        `${
          import.meta.env.VITE_API_URL
        }/internship/getTask/${internshipId}/${taskId}`
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      setTask(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch task details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  const handleMarkAsComplete = async () => {
    setLoading(true);
    try {
      const res = await apiConnector(
        "PUT",
        `${
          import.meta.env.VITE_API_URL
        }/internship/updateTask/${internshipId}/${taskId}`,
        {
          status: "Completed",
        }
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Task marked as complete");
      fetchTaskDetails();
    } catch (error) {
      toast.error("Failed to fetch task details");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <MainLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <button onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </button>
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
            {task.status === "Pending" && (
              <>
                <Button variant="outline" asChild>
                  <NavLink to={`/student/tasks/edit/${internshipId}/${taskId}`}>
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
                  {/* {task.attachments.length > 0 && (
                    <div>
                      <h3 className="font-medium">Attachments</h3>
                      <div className="mt-2 space-y-2">
                        {task.attachments.map((attachment, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-2 rounded-md border border-gray-200 bg-gray-50"
                          >
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                {attachment.name}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )} */}
                </div>
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
                <CardDescription>
                  Discuss this task with your college faculty.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {task.comments.map((comment, i) => (
                    <div key={i} className="flex gap-4">
                      <Avatar>
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40`}
                        />
                        <AvatarFallback>
                          {comment.author}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {comment.role}
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
            </Card> */}
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
                          task.status === "Pending"
                            ? "text-blue-600"
                            : "text-green-600"
                        }`}
                      >
                        {task.status === "Pending" ? "Pending" : "Completed"}
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
                </div>
              </CardContent>
            </Card>

            {/* <Card>
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
            </Card> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
