import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";

import expoPushTokensApi from "../api/expoPushTokens";
import navigation, { navigationRef } from "../navigation/rootNavigation";

export default useNotifications = () => {
  //useRef ensures proper cleanup and prevents multiple listeners
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotifications();

    // navigate to the account screen when the user taps notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );

    // Clean up listener
    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleNotificationResponse = (response) => {
    const message = response?.notification?.request?.content?.body;

    if (!message) return;

    const screenMap = {
      default: "Account",
    };

    const screenToNavigate = screenMap["default"] || "Account";

    //checks to see if in foreground first, then ensures background functionality
    if (navigationRef.isReady()) {
      navigation.navigate(screenToNavigate);
    } else {
      const unsubscribe = navigationRef.current?.addListener("state", () => {
        if (navigationRef.isReady()) {
          navigation.navigate(screenToNavigate);
          unsubscribe(); // Prevent listener from persisting
        }
      });
    }
  };

  const registerForPushNotifications = async () => {
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
      console.log(token);

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
};
