"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export interface TurnstileHandle {
  reset: () => void;
}

export const Turnstile = forwardRef<TurnstileHandle, {
  siteKey: string;
  onToken: (token: string) => void;
  onExpire: () => void;
}>(({ siteKey, onToken, onExpire }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | null>(null);

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetRef.current && window.turnstile) window.turnstile.reset(widgetRef.current);
    },
  }));

  useEffect(() => {
    let cancelled = false;
    const render = () => {
      if (cancelled || !containerRef.current || !window.turnstile || widgetRef.current) return;
      widgetRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action: "workflowlens_analyze",
        theme: "light",
        size: "flexible",
        callback: onToken,
        "expired-callback": onExpire,
        "error-callback": onExpire,
      });
    };

    const existing = document.querySelector<HTMLScriptElement>('script[data-workflowlens-turnstile]');
    if (existing) {
      if (window.turnstile) render();
      else existing.addEventListener("load", render, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.workflowlensTurnstile = "true";
      script.addEventListener("load", render, { once: true });
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (widgetRef.current && window.turnstile) window.turnstile.remove(widgetRef.current);
      widgetRef.current = null;
    };
  }, [siteKey, onToken, onExpire]);

  return <div ref={containerRef} className="wl-turnstile" aria-label="Bot protection check" />;
});

Turnstile.displayName = "Turnstile";
