import { message, notification } from 'antd';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyAtzGIOpOP8wL1UeRbiK071GrCawOilll0',
  authDomain: 'shi-notifications.firebaseapp.com',
  projectId: 'shi-notifications',
  storageBucket: 'shi-notifications.appspot.com',
  messagingSenderId: '340820491331',
  appId: '1:340820491331:web:02fb97041f6b293a5aa8f6',
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

const VAPIDKEY =
  'BDJ10zG4DRlOr0dnxbPkb1MklKtDFQdtjNEs-3lf8x2h_QqSbOk-efmQOv8DMfob5BuQjcf_VMLqC25d-HSscu8';

export const getFBToken = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: VAPIDKEY });
    return token;
  } catch (err) {
    message.error('Please Allow push notifications service');
    return '';
  }
};

onMessage(messaging, (payload: any) => {
  notification.info({
    message: payload.notification.title,
    description: payload.notification.body,
    placement: 'bottomRight',
  });
});
