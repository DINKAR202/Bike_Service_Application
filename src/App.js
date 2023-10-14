// Import necessary modules and components
import axios from "axios";
import { createContext, lazy, Suspense, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import "./App.css";
import Spinner from "./Components/HomeComponents/Spinner/Spinner";
import { getDecodedUser } from "./Components/LoginAuth/LoginManager";
import NotFound from "./Components/NotFound/NotFound";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

// Lazy load components for better performance
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));

// Create a UserContext for managing user-related data
export const UserContext = createContext();

function App() {
  // State variables for managing user data and loading states
  const [loggedInUser, setLoggedInUser] = useState(getDecodedUser());
  const [selectedService, setSelectedService] = useState([]);
  const [adminLoading, setAdminLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Use useEffect to make an API request to check if the user is an admin
  useEffect(() => {
    axios
      .get(`http://localhost:9090/isAdmin?email=${loggedInUser?.email}`)
      .then((res) => {
        setIsAdmin(res.data);
        setAdminLoading(false);
      })
      .catch((error) => toast.error(error.message));
  }, [loggedInUser?.email]);

  return (
    // Provide user-related data through UserContext.Provider
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        isAdmin,
        selectedService,
        setSelectedService,
      }}
    >
      <ScrollToTop smooth />
      <Router>
        <Toaster />
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <PrivateRoute path="/dashboard/:panel">
              <Dashboard adminLoading={adminLoading} />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
