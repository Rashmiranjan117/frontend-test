import { initializeApp } from "firebase/app";
import "firebase/compat/auth";

import { getAuth } from "firebase/auth";
const firebaseAppConfig = {
  apiKey: "AIzaSyDd7CxE1Xx_f7RrNPUMAu8qgzn2PxBRrfo",
  authDomain: "recipe-test-404d0.firebaseapp.com",
  projectId: "recipe-test-404d0",
  storageBucket: "recipe-test-404d0.appspot.com",
  messagingSenderId: "25132262687",
  appId: "1:25132262687:web:f2cce09ac1065fb6bbbc2a",
};

const app = initializeApp(firebaseAppConfig);
export const auth = getAuth(app);
export default app;
