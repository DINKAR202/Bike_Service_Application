// Import necessary dependencies
import firebase from "firebase/app";
import "firebase/auth";
import jwt_decode from "jwt-decode";
import firebaseConfig from "./LoginConfig";

// Initialize the Firebase authentication framework
export const initializeLoginFramework = () => {
    // Initialize Firebase only if it's not already initialized
    !firebase.apps.length && firebase.initializeApp(firebaseConfig);
}

// Handle Google Sign-In
export const handleGoogleSignIn = () => {
    // Create a Google provider
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then(res => handleResponse(res))
        .catch(error => {
            throw error;
        });
}

// Create a new user with email and password
export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
            updateUserName(name);
            return handleResponse(res);
        })
        .catch(error => {
            throw error;
        });
}

// Update the user's display name
const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name
    })
}

// Sign in with email and password
export const signInWithEmailAndPassword = (email, password) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => handleResponse(res))
        .catch(error => {
            throw error;
        });
}

// Handle the response and construct a user object
const handleResponse = (res) => {
    const { displayName, photoURL, email } = res.user;
    const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL || "https://i.ibb.co/7CzR0Dg/users.jpg"
    }
    return signedInUser;
}

// Set the JWT token in local storage
export const setJWTToken = () => {
    return firebase
        .auth().currentUser
        .getIdToken(true)
        .then(idToken => {
            localStorage.setItem('token', idToken)
        })
        .catch(error => {
            throw error;
        });
}

// Get the decoded user from the JWT token in local storage
export const getDecodedUser = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return {};
    }
    const { name, picture, email } = jwt_decode(token);
    const decodedUser = {
        isSignedIn: true,
        name: name,
        email: email,
        photo: picture || "https://i.ibb.co/7CzR0Dg/users.jpg"
    }
    return decodedUser;
}

// Handle user sign-out
export const handleSignOut = () => {
    return firebase
        .auth()
        .signOut()
        .then(() => {
            localStorage.removeItem('token');
            const signedOutUser = {
                isSignedIn: false,
                userName: '',
                email: '',
                userPhoto: ''
            }
            return signedOutUser;
        })
        .catch(error => {
            throw error;
        });
}
