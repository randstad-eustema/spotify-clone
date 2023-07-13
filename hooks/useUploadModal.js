import { create } from "zustand";

const useUploadModal = create((set) => ({
  // state
  isOpen: false,
  // actions
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUploadModal;
