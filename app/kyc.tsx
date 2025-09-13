"use client"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Card } from "../components/Card"
import { GradientButton } from "../components/GradientButton"
import { FileUploader } from "../components/FileUploader"

interface DocumentStatus {
  file: any
  status: "pending" | "verified" | "rejected"
}

interface KYCDocuments {
  aadhar: DocumentStatus
  pan: DocumentStatus
  drivingLicense: DocumentStatus
}

export default function KYCScreen() {
  const router = useRouter()
  const [documents, setDocuments] = useState<KYCDocuments>({
    aadhar: {
      file: null,
      status: "pending",
    },
    pan: {
      file: null,
      status: "verified",
    },
    drivingLicense: {
      file: null,
      status: "rejected",
    },
  })

  const handleFileSelect = (documentType: keyof KYCDocuments, file: any) => {
    setDocuments((prev) => ({
      ...prev,
      [documentType]: {
        ...prev[documentType],
        file,
        status: "pending",
      },
    }))
  }

  const handleSubmit = () => {
    const uploadedDocs = Object.entries(documents).filter(([_, doc]) => doc.file !== null)

    if (uploadedDocs.length === 0) {
      Alert.alert("No Documents", "Please upload at least one document before submitting.")
      return
    }

    Alert.alert(
      "Submit Documents",
      `Are you sure you want to submit ${uploadedDocs.length} document(s) for verification?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Submit",
          onPress: () => {
            // Simulate submission
            Alert.alert(
              "Success",
              "Your documents have been submitted for verification. You will be notified once the review is complete.",
            )

            // Update status to pending for submitted documents
            setDocuments((prev) => {
              const updated = { ...prev }
              uploadedDocs.forEach(([docType]) => {
                updated[docType as keyof KYCDocuments].status = "pending"
              })
              return updated
            })
          },
        },
      ],
    )
  }

  const getOverallStatus = () => {
    const statuses = Object.values(documents).map((doc) => doc.status)
    if (statuses.every((status) => status === "verified")) return "verified"
    if (statuses.some((status) => status === "rejected")) return "rejected"
    return "pending"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "verified":
        return "Verification Complete"
      case "rejected":
        return "Action Required"
      case "pending":
        return "Under Review"
      default:
        return "Not Started"
    }
  }

  const overallStatus = getOverallStatus()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>KYC Verification</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Status Overview */}
        <Card style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusIcon}>
              <Ionicons
                name={
                  overallStatus === "verified"
                    ? "checkmark-circle"
                    : overallStatus === "rejected"
                      ? "close-circle"
                      : "time"
                }
                size={32}
                color={getStatusColor(overallStatus)}
              />
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>{getStatusText(overallStatus)}</Text>
              <Text style={styles.statusSubtitle}>
                {overallStatus === "verified"
                  ? "Your identity has been successfully verified"
                  : overallStatus === "rejected"
                    ? "Some documents need to be resubmitted"
                    : "Upload your documents to complete verification"}
              </Text>
            </View>
          </View>
        </Card>

        {/* Document Upload Section */}
        <Card style={styles.uploadCard}>
          <Text style={styles.sectionTitle}>Upload Documents</Text>
          <Text style={styles.sectionSubtitle}>
            Please upload clear, high-quality images of your documents. All information should be clearly visible.
          </Text>

          <FileUploader
            label="Aadhar Card"
            onFileSelect={(file) => handleFileSelect("aadhar", file)}
            selectedFile={documents.aadhar.file}
            verificationStatus={documents.aadhar.status}
          />

          <FileUploader
            label="PAN Card"
            onFileSelect={(file) => handleFileSelect("pan", file)}
            selectedFile={documents.pan.file}
            verificationStatus={documents.pan.status}
          />

          <FileUploader
            label="Driving License"
            onFileSelect={(file) => handleFileSelect("drivingLicense", file)}
            selectedFile={documents.drivingLicense.file}
            verificationStatus={documents.drivingLicense.status}
          />
        </Card>

        {/* Guidelines */}
        <Card style={styles.guidelinesCard}>
          <Text style={styles.sectionTitle}>Upload Guidelines</Text>
          <View style={styles.guidelinesList}>
            <View style={styles.guidelineItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
              <Text style={styles.guidelineText}>Ensure all text is clearly readable</Text>
            </View>
            <View style={styles.guidelineItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
              <Text style={styles.guidelineText}>Upload original documents only</Text>
            </View>
            <View style={styles.guidelineItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
              <Text style={styles.guidelineText}>File size should be less than 5MB</Text>
            </View>
            <View style={styles.guidelineItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
              <Text style={styles.guidelineText}>Supported formats: JPG, PNG, PDF</Text>
            </View>
          </View>
        </Card>

        {/* Submit Button */}
        <View style={styles.submitContainer}>
          <GradientButton
            title="Submit for Verification"
            onPress={handleSubmit}
            disabled={Object.values(documents).every((doc) => doc.file === null)}
          />
          <Text style={styles.submitNote}>
            By submitting, you agree that the information provided is accurate and complete.
          </Text>
        </View>
      </ScrollView>
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
  statusCard: {
    marginBottom: 24,
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIcon: {
    marginRight: 16,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  uploadCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 20,
  },
  guidelinesCard: {
    marginBottom: 32,
  },
  guidelinesList: {
    gap: 12,
  },
  guidelineItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  guidelineText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  submitContainer: {
    marginBottom: 40,
  },
  submitNote: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 16,
  },
})
