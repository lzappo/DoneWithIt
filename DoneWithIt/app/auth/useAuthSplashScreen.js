import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import authStorage from "./storage";

SplashScreen.preventAutoHideAsync();

export default function useAuthSplashScreen(setUser) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadResourcesAndData = async () => {
      try {
        const user = await authStorage.getUser();
        if (user) setUser(user);
      } catch (error) {
        console.error("Error restoring user", error);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    loadResourcesAndData();
  }, []);

  return isReady;
}
