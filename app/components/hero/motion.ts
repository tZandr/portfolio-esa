/* Read at the moment of use rather than once at render, so it's never
   evaluated on the server and always reflects the current setting. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}
