import { StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { dishes, Dish } from "@/data/dishes";

export default function MenuScreen() {
  const { name } = useLocalSearchParams();
  const router = useRouter();

  const handlePlaceOrder = () => {
    router.push({
      pathname: "/order",
      params: { name },
    });
  };

  const renderDishItem = ({ item }: { item: Dish }) => (
    <ThemedView style={styles.dishItem}>
      <Image source={item.image} style={styles.dishImage} />
      <ThemedView style={styles.dishInfo}>
        <ThemedText type="subtitle">{item.name}</ThemedText>
        <ThemedText style={styles.description}>{item.description}</ThemedText>
        <ThemedText style={styles.price}>{item.price} ₽</ThemedText>
      </ThemedView>
    </ThemedView>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Меню",
          headerStyle: { backgroundColor: "#121212" },
          headerTintColor: "#fff",
          headerBackTitle: "Назад",
        }}
      />
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle" style={styles.greeting}>
          Привет, {name}! Вот наше меню:
        </ThemedText>

        <FlatList
          data={dishes}
          renderItem={renderDishItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />

        <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
          <ThemedText style={styles.buttonText}>Сделать заказ</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  greeting: {
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  dishItem: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#1e1e1e",
  },
  dishImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  dishInfo: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: "transparent",
  },
  description: {
    color: "#aaa",
    marginTop: 4,
    marginBottom: 8,
  },
  price: {
    fontWeight: "bold",
    color: "#00a86b",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#00a86b",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
