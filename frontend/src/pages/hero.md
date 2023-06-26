import Head from "next/head";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  ChakraProvider,
  CSSReset,
  Link
} from "@chakra-ui/react";

import { mode } from '@chakra-ui/theme-tools';
import {  ColorModeProvider, extendTheme } from '@chakra-ui/react';
import { keyframes } from "@emotion/react";
import { Link as ScrollLink, Element, animateScroll as scroll } from 'react-scroll';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      500: '#3182CE', // Customize your brand color
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('#121212', 'gray.900')(props), // Customize the background color for light and dark mode
        color: "white",
      },
    }),
  },
});
const glowAnimation = keyframes`
  0% { text-shadow: 0 0 5px #ffc757; }
  50% { text-shadow: 0 0 20px #ffc757; }
  100% { text-shadow: 0 0 5px #ffc757; }
`;

// Component with glowing animation for the word "money"
const GlowingMoney = () => (
  <Box display="inline-block" po        tion="relative">
    <Box
      as="span"
      position="relative"
      zIndex="1"
      animation={`${glowAnimation} 2s linear infinite`}
      color="#ffc757"
    >
      Money
    </Box>
  </Box>
);
export default function CallToActionWithAnnotation() {
  return (
    <>
      <ChakraProvider theme={theme}>
      <ColorModeProvider options={{ useSystemColorMode: true }}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <Container maxW={"3xl"}>
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}
          >
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
  <Heading
    fontWeight={600}
    fontSize={{ base: "100px", sm: "120px", md: "140px" }}
    lineHeight={"110%"}
    whiteSpace="nowrap"
  >
    Make <GlowingMoney /> From
  </Heading>
  <Text
    as={Heading}
    fontWeight={600}
    fontSize={{ base: "100px", sm: "120px", md: "140px" }}
    lineHeight={"110%"}
    color={"green.400"}
    whiteSpace="nowrap"
  >
    Our Wits
  </Text>
</Box>

            {/* <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Heading
  fontWeight={600}
  fontSize={{ base: "100px", sm: "120px", md: "140px" }}
  lineHeight={"110%"}
  whiteSpace="nowrap"
  color={"white"}
>
  Make <Text color="yellow.500">money</Text> from
</Heading>

              <Text
                as={Heading}
                fontWeight={600}
                fontSize={{ base: "100px", sm: "120px", md: "140px" }}
                lineHeight={"110%"}
                color={"green.400"}
                whiteSpace="nowrap"
              >
                your audience
              </Text>
            </Box> */}

            <Text color={useColorModeValue("gray.500", "white")}>
              Monetize your content by charging your most loyal readers and reward
              them loyalty points. Give back to your loyal readers by granting
              them access to your pre-releases and sneak-peaks.
            </Text>
            <Stack
              direction={"column"}
              spacing={3}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
            >
              <ScrollLink
              activeClass="active"
              to="section1"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              as={Link}
              color="blue.500"
              mr={4}
            >
              <Button
                colorScheme={"green"}
                bg={"green.400"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "green.500",
                }}
              >
                Get Started
              </Button>
              </ScrollLink>
              <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
                Learn more
              </Button>
            
              <Box>
                <Icon
                  as={Arrow}
                  color={useColorModeValue("gray.800", "gray.300")}
                  w={71}
                  position={"absolute"}
                  right={-71}
                  top={"10px"}
                />
                <Text
                  fontSize={"lg"}
                  fontFamily={"Caveat"}
                  position={"absolute"}
                  right={"-125px"}
                  top={"-15px"}
                  transform={"rotate(10deg)"}
                  color={useColorModeValue("gray.800", "white")}
                >
                  Start your journey
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Container>
        </ColorModeProvider>
    </ChakraProvider>
    </>
  );
}

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});

----------------------------------------------------------------------------.
import React, { useEffect, useState } from 'react';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { Box, Text, Button, Link } from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';

