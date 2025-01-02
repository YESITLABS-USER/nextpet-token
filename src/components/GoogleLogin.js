// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, OAuthProvider  } from "firebase/auth";
import { toast } from "react-toastify";
import BASE_URL from "../app/utils/constant";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

export const initializeAppleSignInScript = () => {
  const scriptId = "apple-auth-script";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
    script.onload = initializeAppleSignIn;
    document.body.appendChild(script);
  }
};

// Initialize Apple Sign-In
const initializeAppleSignIn = () => {
  if (window.AppleID) {
    window.AppleID.auth.init({
      clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
      scope: "email name",
      redirectURI: process.env.NEXT_PUBLIC_APPLE_REDIRECT_URL,
      usePopup: true,
    });
  }
};

export const handleAppleSignIn = async () => {
  try {
    const appleResponse = await window.AppleID.auth.signIn();
    const { authorization, user } = appleResponse;
    const fullName = user?.name ? `${user.name.firstName || ""} ${user.name.lastName || ""}`.trim() : "";
    
    const payload = {
      social_id: authorization.id_token,
      name: fullName,
      email: user?.email || "",
    };

    // Send payload to backend for authentication
    const response = await axios.post(`${BASE_URL}/api/user_social_login`, payload);

    if (response.status === 200) {
      login({ UniqueKey: response.data.data.token, type: "user-type" });
      localStorage.setItem("user_user_id", response.data.data.user_id);
    } else {
      toast.error("Login successful, but an error occurred on the server.");
      console.error("Backend Response Error:", response.data);
    }
  } catch (error) {
    console.error("Apple Sign-In Error:", error);
    toast.error("Failed to login with Apple.");
  }
};

export { auth, provider, appleProvider, signInWithPopup, OAuthProvider };
