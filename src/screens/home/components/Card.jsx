import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

//propriedades que devem ser importadas
export default function Card({ nome, municipio, source }) {
  return (
    <View style={styles.geossitio}>
      <Image style={styles.imgGeossitio} source={source} />
      <Text style={styles.geossitioNome}>{nome}</Text>
      <View style={styles.inforButton}>
        <Text style={styles.municipio}>{municipio}</Text>
        <View style={styles.button}>
          <Text style={styles.embreve}>Em breve!</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  geossitio: {
    width: 150,
    height: 216,
    backgroundColor: "#FFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    paddingHorizontal: 10,
    shadowColor: "#18241B",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  geossitioNome: {
    color: "#18241B",
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 5,
  },
  municipio: {
    color: "#18241B",
    fontWeight: "500",
    fontSize: 10,
    width: 55,
    textAlign: "center",
  },
  button: {
    width: 70,
    height: 25.5,
    backgroundColor: "#18241B",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  inforButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 5,
  },
  embreve: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 11,
  },
});
