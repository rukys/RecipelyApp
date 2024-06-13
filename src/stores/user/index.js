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
    }),
    {
      name: 'user-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);

export default userStore;
