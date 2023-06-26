
// import { initializeApp } from 'firebase/app';
// import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { useRouter } from 'next/router';
// import React, { useState, useEffect } from 'react';

// const firebaseConfig = {
//   // Add your Firebase configuration here
//   // ...
//   apiKey: "AIzaSyA78EEUIhW4XAEeUEi56D6EXpTZlFTTV_I",
//   authDomain: "richin-otp-auth.firebaseapp.com",
//   projectId: "richin-otp-auth",
//   storageBucket: "richin-otp-auth.appspot.com",
//   messagingSenderId: "646394518131",
//   appId: "1:646394518131:web:bfd17bb9712e1f77d7a806"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const EmailAuth = () => {
//   const [email, setEmail] = useState('');
//   const [emailSent, setEmailSent] = useState(false);
//   const [verificationEmail, setVerificationEmail] = useState('');
//   const router = useRouter(); // Get the router object

//   useEffect(() => {
//     // Check if the user is already signed in
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         // User is signed in, redirect to /kyc
//         router.push('/kyc');
//       }
//     });

//     return () => {
//       // Unsubscribe from the auth state change listener
//       unsubscribe();
//     };
//   }, [auth, router]);

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleSendEmail = () => {
//     sendSignInLinkToEmail(auth, email, {
//       url: 'http://localhost:3000/verify', // Replace with your app's verification URL
//       handleCodeInApp: true,
//     })
//       .then(() => {
//         setEmailSent(true);
//         setVerificationEmail(email);
//         console.log('Email sent to:', email);
//       })
//       .catch((error) => {
//         console.error('Error sending email:', error);
//       });
//   };

//   const handleVerifyEmail = () => {
//     if (isSignInWithEmailLink(auth, window.location.href)) {
//       signInWithEmailLink(auth, verificationEmail, window.location.href)
//         .then((userCredential) => {
//           const user = userCredential.user;
//           console.log('Email authentication successful. User:', user);
//           // Redirect to /kyc
//           router.push('/kyc');
//         })
//         .catch((error) => {
//           console.error('Error verifying email:', error);
//         });
//     }
//   };

//   const handleGoogleSignup = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log('Google authentication successful. User:', user);
//         // Redirect to /kyc
//         router.push('/kyc');
//       })
//       .catch((error) => {
//         console.error('Error signing up with Google:', error);
//       });
//   };

//   return (
//     <div>
//       <h2>Email Authentication</h2>

//       {!emailSent ? (
//         <>
//           <label htmlFor="email">Email:</label>
//           <input type="email" id="email" value={email} onChange={handleEmailChange} />

//           <button onClick={handleSendEmail}>Send Email</button>
//         </>
//       ) : (
//         <>
//           <p>An email has been sent to {verificationEmail}. Click the link in the email to verify.</p>
//         </>
//       )}

//       <h2>Google Sign Up</h2>
//       <button onClick={handleGoogleSignup}>Sign Up with Google</button>
//     </div>
//   );
// };

// export default EmailAuth;
