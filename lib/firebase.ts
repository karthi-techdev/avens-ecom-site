
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxixykONFqcC7OK0RKulnYWUxbBSi_1pg",
  authDomain: "avens-ecom.firebaseapp.com",
  projectId: "avens-ecom",
  storageBucket: "avens-ecom.firebasestorage.app",
  messagingSenderId: "611595391125",
  appId: "1:611595391125:web:559aa0a1ea0dedf4814b9c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

