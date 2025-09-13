"use client"
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
  TextInput,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Card } from "../components/Card"
import { GradientButton } from "../components/GradientButton"

interface Address {
  id: string
  title: string
  address: string
  isDefault: boolean
}

export default function AddressScreen() {
  const router = useRouter()
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      title: "Home",
      address: "123 Main Street, Apartment 4B, New York, NY 10001",
      isDefault: true,
    },
    {
      id: "2",
      title: "Office",
      address: "456 Business Ave, Suite 200, New York, NY 10002",
      isDefault: false,
    },
    {
      id: "3",
      title: "Parents House",
      address: "789 Family Lane, Brooklyn, NY 11201",
      isDefault: false,
    },
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [newAddress, setNewAddress] = useState({ title: "", address: "" })

  const handleDeleteAddress = (id: string) => {
    Alert.alert("Delete Address", "Are you sure you want to delete this address?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setAddresses(addresses.filter((addr) => addr.id !== id))
        },
      },
    ])
  }

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )
  }

  const handleAddAddress = () => {
    if (newAddress.title.trim() && newAddress.address.trim()) {
      const newAddr: Address = {
        id: Date.now().toString(),
        title: newAddress.title.trim(),
        address: newAddress.address.trim(),
        isDefault: addresses.length === 0,
      }
      setAddresses([...addresses, newAddr])
      setNewAddress({ title: "", address: "" })
      setShowAddModal(false)
    } else {
      Alert.alert("Error", "Please fill in both title and address fields.")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Address Management</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Add New Address Button */}
        <View style={styles.addButtonContainer}>
          <GradientButton title="Add New Address" onPress={() => setShowAddModal(true)} />
        </View>

        {/* Address List */}
        <View style={styles.addressList}>
          {addresses.map((address) => (
            <Card key={address.id} style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <View style={styles.addressTitleContainer}>
                  <Text style={styles.addressTitle}>{address.title}</Text>
                  {address.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>Default</Text>
                    </View>
                  )}
                </View>
                <View style={styles.addressActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => Alert.alert("Edit", "Edit functionality coming soon!")}
                  >
                    <Ionicons name="pencil-outline" size={18} color="#4FACFE" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} onPress={() => handleDeleteAddress(address.id)}>
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.addressText}>{address.address}</Text>

              <View style={styles.addressFooter}>
                <TouchableOpacity style={styles.locationButton}>
                  <Ionicons name="location-outline" size={16} color="#4FACFE" />
                  <Text style={styles.locationText}>View on Map</Text>
                </TouchableOpacity>

                {!address.isDefault && (
                  <TouchableOpacity style={styles.setDefaultButton} onPress={() => handleSetDefault(address.id)}>
                    <Text style={styles.setDefaultText}>Set as Default</Text>
                  </TouchableOpacity>
                )}
              </View>
            </Card>
          ))}
        </View>

        {addresses.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="location-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No Addresses Added</Text>
            <Text style={styles.emptySubtitle}>Add your first address to get started</Text>
          </View>
        )}
      </ScrollView>

      {/* Add Address Modal */}
      <Modal visible={showAddModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add New Address</Text>
            <TouchableOpacity onPress={handleAddAddress}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Address Title</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Home, Office, etc."
                value={newAddress.title}
                onChangeText={(text) => setNewAddress({ ...newAddress, title: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Address</Text>
              <TextInput
                style={[styles.textInput, styles.addressInput]}
                placeholder="Enter complete address"
                value={newAddress.address}
                onChangeText={(text) => setNewAddress({ ...newAddress, address: text })}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity style={styles.locationPickerButton}>
              <Ionicons name="location-outline" size={20} color="#4FACFE" />
              <Text style={styles.locationPickerText}>Pick from Map</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
  },
  placeholder: {
    width: 24,
  },
  addButtonContainer: {
    marginBottom: 24,
  },
  addressList: {
    marginBottom: 40,
  },
  addressCard: {
    marginBottom: 16,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  addressTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: "#10B981",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  defaultText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  addressActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  addressText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 16,
  },
  addressFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#4FACFE",
    fontWeight: "500",
  },
  setDefaultButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#4FACFE",
  },
  setDefaultText: {
    fontSize: 12,
    color: "#4FACFE",
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  cancelText: {
    fontSize: 16,
    color: "#6B7280",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  saveText: {
    fontSize: 16,
    color: "#4FACFE",
    fontWeight: "600",
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  addressInput: {
    height: 100,
  },
  locationPickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#4FACFE",
    borderRadius: 12,
    backgroundColor: "#F0F9FF",
  },
  locationPickerText: {
    fontSize: 16,
    color: "#4FACFE",
    fontWeight: "500",
  },
})
