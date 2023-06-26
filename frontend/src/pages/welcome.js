import React from 'react';
import { Box, Link, Button, Text } from '@chakra-ui/react';
import { Link as ScrollLink, Element, animateScroll as scroll } from 'react-scroll';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StickyContainer, Sticky } from 'react-sticky';
import HeroSection from '../components/HeroSection';
import InvestSection from '../components/InvestSection';
import Navbarr from '@/components/Navbarr';
import SignupSection from '@/components/SignupSection';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: 0,
        padding: 0,
      },
    },
  },
});

const Home = () => {
  return (
    <ChakraProvider theme={theme}>
      <StickyContainer>
        <Sticky>
          {({ style }) => (
            <Box as="nav" style={{ ...style, backgroundColor: '#121212', zIndex: 998 }}>
              <Navbarr />
            </Box>
          )}
        </Sticky>
        <Box>
          <Element name="section1" className="section">
            <HeroSection />
          </Element>
          <Element name="section2" className="section">
            <InvestSection />
          </Element>
          <Element name="section3" className="section">
            <SignupSection />
          </Element>
          <Box display="flex" justifyContent="center">
            
          </Box>
        </Box>
      </StickyContainer>
    </ChakraProvider>
  );
};

export default Home;
