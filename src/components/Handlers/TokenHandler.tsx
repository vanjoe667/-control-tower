import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TokenHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
    }

    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      // window.location.href =
      //   "https://bitmarte-frontend-git-staging-devcbits-projects.vercel.app/admin/login";
    }
  }, [location.search]);

  return null;
};

export default TokenHandler;