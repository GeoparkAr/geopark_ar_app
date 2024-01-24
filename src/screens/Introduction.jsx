import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
          title: "Explore Geossítios",
          text: "Conheça tudo sobre a cultura e geologia dos nossos geossítios.",
          imageSource: require("../../assets/imgs/bg-intro1.png"),
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
          title: "Realidade Aumentada e Inteligência Artificial",
          text: "Aponte sua câmera para pontos turísticos e receba informações na sua tela.",
          imageSource: require("../../assets/imgs/bg-intro2.png"),
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
          title: "Tesouros Ocultos",
          text: "Explore lugares secretos e histórias que só povos locais conhecem e ganhe um selo de explorador.",
          imageSource: require("../../assets/imgs/bg-intro3.png"),
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
    <SafeAreaView className="h-full bg-white">
      {/* mostrando informações das telas */}
      <ImageBackground className="h-full px-7" source={imageSource}>
        <Text className="pt-14 text-2xl font-bold w-[80%]">{title}</Text>
        <Text className="pt-1 text-base w-[80%]">{text}</Text>
        <View className="gap-1 flex flex-row mt-6">
          {viewStyles.map((style, index) => (
            <View key={index} style={style}></View>
          ))}
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#39B061",
            borderRadius: 10,
            width: buttonWidth || 120,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            elevation: 7,
          }}
          onPress={handleNext}
        >
          <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
            {buttonText || "Próximo"}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Introduction;
