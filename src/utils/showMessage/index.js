import {showMessage as showToast} from 'react-native-flash-message';

export const showMessage = (message, type) => {
  showToast({
    message,
    type,
  });
};
