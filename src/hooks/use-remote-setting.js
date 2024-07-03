/* eslint-disable react-hooks/exhaustive-deps */
import database from '@react-native-firebase/database';
import {useEffect} from 'react';
import deviceInfoModule from 'react-native-device-info';
import {globalStore} from '../stores';
import {getVersionNumber} from '../utils';

export default function useRemoteSetting() {
  const remoteSetting = globalStore(state => state.remoteSetting);
  const setRemoteSetting = globalStore(state => state.setRemoteSetting);

  const currAppVersionNumber = getVersionNumber(deviceInfoModule.getVersion());
  const minAppVersionNumber = getVersionNumber(
    remoteSetting?.appAndroidMinimumVersion,
  );
  const isNeedAppUpdate = currAppVersionNumber < minAppVersionNumber;

  const getRemoteSetting = () => {
    database()
      .ref('/remoteSetting/')
      .on('value', snapshot => {
        if (snapshot.val()) {
          setRemoteSetting(snapshot.val());
        }
      });
  };
  useEffect(() => {
    getRemoteSetting();
  }, []);

  return {
    remoteSetting,
    isNeedAppUpdate,
  };
}
