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
import { SelectCountry } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";
import {
  updateDoc
} from "firebase/firestore";
import { useAuth } from "../../../hooks/useAuth";

export default function PerguntaDois() {
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const navigation = useNavigation();

  function Navigate() {
    navigation.navigate("PerguntaTres");
  }

  const isContinueButtonDisabled = !state || !city;

  //chamando os estados do brasil na api do governo
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
        );
        const data = await response.json();
        setStateData(
          data.map((state) => ({ value: state.sigla, label: state.nome }))
        );
      } catch (error) {}
    };

    fetchData();
  }, []);

  //chamando os municípios do brasil na api do governo
  useEffect(() => {
    const fetchCities = async () => {
      if (state) {
        try {
          const response = await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
          );
          const data = await response.json();
          setCityData(
            data.map((city) => ({ value: city.id, label: city.nome }))
          );
        } catch (error) {}
      }
    };

    fetchCities();
  }, [state]);

  const {
    data: { docRef },
  } = useAuth();

  const handleLastVisitSave = async () => {
    const cityFinded = cityData.find(cityFind => cityFind.value === city)
    await updateDoc(docRef, {
      "lastVisit.geoparkAraripe.originState": state,
      "lastVisit.geoparkAraripe.originCity": cityFinded.label,
    })
      .then(() => {
        Navigate();
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Erro ao atualizar BD", errorMessage);
      });
  };

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className="justify-around items-center h-full w-full p-9">
        <View className="w-full justify-center items-center">
          <Text className="text-xl font-bold text-[#374151] w-full mb-5 text-justify">
            Qual é a sua cidade de origem ao visitar o Padre Cícero?
          </Text>
          <View className="w-full justify-center items-center gap-4">
            <SelectCountry
              search
              style={styles.button}
              selectedTextStyle={styles.buttonText}
              placeholderStyle={styles.placeholderStyle}
              imageStyle={styles.imageStyle}
              iconStyle={styles.iconStyle}
              maxHeight={200}
              value={state}
              data={stateData}
              valueField="value"
              labelField="label"
              placeholder="Estado"
              searchPlaceholder="Procurar"
              onChange={(e) => {
                setState(e.value);
              }}
            />
            <SelectCountry
              search
              style={styles.button}
              selectedTextStyle={styles.buttonText}
              placeholderStyle={styles.placeholderStyle}
              imageStyle={styles.imageStyle}
              iconStyle={styles.iconStyle}
              maxHeight={200}
              value={city}
              data={cityData}
              valueField="value"
              labelField="label"
              placeholder="Cidade"
              searchPlaceholder="Procurar"
              onChange={(e) => {
                setCity(e.value);
              }}
            />
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
    paddingHorizontal: 10,
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
