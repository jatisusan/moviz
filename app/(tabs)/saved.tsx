import SavedMovieCard from "@/components/SavedMovieCard";
import { images } from "@/constants/images";
import { getSavedMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useUser } from "@/services/useUser";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

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

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0 top-0" />

      <FlatList
        className="px-5"
        data={savedMovies}
        keyExtractor={(item) => item.movie_id.toString()}
        renderItem={({ item }) => <SavedMovieCard {...item} />}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          marginBottom: 15,
          paddingRight: 5,
        }}
        ListHeaderComponent={
          <>
            <Text className="text-lg text-white font-bold mt-16 mb-5">
              Your saved movies
            </Text>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-rose-400 px-5 my-3">
                Error: {error.message}
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          <View>
            <Text className="text-light-200 text-center my-6">
              You have no saved movies.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Saved;
