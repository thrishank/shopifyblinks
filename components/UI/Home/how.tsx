import { Link, Share2, Wallet } from "lucide-react";

export default function How() {
  const steps = [
    {
      icon: Wallet,
      title: "1. Connect your wallet and Shopify store",
      description:
        "Easily integrate with your Shopify products by connecting your store and wallet in a few clicks.",
    },
    {
      icon: Link,
      title: "2. Generate Blinks",
      description:
        "Use the platform to create Blinks for each product or service.",
    },
    {
      icon: Share2,
      title: "3. Share the link",
      description:
        "Customers can instantly make payments through the shared Blink without the need for third-party payment gateways.",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-purple-100 dark:bg-purple-800 rounded-full p-4 mb-4">
                <step.icon className="h-8 w-8 text-purple-600 dark:text-purple-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                {step.title}
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
