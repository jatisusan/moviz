import { images } from "@/constants/images";
import React from "react";
import { Image, Text, View } from "react-native";

const profile = () => {
  return (
    <View className="flex-1 bg-primary justify-center items-center">
      <Image source={images.bg} className="absolute w-full z-0 top-0" />

      <Text className="text-light-200 text-xl font-bold">Coming soon! </Text>
    </View>
  );
};

export default profile;
