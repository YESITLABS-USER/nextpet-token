// services/authService.js

import axios from "axios";
import BASE_URL from "../../utils/constant";

export const checkUniqueUser = async(email) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/check-unique-email-user`, {email: email});
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const signUpUser = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/UserLogin_first`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

//Delete User
export const DeleteUser = async (payload) => {
  try {
    const { token, ...data} = payload;
    const response = await axios.post(`${BASE_URL}/api/delete_user`, data, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("An unexpected error occurred. Please try again.");
  }
};
