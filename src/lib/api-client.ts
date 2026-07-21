import axios from "axios";

// Public API client targeting direct backend URL for unauthenticated public catalog lookups
function getPublicBaseURL(): string {
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
    return "http://localhost:5000";
  }

  return rawUrl.trim().replace(/\/$/, "");
}

export const publicApiClient = axios.create({
  baseURL: getPublicBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Protected API client targeting same-origin Next.js BFF proxy (/api/backend)
export const protectedApiClient = axios.create({
  baseURL: "/api/backend",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Default export alias for backward compatibility with public endpoints
export const apiClient = publicApiClient;

// Response error logging interceptor
const errorInterceptor = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      console.error("❌ Connection or Network Failure:", error.message);
    } else {
      const status = error.response.status;
      if (status === 401) {
        console.warn("🔒 Unauthorized access (401): Session missing or invalid.");
      } else if (status === 403) {
        console.warn("🚫 Access Denied (403): Insufficient role permissions.");
      } else if (status === 404) {
        console.warn("🔍 Requested API resource not found (404).");
      } else if (status >= 500) {
        console.error(`💥 Internal Server Error (${status}):`, error.response.data);
      }
    }
  }
  return Promise.reject(error);
};

publicApiClient.interceptors.response.use((res) => res, errorInterceptor);
protectedApiClient.interceptors.response.use((res) => res, errorInterceptor);