import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import { useState, useEffect } from "react";

export default function MissaoTree() {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(true);

  //verifica se há conexão com internet
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //navegando para o link da câmera
  const navigateToCamera = () => {
    navigation.navigate("Camera", {
      url: "https://web-geoparkcamera-ten.vercel.app/",
    });
  };

  return (
    <ScrollView className=" bg-white">
      {isConnected ? (
        <View className="flex flex-col justify-around items-center h-[90vh]">
          <Image
            source={require("../../../assets/imgs/missoes/murodaresistencia.png")}
            style={{ width: 200, height: 200 }}
          />
          <View style={{justifyContent: "center", alignItems: "center", gap: 20}}>
            <Text style={styles.textCamera}>
              Clique na câmera e comece a explorar
            </Text>
            <TouchableOpacity onPress={navigateToCamera}>
              <Image
                source={require("../../../assets/imgs/icons/camera.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="flex flex-col justify-center items-center h-[90vh] gap-1">
          <Text className="text-red-600">Erro:</Text>
          <Text style={styles.textCamera}>Sem conexão com a internet</Text>
        </View>
      )}
    </ScrollView>
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
