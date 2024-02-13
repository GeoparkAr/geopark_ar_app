import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { updateDoc } from "firebase/firestore";
import { useAuth } from "../../../hooks/useAuth";

export default function PerguntaTres() {
  const [clicado, setClicado] = useState(null);
  const navigation = useNavigation();

  const {
    data: { docRef },
  } = useAuth();

  const handleLastVisitSave = async () => {

    let visitPurpose = "";
    if (clicado === "Sim") {
      visitPurpose = "Yes";
    } else if (clicado === "Não") {
      visitPurpose = "No";
    } else if (clicado === "É um dos meus objetivos") {
      visitPurpose = "Maybe";
    }

    await updateDoc(docRef, {
      "lastVisit.geoparkAraripe.visitPurpose": visitPurpose,
    })
      .then(() => {
        Navigate();
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Erro ao atualizar BD", errorMessage);
      });
  };

  function Navigate() {
    navigation.navigate("PerguntaQuatro");
  }
  const handleButtonClick = (opcao) => {
    setClicado(opcao);
  };

  const isContinueButtonDisabled = clicado === null;

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className="justify-around items-center h-full w-full p-9">
        <View className="w-full justify-center items-center">
          <Text className="text-xl font-bold text-[#374151] w-full mb-5 text-justify">
            O objetivo da sua visita a cidade de Juazeiro do Norte é visitar a
            Colina do Horto?
          </Text>
          <View className="w-full justify-center items-center gap-4">
            <TouchableOpacity
              style={[styles.button, clicado === "Sim" && styles.buttonClicked]}
              onPress={() => handleButtonClick("Sim")}
            >
              <Text
                style={[
                  styles.buttonText,
                  clicado === "Sim" && styles.textClicked,
                ]}
              >
                Sim
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, clicado === "Não" && styles.buttonClicked]}
              onPress={() => handleButtonClick("Não")}
            >
              <Text
                style={[
                  styles.buttonText,
                  clicado === "Não" && styles.textClicked,
                ]}
              >
                Não
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                clicado === "É um dos meus objetivos" && styles.buttonClicked,
              ]}
              onPress={() => handleButtonClick("É um dos meus objetivos")}
            >
              <Text
                style={[
                  styles.buttonText,
                  clicado === "É um dos meus objetivos" && styles.textClicked,
                ]}
              >
                É um dos meus objetivos
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          source={require("../../../../assets/imgs/icons/Cacto.png")}
          className="w-56 h-40"
        />
        <TouchableOpacity
          style={[
            styles.submitButton,
            isContinueButtonDisabled && styles.disabledButton,
          ]}
          disabled={isContinueButtonDisabled}
          onPress={handleLastVisitSave}
        >
          <Text style={styles.submitButtonText}>Continuar</Text>
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
    borderColor: "#39B061",
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
