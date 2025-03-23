"use client";

import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  Check,
  User,
  ShoppingBag,
  CreditCard,
  Menu,
} from "lucide-react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function ConfirmationScreen() {
  const { name, orderItems: orderItemsParam, total } = useLocalSearchParams();
  const router = useRouter();

  // Parse the JSON string back to an array of order items
  const orderItems: OrderItem[] = orderItemsParam
    ? JSON.parse(orderItemsParam as string)
    : [];

  const handleBackToMenu = () => {
    router.push({
      pathname: "/menu",
      params: { name },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Подтверждение заказа",
          headerStyle: { backgroundColor: "#121212" },
          headerTintColor: "#fff",
          headerBackTitle: "Заказ",
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Success Header */}
          <View style={styles.successHeader}>
            <View style={styles.checkCircle}>
              <Check color="#fff" size={36} />
            </View>
          </View>

          <ThemedText type="title" style={styles.title}>
            Спасибо за ваш заказ!
          </ThemedText>

          <ThemedView style={styles.card}>
            <ThemedText type="subtitle" style={styles.cardTitle}>
              Детали заказа
            </ThemedText>

            {/* Customer Info Section */}
            <ThemedView style={styles.section}>
              <View style={styles.sectionHeader}>
                <User color="#00a86b" size={20} />
                <ThemedText style={styles.sectionTitle}>
                  Информация о клиенте
                </ThemedText>
              </View>
              <ThemedView style={styles.customerInfo}>
                <ThemedText style={styles.value}>{name}</ThemedText>
              </ThemedView>
            </ThemedView>

            {/* Order Items Section */}
            <ThemedView style={styles.section}>
              <View style={styles.sectionHeader}>
                <ShoppingBag color="#00a86b" size={20} />
                <ThemedText style={styles.sectionTitle}>Ваш заказ</ThemedText>
              </View>

              <ThemedView style={styles.orderItemsContainer}>
                {orderItems.map((item) => (
                  <ThemedView key={item.id} style={styles.orderItem}>
                    <View style={styles.orderItemHeader}>
                      <ThemedText style={styles.itemName}>
                        {item.name}
                      </ThemedText>
                      <ThemedText style={styles.quantity}>
                        x{item.quantity}
                      </ThemedText>
                    </View>
                    <ThemedText style={styles.price}>
                      {item.price * item.quantity} ₽
                    </ThemedText>
                  </ThemedView>
                ))}
              </ThemedView>
            </ThemedView>

            {/* Total Section */}
            <ThemedView style={styles.totalSection}>
              <View style={styles.sectionHeader}>
                <CreditCard color="#00a86b" size={20} />
                <ThemedText style={styles.sectionTitle}>
                  Сумма к оплате
                </ThemedText>
              </View>
              <ThemedView style={styles.totalContainer}>
                <ThemedText type="subtitle">Итого:</ThemedText>
                <ThemedText type="subtitle" style={styles.totalAmount}>
                  {Number.parseFloat(total as string)} ₽
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.thankYouCard}>
            <ThemedText style={styles.thankYou}>Приятного аппетита!</ThemedText>
            <ThemedText style={styles.deliveryInfo}>
              Ваш заказ будет готов в ближайшее время.
            </ThemedText>
            <ThemedText style={styles.orderNumber}>
              Номер заказа: #
              {Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, "0")}
            </ThemedText>
          </ThemedView>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={handleBackToMenu}
          >
            <Menu size={20} color="#fff" style={styles.buttonIcon} />
            <ThemedText style={styles.buttonText}>Вернуться в меню</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#121212",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  successHeader: {
    backgroundColor: "#00a86b",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  checkCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#1e1e1e",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  section: {
    marginBottom: 24,
    backgroundColor: "transparent",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#00a86b",
  },
  customerInfo: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#252525",
  },
  label: {
    fontWeight: "bold",
    marginRight: 8,
    color: "#aaa",
  },
  value: {
    fontSize: 16,
  },
  orderItemsContainer: {
    backgroundColor: "transparent",
  },
  orderItem: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#252525",
  },
  orderItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  itemDetails: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  quantity: {
    marginLeft: 8,
    color: "#aaa",
    fontWeight: "500",
  },
  price: {
    fontWeight: "bold",
    textAlign: "right",
    color: "#00a86b",
  },
  totalSection: {
    backgroundColor: "transparent",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#252525",
  },
  totalAmount: {
    color: "#00a86b",
    fontWeight: "bold",
    fontSize: 20,
  },
  thankYouCard: {
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#252525",
    alignItems: "center",
  },
  thankYou: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  deliveryInfo: {
    textAlign: "center",
    color: "#aaa",
    marginBottom: 12,
  },
  orderNumber: {
    textAlign: "center",
    color: "#00a86b",
    fontWeight: "500",
  },
  menuButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#00a86b",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    alignSelf: "center",
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
