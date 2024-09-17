import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function Solana() {
  const comparisonData = [
    {
      crypto: "Receive payments in <10 seconds",
      traditional: "Receive payments in 2-7 days",
    },
    {
      crypto: "Transaction fees: Almost zero",
      traditional: "Transaction fees: 2.9% + 30¢ per transaction",
    },
    {
      crypto: "No middlemen like Stripe or PayPal",
      traditional: "Third-party middlemen",
    },
    {
      crypto: "Secure, direct payments on the Solana blockchain",
      traditional: "Additional fees for international transactions",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800" id="solana">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-8">
          Why Crypto Payments?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-6">
            <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">
              Crypto Payments via Solana Blinks
            </h3>
            <ul className="space-y-2">
              {comparisonData.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {item.crypto}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              Traditional Payment Systems
            </h3>
            <ul className="space-y-2">
              {comparisonData.map((item, index) => (
                <li key={index} className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.traditional}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-lg font-medium text-purple-600 dark:text-purple-300">
          Using Solana Blinks means more profits, faster payments, and fewer
          fees!
        </p>
      </div>
    </section>
  );
}
