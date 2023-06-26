// // import {
// // 	Button,
// // 	Input,
// // 	FormControl,
// // 	FormLabel,
// // 	useToast,
// // 	FormErrorMessage,
// // 	Stack,
// // 	Divider,
// // 	Center,
// // 	Text,
// // 	Container,
// // 	Box,
// // 	Link,
// // } from '@chakra-ui/react';
// // import { ChakraProvider} from '@chakra-ui/react';
// // import React, { useState } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
// // // import GoogleIcon from '../components/GoogleIcon';
// // import NextLink from 'next/link';
// // import Head from 'next/head';

// // export default function Register() {
// // 	const [loading, setLoading] = useState(false);
// // 	const { signUpWithEmailAndPassword, signInWithGoogle, authenticated } = useFirebaseAuth();

// // 	const toast = useToast();

// // 	const {
// // 		register,
// // 		handleSubmit,
// // 		formState: { errors },
// // 	} = useForm();

// // 	const registeruser = ({ email, pass }) => {
// // 		setLoading(true);
// // 		signUpWithEmailAndPassword(email, pass).catch((error) => {
// // 			setLoading(false);
// // 			toast({
// // 				title: 'An error occurred.',
// // 				description: error.message,
// // 				status: 'error',
// // 				duration: 5000,
// // 				isClosable: true,
// // 			});
// // 		});
// // 	};

// // 	return (
// // 		<>
// //         <ChakraProvider>
// // 			{/* <script
// // 				dangerouslySetInnerHTML={{
// // 					__html: `
// //               if (document.cookie && document.cookie.includes('bob-auth')) {
// //                 window.location.href = "/home"
// //               }
// //             `,
// // 				}}
// // 			/> */}
// // 			{/* <Head>
// // 				<title>Signup | Bonding over Bindings</title>
// // 			</Head> */}
// // 			<Box mt={20}>
// // 				<Center>
// // 					<Text textAlign='center' fontSize='xl' fontWeight='300'>
// // 						Signup
// // 					</Text>
// // 				</Center>
// // 				<Center>
// // 					<Stack
// // 						as='form'
// // 						onSubmit={handleSubmit((data) => registeruser(data))}
// // 						errors={errors}
// // 						padding={8}>
// // 						<FormControl isInvalid={errors.email && errors.email.message}>
// // 							<FormLabel htmlFor='email'>Email</FormLabel>

// // 							<Input
// // 								w={['350px', '400px', '400px']}
// // 								autoFocus
// // 								placeholder='jake@gmail.com'
// // 								type='text'
// // 								{...register('email', {
// // 									required: 'Email is required',
// // 									pattern: {
// // 										value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
// // 										message: 'Invalid email address',
// // 									},
// // 								})}
// // 								bg='#ffffff'
// // 							/>
// // 							<FormErrorMessage>
// // 								{errors.email && errors.email.message}
// // 							</FormErrorMessage>
// // 						</FormControl>
// // 						<FormControl isInvalid={errors.pass && errors.pass.message}>
// // 							<FormLabel htmlFor='Password'>Password</FormLabel>
// // 							<Input
// // 								w={['350px', '400px', '400px']}
// // 								type='password'
// // 								{...register('pass', {
// // 									required: 'Password is required',
// // 									minLength: {
// // 										value: 8,
// // 										message: 'Minimum length is 8',
// // 									},
// // 								})}
// // 								bg='#ffffff'
// // 							/>
// // 							<FormErrorMessage>
// // 								{errors.pass && errors.pass.message}
// // 							</FormErrorMessage>
// // 						</FormControl>

// // 						<Center>
// // 							<Button
// // 								isLoading={loading}
// // 								type='submit'
// // 								w='60%'
// // 								mt={3}
// // 								m={2}
// // 								bg='#0EB500'
// // 								borderColor='green.300'
// // 								variant='outline'
// // 								textColor='#ffffff'
// // 								_hover={{ bg: '#13DA01' }}>
// // 								Sign Up
// // 							</Button>
// // 						</Center>
// // 						<Divider />
// // 						<Center>
// // 							<Button
// // 								fontSize={['sm', 'md', 'md']}
// // 								size='md'
// // 								onClick={() => signInWithGoogle()}
// // 								// leftIcon={<GoogleIcon />}
// // 								w='60%'
// // 								mt={2}
// // 								bg='#ffffff'
// // 								variant='outline'
// // 								borderColor='green.300'
// // 								_hover={{ bg: '#fafafa' }}>
// // 								Continue With Google
// // 							</Button>
// // 						</Center>
// // 						<Center>
// // 							<NextLink href='/login'>
// // 								<Link>
// // 									<Text as='u' fontSize='xs' opacity='80%'>
// // 										Already a member? Log In
// // 									</Text>
// // 								</Link>
// // 							</NextLink>
// // 						</Center>
// // 					</Stack>
// // 				</Center>
// // 			</Box>
// //             </ChakraProvider>
// // 		</>
// // 	);
// // }
// // Register.js
// // -----------------------------------------------------
// import {
//     Button,
//     Input,
//     FormControl,
//     FormLabel,
//     FormErrorMessage,
//     Stack,
//     Divider,
//     Center,
//     Text,
//     Container,
//     Box,
//     Link,
//     ChakraProvider,
//     extendTheme,
//     createBreakpoints,
//     useToast,
//   } from '@chakra-ui/react';

 

