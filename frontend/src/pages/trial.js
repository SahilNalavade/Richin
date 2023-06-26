// import React from 'react';
// import Loginform from '../components/Loginform';
// import { Box, Center, Link, Text } from '@chakra-ui/react';
// import NextLink from 'next/link';
// import Head from 'next/head';

// export default function Login() {
//   return (
//     <>
//       <Head>
//         <title>Login | Bonding over Bindings</title>
//       </Head>
//       <Box mt={20}>
//         <Center>
//           <Text textAlign='center' fontSize='2xl' fontWeight='300'>
//             Login to continue
//           </Text>
//         </Center>
//         <br />
//         <br />
//         <Center>
//           <Loginform />
//         </Center>
//         <Center>
//           <NextLink href='/signup'>
//             <Link m={2}>
//               <Text as='mark' fontSize='md' opacity='80%'>
//                 New Here? Click here to Register
//               </Text>
//             </Link>
//           </NextLink>
//         </Center>
//       </Box>
//     </>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithPopup, GoogleAuthProvider, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
// import { getFirestore, doc, setDoc } from 'firebase/firestore';
// import { ChakraProvider, Box, Button, Input, Text } from '@chakra-ui/react';

// import { FaGoogle } from 'react-icons/fa';

// // Firebase configuration
// const firebaseConfig = {
//   // Add your Firebase config here
//   apiKey: "AIzaSyA78EEUIhW4XAEeUEi56D6EXpTZlFTTV_I",
//   authDomain: "richin-otp-auth.firebaseapp.com",
//   projectId: "richin-otp-auth",
//   storageBucket: "richin-otp-auth.appspot.com",
//   messagingSenderId: "646394518131",
//   appId: "1:646394518131:web:bfd17bb9712e1f77d7a806"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// const Signup = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');
//   const [verificationId, setVerificationId] = useState('');
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         // User is signed in
//         createUserDocument(user);
//       }
//     });

//     // Cleanup the listener
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const createUserDocument = async (user) => {
//     const userDocRef = doc(db, 'users', user.uid);
//     const userData = {
//       phoneNumber: user.phoneNumber,
//       // Add any additional user data you want to store
//     };

//     try {
//       await setDoc(userDocRef, userData);
//       console.log('User document created successfully');
//     } catch (error) {
//       console.error('Error creating user document:', error);
//     }
//   };

//   const handlePhoneNumberChange = (e) => {
//     setPhoneNumber(e.target.value);
//   };

//   const handleVerificationCodeChange = (e) => {
//     setVerificationCode(e.target.value);
//   };

//   const handleSendCode = () => {
//     const phoneProvider = new PhoneAuthProvider(auth);
//     phoneProvider
//       .verifyPhoneNumber(phoneNumber, {
//         // Provide the reCAPTCHA container element or null
//         // if you don't want to use reCAPTCHA
//         recaptchaContainer: 'recaptcha-container',
//         // Optional parameters
//         // ...
//       })
//       .then((verificationId) => {
//         setVerificationId(verificationId);
//         setMessage('Verification code has been sent to your phone.');
//       })
//       .catch((error) => {
//         setMessage(`Error: ${error.message}`);
//         console.error(error);
//       });
//   };

//   const handleVerifyCode = () => {
//     const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
//     signInWithCredential(auth, credential)
//       .then((userCredential) => {
//         // User signed in successfully
//         const user = userCredential.user;
//         console.log('Successfully signed in with phone number', user.phoneNumber);
//         setMessage('Successfully signed in with phone number');
//       })
//       .catch((error) => {
//         setMessage(`Error: ${error.message}`);
//         console.error(error);
//       });
//   };

//   const handleGoogleSignIn = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         // User signed in successfully
//         const user = result.user;
//         console.log('Successfully signed in with Google', user);
//         setMessage('Successfully signed in with Google');
//       })
//       .catch((error) => {
//         setMessage(`Error: ${error.message}`);
//         console.error(error);
//       });
//   };

//   return (
//     <ChakraProvider>
//       <Box maxW="sm" m="auto" p="4">
//         <Text as="h1" fontSize="2xl" mb="4">Phone Authentication</Text>
//         <Text>Enter your phone number:</Text>
//         <Input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} mb="2" />
//         <Button onClick={handleSendCode} mb="4">Send Verification Code</Button>
//         <Text>Enter the verification code:</Text>
//         <Input type="text" value={verificationCode} onChange={handleVerificationCodeChange} mb="2" />
//         <Button onClick={handleVerifyCode} mb="4">Verify Code</Button>
//         <Text>{message}</Text>
//         <Box id="recaptcha-container" mb="4"></Box>
//         <Button onClick={handleGoogleSignIn} leftIcon={<FaGoogle />} colorScheme="red">Sign in with Google</Button>
//       </Box>
//     </ChakraProvider>
//   );
// }
// export default Signup;