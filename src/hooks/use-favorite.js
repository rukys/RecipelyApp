import {useState} from 'react';
import database from '@react-native-firebase/database';
import {globalStore, userStore} from '../stores';
import {showMessage} from '../utils';

export default function useFavorite() {
  const [isStore, setIsStore] = useState(false);

  const getUser = userStore(state => state.user);
  const setListFavorite = globalStore(state => state.setListFavorite);

  const addressStore = '/users/' + getUser?.uid + '/favorite/';
  const generateKey = database().ref(addressStore).push();
  const getUniqeId = generateKey.key;

  const getStoreDatabase = () => {
    database()
      .ref(addressStore)
      .on('value', snapshot => {
        if (snapshot.val()) {
          const oldData = snapshot.val();
          const favoriteData = [];
          Object.keys(oldData).map(key => {
            favoriteData.push(oldData[key]);
          });
          setListFavorite(favoriteData);
        } else {
          setListFavorite([]);
        }
      });
  };

  const onCheckStoreDatabase = data => {
    database()
      .ref(addressStore)
      .on('value', snapshot => {
        if (snapshot.val()) {
          const oldData = snapshot.val();
          const favoriteData = [];
          Object.keys(oldData).map(key => {
            favoriteData.push(oldData[key]);
          });
          const checkSameData = favoriteData.filter(item => item.key === data);
          if (checkSameData?.length === 0) {
            setIsStore(false);
          } else {
            setIsStore(true);
          }
        }
      });
  };

  const onDeleteStoreDatabase = data => {
    database()
      .ref(addressStore)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          const oldData = snapshot.val();
          const favoriteData = [];
          Object.keys(oldData).map(key => {
            favoriteData.push(oldData[key]);
          });
          const checkSameData = favoriteData.filter(item => item.key === data);
          if (checkSameData?.length !== 0) {
            database()
              .ref(addressStore + '/' + checkSameData[0].id)
              .set(null)
              .then(() => {
                setIsStore(false);
                showMessage('Resep berhasil di hapus dari favorit', 'success');
              });
          }
        }
      });
  };

  const onStoreDatabase = params => {
    database()
      .ref(addressStore)
      .once('value')
      .then(snapshot => {
        const store = {
          id: getUniqeId,
          ...params,
        };

        if (snapshot.val()) {
          const oldData = snapshot.val();
          const favoriteData = [];
          Object.keys(oldData).map(key => {
            favoriteData.push(oldData[key]);
          });
          const checkSameData = favoriteData.filter(
            item => item.key === params.key,
          );
          if (checkSameData?.length === 0) {
            database()
              .ref(addressStore + '/' + getUniqeId + '/')
              .set(store)
              .then(() => {
                setIsStore(true);
                showMessage('Resep berhasil di simpan ke favorit', 'success');
              });
          } else {
            showMessage('Resep sudah ada di favorit', 'info');
          }
        } else {
          database()
            .ref(addressStore + '/' + getUniqeId + '/')
            .set(store)
            .then(() => {
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
