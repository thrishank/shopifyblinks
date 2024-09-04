"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/common/button";

export default function NavBar() {
  return (
    <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
      <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
        Blinkify
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="bg-white dark:bg-gray-800 dark:text-white"
        >
          Login
        </Button>
        <Button
          variant="outline"
          className="bg-white dark:bg-gray-800 dark:text-white"
        >
          Signup
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
}

function ModeToggle() {
  const { setTheme } = useTheme();

  const theme = useTheme();

  const handleToggle = () => {
    if (theme.theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      variant="ghost"
      className="text-purple-700 dark:text-purple-300"
      onClick={handleToggle}
    >
      {theme.theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
