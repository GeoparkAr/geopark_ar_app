import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Missao() {
  const navigation = useNavigation();

  const navigateToCamera = () => {
    navigation.navigate("Camera", {
      url: "https://web-geoparkcamera-ten.vercel.app/",
    });
  };
  
  return (
    <View className=" bg-white">
      <View className="flex flex-col justify-around items-center h-[90vh]">
        <Text style={styles.textCamera}>
          Clique na câmera e comece a explorar
        </Text>
        <Image
          source={require("../../../assets/imgs/boy.png")}
          style={styles.img}
        />

        <TouchableOpacity onPress={navigateToCamera}>
          <Image source={require("../../../assets/imgs/icons/camera.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    gap: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  textParagrafo: {
    width: 261,
    color: "#18241B",
    textAlign: "justify",
    fontWeight: "500",
    fontSize: 14,
  },
  textTitle: {
    color: "#18241B",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
  },
  textCamera: {
    color: "#18241B",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 14,
    width: 142,
  },
  textCameraTwo: {
    color: "#18241B",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
  },
  containerCamera: {
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    position: "absolute",
    left: 20,
    top: 10,
    zIndex: 1000,
  },
});
