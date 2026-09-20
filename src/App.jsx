import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./contexts/AuthContext";

import Loading from "./components/Loading";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import NewPost from "./pages/NewPost";
import Notifications from "./pages/Notifications";


function Guard({ children }) {
  const { user, loading } = useAuth();

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="center">
        <Loading />
      </div>
    );
  }

  // Redirect unauthenticated users
  return user ? (
    children
  ) : (
    <Navigate
      to="/welcome"
      replace
    />
  );
}


export default function App() {
  const { user, loading } = useAuth();

  // Wait for authentication to be checked
  if (loading) {
    return (
      <div className="center">
        <Loading />
      </div>
    );
  }

  return (
    <Routes>

      {/* Default route */}
      <Route
        path="/"
        element={
          <Navigate
            to={user ? "/main/home" : "/welcome"}
            replace
          />
        }
      />

      {/* Public routes */}
      <Route
        path="/welcome"
        element={<Welcome />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signUp"
        element={<SignUp />}
      />

      {/* Protected routes */}
      <Route
        path="/main/home"
        element={
          <Guard>
            <Home />
          </Guard>
        }
      />

      <Route
        path="/main/profile"
        element={
          <Guard>
            <Profile />
          </Guard>
        }
      />

      <Route
        path="/main/editProfile"
        element={
          <Guard>
            <EditProfile />
          </Guard>
        }
      />

      <Route
        path="/main/newPost"
        element={
          <Guard>
            <NewPost />
          </Guard>
        }
      />

      <Route
        path="/main/notifications"
        element={
          <Guard>
            <Notifications />
          </Guard>
        }
      />

      {/* Unknown routes */}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}
