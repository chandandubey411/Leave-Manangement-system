import { format, parseISO, differenceInCalendarDays } from 'date-fns';

/**
 * Formats an ISO date string to a human-readable format.
 * @param {string} dateStr - ISO date string e.g. "2024-05-20"
 * @param {string} fmt - date-fns format pattern
 */
export function formatDate(dateStr, fmt = 'dd MMM yyyy') {
  if (!dateStr) return '—';
  try {
    return format(parseISO(dateStr), fmt);
  } catch {
    return dateStr;
  }
}

/**
 * Returns number of calendar days between two ISO date strings (inclusive).
 */
export function calcLeaveDays(start, end) {
  if (!start || !end) return 0;
  return differenceInCalendarDays(parseISO(end), parseISO(start)) + 1;
}

/**
 * Returns initials from a full name, max 2 characters.
 * "Arjun Mehta" → "AM"
 */
export function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/**
 * Truncates text to maxLength and appends ellipsis if needed.
 */
export function truncate(text = '', maxLength = 60) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}
