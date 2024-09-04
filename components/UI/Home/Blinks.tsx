import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function Blinks() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-purple-900 dark:text-purple-100">
          What are Solana Blinks?
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
              Solana Blinks are shareable URLs that enable direct interaction
              with the Solana blockchain from platform live X. They simplify
              complex blockchain operations into a single click.
            </p>
            <ul className="space-y-4">
              {[
                "Purchase products instantly",
                "Trade NFTs seamlessly",
                "Send token tips effortlessly",
                "Participate in governance voting",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500 dark:text-green-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/image.png"
              width={500}
              height={300}
              alt="Solana Blinks Diagram"
              className="rounded-lg shadow-lg dark:opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
