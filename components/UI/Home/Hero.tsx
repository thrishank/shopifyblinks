import { Button } from "@/components/common/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-20 text-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-blue-300 dark:from-purple-800 dark:to-blue-800 opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-400 to-blue-400 dark:from-purple-600 dark:to-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      </div>
      <h1 className="text-5xl font-bold mb-6 text-purple-900 dark:text-purple-100">
        Supercharge Your Shopify Store with Solana Blinks
      </h1>
      <p className="text-xl mb-8 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
        Empower your Shopify store with Blinkify - create shareable links for
        seamless purchases, all powered by the speed and security of Solana..
      </p>
      <div className="flex justify-center gap-4">
        <Button
          size="lg"
          className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="bg-white dark:bg-gray-800 dark:text-white"
        >
          Learn More
        </Button>
      </div>
    </section>
  );
}
