import { useEffect} from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize("UA-213891838-1");
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
};

export default GoogleAnalytics;
