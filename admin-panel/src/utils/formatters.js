import { format, parseISO, differenceInCalendarDays } from 'date-fns';

export function formatDate(dateStr, fmt = 'dd MMM yyyy') {
  if (!dateStr) return '—';
  try {
    return format(parseISO(dateStr), fmt);
  } catch {
    return dateStr;
  }
}

export function calcLeaveDays(start, end) {
  if (!start || !end) return 0;
  return differenceInCalendarDays(parseISO(end), parseISO(start)) + 1;
}

export function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function truncate(text = '', maxLength = 60) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}
