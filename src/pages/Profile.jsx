import React from "react";
import { useNavigate } from "react-router-dom";

import ScreenWrapper from "../components/ui/ScreenWrapper";
import Header from "../components/Header";
import Avatar from "../components/ui/Avatar";
import Icon from "../components/Icon";

import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to log out?"
    );

    if (!confirmed) {
      return;
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Error signing out!");
    }
  };

  return (
    <ScreenWrapper>
      <div className="profilePage">

        {/* Page header */}
        <Header
          title="Profile"
          mb={30}
        />

        {/* Logout button */}
        <button
          className="logoutButton"
          onClick={handleLogout}
        >
          <Icon
            name="logout"
            color="#ef4444"
          />
        </button>

        <div className="profileBody">

          {/* Profile image */}
          <div className="avatarWrap">
            <Avatar
              url={user?.image}
              size={120}
              rounded={31}
            />

            {/* Edit profile button */}
            <button
              className="editIcon"
              onClick={() =>
                navigate("/main/editProfile")
              }
            >
              <Icon
                name="edit"
                size={20}
                strokeWidth={2.5}
              />
            </button>
          </div>

          {/* User information */}
          <div className="identity">
            <strong>
              {user?.name ||
                user?.user_metadata?.name ||
                user?.user_metadata?.full_name}
            </strong>

            <span>
              {user?.address}
            </span>
          </div>

          {/* Contact information */}
          <div className="profileInfo">

            {/* Email */}
            <div>
              <Icon
                name="mail"
                size={20}
                color="#7C7C7C"
              />

              <span>
                {user?.email}
              </span>
            </div>

            {/* Phone number */}
            {user?.phoneNumber && (
              <div>
                <Icon
                  name="call"
                  size={20}
                  color="#7C7C7C"
                />

                <span>
                  {user.phoneNumber}
                </span>
              </div>
            )}

            {/* Bio */}
            {user?.bio && (
              <span>
                {user.bio}
              </span>
            )}

          </div>
        </div>
      </div>
    </ScreenWrapper>
  );
}
