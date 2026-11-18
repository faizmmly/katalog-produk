export type ToastType = "success" | "info" | "error";

export interface ToastPayload {
  id: number;
  message: string;
  type: ToastType;
}

export function showToast(message: string, type: ToastType = "success") {
  const event = new CustomEvent<ToastPayload>("app-toast", {
    detail: {
      id: Date.now() + Math.random(),
      message,
      type,
    },
  });
  window.dispatchEvent(event);
}