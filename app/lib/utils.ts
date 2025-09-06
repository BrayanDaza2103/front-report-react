import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import OpenAI from "openai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // usa tu clave en .env
  dangerouslyAllowBrowser: true, // ⚠️ solo para pruebas (mejor proxy en backend)
});
