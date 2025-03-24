import { useState, useEffect } from "react";
import { StyleSheet, FlatList, TouchableOpacity, View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Minus, Plus, ShoppingBag } from "lucide-react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { dishes, Dish } from "@/constants/Dishes";

interface OrderItem extends Dish {
  quantity: number;
}

export default function OrderScreen() {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [total, setTotal] = useState(0);

  // Initialize order items with quantity 0
  useEffect(() => {
    setOrderItems(
      dishes.map((dish) => ({
        ...dish,
        quantity: 0,
      }))
    );
  }, []);

  // Calculate total whenever order items change
  useEffect(() => {
    const newTotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [orderItems]);

  const updateQuantity = (id: number, change: number) => {
    setOrderItems(
      orderItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleConfirmOrder = () => {
    const selectedItems = orderItems.filter((item) => item.quantity > 0);
    if (selectedItems.length === 0) {
      return;
    }

    router.push({
      pathname: "/confirmation",
      params: {
        name: name as string,
        orderItems: JSON.stringify(selectedItems),
        total: total.toString(),
      },
    });
  };

  const renderOrderItem = ({ item }: { item: OrderItem }) => (
    <ThemedView style={styles.orderItem}>
      <ThemedText style={styles.dishName}>{item.name}</ThemedText>

      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={[
            styles.quantityButton,
            item.quantity === 0 && styles.disabledButton,
          ]}
          onPress={() => updateQuantity(item.id, -1)}
          disabled={item.quantity === 0}
        >
          <Minus size={16} color="#fff" />
        </TouchableOpacity>

        <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>

        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, 1)}
        >
          <Plus size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <ThemedText style={styles.itemTotal}>
        {item.price * item.quantity} ₽
      </ThemedText>
    </ThemedView>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Ваш заказ",
          headerStyle: { backgroundColor: "#121212" },
          headerTintColor: "#fff",
          headerBackTitle: "Меню",
        }}
      />
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle" style={styles.title}>
          Выберите блюда:
        </ThemedText>

        <FlatList
          data={orderItems}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />

        <ThemedView style={styles.totalContainer}>
          <ThemedText type="subtitle">Итого:</ThemedText>
          <ThemedText type="subtitle" style={styles.totalAmount}>
            {total} ₽
          </ThemedText>
        </ThemedView>

        <TouchableOpacity
          style={[
            styles.button,
            orderItems.every((item) => item.quantity === 0) &&
              styles.disabledButton,
          ]}
          onPress={handleConfirmOrder}
          disabled={orderItems.every((item) => item.quantity === 0)}
        >
          <ShoppingBag size={20} color="#fff" style={styles.buttonIcon} />
          <ThemedText style={styles.buttonText}>Подтвердить заказ</ThemedText>
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
  title: {
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#1e1e1e",
  },
  dishName: {
    flex: 1,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#00a86b",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#555",
    opacity: 0.7,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 20,
    textAlign: "center",
  },
  itemTotal: {
    width: 80,
    textAlign: "right",
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#1e1e1e",
  },
  totalAmount: {
    color: "#00a86b",
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#00a86b",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
