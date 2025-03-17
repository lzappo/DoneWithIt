import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import AuthContext from "./app/auth/context";
import OfflineNotice from "./app/components/OfflineNotice";
import useAuthSplashScreen from "./app/auth/useAuthSplashScreen";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";

export default function App() {
  const [user, setUser] = useState();
  const isReady = useAuthSplashScreen(setUser);

  if (!isReady) return null;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OfflineNotice />
        <NavigationContainer theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthContext.Provider>
  );
}
