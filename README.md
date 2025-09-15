# Bybit Web3 Wallet App

A modern crypto wallet application built with Next.js, featuring seed phrase and private key import functionality with secure Firebase storage.

## Features

- 🎨 Modern dark theme with purple gradients
- 🔐 Secure password creation with validation
- 📱 Responsive mobile-first design
- 🌱 Seed phrase import (12 or 24 words)
- 🔑 Private key import
- 🔥 Firebase Firestore integration for secure storage
- ✨ Beautiful 3D illustrations and animations

## Setup Instructions

### 1. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Firestore Database
4. Go to Project Settings > General > Your apps
5. Add a web app and copy the configuration

### 2. Environment Variables

Create a `.env.local` file in the root directory and add your Firebase configuration:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

### 3. Firestore Security Rules

In your Firebase Console, go to Firestore Database > Rules and update them:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to wallets collection
    match /wallets/{document} {
      allow read, write: if true; // Adjust security rules as needed
    }
  }
}
\`\`\`

### 4. Run the Application

\`\`\`bash
npm install
npm run dev
\`\`\`

## App Flow

1. **Onboarding**: Three beautiful screens introducing the wallet features
2. **Import Options**: Choose to import existing wallet
3. **Import Method**: Select seed phrase or private key
4. **Password Setup**: Create a secure password with validation
5. **Success**: Wallet data is securely saved to Firestore

## Security Notes

- Passwords are hashed before storage (implement proper hashing in production)
- Sensitive data is cleared from browser storage after saving
- Firebase security rules should be configured for your use case
- Consider additional encryption for wallet data in production

## Technologies Used

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS v4
- Firebase/Firestore
- Radix UI components
- Lucide React icons

## Production Considerations

- Implement proper password hashing (bcrypt, scrypt, etc.)
- Add proper error handling and user feedback
- Implement wallet recovery mechanisms
- Add proper authentication and user management
- Configure Firebase security rules appropriately
- Add input validation and sanitization
- Implement proper logging and monitoring
# NextJSTutorial
