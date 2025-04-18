import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { apiConnector } from "@/services/apiConnector";
import Spinner from "@/components/Spinner";

function OpenRoute({ children }: { children: React.ReactNode }) {
  const token = Cookies.get("token");
  const [role, setRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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
      setRole(user.role.toLowerCase());

      console.log("User role:", role);

      setIsAuthenticated(true);
    };

    validateUser();
  }, [token]);

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
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return <Spinner />;
  }

  return isAuthenticated ? <Navigate to={`/${role}`} /> : children;
}

export default OpenRoute;
