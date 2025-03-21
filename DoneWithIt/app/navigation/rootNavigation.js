import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  } else {
    console.log("Navigation not ready yet. Waiting...");

    const unsubscribe = navigationRef.current?.addListener("state", () => {
      if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
        unsubscribe(); // Prevent listener from persisting
      }
    });
  }
};

export default {
  navigate,
};
