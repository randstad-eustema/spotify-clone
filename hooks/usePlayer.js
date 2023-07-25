import { create } from "zustand";

const usePlayer = create((set) => ({
  // state
  ids: [],
  activeId: undefined,
  // actions
  setId: (id) => set({ activeId: id }),
  setIds: (ids) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayer;
