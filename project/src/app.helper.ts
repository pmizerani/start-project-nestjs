import {Injectable} from '@nestjs/common';
const crypto = require('crypto');

const ALGORITHM = 'aes-256-ctr';
const HASH = '8fa928fde297972cc1a36921d5c79249'; //TODO trocar hash
const IV = '5dddf49c07cec0fe'; //TODO trocar hash

@Injectable()
export class Helper {

    /**
     * encrypt
     * @param text
     * @returns {Buffer | string}
     */
    encrypt(text) {
        const cipher = crypto.createCipheriv(ALGORITHM, HASH, IV);
        let crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }//end encrypt

    /**
     * decrypt
     * @param text
     * @returns {Buffer | string}
     */
    decrypt(text) {
        const decipher = crypto.createDecipheriv(ALGORITHM, HASH, IV);
        let dec = decipher.update(text,'hex','utf8');
        dec += decipher.final('utf8');
        return dec;
    }//end decrypt

    /**
     * randomString
     * @returns {string}
     */
    randomString() {

        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;

    }//end randomString

    /**
     * randomStringWithSize
     * @param size
     * @returns {string}
     */
    randomStringWithSize(size) {

        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < size; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;

    }//end randomStringWithSize

}