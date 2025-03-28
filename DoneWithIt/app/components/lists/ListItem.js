import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableHighlight, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import colors from "../../config/colors";
import AppText from "../Text";

function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  swipeable = true,
}) {
  const content = (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {image && <Image style={styles.image} source={image} />}
        <View style={styles.detailsContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          {subTitle && (
            <AppText style={styles.subTitle} numberOfLines={2}>
              {subTitle}
            </AppText>
          )}
        </View>
        <MaterialCommunityIcons
          color={colors.medium}
          name="chevron-right"
          size={25}
        />
      </View>
    </TouchableHighlight>
  );

  return swipeable ? (
    <ReanimatedSwipeable
      renderRightActions={renderRightActions}
      overshootRight={false}
      dragOffsetFromRightEdge={5}
      friction={2}
    >
      {content}
    </ReanimatedSwipeable>
  ) : (
    content
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;
