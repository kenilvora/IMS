import { useState } from "react";
import { BookOpen, Eye, EyeOff } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { apiConnector } from "@/services/apiConnector";
import Spinner from "@/components/Spinner";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: any) => {
    console.log(data);
    setLoading(true);
    try {
      const res = await apiConnector(
        "POST",
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email: data.email,
          password: data.password,
        }
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      let role = res.data.role;

      toast.success("Login successful!");

      // Redirect based on role
      if (role === "Admin") {
        navigate("/admin", {
          replace: true,
        });
      } else if (role === "Student") {
        navigate("/student", {
          replace: true,
        });
      } else if (role === "Supervisor") {
        navigate("/supervisor", {
          replace: true,
        });
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-900">
              Internship Management System
            </h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Log in to your account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="student-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <NavLink
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </NavLink>
                </div>
                <Button type="submit" className="w-full">
                  Log in
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <NavLink
                to="/signup"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign up
              </NavLink>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
