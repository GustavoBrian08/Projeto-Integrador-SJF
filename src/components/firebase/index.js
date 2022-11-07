import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDGjMYsflrtcP-cCeLIXZqj8Cx4pzjZXwk",
  authDomain: "sjf-projeto-integrador.firebaseapp.com",
  projectId: "sjf-projeto-integrador",
  storageBucket: "gs://sjf-projeto-integrador.appspot.com",
  messagingSenderId: "749102603423",
  appId: "1:749102603423:web:22df4f45ef1e9b594d96aa",
  measurementId: "G-J9V7162PRX"
};

const app = initializeApp(firebaseConfig);

export default app;