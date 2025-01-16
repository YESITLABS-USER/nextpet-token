// services/authService.js

import axios from "axios";
import BASE_URL from "../utils/constant";

export const checkUniqueBreeder = async(email) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/check-unique-email-breeder`, {email: email});
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

//Delete Breeder
export const DeleteBreeder = async (payload) => {
  try {
    const { token, ...data} = payload;
    const response = await axios.post(`${BASE_URL}/api/delete_breed`, data, {
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
