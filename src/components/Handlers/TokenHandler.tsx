 
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TokenHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromURL = queryParams.get("token");
    
    if (tokenFromURL) {
      if (!isTokenExpired(tokenFromURL)) {
        console.log("Token is valid, storing in localStorage");
        localStorage.setItem("token", tokenFromURL);
        navigate("/");
      } else {
        console.log("Token is expired, redirecting to login");
        redirectToLogin();
      }
    }
  }, [location.search, navigate]);

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
    console.error("Error decoding token:", error);
    return true;
  }
}

function redirectToLogin() {
  window.location.href =
    "https://bitmarte-frontend-git-staging-devcbits-projects.vercel.app/admin/login";
}
