import { Text, View, TouchableOpacity, Alert } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Settings() {
  const navigation = useNavigation();

  const edit = () => {
    navigation.navigate("Editar");
  };
  function Terms() {
    navigation.navigate("Terms");
  }
  function Help() {
    navigation.navigate("Help");
  }
  function Problems() {
    navigation.navigate("Problems");
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Saiu da conta", "Te vemos em breve!");
      navigation.navigate("Welcome");
    } catch (error) {
      const errorMessage = error.message;
      Alert.alert("Erro ao sair", errorMessage);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        flex: 1,
        gap: 20,
      }}
    >
      <View className="px-7 pt-5">
        <Text style={styles.title1} className="mb-2">
          Conta
        </Text>
        <View className=" bg-[#f8f8f8] justify-center rounded-md py-1 px-5 gap-1">
          <TouchableOpacity
            className="flex-row items-center justify-between h-12"
            onPress={edit}
          >
            <View className="flex-row gap-3 items-center">
              <View
                style={{
                  backgroundColor: "#FFF",
                  padding: 2,
                  borderRadius: 6,
                  borderColor: "#e0e0e0",
                  borderWidth: 1,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="account-edit"
                  size={24}
                  color="#39B061"
                />
              </View>

              <Text style={styles.title}>Editar perfil</Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title1} className="mb-2 mt-5">
          Suporte
        </Text>
        <View className=" bg-[#f8f8f8] justify-center rounded-md py-1 px-5 gap-1">
          <TouchableOpacity
            className="flex-row items-center justify-between h-12 border-b border-gray-200"
            onPress={Help}
          >
            <View className="flex-row gap-3 items-center">
              <View
                style={{
                  backgroundColor: "#FFF",
                  padding: 2,
                  borderRadius: 6,
                  borderColor: "#e0e0e0",
                  borderWidth: 1,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Entypo name="help-with-circle" size={24} color="#39B061" />
              </View>

              <Text style={styles.title}>Ajuda e suporte</Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between h-12"
            onPress={Terms}
          >
            <View className="flex-row gap-3 items-center">
              <View
                style={{
                  backgroundColor: "#FFF",
                  padding: 2,
                  borderRadius: 6,
                  borderColor: "#e0e0e0",
                  borderWidth: 1,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="privacy-tip" size={24} color="#39B061" />
              </View>

              <Text style={styles.title}>Termos e Política de Privacidade</Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title1} className="mb-2 mt-5">
          Ações
        </Text>
        <View className=" bg-[#f8f8f8] justify-center rounded-md py-1 px-5 gap-1">
          <TouchableOpacity
            className="flex-row items-center justify-between h-12 border-b border-gray-200"
            onPress={Problems}
          >
            <View className="flex-row gap-3 items-center">
              <View
                style={{
                  backgroundColor: "#FFF",
                  padding: 2,
                  borderRadius: 6,
                  borderColor: "#e0e0e0",
                  borderWidth: 1,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="report-problem"
                  size={24}
                  color="#39B061"
                />
              </View>

              <Text style={styles.title}>Denuncie um problema</Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center justify-between h-12"
            onPress={handleLogout}
          >
            <View className="flex-row gap-3 items-center">
              <View
                style={{
                  backgroundColor: "#FFF",
                  padding: 2,
                  borderRadius: 6,
                  borderColor: "#e0e0e0",
                  borderWidth: 1,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Entypo name="log-out" size={24} color="#39B061" />
              </View>

              <Text style={styles.title}>Sair</Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title1: {
    fontWeight: "300",
    fontSize: 13,
    color: "#5a5a5a",
  },
  title: {
    color: "#18241B",
    fontSize: 15,
    fontWeight: "400",
  },
});
