import { images } from "@/constants/images";
import { getSavedMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useUser } from "@/services/useUser";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";

const Saved = () => {
  const { user, authChecked } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (authChecked && !user) {
      router.replace("/(auth)/login");
    }
  }, [authChecked, user]);

  const {
    data: savedMovies,
    loading,
    error,
  } = useFetch(() => getSavedMovies(user!.$id), Boolean(authChecked && user));

  console.log(savedMovies);
  return (
    <View className="flex-1 bg-primary justify-center items-center">
      <Image source={images.bg} className="absolute w-full z-0 top-0" />

      <Text className="text-light-200 font-bold text-xl">Coming soon! </Text>
    </View>
  );
};

export default Saved;
