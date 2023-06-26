import { Button, Box } from '@chakra-ui/react';
import React from 'react';
import { keyframes } from '@emotion/react';

const glowAnimation = keyframes`
  0% { text-shadow: 0 0 5px #00FF9C; }
  50% { text-shadow: 0 0 20px #00FF9C; }
  100% { text-shadow: 0 0 5px #00FF9C; }
`;

// Component with glowing animation for the word "Money"
const GlowingMoney = () => (
  <Box
    as="span"
    position="relative"
    zIndex="2"
    animation={`${glowAnimation} 2s linear infinite`}
    color="#000"
  >
    Crypto
  </Box>
);
const InvestSection2 = () => {
  return (
    <div>
      {/* background: 'linear-gradient(to bottom, #bbdddc, #bbdddc , #bbdddc , #bbdddc , #d8d7cc)' */}
      <section style={{ height: '100vh',backgroundColor:'#fff', display: 'flex', alignItems: 'center', borderTop: '2px solid #000' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flex: 1, paddingLeft: '50px' }}>
          <div>
            <h2 style={{ fontSize: '60px', fontWeight: 'bold', color: '#000',lineHeight:'60px' }}><GlowingMoney /></h2>
            <h3 style={{ fontSize: '60px', fontWeight: 'bold', color: '#000',lineHeight:'60px',marginTop:'10px'}}>Invest in the next big thing</h3>
            {/* <h3 style={{ fontSize: '60px', fontWeight: 'bold', color: '#000',lineHeight:'60px',marginBottom:'60px'}}>companies</h3> */}

            <p style={{ fontSize: '25px', fontWeight: 'normal', color: '#000', lineHeight: '1.5', marginTop: '30px' }}>Crypto is the new buzz in the market, catch this trend before it's too late. Buy, sell, and store crypto on our platform at much affordable prices.</p>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10%' }}>
  <video autoPlay muted loop>
    <source src="/video3.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>


        
      </section>
    </div>
  );
}

export default InvestSection2;