//   import React, { useState } from 'react';
//   import { useForm } from 'react-hook-form';
//   import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
//   import { initializeApp } from 'firebase/app';
//   import {
//     getAuth,
//     signInWithPhoneNumber,
//     RecaptchaVerifier,
//   } from 'firebase/auth';
  
//   // Initialize Firebase app
//   const firebaseConfig = {
//     // Your Firebase config
//     apiKey: "AIzaSyA78EEUIhW4XAEeUEi56D6EXpTZlFTTV_I",
//   authDomain: "richin-otp-auth.firebaseapp.com",
//   projectId: "richin-otp-auth",
//   storageBucket: "richin-otp-auth.appspot.com",
//   messagingSenderId: "646394518131",
//   appId: "1:646394518131:web:bfd17bb9712e1f77d7a806"
//   };
//   const app = initializeApp(firebaseConfig);
  
//   export default function Register() {
//     const [loading, setLoading] = useState(false);
//     const { signInWithGoogle, authenticated } = useFirebaseAuth();
  
//     const toast = useToast();
    
//     const {
//       register,handleSubmit,
//       formState: { errors },
//     } = useForm();
  
//     const handlePhoneAuth = async ({ phoneNumber }) => {
//       setLoading(true);
  
//       const auth = getAuth(app);
//       const verifier = new RecaptchaVerifier('recaptcha-container', {
//         size: 'invisible',
//         callback: (response) => {
//           // reCAPTCHA resolved, proceed with phone authentication
//           const phoneProvider = new signInWithPhoneNumber(auth);
//           phoneProvider
//             .verifyPhoneNumber(phoneNumber, verifier)
//             .then((verificationId) => {
//               setLoading(false);
//               // Store the verification ID in a state variable or context
//               // and navigate to the verification screen
//             })
//             .catch((error) => {
//               setLoading(false);
//               toast({
//                 title: 'An error occurred.',
//                 description: error.message,
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//               });
//             });
//         },
//       });
  
//       verifier.render().catch((error) => {
//         setLoading(false);
//         toast({
//           title: 'An error occurred.',
//           description: error.message,
//           status: 'error',
//           duration: 5000,
//           isClosable: true,
//         });
//       });
//     };
  
//     return (
//       <>
//         <ChakraProvider>
//           <Box mt={20}>
//             <Center>
//               <Text textAlign="center" fontSize="xl" fontWeight="300">
//                 Signup
//               </Text>
//             </Center>
//             <Center>
//               <Stack
//                 as="form"
//                 onSubmit={handleSubmit((data) => handlePhoneAuth(data))}
//                 errors={errors}
//                 padding={8}
//               >
//                 <FormControl isInvalid={errors.phoneNumber && errors.phoneNumber.message}>
//                   <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
//                   <Input
//                     w={['350px', '400px', '400px']}
//                     autoFocus
//                     placeholder="Enter your phone number"
//                     type="tel"
//                     {...register('phoneNumber', {
//                       required: 'Phone number is required',
//                       pattern: {
//                         value: /^\d{10}$/, // Example: 1234567890
//                         message: 'Invalid phone number',
//                       },
//                     })}
//                     bg="#ffffff"
//                   />
//                   <FormErrorMessage>
//                     {errors.phoneNumber && errors.phoneNumber.message}
//                   </FormErrorMessage>
//                 </FormControl>
  
//                 <Center>
//                   <Button
//                     isLoading={loading}
//                     type="submit"
//                     w="60%"
//                     mt={3}
//                     m={2}
//                     bg="#0EB500"
//                     borderColor="green.300"
//                     variant="outline"
//                     textColor="#ffffff"
//                     _hover={{ bg: '#13DA01' }}
//                   >
//                     Sign Up
//                   </Button>
//                 </Center>
//                 <Divider />
//                 <Center>
//                   <Button
//                     fontSize={['sm', 'md', 'md']}
//                     size="md"
//                     onClick={() => signInWithGoogle()}
//                     w="60%"
//                     mt={2}
//                     bg="#ffffff"
//                     variant="outline"
//                     borderColor="green.300"
//                     _hover={{ bg: '#fafafa' }}
//                   >
//                     Continue With Google
//                   </Button>
//                 </Center>
//                 <Center>
//                   <Link href="/login">
//                     <Link>
//                       <Text as="u" fontSize="xs" opacity="80%">
//                         Already a member? Log In
//                       </Text>
//                     </Link>
//                   </Link>
//                 </Center>
//               </Stack>
//             </Center>
//           </Box>
//         </ChakraProvider>
//       </>
//     );
//   }
  
