import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Home from "@/pages/Home";
import OpenRoute from "@/components/OpenRoute";
import LoginPage from "@/pages/auth/login/LoginPage";
// import SignupPage from "@/pages/auth/signup/SignupPage";
import PrivateRoute from "@/components/PrivateRoute";
import StudentDashboard from "@/pages/student/StudentDashboard";
import StudentInternships from "@/pages/student/internships/StudentInternships";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/users/AdminUsers";
import AddUser from "@/pages/admin/users/AddUser";
import AdminInternships from "@/pages/admin/internships/AdminInternships";
import AdminColleges from "@/pages/admin/colleges/AdminColleges";
import AddCollege from "@/pages/admin/colleges/AddCollege";
import AdminDepartments from "@/pages/admin/departments/AdminDepartments";
import AddDepartment from "@/pages/admin/departments/AddDepartment";
import UserDetails from "@/pages/admin/users/UserDetails";
import EditUser from "@/pages/admin/users/EditUser";
// import AdminSettings from "@/pages/admin/settings/AdminSettings";
import AdminReports from "@/pages/admin/reports/AdminReports";
import AddInternship from "@/pages/student/internships/AddInternship";
import StudentTasks from "@/pages/student/tasks/StudentTasks";
import TaskDetails from "@/pages/student/tasks/TaskDetails";
import EditTask from "@/pages/student/tasks/EditTask";
import InternshipDetails from "@/pages/student/internships/InternshipDetails";
import EditInternship from "@/pages/student/internships/EditInternship";
import StudentProfile from "@/pages/student/profile/StudentProfile";
import SupervisorDashboard from "@/pages/supervisor/SupervisorDashboard";
import SupervisorInternships from "@/pages/supervisor/internships/SupervisorInternships";
import SupervisorInternshipDetails from "@/pages/supervisor/internships/SupervisorInternshipDetails";
// import SupervisorProfile from "@/pages/supervisor/profile/SupervisorProfile";
import SupervisorTasks from "@/pages/supervisor/tasks/SupervisorTasks";
// import SupervisorTaskReview from "@/pages/supervisor/tasks/SupervisorTaskReview";
import AdminInternshipDetails from "@/pages/admin/internships/AdminInternshipDetails";
// import StudentDetails from "@/pages/supervisor/users/StudentDetails";
import AddTask from "@/pages/student/tasks/AddTask";

function App() {
  const adminRoutes = [
    { path: "/admin", element: <AdminDashboard /> },
    { path: "/admin/users", element: <AdminUsers /> },
    { path: "/admin/users/:id", element: <UserDetails /> },
    { path: "/admin/users/:id/edit", element: <EditUser /> },
    { path: "/admin/users/add", element: <AddUser /> },
    { path: "/admin/internships", element: <AdminInternships /> },
    {
      path: "/admin/internships/:id",
      element: <AdminInternshipDetails />,
    },
    { path: "/admin/colleges", element: <AdminColleges /> },
    { path: "/admin/colleges/add", element: <AddCollege /> },
    { path: "/admin/departments", element: <AdminDepartments /> },
    { path: "/admin/departments/add", element: <AddDepartment /> },
    // { path: "/admin/settings", element: <AdminSettings /> },
    { path: "/admin/reports", element: <AdminReports /> },
  ];

  const studentRoutes = [
    { path: "/student", element: <StudentDashboard /> },
    { path: "/student/internships", element: <StudentInternships /> },
    { path: "/student/internships/add", element: <AddInternship /> },
    { path: "/student/internships/:id", element: <InternshipDetails /> },
    { path: "/student/internships/edit/:id", element: <EditInternship /> },
    { path: "/student/tasks", element: <StudentTasks /> },
    { path: "/student/tasks/add", element: <AddTask /> },
    { path: "/student/tasks/:internshipId/:taskId", element: <TaskDetails /> },
    {
      path: "/student/tasks/edit/:internshipId/:taskId",
      element: <EditTask />,
    },
    { path: "/student/profile", element: <StudentProfile /> },
  ];

  const supervisorRoutes = [
    { path: "/supervisor", element: <SupervisorDashboard /> },
    { path: "/supervisor/internships", element: <SupervisorInternships /> },
    {
      path: "/supervisor/internships/:id",
      element: <SupervisorInternshipDetails />,
    },
    { path: "/supervisor/tasks", element: <SupervisorTasks /> },
    // { path: "/supervisor/tasks/:id", element: <SupervisorTaskReview /> },
    // { path: "/supervisor/students/:id", element: <StudentDetails /> },
    // { path: "/supervisor/profile", element: <SupervisorProfile /> },
  ];

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoute>
              <LoginPage />
            </OpenRoute>
          }
        />

        {/* <Route
          path="/signup"
          element={
            <OpenRoute>
              <SignupPage />
            </OpenRoute>
          }
        /> */}

        {/* Student Route */}
        {studentRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PrivateRoute>{route.element}</PrivateRoute>}
          />
        ))}

        {/* Supervisor Route */}
        {supervisorRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PrivateRoute>{route.element}</PrivateRoute>}
          />
        ))}

        {/* Admin Route */}
        {adminRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PrivateRoute>{route.element}</PrivateRoute>}
          />
        ))}

        {/* Not Found */}
        <Route
          path="*"
          element={
            <h1 className="text-3xl font-bold text-red-500 w-screen h-screen flex items-center justify-center">
              404 Not Found
            </h1>
          }
        />
      </Routes>
    </>
  );
}

export default App;
