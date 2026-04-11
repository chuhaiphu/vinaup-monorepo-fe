import { create } from 'zustand';

interface LayoutSiderState {
  collapsed: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  setCollapsed: (collapsed: boolean) => void;
}

export const useLayoutSiderStore = create<LayoutSiderState>((set) => ({
  collapsed: true,
  toggle: () => set((state) => ({ collapsed: !state.collapsed })),
  open: () => set({ collapsed: false }),
  close: () => set({ collapsed: true }),
  setCollapsed: (collapsed) => set({ collapsed }),
}));
