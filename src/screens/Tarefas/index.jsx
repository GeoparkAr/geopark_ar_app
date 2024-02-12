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
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import Custombutton from "./components/CustomButton";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import CustomButton from "./components/CustomButton";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../hooks/useAuth";

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

  const [documentID, setDocumentID] = useState("");

  const getDocumentID = async () => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDocumentID(doc.id);
    });
  };

  //verificar se está logado e coletar o a ID do documento do usuário no BD
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setAuthChecked(true);
    });
    getDocumentID();
    console.log(user);
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

    fetchData();
  }, []);

  //mudando o estado dos botões
  const handleClick1 = () => {
    navigateToQuestionario();
    setBotao2Habilitado(true);
  };

  const handleClick2 = async () => {
    navigateToMissao();
    setBotao3Habilitado(true);
  };

  //se não estiver logado bloqueia os demais botões e chama o modal
  const handleClick3 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        navigateToMissao3();
        setBotao4Habilitado(true);
      } else {
        setModalVisible(true);
      }
    }
  };

  const handleClick4 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        navigateToMissao4();
        setBotao5Habilitado(true);
      } else {
        setModalVisible(true);
      }
    }
  };

  const handleClick5 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        navigateToMissao5();
        setBotao6Habilitado(true);
      } else {
        setModalVisible(true);
      }
    }
  };

  const handleClick6 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        navigateToMissao6();
        setBotao7Habilitado(true);
      } else {
        setModalVisible(true);
      }
    }
  };

  const handleClick7 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        navigateToMissao7();
        setBotao8Habilitado(true);
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
        
        setBotao9Habilitado(true);

        const mission7Value = true;
  
        await updateDoc(docRef, {
          "stamps.geoparkAraripe.mission7": mission7Value,
        })
          .then(() => {
            navigateToMissao8();
            console.log('Valor enviado para missão 7:', mission7Value);
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log("Erro ao atualizar BD", errorMessage);
          });
      } else {
        setModalVisible(true);
      }
    }
  };  

  const salvarEstadoAoSair = async () => {
    try {
      await AsyncStorage.setItem(
        "estadoBotoes",
        JSON.stringify({
          botao1Habilitado,
          botao2Habilitado,
          botao3Habilitado,
          botao4Habilitado,
          botao5Habilitado,
          botao6Habilitado,
          botao7Habilitado,
          botao8Habilitado,
          botao9Habilitado,
        })
      );
    } catch (error) {
      console.error("Erro ao salvar o estado:", error);
    }
  };

  // Carregar o estado ao iniciar a tela
  const carregarEstadoInicial = async () => {
    try {
      const estadoSalvo = await AsyncStorage.getItem("estadoBotoes");
      if (estadoSalvo) {
        const {
          botao1Habilitado,
          botao2Habilitado,
          botao3Habilitado,
          botao4Habilitado,
          botao5Habilitado,
          botao6Habilitado,
          botao7Habilitado,
          botao8Habilitado,
          botao9Habilitado,
        } = JSON.parse(estadoSalvo);
        setBotao1Habilitado(botao1Habilitado);
        setBotao2Habilitado(botao2Habilitado);
        setBotao3Habilitado(botao3Habilitado);
        setBotao4Habilitado(botao4Habilitado);
        setBotao5Habilitado(botao5Habilitado);
        setBotao6Habilitado(botao6Habilitado);
        setBotao7Habilitado(botao7Habilitado);
        setBotao8Habilitado(botao8Habilitado);
        setBotao9Habilitado(botao9Habilitado);
      }
    } catch (error) {
      console.error("Erro ao carregar o estado inicial:", error);
    }
  };

  // Chamar carregarEstadoInicial ao iniciar a tela
  useEffect(() => {
    carregarEstadoInicial();
  }, []);

  // Chamar salvarEstadoAoSair quando sair da tela
  useEffect(() => {
    return () => {
      salvarEstadoAoSair();
    };
  }, [
    botao1Habilitado,
    botao2Habilitado,
    botao3Habilitado,
    botao4Habilitado,
    botao5Habilitado,
    botao6Habilitado,
    botao7Habilitado,
    botao8Habilitado,
    botao9Habilitado,
  ]);

  //animação do começar
  const [bounceAnimation] = useState(new Animated.Value(0));

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
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Visitantes não têm acesso a esta missão.
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate("Welcome");
                }}
              >
                <Text style={styles.textStyle}>Entrar</Text>
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
              <Image
                source={require("../../../assets/imgs/geossitios/arajara.png")}
                className="w-64 h-96 rounded-lg "
              />
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
                    ? require("../../../assets/imgs/icons/book_green.png")
                    : require("../../../assets/imgs/icons/book_bw.png")
                }
                onPress={() => {
                  handleClick1();
                }}
              />
            </View>
            <View style={styles.buttonTwo}>
              <CustomButton
                onPress={handleClick2}
                icon={
                  botao2Habilitado
                    ? require("../../../assets/imgs/icons/estatua_green.png")
                    : require("../../../assets/imgs/icons/estatua_bw.png")
                }
                disabled={!botao2Habilitado}
              />
            </View>
            <View style={styles.buttonTree}>
              <CustomButton
                onPress={handleClick3}
                disabled={!botao3Habilitado}
                icon={
                  botao3Habilitado
                    ? require("../../../assets/imgs/icons/muro_green.png")
                    : require("../../../assets/imgs/icons/muro_bw.png")
                }
              />
            </View>
            <View style={styles.buttonFor}>
              <CustomButton
                onPress={handleClick4}
                disabled={!botao4Habilitado}
                icon={
                  botao4Habilitado
                    ? require("../../../assets/imgs/icons/igreja_green.png")
                    : require("../../../assets/imgs/icons/igreja_bw.png")
                }
              />
            </View>
            <View style={styles.buttonFive}>
              <CustomButton
                onPress={handleClick5}
                disabled={!botao5Habilitado}
                icon={
                  botao5Habilitado
                    ? require("../../../assets/imgs/icons/vitrais_green.png")
                    : require("../../../assets/imgs/icons/vitrais_bw.png")
                }
              />
            </View>
            <View style={styles.buttonSix}>
              <CustomButton
                onPress={handleClick6}
                disabled={!botao6Habilitado}
                icon={
                  botao6Habilitado
                    ? require("../../../assets/imgs/icons/crucifixo_green.png")
                    : require("../../../assets/imgs/icons/crucifixo_bw.png")
                }
              />
            </View>
            <View style={styles.buttonSeven}>
              <CustomButton
                onPress={handleClick7}
                disabled={!botao7Habilitado}
                icon={
                  botao7Habilitado
                    ? require("../../../assets/imgs/icons/pedra_green.png")
                    : require("../../../assets/imgs/icons/pedra_bw.png")
                }
              />
            </View>
            <View style={styles.buttonEight} className="">
              <CustomButton
                onPress={handleClick8}
                disabled={!botao8Habilitado}
                icon={
                  botao8Habilitado
                    ? require("../../../assets/imgs/icons/padre_green.png")
                    : require("../../../assets/imgs/icons/padre_bw.png")
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

              <TouchableOpacity
                onPress={handleButtonPress}
                disabled={!botao9Habilitado}
              >
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
});
