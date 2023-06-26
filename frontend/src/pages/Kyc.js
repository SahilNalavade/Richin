import React, { useState, useRef } from "react";
import { ChakraProvider, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Box, Progress, NumberInput, NumberInputField, FormControl, FormLabel, Input, Stack, PinInput, PinInputField, HStack, Button } from "@chakra-ui/react";
import { FiCamera } from "react-icons/fi";
import { useDisclosure } from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage
import { app, auth, db } from "../../lib/firebase";
import {  ColorModeProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export default function Kyc() {
  const [tabIndex, setTabIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);
  const { onOpen, isOpen } = useDisclosure();
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pincode, setPincode] = useState([0, 0, 0, 0, 0, 0]);
  const [imageURL, setImageURL] = useState(""); // State variable for storing the image URL

  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIFSCCode] = useState("");


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
  // Add additional state variables for other form fields

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];

    const storage = getStorage(app); // Initialize Firebase Storage

    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytes(storageRef, file);

    try {
      await uploadTask;

      // Upload completed successfully
      const downloadURL = await getDownloadURL(storageRef);
      setImageURL(downloadURL);
    } catch (error) {
      // Handle upload error
      console.error('Error uploading image:', error);
    }
  };

  const progressValue = ((currentTab + 1) / 3) * 100; // calculate the progress value based on the current tab index

  const handleNext = async () => {
    if (currentTab < 2) {
      setCurrentTab(currentTab + 1);
      setTabIndex(currentTab + 1);
    } else {
      // Redirect to index.js or perform any other action when the last tab is reached
      await saveFormDataToFirestore();
    }
  };

  const saveFormDataToFirestore = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        // Get the user's ID
        const userId = user.uid;

        // Convert the pincode to a string
        const pincodeString = pincode.join("");

        // Get the form data
        const formData = {
          name: name,
          email: email,
          mobileNumber: mobileNumber,
          pincode: pincodeString,
          bankName: bankName,
          accountNumber: accountNumber,
          ifscCode: ifscCode,
          imageURL: imageURL, // Add the imageURL to the form data
          // Add other form fields
        };

        // Save the form data to Firestore
        await addDoc(collection(db, "users", userId, "kyc"), formData);

        console.log("Form data saved to Firestore");
      }
    } catch (error) {
      console.error("Error saving form data to Firestore:", error);
    }
  };
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={{ useSystemColorMode: true }}>
      <Heading padding={5}>Upload KYC</Heading>
      <Box>
        <Tabs isLazy variant="enclosed" index={tabIndex} onChange={handleTabsChange}>
          <TabList display="flex" justifyContent="center" width="100%" padding={0} margin={0}>
            <Tab flex="1" minWidth="25%">
              Personal Details
            </Tab>
            <Tab flex="1" minWidth="25%">
              ID Proof
            </Tab>
            <Tab flex="1" minWidth="25%">
              Bank Details
            </Tab>
          </TabList>
          <Progress value={progressValue} size="xs" />

          <TabPanels>
            <TabPanel px={10}>
              <Heading mb={5} as="h3" size="md">
                Enter your details
              </Heading>

              <FormControl pb={5}>
  <FormLabel>Name</FormLabel>
  <Input type="text" placeholder="Enter Your Full Name" value={name} onChange={(e) => setName(e.target.value)} />
</FormControl>

<FormControl pb={5}>
  <FormLabel>Email address</FormLabel>
  <Input type="email" placeholder="Enter Your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
</FormControl>

<FormControl>
  <FormLabel>Mobile Number</FormLabel>
  <NumberInput pb={5}>
    <NumberInputField placeholder="Enter Your Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
  </NumberInput>

  <FormLabel>Pincode</FormLabel>
  <HStack>
  <PinInput>
    <PinInputField value={pincode[0]} onChange={(value) => setPincode([parseInt(value), pincode[1], pincode[2], pincode[3], pincode[4], pincode[5]])} />
    <PinInputField value={pincode[1]} onChange={(value) => setPincode([pincode[0], parseInt(value), pincode[2], pincode[3], pincode[4], pincode[5]])} />
    <PinInputField value={pincode[2]} onChange={(value) => setPincode([pincode[0], pincode[1], parseInt(value), pincode[3], pincode[4], pincode[5]])} />
    <PinInputField value={pincode[3]} onChange={(value) => setPincode([pincode[0], pincode[1], pincode[2], parseInt(value), pincode[4], pincode[5]])} />
    <PinInputField value={pincode[4]} onChange={(value) => setPincode([pincode[0], pincode[1], pincode[2], pincode[3], parseInt(value), pincode[5]])} />
    <PinInputField value={pincode[5]} onChange={(value) => setPincode([pincode[0], pincode[1], pincode[2], pincode[3], pincode[4], parseInt(value)])} />
  </PinInput>
  </HStack>
