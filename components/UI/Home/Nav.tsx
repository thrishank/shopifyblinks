"use client";
import { Moon, Sun, User, Package, Link2 } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/common/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/common/dropdown-menu";
import { useWallet } from "@solana/wallet-adapter-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const authenticatedNavItems: NavItem[] = [
  { href: "/profile", label: "Profile", icon: User },
  { href: "/products", label: "Products", icon: Package },
  { href: "/Blinks", label: "Your Blinks", icon: Link2 },
];

export default function NavBar() {
  const navItems = authenticatedNavItems;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
          Blinkify
        </div>
        <div className="flex items-center space-x-4">
          <ProfileMenu navItems={navItems} isAuthenticated={true} />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const handleToggle = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-purple-700 dark:text-purple-300"
      onClick={handleToggle}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}

type ProfileMenuProps = {
  navItems: NavItem[];
  isAuthenticated: boolean;
};

function ProfileMenu({ navItems, isAuthenticated }: ProfileMenuProps) {
  const { data: session } = useSession();
  const { disconnect } = useWallet();

  const handleSignOut = async () => {
    await signOut();
    disconnect();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isAuthenticated && session?.user ? (
          <>
            <DropdownMenuItem className="font-medium">
              {session.user.name || "User"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {navItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href} className="flex items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button onClick={handleSignOut}>Signout</button>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            {navItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href} className="flex items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
