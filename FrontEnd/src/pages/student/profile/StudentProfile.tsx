import type React from "react";
import { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainLayout from "@/components/main-layout";
import Cookies from "js-cookie";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { apiConnector } from "@/services/apiConnector";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

type Profie = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  college: string;
  department: string;
  enrollmentNumber: string;
  year: string;
  semester: string;
  bio: string;
  skills: string;
  interests: string;
  address: string;
  image: string;
};

type User = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  college: {
    _id: string;
    name: string;
  };
  department: {
    _id: string;
    name: string;
  };
  currentSemester: string;
  currentYear: string;
  image: string;
  enrollmentNumber: string;
  year: string;
  semester: string;
  bio: string;
  skills: string;
  interests: string;
  address: string;
  _id: string;
  role: string;
};

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState("personal");

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { register, handleSubmit } = useForm();

  const user: User | null = Cookies.get("user")
    ? JSON.parse(Cookies.get("user")!)
    : null;

  const [profile, setProfile] = useState<Profie>({} as Profie);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setProfile({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        contactNumber: user?.contactNumber || "",
        college: user?.college.name || "",
        department: user?.department.name || "",
        enrollmentNumber: user?.enrollmentNumber || "",
        year: user?.currentYear || "",
        semester: user?.currentSemester || "",
        bio: user?.bio || "",
        skills: user?.skills || "",
        interests: user?.interests || "",
        address: user?.address || "",
        image: user?.image!,
      });
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        contactNumber: profile.contactNumber,
        bio: profile.bio,
        skills: profile.skills,
        interests: profile.interests,
        address: profile.address,
      };

      const res = await apiConnector(
        "PUT",
        `${import.meta.env.VITE_API_URL}/auth/update`,
        data
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      const updatedUser = res.data.data;

      setProfile((prev) => ({
        ...prev,
        image: updatedUser.image,
      }));

      Cookies.set("user", JSON.stringify(updatedUser), {
        expires: 7,
        secure: true,
        sameSite: "lax",
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAcademicUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const data = {
        year: profile.year,
        semester: profile.semester,
      };

      const res = await apiConnector(
        "PUT",
        `${import.meta.env.VITE_API_URL}/auth/update`,
        data
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      const updatedUser = res.data.data;

      Cookies.set("user", JSON.stringify(updatedUser), {
        expires: 7,
        secure: true,
        sameSite: "lax",
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (data: any) => {
    setLoading(true);
    try {
      const res = await apiConnector(
        "PUT",
        `${import.meta.env.VITE_API_URL}/auth/changePassword`,
        {
          oldPassword: data["current-password"],
          newPassword: data["new-password"],
          confirmPassword: data["confirm-password"],
        }
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Password updated successfully");
    } catch (error) {
      const errMsg =
        (error as any).response?.data?.message || "Error updating password";
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
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and settings
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <Card className="md:w-80 h-fit">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={user?.image}
                    alt={`${user?.firstName} ${user?.lastName}`}
                  />
                  <AvatarFallback>
                    {user?.firstName.charAt(0)}
                    {user?.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <div className="w-full text-center">
                  <p className="text-sm font-medium">{user?.department.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.college.name}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      id="personal-form"
                      className="space-y-6"
                      onSubmit={handleProfileUpdate}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            defaultValue={profile.firstName}
                            required
                            onChange={(e) => {
                              e.preventDefault();
                              setProfile((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                              }));
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            defaultValue={profile.lastName}
                            required
                            onChange={(e) => {
                              e.preventDefault();
                              setProfile((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                              }));
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue={profile.email}
                            required
                            onChange={(e) => {
                              e.preventDefault();
                              setProfile((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }));
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactNumber">Phone</Label>
                          <Input
                            id="contactNumber"
                            type="tel"
                            defaultValue={profile.contactNumber}
                            required
                            onChange={(e) => {
                              e.preventDefault();
                              setProfile((prev) => ({
                                ...prev,
                                contactNumber: e.target.value,
                              }));
                            }}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            defaultValue={profile.address}
                            onChange={(e) => {
                              e.preventDefault();
                              setProfile((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }));
                            }}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            rows={4}
                            defaultValue={profile.bio}
                            onChange={(e) => {
                              e.preventDefault();
                              setProfile((prev) => ({
                                ...prev,
                                bio: e.target.value,
                              }));
                            }}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="skills">Skills</Label>
                          <Textarea
                            id="skills"
                            rows={3}
                            defaultValue={profile.skills}
                            onChange={(e) => {
                              e.preventDefault();
                              setProfile((prev) => ({
                                ...prev,
                                skills: e.target.value,
                              }));
                            }}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="interests">Interests</Label>
                          <Textarea
                            id="interests"
                            rows={3}
                            defaultValue={profile.interests}
                            onChange={(e) => {
                              e.preventDefault();
                              setProfile((prev) => ({
                                ...prev,
                                interests: e.target.value,
                              }));
                            }}
                          />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" form="personal-form">
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="academic" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Information</CardTitle>
                    <CardDescription>
                      Update your academic details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      id="academic-form"
                      className="space-y-6"
                      onSubmit={handleAcademicUpdate}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="enrollmentNumber">
                            Enrollment Number
                          </Label>
                          <Input
                            id="enrollmentNumber"
                            defaultValue={profile.enrollmentNumber}
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="year">Year</Label>
                          <Select
                            value={profile.year || ""}
                            onValueChange={(value) => {
                              setProfile((prev) => ({
                                ...prev,
                                year: value,
                              }));
                            }}
                          >
                            <SelectTrigger id="year">
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1st-Year">1st Year</SelectItem>
                              <SelectItem value="2nd-Year">2nd Year</SelectItem>
                              <SelectItem value="3rd-Year">3rd Year</SelectItem>
                              <SelectItem value="4th-Year">4th Year</SelectItem>
                              <SelectItem value="5th-Year">5th Year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="semester">Semester</Label>
                          <Select
                            value={profile.semester || ""}
                            onValueChange={(value) => {
                              setProfile((prev) => ({
                                ...prev,
                                semester: value,
                              }));
                            }}
                          >
                            <SelectTrigger id="semester">
                              <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                              {profile.year === "1st-Year" && (
                                <>
                                  <SelectItem value="1st-Semester">
                                    1st Semester
                                  </SelectItem>
                                  <SelectItem value="2nd-Semester">
                                    2nd Semester
                                  </SelectItem>
                                </>
                              )}
                              {profile.year === "2nd-Year" && (
                                <>
                                  <SelectItem value="3rd-Semester">
                                    3rd Semester
                                  </SelectItem>
                                  <SelectItem value="4th-Semester">
                                    4th Semester
                                  </SelectItem>
                                </>
                              )}
                              {profile.year === "3rd-Year" && (
                                <>
                                  <SelectItem value="5th-Semester">
                                    5th Semester
                                  </SelectItem>
                                  <SelectItem value="6th-Semester">
                                    6th Semester
                                  </SelectItem>
                                </>
                              )}
                              {profile.year === "4th-Year" && (
                                <>
                                  <SelectItem value="7th-Semester">
                                    7th Semester
                                  </SelectItem>
                                  <SelectItem value="8th-Semester">
                                    8th Semester
                                  </SelectItem>
                                </>
                              )}
                              {profile.year === "5th-Year" && (
                                <>
                                  <SelectItem value="9th-Semester">
                                    9th Semester
                                  </SelectItem>
                                  <SelectItem value="10th-Semester">
                                    10th Semester
                                  </SelectItem>
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="college">College</Label>
                          <Input
                            id="college"
                            defaultValue={profile.college}
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Input
                            id="department"
                            defaultValue={profile.department}
                            readOnly
                          />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" form="academic-form">
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Update your password and security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      id="security-form"
                      className="space-y-6"
                      onSubmit={handleSubmit(handlePasswordUpdate)}
                    >
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">
                            Current Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="current-password"
                              type={showOldPass ? "text" : "password"}
                              required
                              placeholder="Enter your current password"
                              {...register("current-password")}
                            />

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full"
                              onClick={() => setShowOldPass(!showOldPass)}
                            >
                              {showOldPass ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                              <span className="sr-only">
                                {showOldPass
                                  ? "Hide password"
                                  : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <div className="relative">
                            <Input
                              id="new-password"
                              type={showNewPass ? "text" : "password"}
                              {...register("new-password")}
                              required
                              placeholder="Enter your new password"
                            />

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full"
                              onClick={() => setShowNewPass(!showNewPass)}
                            >
                              {showNewPass ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                              <span className="sr-only">
                                {showNewPass
                                  ? "Hide password"
                                  : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            Confirm New Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="confirm-password"
                              type={showConfirmPass ? "text" : "password"}
                              {...register("confirm-password")}
                              placeholder="Re-enter your new password"
                              required
                            />

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full"
                              onClick={() =>
                                setShowConfirmPass(!showConfirmPass)
                              }
                            >
                              {showConfirmPass ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                              <span className="sr-only">
                                {showConfirmPass
                                  ? "Hide password"
                                  : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" form="security-form">
                      Update Password
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
