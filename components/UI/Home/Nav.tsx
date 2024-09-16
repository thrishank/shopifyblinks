import Link from "next/link";
import ClientNavBar from "./dark";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/profile", label: "Profile" },
  { href: "/products", label: "Products" },
  { href: "/blinks", label: "Blinks" },
];

export default function NavBar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" passHref>
            <span className="texl-2xl sm:text-4xl font-bold text-purple-600 dark:text-purple-300">
              SolanaBlinks
            </span>
          </Link>
          <div className="flex flex-grow justify-center">
            <div className="flex items-center space-x-2 sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-purple-700 text-xl dark:text-purple-300 hover:text-purple-500 dark:hover:text-purple-400"
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:block">
            <ClientNavBar />
          </div>
        </div>
      </div>
    </nav>
  );
}
