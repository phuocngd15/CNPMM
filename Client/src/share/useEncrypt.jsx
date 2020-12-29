import CryptoJS from 'crypto-js';

const useEncrypt = (secretKey = 'SecretPassphrase') => {
  const decrypt = value => {
    const bytes = CryptoJS.AES.decrypt(value, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  const encrypt = value => {
    return CryptoJS.AES.encrypt(value, secretKey).toString();
  };

  return [encrypt, decrypt];
};
export default useEncrypt;
