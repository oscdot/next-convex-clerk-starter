import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertUnixToTimestamp(unixTimestamp: number): string {
  const date = new Date(unixTimestamp)

  const hours = date.getUTCHours().toString().padStart(2, '0') // convert the hours to UTC and format them to have 2 digits
  const minutes = date.getUTCMinutes().toString().padStart(2, '0') // convert the minutes to UTC and format them to have 2 digits
  const seconds = date.getUTCSeconds().toString().padStart(2, '0') // convert the seconds to UTC and format them to have 2 digits
  return `${hours}:${minutes}:${seconds}`
}
