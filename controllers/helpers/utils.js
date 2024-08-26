import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
export const generateCryptoHash = async (data, hashType)=> {
  
  let hash = crypto
      .createHash(hashType)
      .update(data)
      .digest("hex");

   return hash;
};



const key = crypto
.createHash("sha512")
.update(process.env.ENCRYPTION_KEY)
.digest("hex")
.slice(0, 32);
const encryptionIV = crypto
.createHash("sha512")
.update(process.env.ENCRYPTION_SECRET_KEY)
.digest("hex")
.slice(0, 16);

export const encrypt = (data)=> {
 const cipher = crypto.createCipheriv(process.env.ENCRYPTION_METHOD, key, encryptionIV);
 return Buffer.from(
   cipher.update(data, "utf8", "hex") + cipher.final("hex")
 ).toString("base64"); // Encrypts data and converts to hex and base64
}

// Decrypt data
export const decrypt = (encryptedData) => {
 const buff = Buffer.from(encryptedData, "base64");
 const decipher = crypto.createDecipheriv(process.env.ENCRYPTION_METHOD, key, encryptionIV);
 return (
   decipher.update(buff.toString("utf8"), "hex", "utf8") +
   decipher.final("utf8")
 ); // Decrypts data and converts to utf8
}
  


// const ENCRYPTION_METHOD = 'aes-256-cbc'; // Ensure this matches your encryption method
// const key = crypto.createHash('sha256').update(process.env.ENCRYPTION_KEY).digest().slice(0, 32); // AES-256 key must be 32 bytes
// const encryptionIV = crypto.createHash('sha256').update(process.env.ENCRYPTION_SECRET_KEY).digest().slice(0, 16); // IV must be 16 bytes

// // Encryption Function
// export const encrypt = (data) => {
//   console.log('Key Length:', key.length); // Should be 32 bytes for AES-256
//   console.log('IV Length:', encryptionIV.length); 
//   const cipher = crypto.createCipheriv(ENCRYPTION_METHOD, key, encryptionIV);
//   let encrypted = cipher.update(data, 'utf8', 'base64');
//   encrypted += cipher.final('base64');
//   return encrypted;
// }

// // Decryption Function
// export const decrypt = (encryptedData) => {
//   const decipher = crypto.createDecipheriv(ENCRYPTION_METHOD, key, encryptionIV);
//   let decrypted;
//   try {
//     // Convert from base64 to binary before decrypting
//     const encryptedBuffer = Buffer.from(encryptedData, 'base64');
//     decrypted = decipher.update(encryptedBuffer, 'binary', 'utf8');
//     decrypted += decipher.final('utf8');
//   } catch (error) {
//     console.error('Decryption error:', error);
//     throw new Error('Decryption failed. Ensure data integrity and correct encryption parameters.');
//   }
//   return decrypted;
// }