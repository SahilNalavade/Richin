import { Button } from '@chakra-ui/react';
import React from 'react';

const MembershipSection = () => {
  return (
    <div>
      <section style={{ height: '70vh', backgroundColor: '#000', display: 'flex', alignItems: 'center', borderTop: '2px solid #000' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flex: 1, paddingLeft: '50px' }}>
          <div>
            <h3 style={{ fontSize: '60px', fontWeight: 'bold', lineHeight: '60px',marginTop:'50px', backgroundImage: 'linear-gradient(to right, #ffcc69,#ffd78b,#fee0a6,#fde4b2,#fee2ab)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: '#fff', textAlign: 'justify' }}>Ride the Bull</h3>
            <h3 style={{ fontSize: '60px', fontWeight: 'bold', lineHeight: '60px', backgroundImage: 'linear-gradient(to right, #ffcc69,#ffd78b,#fee0a6,#fde4b2,#fee2ab)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: '#fff', textAlign: 'justify' }}>Get rich with Richin</h3>

            <p style={{ fontSize: '22px', fontWeight: 'normal', color: '#fff', lineHeight: '25px', textAlign: 'justify', marginTop: '40px'}}>
  Leverage our AI to make a portfolio which is best suited for your goals. <span style={{  fontWeight: 'bold',backgroundImage: 'linear-gradient(to right, #ffcc69,#ffd78b,#fee0a6,#fde4b2,#fee2ab)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Take the membership plan</span> - Take the first step towards achieving that dream.
</p>



            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"md"}
              fontWeight={600}
              color={"#000"}
              href="/signupp"
              paddingX={10}
              paddingY={7}
              borderRadius={30}
              marginTop={'50px'}
              style={{
                background: "linear-gradient(to right, #ffcc69,#ffd78b,#fee0a6,#fde4b2,#fee2ab)",
                backgroundImage: "-webkit-linear-gradient(to right, #ffcc69,#ffd78b,#fee0a6,#fde4b2,#fee2ab)",
              }}
            >
              Membership Plan
            </Button>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', paddingRight: '5%', marginTop: '7%' }}>
  <img src="/rb.png" alt="Image" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
</div>

      </section>

      <section style={{ background: '#000', padding: '50px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', maxWidth: '100%' }}>
            <Card
              logo="/logo1.png"
              heading="Goal based investing for newbies"
              paragraph="f=Fullfill your goals by investing. no prior knowledge or research required, Our AI creates a portfolio which matches your goal."
            />
            <Card
              logo="/logo2.png"
              heading="All the assets at one place"
              paragraph="We have stocks. We have crypto. We have NFTs and much more. Invest in all of them at one place and quit switching apps."
            />
            <Card
              logo="/logo3.png"
              heading="Get a demo before you start"
              paragraph="Star with a demo account to improve your strategies and to better Know the tools we offer."
            />
            <Card
              logo="/logo4.png"
              heading="Much Affordable"
              paragraph="TWe set a low commission fee and membership charge so the you earn more."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const Card = ({ logo, heading, paragraph }) => {
  return (
    <div style={{ width: '500px', margin: '0 30px', marginTop: '50px', marginBottom: '50px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '50px', marginRight: '10px' }} />
        <h3 style={{ color: '#fff' ,fontSize:'20px',fontWeight:'bold',marginBottom:'10px'}}>{heading}</h3>
      </div>
      <p style={{ color: '#fff', textAlign: 'justify',fontSize:'16px' }}>{paragraph}</p>
    </div>
  );
};

export default MembershipSection;
