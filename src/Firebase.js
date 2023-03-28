import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAO54swHS2qJCutTdFLYKWBN1Q9fFZQNDM",
  authDomain: "eliza-2fead.firebaseapp.com",
  databaseURL: "https://eliza-2fead-default-rtdb.firebaseio.com",
  projectId: "eliza-2fead",
  storageBucket: "eliza-2fead.appspot.com",
  messagingSenderId: "955052785028",
  appId: "1:955052785028:web:cd02849c19f5b50fab31d1",
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://eliza-2fead-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export default app