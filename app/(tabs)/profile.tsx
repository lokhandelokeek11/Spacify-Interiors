"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import Card from "../../components/Card"

export default function ProfileScreen() {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  })

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => router.replace("/login"),
      },
    ])
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: "#1a2332",
          paddingTop: 60,
          paddingBottom: 40,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <View style={{ position: "relative", marginBottom: 16 }}>
          <Image
            source={{ uri: user.avatar }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 4,
              borderColor: "#FFFFFF",
            }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "#7fb069",
              borderRadius: 15,
              width: 30,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Ionicons name="pencil" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#FFFFFF", marginBottom: 4 }}>{user.name}</Text>
        <Text style={{ fontSize: 16, color: "#9CA3AF", opacity: 0.9 }}>Interior Design Enthusiast</Text>
      </View>

      <View style={{ padding: 20 }}>
        {/* Contact Information */}
        <Card style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#1a2332", marginBottom: 16 }}>
            Contact Information
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
            <Ionicons name="mail-outline" size={20} color="#6B7280" />
            <Text style={{ marginLeft: 12, fontSize: 16, color: "#374151" }}>{user.email}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="call-outline" size={20} color="#6B7280" />
            <Text style={{ marginLeft: 12, fontSize: 16, color: "#374151" }}>{user.phone}</Text>
          </View>
        </Card>

        {/* Menu Options */}
        <Card style={{ marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#F3F4F6",
            }}
            onPress={() => router.push("/address")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="location-outline" size={24} color="#7fb069" />
              <Text style={{ marginLeft: 12, fontSize: 16, color: "#374151", fontWeight: "500" }}>
                Manage Addresses
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#F3F4F6",
            }}
            onPress={() => router.push("/order")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="receipt-outline" size={24} color="#7fb069" />
              <Text style={{ marginLeft: 12, fontSize: 16, color: "#374151", fontWeight: "500" }}>
                Order Management
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 16,
            }}
            onPress={() => router.push("/kyc")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#7fb069" />
              <Text style={{ marginLeft: 12, fontSize: 16, color: "#374151", fontWeight: "500" }}>
                KYC Verification
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </Card>

        {/* Logout Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#1a2332",
            borderRadius: 16,
            paddingVertical: 18,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
          <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: "600", color: "#FFFFFF" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
