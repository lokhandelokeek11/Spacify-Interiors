"use client"

import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header with Location */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={20} color="#6B7280" />
            <Text style={styles.locationText}>Lahore, Pakistan</Text>
            <Ionicons name="chevron-down" size={16} color="#6B7280" />
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileInitial}>F</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" />
          <Text style={styles.searchPlaceholder}>Search furniture, decor...</Text>
        </View>

        {/* Special Offer Card */}
        <View style={styles.offerCard}>
          <View style={styles.offerContent}>
            <Text style={styles.offerLabel}>Special Offer!</Text>
            <Text style={styles.offerTitle}>Classic Navis</Text>
            <Text style={styles.offerSubtitle}>Lounge Chair</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>60% off</Text>
            </View>
          </View>
          <View style={styles.offerImageContainer}>
            <Image source={{ uri: "/modern-black-office-chair.jpg" }} style={styles.offerImage} />
          </View>
        </View>

        {/* Category Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoryGrid}>
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Ionicons name="bed-outline" size={24} color="#1a2332" />
              </View>
              <Text style={styles.categoryText}>Sofas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Ionicons name="restaurant-outline" size={24} color="#1a2332" />
              </View>
              <Text style={styles.categoryText}>Chairs</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Ionicons name="bulb-outline" size={24} color="#1a2332" />
              </View>
              <Text style={styles.categoryText}>Lamps</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Ionicons name="library-outline" size={24} color="#1a2332" />
              </View>
              <Text style={styles.categoryText}>Cabinets</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Best Sellings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best Sellings</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productList}>
            <View style={styles.productCard}>
              <Image source={{ uri: "/leather-lounge-chair.jpg" }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Leather Lounge Chair</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={12} color="#F59E0B" />
                  <Text style={styles.ratingText}>4.5</Text>
                </View>
                <Text style={styles.productPrice}>$124.99</Text>
              </View>
              <TouchableOpacity style={styles.productAction}>
                <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.productCard}>
              <Image source={{ uri: "/traditional-table-lamp.jpg" }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Traditional Table Lamp</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={12} color="#F59E0B" />
                  <Text style={styles.ratingText}>3.5</Text>
                </View>
                <Text style={styles.productPrice}>$99.99</Text>
              </View>
              <TouchableOpacity style={styles.productAction}>
                <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    color: "#1a2332",
    fontWeight: "500",
    marginHorizontal: 8,
  },
  profileButton: {
    padding: 4,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#7fb069",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInitial: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 16,
    color: "#9CA3AF",
  },
  offerCard: {
    backgroundColor: "#1a2332",
    borderRadius: 20,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    overflow: "hidden",
  },
  offerContent: {
    flex: 1,
  },
  offerLabel: {
    color: "#7fb069",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  offerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 2,
  },
  offerSubtitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "300",
    marginBottom: 12,
  },
  discountBadge: {
    backgroundColor: "#7fb069",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  offerImageContainer: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  offerImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
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
    color: "#1a2332",
  },
  seeAllText: {
    fontSize: 14,
    color: "#7fb069",
    fontWeight: "500",
  },
  categoryGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryItem: {
    alignItems: "center",
    width: "22%",
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  categoryText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
    textAlign: "center",
  },
  productList: {
    gap: 16,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a2332",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a2332",
  },
  productAction: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1a2332",
    alignItems: "center",
    justifyContent: "center",
  },
})
