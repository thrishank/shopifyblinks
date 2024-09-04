import React from "react";

const Solana = () => {
  return (
    <section className="bg-white dark:bg-gray-800 py-20 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-purple-900 dark:text-purple-100">
          Why Choose Solana?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Lightning Fast",
              description: "Process up to 65,000 transactions per second",
              icon: "⚡",
            },
            {
              title: "Ultra-Low Fees",
              description: "Average transaction cost of $0.00025",
              icon: "💰",
            },
            {
              title: "Highly Secure",
              description: "Built on cutting-edge blockchain technology",
              icon: "🔒",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-purple-50 dark:bg-gray-700 p-6 rounded-lg text-center transition-colors duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-purple-700 dark:text-purple-300">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solana;
