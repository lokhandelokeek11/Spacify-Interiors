"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import Card from "../components/Card"

export default function OrderScreen() {
  const [order] = useState({
    id: "ORD-2024-001",
    date: "March 15, 2024",
    items: ["Living Room Design Consultation", "3D Visualization Package", "Material Selection Guide"],
    totalPrice: "$2,499",
    status: "In Progress", // Placed, In Progress, Completed
    currentStep: 1, // 0: Placed, 1: In Progress, 2: Completed
  })

  const [documents] = useState([
    { id: 1, name: "Invoice.pdf", type: "invoice" },
    { id: 2, name: "Design Plan.pdf", type: "design" },
    { id: 3, name: "Material List.pdf", type: "materials" },
  ])

  const steps = ["Placed", "In Progress", "Completed"]

  const handleDownload = (docName: string) => {
    // Implement download functionality
    console.log(`Downloading ${docName}`)
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 60,
          paddingBottom: 20,
          paddingHorizontal: 20,
          backgroundColor: "#FFFFFF",
          borderBottomWidth: 1,
          borderBottomColor: "#F3F4F6",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#F8FAFC",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
          }}
        >
          <Ionicons name="arrow-back" size={20} color="#374151" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "600", color: "#1F2937" }}>Order Management</Text>
      </View>

      <View style={{ padding: 20 }}>
        {/* Order Summary */}
        <Card style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#1F2937", marginBottom: 16 }}>Order Summary</Text>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 4 }}>Order ID</Text>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#374151" }}>{order.id}</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 4 }}>Order Date</Text>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#374151" }}>{order.date}</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 8 }}>Items</Text>
            {order.items.map((item, index) => (
              <Text key={index} style={{ fontSize: 16, color: "#374151", marginBottom: 4 }}>
                • {item}
              </Text>
            ))}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 12,
              borderTopWidth: 1,
              borderTopColor: "#F3F4F6",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#1F2937" }}>Total</Text>
            <Text style={{ fontSize: 18, fontWeight: "700", color: "#7fb069" }}>{order.totalPrice}</Text>
          </View>
        </Card>

        {/* Order Status Tracker */}
        <Card style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#1F2937", marginBottom: 20 }}>Order Status</Text>

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            {steps.map((step, index) => (
              <View key={index} style={{ alignItems: "center", flex: 1 }}>
                {/* Step Circle */}
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: index <= order.currentStep ? "#7fb069" : "#E5E7EB",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 8,
                  }}
                >
                  {index <= order.currentStep ? (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  ) : (
                    <Text style={{ fontSize: 12, fontWeight: "600", color: "#9CA3AF" }}>{index + 1}</Text>
                  )}
                </View>

                {/* Step Label */}
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: index === order.currentStep ? "600" : "400",
                    color: index <= order.currentStep ? "#7fb069" : "#9CA3AF",
                    textAlign: "center",
                  }}
                >
                  {step}
                </Text>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <View
                    style={{
                      position: "absolute",
                      top: 16,
                      left: "50%",
                      width: "100%",
                      height: 2,
                      backgroundColor: index < order.currentStep ? "#7fb069" : "#E5E7EB",
                      zIndex: -1,
                    }}
                  />
                )}
              </View>
            ))}
          </View>
        </Card>

        {/* Documents Section */}
        <Card>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#1F2937", marginBottom: 16 }}>Documents</Text>

          {documents.map((doc, index) => (
            <TouchableOpacity
              key={doc.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
                borderBottomWidth: index < documents.length - 1 ? 1 : 0,
                borderBottomColor: "#F3F4F6",
              }}
              onPress={() => handleDownload(doc.name)}
            >
              <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: "#f0f7ed",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Ionicons name="document-text-outline" size={20} color="#7fb069" />
                </View>
                <Text style={{ fontSize: 16, fontWeight: "500", color: "#374151", flex: 1 }}>{doc.name}</Text>
              </View>

              <LinearGradient
                colors={["#1a2332", "#2a3441"]}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="download-outline" size={18} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </Card>
      </View>
    </ScrollView>
  )
}
