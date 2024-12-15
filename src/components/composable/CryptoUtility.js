import CryptoJS from 'crypto-js';
const secretKey = '!@#$%^&*()_+{}[]:;"<,>.?/~+-9876543210!K@E#Y$U%S^E&R*l(a)b_h+i=gh`s~h:o;o,l.B<u>l,S.UqwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
export function encryptData(data) {
 const encrypted = CryptoJS.AES.encrypt(data, secretKey);
 return encrypted.toString();
}
export function decryptData(encryptedData) {
 if (!encryptedData) {
 return null; // Or handle empty input value appropriately
 }
 const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
 return bytes.toString(CryptoJS.enc.Utf8);
}