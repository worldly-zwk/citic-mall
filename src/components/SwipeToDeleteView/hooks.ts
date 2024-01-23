import { create } from 'zustand';

interface GlobalStateStore {
  visible: boolean;
  abortFunc: (() => void) | null;
  abort: () => void;
}

export const useGlobalState = create<GlobalStateStore>((set, get) => ({
  visible: false,
  abortFunc: null,
  abort: () => {
    if (get().visible) {
      set({ visible: false });
      get().abortFunc?.();
    }
  }
}));
