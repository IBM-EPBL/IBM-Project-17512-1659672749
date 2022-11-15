import admin from 'firebase-admin';
import './credentials.json';
admin.initializeApp({
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // credential: admin.credential.cert(credentials),
  credential: admin.credential.cert(require('./credentials.json')),
});

export const sendNotification = (
  tokens: string[],
  link: string,
  message: string,
) => {
  admin
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
