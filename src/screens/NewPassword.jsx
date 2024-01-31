import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function NewPassword() {
  return (
    <View className="bg-white h-full pt-4">
      <ScrollView className="px-8 bg-white">
        <TextInput
          placeholder="Digite sua nova senha"
          style={styles.input}
          className="mb-5 pl-3"
        />
        <TextInput
          placeholder="Confirmar nova senha"
          style={styles.input}
          className="mb-5 pl-3"
          secureTextEntry
        />

        <TouchableOpacity className="h-14 rounded-[10px] flex justify-center items-center w-full bg-[#39B061] mt-8">
          <Text style={styles.textButton}>Confirmar</Text>
        </TouchableOpacity>
       
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    height: 55,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#18241B",
    color: "#18241B",
  },
  text: {
    fontSize: 14,
    marginBottom: 48,
    color: "#18241B",
    alignSelf: "flex-end",
  },
  text2: {
    fontSize: 16,
    color: "#C5C5C5",
    marginHorizontal: 28,
  },
  textButton: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "700",
  },
  view: {
    height: 1,
    backgroundColor: "#C5C5C5",
    flex: 1,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftLine: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
    marginRight: 5,
  },
  rightLine: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
    marginLeft: 5,
  },
  textGoogle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#18241B",
  },
  title: {
    fontWeight: "600",
  },
});
