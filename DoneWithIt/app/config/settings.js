import * as Updates from "expo-updates";

const settings = {
  dev: {
    apiUrl: "http://10.0.0.142:9000/api",
  },
  staging: {
    apiUrl: "http://10.0.0.142:9000/api",
  },
  prod: {
    apiUrl: "http://10.0.0.142:9000/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Updates.channel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
