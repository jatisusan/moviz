import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
    placeholder: string;
    onPress?: () => void;
    onChangeText?: (text: string) => void;
    value?: string;
}

const SearchBar = ({onPress, placeholder, value, onChangeText}: Props) => {
  return (
    <View className="bg-dark-200 px-5 py-2 flex-row items-center rounded-full">
      <Image
        source={icons.search}
        tintColor="#AB8BFF"
        className="size-5"
        resizeMode="contain"
      />
      <TextInput
        onPress={onPress}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
