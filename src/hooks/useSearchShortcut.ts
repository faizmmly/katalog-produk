import { useEffect } from "react";

export function useSearchShortcut(inputId: string) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.key !== "/" || el.matches("input, textarea, select")) return;
      e.preventDefault();
      document.getElementById(inputId)?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [inputId]);
}