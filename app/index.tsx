"use client";

import { useState } from "react";
import { StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (!name.trim()) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Пожалуйста, введите ваше имя",
      });
      return;
    }

    router.push({
      pathname: "/menu",
      params: { name },
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.container}>
        <Image
          source={require("@/assets/images/placeholder.svg")}
          style={styles.logo}
          resizeMode="contain"
        />

        <ThemedText type="title" style={styles.title}>
          Добро пожаловать в Гурман
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Введите ваше имя"
          placeholderTextColor="#666"
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <ThemedText style={styles.buttonText}>Продолжить</ThemedText>
        </TouchableOpacity>

        <Toast />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: "#fff",
    backgroundColor: "#222",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#00a86b",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
