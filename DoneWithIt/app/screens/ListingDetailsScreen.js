import React from "react";
import { Image, View, StyleSheet } from "react-native";
import AppText from "../components/Text";

import ListItem from "../components/lists/ListItem";
import colors from "../config/colors";

function ListingDetailsScreen(props) {
  return (
    <View>
      <Image style={styles.image} source={require("../assets/jacket.jpg")} />
      <View style={styles.detailsContainer}></View>
      <AppText style={styles.title}>Red Jacket for sale</AppText>
      <AppText style={styles.price}>$100</AppText>
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