// // import React, { useState, useEffect } from 'react';
// // import { initializeApp } from 'firebase/app';
// // import { getAuth, signInWithPopup, GoogleAuthProvider, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
// // import { getFirestore, doc, setDoc } from 'firebase/firestore';
// // import { ChakraProvider, Box, Button, Input, Text } from '@chakra-ui/react';

// // import { FaGoogle } from 'react-icons/fa';

// // // Firebase configuration
// // const firebaseConfig = {
// //   // Add your Firebase config here
// //   apiKey: "AIzaSyA78EEUIhW4XAEeUEi56D6EXpTZlFTTV_I",
// //   authDomain: "richin-otp-auth.firebaseapp.com",
// //   projectId: "richin-otp-auth",
// //   storageBucket: "richin-otp-auth.appspot.com",
// //   messagingSenderId: "646394518131",
// //   appId: "1:646394518131:web:bfd17bb9712e1f77d7a806"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);
// // const db = getFirestore(app);

// // const Signup = () => {
// //   const [phoneNumber, setPhoneNumber] = useState('');
// //   const [verificationCode, setVerificationCode] = useState('');
// //   const [verificationId, setVerificationId] = useState('');
// //   const [message, setMessage] = useState('');

// //   useEffect(() => {
// //     const unsubscribe = auth.onAuthStateChanged((user) => {
// //       if (user) {
// //         // User is signed in
// //         createUserDocument(user);
// //       }
// //     });

// //     // Cleanup the listener
// //     return () => {
// //       unsubscribe();
// //     };
// //   }, []);

// //   const createUserDocument = async (user) => {
// //     const userDocRef = doc(db, 'users', user.uid);
// //     const userData = {
// //       phoneNumber: user.phoneNumber,
// //       // Add any additional user data you want to store
// //     };

// //     try {
// //       await setDoc(userDocRef, userData);
// //       console.log('User document created successfully');
// //     } catch (error) {
// //       console.error('Error creating user document:', error);
// //     }
// //   };

// //   const handlePhoneNumberChange = (e) => {
// //     setPhoneNumber(e.target.value);
// //   };

// //   const handleVerificationCodeChange = (e) => {
// //     setVerificationCode(e.target.value);
// //   };

// //   const handleSendCode = () => {
// //     const phoneProvider = new PhoneAuthProvider(auth);
// //     phoneProvider
// //       .verifyPhoneNumber(phoneNumber, {
// //         // Provide the reCAPTCHA container element or null
// //         // if you don't want to use reCAPTCHA
// //         recaptchaContainer: 'recaptcha-container',
// //         // Optional parameters
// //         // ...
// //       })
// //       .then((verificationId) => {
// //         setVerificationId(verificationId);
// //         setMessage('Verification code has been sent to your phone.');
// //       })
// //       .catch((error) => {
// //         setMessage(`Error: ${error.message}`);
// //         console.error(error);
// //       });
// //   };

// //   const handleVerifyCode = () => {
// //     const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
// //     signInWithCredential(auth, credential)
// //       .then((userCredential) => {
// //         // User signed in successfully
// //         const user = userCredential.user;
// //         console.log('Successfully signed in with phone number', user.phoneNumber);
// //         setMessage('Successfully signed in with phone number');
// //       })
// //       .catch((error) => {
// //         setMessage(`Error: ${error.message}`);
// //         console.error(error);
// //       });
// //   };

// //   const handleGoogleSignIn = () => {
// //     const provider = new GoogleAuthProvider();
// //     signInWithPopup(auth, provider)
// //       .then((result) => {
// //         // User signed in successfully
// //         const user = result.user;
// //         console.log('Successfully signed in with Google', user);
// //         setMessage('Successfully signed in with Google');
// //       })
// //       .catch((error) => {
// //         setMessage(`Error: ${error.message}`);
// //         console.error(error);
// //       });
// //   };

// //   return (
// //     <ChakraProvider>
// //       <Box maxW="sm" m="auto" p="4">
// //         <Text as="h1" fontSize="2xl" mb="4">Phone Authentication</Text>
// //         <Text>Enter your phone number:</Text>
// //         <Input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} mb="2" />
// //         <Button onClick={handleSendCode} mb="4">Send Verification Code</Button>
// //         <Text>Enter the verification code:</Text>
// //         <Input type="text" value={verificationCode} onChange={handleVerificationCodeChange} mb="2" />
// //         <Button onClick={handleVerifyCode} mb="4">Verify Code</Button>
// //         <Text>{message}</Text>
// //         <Box id="recaptcha-container" mb="4"></Box>
// //         <Button onClick={handleGoogleSignIn} leftIcon={<FaGoogle />} colorScheme="red">Sign in with Google</Button>
// //       </Box>
// //     </ChakraProvider>
// //   );
// // }
// // export default Signup;