</FormControl>



              <Button colorScheme="blue" px={20} py={2} onClick={handleNext}>
                Next
              </Button>
            </TabPanel>

            <TabPanel px={10}>
  <Heading mb={5} as="h3" size="md">
    Upload ID Proof
  </Heading>

  <FormControl>
    {/* <FormLabel>Proof Type</FormLabel> */}
    {/* Remove the input field */}
  </FormControl>

  <Button
                colorScheme="teal"
                leftIcon={<FiCamera />}
                onClick={handleButtonClick}
                ml={2}
              >
                Upload Photo
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileSelect}
              />

  <Button colorScheme="blue" px={20} py={2} onClick={handleNext}>
    Next
  </Button>
  
</TabPanel>


<TabPanel px={10}>
  <Heading mb={5} as="h3" size="md">
    Enter Bank Details
  </Heading>

  <FormControl pb={5}>
    <FormLabel>Bank Name</FormLabel>
    <Input
      type="text"
      placeholder="Enter Bank Name"
      value={bankName}
      onChange={(e) => setBankName(e.target.value)}
    />
  </FormControl>

  <FormControl pb={5}>
    <FormLabel>Account Number</FormLabel>
    <Input
      type="text"
      placeholder="Enter Account Number"
      value={accountNumber}
      onChange={(e) => setAccountNumber(e.target.value)}
    />
  </FormControl>

  <FormControl>
    <FormLabel>IFSC Code</FormLabel>
    <Input
      type="text"
      placeholder="Enter IFSC Code"
      value={ifscCode}
      onChange={(e) => setIFSCCode(e.target.value)}
    />
  </FormControl>

  <Button colorScheme="blue" px={20} py={2} onClick={handleNext}>
    Next
  </Button>
</TabPanel>



          </TabPanels>
        </Tabs>
      </Box>
      </ColorModeProvider>
    </ChakraProvider>
  );
}



// -------------------------------------
// import React, { useState, useRef } from "react";
// import {
//   ChakraProvider,
//   Heading,
//   Tabs,
//   TabList,
//   TabPanels,
//   Tab,
//   TabPanel,
//   Box,
//   Progress,
//   NumberInput,
//   NumberInputField,
//   FormControl,
//   FormLabel,
//   Input,
//   Stack,
//   PinInput,
//   PinInputField,
//   HStack,
//   Button,
// } from "@chakra-ui/react";
// import { FiCamera } from "react-icons/fi";
// import { useDisclosure } from "@chakra-ui/react";

// export default function Kyc() {
//   const [tabIndex, setTabIndex] = useState(0);
//   const [currentTab, setCurrentTab] = useState(0);
//   const { onOpen, isOpen } = useDisclosure();
//   const fileInputRef = useRef(null);

//   const handleTabsChange = (index) => {
//     setTabIndex(index);
//   };

//   const handleButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     // Do something with the selected image file, like display it or upload it
//     console.log(file.name);
//   };

//   const handleNext = () => {
//     if (currentTab < numberOfTabs - 1) {
//       setCurrentTab(currentTab + 1);
//     } else {
//       // Redirect to index.js or perform any other action when the last tab is reached
//     }
//   };

//   const progressValue = (currentTab + 1) / 3 * 100; // calculate the progress value based on the current tab index
//   return (
//     <ChakraProvider >
//       <Heading padding={5}>Upload KYC</Heading>

//       <Box>
//         <Tabs isManual variant='enclosed' index={tabIndex} onChange={handleTabsChange}>
//           <TabList
//             display="flex"
//             justifyContent="center"
//             width="100%"
//             padding={0}
//             margin={0}
//           >
//             <Tab flex="1" minWidth="25%" >
//               Personal Details
//             </Tab>
//             <Tab flex="1" minWidth="25%" >
//               ID Proof
//             </Tab>
//             <Tab flex="1" minWidth="25%">
//               Bank Details
//             </Tab>
//           </TabList>
//           <Progress value={progressValue} size="xs" /*colorScheme={"orange"}*/ />
//           <TabPanels>
//             <TabPanel px={10}>
//             <Heading mb={5} as='h3' size='md'>
//             Enter your details
//   </Heading>
         

//               <FormControl pb={5}>
//   <FormLabel>Name</FormLabel>
//   <Input type='text' placeholder="Enter Your Full Name" />
 
// </FormControl>

//               <FormControl pb={5}  >
//   <FormLabel>Email address</FormLabel>
//   <Input type='email' placeholder="Enter Your Email Address" />
  
// </FormControl>

// <FormControl >
//   <FormLabel>Mobile Number</FormLabel>
//   <NumberInput  pb={5}>
//     <NumberInputField placeholder="Enter Your Mobile Number"/>
//   </NumberInput>


//   <FormLabel >Pincode</FormLabel>
//   <HStack>
 
//   <PinInput >
//     <PinInputField />
//     <PinInputField />
//     <PinInputField />
//     <PinInputField />
//     <PinInputField />
//     <PinInputField />
//   </PinInput>
// </HStack>

// <Button colorScheme="blue" px={20} py={2} onClick={handleNext}>
//   Next
// </Button>
// </FormControl>
//             </TabPanel>
//             <TabPanel>
//             <Heading mb={5} as='h3' size='md'>
//             Choose Document Type
//   </Heading>

