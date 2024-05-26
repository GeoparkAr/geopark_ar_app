import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Card from "./components/Card";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";

export default function Home() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [categoria, setCategoria] = useState(false);

  function handleCategoria() {
    setCategoria(!categoria);
  }

  const {
    data: { user, docRef },
  } = useAuth();

  const handlePress = () => {
    console.log("Card pressionado!");
  };

   //navegação
   const navigation = useNavigation();

   function openTarefas() {
     navigation.navigate("Tarefas");
   }
   function openTarefasSebrae() {
    navigation.navigate("TarefaSebrae");
  }


  //informações sobre os geossítios
  const geossitios = [
    
    /*
    {
      nome: "Arajara",
      municipio: "Barbalha",
      source: require("../../../assets/imgs/geossitios/arajara.jpg"),
      category: [
        "Aquático",
        "Trilha",
        "Biodiversidade",
        "Geodiversidade",
        "Acessibilidade",
      ],
    },
    {
      nome: "Mirante do Caldas",
      municipio: "Barbalha",
      source: require("../../../assets/imgs/geossitios/miranteCaldas.jpg"),
      category: [
        "Trilha",
        "Mirante",
        "Biodiversidade",
        "Geodiversidade",
        "Geomorfológico",
        "Acessibilidade",
      ],
    },
    {
      nome: "Floresta Petrificada do Cariri",
      municipio: "Missão Velha",
      source: require("../../../assets/imgs/geossitios/florestaPetrificada.jpg"),
      category: ["Paleontológico", "Geodiversidade"],
    },
    {
      nome: "Parque dos Pterossauros",
      municipio: "Santana do Cariri",
      source: require("../../../assets/imgs/geossitios/parquePterossauros.jpg"),
      category: ["Paleontológico", "Geodiversidade"],
    },
    {
      nome: "Pedra Cariri",
      municipio: "Nova Olinda",
      source: require("../../../assets/imgs/geossitios/pedraCariri.jpg"),
      category: ["Paleontológico", "Geodiversidade"],
    },
    {
      nome: "Pontal de Santa Cruz",
      municipio: "Santana do Cariri",
      source: require("../../../assets/imgs/geossitios/pontalSantaCruz.jpg"),
      category: [
        "Mirante",
        "Trilha",
        "Religioso",
        "Geomorfológico",
        "Geodiversidade",
      ],
    },
    {
      nome: "Ponte de Pedra",
      municipio: "Nova Olinda",
      source: require("../../../assets/imgs/geossitios/pontePedra.jpg"),
      category: [
        "Geomorfológico",
        "Cultural",
        "Arqueológico",
        "Mirante",
        "Geodiversidade",
      ],
    },
    {
      nome: "Riacho do Meio",
      municipio: "Barbalha",
      source: require("../../../assets/imgs/geossitios/riachoMeio.jpg"),
      category: ["Aquático", "Trilha", "Biodiversidade"],
    },
    {
      nome: "Cachoeira de Missão Velha",
      municipio: "Missão Velha",
      source: require("../../../assets/imgs/geossitios/cachoeiraMissaoVelha.jpg"),
      category: ["Aquático", "Trilha", "Cultural", "Geodiversidade"],
    }, */

  ];
  //filtrando os geossítios por categoria
  const geossitiosFiltrados = geossitios.filter((geossitio) => {
    return (
      categoriaSelecionada === null ||
      (Array.isArray(geossitio.category)
        ? geossitio.category.includes(categoriaSelecionada)
        : geossitio.category === categoriaSelecionada)
    );
  });

  //verificar se está logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_) => {
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#FFF", flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* botão de login */}
        {authChecked && user && !user.isAnonymous ? null : (
          <TouchableOpacity
            style={{
              width: "100%",
              borderBottomColor: "#f4f4f4",
              borderBottomWidth: 1,
              padding: 15,
              gap: 15,
              backgroundColor: "#0B69B4",
              alignItems: "center",
              borderRadius: 10,
              marginBottom: 20,
              gap: 12,
              flexDirection: "row",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("VisitorToUserRegister")}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#fff",
                fontWeight: "700",
              }}
            >
              Explore mais entrando na sua conta
            </Text>
            <View
              style={{
                backgroundColor: "#FFF",
                borderRadius: 8,
                paddingHorizontal: 3,
                paddingVertical: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="enter-outline" size={18} color="black" />
            </View>
          </TouchableOpacity>
        )}

        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Ionicons name="ios-menu-outline" size={36} color="black" />
          </TouchableOpacity>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => navigation.navigate("Selos")}>
              <Image
                source={require("../../../assets/imgs/icons/chestbig.png")}
                className="h-11 w-11"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* geossítios */}
        <View>
          <View className="flex-row justify-between items-center my-5">
            <Text className="text-[#18241B] font-bold text-lg">Pontos Turísticos</Text>
            <TouchableOpacity
              className="bg-[#0B69B4] px-3.5 py-1.5 rounded-2xl flex-row justify-center items-center"
              onPress={handleCategoria}
            >
              <View className="border border-white rounded-full p-1 justify-center items-center">
                {categoria ? (
                  <Ionicons name="close" size={10} color="white" />
                ) : (
                  <Ionicons name="filter" size={10} color="white" />
                )}
                
                
              </View>
              <Text className="text-white font-medium ml-2">Filtrar</Text>
            </TouchableOpacity>
          </View>

          {categoria && (
            <View className="p-5">
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <TouchableOpacity
                  style={styles.containerCategoria}
                  onPress={() => setCategoriaSelecionada("Acessibilidade")}
                >
                  <View
                    style={[
                      styles.img,
                      categoriaSelecionada === "Acessibilidade" && {
                        backgroundColor: "#287D44",
                      },
                    ]}
                  >
                    <Image
                      style={styles.imgCategoria}
                      source={require("../../../assets/imgs/icons/Accessible.png")}
                    />
                  </View>

                  <Text style={styles.categoriaText}>Acessibili dade</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.containerCategoria}
                  onPress={() => setCategoriaSelecionada("Aquático")}
                >
                  <View
                    style={[
                      styles.img,
                      categoriaSelecionada === "Aquático" && {
                        backgroundColor: "#287D44",
                      },
                    ]}
                  >
                    <Image
                      style={styles.imgCategoria}
                      source={require("../../../assets/imgs/icons/aquatico.png")}
                    />
                  </View>

                  <Text style={styles.categoriaText}>Aquático</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.containerCategoria}
                  onPress={() => setCategoriaSelecionada("Arqueológico")}
                >
                  <View
                    style={[
                      styles.img,
                      categoriaSelecionada === "Arqueológico" && {
                        backgroundColor: "#287D44",
                      },
                    ]}
                  >
                    <Image
                      style={styles.imgCategoria}
                      source={require("../../../assets/imgs/icons/archeo.png")}
                    />
                  </View>
                  <Text style={styles.categoriaText}>Arqueoló gico</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.containerCategoria}
                  onPress={() => setCategoriaSelecionada("Biodiversidade")}
                >
                  <View
                    style={[
                      styles.img,
                      categoriaSelecionada === "Biodiversidade" && {
                        backgroundColor: "#287D44",
                      },
                    ]}
                  >
                    <Image
                      style={styles.imgCategoria}
                      source={require("../../../assets/imgs/icons/Biome.png")}
                    />
                  </View>
                  <Text style={styles.categoriaText}>Biodiversi dade</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <TouchableOpacity
                  style={styles.containerCategoria}
                  onPress={() => setCategoriaSelecionada("Cultural")}
                >
                  <View
                    style={[
                      styles.img,
                      categoriaSelecionada === "Cultural" && {
                        backgroundColor: "#287D44",
                      },
                    ]}
                  >
                    <Image
                      style={styles.imgCategoria}
                      source={require("../../../assets/imgs/icons/cultural.png")}
                    />
                  </View>

                  <Text style={styles.categoriaText}>Cultural</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.containerCategoria}
                  onPress={() => setCategoriaSelecionada("Geodiversidade")}
                >
                  <View
                    style={[
                      styles.img,
                      categoriaSelecionada === "Geodiversidade" && {
                        backgroundColor: "#287D44",
                      },
                    ]}
                  >
                    <Image
                      style={styles.imgCategoria}
                      source={require("../../../assets/imgs/icons/geodi.png")}
                    />
                  </View>

                  <Text style={styles.categoriaText}>Geodiversi dade</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.containerCategoria}
                  onPress={() => setCategoriaSelecionada("Geomorfológico")}
                >
                  <View
                    style={[
                      styles.img,
                      categoriaSelecionada === "Geomorfológico" && {
                        backgroundColor: "#287D44",
                      },
                    ]}
                  >
                    <Image
                      style={styles.imgCategoria}
                      source={require("../../../assets/imgs/icons/Geology.png")}
                    />
                  </View>
                  <Text style={styles.categoriaText}>Geomorfo lógico</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.containerCategoria}
                  onPress={() => setCategoriaSelecionada("Mirante")}
                >
                  <View
                    style={[
                      styles.img,
                      categoriaSelecionada === "Mirante" && {
                        backgroundColor: "#287D44",
                      },
                    ]}
                  >
                    <Image
                      style={styles.imgCategoria}
                      source={require("../../../assets/imgs/icons/tower.png")}
                    />
                  </View>
                  <Text style={styles.categoriaText}>Mirante</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <TouchableOpacity
                  style={styles.containerCategoria}
                  onPress={() => setCategoriaSelecionada("Paleontológico")}
                >
                  <View
                    style={[
                      styles.img,
                      categoriaSelecionada === "Paleontológico" && {
                        backgroundColor: "#287D44",
                      },
                    ]}
                  >
                    <Image
                      style={styles.imgCategoria}
                      source={require("../../../assets/imgs/icons/paleantologia.png")}
                    />
                  </View>

                  <Text style={styles.categoriaText}>Paleonto lógico</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.containerCategoria}
                  onPress={() => setCategoriaSelecionada("Religioso")}
                >
                  <View
                    style={[
                      styles.img,
                      categoriaSelecionada === "Religioso" && {
                        backgroundColor: "#287D44",
                      },
                    ]}
                  >
                    <Image
                      style={styles.imgCategoria}
                      source={require("../../../assets/imgs/icons/Rosary.png")}
                    />
                  </View>

                  <Text style={styles.categoriaText}>Espiritual</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.containerCategoria}
                  onPress={() => setCategoriaSelecionada("Trilha")}
                >
                  <View
                    style={[
                      styles.img,
                      categoriaSelecionada === "Trilha" && {
                        backgroundColor: "#287D44",
                      },
                    ]}
                  >
                    <Image
                      style={styles.imgCategoria}
                      source={require("../../../assets/imgs/icons/trilha.png")}
                    />
                  </View>
                  <Text style={styles.categoriaText}>Trilha</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 50 }}></TouchableOpacity>
              </View>
            </View>
          )}

          {/* botão de limpar categoria selecionada */}
          {categoriaSelecionada && (
            <TouchableOpacity
              onPress={() => setCategoriaSelecionada(null)}
              style={styles.limpar}
            >
              <Text style={styles.textLimpar}>
                {categoriaSelecionada ? `${categoriaSelecionada}` : ""}
              </Text>
              <Image
                source={require("../../../assets/imgs/icons/Close.png")}
                style={styles.close}
              />
            </TouchableOpacity>
          )}
          <View className=" justify-between flex-row flex-wrap mb-8">
            {/* mostrar o card da colina do horto */}
            {categoriaSelecionada === "Religioso" ||
            categoriaSelecionada === "Trilha" ||
            categoriaSelecionada === null ? (
              <View
                className="justify-center items-center rounded-xl mb-3 w-[40vw] 
                h-48 max-w-[230px] bg-[#4285F4]"
              >
                <Image
                  className="h-20 w-20 rounded-full mb-2"
                  source={require("../../../assets/imgs/geossitios/colina.jpg")}
                />
                <Text className="text-sm text-white text-center font-semibold w-36 mb-2">
                  Colina do Horto
                </Text>
                <TouchableOpacity
                  className="bg-white h-7 justify-center items-center px-2 rounded-2xl"
                  onPress={openTarefas}
                >
                  <Text className="font-medium text-xs text-[#18241B]">
                    Explorar
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {categoriaSelecionada === "Religioso" ||
            categoriaSelecionada === "Trilha" ||
            categoriaSelecionada === null ? (
              <View
                className="justify-center items-center rounded-xl mb-3 w-[40vw] 
                h-48 max-w-[230px] bg-[#4285F4]"
              >
                <Image
                  className="h-20 w-20 rounded-full mb-2"
                  source={require("../../../assets/imgs/geossitios/logo-sebraelab.png")}
                />
                <Text className="text-sm text-white text-center font-semibold w-36 mb-2">
                  SebraeLab
                </Text>
                <TouchableOpacity
                  className="bg-white h-7 justify-center items-center px-2 rounded-2xl"
                  onPress={openTarefasSebrae}
                >
                  <Text className="font-medium text-xs text-[#18241B]">
                    Explorar
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            
            {/* mostrando todos os geossítios */}
            
            {
            geossitiosFiltrados.map((geossitio) => (
              <Card
                key={geossitio.nome}
                nome={geossitio.nome}
                municipio={geossitio.municipio}
                source={geossitio.source}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

//estilização com styleSheet
const styles = StyleSheet.create({
  container: {
    padding: 26,
    backgroundColor: "#FFF",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  visitante: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  buttons: {
    flexDirection: "row",
    display: "flex",
    gap: 25,
    alignItems: "center",
  },
  destaque: {
    width: "100%",
    borderRadius: 10,
    height: 150,
  },
  viewDestaque: {
    borderRadius: 10,
    marginTop: 40,
    position: "relative",
    marginBottom: 37,
    elevation: 6,
  },
  destaqueContent: {
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    alignItems: "center",
    gap: 10,
  },
  titleDestaque: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "500",
  },
  textsDestaque: {
    display: "flex",
    gap: 4,
  },
  textDestaque: {
    color: "#FFF",
    fontWeight: "400",
    fontSize: 12,
    width: 200,
    textAlign: "justify",
  },
  buttonDestaque: {
    width: 73,
    height: 28.246,
    backgroundColor: "#39B061",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDestaqueText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 13,
  },
  categoriaText: {
    color: "#18241B",
    fontWeight: "700",
    fontSize: 10,
    textAlign: "center",
  },
  containerCategoria: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
    width: 51,
  },
  containerCategorias: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  geossitioDestaque: {
    width: 150,
    height: 216,
    backgroundColor: "#39B061",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    paddingHorizontal: 10,
    shadowColor: "#18241B",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  geossitioNomeDestaque: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 5,
  },
  municipioDestaque: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 10,
    width: 55,
    textAlign: "center",
  },
  buttonColina: {
    width: 65,
    height: 25.5,
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 2,
    marginLeft: 3,
  },
  inforButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  explorar: {
    color: "#000",
    fontWeight: "700",
    fontSize: 13,
  },
  geossitios: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    paddingBottom: 100,
    gap: 20,
  },
  containerMenu: {
    backgroundColor: "#FFF",
    height: "100%",
    padding: 25,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 65,
    position: "relative",
  },
  containerInforUser: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomColor: "#979797",
    borderBottomWidth: 0.5,
    paddingBottom: 25,
  },
  menuCategory: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  textMenuCategory: {
    fontSize: 14,
    color: "#585767",
    fontWeight: "700",
  },
  containerMenuCategoryConfig: {
    paddingVertical: 30,
    gap: 20,
  },
  containerMenuCategory: {
    paddingVertical: 25,
    borderBottomColor: "#979797",
    borderBottomWidth: 0.5,
    gap: 20,
  },
  img: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgCategoria: {
    maxWidth: 25,
    maxHeight: 25,
  },
  limpar: {
    backgroundColor: "#39B061",
    width: 115,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
    position: "relative",
  },
  textLimpar: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  close: {
    position: "absolute",
    right: 3,
    top: -5,
  },
});