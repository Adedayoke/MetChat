import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; 

// const firebaseConfig = {
//   apiKey: "AIzaSyCx3MD58Hkt6I9KxsHWZJGi3LB4QjHsNQw",
//   authDomain: "chat-1e59b.firebaseapp.com",
//   projectId: "chat-1e59b",
//   storageBucket: "chat-1e59b.appspot.com",
//   messagingSenderId: "773227386456",
//   appId: "1:773227386456:web:1f49d6c19045a117519c2d"
// };

const firebaseConfig = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: "chatfrust.firebaseapp.com",
  projectId: "chatfrust",
  storageBucket: "chatfrust.appspot.com",
  messagingSenderId: "548006554756",
  appId: "1:548006554756:web:f18e1eec85e9d2f43ce6d1"
};


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAX9AInGYroWLfMBLzlCU7ITkKmKD5F4W8",
//   authDomain: "chatappdemo-77d55.firebaseapp.com",
//   projectId: "chatappdemo-77d55",
//   storageBucket: "chatappdemo-77d55.appspot.com",
//   messagingSenderId: "218021199395",
//   appId: "1:218021199395:web:addb3d23e6f240058e7b96"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore();