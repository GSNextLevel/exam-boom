import { useEffect} from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

// function cwr(operation: string, payload: any)
// function cwr(operation, payload);
declare function cwr(operation: string, payload: any): void;

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize("UA-213891838-1");
    ReactGA.pageview(location.pathname + location.search);

    cwr("recordPageView", location.pathname);
    console.log(location.pathname, location.search);
  }, [location]);
};

export default GoogleAnalytics;
