import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { updateDoc } from "firebase/firestore";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

export default function PerguntaUm() {
  const [clicado, setClicado] = useState(null);
  
  const navigation = useNavigation();
  function Navigate() {
    navigation.navigate("PerguntaDois");
  }

  const handleButtonClick = (opcao) => {
    setClicado(opcao);
  };

  const {
    data: { docRef },
  } = useAuth();

  const handleLastVisitSave = async () => {
    await updateDoc(docRef, {
      "lastVisit.geoparkAraripe.groupSize": converterParaNumero(clicado),
    })
      .then(() => {
        Navigate();
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Erro ao atualizar BD", errorMessage);
      });
  };

  const isContinueButtonDisabled = clicado === null;

  const converterParaNumero = (opcao) => {
    switch (opcao) {
      case "1 á 3":
        return 1;
      case "3 á 5":
        return 2;
      case "Mais de 5":
        return 3;
      case "Não estou em grupo":
        return 0;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className="justify-around items-center h-full w-full p-9">
        <View className="w-full justify-center items-center">
          <Text className="text-xl font-bold text-[#374151] w-full mb-5 text-justify">
            Quantas Pessoas estão no seu grupo?
          </Text>
          <View className="w-full justify-center items-center gap-4">
            <TouchableOpacity
              style={[
                styles.button,
                clicado === "1 á 3" && styles.buttonClicked,
              ]}
              onPress={() => handleButtonClick("1 á 3")}
            >
              <Text
                style={[
                  styles.buttonText,
                  clicado === "1 á 3" && styles.textClicked,
                ]}
              >
                1 á 3
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                clicado === "3 á 5" && styles.buttonClicked,
              ]}
              onPress={() => handleButtonClick("3 á 5")}
            >
              <Text
                style={[
                  styles.buttonText,
                  clicado === "3 á 5" && styles.textClicked,
                ]}
              >
                3 á 5
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                clicado === "Mais de 5" && styles.buttonClicked,
              ]}
              onPress={() => handleButtonClick("Mais de 5")}
            >
              <Text
                style={[
                  styles.buttonText,
                  clicado === "Mais de 5" && styles.textClicked,
                ]}
              >
                Mais de 5
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                clicado === "Não estou em grupo" && styles.buttonClicked,
              ]}
              onPress={() => handleButtonClick("Não estou em grupo")}
            >
              <Text
                style={[
                  styles.buttonText,
                  clicado === "Não estou em grupo" && styles.textClicked,
                ]}
              >
                Não estou em grupo
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
    backgroundColor: "#39B610", // Cor quando clicado
    borderColor: "#39B610",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#727272",
  },
  image: {
    width: 56,
    height: 40,
    marginTop: 2,
  },
  submitButton: {
    height: 50,
    backgroundColor: "#39B610",
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
    backgroundColor: "#BBB",
  },
});
