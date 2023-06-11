import { create } from "zustand";

interface IRegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRegisterModal = create<IRegisterModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
