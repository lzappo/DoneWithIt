import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";

import expoPushTokensApi from "../api/expoPushTokens";

export default function usePushNotifications() {
  const notificationListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync();

    // Foreground notifications
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        Alert.alert(
          notification.request.content.title,
          notification.request.content.body
        );
      });

    // Clean up listener
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Permission Required", "Enable notifications in settings.");
      return;
    }

    try {
      const token = await Notifications.getExpoPushTokenAsync();
      expoPushTokensApi.register(token);

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    } catch (error) {
      console.log("Error getting push token:", error);
    }
  };

  // Background Notification Configuration
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}
