import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

//propriedades que devem ser importadas
export default function Card({ nome, municipio, source }) {
  return (
    <View
      className=" justify-center items-center rounded-xl mb-3 w-[40vw] h-48 max-w-[230px]
     border-[#E1E1E1] border"
    >
      <Image className="h-20 w-20 rounded-full mb-2" source={source} />
      <Text className="text-sm text-center font-semibold w-36 mb-2">
        {nome}
      </Text>
      <TouchableOpacity className="bg-[#88d0a0] h-7 justify-center items-center px-3 rounded-2xl ">
        <Text className=" font-medium text-xs text-[#194e2a]">Em breve!</Text>
      </TouchableOpacity>
    </View>
  );
}
