import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Card from "./components/Card";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";
import { doc } from "firebase/firestore";

export default function Home() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const {
    data: { user, docRef },
  } = useAuth();

  //informações sobre os geossítios
  const geossitios = [
    {
      nome: "Arajara",
      municipio: "Barbalha",
      source: require("../../../assets/imgs/geossitios/arajara.png"),
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
      source: require("../../../assets/imgs/geossitios/mirante_caldas.png"),
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
      source: require("../../../assets/imgs/geossitios/floresta_petrificada.png"),
      category: ["Paleontológico", "Geodiversidade"],
    },
    {
      nome: "Parque dos Pterossauros",
      municipio: "Santana do Cariri",
      source: require("../../../assets/imgs/geossitios/parque_pterosauros.png"),
      category: ["Paleontológico", "Geodiversidade"],
    },
    {
      nome: "Pedra Cariri",
      municipio: "Nova Olinda",
      source: require("../../../assets/imgs/geossitios/pedra_cariri.png"),
      category: ["Paleontológico", "Geodiversidade"],
    },
    {
      nome: "Pontal de Santa Cruz",
      municipio: "Santana do Cariri",
      source: require("../../../assets/imgs/geossitios/pontal_santa_cruz.png"),
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
      source: require("../../../assets/imgs/geossitios/ponte_pedra.png"),
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
      source: require("../../../assets/imgs/geossitios/riacho_meio.png"),
      category: ["Aquático", "Trilha", "Biodiversidade"],
    },
    {
      nome: "Cachoeira de Missão Velha",
      municipio: "Missão Velha",
      source: require("../../../assets/imgs/geossitios/cachoeira_missao_velha.png"),
      category: ["Aquático", "Trilha", "Cultural", "Geodiversidade"],
    },
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

  //navegação
  const navigation = useNavigation();

  function openTarefas() {
    navigation.navigate("Tarefas");
  }

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
              backgroundColor: "#287D44",
              alignItems: "center",
              borderRadius: 10,
              marginBottom: 20,
              gap: 12,
              flexDirection: "row",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("Welcome")}
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
              <Image source={require("../../../assets/imgs/icons/Chest.png")} />
            </TouchableOpacity>
          </View>
        </View>
        {/* card de destaque ao padre cícero */}
        <View style={styles.viewDestaque}>
          <Image
            source={require("../../../assets/imgs/banner.png")}
            style={styles.destaque}
          />
          <View style={styles.destaqueContent}>
            <View style={styles.textsDestaque}>
              <Text style={styles.titleDestaque}>Colina do Horto</Text>
              <Text style={styles.textDestaque}>
                Conheça a cultura do Cariri com um importante símbolo histórico
                da região.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttonDestaque}
              onPress={openTarefas}
            >
              <Text style={styles.buttonDestaqueText}>Explorar</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* categorias */}
        <View style={styles.categorias}>
          <Text style={styles.title}>Categorias</Text>
          <View
            style={{
              justifyContent: "space-around",
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
                    backgroundColor: "#41C76E",
                  },
                ]}
              >
                <Image
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
                    backgroundColor: "#41C76E",
                  },
                ]}
              >
                <Image
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
                    backgroundColor: "#41C76E",
                  },
                ]}
              >
                <Image
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
                    backgroundColor: "#41C76E",
                  },
                ]}
              >
                <Image
                  source={require("../../../assets/imgs/icons/Biome.png")}
                />
              </View>
              <Text style={styles.categoriaText}>Biodiversi dade</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "space-around",
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
                    backgroundColor: "#41C76E",
                  },
                ]}
              >
                <Image
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
                    backgroundColor: "#41C76E",
                  },
                ]}
              >
                <Image
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
                    backgroundColor: "#41C76E",
                  },
                ]}
              >
                <Image
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
                    backgroundColor: "#41C76E",
                  },
                ]}
              >
                <Image
                  source={require("../../../assets/imgs/icons/tower.png")}
                />
              </View>
              <Text style={styles.categoriaText}>Mirante</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "space-around",
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
                    backgroundColor: "#41C76E",
                  },
                ]}
              >
                <Image
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
                    backgroundColor: "#41C76E",
                  },
                ]}
              >
                <Image
                  source={require("../../../assets/imgs/icons/Rosary.png")}
                />
              </View>

              <Text style={styles.categoriaText}>Religioso</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerCategoria}
              onPress={() => setCategoriaSelecionada("Trilha")}
            >
              <View
                style={[
                  styles.img,
                  categoriaSelecionada === "Trilha" && {
                    backgroundColor: "#41C76E",
                  },
                ]}
              >
                <Image
                  source={require("../../../assets/imgs/icons/trilha.png")}
                />
              </View>
              <Text style={styles.categoriaText}>Trilha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 50 }}></TouchableOpacity>
          </View>
        </View>
        {/* geossítios */}
        <View>
          <Text style={styles.title}>Geossítios</Text>
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
          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 20,
              marginBottom: 50,
            }}
          >
            {/* mostrar o card da colina do horto */}
            {categoriaSelecionada === "Religioso" ||
            categoriaSelecionada === "Trilha" ||
            categoriaSelecionada === null ? (
              <View style={styles.geossitioDestaque}>
                <View style={styles.imgGeossitio}>
                  <Image
                    source={require("../../../assets/imgs/geossitios/colinadohorto.png")}
                  />
                </View>

                <Text style={styles.geossitioNomeDestaque}>
                  Colina do Horto
                </Text>
                <View style={styles.inforButton}>
                  <Text style={styles.municipioDestaque}>
                    Juazeiro do Norte
                  </Text>
                  <TouchableOpacity
                    style={styles.buttonColina}
                    onPress={openTarefas}
                  >
                    <Text style={styles.explorar}>Explorar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            {/* mostrando todos os geossítios */}
            {geossitiosFiltrados.map((geossitio) => (
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
    padding: 16,
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
    height: 117,
    borderRadius: 8,
  },
  viewDestaque: {
    borderRadius: 8,
    marginTop: 40,
    position: "relative",
    marginBottom: 37,
    elevation: 6,
  },
  destaqueContent: {
    position: "absolute",
    top: 17.8,
    left: 20.9,
    right: 20.9,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignItems: "center",
  },
  titleDestaque: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "800",
  },
  textsDestaque: {
    display: "flex",
    gap: 4,
  },
  textDestaque: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 11,
    width: 200,
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
  title: {
    color: "#18241B",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 12.54,
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
    width: 159.482,
    height: 216.256,
    backgroundColor: "#39B061",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  geossitioNomeDestaque: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
    marginVertical: 5,
  },
  municipioDestaque: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 10,
    width: 53,
  },
  buttonColina: {
    width: 69,
    height: 25.5,
    backgroundColor: "#FFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  inforButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  explorar: {
    color: "#18241B",
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
    width: 42,
    height: 42,
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
