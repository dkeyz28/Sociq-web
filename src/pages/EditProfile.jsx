import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ScreenWrapper from "../components/ui/ScreenWrapper";
import Header from "../components/Header";
import Input from "../components/input";
import Button from "../components/ui/button";
import Avatar from "../components/ui/Avatar";
import Icon from "../components/Icon";

import { useAuth } from "../contexts/AuthContext";
import { updateUser } from "../services/userService";

export default function EditProfile() {
  const { user: currentUser, setUserData } = useAuth();
  const navigate = useNavigate();

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // User profile information
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    image: null,
    bio: "",
    address: "",
  });

  // Load the current user's information
  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser.name || "",
        phoneNumber: currentUser.phoneNumber || "",
        image: currentUser.image || null,
        address: currentUser.address || "",
        bio: currentUser.bio || "",
      });
    }
  }, [currentUser]);

  // Handle profile image selection
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setUser((previousUser) => ({
        ...previousUser,
        image: imageUrl,
      }));
    }
  };

  // Handle changes to the profile fields
  const handleInputChange = (field, value) => {
    setUser((previousUser) => ({
      ...previousUser,
      [field]: value,
    }));
  };

  // Update the user's profile
  const handleSubmit = async () => {
    const {
      name,
      phoneNumber,
      address,
      image,
      bio,
    } = user;

    setError("");

    // Check that all required fields are filled
    if (!name || !phoneNumber || !address || !bio || !image) {
      setError("Profile: Please fill all the fields");
      return;
    }

    setLoading(true);

    const result = await updateUser(
      currentUser?.id,
      user
    );

    setLoading(false);

    if (result.success) {
      // Update the user information in AuthContext
      setUserData(result.data || user);

      // Go back to the previous page
      navigate(-1);
    } else {
      setError(result.msg);
    }
  };

  return (
    <ScreenWrapper>
      <div className="editPage">

        {/* Page header */}
        <Header title="Edit Profile" />

        <div className="editForm">

          {/* Profile image */}
          <div className="editAvatar">
            <Avatar
              url={user.image}
              size={140}
              rounded={44}
            />

            <label>
              <Icon
                name="camera"
                size={20}
                strokeWidth={2.5}
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <p>
            Please fill your profile details
          </p>

          {/* Name */}
          <Input
            icon={<Icon name="user" />}
            placeholder="Enter your name"
            value={user.name}
            onChange={(event) =>
              handleInputChange(
                "name",
                event.target.value
              )
            }
          />

          {/* Phone number */}
          <Input
            icon={<Icon name="call" />}
            placeholder="Enter your phone number"
            value={user.phoneNumber}
            onChange={(event) =>
              handleInputChange(
                "phoneNumber",
                event.target.value
              )
            }
          />

          {/* Address */}
          <Input
            icon={<Icon name="location" />}
            placeholder="Enter your address"
            value={user.address}
            onChange={(event) =>
              handleInputChange(
                "address",
                event.target.value
              )
            }
          />

          {/* Bio */}
          <Input
            placeholder="Enter your bio"
            multiline
            value={user.bio}
            onChange={(event) =>
              handleInputChange(
                "bio",
                event.target.value
              )
            }
          />

          {/* Error message */}
          {error && (
            <div className="error">
              {error}
            </div>
          )}

          {/* Update button */}
          <Button
            title="Update"
            loading={loading}
            onPress={handleSubmit}
          />

        </div>
      </div>
    </ScreenWrapper>
  );
}

