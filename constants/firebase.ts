import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBfbqTVkzgSAELjhpw_GpoqyGpNHO2Tjis',
  authDomain: 'diss-a9696.firebaseapp.com',
  projectId: 'diss-a9696',
  storageBucket: 'diss-a9696.firebasestorage.app',
  messagingSenderId: '402145722240',
  appId: '1:402145722240:web:2223d3a622ad29b4640b65',
  measurementId: 'G-EGPC7MZ4WR',
};

export const app = initializeApp(firebaseConfig);

if (Platform.OS === 'web') {
  isSupported()
    .then((supported) => {
      if (supported) {
        getAnalytics(app);
      }
    })
    .catch(() => {
      // Analytics is optional; ignore failures in unsupported environments.
    });
}

export const db = getFirestore(app);
