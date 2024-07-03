export const getVersionNumber = (str = '') =>
  Number(
    str
      .split('.')
      .map(item => {
        if (item.length === 1) {
          return `0${item}`;
        }
        return item;
      })
      .join(''),
  );
