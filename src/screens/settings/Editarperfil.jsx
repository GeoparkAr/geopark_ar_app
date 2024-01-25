import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import { updatePassword, updateProfile } from "firebase/auth";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

export default function EditarPerfil() {
  // Estados para controle do nome
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState("");
  const [name, setName] = useState(user.displayName);
  const [isButtonNameEnabled, setIsButtonNameEnabled] = useState(false);
  // Estados para controle de senha
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editingPassword, setEditingPassword] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  // Estado para controle da ID di documento do usuário no BD
  const [documentID, setDocumentID] = useState("");

  // Função para identificar documento do usuário no BD e coletar sua ID
  const getDocumentID = async ()=>{
    const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDocumentID(doc.id);
    });
  };

  // Função para iniciar ou encerrar a edição do nome
  const startEditingName = () => {
    setEditingName(!editingName);
    getDocumentID();
  };

  // Função para finalizar a edição do nome
  const finishEditingName = async () => {
    setName(tempName);
    // Editando no Firebase Authentication
    await updateProfile(user, {
      displayName: tempName
    }).then(() => {
      setEditingName(false);
    }).catch((error) => {
      const errorMessage = error.message;
      Alert.alert("Erro ao atualizar nome", errorMessage);
    });
    // Editando no Firebase Firestore Database
    const docRef = doc(db, "users", documentID);
    await updateDoc(docRef, {
      "displayName": tempName
    }).then(() => {
    }).catch((error) => {
      const errorMessage = error.message;
      Alert.alert("Erro ao atualizar BD", errorMessage);
    });

  };

  // Função para iniciar ou encerrar a edição da senha
  const FistEditinPasswordFunction = () => {
    setEditingPassword(!editingPassword);
    setIsButtonEnabled(false);
  };

  // Função para encerrar a edição da senha
  const EndEditinPasswordFunction = async () => {
    await updatePassword(user, newPassword).then(() => {
      setEditingPassword(false);
    }).catch((error) => {
      const errorMessage = error.message;
      Alert.alert("Erro ao atualizar senha", errorMessage);
    });
  };

  // Função para lidar com mudanças na senha
  const handlePasswordChange = (text, field) => {
    if (field === "current") {
      setCurrentPassword(text);
    } else if (field === "new") {
      setNewPassword(text);
    }
    setIsButtonEnabled(
      currentPassword.trim().length > 4 && newPassword.trim().length > 4
    );
  };

  // Função para lidar com mudanças no nome
  const handleNameChange = (text) => {
    setTempName(text);
    setIsButtonNameEnabled(text.trim().length > 0);
  };

  //mudando estilos
  const buttonStyle = {
    backgroundColor: isButtonEnabled ? "#49a066" : "#d6d6d6",
  };
  const textStyle = {
    color: isButtonEnabled ? "#FFF" : "#747474",
  };
  const buttonNameStyle = {
    backgroundColor: isButtonNameEnabled ? "#49a066" : "#d6d6d6",
  };
  const textNameStyle = {
    color: isButtonNameEnabled ? "#FFF" : "#747474",
  };
  return (
    <View
      style={{
        backgroundColor: "#FFF",
        flex: 1,
        gap: 20,
      }}
    >
      <ScrollView>
        <View className="px-6 justify-center pt-4">
          <View className=" justify-center ">
            <TouchableOpacity
              className="flex-row items-center justify-between h-12 py-1 px-5 bg-[#f8f8f8] rounded-md"
              onPress={startEditingName}
            >
              <Text style={styles.title}>Nome</Text>
              <View className="flex-row gap-2 items-center">
                <Text style={styles.title2}>{name}</Text>
                <Entypo name="chevron-small-down" size={24} color="#5a5a5a" />
              </View>
            </TouchableOpacity>
            {/* editar nome */}
            {editingName && (
              <View className="flex-row justify-between my-4 bg-white gap-2">
                <TextInput
                  placeholder={name}
                  className="flex-1 bg-[#f8f8f8] py-1 px-5 rounded-md"
                  onChangeText={handleNameChange}
                />
                <TouchableOpacity
                  className=" bg-[#49a066] px-3  rounded-md justify-center items-center"
                  onPress={isButtonNameEnabled ? finishEditingName : undefined}
                  style={{ ...buttonNameStyle }}
                  disabled={!isButtonNameEnabled}
                >
                  <Text
                    className="text-white font-semibold"
                    style={{ ...textNameStyle }}
                  >
                    Concluído
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              className="flex-row items-center justify-between h-12 bg-[#f8f8f8] py-1 px-5 rounded-md mt-2"
              onPress={FistEditinPasswordFunction}
            >
              <Text style={styles.title}>Senha</Text>
              <View className="flex-row gap-2 items-center">
                <Entypo name="chevron-small-down" size={24} color="#5a5a5a" />
              </View>
            </TouchableOpacity>
            {/* editar senha */}
            {editingPassword && (
              <View className="flex-row justify-between my-4 bg-white z-50 gap-2">
                <TextInput
                  placeholder="Senha atual"
                  className="w-[30vw] bg-[#f8f8f8] py-1 px-5 rounded-md flex-1"
                  secureTextEntry={true}
                  onChangeText={(text) => handlePasswordChange(text, "current")}
                />
                <TextInput
                  placeholder="Nova senha"
                  className="w-[30vw] bg-[#f8f8f8] py-1 px-5 rounded-md flex-1"
                  secureTextEntry={true}
                  onChangeText={(text) => handlePasswordChange(text, "new")}
                />

                <TouchableOpacity
                  className={`bg-[#49a066] px-3  rounded-md justify-center items-center`}
                  onPress={EndEditinPasswordFunction}
                  disabled={!isButtonEnabled}
                  style={{ ...buttonStyle }}
                >
                  <Text
                    className="text-white font-semibold"
                    style={{ ...textStyle }}
                  >
                    Concluído
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title2: {
    fontWeight: "200",
    fontSize: 15,
    color: "#5a5a5a",
  },
  title: {
    color: "#18241B",
    fontSize: 16,
    fontWeight: "400",
  },
  textButton: {
    fontWeight: "600",
    fontSize: 18,
    color: "#FFF",
  },
});
