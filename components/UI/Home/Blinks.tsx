import { Link, Shield, Zap } from "lucide-react";

export default function Blinks() {
  const features = [
    {
      icon: Link,
      text: "No need to leave the current platform to approve payments.",
    },
    { icon: Zap, text: "Compatible with popular crypto wallets like Phantom." },
    {
      icon: Shield,
      text: "Secure and seamless transactions for your customers.",
    },
  ];

  return (
    <section className="py-16 bg-purple-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-8">
          What are Solana Blinks?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Blinks are Blockchain Links that allow users to perform
          blockchain-based transactions instantly and interactively through
          shareable URLs. These links can be embedded on platforms like X
          (Twitter) or any webpage.To Read more about Blinks, click{" "}
          <a
            href="https://www.dialect.to/"
            className="underline text-blue-500"
            target="#blank"
          >
            here
          </a>
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-purple-100 dark:bg-purple-800 rounded-full p-3 mb-4">
                <feature.icon className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <p className="text-center text-gray-600 dark:text-gray-300">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
