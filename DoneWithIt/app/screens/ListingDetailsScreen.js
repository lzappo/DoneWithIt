import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../components/Text";
import { Image } from "react-native-expo-image-cache";

import ListItem from "../components/lists/ListItem";
import colors from "../config/colors";

function ListingDetailsScreen({ route }) {
  const listing = route.params;

  return (
    <View>
      <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnalUrl }}
        tint="light"
        uri={listing.images[0].url}
      />
      <View style={styles.detailsContainer}></View>
      <AppText style={styles.title}>{listing.title}</AppText>
      <AppText style={styles.price}>${listing.price}</AppText>
      <View style={styles.userContainer}>
        <ListItem
          image={require("../assets/lui.jpeg")}
          title="Lui Zappitelli"
          subTitle="5 Listings"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 10,
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
