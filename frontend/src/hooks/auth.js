import apiClient from "./common";


export const loginUser = async ({ email, password }) => {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data; 
  } catch (error) {
    throw error.response?.data?.error || "Failed to login";
  }
};

export const signupUser = async ({ name, email, password }) => {
  try {
    const response = await apiClient.post("/auth/signup", { name, email, password });
    return response.data; 
  } catch (error) {
    throw error.response?.data?.error || "Failed to signup";
  }
};


export const logoutUser = async () => {
  try {
    const response = await apiClient.post("/auth/logout");
    return response.data; 
  } catch (error) {
    throw error.response?.data?.error || "Failed to logout";
  }
};
