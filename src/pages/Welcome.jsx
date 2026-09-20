import React from "react";
import { useNavigate } from "react-router-dom";

import ScreenWrapper from "../components/ui/ScreenWrapper";
import Button from "../components/ui/button";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <ScreenWrapper>
      <div className="welcomePage">

        {/* Welcome image */}
        <img
          className="welcomeImage"
          src="/assets/images/welcome.png"
          alt="Welcome to Sociq"
        />

        {/* Welcome message */}
        <div className="welcomeText">
          <h1>Sociq!</h1>

          <p>
            Where every thought finds a home and
            every image tells a story
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="welcomeFooter">

          <Button
            title="Getting Started"
            onPress={() =>
              navigate("/signUp")
            }
          />

          <div>
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

      </div>
    </ScreenWrapper>
  );
}