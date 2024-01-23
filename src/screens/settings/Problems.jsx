import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Link, useNavigation } from "@react-navigation/native";

export default function Problems() {
  const navigation = useNavigation();

  const Config = () => {
    navigation.navigate("Configuracoes");
  };

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        flex: 1,
      }}
    >

      <ScrollView style={{ paddingHorizontal: 20, marginBottom: 1 }}>
        <Text style={styles.title}>Relate um erro</Text>
        <TextInput
          placeholder="Escreva aqui"
          multiline={true}
          style={{
            backgroundColor: "#2427600D",
            width: "100%",
            height: 200,
            paddingLeft: 10,
            borderRadius: 10,
            fontSize: 14,
            marginBottom: 8,
            textAlignVertical: "top",
            paddingTop: 6
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: "#DAF1E2",
            width: 100,
            paddingVertical: 5,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "#18241B",
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
    fontSize: 14,
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
});
