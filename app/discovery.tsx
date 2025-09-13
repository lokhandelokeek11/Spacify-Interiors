"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions, Animated } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

const { width } = Dimensions.get("window")

interface QuizData {
  roomType: string
  budget: string
  styles: string[]
  colors: string[]
  materials: string[]
}

const roomTypes = [
  { id: "living", name: "Living Room", icon: "home-outline" },
  { id: "bedroom", name: "Bedroom", icon: "bed-outline" },
  { id: "kitchen", name: "Kitchen", icon: "restaurant-outline" },
  { id: "bathroom", name: "Bathroom", icon: "water-outline" },
  { id: "office", name: "Office", icon: "briefcase-outline" },
  { id: "dining", name: "Dining Room", icon: "wine-outline" },
]

const budgetOptions = [
  { id: "budget", name: "Budget Friendly", range: "₹50K - ₹2L" },
  { id: "mid", name: "Mid Range", range: "₹2L - ₹5L" },
  { id: "premium", name: "Premium", range: "₹5L - ₹10L" },
  { id: "luxury", name: "Luxury", range: "₹10L+" },
]

const styleOptions = [
  { id: "modern", name: "Modern", icon: "square-outline" },
  { id: "classic", name: "Classic", icon: "library-outline" },
  { id: "minimal", name: "Minimal", icon: "remove-outline" },
  { id: "boho", name: "Boho", icon: "flower-outline" },
  { id: "industrial", name: "Industrial", icon: "construct-outline" },
  { id: "scandinavian", name: "Scandinavian", icon: "snow-outline" },
]

