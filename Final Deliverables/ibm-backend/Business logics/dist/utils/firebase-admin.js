"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const firebase_admin_1 = require("firebase-admin");
require("./credentials.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(require('./credentials.json')),
});
const sendNotification = (tokens, link, message) => {
    firebase_admin_1.default
        .messaging()
        .sendMulticast({
        tokens: tokens,
        notification: {
            title: 'New Job Recommended for you',
        },
        webpush: {
            headers: {
                Urgency: 'high',
            },
            notification: {
                body: message,
                requireInteraction: true,
                data: {
                    link: link,
                },
            },
        },
    })
        .then((value) => {
        console.log(value);
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.sendNotification = sendNotification;
//# sourceMappingURL=firebase-admin.js.map