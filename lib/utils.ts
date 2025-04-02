import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertSpaceToHyphen(urlString: string): string {
  return urlString.replace(/\s+/g, '-');  // Replaces all spaces (whitespace) with hyphens
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return ""; // Handle empty strings
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function convertHyphenToSpace(urlString: string): string {
  return urlString.replace(/-/g, ' ');  // Replaces all hyphens with spaces
}

export function fixUrlString(input: string): string {
  return input.replace(/%20/g, " ");
}