const colorOptions = [
  { id: "neutral", name: "Neutral", colors: ["#F5F5F5", "#E8E8E8", "#D3D3D3"] },
  { id: "warm", name: "Warm", colors: ["#F4A460", "#DEB887", "#CD853F"] },
  { id: "cool", name: "Cool", colors: ["#87CEEB", "#B0E0E6", "#ADD8E6"] },
  { id: "bold", name: "Bold", colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"] },
  { id: "earth", name: "Earth", colors: ["#8B4513", "#A0522D", "#D2691E"] },
]

const materialOptions = [
  { id: "wood", name: "Wood", icon: "leaf-outline" },
  { id: "metal", name: "Metal", icon: "hardware-chip-outline" },
  { id: "glass", name: "Glass", icon: "diamond-outline" },
  { id: "fabric", name: "Fabric", icon: "shirt-outline" },
  { id: "stone", name: "Stone", icon: "cube-outline" },
  { id: "ceramic", name: "Ceramic", icon: "ellipse-outline" },
]

export default function DiscoveryScreen() {
  const [currentStep, setCurrentStep] = useState(0)
  const [quizData, setQuizData] = useState<QuizData>({
    roomType: "",
    budget: "",
    styles: [],
    colors: [],
    materials: [],
  })

  const totalSteps = 6 // Including summary step
  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Quiz completed, navigate to main app
      router.replace("/(tabs)")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleRoomTypeSelect = (roomType: string) => {
    setQuizData({ ...quizData, roomType })
  }

  const handleBudgetSelect = (budget: string) => {
    setQuizData({ ...quizData, budget })
  }

  const handleStyleToggle = (style: string) => {
    const styles = quizData.styles.includes(style)
      ? quizData.styles.filter((s) => s !== style)
      : [...quizData.styles, style]
    setQuizData({ ...quizData, styles })
  }

  const handleColorToggle = (color: string) => {
    const colors = quizData.colors.includes(color)
      ? quizData.colors.filter((c) => c !== color)
      : [...quizData.colors, color]
    setQuizData({ ...quizData, colors })
  }

  const handleMaterialToggle = (material: string) => {
    const materials = quizData.materials.includes(material)
      ? quizData.materials.filter((m) => m !== material)
      : [...quizData.materials, material]
    setQuizData({ ...quizData, materials })
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return quizData.roomType !== ""
      case 1:
        return quizData.budget !== ""
      case 2:
        return quizData.styles.length > 0
      case 3:
        return quizData.colors.length > 0
      case 4:
        return quizData.materials.length > 0
      default:
        return true
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Which room are you designing?</Text>
            <Text style={styles.stepSubtitle}>Select the space you'd like to transform</Text>
            <View style={styles.gridContainer}>
              {roomTypes.map((room) => (
                <TouchableOpacity
                  key={room.id}
                  style={[styles.gridCard, quizData.roomType === room.id && styles.selectedCard]}
                  onPress={() => handleRoomTypeSelect(room.id)}
                >
                  <Ionicons
                    name={room.icon as any}
                    size={32}
                    color={quizData.roomType === room.id ? "#FFFFFF" : "#4FACFE"}
                  />
                  <Text style={[styles.cardText, quizData.roomType === room.id && styles.selectedCardText]}>
                    {room.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )

      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>What's your budget range?</Text>
            <Text style={styles.stepSubtitle}>This helps us suggest appropriate options</Text>
            <View style={styles.optionsContainer}>
              {budgetOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[styles.optionCard, quizData.budget === option.id && styles.selectedOptionCard]}
                  onPress={() => handleBudgetSelect(option.id)}
                >
                  <Text style={[styles.optionTitle, quizData.budget === option.id && styles.selectedOptionTitle]}>
                    {option.name}
                  </Text>
                  <Text style={[styles.optionRange, quizData.budget === option.id && styles.selectedOptionRange]}>
                    {option.range}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Choose your preferred styles</Text>
            <Text style={styles.stepSubtitle}>Select one or more styles that appeal to you</Text>
            <View style={styles.gridContainer}>
              {styleOptions.map((style) => (
                <TouchableOpacity
                  key={style.id}
                  style={[styles.gridCard, quizData.styles.includes(style.id) && styles.selectedCard]}
                  onPress={() => handleStyleToggle(style.id)}
                >
                  <Ionicons
                    name={style.icon as any}
                    size={32}
                    color={quizData.styles.includes(style.id) ? "#FFFFFF" : "#4FACFE"}
                  />
                  <Text style={[styles.cardText, quizData.styles.includes(style.id) && styles.selectedCardText]}>
                    {style.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Select your color palette</Text>
            <Text style={styles.stepSubtitle}>Choose colors that resonate with you</Text>
            <View style={styles.colorContainer}>
              {colorOptions.map((palette) => (
                <TouchableOpacity
                  key={palette.id}
                  style={[styles.colorCard, quizData.colors.includes(palette.id) && styles.selectedColorCard]}
                  onPress={() => handleColorToggle(palette.id)}
                >
                  <View style={styles.colorSwatches}>
                    {palette.colors.map((color, index) => (
                      <View key={index} style={[styles.colorSwatch, { backgroundColor: color }]} />
                    ))}
                  </View>
                  <Text style={[styles.colorName, quizData.colors.includes(palette.id) && styles.selectedColorName]}>
                    {palette.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )

      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Preferred materials</Text>
            <Text style={styles.stepSubtitle}>Select materials you'd like to incorporate</Text>
            <View style={styles.gridContainer}>
              {materialOptions.map((material) => (
                <TouchableOpacity
                  key={material.id}
                  style={[styles.gridCard, quizData.materials.includes(material.id) && styles.selectedCard]}
                  onPress={() => handleMaterialToggle(material.id)}
                >
                  <Ionicons
                    name={material.icon as any}
                    size={32}
                    color={quizData.materials.includes(material.id) ? "#FFFFFF" : "#4FACFE"}
                  />
                  <Text style={[styles.cardText, quizData.materials.includes(material.id) && styles.selectedCardText]}>
                    {material.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )

      case 5:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Perfect! Here's your design profile</Text>
            <Text style={styles.stepSubtitle}>We'll use these preferences to personalize your experience</Text>
            <ScrollView style={styles.summaryContainer} showsVerticalScrollIndicator={false}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Room Type</Text>
                <Text style={styles.summaryValue}>{roomTypes.find((r) => r.id === quizData.roomType)?.name}</Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Budget Range</Text>
                <Text style={styles.summaryValue}>{budgetOptions.find((b) => b.id === quizData.budget)?.name}</Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Design Styles</Text>
                <Text style={styles.summaryValue}>
                  {quizData.styles.map((s) => styleOptions.find((style) => style.id === s)?.name).join(", ")}
                </Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Color Palettes</Text>
                <Text style={styles.summaryValue}>
                  {quizData.colors.map((c) => colorOptions.find((color) => color.id === c)?.name).join(", ")}
                </Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Materials</Text>
                <Text style={styles.summaryValue}>
                  {quizData.materials
                    .map((m) => materialOptions.find((material) => material.id === m)?.name)
                    .join(", ")}
                </Text>
              </View>
            </ScrollView>
          </View>
        )

      default:
        return null
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentStep + 1} of {totalSteps}
        </Text>
      </View>

      {/* Content */}
      <View style={styles.content}>{renderStep()}</View>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {currentStep > 0 && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={20} color="#6B7280" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={handleNext}
          style={[styles.nextButton, !canProceed() && styles.disabledButton]}
          disabled={!canProceed()}
        >
          <LinearGradient
            colors={canProceed() ? ["#4FACFE", "#00F2FE"] : ["#E5E7EB", "#E5E7EB"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={[styles.nextText, !canProceed() && styles.disabledText]}>
              {currentStep === totalSteps - 1 ? "Get Started" : "Next"}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={canProceed() ? "#FFFFFF" : "#9CA3AF"}
              style={styles.nextIcon}
            />
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
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4FACFE",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  stepSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridCard: {
    width: (width - 72) / 2,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  selectedCard: {
    backgroundColor: "#4FACFE",
    borderColor: "#4FACFE",
  },
  cardText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F2937",
    marginTop: 8,
    textAlign: "center",
  },
  selectedCardText: {
    color: "#FFFFFF",
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  selectedOptionCard: {
    backgroundColor: "#EBF8FF",
    borderColor: "#4FACFE",
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  selectedOptionTitle: {
    color: "#4FACFE",
  },
  optionRange: {
    fontSize: 14,
    color: "#6B7280",
  },
  selectedOptionRange: {
    color: "#4FACFE",
  },
  colorContainer: {
    gap: 16,
  },
  colorCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
  },
  selectedColorCard: {
    backgroundColor: "#EBF8FF",
    borderColor: "#4FACFE",
  },
  colorSwatches: {
    flexDirection: "row",
    marginRight: 16,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  colorName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },
  selectedColorName: {
    color: "#4FACFE",
  },
  summaryContainer: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backText: {
    fontSize: 16,
    color: "#6B7280",
    marginLeft: 4,
  },
  nextButton: {
    flex: 1,
    marginLeft: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
  },
  nextText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  disabledText: {
    color: "#9CA3AF",
  },
  nextIcon: {
    marginLeft: 8,
  },
})
