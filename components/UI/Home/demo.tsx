import { Button } from "@/components/common/button";
import { Play } from "lucide-react";
import Image from "next/image";

export default function Demo() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-purple-900 dark:text-purple-100">
          See Solana Blinks in Action
        </h2>
        <div className="max-w-3xl mx-auto relative">
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg"
              alt="Video Thumbnail"
              layout="fill"
              objectFit="cover"
              className="dark:opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
