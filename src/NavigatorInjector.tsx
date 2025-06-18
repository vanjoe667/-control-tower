import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigator } from "./service/navigateService";

const NavigatorInjector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return null; // Doesn't render anything
};

export default NavigatorInjector;
