import CryptoJS from 'crypto-js';
import * as forge from 'node-forge';
import { createHmac, randomBytes } from 'crypto';

export const caesarCipher = (
  text: string,
  shift: number,
  decrypt: boolean = false,
): string => {
  const s = decrypt ? (26 - shift) % 26 : shift;
  const n = s > 0 ? s : 26 + (s % 26);
  return [...text]
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90)
        return String.fromCharCode(((code - 65 + n) % 26) + 65); // Uppercase
      if (code >= 97 && code <= 122)
        return String.fromCharCode(((code - 97 + n) % 26) + 97); // Lowercase

      return char;
    })
    .join('');
};

export const transpositionCipher = (
  text: string,
  decrypt: boolean = false,
): string => {
  const columns = 5;
  const rows = Math.ceil(text.length / columns);
  const paddedText = text.padEnd(rows * columns, ' ');
  if (decrypt) {
    let decrypted = '';
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const index = col * rows + row;
        if (index < paddedText.length) {
          decrypted += paddedText[index];
        }
      }
    }

    return decrypted.trim();
  } else {
    let encrypted = '';
    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows; row++) {
        encrypted += paddedText[row * columns + col];
      }
    }

    return encrypted.trim();
  }
};

export const base64Cipher = (
  text: string,
  decrypt: boolean = false,
): string => {
  return decrypt ? atob(text) : btoa(text);
};

export const beaufortCipher = (
  text: string,
  key: string,
  decrypt: boolean = false,
): string => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  key = key.toUpperCase();
  let result = '';
  let keyIndex = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i].toUpperCase();
    const keyChar = key[keyIndex % key.length];

    if (alphabet.includes(char)) {
      const charIndex = alphabet.indexOf(char);
      const keyIndexChar = alphabet.indexOf(keyChar);
      const newIndex = decrypt
        ? (keyIndexChar - charIndex + 26) % 26
        : (charIndex - keyIndexChar + 26) % 26;
      result += alphabet[newIndex];
      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
};

export const vigenereCipher = (
  text: string,
  key: string,
  decrypt: boolean = false,
): string => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  key = key.toUpperCase();
  let result = '';
  let keyIndex = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i].toUpperCase();
    const keyChar = key[keyIndex % key.length];
    if (alphabet.includes(char)) {
      const charIndex = alphabet.indexOf(char);
      const keyIndexChar = alphabet.indexOf(keyChar);
      const newIndex = decrypt
        ? (charIndex - keyIndexChar + 26) % 26
        : (charIndex + keyIndexChar) % 26;
      result += alphabet[newIndex];
      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
};

const diamondGrid = [
  ['A', 'B', 'C', 'D', 'E'],
  ['F', 'G', 'H', 'I/J', 'K'],
  ['L', 'M', 'N', 'O', 'P'],
  ['Q', 'R', 'S', 'T', 'U'],
  ['V', 'W', 'X', 'Y', 'Z'],
];

const getPosition = (char: string) => {
  for (let i = 0; i < diamondGrid.length; i++) {
    const index = diamondGrid[i].indexOf(char);
    if (index !== -1) {
      return { row: i, col: index };
    }
  }

  return null;
};

export const polibiusCipher = (
  text: string,
  decrypt: boolean = false,
): string => {
  let result = '';
  if (decrypt) {
    for (let i = 0; i < text.length; i += 2) {
      const row = parseInt(text[i]) - 1;
      const col = parseInt(text[i + 1]) - 1;
      if (
        row >= 0 &&
        row < diamondGrid.length &&
        col >= 0 &&
        col < diamondGrid[row].length
      ) {
        result += diamondGrid[row][col];
      }
    }
  } else {
    text = text.toUpperCase().replace(/J/g, 'I');
    for (const char of text) {
      const position = getPosition(char);
      if (position) {
        result += (position.row + 1).toString() + (position.col + 1).toString();
      } else {
        result += char;
      }
    }
  }

  return result;
};

