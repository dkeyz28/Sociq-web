import React from "react";
import { useNavigate } from "react-router-dom";

import ScreenWrapper from "../components/ui/ScreenWrapper";
import Avatar from "../components/ui/Avatar";
import Icon from "../components/Icon";

import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <ScreenWrapper>
      <div className="homePage">

        {/* Home header */}
        <div className="homeHeader">

          <h1>Sociq</h1>

          <div className="homeIcons">

            {/* Notifications */}
            <button
              onClick={() =>
                navigate("/main/notifications")
              }
            >
              <Icon
                name="heart"
                size={30}
              />
            </button>

            {/* Create new post */}
            <button
              onClick={() =>
                navigate("/main/newPost")
              }
            >
              <Icon
                name="plus"
                size={30}
              />
            </button>

            {/* Profile */}
            <button
              onClick={() =>
                navigate("/main/profile")
              }
            >
              <Avatar
                url={user?.image}
                size={43}
                rounded={12}
                style={{
                  borderWidth: 2,
                }}
              />
            </button>

          </div>
        </div>

      </div>
    </ScreenWrapper>
  );
}
