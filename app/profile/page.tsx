// https://791225-45.myshopify.com/admin/api/2024-07/shop.json
"use client";
import React from "react";
import { ProfileForm } from "@/components/UI/profile/Form";

export default function ProfilePage() {
  return (
    <div className={`min-h-screen`}>
      <div className="bg-purple-50 dark:bg-gray-900 transition-colors duration-300">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-purple-900 dark:text-purple-100">
            Merchant Profile
          </h1>
          <ProfileForm />
        </main>
      </div>
    </div>
  );
}
