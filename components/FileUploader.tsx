"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"

interface FileUploaderProps {
  label: string
  onFileSelect: (file: any) => void
  selectedFile?: any
  verificationStatus?: "pending" | "verified" | "rejected"
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  onFileSelect,
  selectedFile,
  verificationStatus,
}) => {
  const [uploading, setUploading] = useState(false)

  const pickDocument = async () => {
    try {
      setUploading(true)
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.canceled) {
        onFileSelect(result.assets[0])
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick document")
    } finally {
      setUploading(false)
    }
  }

  const getStatusColor = () => {
    switch (verificationStatus) {
      case "verified":
        return "#10B981"
      case "rejected":
        return "#EF4444"
      case "pending":
        return "#F59E0B"
      default:
        return "#6B7280"
    }
  }

  const getStatusText = () => {
    switch (verificationStatus) {
      case "verified":
        return "Verified"
      case "rejected":
        return "Rejected"
      case "pending":
        return "Pending"
      default:
        return "Not Uploaded"
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        {verificationStatus && (
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.uploadArea} onPress={pickDocument} disabled={uploading}>
        {selectedFile ? (
          <View style={styles.filePreview}>
            <Image source={{ uri: selectedFile.uri }} style={styles.thumbnail} />
            <Text style={styles.fileName} numberOfLines={1}>
              {selectedFile.fileName || "Document"}
            </Text>
          </View>
        ) : (
          <View style={styles.uploadPrompt}>
            <Ionicons name="cloud-upload-outline" size={32} color="#4FACFE" />
            <Text style={styles.uploadText}>{uploading ? "Uploading..." : "Tap to upload"}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  uploadPrompt: {
    alignItems: "center",
  },
  uploadText: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
  },
  filePreview: {
    alignItems: "center",
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  fileName: {
    fontSize: 14,
    color: "#374151",
    textAlign: "center",
  },
})
