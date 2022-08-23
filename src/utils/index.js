import { INITAL_STORE } from '@contexts/TaskContext';

export const generateID = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  // prettier-ignore
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const saveToLocalStorage = (key = 'store', data) => {
  let consolidatedData = INITAL_STORE;
  consolidatedData = data;
  window.localStorage.setItem(key, JSON.stringify(consolidatedData));
};

export const getFromLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};
