import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function About() {
  const navigation = useNavigation();

  const home = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView style={{ backgroundColor: "#FFF" }}>
      <View className="px-7 justify-center py-10">
        <View className="self-center"></View>
        <View>
          <Text className="text-xl mb-3">Geopark AR</Text>
          <Text className="text-justify text-base">
            No seio do Cariri, nasce o Geoark AR, um aplicativo pioneiro
            desenvolvido a partir de uma residência em Tecnologia da Informação
            e Comunicação (TIC). Seu propósito é suprir as demandas locais em
            tecnologia, especialmente em parceria com o Geopark Araripe. Juntos,
            criaram o Geoark AR, uma ferramenta que utiliza inteligência
            artificial e realidade aumentada para proporcionar informações sobre
            os geossítios do Geopark de maneira acessível e envolvente. A visão
            é clara: democratizar o acesso à informação, tornando a exploração
            dos pontos turísticos uma experiência simples e inclusiva.
          </Text>
          <Text className="text-base font-medium mt-2">Nossos Parceiros:</Text>
          <View style={styles.containerparceiros}>
            <View style={styles.containerimg}>
              <Image
                source={require("../../assets/imgs/ufca.png")}
                style={styles.img1}
              />
            </View>
            <View style={styles.containerimg}>
              <Image
                source={require("../../assets/imgs/brisa.png")}
                style={styles.img2}
              />
            </View>
            <View style={styles.containerimg}>
              <Image
                source={require("../../assets/imgs/softex.png")}
                style={styles.img3}
              />
            </View>
            <View style={styles.containerimg}>
              <Image
                source={require("../../assets/imgs/ministerio.png")}
                style={styles.img4}
              />
            </View>
            <View style={styles.containerimg}>
              <Image
                source={require("../../assets/imgs/unesco.png")}
                style={styles.img5}
              />
            </View>
            <View style={styles.containerimg}>
              <Image
                source={require("../../assets/imgs/caribi.png")}
                style={styles.img6}
              />
            </View>
            <View style={styles.containerimg}>
              <Image
                source={require("../../assets/imgs/ggn.png")}
                style={styles.img6}
              />
            </View>
            <View style={styles.containerimg}>
              <Image
                source={require("../../assets/imgs/urca.png")}
                style={styles.img7}
              />
            </View>
            <View style={styles.containerimg}>
              <Image
                source={require("../../assets/imgs/ceara.png")}
                style={styles.img7}
              />
            </View>
          </View>
          <Text className="text-xl mb-3 mt-7">Sobre o Geopark Araripe</Text>
          <Text className="text-justify text-base">
            O Geopark Araripe é uma área de preservação localizada na região do
            Cariri, no estado do Ceará, Brasil. Criado em 2006, o geoparque
            abrange uma extensa área de aproximadamente 3.845 quilômetros
            quadrados. Sua principal característica é a riqueza geológica, que
            inclui formações rochosas antigas, fósseis e uma diversidade de
            paisagens. O destaque do Geopark Araripe é a Chapada do Araripe, uma
            elevação que revela camadas geológicas que remontam a milhões de
            anos. Além disso, a região é conhecida por abrigar o maior sítio
            fossilífero do Brasil, com uma variedade de fósseis que incluem
            animais pré-históricos, plantas e insetos. Além do valor geológico,
            o Geopark Araripe também possui uma rica biodiversidade, com uma
            vegetação característica da Caatinga e importantes áreas de
            preservação ambiental. A área é destinada à pesquisa científica,
            educação ambiental e turismo sustentável, proporcionando aos
            visitantes uma experiência única de imersão na história natural da
            região. O Geopark Araripe desempenha um papel crucial na preservação
            do patrimônio geológico e biológico, ao mesmo tempo em que promove o
            desenvolvimento sustentável da comunidade local.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textoparceiros: {
    color: "#18241B",
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "700",
    marginBottom: 27,
  },
  containerimg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 105.701,
    height: 72,
    backgroundColor: "white",
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
  containerparceiros: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop:12

  },
  img1: {
    width: 96.973,
    height: 67.895,
  },
  img2: {
    width: 91.74,
    height: 29,
  },
  img3: {
    width: 80.771,
    height: 59,
  },
  img4: {
    width: 84.76,
    height: 62,
  },
  img5: {
    width: 73.791,
    height: 56,
  },
  img6: {
    width: 80,
    height: 66,
  },
  img7: {
    width: 40,
    height: 55,
  },
  img7: {
    width: 40,
    height: 55,
  },
  logo: {
    width: 147,
    height: 177,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
  },
});
