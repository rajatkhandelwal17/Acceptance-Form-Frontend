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
};

export default ApiService;
