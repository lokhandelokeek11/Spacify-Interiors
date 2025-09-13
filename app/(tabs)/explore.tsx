"use client"

import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useState, useRef } from "react"
import { LinearGradient } from "expo-linear-gradient"

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Modern")
  const [viewMode, setViewMode] = useState<"grid" | "moodboard">("grid")
  const scaleAnim = useRef(new Animated.Value(1)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  const categories = [
    "Modern",
    "Minimal",
    "Scandinavian",
    "Luxury",
    "Boho",
    "Industrial",
    "Rustic",
    "Art Deco",
    "Mid-Century",
  ]

  const designSuggestions = [
    { id: 1, title: "Serene Modern Living", image: "/modern-living-room.png", mood: "Calm", style: "Contemporary" },
    {
      id: 2,
      title: "Zen Minimal Bedroom",
      image: "/minimal-bedroom-interior.jpg",
      mood: "Peaceful",
      style: "Minimalist",
    },
    {
      id: 3,
      title: "Warm Scandinavian Kitchen",
      image: "/scandinavian-kitchen-interior.jpg",
      mood: "Cozy",
      style: "Nordic",
    },
    {
      id: 4,
      title: "Opulent Luxury Bathroom",
      image: "/luxury-bathroom-interior.jpg",
      mood: "Luxurious",
      style: "Glamorous",
    },
    {
      id: 5,
      title: "Vibrant Boho Living",
      image: "/boho-living-room-interior.jpg",
      mood: "Energetic",
      style: "Eclectic",
    },
    { id: 6, title: "Bold Industrial Loft", image: "/industrial-loft-interior.jpg", mood: "Edgy", style: "Urban" },
  ]

  const handleCategoryPress = (category: string) => {
    Animated.sequence([
      Animated.timing(scaleAnim, { duration: 100, toValue: 0.95, useNativeDriver: true }),
      Animated.timing(scaleAnim, { duration: 100, toValue: 1, useNativeDriver: true }),
    ]).start()
    setSelectedCategory(category)
  }

  const toggleViewMode = () => {
    Animated.timing(fadeAnim, {
      duration: 300,
      toValue: viewMode === "grid" ? 1 : 0,
      useNativeDriver: true,
    }).start()
    setViewMode(viewMode === "grid" ? "moodboard" : "grid")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>
                Discover <Text style={styles.titleHighlight}>Inspiration</Text>
              </Text>
              <Text style={styles.subtitle}>Create your perfect space with AI-powered suggestions</Text>
            </View>
            <TouchableOpacity style={styles.viewToggle} onPress={toggleViewMode}>
              <Ionicons
                name={viewMode === "grid" ? "apps-outline" : "grid-outline"}
                size={24}
                color="rgb(26, 35, 50)"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.uploadCard}>
          <LinearGradient
            colors={["rgb(26, 35, 50)", "rgb(127, 176, 105)"]}
            style={styles.uploadGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="camera-outline" size={32} color="#FFFFFF" />
          </LinearGradient>
          <View style={styles.uploadContent}>
            <Text style={styles.uploadTitle}>Visualize with AR</Text>
            <Text style={styles.uploadSubtitle}>
              Capture your space and see designs come to life with augmented reality
            </Text>
          </View>
          <View style={styles.arBadge}>
            <Text style={styles.arBadgeText}>AR</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Design Styles</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <Animated.View
                key={category}
                style={{ transform: [{ scale: selectedCategory === category ? scaleAnim : 1 }] }}
              >
                <TouchableOpacity
                  style={[styles.categoryPill, selectedCategory === category && styles.categoryPillSelected]}
                  onPress={() => handleCategoryPress(category)}
                >
                  {selectedCategory === category ? (
                    <LinearGradient
                      colors={["rgb(26, 35, 50)", "rgb(127, 176, 105)"]}
                      style={styles.categoryPillGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.categoryTextSelected}>{category}</Text>
                    </LinearGradient>
                  ) : (
                    <Text style={styles.categoryText}>{category}</Text>
                  )}
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Curated Collections</Text>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options-outline" size={20} color="rgb(26, 35, 50)" />
            </TouchableOpacity>
          </View>

          <Animated.View style={[styles.designGrid, { opacity: viewMode === "moodboard" ? fadeAnim : 1 }]}>
            {designSuggestions.map((design) => (
              <TouchableOpacity key={design.id} style={styles.designCard}>
                <Image source={{ uri: design.image }} style={styles.designImage} />
                <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} style={styles.designOverlay}>
                  <View style={styles.designMoodBadge}>
                    <Text style={styles.moodText}>{design.mood}</Text>
                  </View>
                  <View style={styles.designInfo}>
                    <Text style={styles.designTitle}>{design.title}</Text>
                    <Text style={styles.designStyle}>{design.style}</Text>
                  </View>
                </LinearGradient>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Ionicons name="heart-outline" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Create Mood Board</Text>
          <TouchableOpacity style={styles.moodBoardCard}>
            <View style={styles.moodBoardPreview}>
              <Ionicons name="add-circle-outline" size={48} color="rgb(127, 176, 105)" />
            </View>
            <Text style={styles.moodBoardText}>Start a new mood board to collect your favorite designs</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fabSecondary}>
          <Ionicons name="color-palette-outline" size={24} color="rgb(26, 35, 50)" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fab}>
          <LinearGradient
            colors={["rgb(26, 35, 50)", "rgb(127, 176, 105)"]}
            style={styles.fabGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="add" size={28} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "rgb(31, 41, 55)",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  titleHighlight: {
    color: "rgb(26, 35, 50)",
  },
  subtitle: {
    fontSize: 16,
    color: "rgb(75, 85, 99)",
    lineHeight: 24,
  },
  viewToggle: {
    padding: 12,
    backgroundColor: "rgb(247, 251, 248)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgb(209, 213, 219)",
  },
  uploadCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(248, 250, 252)",
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "rgb(209, 213, 219)",
    position: "relative",
  },
  uploadGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  uploadContent: {
    flex: 1,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgb(31, 41, 55)",
    marginBottom: 6,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: "rgb(75, 85, 99)",
    lineHeight: 20,
  },
  arBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgb(127, 176, 105)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  arBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "rgb(31, 41, 55)",
  },
  filterButton: {
    padding: 8,
    backgroundColor: "rgb(247, 251, 248)",
    borderRadius: 8,
  },
  categoriesScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: "rgb(248, 250, 252)",
    borderWidth: 1,
    borderColor: "rgb(209, 213, 219)",
    marginRight: 12,
  },
  categoryPillSelected: {
    borderWidth: 0,
  },
  categoryPillGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgb(75, 85, 99)",
  },
  categoryTextSelected: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  designGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  designCard: {
    width: "48%",
    backgroundColor: "rgb(248, 250, 252)",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgb(209, 213, 219)",
    position: "relative",
  },
  designImage: {
    width: "100%",
    height: 140,
    backgroundColor: "rgb(229, 231, 235)",
  },
  designOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    justifyContent: "space-between",
    padding: 12,
  },
  designMoodBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(127, 176, 105, 0.9)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  moodText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  designInfo: {
    alignItems: "flex-start",
  },
  designTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  designStyle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 8,
  },
  moodBoardCard: {
    backgroundColor: "rgb(247, 251, 248)",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgb(127, 176, 105)",
    borderStyle: "dashed",
  },
  moodBoardPreview: {
    marginBottom: 12,
  },
  moodBoardText: {
    fontSize: 14,
    color: "rgb(75, 85, 99)",
    textAlign: "center",
  },
  fabContainer: {
    position: "absolute",
    bottom: 30,
    right: 24,
    alignItems: "center",
  },
  fabSecondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgb(247, 251, 248)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgb(209, 213, 219)",
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
})
