<div align="center">
  <img src="public/assets/icons/logo-full.png" alt="Aethera Logo" width="200" />

  Aethera is a high-end, premium storage management and file-sharing platform designed for surgical precision in engineering workflows and sophisticated file orchestration.

  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![Appwrite](https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white)](https://appwrite.io/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)

</div>

## 🚀 Overview

Aethera provides a seamless experience for uploading, organizing, and sharing files with a focus on clarity and control. Built with a modern tech stack, it offers a minimalist yet powerful interface for professional file management.

## 🔋 Key Features

- **Advanced Authentication**: Secure sign-up/sign-in with Email OTP via Appwrite.
- **Versatile Uploads**: Support for Documents, Images, Videos, Audio, and more with high size limits.
- **Surgical Organization**: Category-based file management and advanced sorting (name, date, size).
- **Collaboration**: Secure file sharing with unique access controls.
- **Global Search**: Find any file across your entire storage instantly.
- **Real-time Dashboard**: Gain insights into storage usage and recent activity with dynamic visualizations.
- **Premium UI**: Dark mode-ready, glassmorphic design with smooth micro-animations.

## 🤸 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- **Node.js**: v18 or higher
- **Package Manager**: npm or yarn
- **Appwrite Account**: A free account at [Appwrite Cloud](https://cloud.appwrite.io/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AnkitKumar2511/Aethera.git
   cd aethera
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory and populate it with your Appwrite project credentials. You can find these in your [Appwrite Console](https://cloud.appwrite.io/) under Project Settings and API Keys.

   ```env
   # Appwrite Configuration
   NEXT_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
   NEXT_PUBLIC_APPWRITE_PROJECT="YOUR_PROJECT_ID"
   NEXT_PUBLIC_APPWRITE_DATABASE="YOUR_DATABASE_ID"
   NEXT_PUBLIC_APPWRITE_USERS_COLLECTION="YOUR_USERS_COLLECTION_ID"
   NEXT_PUBLIC_APPWRITE_FILES_COLLECTION="YOUR_FILES_COLLECTION_ID"
   NEXT_PUBLIC_APPWRITE_BUCKET="YOUR_BUCKET_ID"
   NEXT_APPWRITE_KEY="YOUR_API_KEY"
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```