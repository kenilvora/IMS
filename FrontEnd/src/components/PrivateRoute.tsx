import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { apiConnector } from "@/services/apiConnector";
import Spinner from "@/components/Spinner";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = Cookies.get("token");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const validateUser = async () => {
      if (!token || token === null || token === undefined) {
        setIsAuthenticated(false);
        return;
      }

      const res = await apiConnector(
        "get",
        `${import.meta.env.VITE_API_URL}/auth/me`
      );

      if (!res.data.success) {
        setIsAuthenticated(false);
        return;
      }

      const user = res.data.data;

      const role = user.role;

      Cookies.set("user", JSON.stringify(user), {
        sameSite: "lax",
        secure: true,
        expires: 7,
      });

      const pathName = location.pathname.split("/")[1];

      if (role === "Admin" && pathName !== "admin") {
        navigate("/admin", {
          replace: true,
        });
        return;
      } else if (role === "Supervisor" && pathName !== "supervisor") {
        navigate("/supervisor", {
          replace: true,
        });
        return;
      }
      if (role === "Student" && pathName !== "student") {
        navigate("/student", {
          replace: true,
        });
        return;
      }

      setIsAuthenticated(true);
    };

    validateUser();
  }, [token, location.pathname]);

  useEffect(() => {
    if (isAuthenticated === false) {
      Cookies.remove("token", {
        sameSite: "lax",
        secure: true,
      });
      Cookies.remove("user", {
        sameSite: "lax",
        secure: true,
      });
      localStorage.clear();
    }
  }, [isAuthenticated, location.pathname]);

  if (isAuthenticated === null) {
    return <Spinner />;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;
