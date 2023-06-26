import { Button, Box } from '@chakra-ui/react';
import React from 'react';



const InvestSection2 = () => {
  return (
    <div>
      <section style={{ height: '100vh', background: 'linear-gradient(to top right, #26d017, #c4f444)', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <img src="/Frame 2.png" alt="Background" style={{ maxWidth: '100%', maxHeight: '50vh', width: '40%', objectFit: 'cover', marginTop: '10px' }} />
        <h2 style={{ fontSize: '58px', fontWeight: 'bold', marginTop: '10px' }}>Investing doesn’t have to be </h2>
        <h2 style={{ fontSize: '58px', fontWeight: 'bold', marginTop: '-20px' }}>that hard.</h2>
        <p style={{ fontSize: '24px', fontWeight: 'normal' }}>Access stocks, cryptos, and much more on Richin.</p>
        <p style={{ fontSize: '24px', fontWeight: 'normal' }}>No panic, no research. Get started and leave the rest to us</p>

        <Button
          as={"a"}
          display={{ base: "none", md: "inline-flex" }}
          fontSize={"md"}
          fontWeight={600}
          color={"#fff"}
          href="/signupp"
          bg={"#000"}
          paddingX={10}
          paddingY={7}
          borderRadius={30}
          marginTop={'20px'}
          _hover={{ textDecoration: "none", backgroundColor: "#000" }}
        >
          Get Started
        </Button>
      </section>
     
    </div>
  );
}

export default InvestSection2;
