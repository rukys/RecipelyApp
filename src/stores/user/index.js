import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userStore = create(
  persist(
    set => ({
      user: {},
      setUser: user => {
        set({user});
      },

      isFirstLogin: false,
      setIsFirstLogin: data => {
        set({isFirstLogin: data});
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);

export default userStore;
