import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ScreenWrapper from "../components/ui/ScreenWrapper";
import BackButton from "../components/BackButton";
import Input from "../components/input";
import Button from "../components/ui/button";
import Icon from "../components/Icon";

import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle login
  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill all the fields!");
      return;
    }

    setLoading(true);
    setError("");

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // Login was successful
    if (data?.session) {
      navigate("/main/home");
    }
  };

  return (
    <ScreenWrapper>
      <div className="authPage">

        {/* Back button */}
        <BackButton />

        {/* Page heading */}
        <div>
          <h1>Hey</h1>
          <h1>Welcome Back</h1>
        </div>

        {/* Login form */}
        <div className="form">

          <p>
            Please login to continue
          </p>

          {/* Email */}
          <Input
            icon={
              <Icon
                name="mail"
                size={26}
              />
            }
            placeholder="Enter your email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          {/* Password */}
          <Input
            icon={
              <Icon
                name="lock"
                size={26}
              />
            }
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          {/* Forgot password */}
          <div className="forgot">
            Forgot Password?
          </div>

          {/* Error message */}
          {error && (
            <div className="error">
              {error}
            </div>
          )}

          {/* Login button */}
          <Button
            title="Login"
            loading={loading}
            onPress={handleSubmit}
          />

        </div>

        {/* Sign-up link */}
        <div className="authFooter">
          Don't have an account?{" "}

          <button
            className="link"
            onClick={() =>
              navigate("/signUp")
            }
          >
            Sign up
          </button>
        </div>

      </div>
    </ScreenWrapper>
  );
}