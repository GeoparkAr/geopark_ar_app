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
import { Entypo } from '@expo/vector-icons';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import CustomButton from "./components/CustomButton";

export default function Tarefas() {
  const navigation = useNavigation();
  const [authChecked, setAuthChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  const navigateToQuestionario = () => {
    navigation.navigate("Questionario");
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

  const [mission1Status, setMission1Status] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await checkAuthentication();

      // Verify documentID
      console.log("DocumentID:", documentID);

      // Obter o valor da mission1 do banco de dados
      const docRef = doc(db, "users", documentID);
      const docSnapshot = await getDoc(docRef);
      const mission1Value =
        docSnapshot.data()?.stamps.geoparkAraripe.mission1 || false;

      // Verify mission1Value
      console.log("Mission1 Value:", mission1Value);

      // Atualizar o estado local
      setMission1Status(mission1Value);
    };

    fetchData();
  }, [documentID]);

  //mudando o estado dos botões
  const handleClick1 = () => {
    navigateToQuestionario();
  };

  const handleClick2 = async () => {
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

  const handleClick8 = async () => {
    if (authChecked) {
      if (user && !user.isAnonymous) {
        navigateToMissao8();
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
    <ScrollView style={{ backgroundColor: "#FFF" }}>
      <View className="relative">
        <TouchableOpacity
          className="absolute top-16 left-4 z-50 bg-[#39B061] rounded-full p-1"
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={28} color="white" />
        </TouchableOpacity>
        <Image
          source={require("../../../assets/imgs/geossitios/colina.png")}
          className="w-screen"
        />
      </View>
      <View>
        <View className="px-3 bg-[#39B061] py-4 ">
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
        <ImageBackground style={styles.scrool}
        source={require("../../../assets/imgs/tarefasbg.png")}>
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
              <CustomButton
                onPress={handleClick2}
                icon={require("../../../assets/imgs/icons/estatua.png")}
              />
            </View>
            <View style={styles.buttonTree}>
              <CustomButton
                onPress={handleClick3}
                icon={require("../../../assets/imgs/icons/Wall.png")}
              />
            </View>
            <View style={styles.buttonFor}>
              <CustomButton
                onPress={handleClick4}
                icon={require("../../../assets/imgs/icons/Church.png")}
              />
            </View>
            <View style={styles.buttonFive}>
              <CustomButton
                onPress={handleClick5}
                icon={require("../../../assets/imgs/icons/StainedGlass.png")}
              />
            </View>
            <View style={styles.buttonSix}>
              <CustomButton
                onPress={handleClick6}
                icon={require("../../../assets/imgs/icons/Cross.png")}
              />
            </View>
            <View style={styles.buttonSeven}>
              <CustomButton
                onPress={handleClick7}
                icon={require("../../../assets/imgs/icons/Stone.png")}
              />
            </View>
            <View style={styles.buttonNine} className="mb-8">
              <CustomButton
                onPress={handleClick8}
                icon={require("../../../assets/imgs/icons/priest.png")}
              />
            </View>
            <View style={styles.buttonNine} className="mb-8">
              <CustomButton
                onPress={navigateToSelo}
                icon={require("../../../assets/imgs/icons/chestbig.png")}
              />
            </View>
          </View>
        </ImageBackground>
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
  buttonNine: {
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
