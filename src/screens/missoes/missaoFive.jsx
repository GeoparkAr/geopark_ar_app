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
import {
  LocationObject,
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { distance } from "../../../dist";
import geoloc from "../../../geoloc.json";
import { updateDoc } from "firebase/firestore";

export default function MissaoTree() {
  let dista;
  const [location, setlocation] = useState(null);
  async function resquestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      console.log("LOCALIZAÇÂO: ", currentPosition);
      dista = distance(
        geoloc[7][0],
        geoloc[7][1],
        Number(currentPosition.coords.latitude),
        Number(currentPosition.coords.longitude)
      );
      setlocation(currentPosition);
    } else {
      console.log("Não tem localização");
    }
  }

  resquestLocationPermissions();

  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(true);

  const {
    data: { docRef },
  } = useAuth();

  //verifica se há conexão com internet
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //muda status da missão
  const handleMissionSave = async () => {
    await updateDoc(docRef, {
      "stamps.geoparkAraripe.mission5": true,
    })
      .then(() => {})
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Erro ao atualizar BD", errorMessage);
      });
  }

  //navegando para o link da câmera
  const navigateToCamera = () => {
    if (dista > 100) {
      navigation.navigate("Camera", {
        url: "https://web-geoparkcamera-ten.vercel.app/",
      });
      handleMissionSave();
    }
  };

  return (
    <ScrollView className=" bg-white">
      {isConnected ? (
        <View className="flex flex-col justify-around items-center h-[90vh]">
          <Image
            source={require("../../../assets/imgs/missoes/igrejadebomjesus.png")}
            style={{ width: 200, height: 200 }}
          />
          <View
            style={{ justifyContent: "center", alignItems: "center", gap: 20 }}
          >
            {location &&
            location.coords &&
            distance(
              geoloc[7][0],
              geoloc[7][1],
              Number(location.coords.latitude),
              Number(location.coords.longitude)
            ) < 100 ? (
              <View className="justify-center items-center">
                <Text style={styles.textCamera}>
                  Clique na câmera e comece a explorar
                </Text>
                <TouchableOpacity onPress={navigateToCamera}>
                  <Image
                    source={require("../../../assets/imgs/icons/camera.png")}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View className="justify-center items-center">
                <Text className="text-red-700 font-bold text-2xl text-center">
                  Muito longe.
                </Text>
                <Text className="font-bold text-xl text-center">
                  {location &&
                    (
                      distance(
                        geoloc[7][0],
                        geoloc[7][1],
                        Number(location.coords.latitude),
                        Number(location.coords.longitude)
                      ) / 1000
                    ).toFixed(2)}{" "}
                  km
                </Text>
              </View>
            )}
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
