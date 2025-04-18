import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  School,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-blue-900">
            Internship Management System
          </h1>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <NavLink to="/login">Login</NavLink>
          </Button>
          <Button asChild variant="default">
            <NavLink to="/signup">Sign Up</NavLink>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Streamline Your Internship Management
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A comprehensive platform for educational institutions to manage
            student internships efficiently.
          </p>
          <Button size="lg" asChild>
            <NavLink to="/signup">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </NavLink>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <GraduationCap className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>For Students</CardTitle>
              <CardDescription>
                Manage your internships and track your progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Add and update internship details</li>
                <li>• Track tasks and deadlines</li>
                <li>• Communicate with supervisors</li>
                <li>• Maintain your profile</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <NavLink to="/login?role=student">Student Login</NavLink>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>For Supervisors</CardTitle>
              <CardDescription>
                Monitor and guide student internships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• View supervised internships</li>
                <li>• Comment on student tasks</li>
                <li>• Track student progress</li>
                <li>• Provide guidance and feedback</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <NavLink to="/login?role=supervisor">Supervisor Login</NavLink>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <School className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>For Administrators</CardTitle>
              <CardDescription>
                Manage the entire internship ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Oversee all users and internships</li>
                <li>• Manage colleges and departments</li>
                <li>• Access comprehensive statistics</li>
                <li>• Configure system settings</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <NavLink to="/login?role=admin">Admin Login</NavLink>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of educational institutions already using our
            platform.
          </p>
          <Button size="lg" asChild>
            <NavLink to="/signup">Create an Account</NavLink>
          </Button>
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 Internship Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
