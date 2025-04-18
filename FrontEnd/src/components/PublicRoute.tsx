import { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { apiConnector } from "@/services/apiConnector";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const location = useLocation();

  const token = Cookies.get("token");
  const user = Cookies.get("user");

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const validate = async () => {
      try {
        if (token && user) {
          const res = await apiConnector(
            "get",
            `${import.meta.env.VITE_API_URL}/auth/me`
          );

          if (!res.data.success) {
            setIsAuthenticated(false);
            return;
          }

          setIsAuthenticated(true);
        } else {
          Cookies.remove("user", {
            secure: true,
            sameSite: "lax",
          });
          Cookies.remove("token", {
            secure: true,
            sameSite: "lax",
          });
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    validate();
  }, [token, location.pathname]);

  useEffect(() => {
    if (isAuthenticated === false) {
      Cookies.remove("token", {
        secure: true,
        sameSite: "lax",
      });
      Cookies.remove("user", {
        secure: true,
        sameSite: "lax",
      });
    }
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return <Spinner />;
  }

  return children;
};

export default PublicRoute;
