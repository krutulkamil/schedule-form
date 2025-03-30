import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const polishMonthFormatter = new Intl.DateTimeFormat('pl-PL', { month: 'long' });
export const polishWeekdayFormatter = new Intl.DateTimeFormat('pl-PL', { weekday: 'short' });
