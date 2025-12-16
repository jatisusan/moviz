import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const SavedMovieCard = ({
  user_id,
  movie_id,
  poster_url,
  title,
}: SavedMovie) => {
  return (
    <Link href={`/movies/${movie_id}`}>
      <TouchableOpacity>
        <Image
          source={{
            uri:
              poster_url ||
              "https://placehold.co/600x900/1a1a1a/9CA4AB.png?text=No+Image",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default SavedMovieCard;
