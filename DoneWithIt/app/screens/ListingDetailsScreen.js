import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import AppText from "../components/Text";
import { Image } from "react-native-expo-image-cache";

import ListItem from "../components/lists/ListItem";
import colors from "../config/colors";
import ContactSellerForm from "../components/ContactSellerForm";

function ListingDetailsScreen({ route }) {
  const listing = route.params;

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnalUrl }}
        tint="light"
        uri={listing.images[0].url}
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.price}>${listing.price}</AppText>
        <AppText style={styles.description}>{listing.description}</AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/lui.jpeg")}
            title="Lui Zappitelli"
            subTitle="5 Listings"
          />
        </View>
        <ContactSellerForm listing={listing} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 10,
  },
  description: {
    fontSize: 16,
    color: colors.medium,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 33,
  },
});

export default ListingDetailsScreen;