const Hehe = () => {
  const [text, count] = useTypewriter({
    words: [
      "New to investing?  ",
    ],
    delaySpeed: 100,
    isDelete: false,
  });

  const [showAdditionalText, setShowAdditionalText] = useState(false);

  useEffect(() => {
    const delay = 3000; // Delay in milliseconds

    const timer = setTimeout(() => {
      setShowAdditionalText(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      bg="black"
      color="white"
      height="100vh"
      display="flex"
      justifyContent="center"
    >
      <Text
        fontWeight={600}
        fontSize={{ base: "100px", sm: "120px", md: "140px" }}
        lineHeight={"110%"}
        whiteSpace="nowrap"
        color={"white"}
        className="text-lg text-center pt-64"
        maxWidth="80vw"
        marginTop={'100px'}
      
      >
        <span>{text}</span>
        <Cursor cursorColor="#FFFFFF" />
        <br />
        {showAdditionalText && (
          <>
            <span className="fade-in add-text">{`Don't worry we got you!`}</span>
            <br /><br />
            <div className="center-text">
              <span className="fade-in additional-text">
                Invest in Stocks, Cryptos, NFTs and Commodities all in one place.
              </span>
            </div>
            <br />
            <div className="center-button">
              <ScrollLink
                activeClass="active"
                to="section2"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                as={Link}
                color="#000000"
              >
                <Button
                
                  color={'#000'}
                  bg="#ffc757"
                  rounded="full"
                  px={6}
                  marginBottom={'100px'}
                  position={'relative'}
                  className="fade-in"
                  _hover={{
                    bg: "#ffc757",
                  }}
                >
                  Get Started
                </Button>
              </ScrollLink>
            </div>
          </>
        )}
      </Text>
      <style jsx>{`
        .fade-in {
          animation: fadeIn 2s ease-in;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        .add-text{
          font-size: 120px;
          font-weight: 600;
          text-align: center;
        }
        .additional-text {
          font-size: 28px;
          font-weight: 600;
          text-align: center;
        }

        .center-text {
          display: flex;
          justify-content: center;
        }

        .center-button {
          display: flex;
          justify-content: center;
        
        }
      `}</style>
    </Box>
  );
};

export default Hehe;
==================================================
import { useState,useEffect } from "react";
import Image from 'next/image'
import { Flex, Spacer } from '@chakra-ui/react' 
import dynamic from "next/dynamic";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
  Checkbox,
  Link,
} from "@chakra-ui/react";
import { Autour_One } from "next/font/google";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleTermsAgreedChange = (e) => {
    setTermsAgreed(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission
  };

  const handleVerifyContact = () => {
    // TODO: handle contact verification
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required.");
    } else {
      setEmailError("");
    }
  };

  const validateMobileNumber = () => {
    if (!mobileNumber) {
      setMobileNumberError("Mobile number is required.");
    } else {
      setMobileNumberError("");
    }
  };

  return (
    <>
   


    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="white"
      color="black"
    >
      <Box marginLeft={100}>
      <Link href="#">
        <a><Image
          alt='Richin'
          src='/logo-nav.png'
          layout="responsive"
          width={40}
          height={40}
          
        /></a>
      </Link>
      
      </Box>
      <Spacer />
      <Box>
        {/* add your navigation items here */}
      </Box>
    </Flex>
    

    <Flex justify="center" align="center" mt="10">
      <Box w="75%">
        {/* <Image
          alt='Alt'
          src='/ca.png'
         
          
          width={700}
          height={400}
        /> */}
      </Box>
      <Box w="50%" pl="5">
        <Text fontSize="30"  fontWeight="bold" mb="5" /*textAlign="center"*/>
          Create My Account
        </Text>
        <Text fontSize="15" fontWeight="bold" color={'#718096'} mb="5" /*textAlign="center"*/>
          Already have an account?{" "}
          <Link href='https://chakra-ui.com' color='#FF721E' textDecoration="none" isExternal>
            Login
          </Link>
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack spacing="8">

          

            <FormControl isRequired isInvalid={!!emailError} my={10}>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                bg={'#F2F7FF'}
                border={'1px solid #A1C7FF'}
                borderRadius={8}
                pl={'10px'}
                py={'10px'}
                width={'53%'}
                height={'10%'}
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={validateEmail}
                placeholder='Enter Email Address'
              />
              <FormErrorMessage>{emailError}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!mobileNumberError}>
              <FormLabel htmlFor="mobileNumber">Mobile Number</FormLabel>
              <Input
                bg={'#F2F7FF'}
                border={'1px solid #A1C7FF'}
                borderRadius={8}
                pl={'10px'}
                py={'10px'}
                width={'53%'}
                height={'10%'}
                type="tel"
                htmlSize={40}
                id="mobileNumber"
                value={mobileNumber}
                onChange={handleMobileNumberChange}
                onBlur={validateMobileNumber}
                placeholder='Enter Mobile Number'
              />
              <FormErrorMessage>{mobileNumberError}</FormErrorMessage>
            </FormControl>
            {/* <Checkbox
              Checkbox
              colorScheme='green'
              defaultChecked
              isChecked={termsAgreed}
              onChange={handleTermsAgreedChange}
              isRequired
            >
              I agree to the{" "}
              <Link href="/terms" isExternal>
              terms and conditions
          </Link>{" "}
          of this website.
        </Checkbox> */}
        <Text py={'10'}>By clicking on Create Account, you agree to our <br />
          
              <Link href="/terms" isExternal textDecoration={'none'} color={'#2359AD'}>{" "}
              Privacy and Legal Terms.
          </Link></Text>
          <Button
  type="button"
  width= '311px'
  height= '48px'
  borderRadius={10}
  bg="#2359AD"
  color="#fff"
  fontWeight="bold"
  _hover={{ bg: "#3182CE" }}
  _active={{
    bg: "#3182CE",
    transform: "scale(0.98)",
  }}
  onClick={() => window.location.href = '/Token'}
 
>
  Create Account
</Button>
      </Stack>

      

    </form>
  </Box>
</Flex>

</>
);
}

export default dynamic (() => Promise.resolve(CreateAccount), {ssr: false});
============================================
// import { initializeApp } from 'firebase/app';
// import { getAuth, PhoneAuthProvider, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
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

// const PhoneAuth = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');
//   const [confirmationResult, setConfirmationResult] = useState(null);

//   const handlePhoneNumberChange = (e) => {
//     setPhoneNumber(e.target.value);
//   };

//   const handleVerificationCodeChange = (e) => {
//     setVerificationCode(e.target.value);
//   };

//   const handleSendOTP = () => {
//     const phoneNumberWithCountryCode = `+1${phoneNumber}`; // Example: +1234567890
//     const appVerifier = new PhoneAuthProvider(auth);

//     signInWithPhoneNumber(appVerifier, phoneNumberWithCountryCode)
//       .then((confirmationResult) => {
//         setConfirmationResult(confirmationResult);
//         console.log('OTP sent. Verification ID:', confirmationResult.verificationId);
//       })
//       .catch((error) => {
//         console.error('Error sending OTP:', error);
//       });
//   };

//   const handleVerifyOTP = () => {
//     confirmationResult.confirm(verificationCode)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log('Phone authentication successful. User:', user);
//         // Redirect to next page or perform necessary actions
//       })
//       .catch((error) => {
//         console.error('Error verifying OTP:', error);
//       });
//   };

//   return (
//     <div>
//       <h2>Phone Authentication</h2>

//       <label htmlFor="phoneNumber">Phone Number:</label>
//       <input type="tel" id="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />

//       <button onClick={handleSendOTP}>Send OTP</button>

//       <label htmlFor="verificationCode">Verification Code:</label>
//       <input type="text" id="verificationCode" value={verificationCode} onChange={handleVerificationCodeChange} />

//       <button onClick={handleVerifyOTP}>Verify OTP</button>
//     </div>
//   );
// };

// export default PhoneAuth;
*******************************
import React, { useState } from 'react';

function Connect() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);
  const [num5, setNum5] = useState(0);
  const [data, setData] = useState([]);
  const [sum, setSum] = useState(0); // State to hold the summation

  const handleNum1Change = (e) => {
    setNum1(parseInt(e.target.value));
  };

  const handleNum2Change = (e) => {
    setNum2(parseInt(e.target.value));
  };

  const handleNum3Change = (e) => {
    setNum3(parseInt(e.target.value));
  };

  const handleNum4Change = (e) => {
    setNum4(parseInt(e.target.value));
  };

  const handleNum5Change = (e) => {
    setNum5(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to app.py
    fetch("http://localhost:5000/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ num1, num2, num3, num4, num5 }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error: " + res.status);
        }
      })
      .then((data) => {
        const result = data.result; // Access the 'result' value
        setSum(result); // Update the state with the summation
        setData(data); // Update the state with the received data
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {/* Form to input five numbers */}
      <form onSubmit={handleSubmit}>
        <label>
          Number 1:
          <input type="number" value={num1} onChange={handleNum1Change} />
        </label>
        <br />
        <label>
          Number 2:
          <input type="number" value={num2} onChange={handleNum2Change} />
        </label>
        <br />
        <label>
          Number 3:
          <input type="number" value={num3} onChange={handleNum3Change} />
        </label>
        <br />
        <label>
          Number 4:
          <input type="number" value={num4} onChange={handleNum4Change} />
        </label>
        <br />
        <label>
          Number 5:
          <input type="number" value={num5} onChange={handleNum5Change} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {/* Render the data from the Flask API */}
      <pre>{JSON.stringify(data, null, 2)}</pre>

      {/* Render the summation */}
      <p>Sum: {sum}</p>
    </div>  
  );
}

export default Connect;
