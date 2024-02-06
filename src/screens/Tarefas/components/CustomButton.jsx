import { TouchableOpacity, View, StyleSheet, Image } from "react-native";

//propriedades que devem ser importadas
export default function CustomButton({
  onPress,
  disabled,
  icon,
  backgroundOption,
}) {
  const isDisabled = disabled;
  let backgroundColor, containerViewBackgroundColor;

  switch (backgroundOption) {
    case "yellow":
      backgroundColor = isDisabled ? "#8F8F8F" : "#18241B";
      containerViewBackgroundColor = isDisabled ? "#C7C6C6" : "#46A302";
      break;
    case "green":
      backgroundColor = isDisabled ? "#8F8F8F" : "#46A302";
      containerViewBackgroundColor = isDisabled ? "#C7C6C6" : "#58CC02";
      break;
    default:
      backgroundColor = isDisabled ? "#8F8F8F" : "#46A302";
      containerViewBackgroundColor = isDisabled ? "#C7C6C6" : "#58CC02";
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container(backgroundColor)}
      disabled={isDisabled}
    >
      <View style={styles.containerView(containerViewBackgroundColor)}>
        <Image source={icon} style={{width: 40, height: 40}}/>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    width: 80,
    height: 80,
    borderRadius: 70,
    backgroundColor,
    alignItems: "center"
  }),
  containerView: (backgroundColor) => ({
    width: 78,
    height: 72,
    borderRadius: 60,
    justifyContent: "center",
    backgroundColor,
    alignItems: "center",
  }),
});
