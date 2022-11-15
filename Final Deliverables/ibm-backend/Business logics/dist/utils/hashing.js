"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const decoding_utils_1 = require("./decoding.utils");
const hashPassword = (password) => {
    const saltRounds = 12;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};
exports.hashPassword = hashPassword;
const verifyPassword = async (email, password, model) => {
    const data = await model.findOne({ email: email }).exec();
    if (data != null) {
        const isMatch = await bcrypt.compare((0, decoding_utils_1.decode)(password), data.password);
        return isMatch;
    }
    else {
        throw new common_1.NotFoundException();
    }
};
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=hashing.js.map