//   <Tabs variant='soft-rounded' colorScheme='green'>
//   <TabList>
//     <Tab>Aadhar Card</Tab>
//     <Tab>PAN Card</Tab>
//   </TabList>
//   <TabPanels>
//     <TabPanel>
//     <Heading mb={5} as='h3' size='md'>
//     Upload ID Proof
//   </Heading>

//   <p>Please take a photo of front and back sides of the ID Card in a well-lit environment, for verification.</p>    
// <HStack pt={10}>

//   <Button
       
//         colorScheme='blue'
//         variant='outline'
//         onClick={handleButtonClick}
//       >
//         <FiCamera /> Upload Image
//       </Button>
//       <input
//         ref={fileInputRef}
//         type='file'
//         accept='image/*'
//         onChange={handleFileSelect}
//         style={{ display: 'none' }}
//       /> 

// <Button
       
//         colorScheme='blue'
//         variant='outline'
//         onClick={handleButtonClick}
//       >
//         <FiCamera /> Upload Image
//       </Button>
//       <input
//         ref={fileInputRef}
//         type='file'
//         accept='image/*'
//         onChange={handleFileSelect}
//         style={{ display: 'none' }}
//       /> 
//       </HStack>   

//       <Button colorScheme='blue' px={20} py={2} mt={10}>Next</Button>                                                    
//     </TabPanel>
//     <TabPanel>
//     <Heading mb={5} as='h3' size='md'>
//     Upload ID Proof
//   </Heading>

//   <p>Please take a photo of front and back sides of the ID Card in a well-lit environment, for verification.</p>    
// <HStack pt={10}>

//   <Button
       
//         colorScheme='blue'
//         variant='outline'
//         onClick={handleButtonClick}
//       >
//         <FiCamera /> Upload Image
//       </Button>
//       <input
//         ref={fileInputRef}
//         type='file'
//         accept='image/*'
//         onChange={handleFileSelect}
//         style={{ display: 'none' }}
//       /> 

// <Button
       
//         colorScheme='blue'
//         variant='outline'
//         onClick={handleButtonClick}
//       >
//         <FiCamera /> Upload Image
//       </Button>
//       <input
//         ref={fileInputRef}
//         type='file'
//         accept='image/*'
//         onChange={handleFileSelect}
//         style={{ display: 'none' }}
//       /> 
//       </HStack>   

//       <Button colorScheme='blue' px={20} py={2} mt={10}>Next</Button>  
//     </TabPanel>
//   </TabPanels>
// </Tabs>
//             </TabPanel>
//             <TabPanel>
//             <Heading mb={5} as='h3' size='md'>
//             Choose Document Type
//   </Heading>

//   <HStack position="relative" >
//   <Heading as='h3' size='sm' position="absolute" top="0" left="0">
//     Account Type
//   </Heading>
//   <Tabs variant='soft-rounded' pl={40} colorScheme='green'>
//     <TabList>
//       <Tab>Savings</Tab>
//       <Tab>Current</Tab>
//     </TabList>
//     <TabPanels>
//       <TabPanel>
//         <FormControl pb={5}>
//           <FormLabel>Name on Account</FormLabel>
//           <Input type='text' placeholder="Enter Your Name Here" />

//           <FormControl>
//             <FormLabel>Account Number</FormLabel>
//             <NumberInput pb={5}>
//               <NumberInputField placeholder="Enter Account Number" />
//             </NumberInput>
//           </FormControl>
//           <FormControl>
//             <FormLabel>Confirm Account Number</FormLabel>
//             <NumberInput pb={5}>
//               <NumberInputField placeholder="Re-enter Account Number" />
//             </NumberInput>
//           </FormControl>
//           <FormControl>
//             <FormLabel>IFSC Code</FormLabel>
//             <NumberInput pb={5}>
//               <NumberInputField placeholder="Enter IFSC Code" />
//             </NumberInput>
//           </FormControl>
//         </FormControl>
//         <Button colorScheme='blue' px={20} py={2} >Next</Button>
//       </TabPanel>
//       <TabPanel>
//       <FormControl pb={5}>
//           <FormLabel>Name on Account</FormLabel>
//           <Input type='text' placeholder="Enter Your Name Here" />

//           <FormControl>
//             <FormLabel>Account Number</FormLabel>
//             <NumberInput pb={5}>
//               <NumberInputField placeholder="Enter Account Number" />
//             </NumberInput>
//           </FormControl>
//           <FormControl>
//             <FormLabel>Confirm Account Number</FormLabel>
//             <NumberInput pb={5}>
//               <NumberInputField placeholder="Re-enter Account Number" />
//             </NumberInput>
//           </FormControl>
//           <FormControl>
//             <FormLabel>IFSC Code</FormLabel>
//             <NumberInput pb={5}>
//               <NumberInputField placeholder="Enter IFSC Code" />
//             </NumberInput>
//           </FormControl>
//         </FormControl>
//         <Button colorScheme='blue' px={20} py={2} >Next</Button>
//       </TabPanel>
//     </TabPanels>
//   </Tabs>
// </HStack>

  
//             </TabPanel>
//           </TabPanels>
//         </Tabs>
//       </Box>
//     </ChakraProvider>
//   );
// }
