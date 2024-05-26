import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";

export default function About() {
  return (
    <ScrollView style={{ backgroundColor: "#FFF" }}>
      <View className="px-7 justify-center py-3">
        <View className="self-center"></View>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textoparceiros: {
    color: "#18241B",
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "700",
    marginBottom: 27,
  },
  containerimg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 105.701,
    height: 72,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerparceiros: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
  },
  img1: {
    width: 96.973,
    height: 67.895,
  },
  img2: {
    width: 91.74,
    height: 29,
  },
  img3: {
    width: 80.771,
    height: 59,
  },
  img4: {
    width: 84.76,
    height: 62,
  },
  img5: {
    width: 73.791,
    height: 56,
  },
  img6: {
    width: 80,
    height: 66,
  },
  img7: {
    width: 40,
    height: 55,
  },
  img7: {
    width: 40,
    height: 55,
  },
  logo: {
    width: 147,
    height: 177,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
  },
});
