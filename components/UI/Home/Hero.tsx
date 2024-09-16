import React from "react";
import { Button } from "@/components/common/button";
import { ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
            Simplify Your Payments with{" "}
            <span className="text-purple-600 dark:text-purple-300">
              Solana Blinks
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl text-gray-500 dark:text-gray-300">
            Instant, Secure, and Zero Middlemen Crypto Payments
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Button className="w-auto" size="lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white dark:bg-gray-800 dark:text-white mx-4"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="mt-10 w-full max-w-xl mx-auto">
          {/* Placeholder for animated illustration */}
          <div className="aspect-w-16 aspect-h-9 bg-purple-200 dark:bg-purple-800 rounded-lg animate-pulse">
            {/* Replace this div with your actual animation */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
