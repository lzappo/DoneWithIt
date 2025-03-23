import React from "react";
import { Keyboard, Alert } from "react-native";
import * as Notifications from "expo-notifications";

import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import { SubmitButton } from "./forms";
import messagesApi from "../api/messages";
import { messageValidationSchema } from "../validations/validation";

function ContactSellerForm({ listing }) {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.send(message, listing.id);

    if (!result.ok) {
      return Alert.alert("Error", "Could not send the message to the seller.");
    }

    resetForm();

    const requestNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== "granted") {
        alert(
          "Permission for notifications was denied. Enable it in settings."
        );
        return false;
      }

      return true;
    };

    const hasPermission = await requestNotificationPermission();

    if (!hasPermission) return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Awesome!",
        body: "Your message was sent to the seller.",
      },
      trigger: null,
    });
  };

  return (
    <Form
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={messageValidationSchema}
    >
      <FormField
        name="message"
        placeholder="Message..."
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
      />

      <SubmitButton
        title="Contact Seller"
        onPress={handleSubmit}
        color="primary"
      />
    </Form>
  );
}

export default ContactSellerForm;
