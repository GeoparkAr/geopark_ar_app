import React, { useState } from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";

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

  // Informações sobre cada tela de introdução
  const slides = [
    {
      title: "Conheça a Cultura do Cariri",
      text: "Conheça tudo sobre a cultura e geologia do Cariri.",
      imageSource: require("../../assets/imgs/introduction/primeira.png"),
      viewStyles: [
        { width: 20, height: 7, backgroundColor: "#0B69B4", borderRadius: 4 },
        { width: 7, height: 7, backgroundColor: "#D9D9D9", borderRadius: 2 },
        { width: 7, height: 7, backgroundColor: "#D9D9D9", borderRadius: 2 },
      ],
    },
    {
      title: "Informações em Tempo Real",
      text: "Utilizamos  Inteligencia Artificial e Realidade Aumentada.",
      imageSource: require("../../assets/imgs/introduction/segunda.png"),
      viewStyles: [
        { width: 7, height: 7, backgroundColor: "#D9D9D9", borderRadius: 4 },
        { width: 20, height: 7, backgroundColor: "#0B69B4", borderRadius: 4 },
        { width: 7, height: 7, backgroundColor: "#D9D9D9", borderRadius: 4 },
      ],
    },
    {
      title: "Guia Turístico",
      text: "Explore todos os locais com o nosso app.",
      imageSource: require("../../assets/imgs/introduction/terceira.png"),
      viewStyles: [
        { width: 7, height: 7, backgroundColor: "#D9D9D9", borderRadius: 4 },
        { width: 7, height: 7, backgroundColor: "#D9D9D9", borderRadius: 4 },
        { width: 20, height: 7, backgroundColor: "#0B69B4", borderRadius: 4 },
      ],
      buttonText: "Começar Agora",
      buttonWidth: 150,
    },
  ];

  return (
    <Swiper
      loop={false}
      showsButtons={false}
      showsPagination={false}
      index={step - 1}
      onIndexChanged={(index) => setStep(index + 1)}
    >
      {slides.map((slide, index) => (
        <ImageBackground
          key={index}
          style={{ flex: 1 }}
          source={slide.imageSource}
        >
          {/* Conteúdo de cada slide */}
          <View className=" justify-around items-center flex-1">
            <View style={{ flexDirection: "row" }}>
              <Image source={require('../../assets/imgs/icon2.png')} className="w-40 h-40"/>
            </View>
            <View className="justify-center items-center w-64">
              <Text className="font-bold text-2xl text-white text-center">
                {slide.title}
              </Text>
              <Text className="text-base text-white text-center my-3">
                {slide.text}
              </Text>
              <View className="gap-1 flex flex-row mt-8">
                {slide.viewStyles.map((style, i) => (
                  <View key={i} style={style}></View>
                ))}
              </View>
            </View>
            {index === 2 ? ( // Renderizar o botão apenas para o terceiro slide
              <TouchableOpacity
                className="bg-transparent w-[80vw] border border-white h-12 justify-center items-center rounded-md"
                onPress={handleNext}
              >
                <Text
                  style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
                >
                  {slide.buttonText || "Continuar"}
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                
              </View>
            )}
          </View>
        </ImageBackground>
      ))}
    </Swiper>
  );
};

export default Introduction;
