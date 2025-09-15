"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronDown, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const seedPhraseOptions = [
  { value: 12, label: "12 Seed Phrase" },
  { value: 24, label: "24 Seed Phrase" },
]

export default function ImportPage() {
  const [activeTab, setActiveTab] = useState<"seed" | "private">("seed")
  const [selectedPhraseLength, setSelectedPhraseLength] = useState(12)
  const [showDropdown, setShowDropdown] = useState(false)
  const [seedWords, setSeedWords] = useState<string[]>(Array(12).fill(""))
  const [privateKey, setPrivateKey] = useState("")
  const router = useRouter()

  const handlePhraseChange = (length: number) => {
    setSelectedPhraseLength(length)
    setSeedWords(Array(length).fill(""))
    setShowDropdown(false)
  }

  const handleWordChange = (index: number, value: string) => {
    const newWords = [...seedWords]
    newWords[index] = value
    setSeedWords(newWords)
  }

  const clearAll = () => {
    setSeedWords(Array(selectedPhraseLength).fill(""))
  }

  const isImportDisabled =
    activeTab === "seed" ? seedWords.some((word) => word.trim() === "") : privateKey.trim() === ""

  const handleImport = () => {
    if (activeTab === "seed") {
      // Store seed phrase in sessionStorage to pass to password setup
      sessionStorage.setItem("walletData", JSON.stringify({ type: "seed", data: seedWords }))
    } else {
      // Store private key in sessionStorage to pass to password setup
      sessionStorage.setItem("walletData", JSON.stringify({ type: "private", data: privateKey }))
    }
    router.push("/setup")
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Link href="/import-options">
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        <h1 className="text-xl font-semibold">Import Wallet</h1>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4">
        {/* Tab Navigation */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab("seed")}
            className={`px-4 py-2 text-lg font-medium ${
              activeTab === "seed" ? "text-white border-b-2 border-white" : "text-gray-500"
            }`}
          >
            Seed Phrase
          </button>
          <button
            onClick={() => setActiveTab("private")}
            className={`px-4 py-2 text-lg font-medium ml-8 ${
              activeTab === "private" ? "text-white border-b-2 border-white" : "text-gray-500"
            }`}
          >
            Private Key
          </button>
        </div>

        {activeTab === "seed" && (
          <>
            {/* Description */}
            <p className="text-gray-400 mb-6 leading-relaxed">
              Enter your seed phrase (12-24 words) to import your wallet. Bybit Wallet will not store your mnemonic
              phrases.
            </p>

            {/* Phrase Length Selector */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 text-white font-medium"
                >
                  {selectedPhraseLength} Seed Phrase
                  <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
                </button>

                {showDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-gray-800 rounded-lg border border-gray-700 py-2 z-10 min-w-[150px]">
                    {seedPhraseOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handlePhraseChange(option.value)}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-700 ${
                          selectedPhraseLength === option.value ? "text-orange-400 bg-gray-700" : "text-white"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={clearAll} className="flex items-center gap-2 text-gray-400 hover:text-white">
                Clear All
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Seed Phrase Grid */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {seedWords.map((word, index) => (
                <div key={index} className="relative">
                  <input
                    type="text"
                    value={word}
                    onChange={(e) => handleWordChange(index, e.target.value)}
                    placeholder={`${index + 1}`}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  />
                  <span className="absolute left-3 top-1 text-xs text-gray-500">{index + 1}</span>
                </div>
              ))}
            </div>

            {/* Import Button */}
            <Button
              disabled={isImportDisabled}
              onClick={handleImport}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 text-lg font-semibold rounded-xl"
            >
              Import
            </Button>
          </>
        )}

        {activeTab === "private" && (
          <>
            {/* Description */}
            <p className="text-gray-400 mb-6 leading-relaxed">
              Enter your private key to import your wallet. Your private key will be stored securely on your device.
            </p>

            {/* Private Key Input */}
            <div className="mb-8">
              <textarea
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Enter your private key"
                className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            {/* Import Button */}
            <Button
              disabled={isImportDisabled}
              onClick={handleImport}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 text-lg font-semibold rounded-xl"
            >
              Import
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
