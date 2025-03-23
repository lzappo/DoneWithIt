import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export default function useNotificationHandler() {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, []);
}
