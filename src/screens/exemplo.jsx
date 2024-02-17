import { Button, View } from "react-native";
import { useState, useEffect } from "react";
import {
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export default function Exemplo() {
  const [botao1, setBotao1] = useState(false);
  const [botao2, setBotao2] = useState(false);
  const [botao3, setBotao3] = useState(false);

  const {
    data: { user, docRef },
    setUser,
} = useAuth();

  function handleClick1() {
    console.log("clicado");
  }
  function handleClick2() {
    console.log("clicado");
  }

  const getVisitorData = async () => {
    const docSnap = await getDoc(docRef);
    setBotao1(docSnap.data().stamps.geoparkAraripe.mission1);
    setBotao2(docSnap.data().stamps.geoparkAraripe.mission2);
    setBotao3(docSnap.data().stamps.geoparkAraripe.mission3);
    console.log(botao1)
  };

  useEffect(() => {
    getVisitorData();
  });

  return (
    <View className="flex-1 justify-around items-center bg-red-600 gap-5">
      <Button title="botão um" onPress={handleClick1} />
      <Button title="botão dois" disabled={!botao1} onPress={handleClick2} />
      <Button title="botão tres" disabled={!botao2} />
    </View>
  );
}
