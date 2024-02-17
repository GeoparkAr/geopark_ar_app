import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export default function VisitorToUserRegister() {
  const {
    data: { user, docRef },
    setUser,
  } = useAuth();

  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [visitorData, setVisitorData] = useState(null);

  const getVisitorData = async () => {
    const docSnap = await getDoc(docRef);
    setVisitorData(docSnap.data());
  };

  useEffect(() => {
    getVisitorData();
  }, []);

  const handleSignupWithEmailAndPassword = async () => {
    //verificar se as informações inseridas pelo usuário são válidas
    if (!validateEmail(email)) {
      Alert.alert("Erro", "Digite um email válido");
    } else if (senha.length < 6) {
      Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres");
    } else if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem");
    } else if (nome.length < 2) {
      Alert.alert("Erro", "Preencha todos os campos corretamente");
    } else {
      //envia dados para o firebase
      const credential = EmailAuthProvider.credential(email, senha);
      //transforma usuário anônimo em usuário com email e senha
      await linkWithCredential(user, credential)
        .then(async (usercred) => {
          const newUser = usercred.user;
          await updateProfile(newUser, { displayName: nome })
            .then(() => {})
            .catch((error) => {
              const errorMessage = error.message;
              Alert.alert("Erro ao atualizar nome", errorMessage);
            });
          await setDoc(doc(db, "users", user.uid), {
            uid: visitorData.uid,
            stamps: visitorData.stamps,
            lastVisit: visitorData.lastVisit,
            displayName: newUser.displayName,
            email: newUser.email,
          })
            .then(() => {})
            .catch((error) => {
              const errorMessage = error.message;
              Alert.alert("Erro ao criar novo documento no BD", errorMessage);
            });
          await deleteDoc(doc(db, "visitors", newUser.uid))
            .then(() => {})
            .catch((error) => {
              const errorMessage = error.message;
              Alert.alert(
                "Erro ao excluir documento de visitante do BD",
                errorMessage
              );
            });
          setUser(newUser);
          navigation.navigate("Home");
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert("Erro ao criar conta", errorMessage);
        });
    }
  };

  const handleSignupWithGoogle = async () => {
    const credential = GoogleAuthProvider.credential(
      googleUser.getAuthResponse().id_token
    );
    await linkWithCredential(user, credential)
      .then(async (usercred) => {
        const newUser = usercred.user;
        await updateProfile(newUser, { displayName: nome })
          .then(() => {})
          .catch((error) => {
            const errorMessage = error.message;
            Alert.alert("Erro ao atualizar nome", errorMessage);
          });
        await setDoc(doc(db, "users", user.uid), {
          uid: visitorData.uid,
          stamps: visitorData.stamps,
          lastVisit: visitorData.lastVisit,
          displayName: newUser.displayName,
          email: newUser.email,
        })
          .then(() => {})
          .catch((error) => {
            const errorMessage = error.message;
            Alert.alert("Erro ao criar novo documento no BD", errorMessage);
          });
        await deleteDoc(doc(db, "visitors", newUser.uid))
          .then(() => {})
          .catch((error) => {
            const errorMessage = error.message;
            Alert.alert(
              "Erro ao excluir documento de visitante do BD",
              errorMessage
            );
          });
        setUser(newUser);
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Erro ao criar conta", errorMessage);
      });
  };

  //validar email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const Login = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView className="bg-white">
      <View className="h-full py-7 px-7 bg-white">
        <View>
          <TextInput
            placeholder="Nome Completo"
            style={styles.input}
            className="mb-5 pl-3"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            className="mb-5 pl-3"
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Senha"
            style={styles.input}
            className="mb-5 pl-3"
            onChangeText={(text) => setSenha(text)}
            secureTextEntry
          />
          <TextInput
            placeholder="Confirmar senha"
            style={styles.input}
            className="mb-5 pl-3"
            value={confirmarSenha}
            onChangeText={(text) => setConfirmarSenha(text)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className="h-14 rounded-[10px] flex justify-center items-center w-full bg-[#287D44] mt-7"
          onPress={handleSignupWithEmailAndPassword}
        >
          <Text style={styles.textButton}>Criar conta</Text>
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

        {/* <TouchableOpacity 
        className="flex flex-row items-center justify-center h-10 rounded-[10px] border-[#18241B] border mb-16"
        onPress={handleSignupWithGoogle}
        >
          <Image
            source={require("../../assets/imgs/icons/google.png")}
            className="mr-3"
          />
          <Text style={styles.textGoogle}>Criar com Google</Text>
        </TouchableOpacity> */}
        <View className="flex flex-row justify-center items-center gap-1 mb-5">
          <Text className="text-sm font-semibold">Já possui uma conta? </Text>
          <TouchableOpacity onPress={Login}>
            <Text className="text-sm font-semibold text-[#40CC6F]">Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    fontWeight: "600",
    fontSize: 16,
    color: "#C5C5C5",
    marginHorizontal: 28,
  },
  textButton: {
    fontWeight: "700",
    fontSize: 16,
    color: "#FFF",
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
    fontWeight: "700",
    fontSize: 14,
    color: "#18241B",
  },
  title: {
    fontWeight: "700",
  },
});
