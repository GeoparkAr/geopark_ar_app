import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { signInAnonymously } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Welcome() {
  const navigation = useNavigation();

  const handleAnonymousLogin = async () => {
    await signInAnonymously(auth)
      .then(async () => {
        const user = auth.currentUser;
        await setDoc(doc(db, "visitors", user.uid), {
          uid: user.uid,
          stamps: {
            geoparkAraripe: {
              mission1: false,
              mission2: false,
            },
          },
          lastVisit: {},
        });
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
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
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../../assets/imgs/icon2.png")}
            style={{ width: 130, height: 130, marginTop: 15 }}
          />
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "800" }}>
            Turismo e Tecnologia
          </Text>
        </View>

        <View style={styles.containerbuttons}>
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
    paddingVertical: 40,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  greenButton: {
    backgroundColor: "#0B69B4",
    flexDirection: "row",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  greenText: {
    color: "#FFF",
    fontWeight: "500",
    fontSize: 14,
  },
  visitanteButton: {
    backgroundColor: "transparent",
    flexDirection: "row",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C1C1C1",
    borderWidth: 1,
  },
  textVisitantes: {
    color: "#2D2D2D",
    fontWeight: "500",
    fontSize: 14,
  },
});
