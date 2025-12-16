import LikeButton from "@/components/LikeButton";
import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useUser } from "@/services/useUser";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-sm text-light-200 font-normal">{label}</Text>
    <Text className="text-[13.2px] text-light-300 leading-[1.4rem] mt-2 font-bold">
      {value ?? "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { user } = useUser();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <View>
          <Image
            className="w-full h-[550px]"
            source={{
              uri: movie?.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                : "https://placehold.co/600x900/1a1a1a/9CA4AB.png?text=No+Image",
            }}
            resizeMode="cover"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <View className=" flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-white font-bold text-xl">
                {movie?.title}
              </Text>

              <View className="flex-row items-center gap-x-2 mt-2">
                <Text className="text-sm text-light-200">
                  {movie?.release_date?.split("-")[0]}
                </Text>
                <Text className="text-lg text-light-200">•</Text>
                <Text className="text-sm text-light-200">
                  {movie?.runtime}m
                </Text>
              </View>
            </View>

            {movie && user !== null && (
              <LikeButton
                userId={user.$id as string}
                movie={{
                  movie_id: movie.id.toString(),
                  title: movie.title,
                  poster_url: movie.poster_path,
                }}
              />
            )}
          </View>

          <View className="flex-row items-center bg-dark-100 px-2.5 py-2 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-sm text-white font-bold">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-sm text-light-200">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres.map((g) => g.name).join(" - ") || "N/A"}
          />

          <View className="flex-row justify-between w-[75%]">
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget! / 1000000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue! / 1000000)} million`}
            />
          </View>

          <MovieInfo label="Tagline" value={movie?.tagline} />

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies.map((c) => c.name).join(", ") || "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={router.back}
        className="absolute bottom-10 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white text-base font-semibold">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
