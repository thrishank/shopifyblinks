import { ChevronRight } from "lucide-react";

export default function How() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-purple-900 dark:text-purple-100">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: 1,
              title: "Connect Your Store",
              description:
                "Integrate our tool with your Shopify store in just a few clicks.",
            },
            {
              step: 2,
              title: "Create Blinks",
              description:
                "Generate Solana Blinks for your products or actions with our intuitive interface.",
            },
            {
              step: 3,
              title: "Share & Profit",
              description:
                "Distribute your Blinks across platforms and watch your sales soar!",
            },
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="bg-purple-100 dark:bg-gray-700 p-6 rounded-lg transition-colors duration-300">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                  Step {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-800 dark:text-purple-200">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
              {index < 2 && (
                <ChevronRight className="absolute top-1/2 -right-4 transform -translate-y-1/2 text-purple-400 dark:text-purple-500 h-8 w-8 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
