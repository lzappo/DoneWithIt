import { useState } from "react";
import logger from "../utility/logger";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

export default function useLogin() {
  const auth = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async ({ email, password }) => {
    try {
      setLoading(true);

      const result = await authApi.login(email, password);

      if (!result.ok) {
        const errorMessage =
          result.data?.error || "Invalid email and/or password.";
        setError(errorMessage);
        logger.log(`❗️ Login failed: ${errorMessage}`, result);
        return { success: false };
      }

      setError("");
      auth.logIn(result.data);
      return { success: true };
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      logger.log(`❗️ Unexpected error in login:`, error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
}
