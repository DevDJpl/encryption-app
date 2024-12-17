import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  caesarCipher,
  transpositionCipher,
  base64Cipher,
  beaufortCipher,
  vigenereCipher,
  polibiusCipher,
  aesCipher,
  desCipher,
  processFileStream,
  processTextStream,
  rsaCipher,
  diffieHellmanCipher,
  extractPemKey,
  hmacCipher,
  huffmanCipher,
  hammingCipher,
} from './encryptionAlgorithms';

const algorithms = [
  'caesar',
  'transposition',
  'base64',
  'beauforta',
  'vigenere',
  'polibius',
  'aes',
  'des',
  'rsa',
  'diffie-hellman',
  'hmac',
  'huffman',
  'hamming'
];

const Page = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const algorithm = searchParams.get('algorithm');
  const [inputText, setInputText] = useState<string>('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  const [resultText, setResultText] = useState<string>('');
  const [isDecryption, setIsDecryption] = useState<boolean>(false);
  const [key, setKey] = useState<string>('');

  useEffect(() => {
    if (!algorithm || !algorithms.includes(algorithm)) {
      navigate('/');
    }
  }, [algorithm, navigate]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      if (['aes', 'des'].includes(algorithm!)) {
        reader.onload = async (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const binaryString = Array.from(new Uint8Array(arrayBuffer))
            .map((byte) => String.fromCharCode(byte))
            .join('');
          const base64Data = btoa(binaryString);
          await processFileStream(base64Data, key, isDecryption, algorithm!);
        };
        reader.readAsArrayBuffer(file);
      } else {
        reader.onload = async (e) => {
          const text = e.target?.result as string;
          await processTextStream(text, key, isDecryption, algorithm!);
        };
        reader.readAsText(file);
      }
    }
  };

  const handleEncryptOrDecrypt = () => {
    let resultText = '';
    switch (algorithm) {
      case 'caesar':
        resultText = caesarCipher(inputText, 3, isDecryption);
        break;
      case 'transposition':
        resultText = transpositionCipher(inputText, isDecryption);
        break;
      case 'base64':
        resultText = base64Cipher(inputText, isDecryption);
        break;
      case 'beauforta':
        resultText = beaufortCipher(inputText, key || '', isDecryption);
        break;
      case 'vigenere':
        resultText = vigenereCipher(inputText, key || '', isDecryption);
        break;
      case 'polibius':
        resultText = polibiusCipher(inputText, isDecryption);
        break;
      case 'aes':
        resultText = aesCipher(inputText, key || '', isDecryption);
        break;
      case 'des':
        resultText = desCipher(inputText, key || '', isDecryption);
        break;
      case 'rsa':
        const rsaResult = rsaCipher(inputText, key || '', isDecryption);
        if (typeof rsaResult === 'object' && 'encryptedText' in rsaResult) {
          const rsaKeys = rsaResult.rsaKeys;
          setKey(extractPemKey(rsaKeys.privateKey));
          resultText = rsaResult.encryptedText;
        } else {
          setKey('');
          resultText = rsaResult;
        }
        break;
      case 'diffie-hellman':
        let diffieHellmanResult = diffieHellmanCipher(
          inputText,
          key || '',
          isDecryption,
        );
        if (typeof diffieHellmanResult === 'object' && 'encryptedText' in diffieHellmanResult) {
          setKey(`${diffieHellmanResult.aliceSecret}`);
          console.log(`Alice's Secret: `, diffieHellmanResult.aliceSecret);
          console.log(`Bob's Secret: `, diffieHellmanResult.bobSecret);
          console.log('RSA Keys: ', diffieHellmanResult.rsaKeys);
          resultText = diffieHellmanResult.encryptedText;
        } else {
          setKey('');
          resultText = diffieHellmanResult;
        }
        break;
      case 'hmac':
        resultText = hmacCipher(inputText, key || Math.random().toString(36).substring(2, 15), isDecryption);
        break;
      case 'huffman':
        resultText = huffmanCipher(inputText, isDecryption);
        break;
      case 'hamming':
        resultText = hammingCipher(inputText, isDecryption);
        break;
      default:
        resultText = inputText;
    }
    setResultText(resultText);
    setInputText(resultText);
  };

  const toggleDecryptionMode = () => {
    setIsDecryption(!isDecryption);
    setResultText('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-[#1e2d4b] p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {algorithm!.charAt(0).toUpperCase() + algorithm!.slice(1)} Cipher
        </h1>
        <textarea
          className="w-full p-3 bg-[#1c2537] border border-none rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#2196f3]"
          rows={5}
          placeholder="Enter text to encrypt..."
          value={inputText}
          onChange={(e) => {
            const newValue = e.target.value;
            setInputText(newValue);
            if (newValue === '') {
              setInputText('');
            } else if (['aes', 'des'].includes(algorithm!)) {
              handleEncryptOrDecrypt();
            }
          }}
        />
        {!['diffie-hellman', 'huffman', 'hamming'].includes(algorithm!) && (
          <input
            type="file"
            accept={['aes', 'des', 'rsa'].includes(algorithm!) ? '*' : '.txt'}
            className="w-full p-3 bg-[#1c2537] border border-none rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#2196f3] file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:bg-[#2196f3] file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleFileUpload}
          />
        )}
        {(['beaufort', 'vigenere', 'aes', 'des'].includes(algorithm!) || (['rsa', 'diffie-hellman'].includes(algorithm!) && isDecryption)) && (
          <input
            type="text"
            className="w-full p-3 bg-[#1c2537] border border-none rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#2196f3]"
            placeholder="Enter key..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        )}
        <button
          className="w-full bg-[#2196f3] text-white p-3 rounded-lg hover:bg-[#2196f3]/80 transition-colors"
          onClick={handleEncryptOrDecrypt}
        >
          {isDecryption ? 'Decrypt' : 'Encrypt'}
        </button>
        <button
          className="w-full bg-[#f3a621] text-white p-3 rounded-lg hover:bg-[#f3a621]/80 transition-colors mt-4"
          onClick={() => toggleDecryptionMode()}
        >
          {isDecryption ? 'Switch to Encryption' : 'Switch to Decryption'}
        </button>
        {resultText && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
            <h2 className="text-lg font-semibold">
              {isDecryption ? 'Decrypted' : 'Encrypted'} Text:
            </h2>
            <p className="mt-2 break-words">{resultText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
