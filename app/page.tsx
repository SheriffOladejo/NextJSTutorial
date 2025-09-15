"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

const onboardingScreens = [
  {
    id: 1,
    image: "/images/parachute-illustration.png",
    title: "Discover Trending Memes & DApps",
    description: "",
  },
  {
    id: 2,
    image: "/images/gateway-illustration.png",
    title: "Your Gateway to Layer Fun",
    description: "",
  },
  {
    id: 3,
    image: "/images/wallet-illustration.png",
    title: "All Coins & Chains, One Wallet",
    description: "",
  },
]

export default function OnboardingPage() {
  const [currentScreen, setCurrentScreen] = useState(0)

  const nextScreen = () => {
    if (currentScreen < onboardingScreens.length - 1) {
      setCurrentScreen(currentScreen + 1)
    }
  }

  const prevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1)
    }
  }

  const screen = onboardingScreens[currentScreen]

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header with back button */}
      {currentScreen > 0 && (
        <div className="flex items-center p-4">
          <button onClick={prevScreen} className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Illustration */}
        <div className="mb-8 relative">
          <img src={screen.image || "/placeholder.svg"} alt={screen.title} className="w-80 h-80 object-contain" />
        </div>

        {/* Progress indicator */}
        <div className="flex gap-2 mb-8">
          {onboardingScreens.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentScreen ? "w-8 bg-white" : "w-2 bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-8 text-balance leading-tight">{screen.title}</h1>

        {/* Action buttons */}
        <div className="w-full max-w-sm space-y-4">
          {currentScreen === onboardingScreens.length - 1 ? (
            <>
              <Link href="/import-options" className="block">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 text-lg font-semibold rounded-xl">
                  Import Existing Wallet
                </Button>
              </Link>
            </>
          ) : (
            <Button
              onClick={nextScreen}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 text-lg font-semibold rounded-xl"
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
