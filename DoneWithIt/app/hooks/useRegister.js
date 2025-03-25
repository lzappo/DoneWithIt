import { useState } from "react";
import logger from "../utility/logger";
import registerApi from "../api/users";
import loginApi from "../api/auth";
import useAuth from "../auth/useAuth";

export default function useRegister() {
  const auth = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (userInfo) => {
    try {
      setLoading(true);

      const result = await registerApi.register(userInfo);

      if (!result.ok) {
        const errorMessage =
          result.data?.error || "An unexpected error occurred.";
        setError(errorMessage);
        logger.log(`❗️ Registration failed: ${errorMessage}`, result);
        return { success: false };
      }

      const { data: authToken } = await loginApi.login(
        userInfo.email,
        userInfo.password
      );

      if (!authToken) {
        setError("Login failed. Please try again.");
        logger.log(`❗️ Login failed after registration`, result);
        return { success: false };
      }

      auth.logIn(authToken);
      return { success: true };
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      logger.log(`❗️ Unexpected error in registration:`, error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { register, error, loading };
}
