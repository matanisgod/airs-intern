import { DefaultValue } from 'recoil';
import type { AtomEffect } from 'recoil';

export const localStorageEffect: <T>(key: string, defaultValue) => AtomEffect<T> =
  (key: string, defaultValue?) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    } else {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const sessionStorageEffect: <T>(key: string, defaultValue) => AtomEffect<T> =
  (key: string, defaultValue?) =>
  ({ setSelf, onSet }) => {
    const savedValue = sessionStorage.getItem(key);
    console.log(key);
    console.log(savedValue);

    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    } else {
      sessionStorage.setItem(key, JSON.stringify(defaultValue));
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        sessionStorage.removeItem(key);
      } else {
        sessionStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };
