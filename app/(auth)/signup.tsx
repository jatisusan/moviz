import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useUser } from "@/services/useUser";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { signup } = useUser();

  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await signup(email, password, name);
      router.push("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <View className="flex-1 px-6">
        <Image source={icons.logo} className="mx-auto w-12 h-10 mb-5 mt-20" />
        <View className="mt-20">
          <Text className="mb-10 text-center text-xl font-bold tracking-tight text-white">
            Create a new account
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="#a8b5db"
            className="bg-dark-200 px-6 py-5 rounded-lg text-white mb-6 "
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#a8b5db"
            className="bg-dark-200 px-6 py-5 rounded-lg text-white mb-6 "
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#a8b5db"
            className="bg-dark-200 px-5 py-5 rounded-lg text-white mb-6"
          />

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading}
            className=" bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center mt-4"
          >
            <Text className="text-white text-base font-semibold">
              {isLoading ? "Please wait..." : "Sign Up"}
            </Text>
          </TouchableOpacity>

          {error && (
            <Text className="text-rose-300 my-5 text-center">
              {String(error)}
            </Text>
          )}

          <View className="flex-row items-center justify-center mt-8">
            <Text className=" text-light-200 font-semibold">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text className=" text-accent font-semibold ml-2">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/")}
        className="absolute bottom-10 right-0 mx-5 bg-dark-200 rounded-lg py-3.5 px-5 flex flex-row items-center justify-center z-50"
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#a8b5db"
        />
        <Text className="text-[#a8b5db] text-base font-semibold">Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
