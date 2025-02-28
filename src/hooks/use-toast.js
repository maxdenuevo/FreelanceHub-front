import { create } from "zustand";

const useToastStore = create((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { id: Math.random(), ...toast }],
    })),
  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

export function useToast() {
  const { toasts, addToast, dismissToast } = useToastStore();

  const toast = ({ title, description, action, ...props }) => {
    addToast({ title, description, action, ...props });
  };

  return {
    toast,
    toasts,
    dismiss: dismissToast,
  };
} 