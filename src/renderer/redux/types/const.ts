export const APIBaseURI = "http://localhost:5000";
export const cookiesConfig = { withCredentials: true };
export const axiosPostConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  ...cookiesConfig,
};
