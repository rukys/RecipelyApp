import {useState} from 'react';
import {getApp} from '@react-native-firebase/app';
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  get,
} from '@react-native-firebase/database';

import {globalStore, userStore} from '../stores';
import {showMessage} from '../utils';

export default function useFavorite() {
  const [isStore, setIsStore] = useState(false);

  const getUser = userStore(state => state.user);
  const setListFavorite = globalStore(state => state.setListFavorite);

  const app = getApp();
  const db = getDatabase(app);

  const addressStore = `/users/${getUser?.uid}/favorite/`;
  const addressRef = ref(db, addressStore);
  const generateKey = push(addressRef);
  const getUniqeId = generateKey.key;

  const getStoreDatabase = () => {
    onValue(addressRef, snapshot => {
      if (snapshot.exists()) {
        const oldData = snapshot.val();
        const favoriteData = Object.values(oldData);
        setListFavorite(favoriteData);
      } else {
        setListFavorite([]);
      }
    });
  };

  const onCheckStoreDatabase = data => {
    onValue(addressRef, snapshot => {
      if (snapshot.exists()) {
        const oldData = snapshot.val();
        const favoriteData = Object.values(oldData);
        const checkSameData = favoriteData.filter(item => item.key === data);
        setIsStore(checkSameData.length !== 0);
      }
    });
  };

  const onDeleteStoreDatabase = data => {
    get(addressRef).then(snapshot => {
      if (snapshot.exists()) {
        const oldData = snapshot.val();
        const favoriteData = Object.values(oldData);
        const checkSameData = favoriteData.filter(item => item.key === data);
        if (checkSameData.length !== 0) {
          const deleteRef = ref(db, `${addressStore}/${checkSameData[0].id}`);
          set(deleteRef, null).then(() => {
            setIsStore(false);
            showMessage('Resep berhasil di hapus dari favorit', 'success');
          });
        }
      }
    });
  };

  const onStoreDatabase = params => {
    get(addressRef).then(snapshot => {
      const store = {
        id: getUniqeId,
        ...params,
      };

      if (snapshot.exists()) {
        const oldData = snapshot.val();
        const favoriteData = Object.values(oldData);
        const checkSameData = favoriteData.filter(
          item => item.key === params.key,
        );
        if (checkSameData.length === 0) {
          const newRef = ref(db, `${addressStore}/${getUniqeId}/`);
          set(newRef, store).then(() => {
            setIsStore(true);
            showMessage('Resep berhasil di simpan ke favorit', 'success');
          });
        } else {
          showMessage('Resep sudah ada di favorit', 'info');
        }
      } else {
        const newRef = ref(db, `${addressStore}/${getUniqeId}/`);
        set(newRef, store).then(() => {
          setIsStore(true);
          showMessage('Resep berhasil di simpan ke favorit', 'success');
        });
      }
    });
  };

  return {
    isStore,
    onStoreDatabase,
    getStoreDatabase,
    onCheckStoreDatabase,
    onDeleteStoreDatabase,
  };
}
