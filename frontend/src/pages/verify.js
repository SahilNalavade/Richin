import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // Add your Firebase configuration here
  // ...
  apiKey: "AIzaSyA78EEUIhW4XAEeUEi56D6EXpTZlFTTV_I",
  authDomain: "richin-otp-auth.firebaseapp.com",
  projectId: "richin-otp-auth",
  storageBucket: "richin-otp-auth.appspot.com",
  messagingSenderId: "646394518131",
  appId: "1:646394518131:web:bfd17bb9712e1f77d7a806"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const VerifyPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { oobCode } = router.query; // Get the oobCode from the URL query parameters

    if (oobCode && isSignInWithEmailLink(auth, window.location.href)) {
      signInWithEmailLink(auth, '', window.location.href)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Email authentication successful. User:', user);
          // Redirect to /kyc or any other desired page
          router.push('/kyc');
        })
        .catch((error) => {
          console.error('Error verifying email:', error);
          // Redirect to an error page or display an error message
          router.push('/error');
        });
    } else {
      // Redirect to an error page or display an error message
      router.push('/error');
    }
  }, [auth, router]);

  return null; // Render nothing on the page
};

export default VerifyPage;
