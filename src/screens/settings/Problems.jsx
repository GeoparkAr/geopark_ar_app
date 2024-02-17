import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  View,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SelectCountry } from "react-native-element-dropdown";
import { db } from "../../firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

export default function Problems() {
  const {
    data: { user },
  } = useAuth();

  const navigation = useNavigation();

  const [problemType, setProblemType] = useState("");
  const [report, setReport] = useState("");

  function replacer(key, value) {
    return key;
  }

  const handleProblemReport = async () => {
    if (!checkFieldValidation()) {
      Alert.alert("Erro", "Preencha todos os campos");
    } else if (report.trim().length < 15) {
      Alert.alert(
        "Erro",
        "Relato muito curto. Por favor, explique melhor o ocorrido."
      );
    } else {
      await setDoc(
        doc(
          db,
          "reportedProblems",
          Timestamp.now().seconds + "." + Timestamp.now().nanoseconds
        ),
        {
          problemType: problemType,
          report: report,
          date: Timestamp.now(),
          user: user.uid,
        }
      )
        .then(() => {
          navigation.navigate("Home");
          Alert.alert(
            "Relato registrado",
            "Muito obrigado pela contribuição.\nSeu relato já foi salvo em nosso banco de dados."
          );
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert("Erro gravar relato no BD", errorMessage);
        });
    }
  };

  const handleReportChange = (text) => {
    setReport(text);
  };

  const problemTypeOptions = [
    { value: "appLayout", label: "Aparência do app" },
    { value: "userConfig", label: "Configurações de usuário" },
    { value: "missions", label: "Missões" },
    { value: "others", label: "Outros" },
  ];

  const checkFieldValidation = () => {
    return Boolean(problemType && report);
  };

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        flex: 1,
      }}
    >
      <ScrollView style={{ paddingHorizontal: 20, marginBottom: 1 }}>
        <View>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              color: "#18241B",
              textAlign: "justify",
              marginVertical: 10,
            }}
          >
            Qual tipo de problema você deseja relatar?
          </Text>
          <SelectCountry
            style={styles.dropdown}
            value={problemType}
            data={problemTypeOptions}
            valueField="value"
            labelField="label"
            placeholder="Selecione"
            onChange={(e) => {
              setProblemType(e.value);
            }}
          />
        </View>
        <View style={{ marginBottom: 20 }} />
        <TextInput
          placeholder="Escreva aqui. Mínimo de 15 caracteres (sem espaço)."
          multiline={true}
          className="flex-1 bg-[#f8f8f8] py-1 px-5 rounded-md h-10"
          style={{
            backgroundColor: "#2427600D",
            width: "100%",
            height: 200,
            paddingLeft: 10,
            borderRadius: 10,
            fontSize: 14,
            marginBottom: 8,
            textAlignVertical: "top",
            paddingTop: 6,
          }}
          onChangeText={handleReportChange}
        />

        <TouchableOpacity
          className="h-14 rounded-[10px] flex justify-center items-center w-full bg-[#39B061] mt-7"
          onPress={handleProblemReport}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Enviar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "justify",
  },
  title: {
    color: "#18241B",
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 18,
  },
  title2: {
    color: "#18241B",
    fontSize: 16,
    marginVertical: 4,
  },
  dropdown: {
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 8,
    borderColor: "#18241B",
    borderWidth: 1,
    fontSize: 16,
  },
});
