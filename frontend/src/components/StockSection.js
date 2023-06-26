import { Button, Box } from '@chakra-ui/react';
import React from 'react';
import { keyframes } from '@emotion/react';

// Define the glowing animation
const glowAnimation = keyframes`
  0% { text-shadow: 0 0 5px #FFA500; }
  50% { text-shadow: 0 0 20px #FFA500; }
  100% { text-shadow: 0 0 5px #FFA500; }
`;

// Component with glowing animation for the word "Money"
const GlowingMoney = () => (
  <Box
    as="span"
    position="relative"
    zIndex="2"
    animation={`${glowAnimation} 2s linear infinite`}
    color="#fff"
  >
    Stocks
  </Box>
);

const InvestSection2 = () => {
  return (
    <div>

      <section style={{ height: '100vh', backgroundColor: '#A7F1A8', display: 'flex', alignItems: 'center', borderTop: '2px solid #000', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flex: 1, paddingLeft: '50px', zIndex: 1 }}>
          <div>
            <h2 style={{ fontSize: '60px', fontWeight: 'bold', color: '#333333', lineHeight: '60px' }}>
              <GlowingMoney />
            </h2>
            <h3 style={{ fontSize: '60px', fontWeight: 'bold', color: '#000', lineHeight: '60px' }}>Own the company you like  </h3>
            <p style={{ fontSize: '25px', fontWeight: 'normal', color: '#000', lineHeight: '1.5', marginTop: '30px' }}>
  Choose from more than 1000 companies. Invest in your favorite ones and own a part of it.Start with whatever amount you want - be it 100 or 1,00,000.Remember, a single good investment can change your future.
</p>


          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10%', top: '80px', zIndex: 0 }}>
          <img src="/Frame 3.png" alt="Image" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
        </div>
      </section>
    </div>
  );
}

export default InvestSection2;
