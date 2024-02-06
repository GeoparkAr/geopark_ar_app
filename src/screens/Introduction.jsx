import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Introduction = () => {
  const [step, setStep] = useState(1);
  const navigation = useNavigation();

  const handleNext = () => {
    if (step === 3) {
      navigation.navigate("Welcome");
    } else {
      setStep(step + 1);
    }
  };
  //informações sobre cada tela de introdução
  const renderContent = () => {
    switch (step) {
      case 1:
        return {
          title: "Conheça a Cultura do Cariri",
          text: "Conheça tudo sobre a cultura e geologia do Cariri através dos nossos geossítios.",
          imageSource: require("../../assets/imgs/introduction/primeira.png"),
          viewStyles: [
            {
              width: 20,
              height: 7,
              backgroundColor: "#39B061",
              borderRadius: 4,
            },
            {
              width: 7,
              height: 7,
              backgroundColor: "#D9D9D9",
              borderRadius: 2,
            },
            {
              width: 7,
              height: 7,
              backgroundColor: "#D9D9D9",
              borderRadius: 2,
            },
          ],
        };
      case 2:
        return {
          title: "Informações em Tempo Real",
          text: "Utilizamos  Inteligência Artificial e Realidade Aumentada.",
          imageSource: require("../../assets/imgs/introduction/segunda.png"),
          viewStyles: [
            {
              width: 7,
              height: 7,
              backgroundColor: "#D9D9D9",
              borderRadius: 4,
            },
            {
              width: 20,
              height: 7,
              backgroundColor: "#39B061",
              borderRadius: 4,
            },
            {
              width: 7,
              height: 7,
              backgroundColor: "#D9D9D9",
              borderRadius: 4,
            },
          ],
        };
      case 3:
        return {
          title: "Guia Turístico",
          text: "Explore todos os locais dos geossítios com o nosso app.",
          imageSource: require("../../assets/imgs/introduction/terceira.png"),
          viewStyles: [
            {
              width: 7,
              height: 7,
              backgroundColor: "#D9D9D9",
              borderRadius: 4,
            },
            {
              width: 7,
              height: 7,
              backgroundColor: "#D9D9D9",
              borderRadius: 4,
            },
            {
              width: 20,
              height: 7,
              backgroundColor: "#39B061",
              borderRadius: 4,
            },
          ],
          buttonText: "Começar Agora",
          buttonWidth: 150,
        };
      default:
        return null;
    }
  };

  const { title, text, imageSource, viewStyles, buttonText, buttonWidth } =
    renderContent();

  return (
    <ImageBackground
      className="h-full bg-[#39B061] justify-center items-center"
      source={imageSource}
    >
      {/* mostrando informações das telas */}
      <View className=" justify-around items-center flex-1">
        <View className="flex-row">
          <Text className="text-white font-extrabold text-3xl">GEOPARK</Text>
          <Text className="text-[#39B061] font-extrabold italic text-3xl">
            AR
          </Text>
        </View>
        <View className="justify-center items-center w-64">
          <Text className="font-bold text-2xl text-white text-center">{title}</Text>
          <Text className="text-base text-white text-center my-3">{text}</Text>
          <View className="gap-1 flex flex-row mt-8">
            {viewStyles.map((style, index) => (
              <View key={index} style={style}></View>
            ))}
          </View>
        </View>
        <TouchableOpacity className="bg-transparent w-[80vw] border
         border-white h-12 justify-center items-center rounded-md"
          onPress={handleNext}
        >
          <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
            {buttonText || "Continuar"}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Introduction;
