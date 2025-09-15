"use client"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"
import Link from "next/link"

export default function ImportOptionsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Link href="/">
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        <h1 className="text-xl font-semibold">Import/Recover Your Wallet</h1>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="space-y-4">
          {/* Import Wallet Option */}
          <Link href="/import">
            <div className="bg-gray-900 rounded-xl p-6 flex items-center justify-between hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Download className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Import Wallet</h3>
                  <p className="text-gray-400 text-sm">Import Using Seed Phrase/Private Key</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
