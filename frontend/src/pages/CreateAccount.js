import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';

// Initialize Firebase app
const firebaseConfig = {
  // Your Firebase configuration here
  apiKey: "AIzaSyA78EEUIhW4XAEeUEi56D6EXpTZlFTTV_I",
  authDomain: "richin-otp-auth.firebaseapp.com",
  projectId: "richin-otp-auth",
  storageBucket: "richin-otp-auth.appspot.com",
  messagingSenderId: "646394518131",
  appId: "1:646394518131:web:bfd17bb9712e1f77d7a806"
};

initializeApp(firebaseConfig);

const CreateAccount = () => {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const router = useRouter();

  const handleEmailFocus = () => {
    setEmailFocused(true);
    setPasswordFocused(false);
  };

  const handlePasswordFocus = () => {
    setEmailFocused(false);
    setPasswordFocused(true);
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      // Handle successful Google sign-in here
      console.log(result.user);
      router.push('/'); // Redirect to dashboard after successful sign-in
    } catch (error) {
      // Handle error during Google sign-in
      console.error(error);
    }
  };

  return (
    <div
    style={{
      backgroundImage: "url('/signupbg.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      // Center the content horizontally
      justifyContent: 'flex-start', // Align the content slightly to the left
      paddingTop: '200px', // Add some top padding for spacing
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column',marginLeft:'90px' }}>
      <h1 style={{ 
        color: '#000',
        marginTop: '-80px',
        fontSize: '40px',
        backgroundImage: 'linear-gradient(to right, #00B712, #5AFF15)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        width: 'fit-content',
        padding: '10px'
      }}>
          Take a step closer to get richer. Signup Now
        </h1>
        <input
          type="email"
          placeholder="Email"
          style={{
            width: '700px',
            padding: '10px',
            marginLeft:'150px',
            marginBottom:'40px',
            marginTop:'60px',
            margin: '10px',
            backgroundColor: '#fff',
            borderStyle: 'none',
            borderBottom: emailFocused ? '2px solid #5AFF15' : '2px solid #ccc',
            outline: 'none'
          }}
          onFocus={handleEmailFocus}
        />
        <input
          type="password"
          placeholder="Password"
          style={{
            width: '700px',
            marginLeft:'150px',
            padding: '10px',
            margin: '10px',
            backgroundColor: '#fff',
            borderStyle: 'none',
            borderBottom: passwordFocused ? '2px solid #5AFF15' : '2px solid #ccc',
            outline: 'none'
          }}
          onFocus={handlePasswordFocus}
        />
        <button
          style={{
            width: '200px',
            padding: '10px',
            marginLeft:'400px',
            backgroundColor: '#000',
            borderStyle: 'none',
            borderRadius: '4px',
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '50px',
            marginLeft:'290px',
            borderRadius:'20px',
          }}
        >
          Signup
        </button>
        

<p style={{ color: '#000', marginLeft: '380px', paddingTop: '20px' }}>Or</p>



        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20px'
          }}
        >
          <button
            style={{
              width: '300px',
              padding: '10px',
              marginLeft:'-500px',
              backgroundColor: '#000',
              borderStyle: 'none',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              borderRadius:'20px',
            }}
            onClick={handleGoogleSignIn}
          >
            <img
              src="/google.png"
              alt="Google Logo"
              style={{ width: '20px', height: '20px', marginRight: '10px' }}
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
