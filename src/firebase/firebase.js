import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDCjmbj91qhDL0ijN5bJp_KcOBJzfxKJcA",
  authDomain: "g-trash-d8132.firebaseapp.com",
  projectId: "g-trash-d8132",
  storageBucket: "g-trash-d8132.appspot.com",
  messagingSenderId: "112175223694",
  appId: "1:112175223694:web:9f8918bf6194f480dd0adf",
  measurementId: "G-2T3L9LY21W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export default app
