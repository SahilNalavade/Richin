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

function Token() {
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
          Contact verification
        </Text>
        <Text fontSize="15" fontWeight="bold" color={'#718096'} mb="5" /*textAlign="center"*/>
        Enter the verification token sent to your email address and mobile number.
          
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack spacing="8">

          

            <FormControl isRequired isInvalid={!!emailError} my={10}>
              <FormLabel htmlFor="email">Email Address Token</FormLabel>
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
                placeholder='Token sent on Email'
              />
              <FormErrorMessage>{emailError}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!mobileNumberError}>
              <FormLabel htmlFor="mobileNumber">Mobile Number Token</FormLabel>
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
                placeholder='Token sent on Mobile'
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
        
      </Stack>

      <Button
          type="submit"
          width= '311px'
          height= '48px'
          borderRadius={10}
          bg="
          #2359AD"
          color="#fff"
          fontWeight="bold"
          _hover={{ bg: "#3182CE" }}
          _active={{
            bg: "#3182CE",
            transform: "scale(0.98)",
          }}
          onClick={handleVerifyContact}
          isDisabled={!termsAgreed}
        >
          Create Account
        </Button>
    </form>
  </Box>
</Flex>

</>
);
}

export default dynamic (() => Promise.resolve(Token), {ssr: false});
