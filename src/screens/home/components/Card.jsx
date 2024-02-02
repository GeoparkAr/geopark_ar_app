import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

//propriedades que devem ser importadas
export default function Card({ nome, municipio, source }) {
  return (
    <View className="bg-[#39B061] justify-around items-center rounded-xl mb-3 w-[85vw] flex-row h-36 max-w-sm">
      <Image className="w-24 h-24 rounded-lg" source={source} />
      <View className="justify-center h-full gap-3">
        <Text className="text-base font-semibold text-white w-36">{nome}</Text>
        <View className="flex-row items-center">
          <View className="justify-center items-center flex-row">
            <Entypo name="location-pin" size={24} color="#1A4E38" />
            <Text className="text-white text-xs font-medium w-14 justify-center items-center mx-1">
              {municipio}
            </Text>
          </View>

          <TouchableOpacity className="bg-[#1A4E38] h-7 justify-center items-center px-2 rounded-lg ">
            <Text className="text-white font-medium text-xs">Em breve</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
