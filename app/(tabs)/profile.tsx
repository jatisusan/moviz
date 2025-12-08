import { images } from "@/constants/images";
import { useUser } from "@/services/useUser";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";

const Profile = () => {
  const { authChecked, user } = useUser();

  useEffect(() => {
    if (authChecked && !user) {
      router.replace("/(auth)/login");
    }
  }, [authChecked, user]);

  if (!authChecked)
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-light-200 text-xl font-bold">Please Wait...</Text>
      </View>
    );
  return (
    <View className="flex-1 bg-primary justify-center items-center">
      <Image source={images.bg} className="absolute w-full z-0 top-0" />

      <Text className="text-light-200 text-xl font-bold">Coming soon! </Text>
    </View>
  );
};

export default Profile;
