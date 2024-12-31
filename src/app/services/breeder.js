import axios from "axios";
import BASE_URL from "../utils/constant";
import { toast } from "react-toastify";

//contacted  :: user_show_notes
export const ShowNotes = async (payload) => {
  const { token, ...data } = payload;
  try {
    const response = await axios.post(
      `${BASE_URL}/api/breeder_show_notes`,
      data,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    toast.error(error?.message || "user_show_notes Error");
    throw error;
  }
};

//contacted  :: user_add_notes
export const AddNotes = async (payload) => {
  try {
    const { token, ...data } = payload;
    const response = await axios.post(
      `${BASE_URL}/api/breeder_add_notes`,
      data,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message, 'err')
    // throw new Error(error.response?.data?.message || "breeder_add_notes Error");
    throw error;
  }
};

///ShowNotes
//contacted  :: user_status__notes_leads_update
export const StatusNotesLeadsUpdate = async (payload) => {
  try {
    const { token, ...data } = payload;
    const response = await axios.post(
      `${BASE_URL}/api/user_status__notes_leads_update`,
      data,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "user_add_notes Error");
  }
};

////
// Pets ::
export const GetRatting = async (payload) => {
  const { token, ...data } = payload;
  try {
    const response = await axios.post(
      `${BASE_URL}/api/rating_user_get`,
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
    toast.error(error?.message || "Ratting Error");
    throw error;
  }
};

// Pets :: Set and Update Ratting
export const SetRatting = async (payload) => {
  try {
    const { token,...data } = payload;
    const response = await axios.post(`${BASE_URL}/api/rating_user`, data, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "user_add_notes Error");
  }
};
//status_leads_breeder_details

export const StatusLeadsBreederDetails = async (payload) => {
  try {
    const { token,...data } = payload;
    const response = await axios.post(
      `${BASE_URL}/api/status_leads_breeder_details`,
      data,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "user_add_notes Error");
  }
};
