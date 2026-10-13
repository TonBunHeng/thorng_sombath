/**
 * Smoothly scrolls to a target element or vertical pixel offset.
 * Integrates with Lenis smooth-scroller if active (desktop),
 * or falls back to native smooth scrolling (mobile / touch).
 */
export function smoothScrollTo(target, options = {}) {
  const el = typeof target === "string" ? document.querySelector(target) : target;

  if (typeof window !== "undefined" && window.__lenis) {
    if (el) {
      window.__lenis.scrollTo(el, {
        offset: options.offset ?? 0,
        duration: options.duration ?? 1.8,
        easing: options.easing ?? ((t) => 1 - Math.pow(1 - t, 4))
      });
      return;
    }
    if (typeof target === "number") {
      window.__lenis.scrollTo(target, {
        duration: options.duration ?? 1.8,
        easing: options.easing ?? ((t) => 1 - Math.pow(1 - t, 4))
      });
      return;
    }
  }

  // Native smooth scrolling fallback
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: options.block || "start"
    });
  } else if (typeof target === "number") {
    window.scrollTo({
      top: target,
      behavior: "smooth"
    });
  }
}
