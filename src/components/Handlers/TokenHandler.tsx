import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TokenHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromURL = queryParams.get("token");

    if (tokenFromURL) {
      localStorage.setItem("token", tokenFromURL);
    }

    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      window.location.href = "https://bitmarte-frontend-git-staging-devcbits-projects.vercel.app/admin/login";
    }
  }, [location.search]);

  return null;
};

export default TokenHandler;

function isTokenExpired(token: string): boolean {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    const exp = decodedPayload.exp;
    const now = Math.floor(Date.now() / 1000);

    return exp < now;
  } catch (error) {
    return true;
  }
}
