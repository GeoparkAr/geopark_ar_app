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

export default function PerguntaQuatro() {
  const [selecionados, setSelecionados] = useState([]);
  const navigation = useNavigation();

  const {
    data: { docRef },
  } = useAuth();

  const Navigate = () => {
    navigation.navigate("Sucesso");
  };

  const handleLastVisitSave = async () => {
    let minAge = Infinity;
    let maxAge = -Infinity;

    // Itera sobre as opções selecionadas para determinar os valores mínimos e máximos
    selecionados.forEach((opcao) => {
      switch (opcao) {
        case "Crianças":
          minAge = Math.min(minAge, 0);
          maxAge = Math.max(maxAge, 11);
          break;
        case "Jovens e Adolescentes":
          minAge = Math.min(minAge, 12);
          maxAge = Math.max(maxAge, 19);
          break;
        case "Adultos":
          minAge = Math.min(minAge, 20);
          maxAge = Math.max(maxAge, 59);
          break;
        case "Idosos":
          minAge = Math.min(minAge, 60);
          maxAge = Math.max(maxAge, 100);
          break;
        default:
          break;
      }
    });

    // Cria a lista com base nos valores mínimos e máximos
    const ageRange = [minAge, maxAge];

    // Exibe a lista no console (você pode adaptar para armazenar ou usar de outra forma)
    console.log("Age Range:", ageRange);

    await updateDoc(docRef, {
      "lastVisit.geoparkAraripe.groupAgeRange": ageRange,
    })
      .then( () => {
        Navigate();
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Erro ao atualizar BD", errorMessage);
      });
  };

  const handleButtonClick = (opcao) => {
    // Verifica se a opção já está selecionada
    if (selecionados.includes(opcao)) {
      // Remove a opção se já estiver selecionada
      setSelecionados(selecionados.filter((item) => item !== opcao));
    } else {
      // Adiciona a opção se não estiver selecionada
      setSelecionados([...selecionados, opcao]);
    }
  };

  const isContinueButtonDisabled = selecionados.length === 0;

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className="justify-around items-center h-full w-full p-9">
        <View className="w-full justify-center items-center">
          <View className="">
            <Text className="text-xl font-bold text-[#374151] w-full text-justify">
              Qual faixa etária seu grupo possui?
            </Text>
            <Text className="text-base font-bold text-[#797979] w-full mb-5 text-justify">
              (selecione um ou mais)
            </Text>
          </View>
          <View className="w-full justify-center items-center gap-4">
            <TouchableOpacity
              style={[
                styles.button,
                selecionados.includes("Crianças") && styles.buttonClicked,
              ]}
              onPress={() => handleButtonClick("Crianças")}
            >
              <Text
                style={[
                  styles.buttonText,
                  selecionados.includes("Crianças") && styles.textClicked,
                ]}
              >
                Crianças
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selecionados.includes("Jovens e Adolescentes") &&
                  styles.buttonClicked,
              ]}
              onPress={() => handleButtonClick("Jovens e Adolescentes")}
            >
              <Text
                style={[
                  styles.buttonText,
                  selecionados.includes("Jovens e Adolescentes") &&
                    styles.textClicked,
                ]}
              >
                Jovens e Adolescentes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selecionados.includes("Adultos") && styles.buttonClicked,
              ]}
              onPress={() => handleButtonClick("Adultos")}
            >
              <Text
                style={[
                  styles.buttonText,
                  selecionados.includes("Adultos") && styles.textClicked,
                ]}
              >
                Adultos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selecionados.includes("Idosos") && styles.buttonClicked,
              ]}
              onPress={() => handleButtonClick("Idosos")}
            >
              <Text
                style={[
                  styles.buttonText,
                  selecionados.includes("Idosos") && styles.textClicked,
                ]}
              >
                Idosos
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
