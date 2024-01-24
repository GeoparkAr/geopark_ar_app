import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { signInAnonymously } from "firebase/auth";

export default function Welcome() {
  const navigation = useNavigation();

  const handleAnonymousLogin = async () => {
    await signInAnonymously(auth)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const login = () => {
    navigation.navigate("Login");
  };

  const Register = () => {
    navigation.navigate("Register");
  };

  return (
    <View className="bg-[#39B061] flex-1">
      <ImageBackground
        source={require("../../assets/imgs/background.png")}
        className=" relative justify-between items-center pt-16 flex-1"
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
        >
          <Image
            source={require("../../assets/imgs/logo.png")}
            style={{ width: 160, height: 160 }}
          />
          <Text style={{ color: "#fff", fontSize: 14 }}>Bem-vindo ao</Text>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>
            Geopark AR
          </Text>
        </View>

        <View style={styles.containerbuttons}>
          <TouchableOpacity style={styles.googleButton} className="w-[80vw]">
            <Text style={styles.googleText}>Entrar com o Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.greenButton}
            onPress={login}
            className="w-[80vw]"
          >
            <Text style={styles.greenText}>Entrar com email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[80vw]"
            style={styles.greenButton}
            onPress={Register}
          >
            <Text style={styles.greenText}>Criar conta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[80vw]"
            style={styles.visitanteButton}
            onPress={handleAnonymousLogin}
          >
            <Text style={styles.textVisitantes}>Entrar como visitante</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: null,
    flexGrow: 1,
  },
  containerImg: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 100,
  },
  logo: {
    width: 147,
    height: 177,
  },
  containerbuttons: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    gap: 11,
    paddingVertical: 20,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  googleButton: {
    backgroundColor: "#111111",
    flexDirection: "row",
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  googleText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  greenButton: {
    backgroundColor: "#3EB25EB2",
    flexDirection: "row",
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  greenText: {
    color: "#2D2D2D",
    fontWeight: "700",
    fontSize: 14,
  },
  visitanteButton: {
    backgroundColor: "transparent",
    flexDirection: "row",
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C1C1C1",
    borderWidth: 1,
  },
  textVisitantes: {
    color: "#2D2D2D",
    fontWeight: "700",
    fontSize: 14,
  },
});
