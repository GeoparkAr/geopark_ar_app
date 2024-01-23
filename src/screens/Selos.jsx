import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function Selos() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setAuthChecked(true);
    });
    console.log(user);
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView className="bg-white p-4 relative">
      {user && !user.isAnonymous ? (
        <View className="bg-[#39B061] rounded-[10px] flex-row justify-around items-center relative p-3 h-48">
          <Image source={require("../../assets/imgs/selo.png")} />
          <View className="justify-center">
            <Text className=" text-white font-bold">
              Colina do Horto
            </Text>
            <Text className="text-xs text-white min-w-fit text-justify w-44">
              A Colina do Horto é um local religioso associado ao Padre Cícero.
              Abriga a estátua do Padim Ciço, centro de devoção e peregrinação
              de fiéis que acreditam em milagres associados ao religioso.
            </Text>
            <TouchableOpacity
              className=" bg-[#F2F2F2] w-10 h-10 flex-row absolute flex justify-center items-center rounded-full right-0 -top-7"
              onPress={()=> Linking.openURL('https://drive.google.com/uc?export=download&id=1MGOSEP8U2OxMn-3viRcOpIUxDSc2ZYCW')}
            >
              <FontAwesome5 name="download" size={20} color="#1A4E38" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="bg-[#39B061] rounded-[10px] justify-around items-center relative p-3">
          <Text className="text-white min-w-fit text-justify mb-3">
            Recompensas disponíveis apenas para usuários registrados.
          </Text>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFF",
              shadowColor: "#000",
              padding: 10,
              width: "auto",
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate("Welcome")}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#18241B",
                fontWeight: "bold",
              }}
            >
              Entrar na minha conta
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
