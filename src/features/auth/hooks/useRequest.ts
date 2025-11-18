import { useState } from "react";

export function useRequestState() {
  const [state, setState] = useState({
    status: "idle",   // idle | loading | success | error
    error: null as string | null,
  });

  const setLoading = () =>
    setState({ status: "loading", error: null });

  const setSuccess = () =>
    setState({ status: "success", error: null });

  const setError = (message: string) =>
    setState({ status: "error", error: message });


  return {
    ...state,
    loading: state.status === "loading",
    setLoading,
    setSuccess,
    setError,
  };
}
