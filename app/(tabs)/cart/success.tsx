"use client"

import { useEffect } from "react"
import { View, Text, TouchableOpacity, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"

export default function SuccessScreen() {
  const scaleAnim = new Animated.Value(0)
  const fadeAnim = new Animated.Value(0)

  useEffect(() => {
    // Animate the success icon
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()

    // Fade in the content
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      delay: 200,
      useNativeDriver: true,
    }).start()
  }, [])

  const orderId = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 40,
        }}
      >
        {/* Success Icon */}
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            marginBottom: 32,
          }}
        >
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "#7fb069",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#7fb069",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Ionicons name="checkmark" size={60} color="white" />
          </View>
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            alignItems: "center",
          }}
        >
          {/* Success Message */}
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#1a2332",
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            Your Order is Confirmed 🎉
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: "#6c757d",
              textAlign: "center",
              lineHeight: 24,
              marginBottom: 32,
            }}
          >
            Thank you for your purchase! Your furniture will be delivered soon.
          </Text>

          {/* Order Details */}
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 24,
              width: "100%",
              marginBottom: 32,
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
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
                paddingBottom: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#f1f3f4",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#6c757d",
                }}
              >
                Order ID
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#1a2332",
                }}
              >
                {orderId}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#6c757d",
                }}
              >
                Estimated Delivery
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#7fb069",
                  textAlign: "right",
                  flex: 1,
                  marginLeft: 16,
                }}
              >
                {estimatedDelivery}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={{ width: "100%" }}>
            <TouchableOpacity
              onPress={() => router.push("/order")}
              style={{ borderRadius: 16, overflow: "hidden", marginBottom: 16 }}
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
                  View My Orders
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/explore")}
              style={{
                paddingVertical: 16,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "#7fb069",
                borderRadius: 16,
              }}
            >
              <Text
                style={{
                  color: "#7fb069",
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}
