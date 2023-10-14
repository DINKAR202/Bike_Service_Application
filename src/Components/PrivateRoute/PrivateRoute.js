import React, { useContext } from "react";  // Import React and useContext hook.
import { Redirect, Route } from "react-router";  // Import Redirect and Route from react-router.
import { UserContext } from "../../App";  // Import the UserContext from your App component.

const PrivateRoute = ({ children, ...rest }) => {
    const { loggedInUser: { isSignedIn } } = useContext(UserContext);  // Access the isSignedIn property from the UserContext.

    return (
        <Route
            {...rest}
            render={({ location }) =>  // Render a Route component with a custom function.
                isSignedIn ? (  // If the user is signed in:
                    children  // Render the children components.
                ) : (
                    <Redirect  // If the user is not signed in, redirect to the login page.
                        to={{
                            pathname: "/login",
                            state: { from: location }  // Store the current location for redirection after login.
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;  // Export the PrivateRoute component.
