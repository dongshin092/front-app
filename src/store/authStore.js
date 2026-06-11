import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// 1. 로그인 상태관리 (zustand + persist + immer)
const useAuthStore = create(
  persist(
    immer((set) => ({
      isLoggedIn: false,
      accessToken: '',
      tokenType: '',
      userId: '',
      name: '',

      // 로그인 성공 시 응답 데이터 저장
      login: (data) =>
        set((state) => {
          state.isLoggedIn = true;
          state.tokenType = data.tokenType;
          state.accessToken = data.accessToken;
          state.userId = data.userId;
          state.name = data.name;
        }),

      // 로그아웃 시 상태 초기화
      logout: () =>
        set((state) => {
          state.isLoggedIn = false;
          state.tokenType = '';
          state.accessToken = '';
          state.userId = '';
          state.name = '';
        }),
    })),
    { name: 'auth' }
  )
);

export default useAuthStore;
