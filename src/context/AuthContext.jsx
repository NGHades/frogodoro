import { createContext, useState, useEffect, useMemo } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../components/firebaseConfig";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email and password
  const signup = (email, password) => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Promise.reject(new Error("Please enter a valid email address"));
    }
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in with email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign out
  const logout = () => {
    return signOut(auth);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user ? user.email : "logged out");
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      currentUser,
      signup,
      login,
      logout,
    }),
    [currentUser],
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
