import { create } from 'zustand';

interface AdminLayoutSiderState {
  collapsed: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  setCollapsed: (collapsed: boolean) => void;
}

export const useAdminLayoutSiderStore = create<AdminLayoutSiderState>((set) => ({
  collapsed: false,
  toggle: () => set((state) => ({ collapsed: !state.collapsed })),
  open: () => set({ collapsed: false }),
  close: () => set({ collapsed: true }),
  setCollapsed: (collapsed) => set({ collapsed }),
}));
