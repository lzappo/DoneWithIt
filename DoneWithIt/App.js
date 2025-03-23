import { NavigationContainer } from "@react-navigation/native";
import { React, useState } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import AuthContext from "./app/auth/context";
import OfflineNotice from "./app/components/OfflineNotice";
import useAuthSplashScreen from "./app/auth/useAuthSplashScreen";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import { navigationRef } from "./app/navigation/rootNavigation";
import useNotificationHandler from "./app/hooks/useNotificationHandler";

export default function App() {
  useNotificationHandler();
  const [user, setUser] = useState();
  const isReady = useAuthSplashScreen(setUser);

  if (!isReady) return null;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OfflineNotice />
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthContext.Provider>
  );
}
