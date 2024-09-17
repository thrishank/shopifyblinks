import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

export const validateUrl = (url: string): boolean => {
  const re = /^https:\/\/[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\/?$/;
  return re.test(url);
};

export const maskToken = (token: string): string => {
  return token.replace(/./g, "*").slice(0, -4) + token.slice(-4);
};
