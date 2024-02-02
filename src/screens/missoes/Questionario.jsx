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
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export default function Questionario() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const {
    data: { docRef },
  } = useAuth();

  const [documentID, setDocumentID] = useState("");

  const getDocumentID = async () => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDocumentID(doc.id);
    });
  };

  //verificar se está logado e coletar o a ID do documento do usuário no BD
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setAuthChecked(true);
    });
    getDocumentID();
    console.log(user);
    return () => unsubscribe();
  }, []);

  const checkAuthentication = async () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        setUser(authUser);
        setAuthChecked(true);
        resolve();
      });
      return () => unsubscribe();
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await checkAuthentication();
    };

    fetchData();
  }, []);
  const [mission1Status, setMission1Status] = useState(false);

  // ...

  useEffect(() => {
    const fetchData = async () => {
      await checkAuthentication();

      // Agora que você tem o documentID, pode buscar a informação do banco de dados
      const docRef = doc(db, "users", documentID);
      const docSnapshot = await getDoc(docRef);

      // Obtenha o status da mission1 do banco de dados
      const mission1Value =
        docSnapshot.data()?.stamps.geoparkAraripe.mission1 || false;

      // Atualize o estado
      setMission1Status(mission1Value);
    };

    fetchData();
  }, [documentID]);
  
  //verificar se todos os campos foram preenchidos
  const navigateToTarefas = async () => {
    if (validateFields()) {
      navigation.navigate("Tarefas");
      const docRef = doc(db, "users", documentID);

      // Configurar mission1 como true
      await updateDoc(docRef, {
        "stamps.geoparkAraripe.mission1": true,
      })
        .then(() => {
          setMission1Status(true);
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert("Erro ao atualizar BD", errorMessage);
        });
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
    const cityFinded = cityData.find((cityFind) => cityFind.value === city);
  
    if (cityFinded) {
      await updateDoc(docRef, {
        "lastVisit.geoparkAraripe.groupSize": groupSize,
        "lastVisit.geoparkAraripe.originState": state,
        "lastVisit.geoparkAraripe.originCity": cityFinded.label,
        "lastVisit.geoparkAraripe.groupAgeRange": ageRange,
        "lastVisit.geoparkAraripe.visitPurpose": selectedOption,
      })
        .then(() => {
          navigateToTarefas();
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert("Erro ao atualizar BD", errorMessage);
        });
    } else {
      Alert.alert("Informações Pendentes", "Preencha todos os campos.");
    }
  };
  
  const handleContinuarPress = async () => {
    if (validateFields()) {
      navigation.navigate("Tarefas");
      const docRef = doc(db, "users", documentID);

      await updateDoc(docRef, {
        "stamps.geoparkAraripe.mission1": true,
        "lastVisit.geoparkAraripe.groupSize": groupSize,
        "lastVisit.geoparkAraripe.originState": state,
        "lastVisit.geoparkAraripe.originCity": city,
        "lastVisit.geoparkAraripe.groupAgeRange": ageRange,
        "lastVisit.geoparkAraripe.visitPurpose": selectedOption,
      })
        .then(() => {
          setMission1Status(true);
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert("Erro ao atualizar BD", errorMessage);
        });
    } else {
      Alert.alert(
        "Campos obrigatórios",
        "Por favor, preencha todos os campos obrigatórios."
      );
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#FFF", flex: 1 }}>
      <View className="justify-around flex h-full py-4 px-6 gap-9">
        <View className="gap-3">
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              color: "#18241B",
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
        <View className="gap-3">
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              color: "#18241B",
            }}
          >
            De onde veio para visitar o Padre Cícero?
          </Text>
          <View style={{ marginVertical: 10, flexDirection: "row", gap: 20 }}>
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
        <View className="gap-3">
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              color: "#18241B",
              textAlign: "justify",
            }}
          >
            O objetivo principal da sua visita a cidade de Juazeiro do Norte é
            visitar a Colina do Horto?
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
        <View className="gap-3">
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              color: "#18241B",
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
        <TouchableOpacity
          className="h-14 rounded-[10px] flex justify-center items-center bg-[#39B061] mt-7"
          onPress={handleContinuarPress}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 8,
    borderColor: "#18241B",
    borderWidth: 1,
  },
  dropdown2: {
    height: 40,
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
