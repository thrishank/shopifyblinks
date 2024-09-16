"use client"
import React from "react";
import ProfileForm from "@/components/UI/profile/Form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import { TooltipProvider } from "@/components/common/tooltip";

export default function ProfilePage() {
  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-purple-50 dark:bg-gray-900 transition-colors duration-300">
          <Card className="max-w-2xl mx-auto text-purple-900 dark:text-purple-100">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Merchant Profile
              </CardTitle>
              <CardDescription className="text-center">
                Configure your Shopify store and wallet connection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
