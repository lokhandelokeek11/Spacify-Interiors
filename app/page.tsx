"use client"

import { useEffect } from "react"
import { router } from "expo-router"

export default function Page() {
  useEffect(() => {
    // For now, redirect to login screen
    // In a real app, you would check authentication status here
    router.replace("/login")
  }, [])

  // Return null since we're redirecting immediately
  return null
}
