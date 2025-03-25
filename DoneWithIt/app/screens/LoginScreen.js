import { useState } from "react";
import { Image, StyleSheet } from "react-native";

import useLogin from "../hooks/useLogin";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import Screen from "../components/Screen";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import { loginValidationSchema } from "../validations/validation";
import ActivityIndicator from "../components/ActivityIndicator";

function LoginScreen(props) {
  const { login, error, loading } = useLogin();

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />

        <Form
          initialValues={{ email: "", password: "" }}
          onSubmit={login}
          validationSchema={loginValidationSchema}
        >
          <ErrorMessage error={error} visible={!!error} />

          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />

          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />

          <SubmitButton title="Login" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
