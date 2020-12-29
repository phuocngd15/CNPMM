import CryptoJS from 'crypto-js';

export const decrypt = value => {
  const bytes = CryptoJS.AES.decrypt(value, 'SecretPassphrase'); // SecretPassphrase can handle by server
  return bytes.toString(CryptoJS.enc.Utf8);
};
