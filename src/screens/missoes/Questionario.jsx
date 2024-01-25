import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { SelectCountry } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useAuth } from "../../hooks/useAuth";
import { updateDoc } from "firebase/firestore";

export default function Questionario() {
  const navigation = useNavigation();
  const { data: { docRef } } = useAuth();

  //verificar se todos os campos foram preenchidos
  const navigateToTarefas = () => {
    if (validateFields()) {
      navigation.navigate("Tarefas");
    } else {
      Alert.alert(
        "Campos obrigatórios",
        "Por favor, preencha todos os campos obrigatórios."
      );
    }
  };

  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [groupSize, setGroupSize] = useState("");
  const [visitPurpose, setVisitPurpose] = useState("");

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
      } catch (error) {
        console.error("Error fetching state data:", error);
      }
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
        } catch (error) {
          console.error("Error fetching city data:", error);
        }
      }
    };

    fetchCities();
  }, [state]);

  //opções no select customizado
  const yesNoOptions = [
    { value: "yes", label: "Sim" },
    { value: "no", label: "Não" },
  ];

  //lidando com os valores das idades
  const [ageRange, setAgeRange] = useState([20, 50]);

  const handleValuesChange = (values) => {
    setAgeRange(values);
  };

  const validateFields = () => {
    return Boolean(groupSize && state && city && selectedOption);
  };

  const handleLastVisitSave = async () => {
    const cityFinded = cityData.find(cityFind => cityFind.value === city)
    await updateDoc(docRef, {
      "lastVisit.geoparkAraripe.groupSize": groupSize,
      "lastVisit.geoparkAraripe.originState": state,
      "lastVisit.geoparkAraripe.originCity": cityFinded.label,
      "lastVisit.geoparkAraripe.groupAgeRange": ageRange,
      "lastVisit.geoparkAraripe.visitPurpose": selectedOption,
    }).then(() => {
      navigateToTarefas();
    }).catch((error) => {
      const errorMessage = error.message;
      Alert.alert("Erro ao atualizar BD", errorMessage);
    });
  }

  return (
    <ScrollView style={{ backgroundColor: "#FFF", flex: 1 }}>
      <View>
        <View style={{ alignItems: "center" }}>
          <View style={{ marginHorizontal: 26 }}>
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 20,
                    color: "#18241B",
                    marginTop: 10,
                  }}
                >
                  Pesquisa
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 20,
                    color: "#18241B",
                  }}
                >
                  Geopark Araripe
                </Text>
              </View>
            </View>

            <View style={{ gap: 15 }}>
              <View style={{ gap: 10 }}>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 16,
                    color: "#18241B",
                    marginTop: 20,
                  }}
                >
                  Quantas pessoas estão no seu grupo?
                </Text>
                <TextInput
                  placeholder="01"
                  style={styles.dropdown2}
                  keyboardType="numeric"
                  value={groupSize}
                  onChangeText={(text) => setGroupSize(text)}
                  maxLength={2}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 16,
                    color: "#18241B",
                  }}
                >
                  De onde veio para visitar o Padre Cícero?
                </Text>
                <View
                  style={{ marginVertical: 10, flexDirection: "row", gap: 20 }}
                >
                  <SelectCountry
                    search
                    style={styles.dropdown}
                    selectedTextStyle={styles.selectedTextStyle}
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
                    style={styles.dropdown}
                    selectedTextStyle={styles.selectedTextStyle}
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
                  O objetivo principal da sua visita a cidade de Juazeiro do
                  Norte é visitar a Colina do Horto?
                </Text>
                <SelectCountry
                  style={styles.dropdown2}
                  value={selectedOption}
                  data={yesNoOptions}
                  valueField="value"
                  labelField="label"
                  placeholder="Selecione"
                  onChange={(e) => {
                    setSelectedOption(e.value);
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 16,
                    color: "#18241B",
                    marginTop: 20,
                  }}
                >
                  Qual faixa etária seu grupo possui?
                </Text>
                <View style={{ alignSelf: "center" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{ageRange[0]}</Text>
                    <Text style={{ fontSize: 16 }}>{ageRange[1]}</Text>
                  </View>

                  <MultiSlider
                    values={ageRange}
                    min={0}
                    max={100}
                    step={1}
                    sliderLength={310}
                    onValuesChange={handleValuesChange}
                    allowOverlap={false}
                    snapped={false}
                    isMarkersSeparated={true}
                  />
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              width: 137,
              height: 44,
              backgroundColor: "#287D44",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
            onPress={handleLastVisitSave}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
                color: "#fff",
              }}
            >
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 8,
    borderColor: "#18241B",
    borderWidth: 1,
  },
  dropdown2: {
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 8,
    borderColor: "#18241B",
    borderWidth: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    fontWeight: "600",
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
