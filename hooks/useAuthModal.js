import { create } from "zustand";

const useAuthModal = create((set) => ({
  // state
  isOpen: false,
  // actions
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
