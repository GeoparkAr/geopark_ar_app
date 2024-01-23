import { TouchableOpacity, View, StyleSheet, Image } from "react-native";

export default function Custombutton({ onPress, disabled, icon, backgroundOption }) {
  const isDisabled = disabled || false;
  let backgroundColor, containerViewBackgroundColor;

  switch (backgroundOption) {
    case "yellow":
      backgroundColor = isDisabled ? "#8F8F8F" : "#18241B";
      containerViewBackgroundColor = isDisabled ? "#C7C6C6" : "#0E4F34";
      break;
    case "green":
      backgroundColor = isDisabled ? "#8F8F8F" : "#287D44";
      containerViewBackgroundColor = isDisabled ? "#C7C6C6" : "#39B061";
      break;
    default:
      backgroundColor = isDisabled ? "#8F8F8F" : "#287D44";
      containerViewBackgroundColor = isDisabled ? "#C7C6C6" : "#39B061";
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container(backgroundColor)}
      disabled={isDisabled}
    >
      <View style={styles.containerView(containerViewBackgroundColor)}>
        <Image source={icon} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    width: 70,
    height: 74,
    borderRadius: 63,
    backgroundColor,
  }),
  containerView: (backgroundColor) => ({
    width: 70,
    height: 68,
    borderRadius: 60,
    justifyContent: "center",
    backgroundColor,
    alignItems: "center",
  }),
});
