

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBkS984bg5_7vJQ9CeNFfWOx1M4WTs98vo",
  authDomain: "bakery-176ca.firebaseapp.com",
  projectId: "bakery-176ca",
  storageBucket: "bakery-176ca.appspot.com",
  messagingSenderId: "1034287121422",
  appId: "1:1034287121422:web:72cedea8dc07adecdbe85f",
  measurementId: "G-M68PX9VXZW"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, storage, auth };
