import axios from "axios";
import BASE_URL from "../../utils/constant";
import { toast } from "react-toastify";

export const PostLike = async (payload) => {
  try {
    const { token, ...data } = payload;
    const response = await axios.post(`${BASE_URL}/api/like_post`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    // toast.error(error.response?.data?.message || "Post Like Error");
    toast.error(error || "Post Like Error");
  }
};

//Home page View More
export const PostDetail = async (payload) => {
  try {
    const { token, ...data } = payload;
    const response = await axios.post(
      `${BASE_URL}/api/favourites_list_details`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || "Post Like Error");
    throw error; 
  }
};


//Trending Pets :: user_show_notes
export const UserShowNotes = async (payload) => {
  try {
    const { token, ...data } = payload;
    const response = await axios.post(
      `${BASE_URL}/api/user_show_notes`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    // toast.error(error.response?.data?.message || "user_show_notes Error");
    toast.error(error || "user_show_notes Error");
  }
};

//Trending Pets :: user_add_notes
export const UserAddNotes = async (payload) => {
  try {
    const { token, ...data } = payload;
    const response = await axios.post(
      `${BASE_URL}/api/user_add_notes`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    // toast.error(error.response?.data?.message || "user_add_notes Error");
    toast.error(error || "user_add_notes Error");
  }
};

//Trending Pets :: user_status__notes_leads_update
export const UserStatusNotesLeadsUpdate = async (payload) => {
  try {
    const { token, ...data } = payload;
    const response = await axios.post(
      `${BASE_URL}/api/user_status__notes_leads_update`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    // toast.error(error.response?.data?.message || "user_add_notes Error");
    toast.error(error || "user_add_notes Error");
  }
};

//Trending Pets :: user_status__notes_leads_update
export const DeleteBreederPost = async (payload) => {
  try {
    const { token, ...data } = payload;
    const response = await axios.post(`${BASE_URL}/api/delete_post`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    // toast.error(error.response?.data?.message || "user_add_notes Error");
    toast.error(error || "user_add_notes Error");
  }
};

//Trending Pets :: Get Ratting
export const GetRattingTrendingPost = async (payload) => {
  try {
    const { token, ...data } = payload;
    const response = await axios.post(
      `${BASE_URL}/api/rating_breeder_get`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    // toast.error(error.response?.data?.message || "Ratting Error");
    toast.error(error || "Ratting Error");
    throw error;
  }
};

//Trending Pets :: Set and Update Ratting
export const SetRattingTrendingPost = async (payload) => {
  try {
    const { token,...data } = payload;
    const response = await axios.post(
      `${BASE_URL}/api/rating_breeder`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    // toast.error(error.response?.data?.message || "user_add_notes Error");
    toast.error(error || "user_add_notes Error");
  }
};
