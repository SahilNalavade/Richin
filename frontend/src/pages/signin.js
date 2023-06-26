// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithEmailLink, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import React, { useState } from 'react';

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

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleEmailSignIn = () => {
//     signInWithEmailLink(auth, email, window.location.href)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log('Email authentication successful. User:', user);
//         // Redirect to next page or perform necessary actions
//       })
//       .catch((error) => {
//         console.error('Error signing in with email:', error);
//       });
//   };

//   const handleGoogleSignIn = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log('Google authentication successful. User:', user);
//         // Redirect to next page or perform necessary actions
//       })
//       .catch((error) => {
//         console.error('Error signing in with Google:', error);
//       });
//   };

//   return (
//     <div>
//       <h2>Email Sign In</h2>

//       <label htmlFor="email">Email:</label>
//       <input type="email" id="email" value={email} onChange={handleEmailChange} />

//       <button onClick={handleEmailSignIn}>Sign In with Email</button>

//       <h2>Google Sign In</h2>
//       <button onClick={handleGoogleSignIn}>Sign In with Google</button>
//     </div>
//   );
// };

// export default EmailAuth;
