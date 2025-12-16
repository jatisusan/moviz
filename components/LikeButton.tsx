import { icons } from "@/constants/icons";
import { checkSavedMovie, updateSavedMovie } from "@/services/appwrite";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity } from "react-native";

const LikeButton = ({
  userId,
  movie,
}: {
  userId: string;
  movie: SavedMovie;
}) => {
  const [liked, setLiked] = useState(false);
  const [checking, setChecking] = useState(true);
  const [updatingLike, setUpdatingLike] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const result = await checkSavedMovie(userId, movie.movie_id);
        setLiked(result.length > 0);
      } catch (error) {
        console.log("Error fetching like status:", error);
      } finally {
        setChecking(false);
      }
    };

    fetchLikeStatus();
  }, [userId, movie.movie_id]);

  const toggleSave = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setUpdatingLike(true);
    try {
      await updateSavedMovie(userId, movie);
    } catch (error) {
      console.log("Error toggling save:", error);
      setLiked(!newLiked);
    } finally {
      setUpdatingLike(false);
    }
  };

  if (checking) {
    // Show loading state while checking DB
    return <ActivityIndicator color="#AB8BFF" />;
  }

  return (
    <TouchableOpacity onPress={toggleSave}>
      {updatingLike ? (
        <ActivityIndicator color="#AB8BFF" />
      ) : (
        <Image
          source={liked ? icons.saved : icons.save}
          className="size-7"
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
};

export default LikeButton;
