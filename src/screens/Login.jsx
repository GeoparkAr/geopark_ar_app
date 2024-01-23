import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Alert,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigation = useNavigation();

  const Register = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert("Erro", "Digite um email válido");
    } else if (senha.length < 6) {
      Alert.alert("Erro", "Insira sua senha");
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, senha);
        // Loged in 
        navigation.navigate("Home");
      } catch (error) {
        const errorMessage = error.message;
        Alert.alert("Erro ao fazer login", "Email ou senha inválidos");
      }
    }
  };
  

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <View className="bg-white h-full pt-4">
      <ScrollView className="px-8 bg-white">
        <TextInput
          placeholder="Email"
          style={styles.input}
          className="mb-5 pl-3"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          className="mb-5 pl-3"
          secureTextEntry
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />
        <Text style={styles.text}>Esqueceu a senha?</Text>

        <TouchableOpacity
          className="h-14 rounded-[10px] flex justify-center items-center w-full bg-[#39B061]"
          onPress={handleLogin}
        >
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
        <View
          className="flex justify-center items-center mt-9 mb-9"
          style={styles.container}
        >
          <View style={styles.leftLine}></View>
          <Text
            style={styles.text2}
            className="mx-2 text-center items-center justify-center self-center"
          >
            ou
          </Text>
          <View style={styles.rightLine}></View>
        </View>

        <TouchableOpacity className="flex flex-row items-center justify-center h-10 rounded-[10px] border-[#18241B] border mb-16">
          <Image source={require("../../assets/imgs/icons/google.png")}  className="mr-3"/>
          <Text style={styles.textGoogle}>Entrar com Google</Text>
        </TouchableOpacity>
        <View className="flex flex-row justify-center items-center gap-1">
          <Text className="text-sm font-semibold">Não tem uma conta? </Text>
          <TouchableOpacity onPress={Register}><Text className="text-sm font-semibold text-[#40CC6F]">Criar conta</Text></TouchableOpacity>
        </View>
        
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
  textGoogle:{
    fontWeight: "600",
    fontSize: 14,
    color: "#18241B",
  },
  title:{
    fontWeight: "600",
  }
});
