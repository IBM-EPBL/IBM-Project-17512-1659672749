"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = void 0;
const decode = (password) => {
    return password
        .split('')
        .map((char) => String.fromCharCode(char.charCodeAt(0) - 2))
        .join('');
};
exports.decode = decode;
//# sourceMappingURL=decoding.utils.js.map