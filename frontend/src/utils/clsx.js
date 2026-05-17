/**
 * Minimal classname helper — avoids adding clsx as a dependency.
 * Filters falsy values and joins with a space.
 */
export function clsx(...classes) {
  return classes.filter(Boolean).join(' ');
}
