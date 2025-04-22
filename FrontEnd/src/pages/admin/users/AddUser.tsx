import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/main-layout";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { apiConnector } from "@/services/apiConnector";
import { useForm } from "react-hook-form";

type College = {
  id: string;
  name: string;
};

type Department = {
  id: string;
  name: string;
};

type Faculty = {
  id: string;
  name: string;
};

export default function AddUser() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState("Student");

  const [loading, setLoading] = useState(true);

  const [collegeList, setCollegeList] = useState<College[]>([]);
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);

  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSem, setSelectedSem] = useState("");

  const { register, handleSubmit, reset } = useForm();

  const getCollegeList = async () => {
    try {
      const res = await apiConnector(
        "GET",
        `${import.meta.env.VITE_API_URL}/college/getCollegeList`
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      setCollegeList(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch college list");
    } finally {
      setLoading(false);
    }
  };

  const getDepartmentList = async () => {
    // setLoading(true);
    try {
      const res = await apiConnector(
        "GET",
        `${
          import.meta.env.VITE_API_URL
        }/college/getDepartmentDetails/${selectedCollege}`
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      setDepartmentList(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch college list");
    } finally {
      setLoading(false);
    }
  };

  const getFacultyList = async () => {
    // setLoading(true);
    try {
      const res = await apiConnector(
        "GET",
        `${
          import.meta.env.VITE_API_URL
        }/auth/getFacultyList/${selectedCollege}/${selectedDepartment}`
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      setFacultyList(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch college list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollegeList();
  }, []);

  useEffect(() => {
    if (selectedCollege) {
      getDepartmentList();
    }
  }, [selectedCollege]);

  useEffect(() => {
    if (selectedDepartment) {
      getFacultyList();
    }
  }, [selectedDepartment]);

  // howt to reinitialize the state of all the select fields when the user role changes
  useEffect(() => {
    setSelectedCollege("");
    setSelectedDepartment("");
    setSelectedFaculty("");
    setSelectedYear("");
    setSelectedSem("");
    setDepartmentList([]);
    setFacultyList([]);
    reset();
  }, [userRole]);

  const submitHandler = async (data: any) => {
    if (!selectedCollege || selectedCollege === "") {
      toast.error("Please select a college");
      return;
    }

    if (!selectedDepartment || selectedDepartment === "") {
      toast.error("Please select a department");
      return;
    }

    if (userRole === "Student") {
      if (!selectedYear || selectedYear === "") {
        toast.error("Please select a year");
        return;
      }

      if (!selectedSem || selectedSem === "") {
        toast.error("Please select a semester");
        return;
      }

      if (!selectedFaculty || selectedFaculty === "") {
        toast.error("Please select a faculty");
        return;
      }
    }

    const userData = {
      ...data,
      college: selectedCollege,
      department: selectedDepartment,
      faculty: selectedFaculty,
      currentYear: selectedYear,
      currentSemester: selectedSem,
      role: userRole,
    };

    setLoading(true);

    try {
      const res = await apiConnector(
        "POST",
        `${import.meta.env.VITE_API_URL}/auth/addUser`,
        userData
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      toast.success(`${userRole} added successfully`);
    } catch (error) {
      const errMsg = (error as any).response.data.message;
      toast.error(errMsg);
    } finally {
      reset();
      setSelectedCollege("");
      setSelectedDepartment("");
      setSelectedFaculty("");
      setSelectedYear("");
      setSelectedSem("");
      setDepartmentList([]);
      setFacultyList([]);
      setLoading(false);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <MainLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add User</h1>
          <p className="text-muted-foreground">
            Create a new user account in the system
          </p>
        </div>

        <Card className="">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              Enter the details for the new user
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="Student"
              onValueChange={setUserRole}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="Student">Student</TabsTrigger>
                <TabsTrigger value="Supervisor">Supervisor</TabsTrigger>
                <TabsTrigger value="Admin">Admin</TabsTrigger>
              </TabsList>

              <form id="add-user-form" onSubmit={handleSubmit(submitHandler)}>
                <TabsContent value="Student">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* firstName */}
                      <div className="space-y-2">
                        <Label htmlFor="student-first-name">First Name*</Label>
                        <Input
                          id="student-first-name"
                          placeholder="John"
                          required
                          type="text"
                          {...register("firstName")}
                        />
                      </div>
                      {/* lastName */}
                      <div className="space-y-2">
                        <Label htmlFor="student-last-name">Last Name*</Label>
                        <Input
                          id="student-last-name"
                          placeholder="Doe"
                          required
                          type="text"
                          {...register("lastName")}
                        />
                      </div>
                      {/* email */}
                      <div className="space-y-2">
                        <Label htmlFor="student-email">Email*</Label>
                        <Input
                          id="student-email"
                          type="email"
                          placeholder="john.doe@university.edu"
                          required
                          {...register("email")}
                        />
                      </div>
                      {/* password */}
                      <div className="space-y-2">
                        <Label htmlFor="student-password">Password*</Label>
                        <div className="relative">
                          <Input
                            id="student-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            required
                            {...register("password")}
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
                      {/* phone number */}
                      <div className="space-y-2">
                        <Label htmlFor="student-phone-number">
                          Phone Number*
                        </Label>
                        <Input
                          id="student-phone-number"
                          placeholder="+1 (555) 123-4567"
                          required
                          type="tel"
                          {...register("contactNumber")}
                        />
                      </div>
                      {/* enrollment number */}
                      <div className="space-y-2">
                        <Label htmlFor="student-enrollment-number">
                          Enrollment Number*
                        </Label>
                        <Input
                          id="student-enrollment-number"
                          placeholder="20230001"
                          type="number"
                          required
                          {...register("enrollmentNumber")}
                        />
                      </div>
                      {/* college */}
                      <div className="space-y-2">
                        <Label htmlFor="student-college">College*</Label>
                        <Select
                          required
                          value={selectedCollege}
                          onValueChange={(value) => {
                            setSelectedCollege(value);
                            setSelectedDepartment("");
                            setSelectedFaculty("");
                          }}
                        >
                          <SelectTrigger id="student-college">
                            <SelectValue placeholder="Select college" />
                          </SelectTrigger>
                          <SelectContent>
                            {collegeList.map((college) => (
                              <SelectItem key={college.id} value={college.id}>
                                {college.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* department */}
                      <div className="space-y-2">
                        <Label htmlFor="student-department">Department*</Label>
                        <Select
                          required
                          value={selectedDepartment}
                          onValueChange={(value) => {
                            setSelectedDepartment(value);
                            setSelectedFaculty("");
                          }}
                        >
                          <SelectTrigger id="student-department">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departmentList.length === 0 && !selectedCollege ? (
                              <SelectItem value="no-department" disabled>
                                Select a college first
                              </SelectItem>
                            ) : departmentList.length === 0 &&
                              selectedCollege ? (
                              <SelectItem value="no-department" disabled>
                                No departments available
                              </SelectItem>
                            ) : (
                              departmentList.map((department) => (
                                <SelectItem
                                  key={department.id}
                                  value={department.id}
                                >
                                  {department.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* year */}
                      <div className="space-y-2">
                        <Label htmlFor="student-year">Year*</Label>
                        <Select
                          required
                          value={selectedYear}
                          onValueChange={(value) => {
                            setSelectedYear(value);
                          }}
                        >
                          <SelectTrigger id="student-year">
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
                      {/* semester */}
                      <div className="space-y-2">
                        <Label htmlFor="student-sem">Semester*</Label>
                        <Select
                          required
                          value={selectedSem}
                          onValueChange={(value) => {
                            setSelectedSem(value);
                          }}
                        >
                          <SelectTrigger id="student-sem">
                            <SelectValue placeholder="Select Semester" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedYear === "1st-Year" ? (
                              <>
                                <SelectItem value="1st-Semester">
                                  1st Semester
                                </SelectItem>
                                <SelectItem value="2nd-Semester">
                                  2nd Semester
                                </SelectItem>
                              </>
                            ) : selectedYear === "2nd-Year" ? (
                              <>
                                <SelectItem value="3rd-Semester">
                                  3rd Semester
                                </SelectItem>
                                <SelectItem value="4th-Semester">
                                  4th Semester
                                </SelectItem>
                              </>
                            ) : selectedYear === "3rd-Year" ? (
                              <>
                                <SelectItem value="5th-Semester">
                                  5th Semester
                                </SelectItem>
                                <SelectItem value="6th-Semester">
                                  6th Semester
                                </SelectItem>
                              </>
                            ) : selectedYear === "4th-Year" ? (
                              <>
                                <SelectItem value="7th-Semester">
                                  7th Semester
                                </SelectItem>
                                <SelectItem value="8th-Semester">
                                  8th Semester
                                </SelectItem>
                              </>
                            ) : selectedYear === "5th-Year" ? (
                              <>
                                <SelectItem value="9th-Semester">
                                  9th Semester
                                </SelectItem>
                                <SelectItem value="10th-Semester">
                                  10th Semester
                                </SelectItem>
                              </>
                            ) : (
                              <>
                                <SelectItem value="no-semester" disabled>
                                  Select a year first
                                </SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* faculty */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="student-faculty">Faculty*</Label>
                        <Select
                          required
                          value={selectedFaculty}
                          onValueChange={(value) => {
                            setSelectedFaculty(value);
                          }}
                        >
                          <SelectTrigger id="student-faculty">
                            <SelectValue placeholder="Select Faculty" />
                          </SelectTrigger>
                          <SelectContent>
                            {facultyList.length === 0 && !selectedDepartment ? (
                              <SelectItem value="no-faculty" disabled>
                                Select a department first
                              </SelectItem>
                            ) : facultyList.length === 0 &&
                              selectedDepartment ? (
                              <SelectItem value="no-faculty" disabled>
                                No faculty available
                              </SelectItem>
                            ) : (
                              facultyList.map((faculty) => (
                                <SelectItem key={faculty.id} value={faculty.id}>
                                  {faculty.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* address */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="student-address">Address*</Label>
                        <Input
                          id="student-address"
                          placeholder="123 Main St, City, State, ZIP"
                          required
                          type="text"
                          {...register("address")}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="Supervisor">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* first Name */}
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-first-name">
                          First Name*
                        </Label>
                        <Input
                          id="supervisor-first-name"
                          placeholder="John"
                          required
                          type="text"
                          {...register("firstName")}
                        />
                      </div>
                      {/* last Name */}
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-last-name">Last Name*</Label>
                        <Input
                          id="supervisor-last-name"
                          placeholder="Doe"
                          required
                          type="text"
                          {...register("lastName")}
                        />
                      </div>
                      {/* email */}
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-email">Email*</Label>
                        <Input
                          id="supervisor-email"
                          type="email"
                          placeholder="john.doe@university.edu"
                          required
                          {...register("email")}
                        />
                      </div>
                      {/* password */}
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-password">Password*</Label>
                        <div className="relative">
                          <Input
                            id="supervisor-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            required
                            {...register("password")}
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
                      {/* phone number */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="supervisor-phone-number">
                          Phone Number*
                        </Label>
                        <Input
                          id="supervisor-phone-number"
                          placeholder="+1 (555) 123-4567"
                          required
                          type="tel"
                          {...register("contactNumber")}
                        />
                      </div>
                      {/* college */}
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-college">College*</Label>
                        <Select
                          required
                          value={selectedCollege}
                          onValueChange={(value) => {
                            setSelectedCollege(value);
                            setSelectedDepartment("");
                            setSelectedFaculty("");
                          }}
                        >
                          <SelectTrigger id="supervisor-college">
                            <SelectValue placeholder="Select college" />
                          </SelectTrigger>
                          <SelectContent>
                            {collegeList.map((college) => (
                              <SelectItem key={college.id} value={college.id}>
                                {college.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* department */}
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-department">
                          Department*
                        </Label>
                        <Select
                          required
                          value={selectedDepartment}
                          onValueChange={(value) => {
                            setSelectedDepartment(value);
                            setSelectedFaculty("");
                          }}
                        >
                          <SelectTrigger id="supervisor-department">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departmentList.length === 0 && !selectedCollege ? (
                              <SelectItem value="no-department" disabled>
                                Select a college first
                              </SelectItem>
                            ) : departmentList.length === 0 &&
                              selectedCollege ? (
                              <SelectItem value="no-department" disabled>
                                No departments available
                              </SelectItem>
                            ) : (
                              departmentList.map((department) => (
                                <SelectItem
                                  key={department.id}
                                  value={department.id}
                                >
                                  {department.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="Admin">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* first Name */}
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-first-name">
                          First Name*
                        </Label>
                        <Input
                          id="supervisor-first-name"
                          placeholder="John"
                          required
                          type="text"
                          {...register("firstName")}
                        />
                      </div>
                      {/* last Name */}
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-last-name">Last Name*</Label>
                        <Input
                          id="supervisor-last-name"
                          placeholder="Doe"
                          required
                          type="text"
                          {...register("lastName")}
                        />
                      </div>
                      {/* email */}
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-email">Email*</Label>
                        <Input
                          id="supervisor-email"
                          type="email"
                          placeholder="john.doe@university.edu"
                          required
                          {...register("email")}
                        />
                      </div>
                      {/* password */}
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-password">Password*</Label>
                        <div className="relative">
                          <Input
                            id="supervisor-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            required
                            {...register("password")}
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
                      {/* phone number */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="supervisor-phone-number">
                          Phone Number*
                        </Label>
                        <Input
                          id="supervisor-phone-number"
                          placeholder="+1 (555) 123-4567"
                          required
                          type="tel"
                          {...register("contactNumber")}
                        />
                      </div>
                      {/* college */}
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-college">College*</Label>
                        <Select
                          required
                          value={selectedCollege}
                          onValueChange={(value) => {
                            setSelectedCollege(value);
                            setSelectedDepartment("");
                            setSelectedFaculty("");
                          }}
                        >
                          <SelectTrigger id="supervisor-college">
                            <SelectValue placeholder="Select college" />
                          </SelectTrigger>
                          <SelectContent>
                            {collegeList.map((college) => (
                              <SelectItem key={college.id} value={college.id}>
                                {college.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* department */}
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-department">
                          Department*
                        </Label>
                        <Select
                          required
                          value={selectedDepartment}
                          onValueChange={(value) => {
                            setSelectedDepartment(value);
                            setSelectedFaculty("");
                          }}
                        >
                          <SelectTrigger id="supervisor-department">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departmentList.length === 0 && !selectedCollege ? (
                              <SelectItem value="no-department" disabled>
                                Select a college first
                              </SelectItem>
                            ) : departmentList.length === 0 &&
                              selectedCollege ? (
                              <SelectItem value="no-department" disabled>
                                No departments available
                              </SelectItem>
                            ) : (
                              departmentList.map((department) => (
                                <SelectItem
                                  key={department.id}
                                  value={department.id}
                                >
                                  {department.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit" form="add-user-form">
              Add {userRole}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
