import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Wheel rescue: if a script blocks mouse-wheel scroll, forward non-pixel (mouse) deltas to page scroll.
(() => {
  if (typeof window === "undefined") return;
  if (window.__wheelRescueInstalled) return;
  window.__wheelRescueInstalled = true;

  const isScrollableElement = (node) => {
    let current = node;
    while (current && current !== document.body) {
      const style = window.getComputedStyle(current);
      const canScrollY =
        (style.overflowY === "auto" || style.overflowY === "scroll") &&
        current.scrollHeight > current.clientHeight;
      if (canScrollY) return true;
      current = current.parentElement;
    }
    return false;
  };

  const normalizeDelta = (deltaY, deltaMode) => {
    if (deltaMode === 1) return deltaY * 32; // DOM_DELTA_LINE
    if (deltaMode === 2) return deltaY * window.innerHeight; // DOM_DELTA_PAGE
    return deltaY; // DOM_DELTA_PIXEL
  };

  const pending = { delta: 0, rafId: null };
  const multiplier = 2.0; // bump mouse wheel distance to feel closer to native

  window.addEventListener(
    "wheel",
    (event) => {
      if (event.ctrlKey || !event.cancelable) return;
      if (isScrollableElement(event.target)) return;

      // Heuristic: only intercept classic mouse wheels (line/page or chunky pixel deltas); let trackpads through.
      const isMouseWheel =
        event.deltaMode === 1 ||
        event.deltaMode === 2 ||
        (event.deltaMode === 0 && Number.isInteger(event.deltaY) && Math.abs(event.deltaY) >= 80);
      if (!isMouseWheel) return;

      event.stopImmediatePropagation?.();
      event.preventDefault();

      pending.delta += normalizeDelta(event.deltaY, event.deltaMode) * multiplier;

      if (pending.rafId === null) {
        pending.rafId = requestAnimationFrame(() => {
          window.scrollBy({ top: pending.delta, behavior: "auto" });
          pending.delta = 0;
          pending.rafId = null;
        });
      }
    },
    { capture: true, passive: false }
  );
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
