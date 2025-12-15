import { images } from "@/constants/images";
import { updateEmail, updateName, updatePassword } from "@/services/appwrite";
import { useUser } from "@/services/useUser";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const { authChecked, user, logout } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    try {
      if (editName && name !== user?.name) {
        await updateName(name);
        setEditName(false);
      }

      if (editEmail && email !== user?.email) {
        if (!password) {
          setError("Please enter your current password to update email.");
        } else {
          await updateEmail(email, password);
          setEditEmail(false);
          setPassword("");
        }
      }

      if (editPassword) {
        if (!currentPassword || !newPassword) {
          setError("Please fill in both password fields.");
          return;
        }
        await updatePassword(newPassword, currentPassword);
        setEditPassword(false);
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (error: any) {
      setError(error?.message || "Failed to update profile.");
    }
  };

  useEffect(() => {
    if (authChecked && !user) {
      router.replace("/(auth)/login");
    }

    if (authChecked && user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [authChecked, user]);

  if (!authChecked) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-light-200 text-xl font-bold">Please wait...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      {/* Header */}
      <View className="items-center mb-10 mt-14">
        <View className="w-24 h-24 rounded-full bg-light-200 justify-center items-center mb-3">
          <Text className="text-primary text-3xl font-bold">{name[0]}</Text>
        </View>

        <Text className="text-light-200 text-xl font-bold">Hi, {name}</Text>
        <Text className="text-light-300 text-sm">{email}</Text>
      </View>

      {/* Profile Form */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
        className="flex-1 bg-dark-200 rounded-t-3xl px-6 pt-8"
      >
        <Text className="text-light-200 text-lg font-bold mb-4">
          Update Profile
        </Text>

        <View className="mb-1 flex flex-row justify-between items-center">
          <Text className="text-light-300 text-sm mb-1">Name</Text>
          <TouchableOpacity
            onPress={() => {
              setEditName(!editName);
            }}
          >
            <Text className="text-accent text-sm">
              {editName ? "Cancel" : "Edit"}
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={name}
          onChangeText={setName}
          editable={editName}
          placeholder="Name"
          className="bg-dark-100 rounded-lg p-4 mb-3 text-light-200"
        />

        <View className="mb-1 flex flex-row justify-between items-center">
          <Text className="text-light-300 text-sm mb-1">Email</Text>
          <TouchableOpacity
            onPress={() => {
              setEditEmail(!editEmail);
            }}
          >
            <Text className="text-accent text-sm">
              {editEmail ? "Cancel" : "Edit"}
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={email}
          onChangeText={setEmail}
          editable={editEmail}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#9CA4AB"
          className="bg-dark-100 rounded-lg p-4 mb-3 text-light-200"
        />

        {editEmail && (
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Current Password"
            secureTextEntry
            placeholderTextColor="#9CA4AB"
            className="bg-dark-100 rounded-lg p-4 mb-3 text-light-200"
          />
        )}

        <View className="mb-1 flex flex-row justify-between items-center">
          <Text className="text-light-300 text-sm mb-1">Password</Text>
          <TouchableOpacity onPress={() => setEditPassword(!editPassword)}>
            <Text className="text-accent text-sm">
              {editPassword ? "Cancel" : "Edit"}
            </Text>
          </TouchableOpacity>
        </View>
        {editPassword ? (
          <>
            <TextInput
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Current Password"
              secureTextEntry
              placeholderTextColor="#9CA4AB"
              className="bg-dark-100 rounded-lg p-4 mb-3 text-light-200"
            />
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="New Password"
              secureTextEntry
              placeholderTextColor="#9CA4AB"
              className="bg-dark-100 rounded-lg p-4 mb-3 text-light-200"
            />
          </>
        ) : (
          <Text className="bg-dark-100 rounded-lg p-4 mb-3 text-light-200">
            ********
          </Text>
        )}

        {error && (
          <Text className="text-rose-400 text-center mb-4">{error}</Text>
        )}

        {(editName || editEmail || editPassword) && (
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center mt-4 mb-6"
          >
            <Text className="text-center text-white font-semibold text-base">
              Save Changes
            </Text>
          </TouchableOpacity>
        )}

        {/* Logout */}
        <TouchableOpacity
          onPress={logout}
          className="border border-rose-400 py-3 rounded-lg"
        >
          <Text className="text-center text-rose-400 font-semibold">
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Profile;
