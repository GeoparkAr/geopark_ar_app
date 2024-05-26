import { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function NewPassword() {
  const [email, setEmail] = useState("");

  const handlePasswordResetEmail = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      Alert.alert("Link enviado", "Enviamos para o seu email um link para redefinião de senha.");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert(
        "Erro ao atualizar senha",
        "Verifique se o email está correto e tente novamente\n\n" + errorCode + "\n" + errorMessage
      );
    });


  }

  return (
    <View className="bg-white h-full pt-4">
      <ScrollView className="px-8 bg-white">
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            color: "#18241B",
            textAlign: "justify",
            marginVertical: 10,
          }}
        >
          Confirme seu email para receber um link de redefinição de senha
        </Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          className="mb-5 pl-3"
          onChangeText={(text) => setEmail(text)}
        />

        <TouchableOpacity
          className="h-14 rounded-[10px] flex justify-center items-center w-full bg-[#0B69B4] mt-8"
          onPress={handlePasswordResetEmail}
          >
          <Text style={styles.textButton}>Confirmar</Text>
        </TouchableOpacity>
       
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    height: 55,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#18241B",
    color: "#18241B",
  },
  text: {
    fontSize: 14,
    marginBottom: 48,
    color: "#18241B",
    alignSelf: "flex-end",
  },
  text2: {
    fontSize: 16,
    color: "#C5C5C5",
    marginHorizontal: 28,
  },
  textButton: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "700",
  },
  view: {
    height: 1,
    backgroundColor: "#C5C5C5",
    flex: 1,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftLine: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
    marginRight: 5,
  },
  rightLine: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
    marginLeft: 5,
  },
  textGoogle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#18241B",
  },
  title: {
    fontWeight: "600",
  },
});
