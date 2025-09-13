"use client"

import { useState, useRef } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

export default function OTPVerificationScreen() {
  const [otp, setOtp] = useState(["", "", "", ""])
  const inputRefs = useRef<(TextInput | null)[]>([])

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyPress = (key: string, index: number) => {
    // Handle backspace to go to previous input
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleContinue = () => {
    const otpCode = otp.join("")
    console.log("OTP Code:", otpCode)
    // Navigate to home after successful verification
    router.replace("/(tabs)")
  }

  const handleBack = () => {
    router.back()
  }

  const isOtpComplete = otp.every((digit) => digit !== "")

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header with Back Button */}
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#1F2937" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>OTP Verification</Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.subtitle}>Enter the verification code we just sent on your email address.</Text>

            {/* OTP Input Boxes */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <View key={index} style={styles.otpInputContainer}>
                  <TextInput
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={[styles.otpInput, digit ? styles.otpInputFilled : styles.otpInputEmpty]}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value.slice(-1), index)}
                    onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    textAlign="center"
                    selectTextOnFocus
                  />
                  {digit && <View style={styles.otpDot} />}
                </View>
              ))}
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={handleContinue}
              style={[styles.continueButton, !isOtpComplete && styles.continueButtonDisabled]}
              disabled={!isOtpComplete}
            >
              <LinearGradient
                colors={isOtpComplete ? ["#4FACFE", "#00F2FE"] : ["#E5E7EB", "#E5E7EB"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={[styles.continueText, !isOtpComplete && styles.continueTextDisabled]}>Continue</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 60,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 60,
  },
  otpInputContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  otpInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    fontSize: 24,
    fontWeight: "600",
    backgroundColor: "#F9FAFB",
    borderWidth: 2,
  },
  otpInputEmpty: {
    borderColor: "#E5E7EB",
    color: "#1F2937",
  },
  otpInputFilled: {
    borderColor: "#4FACFE",
    backgroundColor: "#EFF6FF",
    color: "transparent", // Hide the text since we show the dot
  },
  otpDot: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4FACFE",
  },
  continueButton: {
    width: "100%",
    marginTop: "auto",
    marginBottom: 20,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  gradientButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  continueTextDisabled: {
    color: "#9CA3AF",
  },
})
