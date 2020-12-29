import React, { useState, useEffect } from 'react';

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) || ''
  );
  console.log('test');
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};
export default useStateWithLocalStorage;
