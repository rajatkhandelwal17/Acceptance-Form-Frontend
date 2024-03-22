import axios from "axios";
import { toast } from "react-toastify";

export const ApiService = {
  submitFormData: async function (formData) {
    try {
      const response = await axios.post(
        "http://localhost:8080/acceptance/create-project",
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
      throw error;
    }
  },

  fetchAgreementNumbers: async function (brand) {
    try {
      const response = await axios.get(
        `http://localhost:8080/acceptance/agrmntNumber?brand=${brand}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching agreement numbers:", error);
      toast.error("Error fetching agreement numbers");
      throw error;
    }
  },

  fetchAgreementData: async function (agreementNumber, selectedDate) {
    try {
      const response = await axios.get(
        `http://localhost:8080/acceptance/${agreementNumber}/${selectedDate}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching agreement data:", error);
      toast.error("Error fetching agreement data");
      throw error;
    }
  },

  // updateBilling: async function (formData) {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8080/acceptance/update-billing`,
  //       formData
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error updating billing:", error);
  //     toast.error("Error updating billing");
  //     throw error;
  //   }
  // },
};

export default ApiService;
