import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Link } from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';
import Image from 'next/image';

const Hehe = () => {
  const [showAdditionalText, setShowAdditionalText] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const delay = 1000; // Delay in milliseconds

    const timer = setTimeout(() => {
      setShowAdditionalText(true);
    }, delay);

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, delay + 2000); // Button delay is set to 2 seconds after the text

    return () => {
      clearTimeout(timer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <Box
      bg="black"
      color="white"
      height="100vh"
      display="flex"
      alignItems="center" // Align the box vertically
      paddingLeft="20px" // Add left padding to move the box to the left
    >
      <Box flex="1" paddingRight="10px"> {/* Add right padding to create space for the image */}
        <Text
          fontWeight={600}
          fontSize={{ base: '60px', sm: '80px', md: '100px' }} // Reduce the font size
          lineHeight={'80%'}
          whiteSpace="nowrap"
          color={'white'}
          className="text-lg text-center pt-20" // Reduce top padding
          maxWidth="80vw"
         
        >
          {showAdditionalText && (
            <>
              <span className="fade-in add-textt" style={{ animationDelay: '0s' }}>
                New to Investing?
              </span>
              <br />
              <span className="fade-in add-text" style={{ animationDelay: '1s' }}>
                Don't worry we got you!
              </span>
              <div className="center-text">
                <span className="fade-in additional-text" style={{ animationDelay: '2s'}}>
                  Invest in Stocks, Cryptos, NFTs, and Commodities all in one place.
                </span>
              </div>

            </>
          )}
        </Text>

        <div className="center-button">
          {showButton && (
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
                  bg: '#ffc757',
                }}
              >
                Get Started
              </Button>
            </ScrollLink>
          )}
        </div>
      </Box>

      <Box flex="1">
        <Image
          src="/Croods.png"
          alt="Your Image"
          width={1000} // Increase the width value
          height={1000} // Increase the height value
        />
      </Box>

      <style jsx>{`
        .fade-in {
          animation: fadeIn 1s ease-in;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .add-textt {
          font-size: 80px;
          font-weight: 600;
          text-align: center;
          background: linear-gradient(to right, #ff7300, #ffc757);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .add-text {
          font-size: 40px;
          font-weight: 600;
          text-align: center;
        }
        .additional-text {
          font-size: 24px;
          font-weight: 600;
          text-align: center;
         
        }

        .center-text {
          display: flex;
          justify-content: center;
        }

        .center-button {
          margin-top: 20px;
          display: flex;
       
        }
      `}</style>
    </Box>
  );
};

export default Hehe;
