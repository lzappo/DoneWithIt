import React from "react";
import { StyleSheet } from "react-native";
import { registerValidationSchema } from "../validations/validation";

import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import ErrorMessage from "../components/forms/ErrorMessage";
import useRegister from "../hooks/useRegister";

function RegisterScreen(props) {
  const { register, error, loading } = useRegister();

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={register}
          validationSchema={registerValidationSchema}
        >
          <ErrorMessage error={error} visible={!!error} />

          <FormField
            icon="account"
            name="name"
            placeholder="Name"
            autoCorrect={false}
          />
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
          <SubmitButton title="Register" color="primary" />
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

export default RegisterScreen;
