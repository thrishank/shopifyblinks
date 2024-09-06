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
      <ModeToggle />
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
