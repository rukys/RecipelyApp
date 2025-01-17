import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userStore = create(
  persist(
    set => ({
      isDarkMode: false,
      setIsDarkMode: data => {
        set({isDarkMode: data});
      },
    }),
    {
      name: 'theme-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);

export default userStore;
