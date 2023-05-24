import {getApp , getApps ,initializeApp} from 'firebase/app'
import {getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB32DXETVEZR306BLgMd7leB0ZGyqeoCxQ",
    authDomain: "chat-app-c9fb2.firebaseapp.com",
    databaseURL: "https://chat-app-c9fb2-default-rtdb.firebaseio.com",
    projectId: "chat-app-c9fb2",
    storageBucket: "chat-app-c9fb2.appspot.com",
    messagingSenderId: "918262879350",
    appId: "1:918262879350:web:ed864b9388794f0b2cfb57",
    measurementId: "G-6LKPJ7FRM2"
  };

const app = getApps.length > 0 ? getApp():initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export {app , firestore , storage };