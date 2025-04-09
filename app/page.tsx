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
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 p-4 md:p-8">
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Internship Management System
            </h1>
            <p className="mt-2 text-slate-600">
              Streamline your institution's internship processes
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-slate-800">Track Progress</h3>
                <p className="text-sm text-slate-600">
                  Monitor internship progress in real-time
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-slate-800">Manage Students</h3>
                <p className="text-sm text-slate-600">
                  Easily assign and monitor student internships
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-slate-800">Generate Reports</h3>
                <p className="text-sm text-slate-600">
                  Create detailed analytics and reports
                </p>
              </div>
            </div>
          </div>
        </div>

        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Access your internship management dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m.smith@university.edu"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full grid grid-cols-3 gap-2">
              <Link href="/student/dashboard" className="col-span-1">
                <Button variant="outline" className="w-full">
                  Student
                </Button>
              </Link>
              <Link href="/supervisor/dashboard" className="col-span-1">
                <Button variant="outline" className="w-full">
                  Supervisor
                </Button>
              </Link>
              <Link href="/admin/dashboard" className="col-span-1">
                <Button variant="outline" className="w-full">
                  Admin
                </Button>
              </Link>
            </div>
            <Button className="w-full">Login</Button>
            <p className="text-sm text-center text-slate-500">
              Forgot your password?{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Reset it here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
