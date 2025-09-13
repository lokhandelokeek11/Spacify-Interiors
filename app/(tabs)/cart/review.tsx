import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"

export default function ReviewScreen() {
  const cartItems = [
    {
      id: "1",
      name: "Classic Navis Lounge Chair",
      price: 124.99,
      quantity: 1,
      image: "/leather-lounge-chair.jpg",
    },
    {
      id: "2",
      name: "Traditional Table Lamp",
      price: 99.99,
      quantity: 2,
      image: "/traditional-table-lamp.jpg",
    },
    {
      id: "3",
      name: "Modern Office Chair",
      price: 189.99,
      quantity: 1,
      image: "/modern-black-office-chair.jpg",
    },
  ]

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 15.99
  const finalTotal = totalPrice + deliveryFee

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 16,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#e9ecef",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1a2332" />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 18,
            fontWeight: "600",
            color: "#1a2332",
            marginRight: 24,
          }}
        >
          Review & Confirm
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: 20 }}>
          {/* Order Summary */}
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#1a2332",
                marginBottom: 16,
              }}
            >
              Order Summary
            </Text>

            {cartItems.map((item) => (
              <View
                key={item.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                  paddingBottom: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: "#f1f3f4",
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    backgroundColor: "#f5f5f5",
                  }}
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: "#1a2332",
                      marginBottom: 2,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#6c757d",
                    }}
                  >
                    Qty: {item.quantity}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#7fb069",
                  }}
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 14, color: "#6c757d" }}>Subtotal</Text>
              <Text style={{ fontSize: 14, color: "#1a2332" }}>${totalPrice.toFixed(2)}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 14, color: "#6c757d" }}>Delivery</Text>
              <Text style={{ fontSize: 14, color: "#1a2332" }}>${deliveryFee.toFixed(2)}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 12,
                borderTopWidth: 1,
                borderTopColor: "#e9ecef",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#1a2332",
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#7fb069",
                }}
              >
                ${finalTotal.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Delivery Address */}
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#1a2332",
                }}
              >
                Delivery Address
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#7fb069",
                    fontWeight: "500",
                  }}
                >
                  Change
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <Ionicons name="location" size={20} color="#7fb069" style={{ marginRight: 12, marginTop: 2 }} />
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "#1a2332",
                    marginBottom: 4,
                  }}
                >
                  Home
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#6c757d",
                    lineHeight: 20,
                  }}
                >
                  123 Design Street{"\n"}Lahore, Pakistan 54000
                </Text>
              </View>
            </View>
          </View>

          {/* Payment Method */}
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#1a2332",
                }}
              >
                Payment Method
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#7fb069",
                    fontWeight: "500",
                  }}
                >
                  Change
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 28,
                  backgroundColor: "#1a2332",
                  borderRadius: 6,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 10,
                    fontWeight: "600",
                  }}
                >
                  VISA
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: "#1a2332",
                  fontWeight: "500",
                }}
              >
                •••• •••• •••• 1234
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#e9ecef",
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/cart/success")}
          style={{ borderRadius: 16, overflow: "hidden" }}
        >
          <LinearGradient
            colors={["#1a2332", "#7fb069"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              Confirm Order
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
