import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { updateDoc } from "firebase/firestore";
import { useAuth } from "../../../hooks/useAuth";

export default function Sucesso() {
  const navigation = useNavigation();

  const {
    data: { docRef },
  } = useAuth();

  const Navigate = () => {
    navigation.navigate("Tarefas");
  };

  const handleMissionSave = async () => {
    await updateDoc(docRef, {
      "stamps.geoparkAraripe.mission1": true,
    })
      .then(() => {
        Navigate();
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Erro ao atualizar BD", errorMessage);
      });
  }

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className="justify-around items-center h-full w-full p-9">
        <Image
          source={require("../../../../assets/imgs/icons/cacto_sucesso.png")}
          className="w-[250px] h-[195px]"
        />
        <View className="justify-center items-center">
          <Text className="text-2xl font-bold text-[#374151] w-full text-center">
            Enviado com Sucesso
          </Text>
          <Text className="text-base text-[#6B7280] w-72 text-center mt-3">
            Agradecemos suas respostas, são fundamentais para compreender quem
            visita a Colina do Horto.
          </Text>
        </View>

        <TouchableOpacity style={[styles.submitButton]} onPress={handleMissionSave}>
          <Text style={styles.submitButtonText}>Concluir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    width: "100%",
    textAlign: "center",
  },
  button: {
    height: 50,
    backgroundColor: "transparent",
    borderColor: "#727272",
    borderWidth: 1,
    borderRadius: 12,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  buttonClicked: {
    backgroundColor: "#39B061", // Cor quando clicado
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#727272",
  },
  image: {
    width: 56,
    height: 40,
    marginTop: 20,
  },
  submitButton: {
    height: 50,
    backgroundColor: "#39B061",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 7,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  textClicked: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  disabledButton: {
    backgroundColor: "#B0B0B0",
  },
});