export const aesCipher = (
  text: string,
  key: string,
  decrypt: boolean = false,
): string => {
  if (decrypt) {
    const bytes = CryptoJS.AES.decrypt(text, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } else {
    return CryptoJS.AES.encrypt(text, key).toString();
  }
};

export const desCipher = (
  text: string,
  key: string,
  decrypt: boolean = false,
): string => {
  if (decrypt) {
    const bytes = CryptoJS.DES.decrypt(text, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } else {
    return CryptoJS.DES.encrypt(text, key).toString();
  }
};

export const streamCipher = (
  input: string,
  key: string,
  decrypt = false,
  algorithm = 'aes',
): string => {
  console.log(algorithm);
  if (algorithm === 'hmac') {
    const result = hmacCipher(input, key || Math.random().toString(36).substring(2, 15), decrypt);
    alert('Encrypted File:\n' + result);
    return result;
  } else {
    const result = decrypt
      ? decryptWithAlgorithm(input, key, algorithm)
      : encryptWithAlgorithm(input, key, algorithm);
    return result;
  }
};

const encryptWithAlgorithm = (
  data: string,
  key: string,
  algorithm: string,
): string => {
  if (algorithm === 'aes') {
    return CryptoJS.AES.encrypt(data, key).toString();
  } else if (algorithm === 'des') {
    return CryptoJS.DES.encrypt(data, key).toString();
  }
  return data;
};

const decryptWithAlgorithm = (
  ciphertext: string,
  key: string,
  algorithm: string,
): string => {
  if (algorithm === 'aes') {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } else if (algorithm === 'des') {
    const bytes = CryptoJS.DES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  return ciphertext;
};

export const processTextStream = (
  text: string,
  key: string,
  isDecryption: boolean,
  algorithm: string,
): Promise<string> => {
  return new Promise((resolve) => {
    let result = '';
    let offset = 0;

    const processChunk = () => {
      const slice = text.slice(offset);
      if (slice) {
        const processedData = streamCipher(slice, key, isDecryption, algorithm);
        result += processedData;
        offset += slice.length;
      }

      if (offset < text.length) {
        setTimeout(processChunk, 0);
      } else {
        resolve(result);
      }
    };

    processChunk();
  });
};

export const processFileStream = (
  base64Data: string,
  key: string,
  isDecryption: boolean,
  algorithm: string,
): Promise<string> => {
  return new Promise((resolve) => {
    let result = '';
    let offset = 0;

    const readNextChunk = () => {
      const slice = base64Data.slice(offset);
      if (slice) {
        const processedData = streamCipher(slice, key, isDecryption, algorithm);
        result += processedData;
        offset += slice.length;
      }

      if (offset < base64Data.length) {
        setTimeout(readNextChunk, 0);
      } else {
        resolve(result);
      }
    };

    readNextChunk();
  });
};

export const rsaGenerateKeys = () => {
  const { publicKey, privateKey } = forge.pki.rsa.generateKeyPair(2048);
  const publicPem = forge.pki.publicKeyToPem(publicKey);
  const privatePem = forge.pki.privateKeyToPem(privateKey);

  return { publicKey: publicPem, privateKey: privatePem };
};

export const rsaEncrypt = (publicKey: string, text: string) => {
  const publicKeyForge = forge.pki.publicKeyFromPem(publicKey);
  const encrypted = publicKeyForge.encrypt(text, 'RSA-OAEP');
  return forge.util.encode64(encrypted);
};

export const rsaDecrypt = (privateKey: string, encryptedText: string) => {
  const privateKeyForge = forge.pki.privateKeyFromPem(privateKey);
  const decodedEncrypted = forge.util.decode64(encryptedText);
  return privateKeyForge.decrypt(decodedEncrypted, 'RSA-OAEP');
};

export const extractPemKey = (pem: string) => {
  const pemContents = pem
    .replace(/-----(BEGIN|END) [A-Z ]+-----/g, '')
    .replace(/\s/g, '');
  return pemContents;
};

const addPemHeaders = (key: any) => {
  if (
    !key.includes('-----BEGIN RSA PRIVATE KEY-----') &&
    !key.includes('-----END RSA PRIVATE KEY-----')
  ) {
    return `-----BEGIN RSA PRIVATE KEY-----\n${key
      .match(/.{1,64}/g)
      .join('\n')}\n-----END RSA PRIVATE KEY-----`;
  }

  return key;
};

export const rsaCipher = (
  text: string,
  key: string,
  decrypt: boolean = false,
) => {
  if (decrypt) {
    return rsaDecrypt(addPemHeaders(key), text);
  } else {
    const rsaKeys = rsaGenerateKeys();
    const { publicKey } = rsaKeys;
    const encryptedText = rsaEncrypt(publicKey, text);
    return { rsaKeys, encryptedText };
  }
};

export const dhGenerateKeys = (
  p: number,
  g: number,
): { privateKey: number; publicKey: number } => {
  const privateKey = parseInt(randomBytes(32).toString('hex'), 16) % p;
  const publicKey = Math.pow(g, privateKey) % p;
  return { privateKey, publicKey };
};

export const dhComputeSharedSecret = (
  otherPublicKey: number,
  privateKey: number,
  p: number,
): number => {
  return Math.pow(otherPublicKey, privateKey) % p;
};

let rsaKeys: any = null;
export const diffieHellmanCipher = (
  text: string,
  key: string,
  decrypt: boolean,
) => {
  if (decrypt) {
    const rsaEncryptedText = rsaDecrypt(rsaKeys.privateKey, text);
    console.log(rsaEncryptedText);
    return aesCipher(
      rsaEncryptedText,
      Number(key).toString(16).padStart(32, '0'),
      true,
    );
  } else {
    const p = 53;
    const g = 8;

    const aliceKeys = dhGenerateKeys(p, g);
    const bobKeys = dhGenerateKeys(p, g);
    const aliceSecret = dhComputeSharedSecret(
      bobKeys.publicKey,
      aliceKeys.privateKey,
      p,
    );
    const bobSecret = dhComputeSharedSecret(
      aliceKeys.publicKey,
      bobKeys.privateKey,
      p,
    );

    const sharedAliceSecretHex = aliceSecret.toString(16).padStart(32, '0');

    rsaKeys = rsaGenerateKeys();
    const { publicKey } = rsaKeys;

    const rsaEncryptedText = rsaEncrypt(publicKey, text);
    const encryptedText = aesCipher(rsaEncryptedText, sharedAliceSecretHex);
    return {
      aliceSecret,
      bobSecret,
      rsaKeys,
      encryptedText,
    };
  }
};

let hmacHash: string = '';
let orginalText: string = '';
export const hmacCipher = (
  text: string,
  key: string,
  decrypt: boolean = false,
) => {
  if (decrypt) {
    return (hmacHash === text) ? orginalText : 'Error: Invalid HMAC';
  } else {
    orginalText = text;
    const hmac = createHmac('sha256', key);
    hmac.update(text);
    hmacHash = hmac.digest('hex');
    return hmacHash;
  }
};

type HuffmanNode = {
  char?: string;
  freq: number;
  left?: HuffmanNode;
  right?: HuffmanNode;
};

type HuffmanTable = { [key: string]: string };

const buildFrequencyTable = (text: string): { [char: string]: number } => {
  const freqTable: { [char: string]: number } = {};
  for (const char of text) {
    freqTable[char] = (freqTable[char] || 0) + 1;
  }
  return freqTable;
};

const buildHuffmanTree = (freqTable: { [char: string]: number }): HuffmanNode => {
  const nodes: HuffmanNode[] = Object.keys(freqTable).map((char) => ({
    char,
    freq: freqTable[char],
  }));

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);

    const left = nodes.shift()!;
    const right = nodes.shift()!;

    const newNode: HuffmanNode = {
      freq: left.freq + right.freq,
      left,
      right,
    };

    nodes.push(newNode);
  }

  return nodes[0];
};

const buildHuffmanTable = (tree: HuffmanNode, prefix = ''): HuffmanTable => {
  const table: HuffmanTable = {};

  if (!tree.left && !tree.right) {
    table[tree.char!] = prefix;
  } else {
    if (tree.left) {
      Object.assign(table, buildHuffmanTable(tree.left, prefix + '0'));
    }
    if (tree.right) {
      Object.assign(table, buildHuffmanTable(tree.right, prefix + '1'));
    }
  }

  return table;
};

export const huffmanCipher = (text: string, decrypt: boolean = false): string => {
  const freqTable = buildFrequencyTable(text);
  const huffmanTree: HuffmanNode = buildHuffmanTree(freqTable);
  const huffmanTable: HuffmanTable = buildHuffmanTable(huffmanTree);

  if (decrypt) {
    let currentNode: HuffmanNode = huffmanTree;
    let decodedText = '';

    for (const bit of text) {
      currentNode = bit === '0' ? currentNode.left! : currentNode.right!;
      if (!currentNode.left && !currentNode.right) {
        decodedText += currentNode.char;
        currentNode = huffmanTree;
      }
    }

    return decodedText;
  } else {
    return text.split('').map(char => huffmanTable[char]).join('');
  }
};

const toBinary = (char: string) =>
  char.charCodeAt(0).toString(2).padStart(8, '0');

const fromBinary = (binary: string) => String.fromCharCode(parseInt(binary, 2));

const insertParityBits = (bits: string[]) => {
  const n = bits.length;
  const parityCount = Math.ceil(Math.log2(n + Math.ceil(Math.log2(n))));
  const totalBits = n + parityCount;
  const result: string[] = [];
  let bitIndex = 0;
  let parityIndex = 0;

  for (let i = 1; i <= totalBits; i++) {
    if (Math.pow(2, parityIndex) === i) {
      result.push('P');
      parityIndex++;
    } else {
      result.push(bits[bitIndex]);
      bitIndex++;
    }
  }

  return result.map((bit, index) => {
    if (bit === 'P') {
      const parity = result
        .map((b, i) => (b === '1' && (i + 1) & (index + 1) ? 1 : 0)) 
        .reduce<number>((a, b) => a ^ b, 0);
      return parity.toString();
    }
    return bit;
  });
};

const removeParityBits = (bits: string[]) => {
  const parityIndexes: number[] = [];
  let parityIndex = 0;

  for (let i = 1; i <= bits.length; i++) {
    if (Math.pow(2, parityIndex) === i) {
      parityIndexes.push(i - 1);
      parityIndex++;
    }
  }

  return bits.filter((_, index) => !parityIndexes.includes(index));;
};

export const hammingCipher = (text: string, decrypt: boolean = false) => {
  if (decrypt) {
    return text
      .split(' ')
      .map((encodedChar) => {
        const bits = encodedChar.split('');
        const dataBits = removeParityBits(bits);
        return fromBinary(dataBits.join(''));
      })
      .join('');
  } else {
    return text
      .split('')
      .map((char) => {
        const bits = toBinary(char).split('');
        const encodedBits = insertParityBits(bits);
        return encodedBits.join('');
      })
      .join(' ');
  }
};
