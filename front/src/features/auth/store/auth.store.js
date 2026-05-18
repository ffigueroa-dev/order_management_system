import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  isAuthenticated: false,
  isHydrated: false,

  login: ({ user, token }) => {
    localStorage.setItem('token', token);

    localStorage.setItem('user', JSON.stringify(user));

    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem('token');

    localStorage.removeItem('user');

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  loadSession: () => {
    const token = localStorage.getItem('token');

    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      set({
        user,
        token,
        isAuthenticated: true,
      });
    }

    set({
      isHydrated: true,
    });
  },
}));
