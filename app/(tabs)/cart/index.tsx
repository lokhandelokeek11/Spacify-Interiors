"use client"

import { useState } from "react"
import { View, Text, ScrollView, Image, TouchableOpacity, Animated, PanGestureHandler, State } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
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
  ])

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, change: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item)),
    )
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const CartItemComponent = ({ item }: { item: CartItem }) => {
    const translateX = new Animated.Value(0)

    const onGestureEvent = Animated.event([{ nativeEvent: { translationX: translateX } }], { useNativeDriver: true })

    const onHandlerStateChange = (event: any) => {
      if (event.nativeEvent.state === State.END) {
        if (event.nativeEvent.translationX < -100) {
          // Swipe left to remove
          Animated.timing(translateX, {
            toValue: -300,
            duration: 200,
            useNativeDriver: true,
          }).start(() => removeItem(item.id))
        } else {
          // Snap back
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start()
        }
      }
    }

    return (
      <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={{
            transform: [{ translateX }],
            backgroundColor: "white",
            marginHorizontal: 20,
            marginVertical: 8,
            borderRadius: 16,
            padding: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: item.image }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 12,
                backgroundColor: "#f5f5f5",
              }}
            />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#1a2332",
                  marginBottom: 4,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#7fb069",
                  marginBottom: 8,
                }}
              >
                ${item.price.toFixed(2)}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#f8f9fa",
                  borderRadius: 8,
                  padding: 4,
                  alignSelf: "flex-start",
                }}
              >
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, -1)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    backgroundColor: "#7fb069",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="remove" size={16} color="white" />
                </TouchableOpacity>
                <Text
                  style={{
                    marginHorizontal: 16,
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#1a2332",
                  }}
                >
                  {item.quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, 1)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    backgroundColor: "#7fb069",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="add" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    )
  }

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
          My Cart
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingVertical: 16 }}>
          {cartItems.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 80,
              }}
            >
              <Ionicons name="bag-outline" size={64} color="#adb5bd" />
              <Text
                style={{
                  fontSize: 18,
                  color: "#6c757d",
                  marginTop: 16,
                  textAlign: "center",
                }}
              >
                Your cart is empty
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/explore")}
                style={{
                  marginTop: 20,
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  backgroundColor: "#7fb069",
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Start Shopping
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {cartItems.map((item) => (
                <CartItemComponent key={item.id} item={item} />
              ))}

              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: 16,
                  padding: 20,
                  backgroundColor: "white",
                  borderRadius: 16,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#6c757d",
                    marginBottom: 8,
                  }}
                >
                  Order Summary
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
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
                      fontSize: 24,
                      fontWeight: "700",
                      color: "#7fb069",
                    }}
                  >
                    ${totalPrice.toFixed(2)}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => router.push("/(tabs)/cart/review")}
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
                      Proceed to Checkout
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
