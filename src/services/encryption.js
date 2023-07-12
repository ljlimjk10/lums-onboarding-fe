

import { createHash, createDecipheriv } from 'crypto-browserify';
import { toByteArray } from 'base64-js';

export default class AESCipher {
    constructor(key) {
        this.bs = 16;
        this.key = createHash('sha256')
            .update(key)
            .digest();
    }

    decrypt(enc) {
        const encryptedBytes = toByteArray(enc);
        const iv = encryptedBytes.slice(0, this.bs);
        const cipher = createDecipheriv('aes-256-cbc', this.key, iv);
        const decryptedBytes = Buffer.concat([
            cipher.update(encryptedBytes.slice(this.bs)),
            cipher.final(),
        ]);
        return decryptedBytes;
    }

    _unpad(s) {
        return s.slice(0, s.length - s[s.length - 1]);
    }
}

// const encryptedString = 'tRoy4rFUdh00oh/9NnVLr1lpL6EUgApBQngQXPdHzqKz8wzUtu02T32l5zmBb0RVQ3dfpcy+ttOZlq8MLsuG1BySk6+OrT1+PuGIYJzjT9ForX+HT+QC66RBTxrkU+gW8U0Pg3jaCeq+eHdiAEWi2avqgytG/2hcSt1KII7iS7vgJxKB0TJLur5FF66kVfJF9Z0eV0zUFLb9IQqJwiV53aRMtphweCNurzkUqHgfU2otrTsKW1Fwj3I4pyukSrbSEvxeUU4YWmBGwYO+1ei7diS4AwshT5j6/iDf7KhPJw08rZ1+grjNJtTaAjuB/YkJCSHtPNHYI4dJThidM5bdZleXBzckkWf6RjZaMQXz442100stH3Kp1UiNB+0iGb+D7aINg9IelBBkjY5gNlKYgofRk5naNs3a0RoZT4CXD9DZKp7h+Blj8D5t0jnEQu80pzBdap8OQGmzxW2PKv3rPg==';

// const aesCipher = new AESCipher('lylo'); // Replace with your actual secret key
// const decryptedBytes = aesCipher.decrypt(encryptedString);
// console.log(decryptedBytes);


// The decryptedBytes will contain the image bytes
// You can save it to a file or use it as needed
