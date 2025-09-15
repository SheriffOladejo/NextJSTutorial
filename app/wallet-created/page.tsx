"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function WalletCreatedPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="text-center">
        {/* Success icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-xl" />
          </div>
        </div>

        {/* Success message */}
        <h1 className="text-3xl font-bold mb-4">Wallet Created Successfully!</h1>
        <p className="text-gray-400 mb-8 text-balance leading-relaxed">
          Your wallet has been securely created and saved. You can now start using your Bybit Web3 wallet.
        </p>

        {/* Action button */}
        <Link href="/">
          <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 px-8 text-lg font-semibold rounded-xl">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}
