import Blinks from "@/components/UI/Home/Blinks";
import Demo from "@/components/UI/Home/demo";
import Hero from "@/components/UI/Home/Hero";
import How from "@/components/UI/Home/how";
import Solana from "@/components/UI/Home/Solana";

export default async function Home() {
  return (
    <div className={`min-h-screen`}>
      <div className="bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300">
        <Hero />
        <Solana />
        <Blinks />
        <How />
        <Demo />
      </div>
    </div>
  );
}
