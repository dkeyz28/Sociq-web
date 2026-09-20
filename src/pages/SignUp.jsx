import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ScreenWrapper from "../components/ui/ScreenWrapper";
import BackButton from "../components/BackButton";
import Input from "../components/input";
import Button from "../components/ui/button";
import Icon from "../components/Icon";

import { supabase } from "../lib/supabase";

export default function SignUp() {
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI states
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle sign-up
  const handleSubmit = async () => {
    if (!email || !password) {
      setMessage("Please fill all the fields");
      return;
    }

    setLoading(true);
    setMessage("");

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),

      options: {
        data: {
          name: name.trim(),
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (session) {
      navigate("/main/home");
      return;
    }

    setMessage(
      "Account created. Check your email to confirm your account."
    );
  };

  return (
    <ScreenWrapper>
      <div className="authPage">

        {/* Back button */}
        <BackButton />

        {/* Page heading */}
        <div>
          <h1>Let's</h1>
          <h1>Get Started</h1>
        </div>

        {/* Sign-up form */}
        <div className="form">

          <p>
            Please fill the details to create an account
          </p>

          {/* Name */}
          <Input
            icon={
              <Icon
                name="user"
                size={26}
              />
            }
            placeholder="Enter your name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
          />

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

          {/* Error or status message */}
          {message && (
            <div className="error">
              {message}
            </div>
          )}

          {/* Sign-up button */}
          <Button
            title="Sign up"
            loading={loading}
            onPress={handleSubmit}
          />

        </div>

        {/* Login link */}
        <div className="authFooter">
          Already have an account?{" "}
          <button
            className="link"
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </button>
        </div>

      </div>
    </ScreenWrapper>
  );
}