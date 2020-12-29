const getValueRef = ref => ref?.current?.value.trim();

const localStoreFunc = key => {
  const readLocal = () => {
    localStorage.getItem(key);
  };
  const writeLocal = value => {
    localStorage.setItem(key, value);
  };
  return { readLocal, writeLocal };
};
export { getValueRef, localStoreFunc };
