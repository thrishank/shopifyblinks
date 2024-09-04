import NavBar from "@/components/UI/Home/Nav";

export default function Home() {
  return (
    <div className={`min-h-screen`}>
      <div className="bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300">
        <NavBar />
      </div>
    </div>
  );
}
