import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isNumeric(n: any): boolean {
  return n !== "" && !isNaN(parseFloat(n)) && isFinite(n);
}
