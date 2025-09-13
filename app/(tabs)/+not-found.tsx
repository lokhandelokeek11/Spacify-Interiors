"use client"

import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

export default function NotFoundScreen() {
  const handleGoHome = () => {
    router.replace("/(tabs)")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="alert-circle-outline" size={80} color="#4FACFE" />
        </View>

        <Text style={styles.title}>Page Not Found</Text>
        <Text style={styles.subtitle}>Sorry, the page you are looking for doesn't exist or has been moved.</Text>

        <TouchableOpacity onPress={handleGoHome} style={styles.homeButton}>
          <LinearGradient
            colors={["#4FACFE", "#00F2FE"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Ionicons name="home" size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.homeText}>Go to Home</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 48,
  },
  homeButton: {
    width: "100%",
    maxWidth: 280,
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonIcon: {
    marginRight: 8,
  },
  homeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})
