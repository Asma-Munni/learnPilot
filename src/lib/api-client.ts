import axios from "axios";

function getBaseURL(): string {
  const rawUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  if (!rawUrl) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "❌ [apiClient Error] NEXT_PUBLIC_SERVER_URL is missing in production environment variables!"
      );
      throw new Error(
        "Missing NEXT_PUBLIC_SERVER_URL environment variable in production configuration."
      );
    }
    // Safe default fallback for local development
    return "http://localhost:5000";
  }

  // Normalize trailing slashes to avoid double-slash paths (e.g. //api)
  return rawUrl.trim().replace(/\/$/, "");
}

export const apiClient = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to categorize API error conditions
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        if (error.code === "ERR_NETWORK" || error.message.includes("Network Error")) {
          console.error("❌ Network Failure or CORS Block:", error.message);
        } else {
          console.error("❌ Connection Failed:", error.message);
        }
      } else {
        const status = error.response.status;
        if (status === 401) {
          console.warn("🔒 Unauthorized access (401): Authentication required or session expired.");
        } else if (status === 404) {
          console.warn("🔍 Requested API resource not found (404).");
        } else if (status >= 500) {
          console.error(`💥 Internal Server Error (${status}):`, error.response.data);
        }
      }
    }
    return Promise.reject(error);
  }
);