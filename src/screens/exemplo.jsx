import { Button, View } from "react-native";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export default function Exemplo() {
  const [botao1, setBotao1] = useState(false);
  const [botao2, setBotao2] = useState(false);
  const [botao3, setBotao3] = useState(false);

  const {
    data: { docRef },
  } = useAuth();

  const handleClick1 = async () => {
    
  };
  const handleClick2 = async () => {
    setBotao2(true);
    await updateDoc(docRef, {
      "stamps.geoparkAraripe.geoparkAraripeStamp": botao2,
    })
      .then(() => {
        console.log("Valor enviado para missão 7:", botao2);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Erro ao atualizar BD", errorMessage);
      });
  };

  const buttonsCollection = collection(
    db,
    "stamps.geoparkAraripe.geoparkAraripeStamp"
  );

  useEffect(() => {
    const getButton = async () => {
      try {
        const data = await getDocs(buttonsCollection);
        console.log(data)
      } catch (error) {
        console.log("não foi possivel:", buttonsCollection);
      }
    };
    getButton();
  });

  return (
    <View className="flex-1 justify-around items-center bg-red-600 gap-5">
      <Button title="botão um" onPress={handleClick1} />
      <Button title="botão dois" disabled={!botao1} onPress={handleClick2} />
      <Button title="botão tres" disabled={!botao2} />
    </View>
  );
}
