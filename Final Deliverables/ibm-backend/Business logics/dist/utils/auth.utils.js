"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.verifyRequest = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const verifyRequest = async (request, model) => {
    const auth = request.headers['authorization'];
    if (auth) {
        if (auth === 'Bearer null') {
        }
        else {
            const token = auth.split(' ')[1];
            try {
                const decoded = jwt.verify(token, 'ajhasdhfjdafglkasfbsdjfd');
                const user = await model.findOne({ email: decoded.email }).exec();
                if (user != null) {
                    return true;
                }
                else
                    throw new common_1.NotFoundException();
            }
            catch (err) {
                throw new common_1.UnauthorizedException();
            }
        }
    }
    else {
        throw new common_1.UnauthorizedException();
    }
};
exports.verifyRequest = verifyRequest;
const generateToken = (email) => {
    return jwt.sign({ email: email }, 'ajhasdhfjdafglkasfbsdjfd', {
        expiresIn: '3d',
    });
};
exports.generateToken = generateToken;
//# sourceMappingURL=auth.utils.js.map