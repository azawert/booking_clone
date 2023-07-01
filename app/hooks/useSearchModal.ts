import { create } from "zustand";

interface ISearchModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSearchModal = create<ISearchModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
