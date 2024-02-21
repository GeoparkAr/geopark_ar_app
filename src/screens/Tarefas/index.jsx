import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import Custombutton from "./components/CustomButton";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { getDoc } from "firebase/firestore";
import CustomButton from "./components/CustomButton";
import LottieView from "lottie-react-native";
import { useAuth } from "../../hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import MapView, { Marker } from "react-native-maps";
import geoloc from "../../../geoloc.json";

export default function Tarefas() {
  const navigation = useNavigation();
  const [authChecked, setAuthChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [botao1Habilitado, setBotao1Habilitado] = useState(true);
  const [botao2Habilitado, setBotao2Habilitado] = useState(false);
  const [botao3Habilitado, setBotao3Habilitado] = useState(false);
  const [botao4Habilitado, setBotao4Habilitado] = useState(false);
  const [botao5Habilitado, setBotao5Habilitado] = useState(false);
  const [botao6Habilitado, setBotao6Habilitado] = useState(false);
  const [botao7Habilitado, setBotao7Habilitado] = useState(false);
  const [botao8Habilitado, setBotao8Habilitado] = useState(false);
  const [botao9Habilitado, setBotao9Habilitado] = useState(false);

  const [mapa, setMapa] = useState(false);
  const [congratulations, setCongratulations] = useState(false);

  const navigateToQuestionario = () => {
    navigation.navigate("PerguntaUm");
  };
  const navigateToMissao = () => {
    navigation.navigate("Missao");
  };
  const navigateToMissao3 = () => {
    navigation.navigate("MissaoTree");
  };
  const navigateToMissao4 = () => {
    navigation.navigate("MissaoFour");
  };
  const navigateToMissao5 = () => {
    navigation.navigate("MissaoFive");
  };
  const navigateToMissao6 = () => {
    navigation.navigate("MissaoSix");
  };
  const navigateToMissao7 = () => {
    navigation.navigate("MissaoSeven");
  };
  const navigateToMissao8 = () => {
    navigation.navigate("MissaoEight");
  };
  const navigateToSelo = () => {
    navigation.navigate("Selos");
  };

  const lottieRef = useRef(null);

  const handleButtonPress = () => {
    if (botao9Habilitado) {
      setCongratulations(true);
      setTimeout(() => {
        setCongratulations(false);
        navigateToSelo();
      }, 2000);
    }
  };

  //verificar se está logado e coletar o a ID do documento do usuário no BD
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  const checkAuthentication = async () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        setUser(authUser);
        setAuthChecked(true);
        resolve();
      });
      return () => unsubscribe();
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await checkAuthentication();
    };

    const getMissoesData = async () => {
      const docSnap = await getDoc(docRef);
      setBotao2Habilitado(docSnap.data().stamps.geoparkAraripe.mission1);
      setBotao3Habilitado(docSnap.data().stamps.geoparkAraripe.mission2);
      setBotao4Habilitado(docSnap.data().stamps.geoparkAraripe.mission3);
      setBotao5Habilitado(docSnap.data().stamps.geoparkAraripe.mission4);
      setBotao6Habilitado(docSnap.data().stamps.geoparkAraripe.mission5);
      setBotao7Habilitado(docSnap.data().stamps.geoparkAraripe.mission6);
      setBotao8Habilitado(docSnap.data().stamps.geoparkAraripe.mission7);
      setBotao9Habilitado(docSnap.data().stamps.geoparkAraripe.mission8);
    };

    const updateData = async () => {
      await fetchData();
      await getMissoesData();
    };
    updateData();

    const intervalId = setInterval(updateData, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  //mudando o estado dos botões
  const handleClick1 = () => {
    navigateToQuestionario();
  };

  const handleClick2 = async () => {
    navigateToMissao();
  };

  //se não estiver logado bloqueia os demais botões e chama o modal
  const handleClick3 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        navigateToMissao3();
      } else {
        setModalVisible(true);
      }
    }
  };

  const handleClick4 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        navigateToMissao4();
      } else {
        setModalVisible(true);
      }
    }
  };

  const handleClick5 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        navigateToMissao5();
      } else {
        setModalVisible(true);
      }
    }
  };

  const handleClick6 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        navigateToMissao6();
      } else {
        setModalVisible(true);
      }
    }
  };

  const handleClick7 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        navigateToMissao7();
      } else {
        setModalVisible(true);
      }
    }
  };

  const {
    data: { docRef },
  } = useAuth();

  const handleClick8 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        navigateToMissao8();
      }
    }
  };

  //animação do começar
  const [bounceAnimation] = useState(new Animated.Value(0));

  // Chamar carregarEstadoInicial ao iniciar a tela
  useEffect(() => {
    startBounceAnimation();
  }, []);

  const startBounceAnimation = () => {
    const bounceUp = Animated.timing(bounceAnimation, {
      toValue: 1.5,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    });

    const bounceDown = Animated.timing(bounceAnimation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    });

    const bounceSequence = Animated.sequence([bounceUp, bounceDown]);

    Animated.loop(bounceSequence, { iterations: -1 }).start();
  };

  function openMapa() {
    setMapa(true);
  }
  function closeMapa() {
    setMapa(false);
  }

  //mapa
  const [location, setLocation] = useState(null);

  const mapRef = useRef(MapView);

  async function resquestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    } 
  }

  useEffect(() => {
    resquestLocationPermissions();
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (response) => {
        setLocation(response);
      }
    );
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#FFF" }}>
      <View>
        <View className=" bg-[#39B061] mx-4 rounded-2xl px-5 py-5 mt-3 mb-5">
          <View className="flex-row justify-between items-center">
            <Text className=" text-xl font-bold text-white">
              Colina do Horto
            </Text>
            <TouchableOpacity
              onPress={openMapa}
              className=" border border-[#46A302] border-b-4 bg-[#58CC02]
            px-3 rounded-2xl flex-row justify-center items-center py-1"
            >
              <Entypo name="map" size={22} color="white" />
              <Text className="font-bold text-white text-sm ml-2">MAPA</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-white text-justify mt-3">
            A Colina do Horto é um local religioso associado ao Padre Cícero.
            Abriga a estátua do Padim Ciço, centro de devoção e peregrinação de
            fiéis que acreditam em milagres associados ao religioso.
          </Text>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView} className="relative">
              <TouchableOpacity
                className="absolute -top-2 right-2 bg-white rounded-full"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <AntDesign name="closecircleo" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalText}>
                Visitantes não têm acesso a esta missão.
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate("VisitorToUserRegister");
                }}
              >
                <Text style={styles.textStyle}>Criar conta</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={mapa}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!mapa);
          }}
        >
          <View className=" flex-1 justify-center items-center ">
            <View className=" items-center relative">
              <TouchableOpacity
                className="rounded-full bg-[#58CC02] p-1 absolute
              -top-4 right-3 z-20 justify-center items-center"
                onPress={closeMapa}
              >
                <Ionicons name="close-sharp" size={24} color="white" />
              </TouchableOpacity>
              {location && location.coords ? (
                <MapView
                  ref={mapRef}
                  showsPointsOfInterest="false"
                  className="w-64 h-96 rounded-lg"
                  style={{ borderRadius: 16 }}
                  initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    }}
                  />
                  <Marker
                    title="Cruzeiro "
                    coordinate={{
                      latitude: geoloc[0][0],
                      longitude: geoloc[0][1],
                    }}
                    image={require("../../../assets/imgs/mapa/crucifixo.png")}
                  />
                  <Marker
                    title="Igreja do Bom Jesus"
                    coordinate={{
                      latitude: geoloc[1][0],
                      longitude: geoloc[1][1],
                    }}
                    image={require("../../../assets/imgs/mapa/igreja.png")}
                  />
                  <Marker
                    title="Marco Do Padre Cicero"
                    coordinate={{
                      latitude: geoloc[2][0],
                      longitude: geoloc[2][1],
                    }}
                    image={require("../../../assets/imgs/mapa/padre.png")}
                  />
                  <Marker
                    title="Muro da Sedição "
                    coordinate={{
                      latitude: geoloc[3][0],
                      longitude: geoloc[3][1],
                    }}
                    image={require("../../../assets/imgs/mapa/muro.png")}
                  />
                  <Marker
                    title="Estatua do Padre Cícero"
                    coordinate={{
                      latitude: geoloc[4][0],
                      longitude: geoloc[4][1],
                    }}
                    image={require("../../../assets/imgs/mapa/estatua.png")}
                  />
                  <Marker
                    title="Pedra Do Pecado"
                    coordinate={{
                      latitude: geoloc[5][0],
                      longitude: geoloc[5][1],
                    }}
                    image={require("../../../assets/imgs/mapa/pedra.png")}
                  />
                  <Marker
                    title="Vitrais"
                    coordinate={{
                      latitude: geoloc[7][0],
                      longitude: geoloc[7][1],
                    }}
                    image={require("../../../assets/imgs/mapa/vitrais.png")}
                  />
                </MapView>
              ) : (
                <View

                  className="w-64 h-96 rounded-lg bg-white border border-stone-300 justify-center items-center"
                  style={{ borderRadius: 16 }}
                >
                  <ActivityIndicator size="large" color="#39B061" />
                </View>
              )}
            </View>
          </View>
        </Modal>
        <View className="bg-white justify-center items-center relative">
          <View style={styles.container}>
            <View style={styles.comecar}>
              <Animated.View
                style={[
                  styles.comecar,
                  {
                    transform: [
                      {
                        translateY: bounceAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 15],
                        }),
                      },
                    ],
                    zIndex: 1,
                  },
                ]}
              >
                <View style={styles.balaoContainer}>
                  <View style={styles.balao}>
                    <Text className="text-base font-bold text-[#58CC02]">
                      COMEÇAR
                    </Text>
                  </View>
                  <View style={styles.triangulo}>
                    <View style={styles.before}></View>
                  </View>
                </View>
              </Animated.View>
              <Custombutton
                icon={
                  botao1Habilitado
                    ? require("../../../assets/imgs/icons/bookGreen.png")
                    : require("../../../assets/imgs/icons/bookBw.png")
                }
                onPress={() => {
                  handleClick1();
                }}
              />
            </View>
            <View style={styles.buttonTwo}>
              <CustomButton
                onPress={handleClick2}
                disabled={!botao2Habilitado}
                icon={
                  botao2Habilitado
                    ? require("../../../assets/imgs/icons/estatuaGreen.png")
                    : require("../../../assets/imgs/icons/estatuaBw.png")
                }
              />
            </View>
            <View style={styles.buttonTree}>
              <CustomButton
                onPress={handleClick3}
                disabled={!botao3Habilitado}
                icon={
                  botao3Habilitado
                    ? require("../../../assets/imgs/icons/muroGreen.png")
                    : require("../../../assets/imgs/icons/muroBw.png")
                }
              />
            </View>
            <View style={styles.buttonFor}>
              <CustomButton
                onPress={handleClick4}
                disabled={!botao4Habilitado}
                icon={
                  botao4Habilitado
                    ? require("../../../assets/imgs/icons/igrejaGreen.png")
                    : require("../../../assets/imgs/icons/igrejaBw.png")
                }
              />
            </View>
            <View style={styles.buttonFive}>
              <CustomButton
                onPress={handleClick5}
                disabled={!botao5Habilitado}
                icon={
                  botao5Habilitado
                    ? require("../../../assets/imgs/icons/vitraisGreen.png")
                    : require("../../../assets/imgs/icons/vitraisBw.png")
                }
              />
            </View>
            <View style={styles.buttonSix}>
              <CustomButton
                onPress={handleClick6}
                disabled={!botao6Habilitado}
                icon={
                  botao6Habilitado
                    ? require("../../../assets/imgs/icons/crucifixoGreen.png")
                    : require("../../../assets/imgs/icons/crucifixoBw.png")
                }
              />
            </View>
            <View style={styles.buttonSeven}>
              <CustomButton
                onPress={handleClick7}
                disabled={!botao7Habilitado}
                icon={
                  botao7Habilitado
                    ? require("../../../assets/imgs/icons/pedraGreen.png")
                    : require("../../../assets/imgs/icons/pedraBw.png")
                }
              />
            </View>
            <View style={styles.buttonEight} className="">
              <CustomButton
                onPress={handleClick8}
                disabled={!botao8Habilitado}
                icon={
                  botao8Habilitado
                    ? require("../../../assets/imgs/icons/padreGreen.png")
                    : require("../../../assets/imgs/icons/padreBw.png")
                }
              />
            </View>
            <View style={styles.buttonNine} className="mb-10">
              {congratulations && (
                <View className="w-screen h-screen absolute">
                  <LottieView
                    ref={lottieRef}
                    source={require("../../../assets/animations/congratulations.json")}
                    autoPlay
                    loop
                    className="w-screen h-screen absolute"
                  />
                </View>
              )}
              <TouchableOpacity onPress={handleButtonPress}>
                <Image
                  source={
                    botao9Habilitado
                      ? require("../../../assets/imgs/icons/chestYellow.png")
                      : require("../../../assets/imgs/icons/chestbig.png")
                  }
                  className="w-20 h-20"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  textHeader: {
    color: "#18241B",
    fontWeight: "600",
    fontSize: 22,
  },
  textSubtitle: {
    fontWeight: "600",
    fontSize: 16,
    textAlign: "justify",
    width: 287,
    color: "#18241B",
  },
  container: {
    position: "relative",
    marginTop: 10,
    gap: 25,
    width: 239,
  },
  comecar: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  buttonTwo: {
    marginLeft: 135,
  },
  buttonTree: {
    marginLeft: 170,
  },
  buttonFor: {
    marginLeft: 124,
  },
  buttonFive: {
    marginLeft: 65,
  },
  buttonSix: {
    marginLeft: 20,
  },
  buttonSeven: {
    marginLeft: 0,
  },
  buttonEight: {
    marginLeft: 30,
  },
  buttonNine: {
    marginRight: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  persons: {
    position: "absolute",
    right: 40,
    top: 170,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "#000",
    padding: 35,
    alignItems: "center",
    borderColor: "#dbdbdb",
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingHorizontal: 14,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#39B061",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    width: 160,
  },
  balaoContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  balao: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderColor: "#D3EEBE",
    borderWidth: 2,
  },
  triangulo: {
    width: 0,
    height: 0,
    position: "relative",
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 10,
    borderRightColor: "transparent",
    borderTopWidth: 12,
    borderTopColor: "#D3EEBE",
  },
  before: {
    content: "",
    width: 0,
    height: 0,
    position: "absolute",
    borderLeftWidth: 9,
    borderLeftColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 9,
    borderRightColor: "transparent",
    borderTopWidth: 10,
    borderTopColor: "white",
    bottom: 4,
    left: -9,
  },
  image: {
    width: 2,
    height: 6,
    resizeMode: "contain",
  },
});
