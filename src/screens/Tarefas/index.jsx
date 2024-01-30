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
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";

import { useNavigation } from "@react-navigation/native";

import Custombutton from "./components/CustomButton";
import { Feather } from "@expo/vector-icons";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export default function Tarefas() {
  const navigation = useNavigation();
  const [authChecked, setAuthChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  const navigateToMissao = () => {
    navigation.navigate("Missao");
  };
  const navigateToQuestionario = () => {
    navigation.navigate("Questionario");
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
  const navigateToSelo = () => {
    navigation.navigate("Selos");
  };

  //os botões começam com false
  const [status, setStatus] = useState({
    primeiro: false,
    segundo: false,
    terceiro: false,
    quarto: false,
    quinto: false,
    sexto: false,
    setimo: false,
    oitavo: false,
  });

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
  const handleClick1 = async () => {
    setStatus({
      ...status,
      primeiro: true,
    });
    navigateToQuestionario();
    const docRef = doc(db, "users", documentID);
    await updateDoc(docRef, {
      "stamps.geoparkAraripe.mission1": true,
    })
      .then(() => {})
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Erro ao atualizar BD", errorMessage);
      });
  };

  const handleClick2 = async () => {
    setStatus({
      ...status,
      segundo: true,
    });
    navigateToMissao();
    const docRef = doc(db, "users", documentID);
    await updateDoc(docRef, {
      "stamps.geoparkAraripe.mission2": true,
    })
      .then(() => {})
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Erro ao atualizar BD", errorMessage);
      });
  };

  //se não estiver logado bloqueia os demais botões e chama o modal
  const handleClick3 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        setStatus({
          ...status,
          terceiro: true,
        });
        navigateToMissao3();
        const docRef = doc(db, "users", documentID);
        await updateDoc(docRef, {
          "stamps.geoparkAraripe.mission3": true,
        })
          .then(() => {})
          .catch((error) => {
            const errorMessage = error.message;
            Alert.alert("Erro ao atualizar BD", errorMessage);
          });
      } else {
        setModalVisible(true);
      }
    } else {
    }
  };

  const handleClick4 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        setStatus({
          ...status,
          quarto: true,
        });
        navigateToMissao4();
        const docRef = doc(db, "users", documentID);
        await updateDoc(docRef, {
          "stamps.geoparkAraripe.mission4": true,
        })
          .then(() => {})
          .catch((error) => {
            const errorMessage = error.message;
            Alert.alert("Erro ao atualizar BD", errorMessage);
          });
      } else {
        setModalVisible(true);
      }
    } else {
    }
  };

  const handleClick5 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        setStatus({
          ...status,
          quinto: true,
        });
        navigateToMissao5();
        const docRef = doc(db, "users", documentID);
        await updateDoc(docRef, {
          "stamps.geoparkAraripe.mission5": true,
        })
          .then(() => {})
          .catch((error) => {
            const errorMessage = error.message;
            Alert.alert("Erro ao atualizar BD", errorMessage);
          });
      } else {
        setModalVisible(true);
      }
    } else {
    }
  };

  const handleClick6 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        setStatus({
          ...status,
          sexto: true,
        });
        navigateToMissao6();
        const docRef = doc(db, "users", documentID);
        await updateDoc(docRef, {
          "stamps.geoparkAraripe.mission6": true,
        })
          .then(() => {})
          .catch((error) => {
            const errorMessage = error.message;
            Alert.alert("Erro ao atualizar BD", errorMessage);
          });
      } else {
        setModalVisible(true);
      }
    } else {
    }
  };

  const handleClick7 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        setStatus({
          ...status,
          setimo: true,
        });
        navigateToMissao7();
        const docRef = doc(db, "users", documentID);
        await updateDoc(docRef, {
          "stamps.geoparkAraripe.mission7": true,
        })
          .then(() => {})
          .catch((error) => {
            const errorMessage = error.message;
            Alert.alert("Erro ao atualizar BD", errorMessage);
          });
      } else {
        setModalVisible(true);
      }
    } else {
    }
  };

  //animação do começar
  const [bounceAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    startBounceAnimation();
  }, []);

  const startBounceAnimation = () => {
    const bounceUp = Animated.timing(bounceAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    });

    const bounceDown = Animated.timing(bounceAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    });

    const bounceSequence = Animated.sequence([bounceUp, bounceDown]);

    Animated.loop(bounceSequence, { iterations: -1 }).start();
  };

  return (
    <ScrollView style={{backgroundColor:"#FFF"}}>
      <View className="relative">
        <TouchableOpacity
          className="absolute top-16 left-4 z-50 bg-[#39B061] rounded-full p-1"
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>
        <Image
          source={require("../../../assets/imgs/geossitios/colina.png")}
          className="w-screen"
        />
      </View>
      <View>
        <View className="px-3 bg-[#39B061] py-3 ">
          <Text className=" text-[18px] font-medium pb-2 text-white">
            Colina do Horto
          </Text>
          <Text className="text-white text-base text-justify">
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
        <View style={styles.scrool}>
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
                  },
                ]}
              >
                <Image
                  source={require("../../../assets/imgs/icons/comecar.png")}
                />
                <Text style={styles.textcomecar}>Começar</Text>
              </Animated.View>
              <Custombutton
                icon={require("../../../assets/imgs/icons/star.png")}
                onPress={() => {
                  handleClick1();
                }}
              />
            </View>
            <View style={styles.buttonTwo}>
              <Custombutton
                onPress={() => {
                  handleClick2();
                }}
                disabled={!status.primeiro}
                icon={require("../../../assets/imgs/icons/estatua.png")}
              />
            </View>
            <View style={styles.buttonTree}>
              <Custombutton
                icon={require("../../../assets/imgs/icons/Stone.png")}
                onPress={() => {
                  handleClick3();
                }}
                disabled={!status.segundo}
              />
            </View>
            <View style={styles.buttonFor}>
              <Custombutton
                icon={require("../../../assets/imgs/icons/Wall.png")}
                onPress={() => {
                  handleClick4();
                }}
                disabled={!status.terceiro}
              />
            </View>
            <View style={styles.buttonFive}>
              <Custombutton
                icon={require("../../../assets/imgs/icons/priest.png")}
                onPress={() => {
                  handleClick5();
                }}
                disabled={!status.quarto}
              />
            </View>
            <View style={styles.buttonSix}>
              <Custombutton
                icon={require("../../../assets/imgs/icons/Cross.png")}
                onPress={() => {
                  handleClick6();
                }}
                disabled={!status.quinto}
              />
            </View>
            <View style={styles.buttonSeven}>
              <Custombutton
                icon={require("../../../assets/imgs/icons/Church.png")}
                onPress={() => {
                  handleClick7();
                }}
                disabled={!status.sexto}
              />
            </View>
            <View style={styles.buttonEight} className="mb-8">
              <Custombutton
                icon={
                  status.setimo
                    ? require("../../../assets/imgs/icons/Chest.png")
                    : require("../../../assets/imgs/icons/chestbig.png")
                }
                onPress={navigateToSelo}
                backgroundOption="yellow"
                disabled={!status.setimo}
              />
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
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    marginTop: 25,
  },
  comecar: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  textcomecar: {
    position: "absolute",
    color: "#FFF",
    fontSize: 14,
    top: 8,
    left: 22,
    fontWeight: "700",
  },
  buttonTwo: {
    marginRight: 90,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonTree: {
    marginRight: 170,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonFor: {
    marginRight: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonFive: {
    marginRight: -30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonSix: {
    marginRight: 75,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonSeven: {
    marginLeft: 60,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonEight: {
    marginRight: 0,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
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
});
