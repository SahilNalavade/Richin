import InvestSection2 from '@/components/InvestSection2';
import CryptoSection from '@/components/CryptoSection';
import React from 'react';
import Navbarrr from '@/components/Navbarrr'
import { ChakraProvider,Box } from '@chakra-ui/react';
import SignupSection from '@/components/SignupSection';
import MembershipSection from '@/components/MembershipSection';
import CardSection from '@/components/CardSection';
import StockSection from '@/components/StockSection';
import { StickyContainer, Sticky } from 'react-sticky';
const TargetPage = () => {
  
  return (
    <ChakraProvider>
    <div>
    <StickyContainer>
        <Sticky>
          {({ style }) => (
            <Box as="nav" style={{ ...style, backgroundColor: '#121212',zIndex: 999 }}>
              <Navbarrr />
            </Box>
          )}
        </Sticky>
      <section id="section1">
        <InvestSection2 />
      </section>
      <section id="section2">
        <StockSection />
      </section>
      <section id="section3">
        <CryptoSection />
      </section>
      <section id="section4">
        <CardSection />
      </section>
      <section id="section5">
        <MembershipSection />
      </section>

      <section id="section6">
        <SignupSection />
      </section>
      </StickyContainer>
    </div>
    
    </ChakraProvider>
  );
};

export default TargetPage;
