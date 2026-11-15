import { useCallback, useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(fetcher: (signal: AbortSignal) => Promise<T>) {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));

    fetcher(controller.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return; // dibatalkan, abaikan
        const message = err instanceof Error ? err.message : "Terjadi kesalahan.";
        setState({ data: null, loading: false, error: message });
      });

    return () => controller.abort();
  }, [fetcher, attempt]);

  const refetch = useCallback(() => setAttempt((a) => a + 1), []);
  return { ...state, refetch };
}